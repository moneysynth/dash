import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// import { AdUnit } from "@/components/common/AdUnit";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator - Check Loan Eligibility Online Free | MoneySynth",
  description:
    "Free loan eligibility calculator to check how much loan amount you can get approved for. Calculate loan eligibility based on income, existing EMIs, tenure, and interest rate. Get personalized loan eligibility insights.",
  keywords: [
    "loan eligibility calculator",
    "loan eligibility",
    "loan eligibility calculator India",
    "check loan eligibility",
    "calculate loan eligibility",
    "home loan eligibility calculator",
    "personal loan eligibility calculator",
    "car loan eligibility calculator",
    "loan eligibility based on income",
    "loan eligibility calculator online",
    "loan eligibility calculator free",
    "EMI based loan eligibility",
    "loan eligibility check",
    "loan amount eligibility calculator",
    "loan eligibility calculator India",
    "maximum loan amount calculator",
    "loan eligibility based on salary",
    "loan eligibility calculator online free",
    "how much loan can I get",
    "loan eligibility EMI calculator",
  ],
  openGraph: {
    title: "Loan Eligibility Calculator - Check Loan Eligibility Online Free | MoneySynth",
    description:
      "Free loan eligibility calculator to check how much loan amount you qualify for based on your income, existing obligations, and loan terms.",
    type: "website",
    url: "https://moneysynth.com/calculators/loan-eligibility",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Eligibility Calculator - Check Loan Eligibility Online Free",
    description:
      "Check your loan eligibility. Calculate how much loan amount you can get approved for based on your income and existing obligations.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/loan-eligibility",
  },
};

// Dynamically import calculator component for route-based code splitting
const LoanEligibilityCalculator = dynamic(
  () => import("@/components/calculators/loan-calculators/LoanEligibilityCalculator").then((mod) => ({ default: mod.LoanEligibilityCalculator })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function LoanEligibilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <LoanEligibilityCalculator />

            <CalculatorFAQ
              calculatorName="Loan Eligibility"
              calculatorType="Loan Eligibility"
              whatIs="A Loan Eligibility Calculator helps you determine how much loan amount you can get approved for based on your income, existing obligations, and other financial factors. It gives you an estimate before applying, helping you plan your loan application and understand what loan amount you qualify for. This prevents rejection and helps you negotiate better terms with lenders."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Loan Eligibility Calculation:</p>
                  <p className="text-sm">Eligible loan amount is calculated using:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>EMI Capacity</strong> = (Monthly Income × EMI/NMI Ratio) - Existing EMIs
                    </li>
                    <li>
                      <strong>EMI/NMI Ratio</strong> = Typically 40-60% of net monthly income
                    </li>
                    <li>
                      <strong>Eligible Loan Amount</strong> = Calculated by reverse-engineering EMI formula with:
                      <ul className="ml-4 mt-1 list-disc">
                        <li>Available EMI capacity</li>
                        <li>Interest rate</li>
                        <li>Desired tenure</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Formula: P = EMI × [(1+R)^N - 1] / [R × (1+R)^N]
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Monthly Income</strong> (take-home salary)
                  </li>
                  <li>
                    Enter your <strong>Existing EMI Obligations</strong> (current loans, credit card payments, etc.)
                  </li>
                  <li>
                    Select your <strong>Desired Loan Tenure</strong> in years
                  </li>
                  <li>
                    The calculator will show:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Eligible loan amount</li>
                      <li>Maximum monthly EMI you can afford</li>
                      <li>Available income after existing obligations</li>
                      <li>Key factors affecting your eligibility</li>
                      <li>Suggestions to improve eligibility</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the EMI/NMI ratio?",
                  answer:
                    "EMI/NMI (Equated Monthly Installment to Net Monthly Income) ratio is the percentage of your monthly income that can be used for loan EMIs. Most lenders prefer this ratio to be 40-50% for salaried individuals and 30-40% for self-employed. A lower ratio improves your eligibility and loan approval chances.",
                },
                {
                  question: "How can I improve my loan eligibility?",
                  answer:
                    "Ways to improve eligibility: Increase your income, Reduce existing debts, Choose a longer tenure (reduces EMI), Improve your credit score, Add a co-applicant with good income, Show additional income sources, and Close or reduce existing EMIs. Note: EMIs ending in the next 6 months can often be excluded from calculations.",
                },
                {
                  question: "What factors affect loan eligibility?",
                  answer:
                    "Key factors include: Monthly income (higher = better), Existing obligations (lower = better), Credit score (750+ preferred), Employment stability, Age (typically 21-65 years), Loan tenure (longer = lower EMI = higher eligibility), Interest rate, and Property value (for secured loans).",
                },
                {
                  question: "Is the calculated amount guaranteed?",
                  answer:
                    "No, the calculator provides an estimate. Actual eligibility depends on the lender's specific policies, your credit history, property valuation (for secured loans), and other factors. Different lenders may offer different amounts. Use this as a guide and check with multiple lenders for actual offers.",
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

