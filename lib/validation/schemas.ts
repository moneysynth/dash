import { z } from "zod";

// Base schemas for common input types
export const positiveNumberSchema = z.number().positive("Value must be greater than 0");
export const nonNegativeNumberSchema = z.number().min(0, "Value must be 0 or greater");

// Month/Year schema
export const monthYearSchema = z.object({
  month: z.number().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
  year: z.number().min(1900, "Year must be valid").max(2100, "Year must be valid"),
});

// Loan Calculator Schemas
export const loanPrincipalSchema = positiveNumberSchema
  .min(10000, "Loan amount must be at least ₹10,000")
  .max(100000000, "Loan amount must not exceed ₹10 crore");

export const interestRateSchema = z.number()
  .min(0.1, "Interest rate must be at least 0.1%")
  .max(30, "Interest rate must not exceed 30%");

export const loanTenureSchema = z.number()
  .min(0.5, "Tenure must be at least 0.5 years")
  .max(30, "Tenure must not exceed 30 years");

export const personalLoanTenureSchema = z.number()
  .min(1, "Tenure must be at least 1 year")
  .max(7, "Tenure must not exceed 7 years");

export const carLoanTenureSchema = z.number()
  .min(1, "Tenure must be at least 1 year")
  .max(7, "Tenure must not exceed 7 years");

export const creditCardTenureSchema = z.number()
  .min(0.5, "Tenure must be at least 0.5 years")
  .max(5, "Tenure must not exceed 5 years");

// Part Payment Schema
export const partPaymentSchema = z.object({
  amount: positiveNumberSchema.min(1000, "Part payment must be at least ₹1,000"),
  date: z.number().min(1, "Payment month must be at least 1").max(360, "Payment month must not exceed 360"),
  type: z.enum(["one-time", "recurring"]),
  frequency: z.number().min(1).max(12).optional(),
});

export const partPaymentsSchema = z.array(partPaymentSchema).max(50, "Maximum 50 part payments allowed");

// Step-up EMI Schema
export const stepUpEMISchema = z.object({
  enabled: z.boolean(),
  stepUpRate: z.number().min(0, "Step-up rate must be 0% or greater").max(50, "Step-up rate must not exceed 50%"),
  startDate: monthYearSchema.optional(),
});

// EMI Calculator Schema
export const emiCalculatorSchema = z.object({
  principal: loanPrincipalSchema,
  rate: interestRateSchema,
  tenure: loanTenureSchema,
  startDate: monthYearSchema,
  partPayments: partPaymentsSchema.optional().default([]),
  stepUpEMI: stepUpEMISchema.optional(),
});

// Personal Loan Calculator Schema
export const personalLoanCalculatorSchema = z.object({
  principal: positiveNumberSchema
    .min(50000, "Loan amount must be at least ₹50,000")
    .max(5000000, "Loan amount must not exceed ₹50 lakh"),
  rate: interestRateSchema,
  tenure: personalLoanTenureSchema,
  startDate: monthYearSchema,
});

// Car Loan Calculator Schema
export const carLoanCalculatorSchema = z.object({
  principal: positiveNumberSchema
    .min(100000, "Loan amount must be at least ₹1,00,000")
    .max(5000000, "Loan amount must not exceed ₹50 lakh"),
  rate: interestRateSchema,
  tenure: carLoanTenureSchema,
  startDate: monthYearSchema,
});

// Credit Card EMI Calculator Schema
export const creditCardEMICalculatorSchema = z.object({
  principal: positiveNumberSchema
    .min(1000, "Amount must be at least ₹1,000")
    .max(1000000, "Amount must not exceed ₹10 lakh"),
  rate: interestRateSchema,
  tenure: creditCardTenureSchema,
  rateType: z.enum(["per-annum", "per-month"]).optional(),
});

// Loan Eligibility Calculator Schema
export const loanEligibilityCalculatorSchema = z.object({
  monthlyIncome: positiveNumberSchema
    .min(10000, "Monthly income must be at least ₹10,000")
    .max(10000000, "Monthly income must not exceed ₹1 crore"),
  monthlyExpenses: nonNegativeNumberSchema
    .max(10000000, "Monthly expenses must not exceed ₹1 crore"),
  existingEMI: nonNegativeNumberSchema
    .max(1000000, "Existing EMI must not exceed ₹10 lakh"),
  interestRate: interestRateSchema,
  tenure: loanTenureSchema,
});

// Investment Calculator Schemas
export const investmentAmountSchema = positiveNumberSchema
  .min(1000, "Investment amount must be at least ₹1,000")
  .max(100000000, "Investment amount must not exceed ₹10 crore");

export const monthlyInvestmentSchema = positiveNumberSchema
  .min(500, "Monthly investment must be at least ₹500")
  .max(1000000, "Monthly investment must not exceed ₹10 lakh");

export const investmentRateSchema = z.number()
  .min(1, "Expected returns must be at least 1%")
  .max(30, "Expected returns must not exceed 30%");

export const investmentTenureSchema = z.number()
  .min(1, "Investment period must be at least 1 year")
  .max(50, "Investment period must not exceed 50 years");

export const inflationRateSchema = z.number()
  .min(0, "Inflation rate must be 0% or greater")
  .max(20, "Inflation rate must not exceed 20%");

// SIP Calculator Schema
export const sipCalculatorSchema = z.object({
  monthlyAmount: monthlyInvestmentSchema,
  rate: investmentRateSchema,
  tenure: investmentTenureSchema,
});

// Lumpsum Calculator Schema
export const lumpsumCalculatorSchema = z.object({
  principal: investmentAmountSchema,
  rate: investmentRateSchema,
  tenure: investmentTenureSchema,
  inflationRate: inflationRateSchema,
});

// FD Calculator Schema
export const fdCalculatorSchema = z.object({
  principal: investmentAmountSchema
    .min(10000, "Deposit amount must be at least ₹10,000")
    .max(10000000, "Deposit amount must not exceed ₹1 crore"),
  rate: z.number()
    .min(3, "Interest rate must be at least 3%")
    .max(12, "Interest rate must not exceed 12%"),
  tenure: z.number()
    .min(0.5, "Tenure must be at least 0.5 years")
    .max(10, "Tenure must not exceed 10 years"),
  compounding: z.number().min(1).max(365).refine(
    (val) => [1, 2, 4, 12, 365].includes(val),
    "Compounding frequency must be 1 (yearly), 2 (half-yearly), 4 (quarterly), 12 (monthly), or 365 (daily)"
  ),
  payoutOption: z.enum(["monthly", "quarterly", "cumulative"]),
  isSeniorCitizen: z.boolean(),
});

// RD Calculator Schema
export const rdCalculatorSchema = z.object({
  monthlyDeposit: monthlyInvestmentSchema
    .min(100, "Monthly deposit must be at least ₹100")
    .max(100000, "Monthly deposit must not exceed ₹1 lakh"),
  rate: z.number()
    .min(3, "Interest rate must be at least 3%")
    .max(9, "Interest rate must not exceed 9%"),
  tenure: z.number()
    .min(0.5, "Tenure must be at least 0.5 years")
    .max(10, "Tenure must not exceed 10 years"),
});

// Step-up SIP Calculator Schema
export const stepUpSIPCalculatorSchema = z.object({
  initialAmount: monthlyInvestmentSchema,
  stepUpRate: z.number()
    .min(0, "Step-up rate must be 0% or greater")
    .max(50, "Step-up rate must not exceed 50%"),
  stepUpFrequency: z.enum(["yearly", "half-yearly", "quarterly"]),
  rate: investmentRateSchema,
  tenure: investmentTenureSchema,
});

// SWP Calculator Schema
export const swpCalculatorSchema = z.object({
  principal: investmentAmountSchema,
  monthlyWithdrawal: monthlyInvestmentSchema,
  rate: investmentRateSchema,
  tenure: investmentTenureSchema,
});

// Goal-Based MF Calculator Schema
export const goalBasedMFCalculatorSchema = z.object({
  goalAmount: investmentAmountSchema,
  currentAge: z.number().min(18, "Age must be at least 18").max(80, "Age must not exceed 80"),
  retirementAge: z.number().min(40, "Retirement age must be at least 40").max(100, "Retirement age must not exceed 100"),
  expectedReturns: investmentRateSchema,
  goalType: z.enum([
    "child-education",
    "house-purchase",
    "retirement",
    "vacation",
    "marriage",
    "emergency-fund",
    "other",
  ]),
}).refine((data) => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age",
  path: ["retirementAge"],
});

// Mutual Fund Returns Calculator Schema
export const mutualFundReturnsCalculatorSchema = z.object({
  principal: investmentAmountSchema,
  rate: investmentRateSchema,
  tenure: investmentTenureSchema,
  sipAmount: monthlyInvestmentSchema.optional(),
});

// General Calculator Schemas
// Salary Calculator Schema
export const salaryCalculatorSchema = z.object({
  ctc: positiveNumberSchema
    .min(100000, "Annual CTC must be at least ₹1,00,000")
    .max(200000000, "Annual CTC must not exceed ₹2 crore"),
  basicPercentage: z.number()
    .min(15, "Basic salary percentage must be at least 15%")
    .max(100, "Basic salary percentage must not exceed 100%"),
  hraPercentage: z.number()
    .min(0, "HRA percentage must be 0% or greater")
    .max(100, "HRA percentage must not exceed 100%"),
  professionalTax: nonNegativeNumberSchema
    .max(5000, "Professional tax must not exceed ₹5,000"),
  basicMode: z.enum(["percentage", "amount"]),
  hraMode: z.enum(["percentage", "amount"]),
  basicAmount: nonNegativeNumberSchema.optional(),
  hraAmount: nonNegativeNumberSchema.optional(),
}).refine((data) => {
  if (data.basicMode === "percentage") {
    return data.basicPercentage + data.hraPercentage <= 100;
  }
  return true;
}, {
  message: "Basic + HRA percentage cannot exceed 100%",
  path: ["hraPercentage"],
});

// Percentage Calculator Schema
export const percentageCalculatorSchema = z.object({
  value: positiveNumberSchema,
  percentage: z.number()
    .min(-100, "Percentage must be between -100% and 1000%")
    .max(1000, "Percentage must be between -100% and 1000%"),
  calculationType: z.enum(["basic", "change"]),
  changeType: z.enum(["increase", "decrease"]).optional(),
});

// Age Calculator Schema
export const ageCalculatorSchema = z.object({
  birthDate: z.date(),
  compareDate: z.date(),
}).refine((data) => data.compareDate >= data.birthDate, {
  message: "Compare date must be after or equal to birth date",
  path: ["compareDate"],
});

// Advanced EMI Comparison Schema
export const advancedScenarioSchema = z.object({
  principal: loanPrincipalSchema,
  rate: interestRateSchema,
  tenure: loanTenureSchema,
  startDate: monthYearSchema,
  partPayments: partPaymentsSchema.optional().default([]),
  stepUpEMI: stepUpEMISchema.optional(),
});

export const advancedEMIComparisonSchema = z.object({
  scenarios: z.array(advancedScenarioSchema).min(1, "At least one scenario is required").max(3, "Maximum 3 scenarios allowed"),
});

// Type exports for TypeScript
export type EMICalculatorInput = z.infer<typeof emiCalculatorSchema>;
export type PersonalLoanCalculatorInput = z.infer<typeof personalLoanCalculatorSchema>;
export type CarLoanCalculatorInput = z.infer<typeof carLoanCalculatorSchema>;
export type CreditCardEMICalculatorInput = z.infer<typeof creditCardEMICalculatorSchema>;
export type LoanEligibilityCalculatorInput = z.infer<typeof loanEligibilityCalculatorSchema>;
export type SIPCalculatorInput = z.infer<typeof sipCalculatorSchema>;
export type LumpsumCalculatorInput = z.infer<typeof lumpsumCalculatorSchema>;
export type FDCalculatorInput = z.infer<typeof fdCalculatorSchema>;
export type RDCalculatorInput = z.infer<typeof rdCalculatorSchema>;
export type StepUpSIPCalculatorInput = z.infer<typeof stepUpSIPCalculatorSchema>;
export type SWPCalculatorInput = z.infer<typeof swpCalculatorSchema>;
export type GoalBasedMFCalculatorInput = z.infer<typeof goalBasedMFCalculatorSchema>;
export type MutualFundReturnsCalculatorInput = z.infer<typeof mutualFundReturnsCalculatorSchema>;
export type SalaryCalculatorInput = z.infer<typeof salaryCalculatorSchema>;
export type PercentageCalculatorInput = z.infer<typeof percentageCalculatorSchema>;
export type AgeCalculatorInput = z.infer<typeof ageCalculatorSchema>;
export type AdvancedEMIComparisonInput = z.infer<typeof advancedEMIComparisonSchema>;

