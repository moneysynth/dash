"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calculator, TrendingUp, Home, Car, CreditCard, DollarSign, PiggyBank, Target, Percent, User } from "lucide-react";

interface CalculatorLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

interface PopularCalculatorsProps {
  currentPath: string;
  sticky?: boolean;
}

const allCalculators: CalculatorLink[] = [
  // Loan Calculators
  { name: "EMI Calculator", href: "/calculators/emi-calculator", icon: Calculator, category: "Loan" },
  { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator", icon: Home, category: "Loan" },
  { name: "Personal Loan", href: "/calculators/personal-loan-emi-calculator", icon: DollarSign, category: "Loan" },
  { name: "Car Loan", href: "/calculators/car-loan-emi-calculator", icon: Car, category: "Loan" },
  { name: "Credit Card EMI", href: "/calculators/credit-card-emi-calculator", icon: CreditCard, category: "Loan" },
  { name: "Loan Eligibility", href: "/calculators/loan-eligibility-calculator", icon: User, category: "Loan" },
  
  // Investment Calculators
  { name: "SIP Calculator", href: "/calculators/sip-calculator", icon: TrendingUp, category: "Investment" },
  { name: "Step-up SIP", href: "/calculators/step-up-sip-calculator", icon: TrendingUp, category: "Investment" },
  { name: "SWP Calculator", href: "/calculators/swp-calculator", icon: TrendingUp, category: "Investment" },
  { name: "FD Calculator", href: "/calculators/fd-calculator", icon: PiggyBank, category: "Investment" },
  { name: "RD Calculator", href: "/calculators/rd-calculator", icon: PiggyBank, category: "Investment" },
  { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator", icon: TrendingUp, category: "Investment" },
  { name: "Goal-based MF", href: "/calculators/goal-based-mf-calculator", icon: Target, category: "Investment" },
  { name: "MF Returns", href: "/calculators/mutual-fund-returns-calculator", icon: TrendingUp, category: "Investment" },
  
  // General Calculators
  { name: "Salary Calculator", href: "/calculators/salary-calculator", icon: DollarSign, category: "General" },
  { name: "Age Calculator", href: "/calculators/age-calculator", icon: User, category: "General" },
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", icon: Percent, category: "General" },
];

export function PopularCalculators({ currentPath, sticky = true }: PopularCalculatorsProps) {
  // Filter out current calculator and get top 8 popular ones
  const popularCalculators = allCalculators
    .filter((calc) => calc.href !== currentPath)
    .slice(0, 8);

  return (
    <Card className={`${sticky ? "sticky top-24" : ""} hidden lg:block w-full`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Popular Calculators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {popularCalculators.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:bg-accent hover:border-primary/50"
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground">{calculator.name}</span>
            </Link>
          );
        })}
        <Link
          href="/calculators"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 p-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Calculator className="h-4 w-4" />
          View All Calculators
        </Link>
      </CardContent>
    </Card>
  );
}

