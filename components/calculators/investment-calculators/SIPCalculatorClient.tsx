"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { validateSchema } from "@/lib/validation/utils";
import { sipCalculatorSchema, monthlyInvestmentSchema, investmentRateSchema, investmentTenureSchema } from "@/lib/validation/schemas";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateSIP } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { ChartData } from "@/types";

export function SIPCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(10);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(sipCalculatorSchema, {
      monthlyAmount,
      rate,
      tenure,
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        investedAmount: 0,
        estimatedReturns: 0,
        totalValue: 0,
        monthlyAmount: 0,
        rate: 0,
        tenure: 0,
        chartData: [],
        investedData: [],
      };
    }

    const totalValue = calculateSIP(monthlyAmount, rate, tenure);
    const investedAmount = monthlyAmount * tenure * 12;
    const estimatedReturns = totalValue - investedAmount;

    const chartData: ChartData[] = [];
    const investedData: ChartData[] = [];
    const monthlyRate = rate / 12 / 100;
    let balance = 0;
    let totalInvested = 0;

    for (let year = 0; year <= tenure; year++) {
      if (year === 0) {
        balance = 0;
        totalInvested = 0;
      } else {
        for (let month = 1; month <= 12; month++) {
          balance = balance * (1 + monthlyRate) + monthlyAmount;
          totalInvested += monthlyAmount;
        }
      }
      chartData.push({
        name: `Year ${year}`,
        value: balance,
      });
      investedData.push({
        name: `Year ${year}`,
        value: totalInvested,
      });
    }

    return {
      investedAmount,
      estimatedReturns,
      totalValue,
      monthlyAmount,
      rate,
      tenure,
      chartData,
      investedData,
    };
  }, [monthlyAmount, rate, tenure]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>
                Enter your SIP investment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Monthly Investment"
                  value={monthlyAmount}
                  min={500}
                  max={100000}
                  step={500}
                  valueLabel={formatCurrency(monthlyAmount)}
                  onValueChange={setMonthlyAmount}
                />
                <ValidatedInput
                  type="number"
                  schema={monthlyInvestmentSchema}
                  value={monthlyAmount}
                  onValueChange={(value) => setMonthlyAmount(Number(value))}
                  className="mt-2"
                  min={500}
                  max={100000}
                  step={500}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Expected Annual Returns"
                  value={rate}
                  min={6}
                  max={18}
                  step={0.5}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentRateSchema}
                  value={rate}
                  onValueChange={(value) => setRate(Number(value))}
                  className="mt-2"
                  min={6}
                  max={18}
                  step={0.5}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Investment Period (years)"
                  value={tenure}
                  min={1}
                  max={30}
                  step={1}
                  valueLabel={`${tenure} years`}
                  onValueChange={setTenure}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentTenureSchema}
                  value={tenure}
                  onValueChange={(value) => setTenure(Number(value))}
                  className="mt-2"
                  min={1}
                  max={30}
                  validateOnBlur={true}
                />
              </div>
            </CardContent>
          </Card>

          <InvestmentChart
            data={results.chartData}
            investedData={results.investedData}
            showInvested={true}
            title="SIP Growth Chart"
            type="line"
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SIP Summary</CardTitle>
              <CardDescription>Your investment overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-secondary/10 p-4 text-center border border-secondary/20">
                <p className="text-sm text-text-secondary mb-1">
                  Estimated Returns
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {formatCurrency(results.estimatedReturns)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Amount Invested
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.investedAmount)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-text-primary">
                    Total Value
                  </span>
                  <span className="font-bold text-secondary">
                    {formatCurrency(results.totalValue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Monthly SIP Amount
                </span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(monthlyAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Expected Returns
                </span>
                <span className="font-semibold text-text-primary">
                  {rate}% p.a.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Investment Period
                </span>
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

