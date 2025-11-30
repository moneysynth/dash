"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import { validateSchema } from "@/lib/validation/utils";
import { swpCalculatorSchema, investmentAmountSchema, monthlyInvestmentSchema, investmentRateSchema, investmentTenureSchema } from "@/lib/validation/schemas";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateSWP } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatDateLabel(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// Color mapping for tooltip
const TOOLTIP_COLORS: Record<string, string> = {
  balance: "#2563eb", // Blue for Remaining Balance
  withdrawn: "#10b981", // Green for Total Withdrawn
};

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    name?: string;
    value?: number;
    color?: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const { formatCurrency } = useCurrency();
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-surface shadow-lg p-3">
      <p className="font-semibold text-text-primary mb-2">{`Period: ${label}`}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const dataKey = String(entry.dataKey || "");
          const color = TOOLTIP_COLORS[dataKey] || entry.color || "#2563eb";
          const name = entry.name || dataKey;
          const value = entry.value as number;

          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-text-secondary">{name}:</span>
              <span className="font-semibold" style={{ color }}>
                {formatCurrency(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SWPCalculatorClient() {
  const { formatCurrency, formatInIndianUnits, currency } = useCurrency();
  const [initialAmount, setInitialAmount] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [tenure, setTenure] = useState(10);

  const results = useMemo(() => {
    // Validate inputs before calculation
    const validation = validateSchema(swpCalculatorSchema, {
      principal: initialAmount,
      monthlyWithdrawal,
      rate,
      tenure,
    });

    if (!validation.success) {
      // Return default/empty results if validation fails
      return {
        finalAmount: 0,
        totalWithdrawn: 0,
        totalInterest: 0,
      };
    }

    return calculateSWP(initialAmount, monthlyWithdrawal, rate, tenure);
  }, [initialAmount, monthlyWithdrawal, rate, tenure]);

  const timelineData = useMemo(() => {
    const data = [];
    let balance = initialAmount;
    const monthlyRate = rate / 12 / 100;
    const numMonths = tenure * 12;
    let totalWithdrawn = 0;
    
    // Start from current date
    const startDate = new Date();

    for (let year = 0; year <= tenure; year++) {
      const months = year * 12;
      if (year === 0) {
        balance = initialAmount;
        totalWithdrawn = 0;
      } else {
        for (let month = 1; month <= 12 && months + month <= numMonths; month++) {
          balance = balance * (1 + monthlyRate);
          const withdrawal = Math.min(monthlyWithdrawal, balance);
          balance -= withdrawal;
          totalWithdrawn += withdrawal;
        }
      }
      
      // Calculate the actual date for this year
      const actualDate = new Date(startDate);
      actualDate.setFullYear(startDate.getFullYear() + year);
      
      // Format as "Jan 2024" style
      const dateLabel = formatDateLabel(actualDate);
      
      data.push({
        year: dateLabel,
        balance: Math.max(0, balance),
        withdrawn: totalWithdrawn,
      });
    }

    return data;
  }, [initialAmount, monthlyWithdrawal, rate, tenure]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Details</CardTitle>
              <CardDescription>
                Enter your SWP investment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Initial Investment"
                  value={initialAmount}
                  min={100000}
                  max={10000000}
                  step={50000}
                  valueLabel={formatCurrency(initialAmount)}
                  onValueChange={setInitialAmount}
                />
                <ValidatedInput
                  type="number"
                  schema={investmentAmountSchema}
                  value={initialAmount}
                  onValueChange={(value) => setInitialAmount(Number(value))}
                  className="mt-2"
                  min={100000}
                  max={10000000}
                  step={50000}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Monthly Withdrawal"
                  value={monthlyWithdrawal}
                  min={1000}
                  max={100000}
                  step={1000}
                  valueLabel={formatCurrency(monthlyWithdrawal)}
                  onValueChange={setMonthlyWithdrawal}
                />
                <ValidatedInput
                  type="number"
                  schema={monthlyInvestmentSchema}
                  value={monthlyWithdrawal}
                  onValueChange={(value) => setMonthlyWithdrawal(Number(value))}
                  className="mt-2"
                  min={1000}
                  max={100000}
                  step={1000}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Expected Annual Returns"
                  value={rate}
                  min={6}
                  max={15}
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
                  max={15}
                  step={0.5}
                  validateOnBlur={true}
                />
              </div>

              <div>
                <Slider
                  label="Withdrawal Period (years)"
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

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Timeline</CardTitle>
              <CardDescription>
                Track your balance and withdrawals over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickFormatter={(value) => {
                      if (currency === "INR") {
                        return formatInIndianUnits(value);
                      }
                      return formatCurrency(value);
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.6}
                    name="Remaining Balance"
                  />
                  <Area
                    type="monotone"
                    dataKey="withdrawn"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Total Withdrawn"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SWP Summary</CardTitle>
              <CardDescription>Your withdrawal overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-accent/10 p-4 text-center">
                <p className="text-sm text-text-secondary">
                  Final Balance
                </p>
                <p className="text-3xl font-bold text-accent">
                  {formatCurrency(results.finalAmount)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Initial Investment
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(initialAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Withdrawn
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalWithdrawn)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Total Interest Earned
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Monthly Withdrawal
                </span>
                <span className="font-semibold text-text-primary">
                  {formatCurrency(monthlyWithdrawal)}
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
                  Withdrawal Period
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

