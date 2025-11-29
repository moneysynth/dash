import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "SWP Calculator - Systematic Withdrawal Plan Calculator Online Free | MoneySynth",
  description:
    "Free SWP calculator to calculate Systematic Withdrawal Plan. Calculate how long your investment will last with regular monthly withdrawals. SWP calculator for mutual funds, retirement planning, and regular income generation.",
  keywords: [
    "SWP calculator",
    "systematic withdrawal plan calculator",
    "SWP calculator India",
    "SWP calculator mutual fund",
    "SWP calculator online",
    "calculate SWP",
    "SWP withdrawal calculator",
    "SWP calculator free",
    "SWP calculator India",
    "systematic withdrawal plan",
    "SWP calculator online free",
    "SWP retirement calculator",
    "SWP income calculator",
    "mutual fund SWP calculator",
    "SWP calculator with returns",
    "SWP calculator India",
    "SWP calculator formula",
    "SWP calculator online India",
    "regular income calculator",
    "withdrawal plan calculator",
  ],
  openGraph: {
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator Online Free | MoneySynth",
    description:
      "Free SWP calculator to calculate Systematic Withdrawal Plan. Calculate how long your investment will last with regular monthly withdrawals.",
    type: "website",
    url: "https://moneysynth.com/calculators/swp-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator Online Free",
    description:
      "Free SWP calculator. Calculate how long your investment will last with regular monthly withdrawals for retirement planning.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/swp-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const SWPCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/SWPCalculatorClient").then((mod) => ({ default: mod.SWPCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function SWPCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SWPCalculatorClient />

            <CalculatorFAQ
              calculatorName="SWP"
              calculatorType="SWP"
              whatIs="SWP (Systematic Withdrawal Plan) is a facility offered by mutual funds where you can withdraw a fixed amount regularly (usually monthly) from your existing mutual fund investment. It's the opposite of SIP - instead of investing regularly, you withdraw regularly. SWP is ideal for retirees or those who need regular income from their investments while keeping the remaining corpus invested."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">SWP Calculation:</p>
                  <p className="text-sm">
                    SWP calculations involve determining how long your investment will last based on:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>Initial Investment</strong> = Starting corpus amount
                    </li>
                    <li>
                      <strong>Monthly Withdrawal</strong> = Fixed amount withdrawn each month
                    </li>
                    <li>
                      <strong>Expected Return Rate</strong> = Annual rate of return on remaining investment
                    </li>
                    <li>
                      <strong>Balance</strong> = Remaining amount after each withdrawal, which continues to grow
                    </li>
                  </ul>
                  <p className="text-sm">
                    The calculator shows how your investment depletes over time and when it will be
                    exhausted.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Initial Investment Amount</strong> (the corpus you want to start with)
                  </li>
                  <li>
                    Enter the <strong>Monthly Withdrawal Amount</strong> you need
                  </li>
                  <li>
                    Enter the <strong>Expected Annual Return Rate</strong> (typically 8-12% for balanced funds)
                  </li>
                  <li>
                    The calculator will show:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>How long your investment will last</li>
                      <li>Remaining balance after each withdrawal</li>
                      <li>Total withdrawals over the period</li>
                      <li>Timeline visualization</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "When should I use SWP?",
                  answer:
                    "SWP is ideal for retirees who need regular monthly income, individuals who want to create a pension-like structure, or anyone who needs to withdraw money systematically from their investments while keeping the rest invested.",
                },
                {
                  question: "What are the tax implications of SWP?",
                  answer:
                    "SWP withdrawals from equity funds held for more than 1 year are tax-free up to ₹1 lakh per year. Beyond that, long-term capital gains tax of 10% applies. For debt funds, gains are taxed as per your income tax slab if held for less than 3 years, and 20% with indexation if held for 3+ years.",
                },
                {
                  question: "How much can I withdraw monthly?",
                  answer:
                    "The withdrawal amount depends on your initial investment, expected returns, and how long you want the corpus to last. Generally, withdrawing 0.5-1% of your corpus monthly is considered safe for long-term sustainability.",
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

