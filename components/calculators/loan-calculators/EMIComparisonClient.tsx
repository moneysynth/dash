"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
import { Button } from "@/components/ui/Button";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateEMI, formatCurrency, generateAmortizationSchedule } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";

// Dynamically import comparison charts to reduce initial bundle size
const ComparisonCharts = dynamic(
  () => import("@/components/calculators/common/ComparisonCharts").then((mod) => ({ default: mod.ComparisonCharts })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

interface Scenario {
  id: number;
  name: string;
  principal: number;
  rate: number;
  tenure: number;
  startDate: { month: number; year: number };
}

export function EMIComparisonClient() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentDate = new Date();
  const defaultStartDate = {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 1,
      name: "Scenario 1",
      principal: 5000000,
      rate: 8.5,
      tenure: 20,
      startDate: defaultStartDate,
    },
    {
      id: 2,
      name: "Scenario 2",
      principal: 5000000,
      rate: 9.0,
      tenure: 20,
      startDate: defaultStartDate,
    },
  ]);

  const addScenario = useCallback(() => {
    if (scenarios.length < 3) {
      setScenarios([
        ...scenarios,
        {
          id: scenarios.length + 1,
          name: `Scenario ${scenarios.length + 1}`,
          principal: 5000000,
          rate: 8.5,
          tenure: 20,
          startDate: defaultStartDate,
        },
      ]);
    }
  }, [scenarios, defaultStartDate]);

  const removeScenario = useCallback((id: number) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((s) => s.id !== id));
    }
  }, [scenarios]);

  const updateScenario = useCallback((id: number, field: keyof Scenario, value: unknown) => {
    setScenarios(
      scenarios.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  }, [scenarios]);

  const results = useMemo(() => {
    return scenarios.map((scenario) => {
      const emi = calculateEMI(scenario.principal, scenario.rate, scenario.tenure);
      const totalAmount = emi * scenario.tenure * 12;
      const totalInterest = totalAmount - scenario.principal;
      const schedule = generateAmortizationSchedule(
        scenario.principal,
        scenario.rate,
        scenario.tenure,
        emi,
        scenario.startDate
      );

      return {
        id: scenario.id,
        name: scenario.name,
        principal: scenario.principal,
        rate: scenario.rate,
        tenure: scenario.tenure,
        emi,
        totalAmount,
        totalInterest,
        schedule,
      };
    });
  }, [scenarios]);

  const comparisonChartData = results.map((result) => ({
    name: result.name,
    EMI: result.emi,
    "Total Interest": result.totalInterest,
    "Total Amount": result.totalAmount,
  }));

  const yearlyComparisonData = useMemo(() => {
    const years = Math.max(...results.map((r) => r.tenure));
    const data = [];
    
    // Find the earliest start date to use as reference
    const earliestStartDate = scenarios.reduce((earliest, scenario) => {
      const scenarioDate = new Date(scenario.startDate.year, scenario.startDate.month - 1);
      const earliestDate = new Date(earliest.year, earliest.month - 1);
      return scenarioDate < earliestDate ? scenario.startDate : earliest;
    }, scenarios[0].startDate);
    
    for (let year = 1; year <= years; year++) {
      // Calculate actual calendar year from the earliest start date
      const actualYear = earliestStartDate.year + (year - 1);
      const yearLabel = `${actualYear}`;
      
      const yearData: Record<string, number | string> = { year: yearLabel };
      
      results.forEach((result) => {
        const yearSchedule = result.schedule.filter(
          (entry) => entry.year === year
        );
        const yearlyInterest = yearSchedule.reduce(
          (sum, entry) => sum + entry.interest,
          0
        );
        yearData[result.name] = yearlyInterest;
      });
      
      data.push(yearData);
    }
    
    return data;
  }, [results, scenarios]);

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* Scenario Inputs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Compare Loan Scenarios</CardTitle>
              <CardDescription>
                Compare up to 3 different loan scenarios side by side
              </CardDescription>
            </div>
            {scenarios.length < 3 && (
              <Button onClick={addScenario} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Scenario
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <Card key={scenario.id} className="border-2" style={{ borderColor: COLORS[index] }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg" style={{ color: COLORS[index] }}>
                      {scenario.name}
                    </CardTitle>
                    {scenarios.length > 1 && (
                      <Button
                        onClick={() => removeScenario(scenario.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-2 block">
                      Scenario Name
                    </label>
                    <Input
                      value={scenario.name}
                      onChange={(e) =>
                        updateScenario(scenario.id, "name", e.target.value)
                      }
                      placeholder="Enter scenario name"
                    />
                  </div>

                  <div>
                    <Slider
                      label="Loan Amount"
                      value={scenario.principal}
                      min={100000}
                      max={50000000}
                      step={50000}
                      valueLabel={formatCurrency(scenario.principal)}
                      onValueChange={(value) =>
                        updateScenario(scenario.id, "principal", value)
                      }
                    />
                    <Input
                      type="number"
                      value={scenario.principal}
                      onChange={(e) =>
                        updateScenario(
                          scenario.id,
                          "principal",
                          Number(e.target.value)
                        )
                      }
                      className="mt-2"
                      min={100000}
                      max={50000000}
                    />
                  </div>

                  <div>
                    <Slider
                      label="Interest Rate (per annum)"
                      value={scenario.rate}
                      min={5}
                      max={20}
                      step={0.1}
                      valueLabel={`${scenario.rate}%`}
                      onValueChange={(value) =>
                        updateScenario(scenario.id, "rate", value)
                      }
                    />
                    <Input
                      type="number"
                      value={scenario.rate}
                      onChange={(e) =>
                        updateScenario(scenario.id, "rate", Number(e.target.value))
                      }
                      className="mt-2"
                      min={5}
                      max={20}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <TenureInput
                      label="Loan Tenure"
                      value={scenario.tenure}
                      min={1}
                      max={30}
                      step={1}
                      onChange={(value) =>
                        updateScenario(scenario.id, "tenure", value)
                      }
                    />
                  </div>

                  <div>
                    <MonthYearPicker
                      label="EMI Payments Starting From"
                      value={scenario.startDate}
                      onChange={(value) =>
                        updateScenario(scenario.id, "startDate", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <Card key={result.id} className="border-2" style={{ borderColor: COLORS[index] }}>
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: COLORS[index] }}>
                {result.name} - Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-text-secondary">Monthly EMI</p>
                <p className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                  {formatCurrency(result.emi)}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Principal Amount</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(result.principal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Interest Rate</span>
                  <span className="font-semibold text-text-primary">
                    {result.rate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tenure</span>
                  <span className="font-semibold text-text-primary">
                    {result.tenure} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Interest</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-semibold text-text-primary">
                    Total Amount
                  </span>
                  <span className="font-bold" style={{ color: COLORS[index] }}>
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Overview</CardTitle>
          <CardDescription>
            Visual comparison of all scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComparisonCharts
            comparisonChartData={comparisonChartData}
            yearlyComparisonData={yearlyComparisonData}
            results={results}
            colors={COLORS}
            isMobile={isMobile}
          />
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-text-primary">
                    Metric
                  </th>
                  {results.map((result, index) => (
                    <th
                      key={result.id}
                      className="text-center p-3 text-sm font-semibold"
                      style={{ color: COLORS[index] }}
                    >
                      {result.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm text-text-secondary">Monthly EMI</td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-semibold text-text-primary"
                    >
                      {formatCurrency(result.emi)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm text-text-secondary">Principal Amount</td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-semibold text-text-primary"
                    >
                      {formatCurrency(result.principal)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm text-text-secondary">Interest Rate</td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-semibold text-text-primary"
                    >
                      {result.rate}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm text-text-secondary">Tenure</td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-semibold text-text-primary"
                    >
                      {result.tenure} years
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm text-text-secondary">Total Interest</td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-semibold text-text-primary"
                    >
                      {formatCurrency(result.totalInterest)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-surface/50">
                  <td className="p-3 text-sm font-semibold text-text-primary">
                    Total Amount
                  </td>
                  {results.map((result) => (
                    <td
                      key={result.id}
                      className="p-3 text-sm text-center font-bold text-primary"
                    >
                      {formatCurrency(result.totalAmount)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* <AdUnit size="728x90" className="mx-auto" /> */}
    </div>
  );
}

