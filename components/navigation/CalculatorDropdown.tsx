"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Calculator, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorGroup {
  title: string;
  icon: React.ReactNode;
  calculators: {
    name: string;
    href: string;
    description?: string;
  }[];
}

const calculatorGroups: CalculatorGroup[] = [
  {
    title: "Loan Calculators",
    icon: <Calculator className="h-4 w-4" />,
    calculators: [
      {
        name: "Home Loan Calculator",
        href: "/calculators/loans/emi-calculator",
        description: "Calculate monthly EMI for home loans",
      },
      {
        name: "Advanced Home Loan Calculator",
        href: "/calculators/loans/emi-calculator-advanced",
        description: "Home loan with part payments & prepayment",
      },
      {
        name: "Personal Loan Calculator",
        href: "/calculators/loans/personal-loan",
        description: "Calculate monthly EMI for personal loans",
      },
      {
        name: "Car Loan Calculator",
        href: "/calculators/loans/car-loan",
        description: "Calculate monthly EMI for car loans",
      },
      {
        name: "Credit Card EMI Calculator",
        href: "/calculators/loans/credit-card-emi",
        description: "Calculate EMI for credit card outstanding",
      },
      {
        name: "Loan Eligibility Calculator",
        href: "/calculators/loans/loan-eligibility",
        description: "Check your loan eligibility",
      },
    ],
  },
  {
    title: "Investment Calculators",
    icon: <TrendingUp className="h-4 w-4" />,
    calculators: [
      {
        name: "SIP Calculator",
        href: "/calculators/investments/sip-calculator",
        description: "Systematic Investment Plan",
      },
      {
        name: "Step-up SIP Calculator",
        href: "/calculators/investments/step-up-sip-calculator",
        description: "SIP with annual increases",
      },
      {
        name: "Lumpsum Calculator",
        href: "/calculators/investments/lumpsum-calculator",
        description: "One-time investment returns",
      },
      {
        name: "SWP Calculator",
        href: "/calculators/investments/swp-calculator",
        description: "Systematic Withdrawal Plan",
      },
      {
        name: "RD Calculator",
        href: "/calculators/investments/rd-calculator",
        description: "Recurring Deposit",
      },
      {
        name: "FD Calculator",
        href: "/calculators/investments/fd-calculator",
        description: "Fixed Deposit",
      },
      {
        name: "Goal-Based MF Calculator",
        href: "/calculators/investments/goal-based-mf-calculator",
        description: "Plan for financial goals",
      },
    ],
  },
];

export function CalculatorDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Calculators
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[600px] rounded-lg border border-border bg-surface shadow-lg z-50 p-4">
          <div className="grid grid-cols-2 gap-6">
            {calculatorGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
                  {group.icon}
                  {group.title}
                </div>
                <ul className="space-y-2">
                  {group.calculators.map((calc) => (
                    <li key={calc.name}>
                      <Link
                        href={calc.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        <div className="font-medium">{calc.name}</div>
                        {calc.description && (
                          <div className="text-xs text-text-secondary mt-0.5">
                            {calc.description}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/calculators"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              View All Calculators →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

