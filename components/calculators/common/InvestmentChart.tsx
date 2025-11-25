"use client";

import { useState, useMemo, useEffect, memo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { ChartData } from "@/types";
import type { TooltipProps as RechartsTooltipProps } from "recharts";

interface InvestmentChartProps {
  data: ChartData[];
  type?: "line" | "area";
  title?: string;
  dataKey?: string;
  showInvested?: boolean;
  investedData?: ChartData[];
  startDate?: Date;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatDateLabel(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function parseYearLabel(label: string): number {
  // Extract year number from "Year 0", "Year 1", etc.
  const match = label.match(/Year (\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Color mapping for tooltip
const TOOLTIP_COLORS: Record<string, string> = {
  invested: "#2563eb", // Blue for Amount Invested
  value: "#10b981", // Green for Estimated Value
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

function InvestmentChartComponent({
  data,
  type = "line",
  title = "Investment Growth",
  showInvested = false,
  investedData,
  startDate = new Date(),
}: InvestmentChartProps) {
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
    return data.map((item, index) => {
      // Parse the year from the label (e.g., "Year 0" -> 0, "Year 1" -> 1)
      const yearOffset = parseYearLabel(item.name);
      
      // Calculate the actual date
      const actualDate = new Date(startDate);
      actualDate.setFullYear(startDate.getFullYear() + yearOffset);
      
      // Format as "Jan 2024" style
      const dateLabel = formatDateLabel(actualDate);

      return {
        name: dateLabel,
        originalName: item.name,
        value: item.value,
        invested: investedData?.[index]?.value || 0,
        label: item.label,
        date: actualDate,
      };
    });
  }, [data, investedData, startDate]);

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

  const ChartComponent = type === "area" ? AreaChart : LineChart;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="w-full">
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartComponent 
                data={chartData}
                margin={{
                  top: 10,
                  right: 5,
                  left: 0,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={isMobile ? 2 : "preserveStartEnd"}
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    // Abbreviate month labels on mobile: "Jan 2024" -> "J24"
                    if (isMobile) {
                      const parts = value.split(' ');
                      if (parts.length === 2) {
                        return `${parts[0].substring(0, 1)}${parts[1].substring(2)}`;
                      }
                    }
                    return value;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    if (isMobile) {
                      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                      return `₹${(value / 100000).toFixed(1)}L`;
                    }
                    return `₹${(value / 100000).toFixed(1)}L`;
                  }}
                  tick={{ fontSize: 10 }}
                  width={isMobile ? 50 : 60}
                />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    onClick={handleLegendClick}
                    wrapperStyle={{ cursor: "pointer", fontSize: "12px" }}
                  />
            {showInvested && investedData && (
              <>
                {type === "area" ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="invested"
                      stackId="1"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={isSeriesHidden("invested") ? 0 : 0.6}
                      name="Amount Invested"
                      hide={isSeriesHidden("invested")}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={isSeriesHidden("value") ? 0 : 0.6}
                      name="Estimated Value"
                      hide={isSeriesHidden("value")}
                    />
                  </>
                ) : (
                  <>
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="#2563eb"
                      name="Amount Invested"
                      strokeWidth={2}
                      strokeOpacity={isSeriesHidden("invested") ? 0 : 1}
                      hide={isSeriesHidden("invested")}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      name="Estimated Value"
                      strokeWidth={2}
                      strokeOpacity={isSeriesHidden("value") ? 0 : 1}
                      hide={isSeriesHidden("value")}
                    />
                  </>
                )}
              </>
            )}
            {!showInvested && (
              <>
                {type === "area" ? (
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={isSeriesHidden("value") ? 0 : 0.6}
                    name="Value"
                    hide={isSeriesHidden("value")}
                  />
                ) : (
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    name="Value"
                    strokeWidth={2}
                    strokeOpacity={isSeriesHidden("value") ? 0 : 1}
                    hide={isSeriesHidden("value")}
                  />
                )}
              </>
            )}
                </ChartComponent>
              </ResponsiveContainer>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}

export const InvestmentChart = memo(InvestmentChartComponent);
