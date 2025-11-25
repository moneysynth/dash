import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Home Loan Comparison - Compare Home Loan Scenarios Online Free | MoneySynth",
  description:
    "Free home loan comparison tool to compare up to 3 different home loan scenarios side by side. Compare interest rates, EMI, total interest, and loan terms. Make informed home loan decisions with visual charts and detailed analysis.",
  keywords: [
    "home loan comparison",
    "compare home loans",
    "home loan comparison tool",
    "home loan comparison calculator",
    "compare home loan interest rates",
    "home loan comparison India",
    "compare home loan EMI",
    "home loan comparison online",
    "home loan comparison free",
    "compare home loan offers",
    "home loan comparison calculator India",
    "home loan comparison tool India",
    "compare home loan scenarios",
    "home loan comparison with charts",
    "best home loan comparison",
    "home loan comparison online free",
    "compare home loan tenures",
    "home loan EMI comparison",
    "home loan interest comparison",
    "home loan comparison tool online",
  ],
  openGraph: {
    title: "Home Loan Comparison - Compare Home Loan Scenarios Online Free | MoneySynth",
    description:
      "Free home loan comparison tool to compare up to 3 different home loan scenarios side by side. Compare interest rates, EMI, and total interest with visual charts.",
    type: "website",
    url: "https://moneysynth.com/compare/loans/home-loan",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan Comparison - Compare Home Loan Scenarios Online Free",
    description:
      "Compare up to 3 different home loan scenarios side by side. Make informed loan decisions with visual charts and detailed analysis.",
  },
  alternates: {
    canonical: "https://moneysynth.com/compare/loans/home-loan",
  },
};

// Dynamically import calculator component for route-based code splitting
const EMIComparisonClient = dynamic(
  () => import("@/components/calculators/loan-calculators/EMIComparisonClient").then((mod) => ({ default: mod.EMIComparisonClient })),
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
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Home Loan Comparison
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Compare up to 3 different home loan scenarios side by side
              </p>
            </div>
            <EMIComparisonClient />

            <CalculatorFAQ
              calculatorName="Home Loan Comparison"
              calculatorType="Comparison Tool"
              whatIs="The Home Loan Comparison Tool allows you to compare up to 3 different home loan scenarios side by side. This helps you evaluate different loan offers, interest rates, tenures, and loan amounts to make an informed decision. By comparing multiple scenarios simultaneously, you can visualize the differences in EMI, total interest, and overall cost, enabling you to choose the best loan option for your financial situation."
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
                    <li>Year-wise interest comparison</li>
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
                    <strong>Compare Results:</strong> The tool automatically calculates and displays:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Side-by-side comparison table showing EMI, interest, and total amount</li>
                      <li>Visual bar chart comparing EMI, Interest, and Total Amount</li>
                      <li>Year-wise interest comparison line chart</li>
                      <li>Color-coded scenarios for easy identification</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Analyze:</strong> Review the differences to identify which scenario offers:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Lowest EMI (better cash flow)</li>
                      <li>Lowest total interest (better long-term savings)</li>
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
              ]}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

