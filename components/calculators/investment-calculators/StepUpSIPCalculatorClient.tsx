"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { z } from "zod";
import { validateSchema } from "@/lib/validation/utils";
import { stepUpSIPCalculatorSchema, monthlyInvestmentSchema, investmentRateSchema, investmentTenureSchema } from "@/lib/validation/schemas";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateStepUpSIP } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { ChartData } from "@/types";

export function StepUpSIPCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [initialSIP, setInitialSIP] = useState(5000);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [tenure, setTenure] = useState(10);
  const [returns, setReturns] = useState(12);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(stepUpSIPCalculatorSchema, {
      initialAmount: initialSIP,
      stepUpRate,
      stepUpFrequency: "yearly", // Default, can be made configurable
      rate: returns,
      tenure,
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        finalValue: 0,
        totalInvested: 0,
        wealthGain: 0,
        estimatedReturns: 0,
        regularSIPValue: 0,
        regularSIPInvested: 0,
        chartData: [],
        investedData: [],
      };
    }

    const stepUpResult = calculateStepUpSIP(initialSIP, stepUpRate, tenure, returns);
    
    const monthlyRate = returns / 12 / 100;
    const numPayments = tenure * 12;
    const regularSIPValue = initialSIP * ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) * (1 + monthlyRate);
    const regularSIPInvested = initialSIP * numPayments;

    const chartData: ChartData[] = [];
    const investedData: ChartData[] = [];
    const stepUpDecimal = stepUpRate / 100;
    let balance = 0;
    let totalInvested = 0;

    for (let year = 0; year <= tenure; year++) {
      if (year === 0) {
        balance = 0;
        totalInvested = 0;
      } else {
        const currentSIP = initialSIP * Math.pow(1 + stepUpDecimal, year - 1);
        for (let month = 0; month < 12; month++) {
          balance = balance * (1 + monthlyRate) + currentSIP;
          totalInvested += currentSIP;
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
      ...stepUpResult,
      estimatedReturns: stepUpResult.wealthGain,
      regularSIPValue,
      regularSIPInvested,
      chartData,
      investedData,
    };
  }, [initialSIP, stepUpRate, tenure, returns]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-up SIP Details</CardTitle>
              <CardDescription>
                Enter your step-up SIP investment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Initial Monthly SIP"
                  value={initialSIP}
                  min={500}
                  max={100000}
                  step={500}
                  valueLabel={formatCurrency(initialSIP)}
                  onValueChange={setInitialSIP}
                />
                <ValidatedInput
                  type="number"
                  schema={monthlyInvestmentSchema}
                  value={initialSIP}
                  onValueChange={(value) => setInitialSIP(Number(value))}
                  className="mt-2"
                  min={500}
                  max={100000}
                  step={500}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Annual Step-up Rate"
                  value={stepUpRate}
                  min={5}
                  max={25}
                  step={1}
                  valueLabel={`${stepUpRate}%`}
                  onValueChange={setStepUpRate}
                />
                <ValidatedInput
                  type="number"
                  schema={z.number().min(0, "Step-up rate must be 0% or greater").max(50, "Step-up rate must not exceed 50%")}
                  value={stepUpRate}
                  onValueChange={(value) => setStepUpRate(Number(value))}
                  className="mt-2"
                  min={5}
                  max={25}
                  step={1}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Expected Annual Returns"
                  value={returns}
                  min={6}
                  max={18}
                  step={0.5}
                  valueLabel={`${returns}%`}
                  onValueChange={setReturns}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentRateSchema}
                  value={returns}
                  onValueChange={(value) => setReturns(Number(value))}
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
            title="Step-up SIP Growth vs Regular SIP"
            type="line"
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-up SIP Summary</CardTitle>
              <CardDescription>Your investment results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-secondary/10 p-4 text-center border border-secondary/20">
                <p className="text-sm text-text-secondary mb-1">
                  Final Value
                </p>
                <p className="text-3xl font-bold text-secondary">
                  {formatCurrency(results.finalValue)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Invested
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalInvested)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Wealth Gain
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.wealthGain)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparison with Regular SIP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Step-up SIP Value
                </span>
                <span className="font-semibold text-secondary">
                  {formatCurrency(results.finalValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Regular SIP Value
                </span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(results.regularSIPValue)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-semibold text-text-primary">
                  Additional Gain
                </span>
                <span className="font-bold text-accent">
                  {formatCurrency(
                    results.finalValue - results.regularSIPValue
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

