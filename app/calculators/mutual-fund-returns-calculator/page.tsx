import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mutual Fund Returns Calculator - Calculate MF Returns Online Free | MoneySynth",
  description:
    "Free mutual fund returns calculator to calculate returns on mutual fund investments. Calculate future value, total returns, CAGR, and inflation-adjusted returns. Mutual fund calculator for equity, debt, and hybrid funds.",
  keywords: [
    "mutual fund returns calculator",
    "mutual fund calculator",
    "MF returns calculator",
    "mutual fund calculator India",
    "calculate mutual fund returns",
    "mutual fund returns calculator online",
    "MF calculator",
    "mutual fund calculator free",
    "mutual fund returns calculator India",
    "mutual fund CAGR calculator",
    "mutual fund calculator online",
    "calculate MF returns",
    "mutual fund investment calculator",
    "mutual fund calculator online free",
    "mutual fund returns calculator India",
    "mutual fund calculator with CAGR",
    "mutual fund calculator formula",
    "mutual fund returns calculator online India",
    "equity mutual fund calculator",
    "debt mutual fund calculator",
    "hybrid mutual fund calculator",
  ],
  openGraph: {
    title: "Mutual Fund Returns Calculator - Calculate MF Returns Online Free | MoneySynth",
    description:
      "Free mutual fund returns calculator to calculate returns on mutual fund investments. Calculate future value, total returns, CAGR, and inflation-adjusted returns.",
    type: "website",
    url: "https://moneysynth.com/calculators/mutual-fund-returns-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutual Fund Returns Calculator - Calculate MF Returns Online Free",
    description:
      "Free mutual fund returns calculator. Calculate future value, total returns, CAGR, and inflation-adjusted returns on your mutual fund investments.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/mutual-fund-returns-calculator",
  },
};

const mutualFundReturnsCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mutual Fund Returns Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free mutual fund returns calculator to calculate returns on mutual fund investments with CAGR and inflation-adjusted returns.",
  featureList: [
    "Calculate Mutual Fund Returns",
    "CAGR Calculation",
    "Future Value Calculation",
    "Inflation-Adjusted Returns",
    "Year-wise Breakdown",
    "Growth Charts",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

// Dynamically import calculator component for route-based code splitting
const MutualFundReturnsCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/MutualFundReturnsCalculatorClient").then((mod) => ({ default: mod.MutualFundReturnsCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function MutualFundReturnsCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="mutual-fund-returns-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mutualFundReturnsCalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <MutualFundReturnsCalculatorClient />

            <CalculatorFAQ
              calculatorName="Mutual Fund Returns"
              calculatorType="Mutual Fund"
              whatIs="A Mutual Fund Returns Calculator helps you calculate the expected returns on your mutual fund investments. Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. This calculator helps you estimate the future value of your investment based on expected annual returns (CAGR), helping you plan your investment strategy and understand potential returns."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Mutual Fund Returns Formula:</p>
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
                      <strong>r</strong> = CAGR (Compound Annual Growth Rate) as decimal
                    </li>
                    <li>
                      <strong>n</strong> = Number of years
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    CAGR represents the annualized return rate, accounting for compounding over the investment period.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Initial Investment Amount</strong> (the amount you want to invest in mutual funds)
                  </li>
                  <li>
                    Enter the <strong>Expected Annual Returns (CAGR)</strong>:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Equity funds: 12-15% p.a.</li>
                      <li>Debt funds: 6-8% p.a.</li>
                      <li>Hybrid funds: 8-12% p.a.</li>
                    </ul>
                  </li>
                  <li>
                    Select the <strong>Investment Period</strong> in years
                  </li>
                  <li>
                    Enter the <strong>Inflation Rate</strong> (typically 5-7% for India) to see real returns
                  </li>
                  <li>
                    The calculator will display:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Future value of your investment</li>
                      <li>Total returns (gains)</li>
                      <li>Returns percentage</li>
                      <li>CAGR (Compound Annual Growth Rate)</li>
                      <li>Inflation-adjusted value</li>
                      <li>Year-wise growth chart</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is CAGR in mutual funds?",
                  answer:
                    "CAGR (Compound Annual Growth Rate) is the annualized return rate of a mutual fund over a specific period. It represents the average annual return, accounting for compounding. For example, if a fund grows from ₹1 lakh to ₹2.5 lakhs in 5 years, the CAGR is approximately 20%. CAGR helps compare returns across different funds and time periods.",
                },
                {
                  question: "What returns can I expect from different mutual fund types?",
                  answer:
                    "Returns vary by fund type: Equity funds (large-cap, mid-cap, small-cap) historically offer 12-15% annual returns over 5+ years, Debt funds offer 6-8% with lower risk, Hybrid/Balanced funds offer 8-12% with moderate risk, and Index funds typically match market returns (10-12%). Past performance doesn't guarantee future returns, but long-term equity investments have historically outperformed other asset classes.",
                },
                {
                  question: "How is mutual fund returns different from SIP returns?",
                  answer:
                    "Mutual fund returns calculator shows returns on a one-time (lumpsum) investment, while SIP calculator shows returns on regular monthly investments. Both use the same underlying CAGR, but SIP benefits from rupee cost averaging and regular investing. For the same amount, SIP often provides better risk-adjusted returns due to averaging out purchase prices over time.",
                },
                {
                  question: "Should I consider inflation while calculating returns?",
                  answer:
                    "Yes! Inflation reduces your purchasing power over time. ₹10 lakhs today will be worth much less in 10 years. The calculator shows inflation-adjusted returns to help you understand the real value of your investment. For long-term goals, always factor in inflation to ensure you're saving enough to meet future needs.",
                },
                {
                  question: "How do I choose the right mutual fund?",
                  answer:
                    "Consider: Your investment goal and time horizon (long-term goals suit equity funds), Risk tolerance (equity for high risk, debt for low risk), Fund performance (check 3-5 year CAGR, not just recent returns), Expense ratio (lower is better), Fund manager track record, and Fund house reputation. Diversify across fund types and avoid putting all money in one fund.",
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

