"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import { validateSchema } from "@/lib/validation/utils";
import { creditCardEMICalculatorSchema, loanPrincipalSchema, interestRateSchema } from "@/lib/validation/schemas";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
// import { AdUnit } from "@/components/common/AdUnit";
import { AmortizationTable } from "@/components/calculators/common/AmortizationTable";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
import { calculateEMI, generateAmortizationSchedule } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getCalculation } from "@/lib/storage";
import { ChartSkeleton, PieChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { Info } from "lucide-react";

// Dynamically import chart components to reduce initial bundle size
const AmortizationChart = dynamic(
  () => import("@/components/calculators/common/AmortizationChart").then((mod) => ({ default: mod.AmortizationChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

const FilterablePieChart = dynamic(
  () => import("@/components/calculators/common/FilterablePieChart").then((mod) => ({ default: mod.FilterablePieChart })),
  {
    loading: () => <PieChartSkeleton />,
    ssr: false,
  }
);

const COLORS = ["#2563eb", "#10b981"];

export function CreditCardEMICalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(24.0);
  const [rateType, setRateType] = useState<"per annum" | "per month">("per annum");
  const [tenure, setTenure] = useState(1);
  
  // Default to current month/year
  const currentDate = new Date();
  const [startDate, setStartDate] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("credit-card-emi-calculator_saved");
    if (saved) {
      if (typeof saved.principal === "number") setPrincipal(saved.principal);
      if (typeof saved.rate === "number") setRate(saved.rate);
      if (typeof saved.rateType === "string" && (saved.rateType === "per annum" || saved.rateType === "per month")) {
        setRateType(saved.rateType);
      }
      if (typeof saved.tenure === "number") {
        // Validate tenure is within bounds (0.5-5 years)
        const validatedTenure = Math.max(0.5, Math.min(5, saved.tenure));
        setTenure(validatedTenure);
      }
      if (saved.startDate && typeof saved.startDate === "object" && saved.startDate !== null) {
        const startDate = saved.startDate as Record<string, unknown>;
        if (typeof startDate.month === "number" && typeof startDate.year === "number") {
          setStartDate({ month: startDate.month, year: startDate.year });
        }
      }
    }
  }, []);

  // Convert rate to per annum for calculations
  const annualRate = useMemo(() => {
    if (rateType === "per month") {
      return rate * 12;
    }
    return rate;
  }, [rate, rateType]);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(creditCardEMICalculatorSchema, {
      principal,
      rate: annualRate, // Use annual rate for validation
      tenure,
      rateType: rateType === "per annum" ? "per-annum" : "per-month",
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        emi: 0,
        totalAmount: 0,
        totalInterest: 0,
        principal: 0,
        schedule: [],
      };
    }

    const emi = calculateEMI(principal, annualRate, tenure);
    const totalAmount = emi * tenure * 12;
    const totalInterest = totalAmount - principal;
    const schedule = generateAmortizationSchedule(principal, annualRate, tenure, emi, startDate);

    return {
      emi,
      totalAmount,
      totalInterest,
      principal,
      schedule,
    };
  }, [principal, annualRate, tenure, startDate]);

  const chartData = [
    { name: "Principal", value: results.principal },
    { name: "Interest", value: results.totalInterest },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Details</CardTitle>
              <CardDescription>
                Enter your credit card outstanding amount / transaction amount to calculate EMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Outstanding Amount / Transaction Amount"
                  value={principal}
                  min={1000}
                  max={1000000}
                  step={1000}
                  valueLabel={formatCurrency(principal)}
                  onValueChange={setPrincipal}
                />
                <ValidatedInput
                  type="number"
                  schema={loanPrincipalSchema}
                  value={principal}
                  onValueChange={(value) => setPrincipal(Number(value))}
                  className="mt-2"
                  min={1000}
                  max={1000000}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-text-primary">
                    Interest Rate
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRateType("per annum");
                        if (rateType === "per month") {
                          setRate(rate * 12);
                        }
                      }}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        rateType === "per annum"
                          ? "bg-primary text-white"
                          : "bg-surface text-text-secondary hover:bg-surface/80"
                      }`}
                    >
                      Per Annum
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRateType("per month");
                        if (rateType === "per annum") {
                          setRate(rate / 12);
                        }
                      }}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        rateType === "per month"
                          ? "bg-primary text-white"
                          : "bg-surface text-text-secondary hover:bg-surface/80"
                      }`}
                    >
                      Per Month
                    </button>
                  </div>
                </div>
                <Slider
                  label={`Interest Rate (${rateType})`}
                  value={rate}
                  min={rateType === "per annum" ? 12 : 1}
                  max={rateType === "per annum" ? 48 : 4}
                  step={rateType === "per annum" ? 0.5 : 0.1}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <ValidatedInput
                  type="number"
                  schema={interestRateSchema}
                  value={rate}
                  onValueChange={(value) => setRate(Number(value))}
                  className="mt-2"
                  min={rateType === "per annum" ? 12 : 1}
                  max={rateType === "per annum" ? 48 : 4}
                  step={rateType === "per annum" ? 0.5 : 0.1}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <TenureInput
                  label="EMI Tenure"
                  value={tenure}
                  min={0.5}
                  max={5}
                  step={0.5}
                  onChange={setTenure}
                />
              </div>

              <div>
                <MonthYearPicker
                  label="EMI Payments Starting From"
                  value={startDate}
                  onChange={setStartDate}
                />
              </div>

              {/* Additional Charges Note */}
              <div className="rounded-lg border border-border bg-surface/50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold text-text-primary">
                      Additional Charges
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Please note that the EMI calculation above does not include additional charges that may apply:
                    </p>
                    <ul className="text-xs text-text-secondary space-y-1 ml-4 list-disc">
                      <li>
                        <strong>Processing Fee:</strong> Typically 1-3% of the outstanding amount or a fixed fee (varies by bank)
                      </li>
                      <li>
                        <strong>GST on Processing Fee:</strong> 18% GST is applicable on the processing fee
                      </li>
                      <li>
                        <strong>Foreclosure Charges:</strong> May apply if you prepay the EMI before completion
                      </li>
                    </ul>
                    <p className="text-xs text-text-secondary leading-relaxed mt-2">
                      The actual EMI amount and total cost may vary based on your bank's specific terms and conditions. Always check with your bank for exact charges before converting to EMI.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AmortizationChart
            schedule={results.schedule}
            loanDetails={{
              principal: results.principal,
              rate: annualRate,
              tenure,
              emi: results.emi,
            }}
          />

          <AmortizationTable
            schedule={results.schedule}
            loanDetails={{
              principal: results.principal,
              rate: annualRate,
              tenure,
              emi: results.emi,
            }}
          />

          <div className="flex justify-end">
            <SaveCalculation
              calculatorType="credit-card-emi-calculator"
              calculationId="saved"
              data={{
                principal,
                rate,
                rateType,
                tenure,
                startDate,
              }}
            />
          </div>

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>EMI Breakdown</CardTitle>
              <CardDescription>Your monthly payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-text-secondary">Monthly EMI</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(results.emi)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Outstanding Amount / Transaction Amount</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.principal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Interest</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-text-primary">
                    Total Amount
                  </span>
                  <span className="font-bold text-primary">
                    {formatCurrency(results.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterablePieChart
                data={chartData}
                colors={COLORS}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

