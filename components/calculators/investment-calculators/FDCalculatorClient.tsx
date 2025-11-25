"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
// import { AdUnit } from "@/components/common/AdUnit";
import { calculateFD, formatCurrency } from "@/lib/utils";

export function FDCalculatorClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [tenure, setTenure] = useState(5);
  const [compounding, setCompounding] = useState(4); // quarterly
  const [payoutOption, setPayoutOption] = useState<"monthly" | "quarterly" | "cumulative">("cumulative");
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  const results = useMemo(() => {
    const effectiveRate = isSeniorCitizen ? rate + 0.5 : rate;
    const maturityAmount = calculateFD(principal, effectiveRate, tenure, compounding);
    const interestEarned = maturityAmount - principal;
    const tds = interestEarned > 40000 ? interestEarned * 0.1 : 0;
    
    let monthlyPayout = 0;
    let quarterlyPayout = 0;
    
    if (payoutOption === "monthly") {
      monthlyPayout = (principal * effectiveRate / 100) / 12;
    } else if (payoutOption === "quarterly") {
      quarterlyPayout = (principal * effectiveRate / 100) / 4;
    }

    return {
      maturityAmount,
      interestEarned,
      tds,
      monthlyPayout,
      quarterlyPayout,
      effectiveRate,
    };
  }, [principal, rate, tenure, compounding, payoutOption, isSeniorCitizen]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FD Details</CardTitle>
              <CardDescription>
                Enter your Fixed Deposit information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Slider
                  label="Deposit Amount"
                  value={principal}
                  min={10000}
                  max={10000000}
                  step={10000}
                  valueLabel={formatCurrency(principal)}
                  onValueChange={setPrincipal}
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="mt-2"
                  min={10000}
                  max={10000000}
                  step={10000}
                />
              </div>

              <div>
                <Slider
                  label="Interest Rate (per annum)"
                  value={rate}
                  min={5}
                  max={9}
                  step={0.1}
                  valueLabel={`${rate}%`}
                  onValueChange={setRate}
                />
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-2"
                  min={5}
                  max={9}
                  step={0.1}
                />
              </div>

              <div>
                <Slider
                  label="Tenure (years)"
                  value={tenure}
                  min={1}
                  max={10}
                  step={1}
                  valueLabel={`${tenure} years`}
                  onValueChange={setTenure}
                />
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="mt-2"
                  min={1}
                  max={10}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Compounding Frequency
                </label>
                <div className="flex rounded-lg border border-border p-1">
                  <button
                    onClick={() => setCompounding(1)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      compounding === 1
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => setCompounding(2)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      compounding === 2
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Half-yearly
                  </button>
                  <button
                    onClick={() => setCompounding(4)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      compounding === 4
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Quarterly
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Payout Option
                </label>
                <div className="flex rounded-lg border border-border p-1">
                  <button
                    onClick={() => setPayoutOption("cumulative")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      payoutOption === "cumulative"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Cumulative
                  </button>
                  <button
                    onClick={() => setPayoutOption("quarterly")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      payoutOption === "quarterly"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Quarterly
                  </button>
                  <button
                    onClick={() => setPayoutOption("monthly")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      payoutOption === "monthly"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="seniorCitizen"
                  checked={isSeniorCitizen}
                  onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label
                  htmlFor="seniorCitizen"
                  className="text-sm font-medium text-text-primary"
                >
                  Senior Citizen (0.5% extra interest)
                </label>
              </div>
            </CardContent>
          </Card>

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FD Summary</CardTitle>
              <CardDescription>Your FD calculation results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-center border border-primary/20">
                <p className="text-sm text-text-secondary mb-1">
                  {payoutOption === "cumulative"
                    ? "Maturity Amount"
                    : "Principal Amount"}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(
                    payoutOption === "cumulative"
                      ? results.maturityAmount
                      : principal
                  )}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Deposit Amount
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(principal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Interest Earned
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(results.interestEarned)}
                  </span>
                </div>
                {payoutOption === "monthly" && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">
                      Monthly Payout
                    </span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(results.monthlyPayout)}
                    </span>
                  </div>
                )}
                {payoutOption === "quarterly" && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">
                      Quarterly Payout
                    </span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(results.quarterlyPayout)}
                    </span>
                  </div>
                )}
                {results.tds > 0 && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-text-secondary">TDS (10%)</span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(results.tds)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FD Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Interest Rate
                </span>
                <span className="font-semibold text-text-primary">
                  {results.effectiveRate}% p.a.
                  {isSeniorCitizen && (
                    <span className="text-xs text-secondary ml-1">
                      (Senior Citizen)
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tenure</span>
                <span className="font-semibold text-text-primary">
                  {tenure} years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Compounding
                </span>
                <span className="font-semibold text-text-primary">
                  {compounding === 1
                    ? "Annual"
                    : compounding === 2
                    ? "Half-yearly"
                    : "Quarterly"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Payout</span>
                <span className="font-semibold text-text-primary capitalize">
                  {payoutOption}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

