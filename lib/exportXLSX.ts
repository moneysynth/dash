import type { AmortizationEntry } from "@/types";
import type { Currency } from "@/contexts/CurrencyContext";
import { formatCurrency as formatCurrencyUtil } from "./utils";

interface LoanDetails {
  principal: number;
  rate: number;
  tenure: number;
  emi: number;
}

// Cache for loaded module
let XLSXModule: typeof import("xlsx") | null = null;
let XLSXLoading: Promise<typeof import("xlsx")> | null = null;

// Dynamically load xlsx
async function loadXLSX(): Promise<typeof import("xlsx")> {
  if (XLSXModule) {
    return XLSXModule;
  }
  
  if (XLSXLoading) {
    return XLSXLoading;
  }
  
  XLSXLoading = import("xlsx").then((module) => {
    XLSXModule = module;
    return XLSXModule;
  });
  
  return XLSXLoading;
}

export async function exportAmortizationToXLSX(
  schedule: AmortizationEntry[],
  loanDetails: LoanDetails,
  showPrepayment: boolean = false,
  currency: Currency = "INR"
): Promise<void> {
  const formatCurrency = (amount: number) => formatCurrencyUtil(amount, currency);
  // Dynamically load xlsx
  const XLSX = await loadXLSX();
  
  const workbook = XLSX.utils.book_new();
  const originalPrincipal = loanDetails.principal;

  // Calculate totals - separate principal from prepayment
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

  // Single sheet with all information
  const sheetData: (string | number)[][] = [
    // Title
    ["Loan Amortization Schedule"],
    [], // Empty row
    
    // Loan Details Section
    ["Loan Details"],
    ["Loan Amount", Math.round(loanDetails.principal)],
    ["Interest Rate", Number(loanDetails.rate.toFixed(1))], // 1 decimal
    ["Loan Tenure", `${loanDetails.tenure} years (${loanDetails.tenure * 12} months)`],
    ["Monthly EMI", Math.round(loanDetails.emi)],
    ["Total Number of Payments", schedule.length],
    [], // Empty row
    
    // Payment Summary Section
    ["Payment Summary"],
    ["Total Principal Paid", totalPrincipal],
    ["Total Interest Paid", totalInterest],
    ["Total Amount Paid", totalPayment],
    ["Original Loan Amount", Math.round(originalPrincipal)],
    ["Remaining Balance", Math.round(schedule[schedule.length - 1]?.balance || 0)],
    ...(showPrepayment
      ? [
          [
            "Total Prepayment",
            totalPrepayment,
          ],
        ]
      : []),
    [
      "Total Interest as % of Principal",
      Number(((totalInterest / originalPrincipal) * 100).toFixed(2)),
    ], // 2 decimals
    [
      "Loan Paid %",
      Number(
        (((originalPrincipal - (schedule[schedule.length - 1]?.balance || 0)) /
          originalPrincipal) *
          100).toFixed(2)
      ),
    ], // 2 decimals
    [], // Empty row
    [], // Empty row
    
    // Amortization Schedule Table
    ["Amortization Schedule"],
    [], // Empty row
    // Headers
    showPrepayment
      ? [
          "Month #",
          "Period",
          "Principal",
          "Interest",
          "Prepayment",
          "Total Payment",
          "Balance",
          "Loan Paid %",
        ]
      : [
          "Month #",
          "Period",
          "Principal",
          "Interest",
          "Total Payment",
          "Balance",
          "Loan Paid %",
        ],
    // Data rows
    ...schedule.map((entry, index) => {
      const loanPaidPercent =
        ((originalPrincipal - entry.balance) / originalPrincipal) * 100;
      const prepaymentAmount = entry.prepayment || 0;
      const actualPrincipal = entry.principal - prepaymentAmount;
      const totalPayment = actualPrincipal + entry.interest + prepaymentAmount;
      
      const baseRow = [
        index + 1, // Month #
        entry.dateLabel || `Month ${entry.period}`,
        Math.round(actualPrincipal), // Principal (rounded, without prepayment)
        Math.round(entry.interest), // Interest (rounded)
      ];
      
      if (showPrepayment) {
        return [
          ...baseRow,
          Math.round(prepaymentAmount), // Prepayment (rounded)
          Math.round(totalPayment), // Total Payment = Principal + Interest + Prepayment
          Math.round(entry.balance), // Balance (rounded)
          Number(loanPaidPercent.toFixed(2)), // 2 decimals
        ];
      } else {
        return [
          ...baseRow,
          Math.round(totalPayment), // Total Payment = Principal + Interest
          Math.round(entry.balance), // Balance (rounded)
          Number(loanPaidPercent.toFixed(2)), // 2 decimals
        ];
      }
    }),
  ];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Set column widths
  // Note: Column widths apply to the entire sheet
  // Summary section uses columns A (0) and B (1)
  // Amortization table also uses columns A (0) through G (6) or H (7) depending on showPrepayment
  // We set widths to accommodate both sections (table columns take precedence for shared columns)
  if (!ws["!cols"]) ws["!cols"] = [];
  
  // Column 0: Used for both summary labels and table "Month #" - use wider for summary, but table will work
  ws["!cols"][0] = { wch: 10 }; // Month # column (table) / Label column (summary - will be wider in practice)
  ws["!cols"][1] = { wch: 15 }; // Period column (table) / Value column (summary - will be wider in practice)
  ws["!cols"][2] = { wch: 18 }; // Principal column
  ws["!cols"][3] = { wch: 18 }; // Interest column
  
  if (showPrepayment) {
    ws["!cols"][4] = { wch: 18 }; // Prepayment column
    ws["!cols"][5] = { wch: 18 }; // Total Payment column
    ws["!cols"][6] = { wch: 18 }; // Balance column
    ws["!cols"][7] = { wch: 15 }; // Loan Paid % column
  } else {
    ws["!cols"][4] = { wch: 18 }; // Total Payment column
    ws["!cols"][5] = { wch: 18 }; // Balance column
    ws["!cols"][6] = { wch: 15 }; // Loan Paid % column
  }

  // Style headers and sections
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");

  // Find row indices for styling (0-based)
  // Note: Row indices may shift if prepayment row is added to Payment Summary
  const titleRow = 0;
  const loanDetailsRow = 2;
  const paymentSummaryRow = 9;
  // Calculate amortization header row based on whether prepayment is shown
  // Base rows: title(1) + empty(1) + loan details(6) + empty(1) + payment summary(8) + empty(2) = 19
  // If prepayment shown: add 1 more row = 20
  const amortizationHeaderRow = showPrepayment ? 20 : 19; // "Amortization Schedule" header row
  const tableHeaderRow = showPrepayment ? 22 : 21; // Table column headers row

  // Style main title (row 0)
  const titleCell = XLSX.utils.encode_cell({ r: titleRow, c: 0 });
  if (ws[titleCell]) {
    if (!ws[titleCell].s) ws[titleCell].s = {};
    ws[titleCell].s = {
      font: { bold: true, sz: 16 },
    };
  }

  // Style "Loan Details" header (row 2)
  const loanDetailsHeaderCell = XLSX.utils.encode_cell({ r: loanDetailsRow, c: 0 });
  if (ws[loanDetailsHeaderCell]) {
    if (!ws[loanDetailsHeaderCell].s) ws[loanDetailsHeaderCell].s = {};
    ws[loanDetailsHeaderCell].s = {
      font: { bold: true, sz: 12 },
      fill: { fgColor: { rgb: "E3F2FD" } },
    };
  }

  // Style "Payment Summary" header (row 9)
  const paymentSummaryHeaderCell = XLSX.utils.encode_cell({
    r: paymentSummaryRow,
    c: 0,
  });
  if (ws[paymentSummaryHeaderCell]) {
    if (!ws[paymentSummaryHeaderCell].s) ws[paymentSummaryHeaderCell].s = {};
    ws[paymentSummaryHeaderCell].s = {
      font: { bold: true, sz: 12 },
      fill: { fgColor: { rgb: "E3F2FD" } },
    };
  }

  // Style "Amortization Schedule" header (row 18)
  const amortizationHeaderCell = XLSX.utils.encode_cell({
    r: amortizationHeaderRow,
    c: 0,
  });
  if (ws[amortizationHeaderCell]) {
    if (!ws[amortizationHeaderCell].s) ws[amortizationHeaderCell].s = {};
    ws[amortizationHeaderCell].s = {
      font: { bold: true, sz: 12 },
      fill: { fgColor: { rgb: "E3F2FD" } },
    };
  }

  // Style amortization table header row
  const maxCol = showPrepayment ? 7 : 6;
  for (let col = 0; col <= maxCol; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: tableHeaderRow, c: col });
    if (ws[cellAddress]) {
      if (!ws[cellAddress].s) ws[cellAddress].s = {};
      ws[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "2563EB" } },
        alignment: { horizontal: "center" },
      };
    }
  }

  // Format currency cells (all rounded values)
  // Loan Details section
  // Row 3: Loan Amount
  const loanAmountCell = XLSX.utils.encode_cell({ r: 3, c: 1 });
  if (ws[loanAmountCell] && typeof ws[loanAmountCell].v === "number") {
    if (!ws[loanAmountCell].s) ws[loanAmountCell].s = {};
    ws[loanAmountCell].s = { numFmt: '"₹"#,##0' };
  }
  
  // Row 4: Interest Rate - 1 decimal
  const interestRateCell = XLSX.utils.encode_cell({ r: 4, c: 1 });
  if (ws[interestRateCell] && typeof ws[interestRateCell].v === "number") {
    if (!ws[interestRateCell].s) ws[interestRateCell].s = {};
    ws[interestRateCell].s = { numFmt: "0.0" };
  }
  
  // Row 6: Monthly EMI
  const emiCell = XLSX.utils.encode_cell({ r: 6, c: 1 });
  if (ws[emiCell] && typeof ws[emiCell].v === "number") {
    if (!ws[emiCell].s) ws[emiCell].s = {};
    ws[emiCell].s = { numFmt: '"₹"#,##0' };
  }

  // Payment Summary section - all currency values (rounded)
  const paymentSummaryCurrencyRows = [10, 11, 12, 13, 14]; // Total Principal, Total Interest, Total Amount, Original Loan, Remaining Balance
  paymentSummaryCurrencyRows.forEach((row) => {
    const cell = XLSX.utils.encode_cell({ r: row, c: 1 });
    if (ws[cell] && typeof ws[cell].v === "number") {
      if (!ws[cell].s) ws[cell].s = {};
      ws[cell].s = { numFmt: '"₹"#,##0' };
    }
  });

  // Percentage cells - 2 decimals
  const percentageRows = [15, 16]; // Total Interest %, Loan Paid %
  percentageRows.forEach((row) => {
    const cell = XLSX.utils.encode_cell({ r: row, c: 1 });
    if (ws[cell] && typeof ws[cell].v === "number") {
      if (!ws[cell].s) ws[cell].s = {};
      ws[cell].s = { numFmt: "0.00" };
    }
  });

  // Format amortization table data rows
  const dataStartRow = tableHeaderRow + 1;
  for (let row = dataStartRow; row <= range.e.r; row++) {
    if (showPrepayment) {
      // Principal, Interest, Prepayment, Total Payment, Balance columns (C, D, E, F, G) - rounded
      for (let col = 2; col <= 6; col++) {
        const cell = XLSX.utils.encode_cell({ r: row, c: col });
        if (ws[cell] && typeof ws[cell].v === "number") {
          if (!ws[cell].s) ws[cell].s = {};
          ws[cell].s = {
            numFmt: '"₹"#,##0', // No decimals
          };
        }
      }
      // Loan Paid % column (H) - 2 decimals
      const percentCell = XLSX.utils.encode_cell({ r: row, c: 7 });
      if (ws[percentCell] && typeof ws[percentCell].v === "number") {
        if (!ws[percentCell].s) ws[percentCell].s = {};
        ws[percentCell].s = {
          numFmt: "0.00", // 2 decimals
        };
      }
    } else {
      // Principal, Interest, Total Payment, Balance columns (C, D, E, F) - rounded
      for (let col = 2; col <= 5; col++) {
        const cell = XLSX.utils.encode_cell({ r: row, c: col });
        if (ws[cell] && typeof ws[cell].v === "number") {
          if (!ws[cell].s) ws[cell].s = {};
          ws[cell].s = {
            numFmt: '"₹"#,##0', // No decimals
          };
        }
      }
      // Loan Paid % column (G) - 2 decimals
      const percentCell = XLSX.utils.encode_cell({ r: row, c: 6 });
      if (ws[percentCell] && typeof ws[percentCell].v === "number") {
        if (!ws[percentCell].s) ws[percentCell].s = {};
        ws[percentCell].s = {
          numFmt: "0.00", // 2 decimals
        };
      }
    }
  }

  XLSX.utils.book_append_sheet(workbook, ws, "Loan Amortization");

  // Generate filename
  const filename = `amortization-schedule-${Date.now()}.xlsx`;

  // Write file
  XLSX.writeFile(workbook, filename);
}
