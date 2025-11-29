import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Home Loan EMI Comparison Tool - Compare Rates",
  description:
    "Compare home loan EMI across different banks and interest rates. Find the best home loan option for your budget.",
  keywords: [
    "home loan comparison",
    "compare home loans",
    "home loan comparison tool",
    "home loan comparison calculator",
    "compare home loan interest rates",
    "compare home loan EMI",
    "home loan comparison online",
    "home loan comparison free",
    "compare home loan offers",
    "compare home loan scenarios",
    "home loan comparison with charts",
    "best home loan comparison",
    "home loan comparison online free",
    "compare home loan tenures",
    "home loan EMI comparison",
    "home loan interest comparison",
    "home loan comparison tool online",
    "home loan comparison with prepayment",
    "home loan prepayment comparison",
    "compare home loans with part payment",
    "compare home loan prepayment strategies",
    "home loan comparison advanced",
    "best home loan rates comparison",
    "mortgage comparison tool",
    "compare mortgage rates",
    "home loan EMI comparison tool",
    "home loan comparison with step-up EMI",
    "home loan comparison with prepayment",
    "home loan comparison with part payment",
    "home loan comparison with step-up EMI and prepayment",
    "home loan comparison with step-up EMI and part payment",
    "home loan comparison with step-up EMI and prepayment and part payment",
    "home loan comparison with step-up EMI and prepayment and part payment",
  ],
  openGraph: {
    title: "Home Loan EMI Comparison Tool - Compare Rates",
    description:
      "Compare home loan EMI across different banks and interest rates. Find the best home loan option for your budget.",
    type: "website",
    url: "https://moneysynth.com/tools/home-loan-emi-comparison",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Comparison Tool - Compare Rates",
    description:
      "Compare home loan EMI across different banks and interest rates. Find the best home loan option for your budget.",
  },
  alternates: {
    canonical: "https://moneysynth.com/tools/home-loan-emi-comparison",
  },
};

// Dynamically import calculator component for route-based code splitting
// Using AdvancedEMIComparisonClient which includes prepayment functionality
const AdvancedEMIComparisonClient = dynamic(
  () => import("@/components/calculators/loan-calculators/AdvancedEMIComparisonClient").then((mod) => ({ default: mod.AdvancedEMIComparisonClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function HomeLoanComparePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AdvancedEMIComparisonClient />

            <CalculatorFAQ
              calculatorName="Home Loan EMI Comparison"
              calculatorType="Comparison Tool"
              whatIs="The Home Loan EMI Comparison Tool allows you to compare up to 3 different home loan scenarios side by side, including scenarios with prepayments and part payments. This helps you evaluate different loan offers, interest rates, tenures, loan amounts, and prepayment strategies to make an informed decision. By comparing multiple scenarios simultaneously, you can visualize the differences in EMI, total interest, savings from prepayments, and overall cost, enabling you to choose the best loan option for your financial situation."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Comparison Calculation:</p>
                  <p className="text-sm">
                    Each scenario uses the standard EMI formula:
                  </p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>P</strong> = Principal loan amount
                    </li>
                    <li>
                      <strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>N</strong> = Loan tenure in months
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    The tool calculates and compares:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>Monthly EMI for each scenario</li>
                    <li>Total interest payable</li>
                    <li>Total amount payable (Principal + Interest)</li>
                    <li>Savings from prepayments (if applicable)</li>
                    <li>Pie charts showing principal, interest, and savings breakdown</li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    <strong>Add Scenarios:</strong> Click "Add Scenario" to add up to 3 loan scenarios for comparison
                  </li>
                  <li>
                    <strong>Enter Loan Details:</strong> For each scenario, enter:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Loan Amount</li>
                      <li>Interest Rate (annual percentage)</li>
                      <li>Loan Tenure (in years or months)</li>
                      <li>EMI Payment Start Date</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Add Part Payments (Optional):</strong> For scenarios with prepayments:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Click "Add Part Payment" for the scenario</li>
                      <li>Enter the prepayment amount</li>
                      <li>Select the payment date (month number)</li>
                      <li>Choose payment type: One-time or Recurring</li>
                      <li>Add multiple prepayments if needed</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Compare Results:</strong> The tool automatically calculates and displays:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Side-by-side comparison table showing EMI, interest, total amount, and savings</li>
                      <li>Visual pie charts showing principal, interest, and savings breakdown</li>
                      <li>Bar chart comparing all scenarios</li>
                      <li>Color-coded scenarios for easy identification</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Analyze:</strong> Review the differences to identify which scenario offers:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Lowest EMI (better cash flow)</li>
                      <li>Lowest total interest (better long-term savings)</li>
                      <li>Maximum savings from prepayments</li>
                      <li>Best balance between EMI and total cost</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Make Decision:</strong> Choose the scenario that best fits your financial goals and repayment capacity
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "Why should I compare multiple loan scenarios?",
                  answer:
                    "Comparing multiple scenarios helps you: Understand the impact of different interest rates on your loan cost, Evaluate how tenure affects EMI and total interest, Compare offers from different lenders, Make informed decisions based on your financial capacity, and Optimize your loan structure for maximum savings.",
                },
                {
                  question: "What should I compare when choosing a home loan?",
                  answer:
                    "Key factors to compare: Interest rates (even 0.5% difference can save lakhs), Loan tenure (longer tenure = lower EMI but more interest), Processing fees and other charges, Prepayment terms and penalties, Loan-to-value (LTV) ratio, and Flexibility in EMI payment dates. Our comparison tool focuses on the financial aspects (EMI, interest, total cost) which are the most critical factors.",
                },
                {
                  question: "How do I interpret the comparison charts?",
                  answer:
                    "The bar chart shows side-by-side comparison of EMI, Interest, and Total Amount for all scenarios - taller bars mean higher values. The line chart shows year-wise interest payment - helps you see when you pay more interest. Lower interest in early years is better. Use these visualizations to quickly identify which scenario is most cost-effective and suits your repayment capacity.",
                },
                {
                  question: "Can I compare loans from different banks?",
                  answer:
                    "Yes! You can use this tool to compare loan offers from different banks or lenders. Simply enter the loan details (amount, interest rate, tenure) from each lender as separate scenarios. This helps you objectively compare which bank offers the best terms. Remember to also consider other factors like customer service, loan processing time, and additional benefits when making your final decision.",
                },
                {
                  question: "How do part payments affect the comparison?",
                  answer:
                    "Part payments (prepayments) reduce your outstanding principal, which can lower your EMI or reduce your loan tenure. When you add part payments to a scenario, the calculator automatically recalculates the EMI and shows the savings. This allows you to compare scenarios with and without prepayments to see the financial impact of making additional payments.",
                },
                {
                  question: "Should I compare scenarios with and without prepayments?",
                  answer:
                    "Yes! Comparing scenarios with and without prepayments helps you understand the financial impact of prepayments, see how much interest you can save, plan your prepayment strategy, and make informed decisions about when and how much to prepay. Create one scenario without prepayments (baseline) and others with different prepayment strategies to see the difference.",
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

