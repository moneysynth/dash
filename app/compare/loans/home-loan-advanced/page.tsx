import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Advanced Home Loan Comparison - Compare Loans with Prepayment | MoneySynth",
  description:
    "Free advanced home loan comparison tool to compare up to 3 home loan scenarios with part payments and prepayments. Compare different prepayment strategies, see interest savings, and optimize your loan repayment. Visual charts and detailed analysis.",
  keywords: [
    "advanced home loan comparison",
    "home loan comparison with prepayment",
    "home loan prepayment comparison",
    "compare home loans with part payment",
    "home loan comparison advanced",
    "home loan comparison with prepayment India",
    "compare home loan prepayment strategies",
    "home loan comparison tool advanced",
    "home loan comparison calculator advanced",
    "compare home loan scenarios with prepayment",
    "home loan prepayment savings comparison",
    "home loan comparison India advanced",
    "compare home loan EMI with prepayment",
    "home loan comparison online advanced",
    "home loan comparison free advanced",
    "compare home loan prepayment impact",
    "home loan optimization comparison",
    "home loan comparison with savings",
    "compare home loan strategies",
    "home loan comparison tool with prepayment",
  ],
  openGraph: {
    title: "Advanced Home Loan Comparison - Compare Loans with Prepayment | MoneySynth",
    description:
      "Free advanced home loan comparison tool to compare up to 3 home loan scenarios with part payments. Compare prepayment strategies and see interest savings.",
    type: "website",
    url: "https://moneysynth.com/compare/loans/home-loan-advanced",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Home Loan Comparison - Compare Loans with Prepayment",
    description:
      "Compare home loan scenarios with prepayments. See interest savings, compare strategies, and optimize your loan repayment.",
  },
  alternates: {
    canonical: "https://moneysynth.com/compare/loans/home-loan-advanced",
  },
};

// Dynamically import calculator component for route-based code splitting
const AdvancedEMIComparisonClient = dynamic(
  () => import("@/components/calculators/loan-calculators/AdvancedEMIComparisonClient").then((mod) => ({ default: mod.AdvancedEMIComparisonClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function AdvancedHomeLoanComparePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Advanced Home Loan Comparison
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Compare up to 3 different home loan scenarios with part payments side by side
              </p>
            </div>
            <AdvancedEMIComparisonClient />

            <CalculatorFAQ
              calculatorName="Advanced Home Loan Comparison"
              calculatorType="Advanced Comparison Tool"
              whatIs="The Advanced Home Loan Comparison Tool is an enhanced comparison tool that allows you to compare up to 3 home loan scenarios with part payments (prepayments). This tool is perfect for borrowers who plan to make additional payments during their loan tenure. It helps you understand how different prepayment strategies affect your loan - comparing scenarios with different prepayment amounts, timings, and strategies (reduce EMI vs reduce tenure) to optimize your loan repayment."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Advanced Comparison with Prepayments:</p>
                  <p className="text-sm">
                    Each scenario calculates EMI and adjusts for part payments:
                  </p>
                  <ol className="ml-6 list-decimal space-y-1 text-sm">
                    <li>
                      <strong>Standard EMI:</strong> EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                    </li>
                    <li>
                      <strong>After Part Payment:</strong> New principal = Old principal - Part payment amount
                    </li>
                    <li>
                      <strong>Recalculation:</strong> New EMI or reduced tenure based on payment type
                    </li>
                    <li>
                      <strong>Savings:</strong> Total interest saved = Original interest - New interest
                    </li>
                  </ol>
                  <p className="text-sm mt-2">
                    The tool compares:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>EMI amounts (with and without prepayments)</li>
                    <li>Total interest paid</li>
                    <li>Total amount payable</li>
                    <li>Interest savings from prepayments</li>
                    <li>Pie charts showing principal, interest, and savings breakdown</li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    <strong>Add Scenarios:</strong> Click "Add Scenario" to add up to 3 loan scenarios
                  </li>
                  <li>
                    <strong>Enter Basic Loan Details:</strong> For each scenario, enter:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Loan Amount</li>
                      <li>Interest Rate</li>
                      <li>Loan Tenure</li>
                      <li>EMI Payment Start Date</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Add Part Payments:</strong> For scenarios with prepayments:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Click "Add Part Payment"</li>
                      <li>Enter the prepayment amount</li>
                      <li>Select the payment date (month and year)</li>
                      <li>Choose payment type: "Reduce EMI" or "Reduce Tenure"</li>
                      <li>Add multiple prepayments if needed</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Compare Results:</strong> View side-by-side comparison:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Comparison table with EMI, Interest, Total Amount, and Savings</li>
                      <li>Pie charts showing principal, interest, and savings for each scenario</li>
                      <li>Bar chart comparing all scenarios</li>
                      <li>Visual representation of how prepayments impact your loan</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Analyze Savings:</strong> Identify which prepayment strategy saves the most interest and suits your financial goals
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the difference between 'Reduce EMI' and 'Reduce Tenure'?",
                  answer:
                    "'Reduce EMI' keeps the loan tenure the same but lowers your monthly payment, improving cash flow. 'Reduce Tenure' keeps your EMI the same but shortens the loan period, saving more interest in the long run. Generally, reducing tenure is financially better as it saves more interest, but reducing EMI is better if you need more monthly liquidity.",
                },
                {
                  question: "When is the best time to make part payments?",
                  answer:
                    "Early in the loan tenure is best because most of your EMI goes towards interest initially. Making prepayments early maximizes interest savings. However, consider: Your emergency fund should be adequate first, Other high-interest debts should be prioritized, and Your other financial goals shouldn't be compromised. Balance prepayments with maintaining financial flexibility.",
                },
                {
                  question: "How much should I prepay?",
                  answer:
                    "There's no fixed amount, but consider: Prepay when you have surplus funds (bonus, tax refund, inheritance), Start with small amounts if unsure, Aim to prepay 10-20% of principal annually if possible, Don't prepay at the cost of emergency fund or other critical goals, and Consider tax benefits - prepaying reduces interest deduction benefits. Use this tool to see the impact of different prepayment amounts.",
                },
                {
                  question: "Should I compare scenarios with and without prepayments?",
                  answer:
                    "Yes! Comparing scenarios with and without prepayments helps you: Understand the financial impact of prepayments, See how much interest you can save, Plan your prepayment strategy, and Make informed decisions about when and how much to prepay. Create one scenario without prepayments (baseline) and others with different prepayment strategies to see the difference.",
                },
                {
                  question: "Are there any charges for prepayment?",
                  answer:
                    "For floating rate home loans, prepayment is usually free. For fixed rate loans, some banks charge a prepayment penalty (typically 2-4% of the prepaid amount). Always check with your lender about prepayment terms before making additional payments. The savings from prepayment usually outweigh the penalty, but factor it into your comparison.",
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

