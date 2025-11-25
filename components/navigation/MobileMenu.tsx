"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Calculator, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const calculatorGroups = [
  {
    title: "Loan Calculators",
    icon: <Calculator className="h-4 w-4" />,
    calculators: [
      { name: "Home Loan Calculator", href: "/calculators/loans/emi-calculator" },
      {
        name: "Advanced Home Loan Calculator",
        href: "/calculators/loans/emi-calculator-advanced",
      },
      {
        name: "Personal Loan Calculator",
        href: "/calculators/loans/personal-loan",
      },
      {
        name: "Car Loan Calculator",
        href: "/calculators/loans/car-loan",
      },
      {
        name: "Credit Card EMI Calculator",
        href: "/calculators/loans/credit-card-emi",
      },
      {
        name: "Loan Eligibility Calculator",
        href: "/calculators/loans/loan-eligibility",
      },
    ],
  },
  {
    title: "Investment Calculators",
    icon: <TrendingUp className="h-4 w-4" />,
    calculators: [
      { name: "SIP Calculator", href: "/calculators/investments/sip-calculator" },
      {
        name: "Step-up SIP Calculator",
        href: "/calculators/investments/step-up-sip-calculator",
      },
      {
        name: "Lumpsum Calculator",
        href: "/calculators/investments/lumpsum-calculator",
      },
      { name: "SWP Calculator", href: "/calculators/investments/swp-calculator" },
      { name: "RD Calculator", href: "/calculators/investments/rd-calculator" },
      { name: "FD Calculator", href: "/calculators/investments/fd-calculator" },
      {
        name: "Goal-Based MF Calculator",
        href: "/calculators/investments/goal-based-mf-calculator",
      },
    ],
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-surface shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-semibold text-text-primary">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-surface transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-text-primary" />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <Link
            href="/"
            onClick={onClose}
            className="block py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
          >
            Home
          </Link>

          <div>
            <button
              onClick={() =>
                setOpenGroup(openGroup === "calculators" ? null : "calculators")
              }
              className="flex w-full items-center justify-between py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
            >
              Calculators
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openGroup === "calculators" && "rotate-180"
                )}
              />
            </button>
            {openGroup === "calculators" && (
              <div className="mt-2 space-y-4 pl-4">
                {calculatorGroups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-secondary">
                      {group.icon}
                      {group.title}
                    </div>
                    <ul className="space-y-1">
                      {group.calculators.map((calc) => (
                        <li key={calc.name}>
                          <Link
                            href={calc.href}
                            onClick={onClose}
                            className="block py-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
                          >
                            {calc.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href="/calculators"
                  onClick={onClose}
                  className="block py-2 text-sm font-medium text-primary"
                >
                  View All →
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/compare/loans"
            onClick={onClose}
            className="block py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
          >
            Compare
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="block py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            onClick={onClose}
            className="block py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="block py-2 text-base font-medium text-text-primary hover:text-primary transition-colors"
          >
            About
          </Link>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

