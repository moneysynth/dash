# Input Validation System

This directory contains comprehensive schema validation for all calculator inputs using Zod.

## Structure

- `schemas.ts` - All validation schemas for different calculator types
- `utils.ts` - Validation utility functions
- `hooks/useValidation.ts` - React hooks for form validation

## Usage

### Basic Field Validation

```tsx
import { monthlyInvestmentSchema } from "@/lib/validation/schemas";
import { useValidation } from "@/hooks/useValidation";

function MyComponent() {
  const { error, validate, isValid } = useValidation({
    schema: monthlyInvestmentSchema,
  });

  const handleChange = (value: number) => {
    validate(value);
    // Update state only if valid
    if (isValid) {
      setValue(value);
    }
  };

  return (
    <Input
      value={value}
      onChange={(e) => handleChange(Number(e.target.value))}
      error={error || undefined}
    />
  );
}
```

### Using ValidatedInput Component

```tsx
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { monthlyInvestmentSchema } from "@/lib/validation/schemas";

function MyComponent() {
  const [value, setValue] = useState(5000);

  return (
    <ValidatedInput
      type="number"
      schema={monthlyInvestmentSchema}
      value={value}
      onValueChange={setValue}
      validateOnBlur={true}
      validateOnChange={false}
    />
  );
}
```

### Form Validation

```tsx
import { useFormValidation } from "@/hooks/useValidation";
import { sipCalculatorSchema } from "@/lib/validation/schemas";

function SIPCalculator() {
  const validation = useFormValidation({
    monthlyAmount: monthlyInvestmentSchema,
    rate: investmentRateSchema,
    tenure: investmentTenureSchema,
  });

  const handleSubmit = () => {
    const isValid = validation.validateAll({
      monthlyAmount,
      rate,
      tenure,
    });

    if (isValid) {
      // Proceed with calculation
    }
  };

  return (
    <form>
      <Input
        error={validation.getFieldError("monthlyAmount") || undefined}
        onBlur={() => validation.validateField("monthlyAmount", monthlyAmount)}
      />
    </form>
  );
}
```

### Validating Complete Calculator Input

```tsx
import { validateSchema } from "@/lib/validation/utils";
import { sipCalculatorSchema } from "@/lib/validation/schemas";

function validateCalculatorInput() {
  const input = {
    monthlyAmount: 5000,
    rate: 12,
    tenure: 10,
  };

  const result = validateSchema(sipCalculatorSchema, input);

  if (result.success) {
    // Use result.data (validated and typed)
    console.log(result.data);
  } else {
    // Handle errors
    console.error(result.errors);
  }
}
```

## Available Schemas

### Loan Calculators
- `emiCalculatorSchema` - Home/EMI calculator
- `personalLoanCalculatorSchema` - Personal loan
- `carLoanCalculatorSchema` - Car loan
- `creditCardEMICalculatorSchema` - Credit card EMI
- `loanEligibilityCalculatorSchema` - Loan eligibility

### Investment Calculators
- `sipCalculatorSchema` - SIP calculator
- `lumpsumCalculatorSchema` - Lumpsum calculator
- `fdCalculatorSchema` - Fixed Deposit
- `rdCalculatorSchema` - Recurring Deposit
- `stepUpSIPCalculatorSchema` - Step-up SIP
- `swpCalculatorSchema` - Systematic Withdrawal Plan
- `goalBasedMFCalculatorSchema` - Goal-based MF
- `mutualFundReturnsCalculatorSchema` - MF Returns

### General Calculators
- `salaryCalculatorSchema` - Salary calculator
- `percentageCalculatorSchema` - Percentage calculator
- `ageCalculatorSchema` - Age calculator

### Common Schemas
- `loanPrincipalSchema` - Loan amount (₹10K - ₹10Cr)
- `interestRateSchema` - Interest rate (0.1% - 30%)
- `investmentAmountSchema` - Investment amount (₹1K - ₹10Cr)
- `monthlyInvestmentSchema` - Monthly investment (₹500 - ₹10L)
- `monthYearSchema` - Month/Year date picker

## Validation Rules

All schemas include:
- **Min/Max bounds** - Realistic limits for each field
- **Type checking** - Ensures correct data types
- **Custom error messages** - User-friendly error messages
- **Refinements** - Cross-field validation (e.g., retirement age > current age)

## Benefits

1. **Type Safety** - TypeScript types generated from schemas
2. **Consistent Validation** - Same rules across all calculators
3. **User-Friendly Errors** - Clear, actionable error messages
4. **Runtime Safety** - Validates data at runtime, not just compile time
5. **Maintainability** - Centralized validation logic

## Migration Guide

To add validation to an existing calculator:

1. Import the appropriate schema
2. Use `useValidation` hook or `ValidatedInput` component
3. Display validation errors to users
4. Only proceed with calculations when validation passes

Example:
```tsx
// Before
<Input
  value={principal}
  onChange={(e) => setPrincipal(Number(e.target.value))}
/>

// After
<ValidatedInput
  type="number"
  schema={loanPrincipalSchema}
  value={principal}
  onValueChange={setPrincipal}
  validateOnBlur={true}
/>
```

