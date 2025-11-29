"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { GoalTimeline } from "@/components/calculators/common/GoalTimeline";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/calculators/common/ChartSkeleton";
import { 
  GraduationCap, 
  UserCircle, 
  Home, 
  Heart, 
  Plane, 
  Shield,
  Briefcase,
  Target 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamically import chart components to reduce initial bundle size
const InvestmentChart = dynamic(
  () => import("@/components/calculators/common/InvestmentChart").then((mod) => ({ default: mod.InvestmentChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);
// import { AdUnit } from "@/components/common/AdUnit";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { ChartData } from "@/types";

const goalTypes = [
  { 
    id: "Child Education", 
    label: "Child Education", 
    icon: GraduationCap,
    description: "Plan for your child's education expenses"
  },
  { 
    id: "Retirement", 
    label: "Retirement", 
    icon: UserCircle,
    description: "Build your retirement corpus"
  },
  { 
    id: "House Purchase", 
    label: "House Purchase", 
    icon: Home,
    description: "Save for your dream home"
  },
  { 
    id: "Marriage", 
    label: "Marriage", 
    icon: Heart,
    description: "Plan for wedding expenses"
  },
  { 
    id: "Vacation", 
    label: "Vacation", 
    icon: Plane,
    description: "Fund your travel dreams"
  },
  { 
    id: "Emergency Fund", 
    label: "Emergency Fund", 
    icon: Shield,
    description: "Build financial security"
  },
  { 
    id: "Business", 
    label: "Business", 
    icon: Briefcase,
    description: "Start or grow your business"
  },
  { 
    id: "Other", 
    label: "Other", 
    icon: Target,
    description: "Custom financial goal"
  },
];

export function GoalBasedMFCalculatorClient() {
  const { formatCurrency } = useCurrency();
  const [goalType, setGoalType] = useState("Child Education");
  
  const selectedGoal = goalTypes.find(g => g.id === goalType) || goalTypes[0];
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [timeline, setTimeline] = useState(15);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [strategy, setStrategy] = useState<"sip" | "lumpsum" | "mixed">("sip");
  const [currentSavings, setCurrentSavings] = useState(0);

  const results = useMemo(() => {
    const adjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, timeline);
    const monthlyRate = expectedReturns / 12 / 100;
    const numPayments = timeline * 12;
    let requiredSIP = 0;
    
    if (monthlyRate > 0) {
      const futureValueOfCurrent = currentSavings * Math.pow(1 + expectedReturns / 100, timeline);
      const remainingAmount = adjustedGoal - futureValueOfCurrent;
      if (remainingAmount > 0) {
        requiredSIP =
          remainingAmount /
          (((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) *
            (1 + monthlyRate));
      }
    } else {
      requiredSIP = (adjustedGoal - currentSavings) / numPayments;
    }
    
    const requiredLumpsum = adjustedGoal / Math.pow(1 + expectedReturns / 100, timeline);
    
    const progressChart: ChartData[] = [];
    let balance = currentSavings;
    
    for (let year = 0; year <= timeline; year++) {
      if (year === 0) {
        balance = currentSavings;
      } else {
        if (strategy === "sip" || strategy === "mixed") {
          for (let month = 0; month < 12; month++) {
            balance = balance * (1 + monthlyRate) + requiredSIP;
          }
        } else {
          balance = balance * (1 + expectedReturns / 100);
        }
      }
      progressChart.push({
        name: `Year ${year}`,
        value: balance,
      });
    }
    
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + timeline);

    return {
      adjustedGoal,
      requiredSIP: Math.max(0, requiredSIP),
      requiredLumpsum: Math.max(0, requiredLumpsum),
      progressChart,
      targetDate,
      currentValue: currentSavings,
    };
  }, [
    goalAmount,
    timeline,
    inflationRate,
    expectedReturns,
    strategy,
    currentSavings,
  ]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Details</CardTitle>
              <CardDescription>
                Define your financial goal and investment strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-text-primary">
                  Goal Type
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {goalTypes.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = goalType === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setGoalType(goal.id)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all",
                          "hover:border-primary/50 hover:bg-primary/5",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-surface"
                        )}
                        title={goal.description}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6 transition-colors",
                            isSelected ? "text-primary" : "text-text-secondary"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-medium text-center leading-tight",
                            isSelected ? "text-primary" : "text-text-primary"
                          )}
                        >
                          {goal.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Slider
                  label="Goal Amount (Today's Value)"
                  value={goalAmount}
                  min={100000}
                  max={50000000}
                  step={100000}
                  valueLabel={formatCurrency(goalAmount)}
                  onValueChange={setGoalAmount}
                />
                <Input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="mt-2"
                  min={100000}
                  max={50000000}
                  step={100000}
                />
              </div>

              <div>
                <Slider
                  label="Timeline (years)"
                  value={timeline}
                  min={1}
                  max={40}
                  step={1}
                  valueLabel={`${timeline} years`}
                  onValueChange={setTimeline}
                />
                <Input
                  type="number"
                  value={timeline}
                  onChange={(e) => setTimeline(Number(e.target.value))}
                  className="mt-2"
                  min={1}
                  max={40}
                />
              </div>

              <div>
                <Slider
                  label="Inflation Rate"
                  value={inflationRate}
                  min={3}
                  max={10}
                  step={0.5}
                  valueLabel={`${inflationRate}%`}
                  onValueChange={setInflationRate}
                />
                <Input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-2"
                  min={3}
                  max={10}
                  step={0.5}
                />
              </div>

              <div>
                <Slider
                  label="Expected Annual Returns"
                  value={expectedReturns}
                  min={8}
                  max={18}
                  step={0.5}
                  valueLabel={`${expectedReturns}%`}
                  onValueChange={setExpectedReturns}
                />
                <Input
                  type="number"
                  value={expectedReturns}
                  onChange={(e) => setExpectedReturns(Number(e.target.value))}
                  className="mt-2"
                  min={8}
                  max={18}
                  step={0.5}
                />
              </div>

              <div>
                <Slider
                  label="Current Savings"
                  value={currentSavings}
                  min={0}
                  max={10000000}
                  step={10000}
                  valueLabel={formatCurrency(currentSavings)}
                  onValueChange={setCurrentSavings}
                />
                <Input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="mt-2"
                  min={0}
                  max={10000000}
                  step={10000}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Investment Strategy
                </label>
                <div className="flex rounded-lg border border-border p-1">
                  <button
                    onClick={() => setStrategy("sip")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      strategy === "sip"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    SIP Only
                  </button>
                  <button
                    onClick={() => setStrategy("lumpsum")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      strategy === "lumpsum"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Lumpsum Only
                  </button>
                  <button
                    onClick={() => setStrategy("mixed")}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      strategy === "mixed"
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Mixed
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <GoalTimeline
            goalAmount={results.adjustedGoal}
            currentValue={results.currentValue}
            targetDate={results.targetDate}
            monthlySIP={results.requiredSIP}
          />

          <InvestmentChart
            data={results.progressChart}
            title="Projected Growth Over Time"
            type="area"
            startDate={new Date()}
          />

          {/* <AdUnit size="300x250" className="mx-auto" /> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Summary</CardTitle>
              <CardDescription>Your goal calculation results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-accent/10 p-4 text-center border border-accent/20">
                <p className="text-sm text-text-secondary mb-1">
                  Inflation-Adjusted Goal
                </p>
                <p className="text-3xl font-bold text-accent">
                  {formatCurrency(results.adjustedGoal)}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Current Goal Amount
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(goalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    Current Savings
                  </span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(currentSavings)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Investment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(strategy === "sip" || strategy === "mixed") && (
                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <p className="text-xs text-text-secondary mb-1">
                    Monthly SIP Required
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(results.requiredSIP)}
                  </p>
                </div>
              )}
              {(strategy === "lumpsum" || strategy === "mixed") && (
                <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/20">
                  <p className="text-xs text-text-secondary mb-1">
                    Lumpsum Required
                  </p>
                  <p className="text-2xl font-bold text-secondary">
                    {formatCurrency(results.requiredLumpsum)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Goal Type</span>
                <span className="font-semibold text-text-primary">
                  {goalType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Timeline</span>
                <span className="font-semibold text-text-primary">
                  {timeline} years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Expected Returns
                </span>
                <span className="font-semibold text-text-primary">
                  {expectedReturns}% p.a.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Inflation Rate</span>
                <span className="font-semibold text-text-primary">
                  {inflationRate}% p.a.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

