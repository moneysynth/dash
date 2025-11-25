"use client";

import { useState, useCallback, memo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { formatCurrency } from "@/lib/utils";
import type { PartPayment } from "@/types";

interface PartPaymentFormProps {
  partPayments: PartPayment[];
  onPartPaymentsChange: (payments: PartPayment[]) => void;
  loanTenure: number; // in months
}

function PartPaymentFormComponent({
  partPayments,
  onPartPaymentsChange,
  loanTenure,
}: PartPaymentFormProps) {
  const [newPayment, setNewPayment] = useState({
    amount: 0,
    date: 12,
    type: "one-time" as "one-time" | "recurring",
    frequency: 12,
  });

  const addPartPayment = useCallback(() => {
    if (newPayment.amount > 0 && newPayment.date <= loanTenure) {
      onPartPaymentsChange([
        ...partPayments,
        {
          amount: newPayment.amount,
          date: newPayment.date,
          type: newPayment.type,
          frequency: newPayment.type === "recurring" ? newPayment.frequency : undefined,
        },
      ]);
      setNewPayment({
        amount: 0,
        date: 12,
        type: "one-time",
        frequency: 12,
      });
    }
  }, [newPayment, loanTenure, partPayments, onPartPaymentsChange]);

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
            <Slider
              label="Payment Month"
              value={newPayment.date}
              min={1}
              max={loanTenure}
              step={1}
              valueLabel={`Month ${newPayment.date}`}
              onValueChange={(value) =>
                setNewPayment({ ...newPayment, date: value })
              }
            />
            <Input
              type="number"
              value={newPayment.date}
              onChange={(e) =>
                setNewPayment({
                  ...newPayment,
                  date: Number(e.target.value),
                })
              }
              className="mt-2"
              min={1}
              max={loanTenure}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-text-primary">
                Payment Type
              </label>
              <div className="flex rounded-lg border border-border p-1">
                <button
                  onClick={() =>
                    setNewPayment({ ...newPayment, type: "one-time" })
                  }
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                    newPayment.type === "one-time"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  One-time
                </button>
                <button
                  onClick={() =>
                    setNewPayment({ ...newPayment, type: "recurring" })
                  }
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                    newPayment.type === "recurring"
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Recurring
                </button>
              </div>
            </div>

            {newPayment.type === "recurring" && (
              <div className="flex-1">
                <Slider
                  label="Frequency (months)"
                  value={newPayment.frequency}
                  min={3}
                  max={12}
                  step={3}
                  valueLabel={`Every ${newPayment.frequency} months`}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, frequency: value })
                  }
                />
              </div>
            )}
          </div>

          <Button
            onClick={addPartPayment}
            variant="primary"
            className="w-full gap-2"
            disabled={newPayment.amount === 0}
          >
            <Plus className="h-4 w-4" />
            Add Part Payment
          </Button>
        </div>

        {partPayments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-text-primary">
              Scheduled Part Payments
            </h4>
            <div className="space-y-2">
              {partPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
                >
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">
                      {formatCurrency(payment.amount)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Month {payment.date} •{" "}
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
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const PartPaymentForm = memo(PartPaymentFormComponent);

