"use client";

import { useState, useCallback, memo, useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { PartPayment } from "@/types";

interface PartPaymentFormProps {
  partPayments: PartPayment[];
  onPartPaymentsChange: (payments: PartPayment[]) => void;
  loanTenure: number; // in months
  startDate?: { month: number; year: number }; // Loan start date for month/year conversion
}

function PartPaymentFormComponent({
  partPayments,
  onPartPaymentsChange,
  loanTenure,
  startDate,
}: PartPaymentFormProps) {
  const { formatCurrency } = useCurrency();
  // Default to current month/year if startDate not provided
  const currentDate = new Date();
  const defaultStartDate = startDate || {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  // Default payment date is current month and year
  const defaultPaymentDate = useMemo(() => {
    return {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }, []);

  const [newPayment, setNewPayment] = useState({
    amount: 0,
    paymentDate: defaultPaymentDate,
    type: "one-time" as "one-time" | "recurring",
    frequency: 12,
  });

  // Convert month/year to month number relative to loan start
  const convertToMonthNumber = useCallback((month: number, year: number): number => {
    const startMonth = defaultStartDate.month;
    const startYear = defaultStartDate.year;
    
    return (year - startYear) * 12 + (month - startMonth) + 1;
  }, [defaultStartDate, loanTenure]);

  const selectedPaymentMonthNumber = useMemo(
    () => convertToMonthNumber(newPayment.paymentDate.month, newPayment.paymentDate.year),
    [newPayment.paymentDate, convertToMonthNumber]
  );
  const isPaymentDateWithinLoanRange =
    selectedPaymentMonthNumber >= 1 && selectedPaymentMonthNumber <= loanTenure;

  // Convert month number to month/year
  const convertToMonthYear = useCallback((monthNumber: number): { month: number; year: number } => {
    const paymentMonth = ((defaultStartDate.month - 1 + monthNumber - 1) % 12) + 1;
    const paymentYear = defaultStartDate.year + Math.floor((defaultStartDate.month - 1 + monthNumber - 1) / 12);
    return { month: paymentMonth, year: paymentYear };
  }, [defaultStartDate]);

  const addPartPayment = useCallback(() => {
    const monthNumber = convertToMonthNumber(newPayment.paymentDate.month, newPayment.paymentDate.year);
    if (newPayment.amount > 0 && monthNumber >= 1 && monthNumber <= loanTenure) {
      onPartPaymentsChange([
        ...partPayments,
        {
          amount: newPayment.amount,
          date: monthNumber,
          type: newPayment.type,
          frequency: newPayment.type === "recurring" ? newPayment.frequency : undefined,
        },
      ]);
      setNewPayment({
        amount: 0,
        paymentDate: defaultPaymentDate,
        type: "one-time",
        frequency: 12,
      });
    }
  }, [newPayment, loanTenure, partPayments, onPartPaymentsChange, convertToMonthNumber, defaultPaymentDate]);

  const removePartPayment = useCallback((index: number) => {
    onPartPaymentsChange(partPayments.filter((_, i) => i !== index));
  }, [partPayments, onPartPaymentsChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Part Payments</CardTitle>
        <CardDescription>
          Add one-time or recurring part payments to reduce your loan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Slider
              label="Payment Amount"
              value={newPayment.amount}
              min={10000}
              max={1000000}
              step={10000}
              valueLabel={formatCurrency(newPayment.amount)}
              onValueChange={(value) =>
                setNewPayment({ ...newPayment, amount: value })
              }
            />
            <Input
              type="number"
              value={newPayment.amount}
              onChange={(e) =>
                setNewPayment({
                  ...newPayment,
                  amount: Number(e.target.value),
                })
              }
              className="mt-2"
              min={10000}
              max={1000000}
              step={10000}
            />
          </div>

          <div>
            <MonthYearPicker
              label="Payment Date"
              value={newPayment.paymentDate}
              onChange={(value) =>
                setNewPayment({ ...newPayment, paymentDate: value })
              }
            />
          </div>

          <Tabs
            value={newPayment.type}
            onValueChange={(value) =>
              setNewPayment({ ...newPayment, type: value as "one-time" | "recurring" })
            }
          >
            <TabsList className="w-full">
              <TabsTrigger value="one-time" className="flex-1">
                One-time
              </TabsTrigger>
              <TabsTrigger value="recurring" className="flex-1">
                Recurring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="one-time" className="mt-4">
              <p className="text-xs text-text-secondary">
                A single payment made at the selected date
              </p>
            </TabsContent>

            <TabsContent value="recurring" className="mt-4">
              <div>
                <Slider
                  label="Frequency (months)"
                  value={newPayment.frequency}
                  min={1}
                  max={12}
                  step={1}
                  valueLabel={`Every ${newPayment.frequency} months`}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, frequency: value })
                  }
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Payment will repeat every {newPayment.frequency} months starting from the selected date
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={addPartPayment}
            variant="primary"
            className="w-full gap-2"
            disabled={newPayment.amount === 0 || !isPaymentDateWithinLoanRange}
          >
            <Plus className="h-4 w-4" />
            Add Part Payment
          </Button>
          {!isPaymentDateWithinLoanRange && (
            <p className="text-xs text-red-600">
              Payment date must fall within the selected loan tenure.
            </p>
          )}
        </div>

        {partPayments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-text-primary">
              Scheduled Part Payments
            </h4>
            <div className="space-y-2">
              {partPayments.map((payment, index) => {
                const paymentDate = convertToMonthYear(payment.date);
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
                const dateLabel = `${monthNames[paymentDate.month - 1]} ${paymentDate.year}`;
                
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">
                        {formatCurrency(payment.amount)}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {dateLabel} •{" "}
                        {payment.type === "one-time"
                          ? "One-time"
                          : `Every ${payment.frequency} months`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePartPayment(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const PartPaymentForm = memo(PartPaymentFormComponent);

