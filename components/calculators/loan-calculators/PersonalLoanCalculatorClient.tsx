"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
// import { AdUnit } from "@/components/common/AdUnit";
import { AmortizationTable } from "@/components/calculators/common/AmortizationTable";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
import { calculateEMI, generateAmortizationSchedule } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getCalculation } from "@/lib/storage";
import { ChartSkeleton, PieChartSkeleton } from "@/components/calculators/common/ChartSkeleton";

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

export function PersonalLoanCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12.0);
  const [tenure, setTenure] = useState(5);
  
  // Default to current month/year
  const currentDate = new Date();
  const [startDate, setStartDate] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("personal-loan-emi-calculator_saved");
    if (saved) {
      if (typeof saved.principal === "number") setPrincipal(saved.principal);
      if (typeof saved.rate === "number") setRate(saved.rate);
      if (typeof saved.tenure === "number") setTenure(saved.tenure);
      if (saved.startDate && typeof saved.startDate === "object" && saved.startDate !== null) {
        const startDate = saved.startDate as Record<string, unknown>;
        if (typeof startDate.month === "number" && typeof startDate.year === "number") {
          setStartDate({ month: startDate.month, year: startDate.year });
        }
      }
    }
  }, []);

  const results = useMemo(() => {
    const emi = calculateEMI(principal, rate, tenure);
    const totalAmount = emi * tenure * 12;
    const totalInterest = totalAmount - principal;
    const schedule = generateAmortizationSchedule(principal, rate, tenure, emi, startDate);

    return {
      emi,
      totalAmount,
      totalInterest,
      principal,
      schedule,
    };
  }, [principal, rate, tenure, startDate]);

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
              <CardTitle>Personal Loan Details</CardTitle>
              <CardDescription>
                Enter your personal loan information to calculate EMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Loan Amount"
                  value={principal}
                  min={50000}
                  max={5000000}
                  step={10000}
                  valueLabel={formatCurrency(principal)}
                  onValueChange={setPrincipal}
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) =>
                    setPrincipal(Number(e.target.value))
                  }
                  className="mt-2"
                  min={50000}
                  max={5000000}
                />
              </div>

              <div>
                <Slider
                  label="Interest Rate (per annum)"
                  value={rate}
                  min={8}
                  max={30}
                  step={0.1}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-2"
                  min={8}
                  max={30}
                  step={0.1}
                />
              </div>

              <div>
                <TenureInput
                  label="Loan Tenure"
                  value={tenure}
                  min={1}
                  max={7}
                  step={1}
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
            </CardContent>
          </Card>

          <AmortizationChart
            schedule={results.schedule}
            loanDetails={{
              principal: results.principal,
              rate,
              tenure,
              emi: results.emi,
            }}
          />

          <AmortizationTable
            schedule={results.schedule}
            loanDetails={{
              principal: results.principal,
              rate,
              tenure,
              emi: results.emi,
            }}
          />

          <div className="flex justify-end">
            <SaveCalculation
              calculatorType="personal-loan-emi-calculator"
              calculationId="saved"
              data={{
                principal,
                rate,
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
                  <span className="text-text-secondary">Principal Amount</span>
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

