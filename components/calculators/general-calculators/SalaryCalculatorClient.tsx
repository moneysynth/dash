"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
import { useCurrency } from "@/contexts/CurrencyContext";
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

export function SalaryCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [ctc, setCtc] = useState(600000);
  const [basicPercentage, setBasicPercentage] = useState(40);
  const [hraPercentage, setHraPercentage] = useState(50);
  const [professionalTax, setProfessionalTax] = useState(200);
  
  // Mode toggles: true = amount, false = percentage
  const [basicMode, setBasicMode] = useState<"percentage" | "amount">("percentage");
  const [hraMode, setHraMode] = useState<"percentage" | "amount">("percentage");
  
  // Amount values (calculated from percentages when switching to amount mode)
  const [basicAmount, setBasicAmount] = useState(0);
  const [hraAmount, setHraAmount] = useState(0);

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("salary-calculator_saved");
    if (saved) {
      if (typeof saved.ctc === "number") setCtc(saved.ctc);
      if (typeof saved.basicPercentage === "number") setBasicPercentage(saved.basicPercentage);
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

  const results = useMemo((): SalaryBreakdown => {
    const annualCTC = ctc;
    const monthlyCTC = annualCTC / 12;

    // Gross salary is monthly CTC
    const monthlyGrossSalary = monthlyCTC;

    // Calculate basic salary based on mode
    let finalBasicSalary: number;
    if (basicMode === "amount") {
      finalBasicSalary = basicAmount;
    } else {
      // Basic Salary is calculated directly from Gross Salary
      finalBasicSalary = (monthlyGrossSalary * basicPercentage) / 100;
    }

    // Calculate PF and Gratuity based on basic salary
    const finalPfEmployee = Math.max((finalBasicSalary * 12) / 100, 1800);
    const finalPfEmployer = Math.max((finalBasicSalary * 12) / 100, 1800);
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

    // Other allowances (from available amount after employer PF and gratuity)
    const otherAllowances = availableForSalaryAfterDeductions - finalBasicSalary - finalHra;

    // Professional tax (typically ₹200/month, varies by state)
    const monthlyProfessionalTax = professionalTax;

    // Net salary (from available amount after employer PF and gratuity, minus employee deductions)
    const netSalary =
      availableForSalaryAfterDeductions - finalPfEmployee - monthlyProfessionalTax;

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
  }, [ctc, basicPercentage, hraPercentage, professionalTax, basicMode, hraMode, basicAmount, hraAmount]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Details</CardTitle>
              <CardDescription>
                Enter your salary information to calculate take-home salary
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
                  valueLabel={formatCurrency(ctc)}
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
                          const estimatedAvailable = monthlyGrossSalary * 0.9;
                          const newPercentage = estimatedAvailable > 0 ? (basicAmount / estimatedAvailable) * 100 : 40;
                          setBasicPercentage(Math.max(15, Math.min(60, newPercentage)));
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
                          const estimatedAvailable = monthlyGrossSalary * 0.9;
                          const estimatedBasic = (estimatedAvailable * basicPercentage) / 100;
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
                      value={basicPercentage}
                      min={15}
                      max={60}
                      step={1}
                      valueLabel={`${basicPercentage}%`}
                      onValueChange={setBasicPercentage}
                    />
                    <Input
                      type="number"
                      value={basicPercentage}
                      onChange={(e) => setBasicPercentage(Number(e.target.value))}
                      className="mt-2"
                      min={15}
                      max={60}
                      step={1}
                    />
                    <p className="mt-1 text-xs text-text-secondary">
                      Typically 40-50% of gross salary
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
                      valueLabel={formatCurrency(basicAmount)}
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
                  <label className="block text-sm font-medium text-text-primary">
                    HRA (House Rent Allowance)
                  </label>
                  <div className="flex rounded-lg border border-border p-1 bg-surface">
                    <button
                      type="button"
                      onClick={() => {
                        if (hraMode !== "percentage") {
                          // Convert amount to percentage (use current basic from results)
                          const monthlyGrossSalary = ctc / 12;
                          const estimatedAvailable = monthlyGrossSalary * 0.9;
                          const estimatedBasic = (estimatedAvailable * basicPercentage) / 100;
                          const newPercentage = estimatedBasic > 0 ? (hraAmount / estimatedBasic) * 100 : 0;
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
                          const estimatedAvailable = monthlyGrossSalary * 0.9;
                          const estimatedBasic = (estimatedAvailable * basicPercentage) / 100;
                          const estimatedHra = (estimatedBasic * hraPercentage) / 100;
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
                      valueLabel={formatCurrency(hraAmount)}
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
                <Slider
                  label="Professional Tax (Monthly)"
                  value={professionalTax}
                  min={0}
                  max={500}
                  step={50}
                  valueLabel={formatCurrency(professionalTax)}
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
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Take-Home Salary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(results.netSalary)}
                </div>
                <div className="text-sm text-text-secondary">Per Month</div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Gross Salary:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.grossSalary)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Basic Salary:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.basicSalary)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">HRA:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.hra)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Deductions from Gross Salary
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Employer PF:</span>
                  <span className="font-medium text-text-primary">
                    -{formatCurrency(results.pfEmployer)}
                  </span>
                </div>
                <div className="text-xs text-text-secondary pl-1">
                  (12% of basic, minimum ₹1,800/month)
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Gratuity:</span>
                  <span className="font-medium text-text-primary">
                    -{formatCurrency(results.gratuity)}
                  </span>
                </div>
                <div className="text-xs text-text-secondary pl-1">
                  (4.81% of basic salary)
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-text-secondary font-medium">Available for Salary:</span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.grossSalary - results.pfEmployer - results.gratuity)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="text-xs font-semibold text-text-secondary uppercase">
                  Employee Deductions
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">PF (Employee):</span>
                  <span className="font-medium text-text-primary">
                    -{formatCurrency(results.pfEmployee)}
                  </span>
                </div>
                <div className="text-xs text-text-secondary pl-1">
                  (12% of basic, minimum ₹1,800/month)
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Professional Tax:</span>
                  <span className="font-medium text-text-primary">
                    -{formatCurrency(results.professionalTax)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <div className="mb-2 text-sm font-medium text-text-primary">
                  Calculation Info
                </div>
                <div className="mb-3 space-y-1 text-xs text-text-secondary">
                  <div>• PF: 12% of basic salary (minimum ₹1,800/month)</div>
                  <div>• Gratuity: 4.81% of basic salary</div>
                </div>
                <div className="mb-2 mt-4 text-sm font-medium text-text-primary">
                  Annual Breakdown
                </div>
                <div className="space-y-1 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Annual CTC:</span>
                    <span>{formatCurrency(results.annualCTC)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Gross Salary:</span>
                    <span>{formatCurrency(results.grossSalary * 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employer PF (Annual):</span>
                    <span>{formatCurrency(results.pfEmployer * 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gratuity (Annual):</span>
                    <span>{formatCurrency(results.gratuity * 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Take-Home:</span>
                    <span>
                      {formatCurrency(results.netSalary * 12)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Deductions:</span>
                    <span>
                      {formatCurrency(
                        (results.pfEmployee + results.professionalTax) * 12
                      )}
                    </span>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <SaveCalculation
          calculatorType="salary-calculator"
          calculationId="saved"
          data={{
            ctc,
            basicPercentage,
            hraPercentage,
            professionalTax,
            basicMode,
            hraMode,
            basicAmount,
            hraAmount,
          }}
        />
      </div>
    </>
  );
}

