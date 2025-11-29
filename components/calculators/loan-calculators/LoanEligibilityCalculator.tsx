"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface EligibilityResult {
  eligibleLoanAmount: number;
  maxEMI: number;
  eligibilityScore: number;
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
  const availableIncome = totalIncome - existingEMIs;
  
  // Typically, banks allow 40-60% of income for EMI
  const emiToIncomeRatio = 0.5; // 50% of available income
  const maxAffordableEMI = availableIncome * emiToIncomeRatio;
  
  // Calculate eligible loan amount using reverse EMI formula
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = tenure * 12;
  
  let eligibleLoanAmount = 0;
  if (monthlyRate > 0) {
    eligibleLoanAmount =
      (maxAffordableEMI *
        (Math.pow(1 + monthlyRate, numPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
  } else {
    eligibleLoanAmount = maxAffordableEMI * numPayments;
  }
  
  // Calculate eligibility score (0-100)
  let score = 50; // Base score
  
  // Income factors
  if (totalIncome >= 100000) score += 20;
  else if (totalIncome >= 50000) score += 10;
  
  // Existing obligations
  const obligationRatio = existingEMIs / totalIncome;
  if (obligationRatio < 0.2) score += 15;
  else if (obligationRatio < 0.4) score += 5;
  else score -= 10;
  
  // Tenure factor
  if (tenure >= 20) score += 10;
  else if (tenure >= 10) score += 5;
  
  score = Math.max(0, Math.min(100, score));
  
  // Factors affecting eligibility
  const factors: string[] = [];
  if (totalIncome < 50000) {
    factors.push("Low monthly income");
  }
  if (obligationRatio > 0.5) {
    factors.push("High existing obligations");
  }
  if (tenure < 5) {
    factors.push("Short loan tenure");
  }
  if (availableIncome < 20000) {
    factors.push("Insufficient disposable income");
  }
  if (factors.length === 0) {
    factors.push("Good income stability");
    factors.push("Manageable existing obligations");
  }
  
  // Suggestions
  const suggestions: string[] = [];
  if (obligationRatio > 0.4) {
    suggestions.push("Consider reducing existing EMIs to improve eligibility");
  }
  if (totalIncome < 50000) {
    suggestions.push("Explore co-applicant option to increase loan amount");
  }
  if (tenure < 10) {
    suggestions.push("Extending tenure can increase eligible loan amount");
  }
  if (availableIncome < 30000) {
    suggestions.push("Wait for income increase or reduce expenses");
  }
  if (suggestions.length === 0) {
    suggestions.push("You have good eligibility. Consider negotiating better rates");
  }
  
  return {
    eligibleLoanAmount: Math.max(0, eligibleLoanAmount),
    maxEMI: Math.max(0, maxAffordableEMI),
    eligibilityScore: Math.round(score),
    factors,
    suggestions,
  };
}

export function LoanEligibilityCalculator() {
  const { formatCurrency } = useCurrency();
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [existingEMIs, setExistingEMIs] = useState(15000);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(() => {
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
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="mt-2"
              min={20000}
              max={500000}
            />
          </div>

          <div>
            <Slider
              label="Existing Obligations (EMIs)"
              value={existingEMIs}
              min={0}
              max={100000}
              step={1000}
              valueLabel={formatCurrency(existingEMIs)}
              onValueChange={setExistingEMIs}
            />
            <Input
              type="number"
              value={existingEMIs}
              onChange={(e) => setExistingEMIs(Number(e.target.value))}
              className="mt-2"
              min={0}
              max={100000}
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
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-2"
              min={5}
              max={30}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                Available Income
              </p>
              <p className="text-xl font-bold text-accent">
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

