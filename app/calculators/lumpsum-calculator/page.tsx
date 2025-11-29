import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Lumpsum Calculator - One-time Investment",
  description:
    "Calculate returns from one-time lump sum investments in mutual funds. Plan your single investment strategy.",
  keywords: [
    "lumpsum calculator",
    "lumpsum investment calculator",
    "lumpsum returns calculator",
    "lumpsum calculator online",
    "calculate lumpsum returns",
    "lumpsum calculator free",
    "lumpsum calculator mutual fund",
    "lumpsum calculator online free",
    "one time investment calculator",
    "lumpsum calculator with returns",
    "lumpsum calculator formula",
    "lumpsum returns calculator",
    "lumpsum vs SIP calculator",
    "lumpsum investment returns",
    "lumpsum calculator growth",
    "best lumpsum calculator",
    "free lumpsum calculator",
    "one-time investment planning",
    "lumpsum mutual fund calculator",
    "single investment calculator",
    "lumpsum investment planning",
  ],
  openGraph: {
    title: "Lumpsum Calculator - One-time Investment",
    description:
      "Calculate returns from one-time lump sum investments in mutual funds. Plan your single investment strategy.",
    type: "website",
    url: "https://moneysynth.com/calculators/lumpsum-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumpsum Calculator - One-time Investment",
    description:
      "Calculate returns from one-time lump sum investments in mutual funds. Plan your single investment strategy.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/lumpsum-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const LumpsumCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/LumpsumCalculatorClient").then((mod) => ({ default: mod.LumpsumCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function LumpsumCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <LumpsumCalculatorClient />

            <CalculatorFAQ
              calculatorName="Lumpsum Investment"
              calculatorType="Lumpsum"
              whatIs="A Lumpsum Investment Calculator helps you calculate the future value of a one-time investment made today. Unlike SIP where you invest regularly, lumpsum investment involves investing a large amount at once. This is ideal when you have a windfall, bonus, inheritance, or savings that you want to invest for long-term wealth creation. Lumpsum investments benefit from the power of compounding over time."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Lumpsum Future Value Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    FV = P × (1 + r)^n
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>FV</strong> = Future Value (Maturity Amount)
                    </li>
                    <li>
                      <strong>P</strong> = Principal (Initial Investment)
                    </li>
                    <li>
                      <strong>r</strong> = Annual rate of return (as decimal)
                    </li>
                    <li>
                      <strong>n</strong> = Number of years
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    This formula uses compound interest, where returns are reinvested to generate more returns.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Investment Amount</strong> (the lump sum you want to invest)
                  </li>
                  <li>
                    Enter the <strong>Expected Annual Return Rate</strong> (historical average for equity funds is 12-15% p.a.)
                  </li>
                  <li>
                    Select the <strong>Investment Tenure</strong> in years
                  </li>
                  <li>
                    The calculator will display:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Future value of your investment</li>
                      <li>Total returns (gains)</li>
                      <li>Year-wise growth breakdown</li>
                      <li>Visual growth chart</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "Lumpsum vs SIP: Which is better?",
                  answer:
                    "Lumpsum is better if you have a large amount available now and can benefit from immediate compounding. SIP is better for regular savings and rupee cost averaging. Ideally, combine both: invest lumpsum when you have it, and continue SIP for disciplined investing. Time in the market matters more than timing the market.",
                },
                {
                  question: "What returns can I expect from lumpsum investment?",
                  answer:
                    "Returns depend on the asset class: Equity mutual funds historically offer 12-15% annual returns over 5+ years, debt funds offer 6-8%, and hybrid funds offer 8-12%. Past performance doesn't guarantee future returns, but long-term equity investments have historically outperformed other asset classes.",
                },
                {
                  question: "When is the best time to invest lumpsum?",
                  answer:
                    "The best time to invest is now! Trying to time the market often leads to missed opportunities. If you're investing for the long term (5+ years), market timing becomes less important. However, if you're concerned about market volatility, consider investing in phases (staggered investment) over 3-6 months.",
                },
                {
                  question: "Should I invest lumpsum in equity or debt?",
                  answer:
                    "For long-term goals (5+ years), equity is better due to higher growth potential. For short-term goals (1-3 years) or if you're risk-averse, debt funds are safer. Consider your risk tolerance, investment horizon, and financial goals before deciding. Diversification across asset classes is always wise.",
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

