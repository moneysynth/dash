"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
// import { AdUnit } from "@/components/common/AdUnit";
import { formatCurrency } from "@/lib/utils";
import { getCalculation } from "@/lib/storage";

interface SalaryBreakdown {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  otherAllowances: number;
  pfEmployee: number;
  pfEmployer: number;
  gratuity: number;
  professionalTax: number;
  netSalary: number;
  annualCTC: number;
}

function calculateSalary(
  ctc: number,
  basicPercentage: number,
  hraPercentage: number,
  professionalTax: number,
  basicMode: "percentage" | "amount" = "percentage",
  hraMode: "percentage" | "amount" = "percentage",
  basicAmount: number = 0,
  hraAmount: number = 0
): SalaryBreakdown {
  const annualCTC = ctc;
  const monthlyCTC = annualCTC / 12;
  const monthlyGrossSalary = monthlyCTC;

  // Calculate basic salary based on mode
  let finalBasicSalary: number;
  if (basicMode === "amount") {
    finalBasicSalary = basicAmount;
  } else {
    // Basic Salary is calculated directly from Gross Salary
    finalBasicSalary = (monthlyGrossSalary * basicPercentage) / 100;
  }

  // PF is 12% of monthly basic salary, capped between Rs. 1,800 and Rs. 15,000
  const calculatedMonthlyPf = (finalBasicSalary * 12) / 100;
  const finalPfEmployee = Math.min(Math.max(calculatedMonthlyPf, 1800), 15000);
  const finalPfEmployer = Math.min(Math.max(calculatedMonthlyPf, 1800), 15000);
  const finalGratuity = (finalBasicSalary * 4.81) / 100;

  // Available amount after employer PF and gratuity (deducted from gross salary)
  const availableForSalaryAfterDeductions = monthlyGrossSalary - finalPfEmployer - finalGratuity;

  // Final HRA calculation
  let finalHra: number;
  if (hraMode === "amount") {
    finalHra = hraAmount;
  } else {
    // HRA is calculated from basic salary
    finalHra = (finalBasicSalary * hraPercentage) / 100;
  }

  // Other allowances = Available - Basic - HRA
  const otherAllowances = availableForSalaryAfterDeductions - finalBasicSalary - finalHra;
  const monthlyProfessionalTax = professionalTax;
  const netSalary = availableForSalaryAfterDeductions - finalPfEmployee - monthlyProfessionalTax;

  return {
    grossSalary: monthlyGrossSalary,
    basicSalary: finalBasicSalary,
    hra: finalHra,
    otherAllowances: Math.max(0, otherAllowances),
    pfEmployee: finalPfEmployee,
    pfEmployer: finalPfEmployer,
    gratuity: finalGratuity,
    professionalTax: monthlyProfessionalTax,
    netSalary,
    annualCTC,
  };
}

export function SalaryComparisonClient() {
  // Always use INR for this India-specific tool (New Labour Code 2025 is India-specific)
  const formatCurrencyINR = (amount: number): string => formatCurrency(amount, "INR");
  const [ctc, setCtc] = useState(600000);
  const [currentBasicPercentage, setCurrentBasicPercentage] = useState(40);
  const [hraPercentage, setHraPercentage] = useState(50);
  const [professionalTax, setProfessionalTax] = useState(200);
  
  // Mode toggles: "percentage" or "amount"
  const [basicMode, setBasicMode] = useState<"percentage" | "amount">("percentage");
  const [hraMode, setHraMode] = useState<"percentage" | "amount">("percentage");
  
  // Amount values (calculated from percentages initially, or directly set)
  const [basicAmount, setBasicAmount] = useState(0);
  const [hraAmount, setHraAmount] = useState(0);

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("salary-comparison-labour-code-2025_saved");
    if (saved) {
      if (typeof saved.ctc === "number") setCtc(saved.ctc);
      if (typeof saved.currentBasicPercentage === "number") setCurrentBasicPercentage(saved.currentBasicPercentage);
      if (typeof saved.hraPercentage === "number") setHraPercentage(saved.hraPercentage);
      if (typeof saved.professionalTax === "number") setProfessionalTax(saved.professionalTax);
      if (saved.basicMode === "percentage" || saved.basicMode === "amount") {
        setBasicMode(saved.basicMode);
      }
      if (saved.hraMode === "percentage" || saved.hraMode === "amount") {
        setHraMode(saved.hraMode);
      }
      if (typeof saved.basicAmount === "number") setBasicAmount(saved.basicAmount);
      if (typeof saved.hraAmount === "number") setHraAmount(saved.hraAmount);
    }
  }, []);

  // Calculate current scenario (with user's current basic percentage)
  const currentResults = useMemo(
    () =>
      calculateSalary(
        ctc,
        currentBasicPercentage,
        hraPercentage,
        professionalTax,
        basicMode,
        hraMode,
        basicAmount,
        hraAmount
      ),
    [
      ctc,
      currentBasicPercentage,
      hraPercentage,
      professionalTax,
      basicMode,
      hraMode,
      basicAmount,
      hraAmount,
    ]
  );

  // Calculate new scenario (with 50% basic salary as per New Labour Code 2025)
  // For new scenario, always use percentage mode with 50% basic
  const newResults = useMemo(
    () => {
      // If current mode is amount, we need to convert to percentage for new scenario
      // But for new scenario, it's always 50% of gross, so we use percentage mode
      return calculateSalary(
        ctc,
        50,
        hraPercentage,
        professionalTax,
        "percentage",
        hraMode,
        0,
        hraAmount
      );
    },
    [ctc, hraPercentage, professionalTax, hraMode, hraAmount]
  );

  // Calculate differences
  const difference = useMemo(() => {
    return {
      netSalary: newResults.netSalary - currentResults.netSalary,
      basicSalary: newResults.basicSalary - currentResults.basicSalary,
      pfEmployee: newResults.pfEmployee - currentResults.pfEmployee,
      pfEmployer: newResults.pfEmployer - currentResults.pfEmployer,
      gratuity: newResults.gratuity - currentResults.gratuity,
      hra: newResults.hra - currentResults.hra,
      otherAllowances: newResults.otherAllowances - currentResults.otherAllowances,
    };
  }, [currentResults, newResults]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
            <CardHeader>
              <CardTitle>Salary Details</CardTitle>
              <CardDescription>
                Enter your current salary information to compare with New Labour Code 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
          <div>
            <Slider
              label="Annual CTC (Cost to Company)"
              value={ctc}
              min={200000}
              max={20000000}
              step={10000}
              valueLabel={formatCurrencyINR(ctc)}
              onValueChange={setCtc}
            />
            <Input
              type="number"
              value={ctc}
              onChange={(e) => setCtc(Number(e.target.value))}
              className="mt-2"
              min={200000}
              max={20000000}
              step={10000}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-text-primary">
                Basic Salary + Dearness Allowance
              </label>
              <div className="flex rounded-lg border border-border p-1 bg-surface">
                <button
                  type="button"
                  onClick={() => {
                    if (basicMode !== "percentage") {
                      // Convert amount to percentage
                      const monthlyGrossSalary = ctc / 12;
                      const newPercentage = monthlyGrossSalary > 0 ? (basicAmount / monthlyGrossSalary) * 100 : 40;
                      setCurrentBasicPercentage(Math.max(15, Math.min(60, newPercentage)));
                      setBasicMode("percentage");
                    }
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    basicMode === "percentage"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (basicMode !== "amount") {
                      // Convert percentage to amount
                      const monthlyGrossSalary = ctc / 12;
                      const estimatedBasic = (monthlyGrossSalary * currentBasicPercentage) / 100;
                      setBasicAmount(estimatedBasic);
                      setBasicMode("amount");
                    }
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    basicMode === "amount"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Amount
                </button>
              </div>
            </div>
            {basicMode === "percentage" ? (
              <>
                <Slider
                  label="Basic Salary (% of Gross Salary) + Dearness Allowance"
                  value={currentBasicPercentage}
                  min={15}
                  max={60}
                  step={1}
                  valueLabel={`${currentBasicPercentage}%`}
                  onValueChange={setCurrentBasicPercentage}
                />
                <Input
                  type="number"
                  value={currentBasicPercentage}
                  onChange={(e) => setCurrentBasicPercentage(Number(e.target.value))}
                  className="mt-2"
                  min={15}
                  max={60}
                  step={1}
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Your current basic salary percentage (will be 50% under New Labour Code 2025)
                </p>
              </>
            ) : (
              <>
                <Slider
                  label="Basic Salary (Amount)"
                  value={basicAmount}
                  min={10000}
                  max={1000000}
                  step={1000}
                  valueLabel={formatCurrencyINR(basicAmount)}
                  onValueChange={setBasicAmount}
                />
                <Input
                  type="number"
                  value={basicAmount}
                  onChange={(e) => setBasicAmount(Number(e.target.value))}
                  className="mt-2"
                  min={10000}
                  max={1000000}
                  step={1000}
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Enter the basic salary amount directly
                </p>
              </>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                HRA (House Rent Allowance)
              </label>
              <div className="flex rounded-lg border border-border p-1 bg-surface">
                <button
                  type="button"
                  onClick={() => {
                    if (hraMode !== "percentage") {
                      // Convert amount to percentage (use current basic from results)
                      const monthlyGrossSalary = ctc / 12;
                      const currentBasic = basicMode === "amount" ? basicAmount : (monthlyGrossSalary * currentBasicPercentage) / 100;
                      const newPercentage = currentBasic > 0 ? (hraAmount / currentBasic) * 100 : 0;
                      setHraPercentage(Math.max(0, Math.min(100, newPercentage)));
                      setHraMode("percentage");
                    }
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    hraMode === "percentage"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (hraMode !== "amount") {
                      // Convert percentage to amount (use current basic from results)
                      const monthlyGrossSalary = ctc / 12;
                      const currentBasic = basicMode === "amount" ? basicAmount : (monthlyGrossSalary * currentBasicPercentage) / 100;
                      const estimatedHra = (currentBasic * hraPercentage) / 100;
                      setHraAmount(estimatedHra);
                      setHraMode("amount");
                    }
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    hraMode === "amount"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Amount
                </button>
              </div>
            </div>
            {hraMode === "percentage" ? (
              <>
                <Slider
                  label="HRA (% of Basic Salary)"
                  value={hraPercentage}
                  min={0}
                  max={100}
                  step={5}
                  valueLabel={`${hraPercentage}%`}
                  onValueChange={setHraPercentage}
                />
                <Input
                  type="number"
                  value={hraPercentage}
                  onChange={(e) => setHraPercentage(Number(e.target.value))}
                  className="mt-2"
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Typically 40-50% of basic salary
                </p>
              </>
            ) : (
              <>
                <Slider
                  label="HRA (Amount)"
                  value={hraAmount}
                  min={0}
                  max={500000}
                  step={1000}
                  valueLabel={formatCurrencyINR(hraAmount)}
                  onValueChange={setHraAmount}
                />
                <Input
                  type="number"
                  value={hraAmount}
                  onChange={(e) => setHraAmount(Number(e.target.value))}
                  className="mt-2"
                  min={0}
                  max={500000}
                  step={1000}
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Enter the HRA amount directly
                </p>
              </>
            )}
          </div>

          <div>
            <div className="rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  PF wage ceiling (₹15,000)
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  PF deductions remain based on the wage ceiling of ₹15,000 and contributions beyond this limit are voluntary, not mandatory.
                </p>
              </div>
              <a
                href="/labour-code-pf-wage.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-medium text-primary hover:text-accent"
              >
                Reference image: PF wage ceiling illustration
              </a>
            </div>
          </div>

          <div>
            <Slider
              label="Professional Tax (Monthly)"
              value={professionalTax}
              min={0}
              max={500}
              step={50}
              valueLabel={formatCurrencyINR(professionalTax)}
              onValueChange={setProfessionalTax}
            />
            <Input
              type="number"
              value={professionalTax}
              onChange={(e) => setProfessionalTax(Number(e.target.value))}
              className="mt-2"
              min={0}
              max={500}
              step={50}
            />
            <p className="mt-1 text-xs text-text-secondary">
              Typically ₹200/month (varies by state)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Current Scenario */}
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">Current Scenario</CardTitle>
            <CardDescription>
              {basicMode === "percentage" 
                ? `Basic Salary: ${currentBasicPercentage}% of Gross Salary`
                : `Basic Salary: ${formatCurrencyINR(basicAmount)}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 text-center">
              <p className="text-sm text-text-secondary">Take-Home Salary</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrencyINR(currentResults.netSalary)}
              </p>
              <div className="text-sm text-text-secondary">Per Month</div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Gross Salary:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(currentResults.grossSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Basic Salary:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(currentResults.basicSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">HRA:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(currentResults.hra)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Other Allowances:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(currentResults.otherAllowances)}
                </span>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Deductions from Gross Salary
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Employer PF:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(currentResults.pfEmployer)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Gratuity:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(currentResults.gratuity)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Employee Deductions
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">PF (Employee):</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(currentResults.pfEmployee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Professional Tax:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(currentResults.professionalTax)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Labour Code 2025 Scenario */}
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle className="text-lg text-green-600">New Labour Code 2025</CardTitle>
            <CardDescription>
              Basic Salary: 50% of Gross Salary (Mandatory)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 text-center">
              <p className="text-sm text-text-secondary">Take-Home Salary</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrencyINR(newResults.netSalary)}
              </p>
              <div className="text-sm text-text-secondary">Per Month</div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Gross Salary:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(newResults.grossSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Basic Salary:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(newResults.basicSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">HRA:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(newResults.hra)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Other Allowances:</span>
                <span className="font-semibold text-text-primary">
                  {formatCurrencyINR(newResults.otherAllowances)}
                </span>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Deductions from Gross Salary
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Employer PF:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(newResults.pfEmployer)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Gratuity:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(newResults.gratuity)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Employee Deductions
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">PF (Employee):</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(newResults.pfEmployee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Professional Tax:</span>
                  <span className="font-semibold text-text-primary">
                    -{formatCurrencyINR(newResults.professionalTax)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>Impact Summary</CardTitle>
          <CardDescription>
            Difference between Current Scenario and New Labour Code 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-primary/10 p-6 text-center">
            <p className="text-sm text-text-secondary mb-2">Monthly Take-Home Salary Change</p>
            <p
              className={`text-4xl font-bold ${
                difference.netSalary >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {difference.netSalary >= 0 ? "+" : ""}
              {formatCurrencyINR(difference.netSalary)}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              {difference.netSalary >= 0
                ? "Increase in take-home salary"
                : "Decrease in take-home salary"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 text-sm">
              <div className="font-semibold text-text-primary mb-2">Component Changes</div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Basic Salary:</span>
                <span
                  className={`font-semibold ${
                    difference.basicSalary >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {difference.basicSalary >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.basicSalary)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">HRA:</span>
                <span
                  className={`font-semibold ${
                    difference.hra >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {difference.hra >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.hra)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Other Allowances:</span>
                <span
                  className={`font-semibold ${
                    difference.otherAllowances >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {difference.otherAllowances >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.otherAllowances)}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="font-semibold text-text-primary mb-2">Deduction Changes</div>
              <div className="flex justify-between">
                <span className="text-text-secondary">PF (Employee):</span>
                <span
                  className={`font-semibold ${
                    difference.pfEmployee >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {difference.pfEmployee >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.pfEmployee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">PF (Employer):</span>
                <span
                  className={`font-semibold ${
                    difference.pfEmployer >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {difference.pfEmployer >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.pfEmployer)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Gratuity:</span>
                <span
                  className={`font-semibold ${
                    difference.gratuity >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {difference.gratuity >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.gratuity)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-surface border border-border p-4 mt-4">
            <div className="text-sm font-semibold text-text-primary mb-2">
              Annual Impact
            </div>
            <div className="space-y-1 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Annual Take-Home Change:</span>
                <span
                  className={`font-semibold ${
                    difference.netSalary >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {difference.netSalary >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.netSalary * 12)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Annual PF Contribution Change:</span>
                <span
                  className={`font-semibold ${
                    difference.pfEmployee >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {difference.pfEmployee >= 0 ? "+" : ""}
                  {formatCurrencyINR(difference.pfEmployee * 12)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <SaveCalculation
          calculatorType="salary-comparison-labour-code-2025"
          calculationId="saved"
          data={{
            ctc,
            currentBasicPercentage,
            hraPercentage,
            professionalTax,
            basicMode,
            hraMode,
            basicAmount,
            hraAmount,
          }}
        />
      </div>
    </div>
  );
}

