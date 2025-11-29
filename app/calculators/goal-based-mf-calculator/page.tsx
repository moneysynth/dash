import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Goal-Based MF Calculator - Financial Goal Planning Calculator Online Free | MoneySynth",
  description:
    "Free goal-based mutual fund calculator to plan and calculate investments needed to achieve your financial goals. Calculate required monthly SIP, goal amount, and investment planning for education, retirement, house purchase, and more.",
  keywords: [
    "goal based calculator",
    "goal based investment calculator",
    "goal based MF calculator",
    "financial goal calculator",
    "goal planning calculator",
    "goal based calculator India",
    "goal based mutual fund calculator",
    "goal calculator online",
    "financial goal planning calculator",
    "goal based SIP calculator",
    "goal calculator free",
    "goal based calculator India",
    "retirement goal calculator",
    "education goal calculator",
    "house purchase goal calculator",
    "goal based investment planning",
    "goal calculator online free",
    "goal based calculator formula",
    "goal achievement calculator",
    "financial planning calculator",
  ],
  openGraph: {
    title: "Goal-Based MF Calculator - Financial Goal Planning Calculator Online Free | MoneySynth",
    description:
      "Free goal-based mutual fund calculator to plan investments for your financial goals. Calculate required monthly SIP and goal achievement timeline.",
    type: "website",
    url: "https://moneysynth.com/calculators/goal-based-mf-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goal-Based MF Calculator - Financial Goal Planning Calculator Online Free",
    description:
      "Free goal-based calculator. Plan investments for your financial goals - education, retirement, house purchase, and more.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/goal-based-mf-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const GoalBasedMFCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/GoalBasedMFCalculatorClient").then((mod) => ({ default: mod.GoalBasedMFCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function GoalBasedMFCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GoalBasedMFCalculatorClient />

            <CalculatorFAQ
              calculatorName="Goal-Based Mutual Fund"
              calculatorType="Goal-Based Investment"
              whatIs="A Goal-Based Mutual Fund Calculator helps you plan investments to achieve specific financial goals like buying a house, children's education, retirement, vacation, etc. Instead of investing randomly, goal-based investing aligns your investments with specific objectives, timelines, and required amounts. This approach provides clarity, discipline, and better financial planning."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Goal-Based Investment Calculation:</p>
                  <p className="text-sm">The calculator determines:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>Required Monthly Investment</strong> = Calculated based on goal amount, time horizon, and expected returns
                    </li>
                    <li>
                      <strong>Future Value</strong> = Current investment + future investments + returns
                    </li>
                    <li>
                      Uses <strong>SIP formula</strong> with adjustments for:
                      <ul className="ml-4 mt-1 list-disc">
                        <li>Inflation-adjusted goal amount</li>
                        <li>Existing corpus (if any)</li>
                        <li>Expected returns based on asset allocation</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Financial Goal</strong> (e.g., "Buy a House", "Child's Education")
                  </li>
                  <li>
                    Enter the <strong>Goal Amount</strong> you need (in today's value)
                  </li>
                  <li>
                    Enter the <strong>Time to Goal</strong> in years
                  </li>
                  <li>
                    Enter <strong>Inflation Rate</strong> (typically 5-7% for long-term planning)
                  </li>
                  <li>
                    Enter <strong>Expected Annual Return</strong> based on your risk profile
                  </li>
                  <li>
                    Enter <strong>Existing Investment</strong> (if you've already started saving)
                  </li>
                  <li>
                    The calculator will show:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Inflation-adjusted goal amount</li>
                      <li>Required monthly SIP</li>
                      <li>Projected growth over time</li>
                      <li>Goal achievement timeline</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "Why is goal-based investing important?",
                  answer:
                    "Goal-based investing provides purpose, discipline, and clarity to your investments. It helps you prioritize goals, allocate resources efficiently, and track progress. Without specific goals, investments often lack direction and may not meet your actual needs when required.",
                },
                {
                  question: "How do I choose the right mutual fund for my goal?",
                  answer:
                    "Match the fund type to your time horizon: Short-term goals (1-3 years) → Debt funds, Medium-term (3-7 years) → Hybrid/Balanced funds, Long-term (7+ years) → Equity funds. Also consider your risk tolerance and the goal's importance. Critical goals may need more conservative approaches.",
                },
                {
                  question: "Should I consider inflation?",
                  answer:
                    "Yes! Always factor in inflation. ₹10 lakhs today will be worth much less in 10 years. The calculator adjusts your goal amount for inflation, ensuring you save enough to meet the actual future cost. For long-term goals, inflation significantly impacts the required amount.",
                },
                {
                  question: "Can I have multiple goals?",
                  answer:
                    "Absolutely! It's recommended to have separate investments for different goals. This helps you track progress individually, choose appropriate funds for each goal's timeline, and avoid mixing short-term and long-term investments. Prioritize goals and allocate investments accordingly.",
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

