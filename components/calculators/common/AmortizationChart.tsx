"use client";

import { useState, useMemo, useEffect, memo } from "react";
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { AmortizationEntry } from "@/types";

// Color mapping for tooltip
const TOOLTIP_COLORS: Record<string, string> = {
  principal: "#2563eb", // Blue for Principal Paid
  interest: "#10b981", // Green for Interest Paid
  balance: "#8b5cf6", // Purple for Remaining Principal
  totalPayment: "#f59e0b", // Orange for Total Payment
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
      <p className="font-semibold text-text-primary mb-2">{`Year: ${label}`}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const dataKey = String(entry.dataKey || "");
          const color = TOOLTIP_COLORS[dataKey] || entry.color || "#2563eb";
          let name = entry.name || dataKey;
          
          // Format names
          if (name === "principal") name = "Principal Paid";
          else if (name === "interest") name = "Interest Paid";
          else if (name === "balance") name = "Remaining Principal";
          else if (name === "totalPayment") name = "Total Payment";
          
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

interface AmortizationChartProps {
  schedule: AmortizationEntry[];
  loanDetails?: {
    principal: number;
    rate: number;
    tenure: number;
    emi: number;
  };
}

interface YearChartData {
  year: string;
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number; // Remaining principal amount
}

function AmortizationChartComponent({
  schedule,
}: AmortizationChartProps) {
  const { formatCurrency, formatInIndianUnits, currency } = useCurrency();
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = useMemo(() => {
    const yearsMap = new Map<number, YearChartData>();

    schedule.forEach((entry) => {
      // Extract calendar year from date or dateLabel
      let calendarYear: number;
      
      if (entry.date) {
        calendarYear = entry.date.getFullYear();
      } else if (entry.dateLabel) {
        // Extract year from dateLabel (e.g., "Nov 2025" -> 2025)
        const yearMatch = entry.dateLabel.match(/\d{4}/);
        calendarYear = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();
      } else {
        // Fallback to current year if no date info
        calendarYear = new Date().getFullYear();
      }

      // Get or create year data
      let yearData = yearsMap.get(calendarYear);
      if (!yearData) {
        yearData = {
          year: calendarYear.toString(),
          principal: 0,
          interest: 0,
          totalPayment: 0,
          balance: 0,
        };
        yearsMap.set(calendarYear, yearData);
      }

      yearData.principal += entry.principal;
      yearData.interest += entry.interest;
      yearData.totalPayment += entry.payment;
      // Use the balance from the last entry of each year (end of year balance)
      yearData.balance = entry.balance;
    });

    // Convert map to array and sort by calendar year
    return Array.from(yearsMap.values()).sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, [schedule]);

  const handleLegendClick = (data: { dataKey?: string | number | ((obj: unknown) => unknown) }, index: number) => {
    const dataKey = typeof data.dataKey === "string" || typeof data.dataKey === "number" 
      ? String(data.dataKey) 
      : null;
    if (!dataKey) return;
    
    setHiddenSeries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dataKey)) {
        newSet.delete(dataKey);
      } else {
        newSet.add(dataKey);
      }
      return newSet;
    });
  };

  const isSeriesHidden = (dataKey: string) => hiddenSeries.has(dataKey);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Amortization Schedule - Yearly Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="w-full">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 10,
                  left: 0,
                  bottom: 60,
                }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={isMobile ? 1 : 0}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => {
                  if (isMobile && currency === "INR") {
                    // Use Indian units for mobile on INR
                    if (value >= 10000000) return formatInIndianUnits(value);
                    return formatInIndianUnits(value);
                  }
                  // For non-INR or desktop, use full format
                  return formatCurrency(value);
                }}
                tick={{ fontSize: 9 }}
                width={isMobile ? 45 : 55}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => {
                  if (isMobile && currency === "INR") {
                    // Use Indian units for mobile on INR
                    if (value >= 10000000) return formatInIndianUnits(value);
                    return formatInIndianUnits(value);
                  }
                  // For non-INR or desktop, use full format
                  return formatCurrency(value);
                }}
                tick={{ fontSize: 9 }}
                width={isMobile ? 45 : 55}
              />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  onClick={handleLegendClick}
                  wrapperStyle={{
                    paddingTop: "10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  formatter={(value) => {
                    if (value === "principal") return "Principal Paid";
                    if (value === "interest") return "Interest Paid";
                    if (value === "balance") return "Remaining Principal";
                    return value;
                  }}
                  iconType="line"
                  verticalAlign="top"
                  height={40}
                />
                <Bar
                  yAxisId="left"
                  dataKey="principal"
                  stackId="a"
                  fill="#2563eb"
                  name="Principal"
                  radius={[0, 0, 0, 0]}
                  fillOpacity={isSeriesHidden("principal") ? 0 : 1}
                  hide={isSeriesHidden("principal")}
                />
                <Bar
                  yAxisId="left"
                  dataKey="interest"
                  stackId="a"
                  fill="#10b981"
                  name="Interest"
                  radius={[4, 4, 0, 0]}
                  fillOpacity={isSeriesHidden("interest") ? 0 : 1}
                  hide={isSeriesHidden("interest")}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="balance"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  strokeOpacity={isSeriesHidden("balance") ? 0 : 1}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="balance"
                  hide={isSeriesHidden("balance")}
                />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}

export const AmortizationChart = memo(AmortizationChartComponent);

