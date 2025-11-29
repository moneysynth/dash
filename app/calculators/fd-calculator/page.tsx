import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "FD Calculator - Fixed Deposit Returns Calculator",
  description:
    "Calculate fixed deposit maturity amount and interest income. Compare different FD tenure and interest rates.",
  keywords: [
    "FD calculator",
    "fixed deposit calculator",
    "fixed deposit calculator online",
    "FD maturity calculator",
    "FD interest calculator",
    "FD calculator free",
    "calculate FD returns",
    "FD calculator online",
    "fixed deposit maturity calculator",
    "FD calculator cumulative",
    "FD calculator non cumulative",
    "FD calculator online free",
    "bank FD calculator",
    "FD calculator with interest",
    "FD calculator formula",
    "FD returns calculator",
    "best FD calculator",
    "free FD calculator",
    "fixed deposit planning",
    "FD investment calculator",
    "FD interest rate calculator",
    "fixed deposit returns",
  ],
  openGraph: {
    title: "FD Calculator - Fixed Deposit Returns Calculator",
    description:
      "Calculate fixed deposit maturity amount and interest income. Compare different FD tenure and interest rates.",
    type: "website",
    url: "https://moneysynth.com/calculators/fd-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FD Calculator - Fixed Deposit Returns Calculator",
    description:
      "Calculate fixed deposit maturity amount and interest income. Compare different FD tenure and interest rates.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/fd-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const FDCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/FDCalculatorClient").then((mod) => ({ default: mod.FDCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function FDCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <FDCalculatorClient />

            <CalculatorFAQ
              calculatorName="FD"
              calculatorType="FD"
              whatIs="FD (Fixed Deposit) is a financial instrument offered by banks and NBFCs where you deposit a lump sum amount for a fixed period at a predetermined interest rate. FDs are one of the safest investment options in India, offering guaranteed returns and capital protection. They are ideal for conservative investors and short to medium-term financial goals."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">FD Maturity Value Formula:</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                      <p className="mb-2">For Cumulative (Reinvestment):</p>
                      <p>Maturity Value = P × (1 + r)^n</p>
                    </div>
                    <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                      <p className="mb-2">For Non-Cumulative (Payout):</p>
                      <p>Monthly Interest = (P × r) / 12</p>
                      <p className="mt-1">Maturity Value = Principal (unchanged)</p>
                    </div>
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>P</strong> = Principal amount
                    </li>
                    <li>
                      <strong>r</strong> = Annual interest rate (as decimal)
                    </li>
                    <li>
                      <strong>n</strong> = Number of years
                    </li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Principal Amount</strong> (the lump sum you want to invest)
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate)
                  </li>
                  <li>
                    Select the <strong>Tenure</strong> in years
                  </li>
                  <li>
                    Choose <strong>Payout Frequency</strong>:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li><strong>Cumulative:</strong> Interest reinvested, paid at maturity</li>
                      <li><strong>Monthly/Quarterly/Annual:</strong> Interest paid regularly</li>
                    </ul>
                  </li>
                  <li>
                    The calculator shows:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Maturity value or total returns</li>
                      <li>Interest earned</li>
                      <li>Year-wise breakdown</li>
                      <li>Effective yield</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the difference between cumulative and non-cumulative FD?",
                  answer:
                    "Cumulative FD reinvests interest, compounding your returns and giving higher maturity value. Non-cumulative FD pays interest regularly (monthly/quarterly/annually), providing regular income but lower overall returns due to no compounding.",
                },
                {
                  question: "Are FD returns taxable?",
                  answer:
                    "Yes, interest earned on FD is fully taxable as per your income tax slab. TDS of 10% is deducted if interest exceeds ₹40,000 per year (₹50,000 for senior citizens). You can submit Form 15G/15H to avoid TDS if your total income is below the taxable limit.",
                },
                {
                  question: "What happens if I break my FD early?",
                  answer:
                    "Premature withdrawal is allowed but usually attracts a penalty (typically 0.5-1% reduction in interest rate). The interest is calculated at the rate applicable for the period the FD was held, minus the penalty. Some banks may have minimum lock-in periods.",
                },
                {
                  question: "Which banks offer the best FD rates?",
                  answer:
                    "Small finance banks and NBFCs typically offer higher rates (7-8%+) compared to large banks (5-6%). However, consider factors like safety (deposit insurance up to ₹5 lakh), credibility, and service quality before choosing. Always check current rates as they change frequently.",
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

