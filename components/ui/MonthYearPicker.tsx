"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthYearPickerProps {
  value: { month: number; year: number };
  onChange: (value: { month: number; year: number }) => void;
  label?: string;
  className?: string;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function MonthYearPicker({
  value,
  onChange,
  label,
  className,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();
  const yearScrollRef = React.useRef<HTMLDivElement>(null);
  const currentYearRef = React.useRef<HTMLButtonElement>(null);
  
  // Generate years from 30 years ago to 20 years in the future
  const startYear = currentYear - 30;
  const endYear = currentYear + 20;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  
  // Scroll to current year when dropdown opens
  React.useEffect(() => {
    if (isOpen && currentYearRef.current) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        currentYearRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isOpen]);

  const formatDisplay = () => {
    return `${months[value.month - 1]} ${value.year}`;
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-primary",
          "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-colors"
        )}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-text-secondary" />
          <span>{formatDisplay()}</span>
        </div>
        <svg
          className={cn(
            "h-4 w-4 text-text-secondary transition-transform",
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
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="absolute z-20 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {/* Month Selection */}
              <div>
                <div className="mb-2 text-xs font-semibold text-text-secondary uppercase">
                  Month
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        onChange({ ...value, month: index + 1 });
                        setIsOpen(false);
                      }}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors",
                        value.month === index + 1
                          ? "bg-primary text-white font-medium"
                          : "text-text-primary hover:bg-surface/50"
                      )}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Selection */}
              <div>
                <div className="mb-2 text-xs font-semibold text-text-secondary uppercase">
                  Year
                </div>
                <div 
                  ref={yearScrollRef}
                  className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto"
                >
                  {years.map((year) => (
                    <button
                      key={year}
                      ref={year === currentYear ? currentYearRef : null}
                      type="button"
                      onClick={() => {
                        onChange({ ...value, year });
                        setIsOpen(false);
                      }}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors",
                        value.year === year
                          ? "bg-primary text-white font-medium"
                          : year === currentYear
                          ? "bg-primary/20 text-primary font-medium border border-primary/30"
                          : "text-text-primary hover:bg-surface/50"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

