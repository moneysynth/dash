"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  valueLabel?: string;
  onValueChange?: (value: number) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      valueLabel,
      value,
      onChange,
      onValueChange,
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      onChange?.(e);
      onValueChange?.(newValue);
    };

    // Calculate percentage for highlighted fill
    const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className="w-full">
        {label && (
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">
              {label}
            </label>
            {valueLabel && (
              <span className="text-sm font-semibold text-primary">
                {valueLabel}
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          className={cn(
            "slider-range h-2 w-full cursor-pointer appearance-none rounded-lg bg-border transition-colors",
            "focus:outline-none focus:ring-0",
            className
          )}
          style={{
            accentColor: "var(--primary)",
            "--value-percent": `${percentage}%`,
          } as React.CSSProperties & { "--value-percent": string }}
          ref={ref}
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };

