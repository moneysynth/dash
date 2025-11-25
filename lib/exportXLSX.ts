import * as XLSX from "xlsx";
import type { AmortizationEntry } from "@/types";
import { formatCurrency } from "./utils";

interface LoanDetails {
  principal: number;
  rate: number;
  tenure: number;
  emi: number;
}

export function exportAmortizationToXLSX(
  schedule: AmortizationEntry[],
  loanDetails: LoanDetails
): void {
  const workbook = XLSX.utils.book_new();

  // Calculate totals
  const totalPrincipal = schedule.reduce((sum, entry) => sum + entry.principal, 0);
  const totalInterest = schedule.reduce((sum, entry) => sum + entry.interest, 0);
  const totalPayment = schedule.reduce((sum, entry) => sum + entry.payment, 0);
  const originalPrincipal = loanDetails.principal;

  // 1. Loan Details Sheet
  const loanDetailsData = [
    ["Loan Details"],
    ["Loan Amount", formatCurrency(loanDetails.principal)],
    ["Interest Rate", `${loanDetails.rate}% per annum`],
    ["Loan Tenure", `${loanDetails.tenure} years (${loanDetails.tenure * 12} months)`],
    ["Monthly EMI", formatCurrency(loanDetails.emi)],
    ["Total Number of Payments", schedule.length],
  ];

  const loanDetailsWS = XLSX.utils.aoa_to_sheet(loanDetailsData);
  
  // Style the header
  if (!loanDetailsWS["!cols"]) loanDetailsWS["!cols"] = [];
  loanDetailsWS["!cols"][0] = { wch: 25 };
  loanDetailsWS["!cols"][1] = { wch: 20 };
  
  XLSX.utils.book_append_sheet(workbook, loanDetailsWS, "Loan Details");

  // 2. Payment Summary Sheet
  const paymentSummaryData = [
    ["Payment Summary"],
    ["Total Principal Paid", formatCurrency(totalPrincipal)],
    ["Total Interest Paid", formatCurrency(totalInterest)],
    ["Total Amount Paid", formatCurrency(totalPayment)],
    ["Original Loan Amount", formatCurrency(originalPrincipal)],
    ["Total Interest as % of Principal", `${((totalInterest / originalPrincipal) * 100).toFixed(2)}%`],
  ];

  const paymentSummaryWS = XLSX.utils.aoa_to_sheet(paymentSummaryData);
  
  if (!paymentSummaryWS["!cols"]) paymentSummaryWS["!cols"] = [];
  paymentSummaryWS["!cols"][0] = { wch: 30 };
  paymentSummaryWS["!cols"][1] = { wch: 20 };
  
  XLSX.utils.book_append_sheet(workbook, paymentSummaryWS, "Payment Summary");

  // 3. Amortization Table Sheet
  const amortizationHeaders = [
    "Month #",
    "Period",
    "Principal",
    "Interest",
    "Total Payment",
    "Balance",
    "Loan Paid %",
  ];

  const amortizationData = schedule.map((entry, index) => {
    const loanPaidPercent = ((originalPrincipal - entry.balance) / originalPrincipal) * 100;
    return [
      index + 1, // Month #
      entry.dateLabel || `Month ${entry.period}`,
      entry.principal, // Keep as number for Excel formatting
      entry.interest, // Keep as number for Excel formatting
      entry.payment, // Keep as number for Excel formatting
      entry.balance, // Keep as number for Excel formatting
      Number(loanPaidPercent.toFixed(2)), // Keep as number for Excel formatting
    ];
  });

  const amortizationTableData = [amortizationHeaders, ...amortizationData];
  const amortizationWS = XLSX.utils.aoa_to_sheet(amortizationTableData);

  // Set column widths
  if (!amortizationWS["!cols"]) amortizationWS["!cols"] = [];
  amortizationWS["!cols"][0] = { wch: 10 }; // Month #
  amortizationWS["!cols"][1] = { wch: 15 }; // Period
  amortizationWS["!cols"][2] = { wch: 18 }; // Principal
  amortizationWS["!cols"][3] = { wch: 18 }; // Interest
  amortizationWS["!cols"][4] = { wch: 18 }; // Total Payment
  amortizationWS["!cols"][5] = { wch: 18 }; // Balance
  amortizationWS["!cols"][6] = { wch: 15 }; // Loan Paid %

  // Style header row
  const headerRange = XLSX.utils.decode_range(amortizationWS["!ref"] || "A1");
  for (let col = 0; col <= headerRange.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!amortizationWS[cellAddress]) continue;
    if (!amortizationWS[cellAddress].s) amortizationWS[cellAddress].s = {};
    amortizationWS[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "2563EB" } },
      alignment: { horizontal: "center" },
    };
  }

  XLSX.utils.book_append_sheet(workbook, amortizationWS, "Amortization Schedule");

  // Generate filename
  const filename = `amortization-schedule-${Date.now()}.xlsx`;

  // Write file
  XLSX.writeFile(workbook, filename);
}

