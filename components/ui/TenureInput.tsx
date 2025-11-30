"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/Slider";
import { Input } from "@/components/ui/Input";

interface TenureInputProps {
  label?: string;
  value: number; // Value in years (for backward compatibility with calculateEMI)
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void; // Returns value in years
}

export function TenureInput({
  label = "Loan Tenure",
  value: valueInYears,
  min = 1,
  max = 30,
  step = 1,
  onChange,
}: TenureInputProps) {
  const [unit, setUnit] = useState<"years" | "months">("years");
  const [displayValue, setDisplayValue] = useState(valueInYears);

  // Convert years to months for display when unit is months
  useEffect(() => {
    if (unit === "months") {
      const monthsValue = Math.round(valueInYears * 12);
      // Validate the converted value is within bounds
      const clampedMonths = Math.max(min * 12, Math.min(max * 12, monthsValue));
      setDisplayValue(clampedMonths);
    } else {
      // Validate the years value is within bounds
      const clampedYears = Math.max(min, Math.min(max, valueInYears));
      setDisplayValue(clampedYears);
    }
  }, [valueInYears, unit, min, max]);

  // Calculate min/max for current unit
  const minValue = unit === "months" ? min * 12 : min;
  const maxValue = unit === "months" ? max * 12 : max;
  const stepValue = unit === "months" ? 1 : step;

  const handleValueChange = (newValue: number) => {
    // Validate and clamp the value within min/max bounds
    const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
    setDisplayValue(clampedValue);
    // Convert to years for the onChange callback
    const yearsValue = unit === "months" ? clampedValue / 12 : clampedValue;
    onChange(yearsValue);
  };

  const handleUnitChange = (newUnit: "years" | "months") => {
    if (newUnit === unit) return;

    if (newUnit === "months") {
      // Convert years to months (round to nearest month)
      const monthsValue = Math.round(valueInYears * 12);
      setDisplayValue(monthsValue);
      onChange(monthsValue / 12);
    } else {
      // Convert months to years (preserve decimal precision for calculation)
      const yearsValue = displayValue / 12;
      // Round display value to nearest integer, but keep precise value for calculation
      const roundedDisplay = Math.round(yearsValue);
      setDisplayValue(roundedDisplay);
      onChange(yearsValue); // Keep precise decimal value for calculations
    }
    setUnit(newUnit);
  };

  const formatValue = (val: number) => {
    if (unit === "months") {
      return `${val} ${val === 1 ? "month" : "months"}`;
    }
    return `${val} ${val === 1 ? "year" : "years"}`;
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
        <div className="flex rounded-lg border border-border p-1 bg-surface">
          <button
            type="button"
            onClick={() => handleUnitChange("years")}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              unit === "years"
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Years
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange("months")}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              unit === "months"
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Months
          </button>
        </div>
      </div>
      <Slider
        label=""
        value={displayValue}
        min={minValue}
        max={maxValue}
        step={stepValue}
        valueLabel={formatValue(displayValue)}
        onValueChange={handleValueChange}
      />
      <Input
        type="number"
        value={displayValue}
        onChange={(e) => {
          const inputValue = e.target.value;
          // Allow empty input for better UX
          if (inputValue === "") {
            return;
          }
          const newValue = Number(inputValue);
          // Validate: must be a valid number and within bounds
          if (!isNaN(newValue) && isFinite(newValue)) {
            handleValueChange(newValue);
          }
        }}
        onBlur={(e) => {
          // On blur, ensure value is within bounds
          const inputValue = e.target.value;
          if (inputValue === "" || isNaN(Number(inputValue))) {
            // Reset to current valid value if input is invalid
            setDisplayValue(unit === "months" ? Math.round(valueInYears * 12) : valueInYears);
            return;
          }
          const newValue = Number(inputValue);
          handleValueChange(newValue);
        }}
        className="mt-2"
        min={minValue}
        max={maxValue}
        step={stepValue}
      />
    </div>
  );
}

