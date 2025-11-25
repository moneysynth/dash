"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
import { Button } from "@/components/ui/Button";
import { PartPaymentForm } from "@/components/calculators/common/PartPaymentForm";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateEMI, formatCurrency } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import type { PartPayment } from "@/types";
import { ChartSkeleton, PieChartSkeleton } from "@/components/calculators/common/ChartSkeleton";

// Dynamically import comparison charts to reduce initial bundle size
const AdvancedComparisonCharts = dynamic(
  () => import("@/components/calculators/common/AdvancedComparisonCharts").then((mod) => ({ default: mod.AdvancedComparisonCharts })),
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

interface AdvancedScenario {
  id: number;
  name: string;
  principal: number;
  rate: number;
  tenure: number;
  startDate: { month: number; year: number };
  partPayments: PartPayment[];
}

export function AdvancedEMIComparisonClient() {
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

  const [scenarios, setScenarios] = useState<AdvancedScenario[]>([
    {
      id: 1,
      name: "Scenario 1",
      principal: 5000000,
      rate: 8.5,
      tenure: 20,
      startDate: defaultStartDate,
      partPayments: [],
    },
    {
      id: 2,
      name: "Scenario 2",
      principal: 5000000,
      rate: 9.0,
      tenure: 20,
      startDate: defaultStartDate,
      partPayments: [],
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
          partPayments: [],
        },
      ]);
    }
  }, [scenarios, defaultStartDate]);

  const removeScenario = useCallback((id: number) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((s) => s.id !== id));
    }
  }, [scenarios]);

  const updateScenario = useCallback((id: number, field: keyof AdvancedScenario, value: unknown) => {
    setScenarios(
      scenarios.map((s) => {
        if (s.id === id) {
          // Ensure arrays are properly cloned
          if (field === "partPayments" && Array.isArray(value)) {
            return { ...s, [field]: [...value] };
          }
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  }, [scenarios]);

  const calculateAdvancedEMI = (
    principal: number,
    rate: number,
    tenure: number,
    partPayments: PartPayment[]
  ) => {
    let currentPrincipal = principal;
    let totalInterest = 0;
    let totalPaid = 0;
    const monthlyRate = rate / 12 / 100;
    const numMonths = tenure * 12;
    const baseEMI = calculateEMI(principal, rate, tenure);
    let currentEMI = baseEMI; // Track current EMI (may change after part payments)
    let savings = 0;

    const sortedPayments = [...partPayments].sort((a, b) => a.date - b.date);

    for (let month = 1; month <= numMonths; month++) {
      // Check if loan is already paid off
      if (currentPrincipal <= 0) {
        break;
      }

      let monthPrincipal = currentPrincipal;
      let monthInterest = monthPrincipal * monthlyRate;
      let partPaymentAmount = 0;

      // Check for part payments in this month
      for (const payment of sortedPayments) {
        if (
          payment.type === "one-time" &&
          payment.date === month
        ) {
          partPaymentAmount += payment.amount;
        } else if (
          payment.type === "recurring" &&
          payment.frequency &&
          (month - payment.date) % payment.frequency === 0 &&
          month >= payment.date
        ) {
          partPaymentAmount += payment.amount;
        }
      }

      // Apply part payment if any
      if (partPaymentAmount > 0) {
        currentPrincipal -= partPaymentAmount;
        monthPrincipal = currentPrincipal;
        monthInterest = monthPrincipal * monthlyRate;
        
        // Recalculate EMI based on new principal and remaining months
        const remainingMonths = numMonths - month;
        if (remainingMonths > 0 && currentPrincipal > 0) {
          currentEMI = calculateEMI(currentPrincipal, rate, remainingMonths / 12);
        } else {
          currentEMI = 0; // Loan paid off
        }
      }

      // Calculate principal payment for this month
      const principalPayment = currentEMI - monthInterest;
      
      // Ensure we don't overpay
      if (currentPrincipal - principalPayment < 0) {
        const finalPayment = currentPrincipal + monthInterest;
        totalPaid += finalPayment;
        totalInterest += monthInterest;
        currentPrincipal = 0;
        break;
      }

      currentPrincipal -= principalPayment;
      totalInterest += monthInterest;
      totalPaid += currentEMI + partPaymentAmount;
    }

    // Calculate savings (difference from base EMI without part payments)
    const baseTotalAmount = baseEMI * numMonths;
    savings = baseTotalAmount - totalPaid;

    return {
      emi: baseEMI,
      totalAmount: totalPaid,
      totalInterest,
      principal,
      savings: Math.max(0, savings),
    };
  };

  const results = useMemo(() => {
    return scenarios.map((scenario) => {
      const result = calculateAdvancedEMI(
        scenario.principal,
        scenario.rate,
        scenario.tenure,
        scenario.partPayments
      );

      return {
        id: scenario.id,
        name: scenario.name,
        rate: scenario.rate,
        tenure: scenario.tenure,
        ...result,
      };
    });
  }, [scenarios]);

  const comparisonChartData = results.map((result) => ({
    name: result.name,
    EMI: result.emi,
    "Total Interest": result.totalInterest,
    "Total Amount": result.totalAmount,
    Savings: result.savings,
  }));

  const pieChartData = results.map((result) => ({
    name: result.name,
    principal: result.principal,
    interest: result.totalInterest,
    savings: result.savings,
  }));

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* Scenario Inputs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Compare Advanced Loan Scenarios</CardTitle>
              <CardDescription>
                Compare up to 3 different loan scenarios with part payments side by side
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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

                  <div className="pt-4 border-t border-border">
                    <PartPaymentForm
                      partPayments={scenario.partPayments}
                      onPartPaymentsChange={(payments) =>
                        updateScenario(scenario.id, "partPayments", payments)
                      }
                      loanTenure={scenario.tenure * 12}
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
                {result.savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Savings</span>
                    <span className="font-semibold text-accent">
                      {formatCurrency(result.savings)}
                    </span>
                  </div>
                )}
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
          <div className="space-y-8">
            <AdvancedComparisonCharts
              comparisonChartData={comparisonChartData}
              isMobile={isMobile}
            />

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Payment Breakdown by Scenario
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pieChartData.map((data, index) => {
                  const pieData = [
                    { name: "Principal", value: data.principal },
                    { name: "Interest", value: data.interest },
                    ...(data.savings > 0 ? [{ name: "Savings", value: data.savings }] : []),
                  ];
                  const pieColors = [
                    COLORS[index],
                    "#10b981",
                    ...(data.savings > 0 ? ["#f59e0b"] : []),
                  ];
                  
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold mb-4 text-center" style={{ color: COLORS[index] }}>
                          {results[index].name}
                        </h4>
                        <div className="w-full">
                          <FilterablePieChart
                            data={pieData}
                            colors={pieColors}
                            height={220}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
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
                {results.some((r) => r.savings > 0) && (
                  <tr className="border-b border-border">
                    <td className="p-3 text-sm text-text-secondary">Savings</td>
                    {results.map((result) => (
                      <td
                        key={result.id}
                        className="p-3 text-sm text-center font-semibold text-accent"
                      >
                        {formatCurrency(result.savings)}
                      </td>
                    ))}
                  </tr>
                )}
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


