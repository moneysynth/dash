"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { validateField as validateFieldUtil, formatValidationError } from "@/lib/validation/utils";

interface UseValidationOptions<T extends z.ZodTypeAny> {
  schema: T;
  initialValue?: z.infer<T>;
  onValidationChange?: (isValid: boolean) => void;
}

interface ValidationState {
  error: string | null;
  isValid: boolean;
  touched: boolean;
}

/**
 * Hook for validating form fields
 * @param options - Validation options
 * @returns Validation state and handlers
 */
export function useValidation<T extends z.ZodTypeAny>({
  schema,
  initialValue,
  onValidationChange,
}: UseValidationOptions<T>) {
  const [state, setState] = useState<ValidationState>({
    error: null,
    isValid: initialValue !== undefined,
    touched: false,
  });

  const validate = useCallback(
    (value: unknown): boolean => {
      const result = validateFieldUtil(schema, value);
      
      setState((prev) => ({
        ...prev,
        error: result.error || null,
        isValid: result.success,
        touched: true,
      }));
      
      if (onValidationChange) {
        onValidationChange(result.success);
      }
      
      return result.success;
    },
    [schema, onValidationChange]
  );

  const reset = useCallback(() => {
    setState({
      error: null,
      isValid: initialValue !== undefined,
      touched: false,
    });
  }, [initialValue]);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
      isValid: error === null,
    }));
  }, []);

  return {
    ...state,
    validate,
    reset,
    setError,
  };
}

/**
 * Hook for validating multiple fields
 */
export function useFormValidation<T extends Record<string, z.ZodTypeAny>>(
  schemas: T
) {
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );

  const validateField = useCallback(
    <K extends keyof T>(field: K, value: unknown): boolean => {
      const schema = schemas[field];
      const result = validateFieldUtil(schema, value);
      
      setErrors((prev) => ({
        ...prev,
        [field]: result.error || null,
      }));
      
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
      
      return result.success;
    },
    [schemas]
  );

  const validateAll = useCallback((values: Record<keyof T, unknown>): boolean => {
    let allValid = true;
    const newErrors: Record<keyof T, string | null> = {} as Record<keyof T, string | null>;
    
    for (const field in schemas) {
      const schema = schemas[field];
      const value = values[field];
      const result = validateFieldUtil(schema, value);
      
      if (!result.success) {
        allValid = false;
        newErrors[field] = result.error || null;
      } else {
        newErrors[field] = null;
      }
      
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
    }
    
    setErrors(newErrors);
    return allValid;
  }, [schemas]);

  const reset = useCallback(() => {
    setErrors({} as Record<keyof T, string | null>);
    setTouched({} as Record<keyof T, boolean>);
  }, []);

  const getFieldError = useCallback(
    (field: keyof T): string | null => {
      return errors[field] || null;
    },
    [errors]
  );

  const isFieldTouched = useCallback(
    (field: keyof T): boolean => {
      return touched[field] || false;
    },
    [touched]
  );

  const isFormValid = useCallback((): boolean => {
    return Object.values(errors).every((error) => error === null);
  }, [errors]);

  return {
    errors,
    touched,
    validateField,
    validateAll,
    reset,
    getFieldError,
    isFieldTouched,
    isFormValid,
  };
}

