import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { GitCompare } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Comparison Tools - Compare Home Loans Online Free | MoneySynth",
  description:
    "Free loan comparison tools to compare different home loan scenarios side by side. Compare home loans with different interest rates, tenures, and prepayment strategies. Make informed loan decisions with visual charts and detailed analysis.",
  keywords: [
    "loan comparison",
    "home loan comparison",
    "loan comparison calculator",
    "loan comparison tool",
    "compare home loans",
    "loan comparison India",
    "home loan comparison calculator",
    "compare loan offers",
    "loan comparison online",
    "loan comparison free",
    "home loan comparison tool",
    "loan comparison calculator India",
    "compare loan interest rates",
    "loan comparison online free",
    "home loan comparison India",
    "loan comparison with prepayment",
    "compare loan scenarios",
    "loan comparison tool India",
    "best loan comparison",
    "loan comparison calculator online",
  ],
  openGraph: {
    title: "Loan Comparison Tools - Compare Home Loans Online Free | MoneySynth",
    description:
      "Free loan comparison tools to compare different home loan scenarios side by side. Compare loans with different rates, tenures, and prepayment strategies.",
    type: "website",
    url: "https://moneysynth.com/compare/loans",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Comparison Tools - Compare Home Loans Online Free",
    description:
      "Compare different home loan scenarios side by side. Make informed loan decisions with visual charts and detailed analysis.",
  },
  alternates: {
    canonical: "https://moneysynth.com/compare/loans",
  },
};

const comparisonCalculators = [
  {
    title: "Home Loan Comparison",
    description:
      "Compare up to 3 different home loan scenarios side by side with visual charts and detailed analysis.",
    href: "/compare/loans/home-loan",
    icon: <GitCompare className="h-6 w-6" />,
  },
  {
    title: "Advanced Home Loan Comparison",
    description:
      "Compare up to 3 home loan scenarios with part payments to see savings and optimize your loan strategy.",
    href: "/compare/loans/home-loan-advanced",
    icon: <GitCompare className="h-6 w-6" />,
  },
];

export default function LoanComparisonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Loan Comparison Tools
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Compare different loan scenarios to make informed financial decisions
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {comparisonCalculators.map((calculator) => (
                <CalculatorCard
                  key={calculator.href}
                  title={calculator.title}
                  description={calculator.description}
                  href={calculator.href}
                  icon={calculator.icon}
                />
              ))}
            </div>

            <CalculatorFAQ
              calculatorName="Loan Comparison Tools"
              calculatorType="Comparison Tools"
              whatIs="Loan Comparison Tools are powerful financial planning utilities that allow you to compare multiple loan scenarios side by side. These tools help you evaluate different loan offers, interest rates, tenures, and repayment strategies to make informed financial decisions. By visualizing the differences in EMI, total interest, and overall cost across multiple scenarios, you can identify the most cost-effective loan option that aligns with your financial goals and repayment capacity."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">How Comparison Tools Work:</p>
                  <p className="text-sm">
                    Comparison tools use the standard EMI calculation formula for each scenario:
                  </p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                  <p className="text-sm mt-2">
                    Then they calculate and compare:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>Monthly EMI:</strong> Fixed monthly payment for each scenario
                    </li>
                    <li>
                      <strong>Total Interest:</strong> Sum of all interest payments over loan tenure
                    </li>
                    <li>
                      <strong>Total Amount:</strong> Principal + Total Interest
                    </li>
                    <li>
                      <strong>Savings:</strong> (For advanced tool) Interest saved through prepayments
                    </li>
                    <li>
                      <strong>Year-wise Breakdown:</strong> Interest paid each year for comparison
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Advanced tools also factor in part payments and recalculate EMI/tenure accordingly.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    <strong>Choose a Comparison Tool:</strong>
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li><strong>Home Loan Comparison:</strong> For basic loan scenario comparison</li>
                      <li><strong>Advanced Home Loan Comparison:</strong> For comparing loans with prepayment strategies</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Add Scenarios:</strong> Add up to 3 different loan scenarios you want to compare
                  </li>
                  <li>
                    <strong>Enter Loan Details:</strong> For each scenario, input loan amount, interest rate, tenure, and start date
                  </li>
                  <li>
                    <strong>Add Prepayments (Advanced Tool):</strong> If using the advanced tool, add part payments with amounts, dates, and payment types
                  </li>
                  <li>
                    <strong>Review Comparison:</strong> Analyze the side-by-side comparison:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Comparison tables showing key metrics</li>
                      <li>Visual charts (bar charts, pie charts, line charts)</li>
                      <li>Year-wise interest breakdown</li>
                      <li>Savings calculations (for advanced tool)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Make Decision:</strong> Choose the scenario that best fits your financial situation and goals
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "Why should I use comparison tools?",
                  answer:
                    "Comparison tools help you: Make informed decisions by seeing all options side by side, Understand the financial impact of different loan terms, Compare offers from multiple lenders objectively, Optimize your loan structure for maximum savings, Visualize differences through charts and graphs, and Plan your loan strategy based on data rather than assumptions.",
                },
                {
                  question: "What's the difference between basic and advanced comparison?",
                  answer:
                    "Basic comparison compares standard loan scenarios with different amounts, rates, or tenures. Advanced comparison includes part payments (prepayments), allowing you to compare different prepayment strategies - such as reducing EMI vs reducing tenure, different prepayment amounts, and timing of prepayments. Use basic comparison for choosing between loan offers, and advanced comparison for optimizing your repayment strategy.",
                },
                {
                  question: "How many scenarios can I compare?",
                  answer:
                    "You can compare up to 3 scenarios simultaneously. This is optimal because: It's enough to compare multiple options without overwhelming you, Visual charts remain clear and readable, and You can compare: different lenders, different loan terms, different prepayment strategies, or a combination of the above. If you need to compare more scenarios, you can run multiple comparisons.",
                },
                {
                  question: "What should I look for when comparing loans?",
                  answer:
                    "Key factors to compare: Monthly EMI (affordability), Total interest payable (cost of borrowing), Total amount payable (principal + interest), Impact of prepayments (if applicable), Year-wise interest payment pattern, and Flexibility in terms. Remember: Lower EMI doesn't always mean better - longer tenure increases total interest. Find the right balance between EMI affordability and total cost.",
                },
                {
                  question: "Can I use these tools to negotiate with lenders?",
                  answer:
                    "Absolutely! These tools provide you with data-driven insights that strengthen your negotiation position. You can: Show lenders how their offer compares to others, Demonstrate understanding of loan economics, Request better terms based on comparisons, and Make informed counter-offers. Having comparison data makes you a more informed borrower and can help you secure better loan terms.",
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

