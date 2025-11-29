"use client";

import { useState, useCallback, memo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PieChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface FilterablePieChartProps {
  data: PieChartData[];
  title?: string;
  colors?: string[];
  height?: number;
}

// Color mapping for tooltip
const DEFAULT_COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    color?: string;
    percent?: number;
  }>;
}

function CustomTooltip({ active, payload, data }: CustomTooltipProps & { data?: PieChartData[] }) {
  const { formatCurrency } = useCurrency();
  if (!active || !payload || !payload.length) {
    return null;
  }

  const entry = payload[0];
  const name = entry.name || "";
  const value = entry.value as number;
  const color = entry.color || "#2563eb";
  
  // Calculate percent manually if not provided or if it's 0
  let percent = entry.percent;
  if (!percent || percent === 0) {
    // Calculate total from all data points
    const total = data?.reduce((sum, item) => sum + (item.value as number), 0) || 0;
    if (total > 0) {
      percent = value / total;
    } else {
      percent = 0;
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface shadow-lg p-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-text-secondary">{name}:</span>
          <span className="font-semibold" style={{ color }}>
            {formatCurrency(value)}
          </span>
        </div>
        <div className="text-xs text-text-secondary">
          {((percent ?? 0) * 100).toFixed(1)}% of total
        </div>
      </div>
    </div>
  );
}

function FilterablePieChartComponent({
  data,
  title,
  colors = DEFAULT_COLORS,
  height = 300,
}: FilterablePieChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const handleLegendClick = useCallback((data: { dataKey?: string | number | ((obj: unknown) => unknown) }, index: number) => {
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
  }, []);

  const isSeriesHidden = useCallback((name: string) => hiddenSeries.has(name), [hiddenSeries]);

  // Filter out hidden series
  const visibleData = data.filter((item) => !isSeriesHidden(item.name));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart
        margin={{
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <Pie
          data={visibleData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
            // Only show label if percent is significant (>5%) to avoid clutter
            const percentValue = (percent ?? 0) * 100;
            if (percentValue <= 5 || !midAngle || !cx || !cy || !innerRadius || !outerRadius) return "";
            
            // Calculate position inside the segment
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            
            // Determine font size based on chart height
            const fontSize = height < 200 ? 9 : height < 250 ? 10 : 11;
            const smallFontSize = height < 200 ? 7 : height < 250 ? 8 : 9;
            
            return (
              <g style={{ pointerEvents: "none" }}>
                <text
                  x={x}
                  y={y - 6}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={fontSize}
                  fontWeight="600"
                >
                  {name}
                </text>
                <text
                  x={x}
                  y={y + 6}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={smallFontSize}
                  fontWeight="500"
                  opacity={0.9}
                >
                  {percentValue.toFixed(1)}%
                </text>
              </g>
            );
          }}
          outerRadius={height < 200 ? 80 : height < 250 ? 100 : 120}
          innerRadius={height < 200 ? 30 : height < 250 ? 40 : 50}
          fill="#8884d8"
          dataKey="value"
        >
          {visibleData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              opacity={isSeriesHidden(entry.name) ? 0 : 1}
            />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip data={data} />}
          wrapperStyle={{ zIndex: 1000 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export const FilterablePieChart = memo(FilterablePieChartComponent);

