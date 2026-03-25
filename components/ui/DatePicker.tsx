"use client";

import * as React from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string; // ISO date string (YYYY-MM-DD)
  onChange: (value: string) => void;
  label?: string | React.ReactNode;
  min?: string; // ISO date string
  max?: string; // ISO date string
  className?: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

type ViewMode = "year" | "month" | "day";

function parseIsoDateAsLocalDate(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

export function DatePicker({
  value,
  onChange,
  label,
  min,
  max,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("year");
  
  const selectedDate = value ? parseIsoDateAsLocalDate(value) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = min ? parseIsoDateAsLocalDate(min) : null;
  const maxDate = max ? parseIsoDateAsLocalDate(max) : null;

  if (minDate) minDate.setHours(0, 0, 0, 0);
  if (maxDate) maxDate.setHours(0, 0, 0, 0);

  // Initialize view date from selected date or today
  const [viewDate, setViewDate] = React.useState(() => {
    if (selectedDate) {
      return {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth(),
        day: selectedDate.getDate(),
      };
    }
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    };
  });

  // Generate years (from 100 years ago to current year only)
  const currentYear = today.getFullYear();
  const startYear = currentYear - 100;
  const endYear = currentYear;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Get days in selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Refs for scrolling to current year
  const yearScrollRef = React.useRef<HTMLDivElement>(null);
  const currentYearRef = React.useRef<HTMLButtonElement>(null);

  // Auto-scroll to current year when year view opens
  React.useEffect(() => {
    if (isOpen && viewMode === "year" && currentYearRef.current) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        currentYearRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isOpen, viewMode, currentYear]);

  const handleYearSelect = (year: number) => {
    setViewDate((prev) => ({ ...prev, year }));
    setViewMode("month");
  };

  const handleMonthSelect = (month: number) => {
    setViewDate((prev) => ({ ...prev, month }));
    setViewMode("day");
  };

  const handleDaySelect = (day: number) => {
    const date = new Date(viewDate.year, viewDate.month, day);
    date.setHours(0, 0, 0, 0); // Set to midnight to avoid timezone issues
    
    // Validate against min/max
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    
    // Format date as YYYY-MM-DD without timezone conversion issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayStr = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayStr}`;
    
    onChange(dateStr);
    setIsOpen(false);
    setViewMode("year"); // Reset to year view for next time
  };

  const isDateDisabled = (year: number, month?: number, day?: number) => {
    if (day !== undefined && month !== undefined) {
      const date = new Date(year, month, day);
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
    } else if (month !== undefined) {
      // Check if any day in this month is selectable
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      if (minDate && lastDay < minDate) return true;
      if (maxDate && firstDay > maxDate) return true;
    } else {
      // Check if any month in this year is selectable
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(year, 11, 31);
      if (minDate && lastDay < minDate) return true;
      if (maxDate && firstDay > maxDate) return true;
    }
    return false;
  };

  const isSelected = (year: number, month?: number, day?: number) => {
    if (!selectedDate) return false;
    if (day !== undefined && month !== undefined) {
      return (
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
      );
    } else if (month !== undefined) {
      return (
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month
      );
    } else {
      return selectedDate.getFullYear() === year;
    }
  };

  const isTodayDate = (year: number, month?: number, day?: number) => {
    if (day !== undefined && month !== undefined) {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
      );
    } else if (month !== undefined) {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month
      );
    } else {
      return today.getFullYear() === year;
    }
  };

  const formatDisplay = () => {
    if (!value) return "Select a date";
    const date = parseIsoDateAsLocalDate(value);
    if (!date) return "Select a date";
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleBack = () => {
    if (viewMode === "day") {
      setViewMode("month");
    } else if (viewMode === "month") {
      setViewMode("year");
    }
  };

  const renderContent = () => {
    if (viewMode === "year") {
      return (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-text-secondary uppercase mb-2">
            Select Year
          </div>
          <div 
            ref={yearScrollRef}
            className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto"
          >
            {years.map((year) => {
              const disabled = isDateDisabled(year);
              const selected = isSelected(year);
              const isTodayYear = isTodayDate(year);

              return (
                <button
                  key={year}
                  ref={year === currentYear ? currentYearRef : null}
                  type="button"
                  onClick={() => !disabled && handleYearSelect(year)}
                  disabled={disabled}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                    disabled
                      ? "text-text-secondary/30 cursor-not-allowed"
                      : "hover:bg-primary/10 cursor-pointer",
                    selected
                      ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                      : isTodayYear
                      ? "bg-primary/20 text-primary font-semibold border-2 border-primary/30"
                      : "text-text-primary"
                  )}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (viewMode === "month") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-text-secondary uppercase">
              Select Month - {viewDate.year}
            </div>
            <button
              type="button"
              onClick={() => setViewMode("year")}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition-colors border border-primary/20 hover:border-primary/40"
            >
              Change Year
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const disabled = isDateDisabled(viewDate.year, index);
              const selected = isSelected(viewDate.year, index);
              const isTodayMonth = isTodayDate(viewDate.year, index);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !disabled && handleMonthSelect(index)}
                  disabled={disabled}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                    disabled
                      ? "text-text-secondary/30 cursor-not-allowed"
                      : "hover:bg-primary/10 cursor-pointer",
                    selected
                      ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                      : isTodayMonth
                      ? "bg-primary/20 text-primary font-semibold border-2 border-primary/30"
                      : "text-text-primary"
                  )}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Day view
    return (
      <div className="space-y-3">
        <div className="text-sm font-semibold text-text-secondary uppercase mb-2">
          Select Day - {months[viewDate.month]} {viewDate.year}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const disabled = isDateDisabled(viewDate.year, viewDate.month, day);
            const selected = isSelected(viewDate.year, viewDate.month, day);
            const isTodayDay = isTodayDate(viewDate.year, viewDate.month, day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => !disabled && handleDaySelect(day)}
                disabled={disabled}
                className={cn(
                  "aspect-square rounded-lg text-sm font-medium transition-all duration-150",
                  "flex items-center justify-center",
                  disabled
                    ? "text-text-secondary/30 cursor-not-allowed"
                    : "hover:bg-primary/10 cursor-pointer",
                  selected
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md scale-105"
                    : isTodayDay
                    ? "bg-primary/20 text-primary font-semibold border-2 border-primary/30"
                    : "text-text-primary"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <div className="mb-2 block text-sm font-medium text-text-primary">
          {typeof label === "string" ? <label>{label}</label> : label}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setViewMode("year"); // Always start from year view
        }}
        className={cn(
          "w-full flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 h-14",
          "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-all duration-200 shadow-sm hover:shadow-md",
          "text-base font-medium text-text-primary"
        )}
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
          <span className={cn(value ? "text-text-primary" : "text-text-secondary")}>
            {formatDisplay()}
          </span>
        </div>
        <svg
          className={cn(
            "h-5 w-5 text-text-secondary transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setIsOpen(false);
              setViewMode("year");
            }}
          />
          <div
            className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-surface shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with back button */}
            {viewMode !== "year" && (
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface/50 transition-colors text-sm font-medium text-text-primary"
                >
                  <ChevronUp className="h-4 w-4 rotate-[-90deg]" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setViewMode("year");
                  }}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg text-text-secondary hover:bg-surface/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            
            {/* Cancel button for year view */}
            {viewMode === "year" && (
              <div className="mb-4 flex items-center justify-end border-b border-border pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setViewMode("year");
                  }}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg text-text-secondary hover:bg-surface/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Content */}
            <div className="min-h-[200px]">
              {renderContent()}
            </div>

            {/* Quick Actions - Show in year view */}
            {viewMode === "year" && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    // Format today's date as YYYY-MM-DD without timezone issues
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, "0");
                    const day = String(today.getDate()).padStart(2, "0");
                    const todayStr = `${year}-${month}-${day}`;
                    
                    if (!isDateDisabled(today.getFullYear(), today.getMonth(), today.getDate())) {
                      onChange(todayStr);
                      setIsOpen(false);
                      setViewMode("year");
                    }
                  }}
                  className="w-full px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  disabled={isDateDisabled(today.getFullYear(), today.getMonth(), today.getDate())}
                >
                  Select Today
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

