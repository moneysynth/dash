"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { TenureInput } from "@/components/ui/TenureInput";
import { PartPaymentForm } from "@/components/calculators/common/PartPaymentForm";
import { AmortizationTable } from "@/components/calculators/common/AmortizationTable";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateEMI, formatCurrency } from "@/lib/utils";
import type { PartPayment } from "@/types";
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

export function AdvancedEMICalculatorClient() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [partPayments, setPartPayments] = useState<PartPayment[]>([]);
  
  // Default to current month/year
  const currentDate = new Date();
  const [startDate, setStartDate] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const results = useMemo(() => {
    let currentPrincipal = principal;
    let totalInterest = 0;
    let totalPaid = 0;
    const monthlyRate = rate / 12 / 100;
    const numMonths = tenure * 12;
    const baseEMI = calculateEMI(principal, rate, tenure);
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

    for (let month = 1; month <= numMonths; month++) {
      let monthPrincipal = currentPrincipal;
      let monthInterest = monthPrincipal * monthlyRate;
      let monthEMI = baseEMI;
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
        const remainingMonths = numMonths - month;
        if (remainingMonths > 0) {
          monthEMI = calculateEMI(currentPrincipal, rate, remainingMonths / 12);
        }
      }

      const principalPayment = monthEMI - monthInterest;
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

    return {
      emi: baseEMI,
      totalAmount: totalPaid,
      totalInterest,
      principal,
      schedule,
      savings: (baseEMI * numMonths) - totalPaid,
    };
  }, [principal, rate, tenure, partPayments, startDate]);

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
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>
                Enter your loan information
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
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) =>
                    setPrincipal(Number(e.target.value))
                  }
                  className="mt-2"
                  min={100000}
                  max={50000000}
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
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-2"
                  min={5}
                  max={20}
                  step={0.1}
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

          <PartPaymentForm
            partPayments={partPayments}
            onPartPaymentsChange={setPartPayments}
            loanTenure={tenure * 12}
          />

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

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
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
                {results.savings > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">
                      Savings from Part Payments
                    </span>
                    <span className="font-bold text-secondary">
                      {formatCurrency(results.savings)}
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
        </div>
      </div>
    </>
  );
}

