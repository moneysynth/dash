"use client";

import { useMemo, useState, useCallback, memo } from "react";
import { ChevronDown, FileX, FileChartColumnIncreasing, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { exportAmortizationToPDF } from "@/lib/export";
import { exportAmortizationToXLSX } from "@/lib/exportXLSX";
import type { AmortizationEntry } from "@/types";
import { cn } from "@/lib/utils";

interface AmortizationTableProps {
  schedule: AmortizationEntry[];
  loanDetails?: {
    principal: number;
    rate: number;
    tenure: number;
    emi: number;
  };
  showPrepayment?: boolean; // Show prepayment column (for Advanced Calculator)
}

interface YearData {
  calendarYear: number; // Actual calendar year (e.g., 2025)
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number;
  loanPaidPercent: number;
  months: AmortizationEntry[];
  startDate?: string; // First month date label (e.g., "Nov 2025")
  endDate?: string; // Last month date label
}

function AmortizationTableComponent({
  schedule,
  loanDetails,
  showPrepayment = false,
}: AmortizationTableProps) {
  const { formatCurrency, currency } = useCurrency();
  const [openYears, setOpenYears] = useState<Set<number>>(new Set());

  // Calculate original principal: first balance + first principal payment
  const originalPrincipal = loanDetails?.principal || 
    (schedule.length > 0 ? schedule[0].balance + schedule[0].principal : 0);

  const yearlyData = useMemo(() => {
    const yearsMap = new Map<number, YearData>();

    schedule.forEach((entry) => {
      // Extract calendar year from date or dateLabel
      let calendarYear: number;
      
      if (entry.date) {
        calendarYear = entry.date.getFullYear();
      } else if (entry.dateLabel) {
        // Extract year from dateLabel (e.g., "Nov 2025" -> 2025)
        const yearMatch = entry.dateLabel.match(/\d{4}/);
        calendarYear = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();
      } else {
        // Fallback to current year if no date info
        calendarYear = new Date().getFullYear();
      }

      // Get or create year data
      let yearData = yearsMap.get(calendarYear);
      if (!yearData) {
        yearData = {
          calendarYear,
          principal: 0,
          interest: 0,
          totalPayment: 0,
          balance: 0,
          loanPaidPercent: 0,
          months: [],
          startDate: undefined,
          endDate: undefined,
        };
        yearsMap.set(calendarYear, yearData);
      }

      // Set start date for the year (first month encountered)
      if (yearData.months.length === 0 && entry.dateLabel) {
        yearData.startDate = entry.dateLabel;
      }

      // Extract prepayment from principal if present
      // In AdvancedEMICalculatorClient, entry.principal includes prepayment
      // So we need to separate them: actual principal = entry.principal - prepayment
      const prepaymentAmount = entry.prepayment || 0;
      const actualPrincipal = entry.principal - prepaymentAmount;
      
      yearData.principal += actualPrincipal;
      yearData.interest += entry.interest;
      // Total Payment = Principal + Interest + Prepayment
      yearData.totalPayment += actualPrincipal + entry.interest + prepaymentAmount;
      yearData.balance = entry.balance;
      yearData.months.push(entry);

      // Always update end date (last month of the year)
      if (entry.dateLabel) {
        yearData.endDate = entry.dateLabel;
      }
    });

    // Convert map to array and sort by calendar year
    const years = Array.from(yearsMap.values()).sort((a, b) => a.calendarYear - b.calendarYear);

    // Calculate loan paid percent for each year
    years.forEach((yearData) => {
      yearData.loanPaidPercent =
        ((originalPrincipal - yearData.balance) / originalPrincipal) * 100;
    });

    return years;
  }, [schedule, originalPrincipal]);

  const toggleYear = useCallback((calendarYear: number) => {
    setOpenYears((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(calendarYear)) {
        newSet.delete(calendarYear);
      } else {
        newSet.add(calendarYear);
      }
      return newSet;
    });
  }, []);

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (!loanDetails || isExporting) return;
    
    try {
      setIsExporting(true);
      await exportAmortizationToXLSX(schedule, loanDetails, showPrepayment, currency);
    } catch (error) {
      console.error("Failed to export XLSX:", error);
      // You could add a toast notification here
    } finally {
      setIsExporting(false);
    }
  }, [schedule, loanDetails, showPrepayment, isExporting, currency]);

  const handlePDFExport = useCallback(async () => {
    if (!loanDetails || isExporting) return;
    
    try {
      setIsExporting(true);
      await exportAmortizationToPDF(
        schedule,
        loanDetails,
        "yearly",
        showPrepayment,
        currency
      );
    } catch (error) {
      console.error("Failed to export PDF:", error);
      // You could add a toast notification here
    } finally {
      setIsExporting(false);
    }
  }, [schedule, loanDetails, showPrepayment, isExporting]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">Amortization Schedule</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2 flex-1 sm:flex-initial"
              disabled={!loanDetails || isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileX className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{isExporting ? "Exporting..." : "XLSX"}</span>
              <span className="sm:hidden">{isExporting ? "Exporting..." : "Export XLSX"}</span>
            </Button>
            {loanDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePDFExport}
                className="gap-2 flex-1 sm:flex-initial"
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileChartColumnIncreasing className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{isExporting ? "Exporting..." : "PDF"}</span>
                <span className="sm:hidden">{isExporting ? "Exporting..." : "Export PDF"}</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Desktop Header - Hidden on mobile */}
          <div className={cn(
            "hidden md:grid gap-4 px-4 py-2 text-sm font-semibold text-text-primary border-b border-border bg-surface/70 dark:bg-surface/50",
            showPrepayment ? "grid-cols-7" : "grid-cols-6"
          )}>
            <div>Year</div>
            <div className="text-right">Principal</div>
            <div className="text-right">Interest</div>
            {showPrepayment && <div className="text-right">Prepayment</div>}
            <div className="text-right">Total Payment</div>
            <div className="text-right">Balance</div>
            <div className="text-right">Loan Paid %</div>
          </div>

          {/* Year-wise Accordion */}
          {yearlyData.map((yearData, yearIndex) => {
            const isOpen = openYears.has(yearData.calendarYear);
            const isEvenYear = yearIndex % 2 === 0;
            return (
              <div
                key={yearData.calendarYear}
                className={cn(
                  "border border-border rounded-lg overflow-hidden",
                  isEvenYear 
                    ? "bg-surface" 
                    : "bg-surface/60 dark:bg-surface/80"
                )}
              >
                {/* Desktop View */}
                <button
                  onClick={() => toggleYear(yearData.calendarYear)}
                  className={cn(
                    "hidden md:grid w-full gap-4 px-4 py-3 text-left transition-colors items-center",
                    showPrepayment ? "grid-cols-7" : "grid-cols-6",
                    isEvenYear 
                      ? "bg-surface hover:bg-surface/80" 
                      : "bg-surface/60 hover:bg-surface/40 dark:bg-surface/80 dark:hover:bg-surface/60"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">
                        {yearData.calendarYear}
                      </span>
                      {yearData.startDate && yearData.endDate && (
                        <span className="text-xs text-text-secondary">
                          {yearData.startDate} - {yearData.endDate}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-text-secondary transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                  <div className="text-right text-text-primary">
                    {formatCurrency(yearData.principal)}
                  </div>
                  <div className="text-right text-text-secondary">
                    {formatCurrency(yearData.interest)}
                  </div>
                  {showPrepayment && (
                    <div className="text-right text-text-secondary">
                      {formatCurrency(
                        yearData.months.reduce((sum, m) => sum + (m.prepayment || 0), 0)
                      )}
                    </div>
                  )}
                  <div className="text-right text-text-primary font-medium">
                    {formatCurrency(yearData.totalPayment)}
                  </div>
                  <div className="text-right text-text-secondary font-medium">
                    {formatCurrency(yearData.balance)}
                  </div>
                  <div className="text-right text-primary font-semibold">
                    {yearData.loanPaidPercent.toFixed(2)}%
                  </div>
                </button>

                {/* Mobile View */}
                <button
                  onClick={() => toggleYear(yearData.calendarYear)}
                  className={cn(
                    "md:hidden w-full px-4 py-3 text-left transition-colors",
                    isEvenYear 
                      ? "bg-surface hover:bg-surface/80" 
                      : "bg-surface/60 hover:bg-surface/40 dark:bg-surface/80 dark:hover:bg-surface/60"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-primary text-base">
                        {yearData.calendarYear}
                      </span>
                      {yearData.startDate && yearData.endDate && (
                        <span className="text-xs text-text-secondary mt-0.5">
                          {yearData.startDate} - {yearData.endDate}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-text-secondary transition-transform flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Principal</div>
                      <div className="font-medium text-text-primary">
                        {formatCurrency(yearData.principal)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Interest</div>
                      <div className="font-medium text-text-secondary">
                        {formatCurrency(yearData.interest)}
                      </div>
                    </div>
                    {showPrepayment && (
                      <div>
                        <div className="text-xs text-text-secondary mb-0.5">Prepayment</div>
                        <div className="font-medium text-text-secondary">
                          {formatCurrency(
                            yearData.months.reduce((sum, m) => sum + (m.prepayment || 0), 0)
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Total Payment</div>
                      <div className="font-semibold text-text-primary">
                        {formatCurrency(yearData.totalPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Balance</div>
                      <div className="font-medium text-text-secondary">
                        {formatCurrency(yearData.balance)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Loan Paid</div>
                      <div className="font-bold text-primary text-lg">
                        {yearData.loanPaidPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className={cn(
                    "border-t border-border",
                    isEvenYear 
                      ? "bg-surface/40 dark:bg-surface/60" 
                      : "bg-surface/20 dark:bg-surface/40"
                  )}>
                    <div className="px-4 py-3">
                      <div className="mb-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                        Monthly Details
                      </div>
                      
                      {/* Desktop Monthly Table */}
                      <div className="hidden md:block space-y-1">
                        <div className={cn(
                          "grid gap-4 px-2 py-2 text-xs font-semibold text-text-secondary border-b border-border bg-surface/50 dark:bg-surface/70",
                          showPrepayment ? "grid-cols-7" : "grid-cols-6"
                        )}>
                          <div>Month</div>
                          <div className="text-right">Principal</div>
                          <div className="text-right">Interest</div>
                          {showPrepayment && <div className="text-right">Prepayment</div>}
                          <div className="text-right">Total Payment</div>
                          <div className="text-right">Balance</div>
                          <div className="text-right">Loan Paid %</div>
                        </div>
                        {yearData.months.map((month, monthIndex) => {
                          const monthPaidPercent =
                            ((originalPrincipal - month.balance) /
                              originalPrincipal) *
                            100;
                          const isEvenMonth = monthIndex % 2 === 0;
                          return (
                            <div
                              key={month.period}
                              className={cn(
                                "grid gap-4 px-2 py-2 text-sm transition-colors",
                                showPrepayment ? "grid-cols-7" : "grid-cols-6",
                                isEvenMonth 
                                  ? "bg-surface/30 hover:bg-surface/50 dark:bg-surface/50 dark:hover:bg-surface/70" 
                                  : "bg-surface/50 hover:bg-surface/70 dark:bg-surface/70 dark:hover:bg-surface/90"
                              )}
                            >
                              <div className="text-text-primary">
                                <div className="font-medium">
                                  {month.dateLabel || `Month ${month.period}`}
                                </div>
                              </div>
                              {(() => {
                                const prepaymentAmount = month.prepayment || 0;
                                const actualPrincipal = month.principal - prepaymentAmount;
                                const totalPayment = actualPrincipal + month.interest + prepaymentAmount;
                                return (
                                  <>
                                    <div className="text-right text-text-primary">
                                      {formatCurrency(actualPrincipal)}
                                    </div>
                                    <div className="text-right text-text-secondary">
                                      {formatCurrency(month.interest)}
                                    </div>
                                    {showPrepayment && (
                                      <div className="text-right text-text-secondary">
                                        {formatCurrency(prepaymentAmount)}
                                      </div>
                                    )}
                                    <div className="text-right text-text-primary">
                                      {formatCurrency(totalPayment)}
                                    </div>
                                  </>
                                );
                              })()}
                              <div className="text-right text-text-secondary font-medium">
                                {formatCurrency(month.balance)}
                              </div>
                              <div className="text-right text-primary">
                                {monthPaidPercent.toFixed(2)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Mobile Monthly Cards */}
                      <div className="md:hidden space-y-2">
                        {yearData.months.map((month, monthIndex) => {
                          const monthPaidPercent =
                            ((originalPrincipal - month.balance) /
                              originalPrincipal) *
                            100;
                          const isEvenMonth = monthIndex % 2 === 0;
                          return (
                            <div
                              key={month.period}
                              className={cn(
                                "rounded-lg p-3 border border-border transition-colors",
                                isEvenMonth 
                                  ? "bg-surface/40 hover:bg-surface/60 dark:bg-surface/60 dark:hover:bg-surface/80" 
                                  : "bg-surface/60 hover:bg-surface/80 dark:bg-surface/80 dark:hover:bg-surface/90"
                              )}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-text-primary">
                                    {month.dateLabel || `Month ${month.period}`}
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-primary">
                                  {monthPaidPercent.toFixed(2)}%
                                </span>
                              </div>
                              <div className={cn(
                                "grid gap-2 text-xs",
                                showPrepayment ? "grid-cols-2" : "grid-cols-2"
                              )}>
                                {(() => {
                                  const prepaymentAmount = month.prepayment || 0;
                                  const actualPrincipal = month.principal - prepaymentAmount;
                                  const totalPayment = actualPrincipal + month.interest + prepaymentAmount;
                                  return (
                                    <>
                                      <div>
                                        <div className="text-text-secondary mb-0.5">Principal</div>
                                        <div className="font-medium text-text-primary">
                                          {formatCurrency(actualPrincipal)}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-text-secondary mb-0.5">Interest</div>
                                        <div className="font-medium text-text-secondary">
                                          {formatCurrency(month.interest)}
                                        </div>
                                      </div>
                                      {showPrepayment && (
                                        <div>
                                          <div className="text-text-secondary mb-0.5">Prepayment</div>
                                          <div className="font-medium text-text-secondary">
                                            {formatCurrency(prepaymentAmount)}
                                          </div>
                                        </div>
                                      )}
                                      <div>
                                        <div className="text-text-secondary mb-0.5">Total Payment</div>
                                        <div className="font-semibold text-text-primary">
                                          {formatCurrency(totalPayment)}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })()}
                                <div>
                                  <div className="text-text-secondary mb-0.5">Balance</div>
                                  <div className="font-medium text-text-secondary">
                                    {formatCurrency(month.balance)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export const AmortizationTable = memo(AmortizationTableComponent);
