"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import { validateSchema } from "@/lib/validation/utils";
import { loanEligibilityCalculatorSchema, positiveNumberSchema, nonNegativeNumberSchema, loanTenureSchema } from "@/lib/validation/schemas";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface EligibilityResult {
  eligibleLoanAmount: number;
  maxEMI: number;
  eligibilityScore: number;
  debtToIncomeRatio: number;
  factors: string[];
  suggestions: string[];
}

function calculateLoanEligibility(
  monthlyIncome: number,
  existingEMIs: number,
  tenure: number,
  interestRate: number = 8.5
): EligibilityResult {
  const totalIncome = monthlyIncome;
  
  // Calculate Debt-to-Income (DTI) Ratio
  const debtToIncomeRatio = totalIncome > 0 ? existingEMIs / totalIncome : 0;
  
  // Determine maximum allowed DTI ratio based on current DTI
  // Banks typically allow total DTI (existing + new) up to 50-60%
  // Calculate maximum allowed total DTI up to 60%
  const maxAllowedDTI = 0.6; // 60% maximum total DTI
  
  // Calculate maximum new EMI that can be added
  const maxTotalEMI = totalIncome * maxAllowedDTI;
  const maxNewEMI = Math.max(0, maxTotalEMI - existingEMIs);
  
  // Calculate eligible loan amount using reverse EMI formula
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = tenure * 12;
  
  let eligibleLoanAmount = 0;
  if (monthlyRate > 0 && maxNewEMI > 0) {
    eligibleLoanAmount =
      (maxNewEMI *
        (Math.pow(1 + monthlyRate, numPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
  } else if (maxNewEMI > 0) {
    eligibleLoanAmount = maxNewEMI * numPayments;
  }
  
  // Calculate eligibility score (0-100) based on DTI ratio
  let score = 50; // Base score
  
  // Income factors
  if (totalIncome >= 100000) score += 20;
  else if (totalIncome >= 50000) score += 10;
  else if (totalIncome < 30000) score -= 15;
  
  // Debt-to-Income Ratio factors (lower is better)
  if (debtToIncomeRatio < 0.1) {
    score += 20; // Excellent - very low debt
  } else if (debtToIncomeRatio < 0.2) {
    score += 15; // Good - low debt
  } else if (debtToIncomeRatio < 0.3) {
    score += 10; // Fair - moderate debt
  } else if (debtToIncomeRatio < 0.4) {
    score += 5; // Acceptable - higher debt
  } else if (debtToIncomeRatio < 0.5) {
    score += 0; // Moderate - high debt but manageable
  } else if (debtToIncomeRatio < 0.6) {
    score -= 10; // Risky - very high debt
  } else {
    score -= 25; // Very risky - extremely high debt
  }
  
  // Tenure factor
  if (tenure >= 20) score += 10;
  else if (tenure >= 10) score += 5;
  else if (tenure < 5) score -= 5;
  
  // New loan capacity factor
  if (maxNewEMI > 50000) score += 10;
  else if (maxNewEMI > 20000) score += 5;
  else if (maxNewEMI < 10000) score -= 10;
  
  score = Math.max(0, Math.min(100, score));
  
  // Factors affecting eligibility
  const factors: string[] = [];
  
  // DTI ratio factors
  if (debtToIncomeRatio >= 0.6) {
    factors.push(`Very high debt-to-income ratio (${(debtToIncomeRatio * 100).toFixed(1)}%)`);
  } else if (debtToIncomeRatio >= 0.5) {
    factors.push(`High debt-to-income ratio (${(debtToIncomeRatio * 100).toFixed(1)}%)`);
  } else if (debtToIncomeRatio >= 0.4) {
    factors.push(`Moderate-high debt-to-income ratio (${(debtToIncomeRatio * 100).toFixed(1)}%)`);
  } else if (debtToIncomeRatio >= 0.3) {
    factors.push(`Moderate debt-to-income ratio (${(debtToIncomeRatio * 100).toFixed(1)}%)`);
  } else if (debtToIncomeRatio < 0.2) {
    factors.push(`Low debt-to-income ratio (${(debtToIncomeRatio * 100).toFixed(1)}%) - Good`);
  }
  
  if (totalIncome < 50000) {
    factors.push("Low monthly income");
  }
  
  if (maxNewEMI < 10000) {
    factors.push("Limited capacity for new loan EMI");
  }
  
  if (tenure < 5) {
    factors.push("Short loan tenure");
  }
  
  if (factors.length === 0) {
    factors.push("Good income stability");
    factors.push("Manageable debt-to-income ratio");
    factors.push("Adequate capacity for new loan");
  }
  
  // Suggestions based on DTI ratio
  const suggestions: string[] = [];
  
  if (debtToIncomeRatio >= 0.6) {
    suggestions.push("Your debt-to-income ratio is very high. Consider paying off existing debts first");
    suggestions.push("Reducing existing EMIs will significantly improve your eligibility");
  } else if (debtToIncomeRatio >= 0.5) {
    suggestions.push("Your debt-to-income ratio is high. Consider reducing existing obligations");
    suggestions.push("Paying off some existing loans will increase your eligible loan amount");
  } else if (debtToIncomeRatio >= 0.4) {
    suggestions.push("Your debt-to-income ratio is moderate-high. Consider reducing existing EMIs to improve eligibility");
  } else if (debtToIncomeRatio >= 0.3) {
    suggestions.push("Consider reducing existing EMIs to improve eligibility and loan amount");
  }
  
  if (totalIncome < 50000) {
    suggestions.push("Explore co-applicant option to increase loan amount");
  }
  
  if (tenure < 10 && maxNewEMI > 0) {
    suggestions.push("Extending tenure can increase eligible loan amount");
  }
  
  if (maxNewEMI < 10000) {
    suggestions.push("Wait for income increase or reduce existing obligations to improve eligibility");
  }
  
  if (suggestions.length === 0) {
    suggestions.push("You have good eligibility with a healthy debt-to-income ratio");
    suggestions.push("Consider negotiating better interest rates with lenders");
  }
  
  return {
    eligibleLoanAmount: Math.max(0, eligibleLoanAmount),
    maxEMI: Math.max(0, maxNewEMI),
    eligibilityScore: Math.round(score),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 1000) / 10, // Round to 1 decimal place
    factors,
    suggestions,
  };
}

export function LoanEligibilityCalculator() {
  const { formatCurrency } = useCurrency();
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [existingEMIs, setExistingEMIs] = useState(15000);
  const [tenure, setTenure] = useState(20);
  const maxAllowedExistingObligations = Math.min(100000, monthlyIncome);

  useEffect(() => {
    if (existingEMIs > monthlyIncome) {
      setExistingEMIs(monthlyIncome);
    }
  }, [monthlyIncome, existingEMIs]);

  const result = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(loanEligibilityCalculatorSchema, {
      monthlyIncome,
      monthlyExpenses: 0, // Not used in this calculator
      existingEMI: existingEMIs,
      interestRate: 8.5, // Default rate for eligibility calculation
      tenure,
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        eligibleLoanAmount: 0,
        maxEMI: 0,
        eligibilityScore: 0,
        debtToIncomeRatio: 0,
        factors: [],
        suggestions: [],
      };
    }

    return calculateLoanEligibility(
      monthlyIncome,
      existingEMIs,
      tenure
    );
  }, [monthlyIncome, existingEMIs, tenure]);

  return (
    <Card className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-accent/10 border-secondary/20">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Loan Eligibility Calculator
          </h3>
          <p className="text-sm text-text-secondary">
            Check your loan eligibility and get personalized insights
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <Slider
              label="Monthly Income (Take Home)"
              value={monthlyIncome}
              min={20000}
              max={500000}
              step={5000}
              valueLabel={formatCurrency(monthlyIncome)}
              onValueChange={setMonthlyIncome}
            />
            <ValidatedInput
              type="number"
              schema={positiveNumberSchema.min(10000).max(10000000)}
              value={monthlyIncome}
              onValueChange={(value) => setMonthlyIncome(Number(value))}
              className="mt-2"
              min={20000}
              max={500000}
              validateOnBlur={true}
            />
          </div>

          <div>
            <Slider
              label="Existing Obligations (EMIs)"
              value={existingEMIs}
              min={0}
              max={maxAllowedExistingObligations}
              step={1000}
              valueLabel={formatCurrency(existingEMIs)}
              onValueChange={(value) =>
                setExistingEMIs(Math.min(value, monthlyIncome))
              }
            />
            <ValidatedInput
              type="number"
              schema={nonNegativeNumberSchema.max(
                monthlyIncome,
                "Existing obligations cannot exceed monthly income"
              )}
              value={existingEMIs}
              onValueChange={(value) =>
                setExistingEMIs(Math.min(Number(value), monthlyIncome))
              }
              className="mt-2"
              min={0}
              max={maxAllowedExistingObligations}
              validateOnBlur={true}
            />
            <p className="mt-2 text-xs text-text-secondary italic">
              Note: If you have EMI obligations that will end in the next 6 months, you can exclude them from this calculation.
            </p>
          </div>

          <div>
            <Slider
              label="Desired Tenure (years)"
              value={tenure}
              min={5}
              max={30}
              step={1}
              valueLabel={`${tenure} years`}
              onValueChange={setTenure}
            />
            <ValidatedInput
              type="number"
              schema={loanTenureSchema}
              value={tenure}
              onValueChange={(value) => setTenure(Number(value))}
              className="mt-2"
              min={5}
              max={30}
              validateOnBlur={true}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 p-6 text-center border-2 border-secondary/30 shadow-sm">
            <p className="text-sm font-medium text-text-secondary mb-2">
              Eligible Loan Amount
            </p>
            <p className="text-4xl font-bold text-secondary">
              {formatCurrency(result.eligibleLoanAmount)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
              <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                Max Monthly EMI
              </p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(result.maxEMI)}
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 p-4 border border-accent/20">
              <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                Debt-to-Income Ratio
              </p>
              <p className={`text-xl font-bold ${
                result.debtToIncomeRatio < 30 
                  ? "text-green-600 dark:text-green-400" 
                  : result.debtToIncomeRatio < 40 
                  ? "text-yellow-600 dark:text-yellow-400" 
                  : result.debtToIncomeRatio < 50
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                {result.debtToIncomeRatio}%
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 border border-secondary/20">
              <p className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                Available Income
              </p>
              <p className="text-xl font-bold text-secondary">
                {formatCurrency(monthlyIncome - existingEMIs)}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-4 border border-border">
            <p className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              Key Factors
            </p>
            <ul className="space-y-2.5">
              {result.factors.map((factor, index) => (
                <li
                  key={index}
                  className="text-sm text-text-secondary flex items-start gap-3"
                >
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span className="flex-1 leading-relaxed">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
            <p className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
              Suggestions
            </p>
            <ul className="space-y-2.5">
              {result.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-sm text-text-secondary flex items-start gap-3"
                >
                  <span className="text-accent mt-0.5 flex-shrink-0">•</span>
                  <span className="flex-1 leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

