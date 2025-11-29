import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SIP Calculator - Mutual Fund SIP Returns",
  description:
    "Calculate potential returns from SIP investments in mutual funds. Plan your systematic investment strategy effectively.",
  keywords: [
    "SIP calculator",
    "SIP returns calculator",
    "mutual fund SIP calculator",
    "SIP maturity calculator",
    "SIP calculator online",
    "calculate SIP returns",
    "SIP investment calculator",
    "SIP calculator free",
    "SIP calculator mutual fund",
    "SIP calculator online free",
    "SIP calculator with returns",
    "systematic investment plan calculator",
    "SIP calculator growth",
    "SIP calculator maturity value",
    "SIP calculator formula",
    "SIP calculator returns",
    "best SIP calculator",
    "free SIP calculator",
    "SIP investment planning",
    "mutual fund SIP returns",
    "SIP calculator tool",
    "calculate SIP maturity",
    "SIP wealth calculator",
  ],
  openGraph: {
    title: "SIP Calculator - Mutual Fund SIP Returns",
    description:
      "Calculate potential returns from SIP investments in mutual funds. Plan your systematic investment strategy effectively.",
    type: "website",
    url: "https://moneysynth.com/calculators/sip-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator - Mutual Fund SIP Returns",
    description:
      "Calculate potential returns from SIP investments in mutual funds. Plan your systematic investment strategy effectively.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/sip-calculator",
  },
};

const sipCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SIP Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free SIP calculator to calculate Systematic Investment Plan returns with maturity value and growth charts.",
  featureList: [
    "Calculate SIP Returns",
    "Maturity Value Calculation",
    "Total Investment Tracking",
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
const SIPCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/SIPCalculatorClient").then((mod) => ({ default: mod.SIPCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function SIPCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="sip-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sipCalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SIPCalculatorClient />

            <CalculatorFAQ
              calculatorName="SIP"
              calculatorType="SIP"
              whatIs="SIP (Systematic Investment Plan) is an investment method where you invest a fixed amount regularly (usually monthly) in mutual funds. SIP allows you to invest small amounts periodically, benefiting from rupee cost averaging and the power of compounding. It's one of the most popular ways to invest in mutual funds in India."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">SIP Maturity Value Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    FV = P × [((1 + r)^n - 1) / r] × (1 + r)
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>FV</strong> = Future Value (Maturity Amount)
                    </li>
                    <li>
                      <strong>P</strong> = Monthly SIP amount
                    </li>
                    <li>
                      <strong>r</strong> = Monthly rate of return (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>n</strong> = Number of months
                    </li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Monthly SIP Amount</strong> (the fixed amount you want to
                    invest each month)
                  </li>
                  <li>
                    Enter the <strong>Expected Annual Return Rate</strong> (historical average for
                    equity funds is 12-15% p.a.)
                  </li>
                  <li>
                    Select the <strong>Investment Tenure</strong> in years
                  </li>
                  <li>
                    The calculator will show your <strong>Total Investment</strong>,{" "}
                    <strong>Estimated Returns</strong>, and <strong>Maturity Value</strong>
                  </li>
                  <li>
                    View the <strong>Growth Chart</strong> to see how your investment grows over
                    time
                  </li>
                  <li>
                    Analyze the <strong>Year-wise Breakdown</strong> to understand your investment
                    progression
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is rupee cost averaging?",
                  answer:
                    "Rupee cost averaging is a strategy where you invest a fixed amount regularly regardless of market conditions. When prices are high, you buy fewer units, and when prices are low, you buy more units. This averages out your purchase cost over time.",
                },
                {
                  question: "What returns can I expect from SIP?",
                  answer:
                    "Returns vary based on the type of mutual fund. Equity funds historically offer 12-15% annual returns over long periods (5+ years), while debt funds offer 6-8%. Past performance doesn't guarantee future returns, but SIPs help mitigate market volatility through regular investing.",
                },
                {
                  question: "When should I start a SIP?",
                  answer:
                    "The best time to start a SIP is now! Starting early gives you the advantage of compounding. Even small amounts invested regularly can grow significantly over time. Remember: Time in the market is more important than timing the market.",
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

