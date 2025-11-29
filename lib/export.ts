import type { AmortizationEntry } from "@/types";
import { formatCurrency as formatCurrencyUtil } from "./utils";
import type { Currency } from "@/contexts/CurrencyContext";

// Dynamic import types - jsPDF is the class constructor, jsPDFInstance is the instance
type jsPDFClass = typeof import("jspdf").default;
type jsPDFInstance = InstanceType<jsPDFClass>;

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: {
      head: string[][];
      body: string[][];
      startY?: number;
      styles?: Record<string, unknown>;
      headStyles?: Record<string, unknown>;
      columnStyles?: Record<number, Record<string, unknown>>;
      margin?: { left?: number; right?: number; top?: number; bottom?: number };
    }) => jsPDFInstance;
  }
}

// Cache for loaded modules
let jsPDFModule: jsPDFClass | null = null;
let jsPDFLoading: Promise<jsPDFClass> | null = null;
let autoTableLoaded = false;
let autoTableLoading: Promise<void> | null = null;
let autoTableFn: any = null;

// Dynamically load jsPDF
async function loadjsPDF(): Promise<jsPDFClass> {
  if (jsPDFModule) {
    return jsPDFModule;
  }
  
  if (jsPDFLoading) {
    return jsPDFLoading;
  }
  
  jsPDFLoading = import("jspdf").then((module) => {
    jsPDFModule = module.default;
    return jsPDFModule;
  });
  
  return jsPDFLoading;
}

// Lazy load jspdf-autotable - must be loaded before creating jsPDF instance
async function ensureAutoTable(): Promise<void> {
  // Load jsPDF first if not loaded
  const jsPDF = await loadjsPDF();
  
  // If already loaded, return immediately
  if (autoTableLoaded && (typeof (jsPDF.prototype as any).autoTable === "function" || autoTableFn)) {
    return;
  }
  
  // If currently loading, wait for the existing promise
  if (autoTableLoading) {
    await autoTableLoading;
    return;
  }
  
  // Start loading
  autoTableLoading = (async () => {
    try {
      // Import jspdf-autotable - this extends jsPDF prototype
      const autotableModule = await import("jspdf-autotable");
      
      // Wait a bit for the module to extend the prototype
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      // Check if it exports a default function (newer versions use standalone function)
      if (autotableModule.default && typeof autotableModule.default === "function") {
        autoTableFn = autotableModule.default;
      } else if (typeof autotableModule === "function") {
        autoTableFn = autotableModule;
      }
      
      // Check if prototype was extended
      if (typeof (jsPDF.prototype as any).autoTable === "function") {
        autoTableLoaded = true;
      } else if (autoTableFn) {
        // If we have a standalone function, that's also valid
        autoTableLoaded = true;
      } else {
        // Try one more time with a longer delay
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (typeof (jsPDF.prototype as any).autoTable === "function") {
          autoTableLoaded = true;
        } else {
          throw new Error("jspdf-autotable did not extend jsPDF prototype");
        }
      }
    } catch (error) {
      console.error("Failed to load jspdf-autotable:", error);
      autoTableLoading = null;
      throw error;
    }
  })();
  
  await autoTableLoading;
}

function callAutoTable(doc: jsPDFInstance, options: Parameters<jsPDFInstance["autoTable"]>[0]): void {
  // First, try prototype method if available
  if (typeof (doc as any).autoTable === "function") {
    (doc as any).autoTable(options);
    return;
  }
  
  // If prototype method not available, try standalone function
  if (typeof autoTableFn === "function") {
    autoTableFn(doc, options);
    return;
  }
  
  // Last resort: try prototype method anyway (might work)
  if (autoTableFn === "prototype") {
    (doc as any).autoTable(options);
    return;
  }
  
  // If all else fails, throw error
  throw new Error("autoTable is not available. jspdf-autotable may not be loaded correctly.");
}

export async function exportToPDF(
  title: string,
  data: Record<string, unknown>[],
  columns: string[],
  filename: string,
  currency: Currency = "INR"
): Promise<void> {
  // Dynamically load jsPDF
  const jsPDF = await loadjsPDF();
  await ensureAutoTable();
  
  const doc = new jsPDF();
  const formatCurrency = (amount: number) => formatCurrencyUtil(amount, currency);
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Prepare table data
  const tableData = data.map((row) =>
    columns.map((col) => {
      const value = row[col];
      return typeof value === "number" ? formatCurrency(value) : String(value);
    })
  );
  
  // Add table
  callAutoTable(doc, {
    head: [columns],
    body: tableData,
    startY: 40,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] },
  });
  
  doc.save(filename);
}

// Helper function to add copyright footer to PDF
function addCopyrightFooter(doc: jsPDFInstance): void {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Set footer properties
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100); // Gray color
  
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} MoneySynth. All rights reserved.`;
  const footerY = pageHeight - 10;
  
  // Center the copyright text
  const textWidth = doc.getTextWidth(copyrightText);
  doc.text(copyrightText, (pageWidth - textWidth) / 2, footerY);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
}

// Helper function to add watermark to PDF
function addWatermark(doc: jsPDFInstance, pageNumber: number): void {
  const watermarkText = "MoneySynth";
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Set watermark properties - light gray, semi-transparent
  doc.setTextColor(200, 200, 200); // Light gray color
  doc.setFontSize(35);
  doc.setFont("helvetica", "normal");
  
  // Calculate text width for centering
  const textWidth = doc.getTextWidth(watermarkText);
  
  // Add watermark in multiple locations with rotation
  const positions = [
    // Center (diagonal)
    { x: (pageWidth - textWidth) / 2, y: pageHeight / 2, angle: 45 },
    // Top left corner
    { x: 40, y: 50, angle: 45 },
    // Top right corner
    { x: pageWidth - textWidth - 40, y: 50, angle: -45 },
    // Bottom left corner
    { x: 40, y: pageHeight - 50, angle: -45 },
    // Bottom right corner
    { x: pageWidth - textWidth - 40, y: pageHeight - 50, angle: 45 },
  ];
  
  positions.forEach((pos) => {
    // Use transform to rotate text
    const radians = (pos.angle * Math.PI) / 180;
    doc.saveGraphicsState();
    
    // Set low opacity for watermark effect
    try {
      (doc as any).setGState((doc as any).GState({ opacity: 0.15 }));
    } catch (e) {
      // If GState is not available, just use light color
    }
    
    // Draw rotated text
    doc.text(watermarkText, pos.x, pos.y, {
      angle: pos.angle,
    });
    
    doc.restoreGraphicsState();
  });
  
  // Reset text color to black for normal text
  doc.setTextColor(0, 0, 0);
}

export async function exportAmortizationToPDF(
  schedule: AmortizationEntry[],
  loanDetails: {
    principal: number;
    rate: number;
    tenure: number;
    emi: number;
  },
  viewMode: "yearly" | "monthly" = "yearly",
  showPrepayment: boolean = false,
  currency: Currency = "INR"
): Promise<void> {
  const formatCurrency = (amount: number) => formatCurrencyUtil(amount, currency);
  // Dynamically load jsPDF and autotable
  const jsPDF = await loadjsPDF();
  await ensureAutoTable();
  
  const doc = new jsPDF();
  const originalPrincipal = loanDetails.principal;
  
  // Helper function to load and add logo
  const addLogoToPDF = async (pdfDoc: jsPDFInstance, yPosition: number = 10): Promise<void> => {
    try {
      // Load logo image from public folder
      const logoUrl = "/fulllogo_transparent_nobuffer.png";
      
      // Convert image to base64 for jsPDF
      const response = await fetch(logoUrl);
      if (!response.ok) {
        console.warn("Logo not found, continuing without logo");
        return;
      }
      
      const blob = await response.blob();
      const reader = new FileReader();
      
      await new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          try {
            const base64 = reader.result as string;
            // Get image dimensions
            const img = new Image();
            img.onload = () => {
              try {
                // Add logo to PDF (width: 60mm, height: auto-calculated to maintain aspect ratio)
                const logoWidth = 60;
                const logoHeight = (img.height * logoWidth) / img.width;
                const pageWidth = pdfDoc.internal.pageSize.getWidth();
                pdfDoc.addImage(
                  base64,
                  "PNG",
                  (pageWidth - logoWidth) / 2,
                  yPosition,
                  logoWidth,
                  logoHeight
                );
                resolve();
              } catch (error) {
                console.warn("Could not add logo to PDF:", error);
                resolve();
              }
            };
            img.onerror = () => {
              console.warn("Could not load image dimensions");
              resolve();
            };
            img.src = base64;
          } catch (error) {
            console.warn("Error processing logo:", error);
            resolve();
          }
        };
        reader.onerror = () => {
          console.warn("Error reading logo file");
          resolve();
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      // Continue without logo if there's an error
      console.warn("Logo loading error:", error);
    }
  };
  
  // Add logo at the top of the first page
  await addLogoToPDF(doc, 10);
  
  // Calculate totals (same as XLSX) - separate principal from prepayment
  const totalPrincipal = Math.round(
    schedule.reduce((sum, entry) => {
      const prepaymentAmount = entry.prepayment || 0;
      const actualPrincipal = entry.principal - prepaymentAmount;
      return sum + actualPrincipal;
    }, 0)
  );
  const totalInterest = Math.round(
    schedule.reduce((sum, entry) => sum + entry.interest, 0)
  );
  const totalPrepayment = showPrepayment
    ? Math.round(schedule.reduce((sum, entry) => sum + (entry.prepayment || 0), 0))
    : 0;
  // Total Payment = Principal + Interest + Prepayment
  const totalPayment = totalPrincipal + totalInterest + totalPrepayment;
  const remainingBalance = Math.round(schedule[schedule.length - 1]?.balance || 0);
  const totalInterestPercent = ((totalInterest / originalPrincipal) * 100).toFixed(2);
  const loanPaidPercent = (((originalPrincipal - remainingBalance) / originalPrincipal) * 100).toFixed(2);
  
  // Title (same as XLSX) - adjust position if logo was added
  const titleYPos = 50; // Start below logo area
  doc.setFontSize(18);
  doc.text("Loan Amortization Schedule", 14, titleYPos);
  
  let yPos = titleYPos + 10;
  
  // Loan Details Section (same as XLSX)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Loan Details", 14, yPos);
  yPos += 7;
  
  // Helper function to format numbers without currency symbol for PDF
  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString("en-IN");
  };
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Loan Amount: ${formatNumber(loanDetails.principal)}`, 14, yPos);
  yPos += 7;
  doc.text(`Interest Rate: ${loanDetails.rate.toFixed(1)}% per annum`, 14, yPos);
  yPos += 7;
  doc.text(`Loan Tenure: ${loanDetails.tenure} years (${loanDetails.tenure * 12} months)`, 14, yPos);
  yPos += 7;
  doc.text(`Monthly EMI: ${formatNumber(loanDetails.emi)}`, 14, yPos);
  yPos += 7;
  doc.text(`Total Number of Payments: ${schedule.length}`, 14, yPos);
  yPos += 10;
  
  // Payment Summary Section (same as XLSX)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Summary", 14, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Principal Paid: ${formatNumber(totalPrincipal)}`, 14, yPos);
  yPos += 7;
  doc.text(`Total Interest Paid: ${formatNumber(totalInterest)}`, 14, yPos);
  yPos += 7;
  doc.text(`Total Amount Paid: ${formatNumber(totalPayment)}`, 14, yPos);
  yPos += 7;
  doc.text(`Original Loan Amount: ${formatNumber(originalPrincipal)}`, 14, yPos);
  yPos += 7;
  doc.text(`Remaining Balance: ${formatNumber(remainingBalance)}`, 14, yPos);
  if (showPrepayment) {
    yPos += 7;
    doc.text(`Total Prepayment: ${formatNumber(totalPrepayment)}`, 14, yPos);
  }
  yPos += 7;
  doc.text(`Total Interest as % of Principal: ${totalInterestPercent}%`, 14, yPos);
  yPos += 7;
  doc.text(`Loan Paid %: ${loanPaidPercent}%`, 14, yPos);
  yPos += 10;
  
  // Amortization Schedule Table (same structure as XLSX - all months, not filtered)
  // Use all schedule entries, not filtered by viewMode
  const tableSchedule = schedule;
  
  // Build columns based on showPrepayment (same as XLSX)
  const columns = [
    "Month #",
    "Period",
    "Principal",
    "Interest",
    ...(showPrepayment ? ["Prepayment"] : []),
    "Total Payment",
    "Balance",
    "Loan Paid %",
  ];
  
  const tableData = tableSchedule.map((entry, index) => {
    const loanPaidPercent =
      ((originalPrincipal - entry.balance) / originalPrincipal) * 100;
    const prepaymentAmount = entry.prepayment || 0;
    const actualPrincipal = entry.principal - prepaymentAmount;
    const totalPayment = actualPrincipal + entry.interest + prepaymentAmount;
    
    const baseRow = [
      (index + 1).toString(), // Month #
      entry.dateLabel || `Month ${entry.period}`, // Period
      formatNumber(actualPrincipal), // Principal (rounded, without prepayment)
      formatNumber(entry.interest), // Interest (rounded, no currency symbol)
    ];
    
    if (showPrepayment) {
      return [
        ...baseRow,
        formatNumber(prepaymentAmount), // Prepayment (rounded, no currency symbol)
        formatNumber(totalPayment), // Total Payment = Principal + Interest + Prepayment
        formatNumber(entry.balance), // Balance (rounded, no currency symbol)
        `${loanPaidPercent.toFixed(2)}%`, // Loan Paid % (2 decimals)
      ];
    } else {
      return [
        ...baseRow,
        formatNumber(totalPayment), // Total Payment = Principal + Interest
        formatNumber(entry.balance), // Balance (rounded, no currency symbol)
        `${loanPaidPercent.toFixed(2)}%`, // Loan Paid % (2 decimals)
      ];
    }
  });
  
  // Amortization Schedule Header (same as XLSX)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Amortization Schedule", 14, yPos);
  yPos += 10;
  
  // Add table with all schedule entries (same as XLSX - shows all months)
  callAutoTable(doc, {
    head: [columns],
    body: tableData,
    startY: yPos,
    styles: { fontSize: 6, cellPadding: 1.5 },
    headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" },
    columnStyles: {
      0: { cellWidth: showPrepayment ? 12 : 15 }, // Month #
      1: { cellWidth: showPrepayment ? 20 : 25 }, // Period
      2: { cellWidth: 22 }, // Principal
      3: { cellWidth: 22 }, // Interest
      ...(showPrepayment
        ? {
            4: { cellWidth: 22 }, // Prepayment
            5: { cellWidth: 22 }, // Total Payment
            6: { cellWidth: 22 }, // Balance
            7: { cellWidth: 18 }, // Loan Paid %
          }
        : {
            4: { cellWidth: 22 }, // Total Payment
            5: { cellWidth: 22 }, // Balance
            6: { cellWidth: 18 }, // Loan Paid %
          }),
    },
    margin: { left: 14, right: 14 },
  });
  
  // Add watermark and copyright footer to all pages
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addWatermark(doc, i);
    addCopyrightFooter(doc);
  }
  
  // Go back to first page
  doc.setPage(1);
  
  doc.save(`amortization-schedule-${Date.now()}.pdf`);
}
