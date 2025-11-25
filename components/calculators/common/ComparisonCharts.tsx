"use client";

import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ComparisonChartsProps {
  comparisonChartData: Array<{
    name: string;
    EMI: number;
    "Total Interest": number;
    "Total Amount": number;
  }>;
  yearlyComparisonData: Array<Record<string, string | number>>;
  results: Array<{
    id: number;
    name: string;
  }>;
  colors: string[];
  isMobile: boolean;
}

function ComparisonChartsComponent({
  comparisonChartData,
  yearlyComparisonData,
  results,
  colors,
  isMobile,
}: ComparisonChartsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          EMI, Interest & Total Amount Comparison
        </h3>
        <div className="w-full">
          <div className="w-full h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonChartData}
                margin={{
                  top: 10,
                  right: 5,
                  left: 0,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => {
                    // Abbreviate "Scenario X" to "SX" on mobile
                    if (isMobile) {
                      return value.replace("Scenario ", "S");
                    }
                    return value;
                  }}
                  interval={0}
                />
                <YAxis
                  tickFormatter={(value) => {
                    // Use shorter format on mobile
                    if (isMobile) {
                      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                      return `₹${(value / 1000).toFixed(0)}K`;
                    }
                    return formatCurrency(value);
                  }}
                  tick={{ fontSize: 10 }}
                  width={isMobile ? 50 : 70}
                />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={12} />
                <Bar dataKey="EMI" fill="#2563eb" />
                <Bar dataKey="Total Interest" fill="#10b981" />
                <Bar dataKey="Total Amount" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Yearly Interest Comparison
        </h3>
        <div className="w-full">
          <div className="w-full h-[350px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yearlyComparisonData}
                margin={{
                  top: 10,
                  right: 5,
                  left: 0,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={isMobile ? 1 : "preserveStartEnd"}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    // Use shorter format on mobile
                    if (isMobile) {
                      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                      return `₹${(value / 1000).toFixed(0)}K`;
                    }
                    return formatCurrency(value);
                  }}
                  tick={{ fontSize: 10 }}
                  width={isMobile ? 50 : 70}
                />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={12} />
                {results.map((result, index) => (
                  <Line
                    key={result.id}
                    type="monotone"
                    dataKey={result.name}
                    stroke={colors[index]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ComparisonCharts = memo(ComparisonChartsComponent);

