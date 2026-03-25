"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { DatePicker } from "@/components/ui/DatePicker";
import { validateSchema } from "@/lib/validation/utils";
import { ageCalculatorSchema } from "@/lib/validation/schemas";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthday: {
    days: number;
    date: string;
  };
}

function parseIsoDateAsLocalDate(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

export function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [compareDate, setCompareDate] = useState<string>("");

  const results = useMemo((): AgeResult | null => {
    if (!birthDate) return null;

    const birth = parseIsoDateAsLocalDate(birthDate);
    const compare = compareDate ? parseIsoDateAsLocalDate(compareDate) : new Date();

    if (!birth || !compare || isNaN(birth.getTime()) || isNaN(compare.getTime())) return null;
    
    // Validate inputs before calculation
    const validation = validateSchema(ageCalculatorSchema, {
      birthDate: birth,
      compareDate: compare,
    });

    if (!validation.success || birth > compare) return null;

    // Calculate age
    let years = compare.getFullYear() - birth.getFullYear();
    let months = compare.getMonth() - birth.getMonth();
    let days = compare.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(compare.getFullYear(), compare.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days and months
    const diffTime = compare.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;

    // Calculate next birthday
    const nextBirthday = new Date(
      compare.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (nextBirthday < compare) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - compare.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      years,
      months,
      days,
      totalDays,
      totalMonths,
      nextBirthday: {
        days: daysUntilBirthday,
        date: nextBirthday.toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };
  }, [birthDate, compareDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Age Calculator</CardTitle>
              <CardDescription>
                Calculate your exact age or age between two dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <DatePicker
                    label="Birth Date"
                    value={birthDate}
                    onChange={setBirthDate}
                    max={today}
                  />
                  <p className="mt-2 text-xs text-text-secondary">
                    Select your date of birth to calculate your age
                  </p>
                </div>

                <div>
                  <DatePicker
                    label="Compare Date (Optional)"
                    value={compareDate}
                    onChange={setCompareDate}
                    min={birthDate || undefined}
                    max={today}
                  />
                  <p className="mt-2 text-xs text-text-secondary">
                    Leave empty to calculate age as of today, or select a different date
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Age Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results ? (
                <>
                  <div className="rounded-lg bg-primary/10 p-4 text-center">
                    <div className="text-3xl font-bold text-primary">
                      {results.years}
                    </div>
                    <div className="text-sm text-text-secondary">Years</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-surface p-3 text-center">
                      <div className="text-xl font-semibold text-text-primary">
                        {results.months}
                      </div>
                      <div className="text-xs text-text-secondary">Months</div>
                    </div>
                    <div className="rounded-lg bg-surface p-3 text-center">
                      <div className="text-xl font-semibold text-text-primary">
                        {results.days}
                      </div>
                      <div className="text-xs text-text-secondary">Days</div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Total Days:</span>
                      <span className="font-medium text-text-primary">
                        {results.totalDays.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Total Months:</span>
                      <span className="font-medium text-text-primary">
                        {results.totalMonths}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-surface p-4">
                    <div className="mb-2 text-sm font-medium text-text-primary">
                      Next Birthday
                    </div>
                    <div className="text-xs text-text-secondary">
                      {results.nextBirthday.days} days away
                    </div>
                    <div className="mt-1 text-sm text-text-primary">
                      {results.nextBirthday.date}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-sm text-text-secondary">
                  Enter your birth date to calculate your age
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

