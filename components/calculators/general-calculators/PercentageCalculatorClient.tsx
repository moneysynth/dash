"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { Slider } from "@/components/ui/Slider";
import { z } from "zod";
import { validateSchema } from "@/lib/validation/utils";
import { percentageCalculatorSchema } from "@/lib/validation/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useCurrency } from "@/contexts/CurrencyContext";

type CalculationType = "basic" | "change" | "percentageOf";

interface PercentageResult {
  result: number;
  formattedResult: string;
  explanation: string;
}

export function PercentageCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [calculationType, setCalculationType] = useState<CalculationType>("basic");

  // Basic percentage calculation
  const [value, setValue] = useState(1000);
  const [percentage, setPercentage] = useState(10);

  // Increase/Decrease calculation (combined)
  const [originalValue, setOriginalValue] = useState(1000);
  const [newValue, setNewValue] = useState(1100);

  // Percentage of calculation
  const [partValue, setPartValue] = useState(250);
  const [wholeValue, setWholeValue] = useState(1000);

  const basicResult = useMemo((): PercentageResult => {
    // Validate inputs before calculation
    const validation = validateSchema(percentageCalculatorSchema, {
      value,
      percentage,
      calculationType: "basic",
    });

    if (!validation.success) {
      return {
        result: 0,
        formattedResult: formatCurrency(0),
        explanation: "Please enter valid values",
      };
    }

    const result = (value * percentage) / 100;
    return {
      result,
      formattedResult: formatCurrency(result),
      explanation: `${percentage}% of ${formatCurrency(value)} = ${formatCurrency(result)}`,
    };
  }, [value, percentage, formatCurrency]);

  const changeResult = useMemo((): PercentageResult => {
    if (originalValue === 0) {
      return {
        result: 0,
        formattedResult: "0%",
        explanation: "Original value cannot be zero",
      };
    }
    const change = newValue - originalValue;
    const percentChange = (change / originalValue) * 100;
    const isIncrease = percentChange >= 0;
    return {
      result: percentChange,
      formattedResult: `${isIncrease ? "+" : ""}${percentChange.toFixed(2)}%`,
      explanation: `From ${formatCurrency(originalValue)} to ${formatCurrency(newValue)} is a ${isIncrease ? "increase" : "decrease"} of ${Math.abs(percentChange).toFixed(2)}%`,
    };
  }, [originalValue, newValue, formatCurrency]);

  const percentageOfResult = useMemo((): PercentageResult => {
    if (wholeValue === 0) {
      return {
        result: 0,
        formattedResult: "0%",
        explanation: "Whole value cannot be zero",
      };
    }
    const result = (partValue / wholeValue) * 100;
    return {
      result,
      formattedResult: `${result.toFixed(2)}%`,
      explanation: `${formatCurrency(partValue)} is ${result.toFixed(2)}% of ${formatCurrency(wholeValue)}`,
    };
  }, [partValue, wholeValue, formatCurrency]);

  const getCurrentResult = (): PercentageResult => {
    switch (calculationType) {
      case "basic":
        return basicResult;
      case "change":
        return changeResult;
      case "percentageOf":
        return percentageOfResult;
    }
  };

  const currentResult = getCurrentResult();

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Calculator</CardTitle>
              <CardDescription>
                Calculate percentages, percentage increase, decrease, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as CalculationType)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="change">Change</TabsTrigger>
                  <TabsTrigger value="percentageOf">% Of</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6 mt-6">
                  <div>
                    <Slider
                      label="Value"
                      value={value}
                      min={0}
                      max={10000000}
                      step={1000}
                      valueLabel={formatCurrency(value)}
                      onValueChange={setValue}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0, "Value cannot be negative").max(1000000000, "Value cannot exceed 100 Crore")}
                      value={value}
                      onValueChange={(val) => setValue(Number(val))}
                      className="mt-2"
                      min={0}
                      max={10000000}
                      validateOnBlur={true}
                    />
                  </div>

                  <div>
                    <Slider
                      label="Percentage"
                      value={percentage}
                      min={0}
                      max={100}
                      step={0.1}
                      valueLabel={`${percentage}%`}
                      onValueChange={setPercentage}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0, "Percentage cannot be negative").max(1000, "Percentage cannot exceed 1000%")}
                      value={percentage}
                      onValueChange={(val) => setPercentage(Number(val))}
                      className="mt-2"
                      min={0}
                      max={100}
                      step={0.1}
                      validateOnBlur={true}
                    />
                  </div>
                  
                  <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm text-text-secondary">
                      <strong className="text-text-primary">Input Explanation:</strong> Enter the base <strong>Value</strong> and the <strong>Percentage</strong> you want to calculate. The result shows what that percentage of the value equals.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="change" className="space-y-6 mt-6">
                  <div>
                    <Slider
                      label="Original Value"
                      value={originalValue}
                      min={0}
                      max={10000000}
                      step={1000}
                      valueLabel={formatCurrency(originalValue)}
                      onValueChange={setOriginalValue}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0, "Original value cannot be negative").max(1000000000, "Original value cannot exceed 100 Crore")}
                      value={originalValue}
                      onValueChange={(val) => setOriginalValue(Number(val))}
                      className="mt-2"
                      min={0}
                      max={10000000}
                      validateOnBlur={true}
                    />
                  </div>

                  <div>
                    <Slider
                      label="New Value"
                      value={newValue}
                      min={0}
                      max={10000000}
                      step={1000}
                      valueLabel={formatCurrency(newValue)}
                      onValueChange={setNewValue}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0, "New value cannot be negative").max(1000000000, "New value cannot exceed 100 Crore")}
                      value={newValue}
                      onValueChange={(val) => setNewValue(Number(val))}
                      className="mt-2"
                      min={0}
                      max={10000000}
                      validateOnBlur={true}
                    />
                  </div>
                  
                  <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm text-text-secondary">
                      <strong className="text-text-primary">Input Explanation:</strong> Enter the <strong>Original Value</strong> (starting amount) and the <strong>New Value</strong> (ending amount). The calculator will automatically determine if it's an increase or decrease and show the percentage change.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="percentageOf" className="space-y-6 mt-6">
                  <div>
                    <Slider
                      label="Part Value"
                      value={partValue}
                      min={0}
                      max={10000000}
                      step={1000}
                      valueLabel={formatCurrency(partValue)}
                      onValueChange={setPartValue}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0, "Part value cannot be negative").max(1000000000, "Part value cannot exceed 100 Crore")}
                      value={partValue}
                      onValueChange={(val) => setPartValue(Number(val))}
                      className="mt-2"
                      min={0}
                      max={10000000}
                      validateOnBlur={true}
                    />
                  </div>

                  <div>
                    <Slider
                      label="Whole Value"
                      value={wholeValue}
                      min={0}
                      max={10000000}
                      step={1000}
                      valueLabel={formatCurrency(wholeValue)}
                      onValueChange={setWholeValue}
                    />
                    <ValidatedInput
                      type="number"
                      schema={z.number().min(0.01, "Whole value must be greater than 0").max(1000000000, "Whole value cannot exceed 100 Crore")}
                      value={wholeValue}
                      onValueChange={(val) => setWholeValue(Number(val))}
                      className="mt-2"
                      min={0}
                      max={10000000}
                      validateOnBlur={true}
                    />
                  </div>
                  
                  <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm text-text-secondary">
                      <strong className="text-text-primary">Input Explanation:</strong> Enter the <strong>Part Value</strong> (the portion you want to find the percentage of) and the <strong>Whole Value</strong> (the total amount). The result shows what percentage the part represents of the whole.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {currentResult.formattedResult}
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                  {calculationType === "basic" && "Percentage Value"}
                  {calculationType === "change" && "Percentage Change"}
                  {calculationType === "percentageOf" && "Percentage"}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <div className="mb-2 text-sm font-medium text-text-primary">
                  Explanation
                </div>
                <div className="text-sm text-text-secondary">
                  {currentResult.explanation}
                </div>
              </div>

              {calculationType === "basic" && (
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="mb-2 text-sm font-medium text-text-primary">
                    Formula
                  </div>
                  <div className="text-xs text-text-secondary">
                    Result = (Value × Percentage) ÷ 100
                  </div>
                </div>
              )}

              {calculationType === "change" && (
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="mb-2 text-sm font-medium text-text-primary">
                    Formula
                  </div>
                  <div className="text-xs text-text-secondary">
                    % Change = ((New Value - Original Value) ÷ Original Value) × 100
                  </div>
                </div>
              )}

              {calculationType === "percentageOf" && (
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="mb-2 text-sm font-medium text-text-primary">
                    Formula
                  </div>
                  <div className="text-xs text-text-secondary">
                    Percentage = (Part Value ÷ Whole Value) × 100
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

