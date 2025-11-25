import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Advanced Home Loan Calculator - With Prepayment & Part Payment | MoneySynth",
  description:
    "Advanced home loan calculator with part payment and prepayment options. Calculate home loan EMI with prepayments, compare scenarios, see interest savings, and optimize your loan strategy. Free online calculator.",
  keywords: [
    "advanced home loan calculator",
    "home loan calculator with prepayment",
    "home loan prepayment calculator",
    "home loan part payment calculator",
    "home loan calculator with part payment",
    "home loan EMI calculator with prepayment",
    "home loan prepayment impact calculator",
    "home loan calculator reduce EMI",
    "home loan calculator reduce tenure",
    "home loan prepayment savings calculator",
    "home loan optimization calculator",
    "home loan calculator India",
    "home loan prepayment calculator India",
    "calculate home loan prepayment",
    "home loan EMI reduction calculator",
    "home loan tenure reduction calculator",
    "home loan prepayment benefits",
    "home loan calculator advanced",
    "home loan scenario calculator",
    "home loan comparison calculator",
  ],
  openGraph: {
    title: "Advanced Home Loan Calculator - With Prepayment & Part Payment | MoneySynth",
    description:
      "Advanced home loan calculator with part payments and prepayment options. See how prepayments affect your EMI, tenure, and total interest. Compare scenarios and optimize your loan strategy.",
    type: "website",
    url: "https://moneysynth.com/calculators/loans/emi-calculator-advanced",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Home Loan Calculator - With Prepayment & Part Payment",
    description:
      "Calculate home loan EMI with prepayments. See interest savings, compare scenarios, and optimize your loan strategy.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/loans/emi-calculator-advanced",
  },
};

// Dynamically import calculator component for route-based code splitting
const AdvancedEMICalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/AdvancedEMICalculatorClient").then((mod) => ({ default: mod.AdvancedEMICalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function AdvancedEMICalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Advanced Home Loan Calculator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Home loan calculator with part payments, prepayment options, and scenario comparison
              </p>
              <div className="mt-4">
                <Link href="/compare/loans/home-loan-advanced">
                  <Button variant="outline" size="sm">
                    Compare Scenarios
                  </Button>
                </Link>
              </div>
            </div>

            <AdvancedEMICalculatorClient />

            <CalculatorFAQ
              calculatorName="Advanced Home Loan"
              calculatorType="Advanced EMI"
              whatIs="The Advanced Home Loan Calculator is an enhanced version of the basic EMI calculator that allows you to factor in part payments (prepayments) during your loan tenure. It helps you understand how making additional payments affects your loan - reducing either the EMI amount or the loan tenure, and saving on total interest paid."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Advanced EMI Calculation with Prepayments:</p>
                  <p className="text-sm">
                    When you make a part payment, the calculation adjusts:
                  </p>
                  <ol className="ml-6 list-decimal space-y-1 text-sm">
                    <li>
                      Part payment reduces the <strong>outstanding principal</strong>
                    </li>
                    <li>
                      New EMI is recalculated based on remaining principal and tenure, OR
                    </li>
                    <li>
                      Tenure is reduced while keeping EMI constant
                    </li>
                    <li>
                      Total interest is recalculated based on the new principal
                    </li>
                  </ol>
                  <p className="text-sm font-semibold mt-3">Standard EMI Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter basic loan details: <strong>Loan Amount</strong>, <strong>Interest Rate</strong>, and <strong>Tenure</strong>
                  </li>
                  <li>
                    Select your <strong>EMI Payment Start Date</strong>
                  </li>
                  <li>
                    Add <strong>Part Payments</strong> by clicking "Add Part Payment":
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Enter the payment amount</li>
                      <li>Select the payment date (month and year)</li>
                      <li>Choose payment type: Reduce EMI or Reduce Tenure</li>
                    </ul>
                  </li>
                  <li>
                    View the <strong>Amortization Schedule</strong> to see how prepayments affect your loan
                  </li>
                  <li>
                    Check the <strong>Pie Chart</strong> showing Principal, Interest, and Savings
                  </li>
                  <li>
                    Export results to <strong>XLSX</strong> or <strong>PDF</strong> for detailed analysis
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "Should I reduce EMI or reduce tenure?",
                  answer:
                    "Reducing tenure saves more interest in the long run, while reducing EMI improves your monthly cash flow. If you can afford the current EMI, reducing tenure is financially better. If you need more monthly liquidity, reducing EMI is the better option.",
                },
                {
                  question: "When is the best time to make part payments?",
                  answer:
                    "Early in the loan tenure is best, as most of your EMI goes towards interest initially. Making prepayments early maximizes interest savings. However, consider your other financial goals and emergency fund before making large prepayments.",
                },
                {
                  question: "Are there any charges for prepayment?",
                  answer:
                    "For floating rate home loans, prepayment is usually free. For fixed rate loans, some banks may charge a prepayment penalty (typically 2-4% of the prepaid amount). Always check with your lender about prepayment terms.",
                },
              ]}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

