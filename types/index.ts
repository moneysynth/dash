export interface CalculatorInputs {
  principal?: number;
  rate?: number;
  tenure?: number;
  monthlyPayment?: number;
  expectedReturn?: number;
  withdrawalAmount?: number;
}

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principal: number;
  interest: number;
}

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  monthlyContribution: number;
  rate: number;
  tenure: number;
}

export interface SWPResult {
  initialAmount: number;
  monthlyWithdrawal: number;
  rate: number;
  tenure: number;
  finalAmount: number;
  totalWithdrawn: number;
  totalInterest: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  content?: string;
  keywords?: string[];
}

export interface ChartData {
  name: string;
  value: number;
  label?: string;
}

// Common calculator props
export interface CalculatorBaseProps {
  currency?: string;
  theme?: "light" | "dark";
  onCalculate?: (result: Record<string, unknown>) => void;
}

// Amortization table interface
export interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  year?: number;
  month?: number;
  date?: Date; // Payment date
  dateLabel?: string; // Formatted date label (e.g., "Nov 2025")
  prepayment?: number; // Prepayment amount (for Advanced Calculator)
}

// Investment result interface
export interface InvestmentResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  growthChart: ChartData[];
  xirr?: number;
}

// RD Calculator
export interface RDResult {
  monthlyDeposit: number;
  rate: number;
  tenure: number;
  maturityAmount: number;
  totalDeposited: number;
  interestEarned: number;
  tds?: number;
}

// FD Calculator
export interface FDResult {
  principal: number;
  rate: number;
  tenure: number;
  compounding: number;
  maturityAmount: number;
  interestEarned: number;
  tds?: number;
  payoutOption?: "monthly" | "quarterly" | "cumulative";
}

// Step-up SIP
export interface StepUpSIPResult {
  initialSIP: number;
  stepUpRate: number;
  years: number;
  returns: number;
  totalInvested: number;
  finalValue: number;
  wealthGain: number;
  growthChart: ChartData[];
}

// Lumpsum Calculator
export interface LumpsumResult {
  principal: number;
  rate: number;
  tenure: number;
  futureValue: number;
  returns: number;
  inflationAdjusted?: number;
}

// Goal-Based Calculator
export interface GoalBasedResult {
  goalAmount: number;
  timeline: number;
  currentAge?: number;
  targetAge?: number;
  inflationRate: number;
  expectedReturns: number;
  requiredSIP: number;
  requiredLumpsum: number;
  strategy: "sip" | "lumpsum" | "mixed";
  progressChart: ChartData[];
}

// Part Payment
export interface PartPayment {
  amount: number;
  date: number; // month number
  type: "one-time" | "recurring";
  frequency?: number; // for recurring
}

// Step-up EMI
export interface StepUpEMI {
  enabled: boolean;
  stepUpRate: number; // Annual percentage increase (e.g., 5 for 5%)
  startDate?: { month: number; year: number }; // Month and year when step-up starts
}

// Advanced EMI
export interface AdvancedEMIResult extends EMIResult {
  partPayments?: PartPayment[];
  scenarios?: EMIResult[];
  breakEvenMonth?: number;
}

