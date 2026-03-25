"use client";

import { memo, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import type { StepUpEMI } from "@/types";

interface StepUpEMIFormProps {
  stepUpEMI: StepUpEMI;
  onStepUpEMIChange: (stepUpEMI: StepUpEMI) => void;
  loanTenure: number; // in years
  loanStartDate?: { month: number; year: number }; // Loan start date for reference
}

function StepUpEMIFormComponent({
  stepUpEMI,
  onStepUpEMIChange,
  loanTenure,
  loanStartDate,
}: StepUpEMIFormProps) {
  // Default to current month/year if loanStartDate not provided
  const currentDate = new Date();
  const defaultLoanStartDate = loanStartDate || {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  // Calculate default step-up start date (12 months from loan start)
  const defaultStepUpStartDate = useMemo(() => {
    if (stepUpEMI.startDate) {
      return stepUpEMI.startDate;
    }
    const monthsFromStart = 12;
    const stepUpMonth = ((defaultLoanStartDate.month - 1 + monthsFromStart - 1) % 12) + 1;
    const stepUpYear = defaultLoanStartDate.year + Math.floor((defaultLoanStartDate.month - 1 + monthsFromStart - 1) / 12);
    return { month: stepUpMonth, year: stepUpYear };
  }, [stepUpEMI.startDate, defaultLoanStartDate]);

  const handleToggle = useCallback(() => {
    const newEnabled = !stepUpEMI.enabled;
    
    // If enabling and startDate is not set, set it to the default
    if (newEnabled && !stepUpEMI.startDate) {
      const monthsFromStart = 12;
      const stepUpMonth = ((defaultLoanStartDate.month - 1 + monthsFromStart - 1) % 12) + 1;
      const stepUpYear = defaultLoanStartDate.year + Math.floor((defaultLoanStartDate.month - 1 + monthsFromStart - 1) / 12);
      
      onStepUpEMIChange({
        ...stepUpEMI,
        enabled: newEnabled,
        startDate: { month: stepUpMonth, year: stepUpYear },
      });
    } else {
      onStepUpEMIChange({
        ...stepUpEMI,
        enabled: newEnabled,
      });
    }
  }, [stepUpEMI, onStepUpEMIChange, defaultLoanStartDate]);

  const handleStepUpRateChange = useCallback((value: number) => {
    onStepUpEMIChange({
      ...stepUpEMI,
      stepUpRate: value,
    });
  }, [stepUpEMI, onStepUpEMIChange]);

  const handleStartDateChange = useCallback((value: { month: number; year: number }) => {
    const loanStartMonthIndex = defaultLoanStartDate.year * 12 + defaultLoanStartDate.month;
    const stepUpMonthIndex = value.year * 12 + value.month;
    const safeStartDate =
      stepUpMonthIndex < loanStartMonthIndex ? defaultLoanStartDate : value;

    onStepUpEMIChange({
      ...stepUpEMI,
      startDate: safeStartDate,
    });
  }, [stepUpEMI, onStepUpEMIChange, defaultLoanStartDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step-up EMI</CardTitle>
        <CardDescription>
          Increase your EMI annually to reduce loan tenure and save on interest
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Enable Step-up EMI</p>
            <p className="text-xs text-text-secondary mt-1">
              Your EMI will increase annually by the specified percentage
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={stepUpEMI.enabled}
              onChange={handleToggle}
              className="sr-only peer focus:outline-none"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        {stepUpEMI.enabled && (
          <>
            <div>
              <Slider
                label="Annual Step-up Rate"
                value={stepUpEMI.stepUpRate}
                min={5}
                max={25}
                step={1}
                valueLabel={`${stepUpEMI.stepUpRate}%`}
                onValueChange={handleStepUpRateChange}
              />
              <Input
                type="number"
                value={stepUpEMI.stepUpRate}
                onChange={(e) =>
                  handleStepUpRateChange(Number(e.target.value))
                }
                className="mt-2"
                min={5}
                max={25}
                step={1}
              />
              <p className="mt-1 text-xs text-text-secondary">
                EMI will increase by this percentage each year
              </p>
            </div>

            <div>
              <MonthYearPicker
                label="Start Step-up From"
                value={defaultStepUpStartDate}
                onChange={handleStartDateChange}
              />
              <p className="mt-1 text-xs text-text-secondary">
                Step-up will begin from the selected month and year
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <p className="text-sm font-medium text-text-primary mb-2">
                How Step-up EMI Works
              </p>
              <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                <li>Your EMI increases by {stepUpEMI.stepUpRate}% each year starting from {(() => {
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  return `${monthNames[defaultStepUpStartDate.month - 1]} ${defaultStepUpStartDate.year}`;
                })()}</li>
                <li>This reduces your loan tenure and total interest paid</li>
                <li>Ideal if your income increases over time</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export const StepUpEMIForm = memo(StepUpEMIFormComponent);

