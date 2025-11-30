"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { z } from "zod";
import { validateSchema } from "@/lib/validation/utils";
import { rdCalculatorSchema, monthlyInvestmentSchema, interestRateSchema } from "@/lib/validation/schemas";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateRD } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { ChartData } from "@/types";

export function RDCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(rdCalculatorSchema, {
      monthlyDeposit,
      rate,
      tenure,
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        maturityAmount: 0,
        totalDeposited: 0,
        interestEarned: 0,
        tds: 0,
        chartData: [],
      };
    }

    const maturityAmount = calculateRD(monthlyDeposit, rate, tenure);
    const totalDeposited = monthlyDeposit * tenure * 12;
    const interestEarned = maturityAmount - totalDeposited;
    const tds = interestEarned > 40000 ? interestEarned * 0.1 : 0;

    const chartData: ChartData[] = [];
    let balance = 0;
    const monthlyRate = rate / 12 / 100;

    for (let year = 0; year <= tenure; year++) {
      if (year === 0) {
        balance = 0;
      } else {
        for (let month = 0; month < 12; month++) {
          balance = balance * (1 + monthlyRate) + monthlyDeposit;
        }
      }
      chartData.push({
        name: `Year ${year}`,
        value: balance,
      });
    }

    return {
      maturityAmount,
      totalDeposited,
      interestEarned,
      tds,
      chartData,
    };
  }, [monthlyDeposit, rate, tenure]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RD Details</CardTitle>
              <CardDescription>
                Enter your Recurring Deposit information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Monthly Deposit"
                  value={monthlyDeposit}
                  min={500}
                  max={100000}
                  step={500}
                  valueLabel={formatCurrency(monthlyDeposit)}
                  onValueChange={setMonthlyDeposit}
                />
                <ValidatedInput
                  type="number"
                  schema={monthlyInvestmentSchema}
                  value={monthlyDeposit}
                  onValueChange={(value) => setMonthlyDeposit(Number(value))}
                  className="mt-2"
                  min={500}
                  max={100000}
                  step={500}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Interest Rate (per annum)"
                  value={rate}
                  min={4}
                  max={9}
                  step={0.1}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <ValidatedInput
                  type="number"
                  schema={interestRateSchema}
                  value={rate}
                  onValueChange={(value) => setRate(Number(value))}
                  className="mt-2"
                  min={4}
                  max={9}
                  step={0.1}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Tenure (years)"
                  value={tenure}
                  min={1}
                  max={10}
                  step={1}
                  valueLabel={`${tenure} years`}
                  onValueChange={setTenure}
                />
                <ValidatedInput
                  type="number"
                  schema={z.number().min(0.5, "Tenure must be at least 0.5 years").max(10, "Tenure must not exceed 10 years")}
                  value={tenure}
                  onValueChange={(value) => setTenure(Number(value))}
                  className="mt-2"
                  min={1}
                  max={10}
                  validateOnBlur={true}
                />
              </div>
            </CardContent>
          </Card>

          <InvestmentChart
            data={results.chartData}
            title="RD Growth Over Time"
            type="area"
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RD Summary</CardTitle>
              <CardDescription>Your RD calculation results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-secondary/10 p-4 text-center border border-secondary/20">
                <p className="text-sm text-text-secondary mb-1">
                  Maturity Amount
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {formatCurrency(results.maturityAmount)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Deposited
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalDeposited)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Interest Earned
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.interestEarned)}
                  </span>
                </div>
                {results.tds > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">TDS (10%)</span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(results.tds)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>RD Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Monthly Deposit
                </span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(monthlyDeposit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Interest Rate</span>
                <span className="font-semibold text-text-primary">
                  {rate}% p.a.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tenure</span>
                <span className="font-semibold text-text-primary">
                  {tenure} years
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

