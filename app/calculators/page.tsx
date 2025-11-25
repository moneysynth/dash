import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
// import { AdUnit } from "@/components/common/AdUnit";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  PiggyBank,
  Building2,
  GitCompare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Financial Calculators - Free Online Loan & Investment Calculators | MoneySynth",
  description:
    "Browse all free financial calculators - EMI calculator, SIP calculator, SWP calculator, RD calculator, FD calculator, loan eligibility calculator, and more. Calculate loans, investments, and plan your financial goals with accurate results.",
  keywords: [
    "financial calculators",
    "loan calculators",
    "investment calculators",
    "EMI calculator",
    "SIP calculator",
    "SWP calculator",
    "RD calculator",
    "FD calculator",
    "loan calculator India",
    "investment calculator India",
    "financial planning tools",
    "online calculators",
    "free calculators",
    "calculator hub",
    "home loan calculator",
    "car loan calculator",
    "personal loan calculator",
    "credit card EMI calculator",
    "loan eligibility calculator",
    "mutual fund calculator",
    "SIP returns calculator",
    "fixed deposit calculator",
    "recurring deposit calculator",
    "goal based calculator",
    "retirement calculator",
    "financial calculator list",
    "all calculators",
    "calculator directory",
  ],
  openGraph: {
    title: "Financial Calculators - Free Online Calculators | MoneySynth",
    description:
      "Access all financial calculators - EMI, SIP, SWP, RD, FD, loan eligibility, and more. Free online calculators for loans and investments in India.",
    type: "website",
    url: "https://moneysynth.com/calculators",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators - Free Online Calculators | MoneySynth",
    description:
      "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, and more.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators",
  },
};

const calculatorCategories = [
  {
    title: "Loan Calculators",
    icon: <Building2 className="h-6 w-6" />,
    calculators: [
      {
        title: "Home Loan Calculator",
        description:
          "Calculate your Equated Monthly Installment for home loans with detailed amortization schedule.",
        href: "/calculators/loans/emi-calculator",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Advanced Home Loan Calculator",
        description:
          "Home loan calculator with part payments, prepayment options, and scenario comparison.",
        href: "/calculators/loans/emi-calculator-advanced",
        icon: <Calculator className="h-6 w-6" />,
      },
      {
        title: "Personal Loan Calculator",
        description:
          "Calculate your Equated Monthly Installment for personal loans with detailed amortization schedule.",
        href: "/calculators/loans/personal-loan",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Car Loan Calculator",
        description:
          "Calculate your Equated Monthly Installment for car loans with detailed amortization schedule.",
        href: "/calculators/loans/car-loan",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Credit Card EMI Calculator",
        description:
          "Calculate your Equated Monthly Installment for credit card outstanding amounts with detailed amortization schedule.",
        href: "/calculators/loans/credit-card-emi",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Loan Eligibility Calculator",
        description:
          "Check your loan eligibility based on income, existing obligations, and tenure.",
        href: "/calculators/loans/loan-eligibility",
        icon: <Target className="h-6 w-6" />,
      },
    ],
  },
  {
    title: "Investment Calculators",
    icon: <TrendingUp className="h-6 w-6" />,
    calculators: [
      {
        title: "SIP Calculator",
        description:
          "Calculate returns on your Systematic Investment Plan investments.",
        href: "/calculators/investments/sip-calculator",
        icon: <TrendingUp className="h-6 w-6" />,
      },
      {
        title: "Step-up SIP Calculator",
        description:
          "Calculate returns for SIP with annual step-up increases.",
        href: "/calculators/investments/step-up-sip-calculator",
        icon: <TrendingUp className="h-6 w-6" />,
      },
      {
        title: "Lumpsum Calculator",
        description:
          "Calculate future value of one-time lump sum investments.",
        href: "/calculators/investments/lumpsum-calculator",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "SWP Calculator",
        description:
          "Calculate Systematic Withdrawal Plan for regular income generation.",
        href: "/calculators/investments/swp-calculator",
        icon: <Calculator className="h-6 w-6" />,
      },
      {
        title: "RD Calculator",
        description:
          "Calculate maturity amount for Recurring Deposit investments.",
        href: "/calculators/investments/rd-calculator",
        icon: <PiggyBank className="h-6 w-6" />,
      },
      {
        title: "FD Calculator",
        description:
          "Calculate returns on Fixed Deposit with different payout options.",
        href: "/calculators/investments/fd-calculator",
        icon: <PiggyBank className="h-6 w-6" />,
      },
      {
        title: "Goal-Based MF Calculator",
        description:
          "Plan and calculate investments needed to achieve your financial goals.",
        href: "/calculators/investments/goal-based-mf-calculator",
        icon: <Target className="h-6 w-6" />,
      },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Financial Calculators
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Choose the right calculator for your financial planning needs
              </p>
            </div>

            {calculatorCategories.map((category) => (
              <div key={category.title} className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="text-primary">{category.icon}</div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    {category.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.calculators.map((calc) => (
                    <CalculatorCard
                      key={calc.title}
                      title={calc.title}
                      description={calc.description}
                      href={calc.href}
                      icon={calc.icon}
                    />
                  ))}
                </div>
                
                {/* Ad after first category */}
                {/* {category.title === "Loan Calculators" && (
                  <div className="my-8 flex justify-center">
                    <AdUnit size="728x90" />
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

