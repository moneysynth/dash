"use client";

import * as React from "react";
import { z } from "zod";
import { Input, InputProps } from "./Input";
import { useValidation } from "@/hooks/useValidation";
import { useToast } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";

interface ValidatedInputProps extends Omit<InputProps, "error"> {
  schema: z.ZodTypeAny;
  value: number | string;
  onValueChange: (value: number | string) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

export const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      schema,
      value,
      onValueChange,
      validateOnBlur = true,
      validateOnChange = false,
      className,
      ...props
    },
    ref
  ) => {
    const { error, validate, touched } = useValidation({ schema });
    const { showToast } = useToast();
    const previousErrorRef = React.useRef<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onValueChange(newValue);
      
      if (validateOnChange && touched) {
        // Convert to number if input type is number
        const valueToValidate = props.type === "number" ? Number(newValue) : newValue;
        const isValid = validate(valueToValidate);
        
        // Error toast will be shown via useEffect when error state updates
      }
    };

    const handleBlur = () => {
      if (validateOnBlur) {
        // Convert to number if input type is number
        const valueToValidate = props.type === "number" ? Number(value) : value;
        const isValid = validate(valueToValidate);
        
        // Error toast will be shown via useEffect when error state updates
      }
    };

    // Show toast notification when validation error occurs
    React.useEffect(() => {
      if (error && error !== previousErrorRef.current && touched) {
        showToast(error, "error", 4000);
        previousErrorRef.current = error;
      } else if (!error) {
        previousErrorRef.current = null;
      }
    }, [error, touched, showToast]);

    return (
      <Input
        ref={ref}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error || undefined}
        className={className}
        {...props}
      />
    );
  }
);

ValidatedInput.displayName = "ValidatedInput";

