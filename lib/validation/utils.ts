import { z } from "zod";

/**
 * Validates data against a Zod schema and returns the result
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Object with success status, data (if valid), and errors (if invalid)
 */
export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): {
  success: boolean;
  data?: z.infer<T>;
  errors?: z.ZodError;
} {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }
  
  return {
    success: false,
    errors: result.error,
  };
}

/**
 * Validates a single field value
 * @param schema - Zod schema for the field
 * @param value - Value to validate
 * @returns Object with success status and error message (if invalid)
 */
export function validateField(
  schema: z.ZodTypeAny,
  value: unknown
): {
  success: boolean;
  error?: string;
} {
  const result = schema.safeParse(value);
  
  if (result.success) {
    return { success: true };
  }
  
  // Get the first error message
  const errorMessage = result.error.issues[0]?.message || "Invalid value";
  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Clamps a number value to be within min and max bounds
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Validates and clamps a number value
 * @param value - Value to validate and clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value within bounds
 */
export function validateAndClamp(
  value: number,
  min: number,
  max: number
): number {
  return clampValue(value, min, max);
}

/**
 * Formats validation errors into a user-friendly message
 * @param error - Zod error object
 * @returns Formatted error message
 */
export function formatValidationError(error: z.ZodError): string {
  if (error.issues.length === 0) {
    return "Validation failed";
  }
  
  // Return the first error message
  return error.issues[0].message;
}

/**
 * Gets all validation error messages
 * @param error - Zod error object
 * @returns Array of error messages
 */
export function getValidationErrors(error: z.ZodError): string[] {
  return error.issues.map((err) => err.message);
}

/**
 * Gets validation error for a specific field path
 * @param error - Zod error object
 * @param path - Field path (e.g., "principal", "partPayments.0.amount")
 * @returns Error message for the field, or undefined if no error
 */
export function getFieldError(
  error: z.ZodError,
  path: string | (string | number)[]
): string | undefined {
  const pathArray = Array.isArray(path) ? path : path.split(".");
  
  const fieldError = error.issues.find((err) => {
    return JSON.stringify(err.path) === JSON.stringify(pathArray);
  });
  
  return fieldError?.message;
}

