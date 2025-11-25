"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateLumpsum, calculateInflationAdjusted, formatCurrency } from "@/lib/utils";
import type { ChartData } from "@/types";

export function LumpsumCalculatorClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    const futureValue = calculateLumpsum(principal, rate, tenure);
    const returns = futureValue - principal;
    const inflationAdjusted = calculateInflationAdjusted(
      futureValue,
      inflationRate,
      tenure
    );

    const chartData: ChartData[] = [];
    for (let year = 0; year <= tenure; year++) {
      const value = calculateLumpsum(principal, rate, year);
      chartData.push({
        name: `Year ${year}`,
        value: value,
      });
    }

    return {
      futureValue,
      returns,
      inflationAdjusted,
      chartData,
    };
  }, [principal, rate, tenure, inflationRate]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>
                Enter your lump sum investment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Investment Amount"
                  value={principal}
                  min={10000}
                  max={10000000}
                  step={10000}
                  valueLabel={formatCurrency(principal)}
                  onValueChange={setPrincipal}
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="mt-2"
                  min={10000}
                  max={10000000}
                  step={10000}
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
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-2"
                  min={6}
                  max={18}
                  step={0.5}
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
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="mt-2"
                  min={1}
                  max={30}
                />
              </div>

              <div>
                <Slider
                  label="Inflation Rate (for adjusted returns)"
                  value={inflationRate}
                  min={3}
                  max={10}
                  step={0.5}
                  valueLabel={`${inflationRate}%`}
                  onValueChange={setInflationRate}
                />
                <Input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-2"
                  min={3}
                  max={10}
                  step={0.5}
                />
              </div>
            </CardContent>
          </Card>

          <InvestmentChart
            data={results.chartData}
            title="Investment Growth Over Time"
            type="line"
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Your investment results</CardDescription>
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
                    {formatCurrency(principal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Returns
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.returns)}
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
                  {formatCurrency(principal)}
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

