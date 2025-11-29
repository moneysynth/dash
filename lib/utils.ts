import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AmortizationEntry } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: "INR" | "USD" | "EUR" | "GBP" = "INR"): string {
  const currencyConfig: Record<typeof currency, { locale: string }> = {
    INR: { locale: "en-IN" },
    USD: { locale: "en-US" },
    EUR: { locale: "de-DE" },
    GBP: { locale: "en-GB" },
  };

  const config = currencyConfig[currency];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function calculateEMI(
  principal: number,
  rate: number,
  tenure: number
): number {
  const monthlyRate = rate / 12 / 100;
  const numPayments = tenure * 12;
  
  if (monthlyRate === 0) {
    return principal / numPayments;
  }
  
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  return emi;
}

export function calculateSIP(
  monthlyAmount: number,
  rate: number,
  tenure: number
): number {
  const monthlyRate = rate / 12 / 100;
  const numPayments = tenure * 12;
  
  if (monthlyRate === 0) {
    return monthlyAmount * numPayments;
  }
  
  const futureValue =
    monthlyAmount *
    ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) *
    (1 + monthlyRate);
  
  return futureValue;
}

export function calculateSWP(
  initialAmount: number,
  monthlyWithdrawal: number,
  rate: number,
  tenure: number
): { finalAmount: number; totalWithdrawn: number; totalInterest: number } {
  let balance = initialAmount;
  const monthlyRate = rate / 12 / 100;
  const numMonths = tenure * 12;
  let totalWithdrawn = 0;
  
  for (let month = 0; month < numMonths; month++) {
    if (balance <= 0) break;
    
    // Add interest
    balance = balance * (1 + monthlyRate);
    
    // Withdraw
    const withdrawal = Math.min(monthlyWithdrawal, balance);
    balance -= withdrawal;
    totalWithdrawn += withdrawal;
  }
  
  const totalInterest = totalWithdrawn + balance - initialAmount;
  
  return {
    finalAmount: Math.max(0, balance),
    totalWithdrawn,
    totalInterest,
  };
}

// RD Calculation
export function calculateRD(
  monthlyDeposit: number,
  rate: number,
  years: number
): number {
  const n = years * 12;
  const r = rate / 100 / 12;
  
  if (r === 0) {
    return monthlyDeposit * n;
  }
  
  return monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

// FD Calculation
export function calculateFD(
  principal: number,
  rate: number,
  years: number,
  compounding: number = 4 // quarterly by default
): number {
  return principal * Math.pow(1 + rate / 100 / compounding, compounding * years);
}

// Step-up SIP Calculation
export function calculateStepUpSIP(
  initialSIP: number,
  stepUpRate: number,
  years: number,
  returns: number
): { totalInvested: number; finalValue: number; wealthGain: number } {
  const monthlyRate = returns / 12 / 100;
  const stepUpDecimal = stepUpRate / 100;
  let totalInvested = 0;
  let balance = 0;
  
  for (let year = 0; year < years; year++) {
    const currentSIP = initialSIP * Math.pow(1 + stepUpDecimal, year);
    
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + currentSIP;
      totalInvested += currentSIP;
    }
  }
  
  const wealthGain = balance - totalInvested;
  
  return {
    totalInvested,
    finalValue: balance,
    wealthGain,
  };
}

// Lumpsum Calculation
export function calculateLumpsum(
  principal: number,
  rate: number,
  years: number
): number {
  return principal * Math.pow(1 + rate / 100, years);
}

// Inflation-adjusted returns
export function calculateInflationAdjusted(
  futureValue: number,
  inflationRate: number,
  years: number
): number {
  return futureValue / Math.pow(1 + inflationRate / 100, years);
}

// Generate Amortization Schedule
export function generateAmortizationSchedule(
  principal: number,
  rate: number,
  tenure: number,
  emi: number,
  startDate?: { month: number; year: number }
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  const monthlyRate = rate / 12 / 100;
  let balance = principal;
  
  // Default to current month/year if not provided
  const currentDate = new Date();
  const startMonth = startDate?.month || currentDate.getMonth() + 1;
  const startYear = startDate?.year || currentDate.getFullYear();
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  for (let month = 1; month <= tenure * 12; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = emi - interest;
    balance -= principalPayment;
    
    // Calculate payment date (month is 1-indexed, Date months are 0-indexed)
    const paymentDateObj = new Date(startYear, startMonth - 1 + month - 1, 1);
    const paymentYear = paymentDateObj.getFullYear();
    const paymentMonth = paymentDateObj.getMonth(); // 0-indexed
    const dateLabel = `${monthNames[paymentMonth]} ${paymentYear}`;
    
    schedule.push({
      period: month,
      payment: emi,
      principal: principalPayment,
      interest: interest,
      balance: Math.max(0, balance),
      year: Math.ceil(month / 12),
      month: ((month - 1) % 12) + 1,
      date: paymentDateObj,
      dateLabel: dateLabel,
    });
  }
  
  return schedule;
}

// Export to CSV
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Format in Lakhs/Crores
export function formatInIndianUnits(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return formatCurrency(amount);
}

