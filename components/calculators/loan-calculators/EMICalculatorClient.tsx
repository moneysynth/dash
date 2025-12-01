"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import { validateSchema } from "@/lib/validation/utils";
import { emiCalculatorSchema, loanPrincipalSchema, interestRateSchema } from "@/lib/validation/schemas";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
import { PartPaymentForm } from "@/components/calculators/common/PartPaymentForm";
import { StepUpEMIForm } from "@/components/calculators/common/StepUpEMIForm";
import { AmortizationTable } from "@/components/calculators/common/AmortizationTable";
import { SaveCalculation } from "@/components/calculators/common/SaveCalculation";
import { AdUnit } from "@/components/common/AdUnit";
import { AD_SLOTS } from "@/lib/ads";
import { calculateEMI } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getCalculation } from "@/lib/storage";
import type { PartPayment, StepUpEMI } from "@/types";
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

const COLORS = ["#2563eb", "#10b981", "#8b5cf6"];

export function EMICalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [partPayments, setPartPayments] = useState<PartPayment[]>([]);
  const [stepUpEMI, setStepUpEMI] = useState<StepUpEMI>({
    enabled: false,
    stepUpRate: 10,
  });
  
  // Default to current month/year
  const currentDate = new Date();
  const [startDate, setStartDate] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  // Load saved calculation from localStorage on mount
  useEffect(() => {
    const saved = getCalculation("home-loan-emi-calculator_saved");
    if (saved) {
      if (typeof saved.principal === "number") setPrincipal(saved.principal);
      if (typeof saved.rate === "number") setRate(saved.rate);
      if (typeof saved.tenure === "number") {
        // Validate tenure is within bounds (1-30 years)
        const validatedTenure = Math.max(1, Math.min(30, saved.tenure));
        setTenure(validatedTenure);
      }
      if (saved.startDate && typeof saved.startDate === "object" && saved.startDate !== null) {
        const startDate = saved.startDate as Record<string, unknown>;
        if (typeof startDate.month === "number" && typeof startDate.year === "number") {
          setStartDate({ month: startDate.month, year: startDate.year });
        }
      }
      if (Array.isArray(saved.partPayments)) setPartPayments(saved.partPayments as PartPayment[]);
      if (saved.stepUpEMI && typeof saved.stepUpEMI === "object" && saved.stepUpEMI !== null) {
        const stepUpEMI = saved.stepUpEMI as Record<string, unknown>;
        setStepUpEMI({
          enabled: stepUpEMI.enabled === true,
          stepUpRate: typeof stepUpEMI.stepUpRate === "number" ? stepUpEMI.stepUpRate : 10,
          startDate: stepUpEMI.startDate && typeof stepUpEMI.startDate === "object" && stepUpEMI.startDate !== null
            ? (() => {
                const startDate = stepUpEMI.startDate as Record<string, unknown>;
                if (typeof startDate.month === "number" && typeof startDate.year === "number") {
                  return { month: startDate.month, year: startDate.year };
                }
                return undefined;
              })()
            : undefined,
        });
      }
    }
  }, []);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(emiCalculatorSchema, {
      principal,
      rate,
      tenure,
      startDate,
      partPayments: partPayments.map(p => ({
        amount: p.amount,
        date: p.date,
        type: p.type,
        frequency: p.frequency,
      })),
      stepUpEMI: {
        enabled: stepUpEMI.enabled,
        stepUpRate: stepUpEMI.stepUpRate,
        startDate: stepUpEMI.startDate,
      },
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        emi: 0,
        totalAmount: 0,
        totalInterest: 0,
        principal: 0,
        schedule: [],
        savings: 0,
        savingsFromStepUp: 0,
        savingsFromPartPayments: 0,
        totalSavings: 0,
        emisReduced: 0,
        originalEMIs: 0,
        actualEMIs: 0,
      };
    }

    let currentPrincipal = principal;
    let totalInterest = 0;
    let totalPaid = 0;
    const monthlyRate = rate / 12 / 100;
    const numMonths = tenure * 12;
    const baseEMI = calculateEMI(principal, rate, tenure);
    
    // Calculate total without step-up EMI (but with part payments) for savings calculation
    let totalWithoutStepUp = 0;
    if (stepUpEMI.enabled) {
      let principalWithoutStepUp = principal;
      const sortedPayments = [...partPayments].sort((a, b) => a.date - b.date);
      
      for (let month = 1; month <= numMonths; month++) {
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

        if (principalWithoutStepUp <= 0) break;
      }
    }
    const schedule: Array<{
      period: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
      year: number;
      month: number;
      date?: Date;
      dateLabel?: string;
      prepayment?: number;
    }> = [];

    const sortedPayments = [...partPayments].sort((a, b) => a.date - b.date);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

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

    for (let month = 1; month <= numMonths; month++) {
      let monthPrincipal = currentPrincipal;
      let monthInterest = monthPrincipal * monthlyRate;
      
      // Apply step-up multiplier to base EMI
      const stepUpMultiplier = getStepUpMultiplier(month);
      let monthEMI = baseEMI * stepUpMultiplier;
      
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
        currentPrincipal -= partPaymentAmount;
        monthPrincipal = currentPrincipal;
        monthInterest = monthPrincipal * monthlyRate;
        // Recalculate EMI after part payment, but apply step-up multiplier
        const remainingMonths = numMonths - month;
        if (remainingMonths > 0 && currentPrincipal > 0) {
          const recalculatedEMI = calculateEMI(currentPrincipal, rate, remainingMonths / 12);
          // Apply step-up multiplier to recalculated EMI
          monthEMI = recalculatedEMI * stepUpMultiplier;
        } else {
          monthEMI = 0;
        }
      }

      // Ensure EMI doesn't exceed what's needed to pay off the loan
      if (currentPrincipal > 0) {
        const maxEMI = currentPrincipal + monthInterest;
        monthEMI = Math.min(monthEMI, maxEMI);
      } else {
        monthEMI = 0;
      }

      const principalPayment = Math.max(0, monthEMI - monthInterest);
      currentPrincipal -= principalPayment;
      totalInterest += monthInterest;
      totalPaid += monthEMI + partPaymentAmount;

      // Calculate payment date
      const paymentMonth = ((startDate.month - 1 + month - 1) % 12);
      const paymentYear = startDate.year + Math.floor((startDate.month - 1 + month - 1) / 12);
      const paymentDate = new Date(paymentYear, paymentMonth, 1);
      const dateLabel = `${monthNames[paymentMonth]} ${paymentYear}`;

      schedule.push({
        period: month,
        payment: monthEMI + partPaymentAmount,
        principal: principalPayment + partPaymentAmount,
        interest: monthInterest,
        balance: Math.max(0, currentPrincipal),
        year: Math.ceil(month / 12),
        month: ((month - 1) % 12) + 1,
        date: paymentDate,
        dateLabel: dateLabel,
        prepayment: partPaymentAmount > 0 ? partPaymentAmount : undefined,
      });

      if (currentPrincipal <= 0) break;
    }

    // Calculate actual number of EMIs paid
    const actualEMIs = schedule.length;
    const originalEMIs = numMonths;
    const emisReduced = originalEMIs - actualEMIs;

    // Calculate savings from step-up EMI
    const savingsFromStepUp = stepUpEMI.enabled && totalWithoutStepUp > 0 
      ? totalWithoutStepUp - totalPaid 
      : 0;

    // Calculate savings from part payments (excluding step-up EMI effect)
    const totalWithoutStepUpAndPartPayments = baseEMI * numMonths;
    const savingsFromPartPayments = totalWithoutStepUp > 0 
      ? totalWithoutStepUpAndPartPayments - totalWithoutStepUp
      : (baseEMI * numMonths) - totalPaid;

    return {
      emi: baseEMI,
      totalAmount: totalPaid,
      totalInterest,
      principal,
      schedule,
      savings: (baseEMI * numMonths) - totalPaid,
      savingsFromStepUp,
      savingsFromPartPayments,
      originalEMIs,
      actualEMIs,
      emisReduced,
    };
  }, [principal, rate, tenure, partPayments, startDate, stepUpEMI]);

  const pieChartData = useMemo(() => {
    const data = [
      { name: "Principal", value: results.principal },
      { name: "Interest", value: results.totalInterest },
    ];
    
    // Add savings if there are part payments
    if (results.savings > 0) {
      data.push({ name: "Savings", value: results.savings });
    }
    
    return data;
  }, [results]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Home Loan Details</CardTitle>
              <CardDescription>
                Enter your loan information to calculate EMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Loan Amount"
                  value={principal}
                  min={100000}
                  max={50000000}
                  step={50000}
                  valueLabel={formatCurrency(principal)}
                  onValueChange={setPrincipal}
                />
                <ValidatedInput
                  type="number"
                  schema={loanPrincipalSchema}
                  value={principal}
                  onValueChange={(val) => setPrincipal(Number(val))}
                  className="mt-2"
                  min={100000}
                  max={50000000}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Interest Rate (per annum)"
                  value={rate}
                  min={5}
                  max={20}
                  step={0.1}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <ValidatedInput
                  type="number"
                  schema={interestRateSchema}
                  value={rate}
                  onValueChange={(val) => setRate(Number(val))}
                  className="mt-2"
                  min={5}
                  max={20}
                  step={0.1}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <TenureInput
                  label="Loan Tenure"
                  value={tenure}
                  min={1}
                  max={30}
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

          <StepUpEMIForm
            stepUpEMI={stepUpEMI}
            onStepUpEMIChange={setStepUpEMI}
            loanTenure={tenure}
            loanStartDate={startDate}
          />

          <PartPaymentForm
            partPayments={partPayments}
            onPartPaymentsChange={setPartPayments}
            loanTenure={tenure * 12}
            startDate={startDate}
          />

          <AdUnit format="responsive-display-horizontal" size="728x90" adSlot={AD_SLOTS.DISPLAY_HORIZONTAL} className="mx-auto" />

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
            showPrepayment={true}
          />

          <div className="flex justify-end">
            <SaveCalculation
              calculatorType="home-loan-emi-calculator"
              calculationId="saved"
              data={{
                principal,
                rate,
                tenure,
                startDate,
                partPayments,
                stepUpEMI,
              }}
            />
          </div>

          <AdUnit format="responsive-display-horizontal" size="728x90" adSlot={AD_SLOTS.DISPLAY_HORIZONTAL} className="mx-auto" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>EMI Summary</CardTitle>
              <CardDescription>Your loan calculation results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-text-secondary">Base Monthly EMI</p>
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
                    Total Amount Paid
                  </span>
                  <span className="font-bold text-primary">
                    {formatCurrency(results.totalAmount)}
                  </span>
                </div>
                {results.savingsFromStepUp > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">
                      Savings from Step-up EMI
                    </span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(results.savingsFromStepUp)}
                    </span>
                  </div>
                )}
                {results.savingsFromPartPayments > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">
                      Savings from Part Payments
                    </span>
                    <span className="font-bold text-secondary">
                      {formatCurrency(results.savingsFromPartPayments)}
                    </span>
                  </div>
                )}
                {results.savings > 0 && results.savingsFromStepUp === 0 && results.savingsFromPartPayments === 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">
                      Total Savings
                    </span>
                    <span className="font-bold text-secondary">
                      {formatCurrency(results.savings)}
                    </span>
                  </div>
                )}
                {results.emisReduced > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">
                      EMIs Reduced
                    </span>
                    <span className="font-bold text-green-600">
                      {results.emisReduced} {results.emisReduced === 1 ? 'EMI' : 'EMIs'}
                    </span>
                  </div>
                )}
                {results.emisReduced > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      Original Tenure
                    </span>
                    <span className="text-text-secondary">
                      {results.originalEMIs} {results.originalEMIs === 1 ? 'EMI' : 'EMIs'} ({tenure} {tenure === 1 ? 'year' : 'years'})
                    </span>
                  </div>
                )}
                {results.emisReduced > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      Actual Tenure
                    </span>
                    <span className="text-text-secondary">
                      {results.actualEMIs} {results.actualEMIs === 1 ? 'EMI' : 'EMIs'} ({Math.ceil(results.actualEMIs / 12)} {Math.ceil(results.actualEMIs / 12) === 1 ? 'year' : 'years'})
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
              <CardDescription>Visual breakdown of your loan payments</CardDescription>
            </CardHeader>
            <CardContent>
              <FilterablePieChart
                data={pieChartData}
                colors={COLORS}
                height={300}
              />
            </CardContent>
          </Card>

          <AdUnit format="responsive-display-square" size="250x250" adSlot={AD_SLOTS.DISPLAY_SQUARE} className="mx-auto" />
          <AdUnit format="responsive-display-square" size="250x250" adSlot={AD_SLOTS.DISPLAY_SQUARE} className="mx-auto" />
          <AdUnit format="responsive-display-vertical" size="300x600" adSlot={AD_SLOTS.DISPLAY_VERTICAL} className="mx-auto" />
          <AdUnit format="responsive-display-vertical" size="300x600" adSlot={AD_SLOTS.DISPLAY_VERTICAL} className="mx-auto" />
          <AdUnit format="responsive-display-square" size="250x250" adSlot={AD_SLOTS.DISPLAY_SQUARE} className="mx-auto" />
        </div>
      </div>
    </>
  );
}

