"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { Target, TrendingUp, Calendar } from "lucide-react";

interface GoalTimelineProps {
  goalAmount: number;
  currentValue: number;
  targetDate: Date;
  monthlySIP: number;
}

export function GoalTimeline({
  goalAmount,
  currentValue,
  targetDate,
  monthlySIP,
}: GoalTimelineProps) {
  const progress = Math.min(100, (currentValue / goalAmount) * 100);
  const monthsRemaining = Math.max(
    0,
    Math.ceil(
      (targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-text-secondary">Progress</span>
              <span className="font-semibold text-text-primary">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs text-text-secondary">Goal Amount</span>
              </div>
              <div className="text-xl font-bold text-primary">
                {formatCurrency(goalAmount)}
              </div>
            </div>

            <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-xs text-text-secondary">Current Value</span>
              </div>
              <div className="text-xl font-bold text-secondary">
                {formatCurrency(currentValue)}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-surface p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-text-secondary" />
              <span className="text-sm font-semibold text-text-primary">
                Timeline
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Target Date</span>
                <span className="font-medium text-text-primary">
                  {targetDate.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Months Remaining</span>
                <span className="font-medium text-text-primary">
                  {monthsRemaining} months
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Monthly SIP</span>
                <span className="font-medium text-text-primary">
                  {formatCurrency(monthlySIP)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

