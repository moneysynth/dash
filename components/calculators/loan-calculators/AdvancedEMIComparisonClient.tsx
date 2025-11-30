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
import { StepUpEMIForm } from "@/components/calculators/common/StepUpEMIForm";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateEMI } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getCalculation } from "@/lib/storage";
import { Trash2, Plus } from "lucide-react";
import type { PartPayment, StepUpEMI } from "@/types";
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
  stepUpEMI: StepUpEMI;
}

export function AdvancedEMIComparisonClient() {
  const { formatCurrency } = useCurrency();
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
      stepUpEMI: {
        enabled: false,
        stepUpRate: 10,
      },
    },
    {
      id: 2,
      name: "Scenario 2",
      principal: 5000000,
      rate: 9.0,
      tenure: 20,
      startDate: defaultStartDate,
      partPayments: [],
      stepUpEMI: {
        enabled: false,
        stepUpRate: 10,
      },
    },
  ]);

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("home-loan-emi-comparison_saved");
    if (saved && Array.isArray(saved.scenarios) && saved.scenarios.length > 0) {
      // Validate and load scenarios
      const validScenarios = saved.scenarios
        .filter((s: unknown) => {
          if (typeof s !== "object" || s === null) return false;
          const scenario = s as Record<string, unknown>;
          return (
            typeof scenario.id === "number" &&
            typeof scenario.name === "string" &&
            typeof scenario.principal === "number" &&
            typeof scenario.rate === "number" &&
            typeof scenario.tenure === "number" &&
            scenario.startDate &&
            typeof (scenario.startDate as { month: number; year: number }).month === "number" &&
            typeof (scenario.startDate as { month: number; year: number }).year === "number" &&
            Array.isArray(scenario.partPayments) &&
            scenario.stepUpEMI &&
            typeof (scenario.stepUpEMI as { enabled: boolean; stepUpRate: number }).enabled === "boolean"
          );
        })
        .map((s: unknown) => {
          const scenario = s as AdvancedScenario;
          // Validate tenure is within bounds (1-30 years)
          return {
            ...scenario,
            tenure: Math.max(1, Math.min(30, scenario.tenure)),
          };
        }) as AdvancedScenario[];
      if (validScenarios.length > 0) {
        setScenarios(validScenarios);
      }
    }
  }, []);

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
          stepUpEMI: {
            enabled: false,
            stepUpRate: 10,
          },
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
    partPayments: PartPayment[],
    stepUpEMI: StepUpEMI,
    startDate: { month: number; year: number }
  ) => {
    let currentPrincipal = principal;
    let totalInterest = 0;
    let totalPaid = 0;
    const monthlyRate = rate / 12 / 100;
    const numMonths = tenure * 12;
    const baseEMI = calculateEMI(principal, rate, tenure);
    let currentEMI = baseEMI; // Track current EMI (may change after part payments)
    
    // Calculate step-up EMI multiplier for each month
    const getStepUpMultiplier = (month: number): number => {
      if (!stepUpEMI.enabled || !stepUpEMI.startDate) return 1;
      
      // Calculate the month number when step-up starts
      const startMonth = startDate.month;
      const startYear = startDate.year;
      const stepUpStartMonth = stepUpEMI.startDate.month;
      const stepUpStartYear = stepUpEMI.startDate.year;
      
      // Calculate month number for step-up start relative to loan start
      const stepUpStartMonthNumber = (stepUpStartYear - startYear) * 12 + (stepUpStartMonth - startMonth) + 1;
      
      // If current month is before step-up starts, return 1
      if (month < stepUpStartMonthNumber) return 1;
      
      // Calculate how many years have passed since step-up started
      const monthsSinceStepUp = month - stepUpStartMonthNumber;
      const yearsSinceStepUp = Math.floor(monthsSinceStepUp / 12);
      
      // EMI increases by stepUpRate% each year
      return Math.pow(1 + stepUpEMI.stepUpRate / 100, yearsSinceStepUp);
    };

    const sortedPayments = [...partPayments].sort((a, b) => a.date - b.date);
    let actualEMIs = 0; // Track actual number of EMIs paid

    for (let month = 1; month <= numMonths; month++) {
      // Check if loan is already paid off
      if (currentPrincipal <= 0) {
        break;
      }
      
      actualEMIs++; // Count this EMI

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

      // Apply step-up multiplier to EMI
      const stepUpMultiplier = getStepUpMultiplier(month);
      let monthEMI = baseEMI * stepUpMultiplier;

      // Apply part payment if any
      if (partPaymentAmount > 0) {
        currentPrincipal -= partPaymentAmount;
        monthPrincipal = currentPrincipal;
        monthInterest = monthPrincipal * monthlyRate;
        
        // Recalculate EMI based on new principal and remaining months, then apply step-up multiplier
        const remainingMonths = numMonths - month;
        if (remainingMonths > 0 && currentPrincipal > 0) {
          const recalculatedEMI = calculateEMI(currentPrincipal, rate, remainingMonths / 12);
          monthEMI = recalculatedEMI * stepUpMultiplier;
        } else {
          monthEMI = 0; // Loan paid off
        }
      }

      // Ensure EMI doesn't exceed what's needed to pay off the loan
      if (currentPrincipal > 0) {
        const maxEMI = currentPrincipal + monthInterest;
        monthEMI = Math.min(monthEMI, maxEMI);
      } else {
        monthEMI = 0;
      }

      // Calculate principal payment for this month
      const principalPayment = Math.max(0, monthEMI - monthInterest);
      
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
      totalPaid += monthEMI + partPaymentAmount;
    }

    // Calculate total without step-up EMI (but with part payments) for savings calculation
    let totalWithoutStepUp = 0;
    if (stepUpEMI.enabled) {
      let principalWithoutStepUp = principal;
      for (let month = 1; month <= numMonths; month++) {
        if (principalWithoutStepUp <= 0) break;
        
        let monthPrincipal = principalWithoutStepUp;
        let monthInterest = monthPrincipal * monthlyRate;
        let monthEMI = baseEMI; // No step-up multiplier
        let partPaymentAmount = 0;

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

        if (partPaymentAmount > 0) {
          principalWithoutStepUp -= partPaymentAmount;
          monthPrincipal = principalWithoutStepUp;
          monthInterest = monthPrincipal * monthlyRate;
          const remainingMonths = numMonths - month;
          if (remainingMonths > 0 && principalWithoutStepUp > 0) {
            monthEMI = calculateEMI(principalWithoutStepUp, rate, remainingMonths / 12);
          } else {
            monthEMI = 0;
          }
        }

        if (principalWithoutStepUp > 0) {
          const maxEMI = principalWithoutStepUp + monthInterest;
          monthEMI = Math.min(monthEMI, maxEMI);
        } else {
          monthEMI = 0;
        }

        const principalPayment = Math.max(0, monthEMI - monthInterest);
        principalWithoutStepUp -= principalPayment;
        totalWithoutStepUp += monthEMI + partPaymentAmount;
      }
    }

    // Calculate total without step-up EMI and without part payments
    const totalWithoutStepUpAndPartPayments = baseEMI * numMonths;
    
    // Calculate savings from step-up EMI
    const savingsFromStepUp = stepUpEMI.enabled && totalWithoutStepUp > 0 
      ? totalWithoutStepUp - totalPaid 
      : 0;

    // Calculate savings from part payments (excluding step-up EMI effect)
    // Only calculate if there are actual part payments
    let savingsFromPartPayments = 0;
    if (partPayments.length > 0) {
      if (stepUpEMI.enabled && totalWithoutStepUp > 0) {
        // When step-up is enabled, compare total without step-up (with part payments) vs without part payments
        savingsFromPartPayments = totalWithoutStepUpAndPartPayments - totalWithoutStepUp;
      } else {
        // When step-up is not enabled, compare total paid (with part payments) vs base EMI total
        savingsFromPartPayments = totalWithoutStepUpAndPartPayments - totalPaid;
      }
    }

    // Total savings
    const totalSavings = (baseEMI * numMonths) - totalPaid;

    // Calculate EMI statistics
    const originalEMIs = numMonths;
    const emisReduced = originalEMIs - actualEMIs;

    return {
      emi: baseEMI,
      totalAmount: totalPaid,
      totalInterest,
      principal,
      savings: Math.max(0, totalSavings),
      savingsFromStepUp: Math.max(0, savingsFromStepUp),
      savingsFromPartPayments: Math.max(0, savingsFromPartPayments),
      originalEMIs,
      actualEMIs,
      emisReduced,
    };
  };

  const results = useMemo(() => {
    return scenarios.map((scenario) => {
      const result = calculateAdvancedEMI(
        scenario.principal,
        scenario.rate,
        scenario.tenure,
        scenario.partPayments,
        scenario.stepUpEMI,
        scenario.startDate
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
                Compare up to 3 different loan scenarios with step-up EMI and part payments side by side
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
                    <StepUpEMIForm
                      stepUpEMI={scenario.stepUpEMI}
                      onStepUpEMIChange={(stepUpEMI) =>
                        updateScenario(scenario.id, "stepUpEMI", stepUpEMI)
                      }
                      loanTenure={scenario.tenure}
                      loanStartDate={scenario.startDate}
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <PartPaymentForm
                      partPayments={scenario.partPayments}
                      onPartPaymentsChange={(payments) =>
                        updateScenario(scenario.id, "partPayments", payments)
                      }
                      loanTenure={scenario.tenure * 12}
                      startDate={scenario.startDate}
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
              <div className="space-y-3 text-sm">
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
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-text-primary">
                    Total Amount Paid
                  </span>
                  <span className="font-bold" style={{ color: COLORS[index] }}>
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
                {result.savingsFromStepUp > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">Savings from Step-up EMI</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(result.savingsFromStepUp)}
                    </span>
                  </div>
                )}
                {result.savingsFromPartPayments > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">Savings from Part Payments</span>
                    <span className="font-bold text-secondary">
                      {formatCurrency(result.savingsFromPartPayments)}
                    </span>
                  </div>
                )}
                {result.savings > 1 && result.savingsFromStepUp === 0 && result.savingsFromPartPayments === 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">Total Savings</span>
                    <span className="font-bold text-accent">
                      {formatCurrency(result.savings)}
                    </span>
                  </div>
                )}
                {result.emisReduced > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">EMIs Reduced</span>
                    <span className="font-bold text-green-600">
                      {result.emisReduced} {result.emisReduced === 1 ? 'EMI' : 'EMIs'}
                    </span>
                  </div>
                )}
                {result.emisReduced > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Original Tenure</span>
                    <span className="text-text-secondary">
                      {result.originalEMIs} {result.originalEMIs === 1 ? 'EMI' : 'EMIs'} ({result.tenure} {result.tenure === 1 ? 'year' : 'years'})
                    </span>
                  </div>
                )}
                {result.emisReduced > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Actual Tenure</span>
                    <span className="text-text-secondary">
                      {result.actualEMIs} {result.actualEMIs === 1 ? 'EMI' : 'EMIs'} ({Math.ceil(result.actualEMIs / 12)} {Math.ceil(result.actualEMIs / 12) === 1 ? 'year' : 'years'})
                    </span>
                  </div>
                )}
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

      <div className="flex justify-end mt-6">
        <SaveCalculation
          calculatorType="home-loan-emi-comparison"
          calculationId="saved"
          data={{
            scenarios,
          }}
        />
      </div>

      {/* <AdUnit size="728x90" className="mx-auto" /> */}
    </div>
  );
}


