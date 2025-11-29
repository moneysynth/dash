"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { TenureInput } from "@/components/ui/TenureInput";
import { calculateEMI } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ArrowRight } from "lucide-react";

export function QuickEMICalculator() {
  const { formatCurrency } = useCurrency();
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = useMemo(() => {
    return calculateEMI(principal, rate, tenure);
  }, [principal, rate, tenure]);

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Quick EMI Calculator
          </h3>
          <p className="text-sm text-text-secondary">
            Calculate your monthly loan payment instantly
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <Slider
              label="Loan Amount"
              value={principal}
              min={100000}
              max={50000000}
              step={50000}
              valueLabel={formatCurrency(principal)}
              onValueChange={setPrincipal}
            />
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-2"
              min={100000}
              max={50000000}
            />
          </div>

          <div>
            <Slider
              label="Interest Rate (per annum)"
              value={rate}
              min={5}
              max={20}
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
              max={20}
              step={0.1}
            />
          </div>

          <div>
            <TenureInput
              label="Loan Tenure"
              value={tenure}
              min={1}
              max={30}
              step={1}
              onChange={setTenure}
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-primary/10 p-6 text-center border border-primary/20">
          <p className="text-sm text-text-secondary mb-2">Monthly EMI</p>
          <p className="text-4xl font-bold text-primary">
            {formatCurrency(emi)}
          </p>
        </div>

        <Link
          href="/calculators/emi-calculator"
          className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          View Detailed Calculation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
