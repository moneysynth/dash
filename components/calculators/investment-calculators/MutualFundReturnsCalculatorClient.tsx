"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { validateSchema } from "@/lib/validation/utils";
import { mutualFundReturnsCalculatorSchema, investmentAmountSchema, investmentRateSchema, investmentTenureSchema, inflationRateSchema } from "@/lib/validation/schemas";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateLumpsum, calculateInflationAdjusted } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { ChartData } from "@/types";

export function MutualFundReturnsCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(mutualFundReturnsCalculatorSchema, {
      initialInvestment,
      sipAmount: 0, // Not used in this calculator
      sipFrequency: "monthly", // Default
      investmentPeriod: tenure,
      redemptionAmount: 0, // Not used in this calculator
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        futureValue: 0,
        totalReturns: 0,
        returnsPercentage: 0,
        cagr: 0,
        inflationAdjusted: 0,
        chartData: [],
      };
    }

    const futureValue = calculateLumpsum(initialInvestment, expectedReturns, tenure);
    const totalReturns = futureValue - initialInvestment;
    const returnsPercentage = (totalReturns / initialInvestment) * 100;
    const cagr = expectedReturns; // CAGR is the expected returns rate
    const inflationAdjusted = calculateInflationAdjusted(
      futureValue,
      inflationRate,
      tenure
    );

    const chartData: ChartData[] = [];
    for (let year = 0; year <= tenure; year++) {
      const value = calculateLumpsum(initialInvestment, expectedReturns, year);
      chartData.push({
        name: `Year ${year}`,
        value: value,
      });
    }

    return {
      futureValue,
      totalReturns,
      returnsPercentage,
      cagr,
      inflationAdjusted,
      chartData,
    };
  }, [initialInvestment, expectedReturns, tenure, inflationRate]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mutual Fund Investment Details</CardTitle>
              <CardDescription>
                Calculate returns on your mutual fund investment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Initial Investment Amount"
                  value={initialInvestment}
                  min={10000}
                  max={10000000}
                  step={10000}
                  valueLabel={formatCurrency(initialInvestment)}
                  onValueChange={setInitialInvestment}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentAmountSchema}
                  value={initialInvestment}
                  onValueChange={(value) => setInitialInvestment(Number(value))}
                  className="mt-2"
                  min={10000}
                  max={10000000}
                  step={10000}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Expected Annual Returns (CAGR)"
                  value={expectedReturns}
                  min={6}
                  max={20}
                  step={0.5}
                  valueLabel={`${expectedReturns}%`}
                  onValueChange={setExpectedReturns}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentRateSchema}
                  value={expectedReturns}
                  onValueChange={(value) => setExpectedReturns(Number(value))}
                  className="mt-2"
                  min={6}
                  max={20}
                  step={0.5}
                  validateOnBlur={true}
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Equity funds: 12-15%, Debt funds: 6-8%, Hybrid funds: 8-12%
                </p>
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

              <div>
                <Slider
                  label="Inflation Rate (for real returns)"
                  value={inflationRate}
                  min={3}
                  max={10}
                  step={0.5}
                  valueLabel={`${inflationRate}%`}
                  onValueChange={setInflationRate}
                />
                <ValidatedInput
                  type="number"
                  schema={inflationRateSchema}
                  value={inflationRate}
                  onValueChange={(value) => setInflationRate(Number(value))}
                  className="mt-2"
                  min={3}
                  max={10}
                  step={0.5}
                  validateOnBlur={true}
                />
              </div>
            </CardContent>
          </Card>

          <InvestmentChart
            data={results.chartData}
            title="Mutual Fund Investment Growth"
            type="line"
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Returns</CardTitle>
              <CardDescription>Your mutual fund returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-center border border-primary/20">
                <p className="text-sm text-text-secondary mb-1">
                  Future Value
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(results.futureValue)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Initial Investment
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(initialInvestment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Returns
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalReturns)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Returns Percentage
                  </span>
                  <span className="font-semibold text-text-primary">
                    {results.returnsPercentage.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    CAGR (Annual Returns)
                  </span>
                  <span className="font-semibold text-text-primary">
                    {results.cagr}% p.a.
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-text-secondary">
                    Inflation Adjusted Value
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.inflationAdjusted)}
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
                  Investment Amount
                </span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(initialInvestment)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Expected CAGR
                </span>
                <span className="font-semibold text-text-primary">
                  {expectedReturns}% p.a.
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
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Inflation Rate
                </span>
                <span className="font-semibold text-text-primary">
                  {inflationRate}% p.a.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

