import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "RD Calculator - Recurring Deposit Calculator Online Free | MoneySynth",
  description:
    "Free RD calculator to calculate Recurring Deposit maturity value and returns. Calculate RD interest, maturity amount, and total investment. RD calculator for banks with monthly deposits.",
  keywords: [
    "RD calculator",
    "recurring deposit calculator",
    "RD calculator India",
    "recurring deposit calculator online",
    "RD maturity calculator",
    "RD interest calculator",
    "RD calculator free",
    "RD calculator India",
    "calculate RD returns",
    "RD calculator online",
    "recurring deposit maturity calculator",
    "RD calculator online free",
    "bank RD calculator",
    "RD calculator with interest",
    "RD calculator India",
    "recurring deposit calculator India",
    "RD calculator formula",
    "RD returns calculator",
    "monthly deposit calculator",
    "RD calculator monthly",
  ],
  openGraph: {
    title: "RD Calculator - Recurring Deposit Calculator Online Free | MoneySynth",
    description:
      "Free RD calculator to calculate Recurring Deposit maturity value and returns. Calculate RD interest and maturity amount.",
    type: "website",
    url: "https://moneysynth.com/calculators/rd-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RD Calculator - Recurring Deposit Calculator Online Free",
    description:
      "Free RD calculator. Calculate Recurring Deposit maturity value, interest, and returns with monthly deposits.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/rd-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const RDCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/RDCalculatorClient").then((mod) => ({ default: mod.RDCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function RDCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <RDCalculatorClient />

            <CalculatorFAQ
              calculatorName="RD"
              calculatorType="RD"
              whatIs="RD (Recurring Deposit) is a type of term deposit offered by banks and financial institutions where you deposit a fixed amount every month for a predetermined period. It's a safe investment option that offers guaranteed returns with low risk. RDs are ideal for disciplined savings and short to medium-term financial goals."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">RD Maturity Value Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    Maturity Value = P × [((1 + r)^n - 1) / r] × (1 + r)
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>P</strong> = Monthly deposit amount
                    </li>
                    <li>
                      <strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>n</strong> = Number of months (tenure)
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    The formula accounts for compound interest on each monthly deposit.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Monthly Deposit Amount</strong> (the fixed amount you'll deposit each month)
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate offered by the bank)
                  </li>
                  <li>
                    Select the <strong>Tenure</strong> in months (typically 6 months to 10 years)
                  </li>
                  <li>
                    The calculator will display:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Total amount deposited (Principal)</li>
                      <li>Total interest earned</li>
                      <li>Maturity value (Principal + Interest)</li>
                      <li>Year-wise breakdown</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the minimum and maximum tenure for RD?",
                  answer:
                    "Most banks offer RD tenure from 6 months to 10 years. The minimum deposit amount varies by bank, typically starting from ₹100-500 per month. Maximum tenure can go up to 10 years, but interest rates may vary based on tenure.",
                },
                {
                  question: "Are RD returns taxable?",
                  answer:
                    "Yes, interest earned on RD is fully taxable as per your income tax slab. TDS (Tax Deducted at Source) of 10% is deducted if interest exceeds ₹40,000 per year (₹50,000 for senior citizens). You can submit Form 15G/15H to avoid TDS if your total income is below the taxable limit.",
                },
                {
                  question: "Can I withdraw RD before maturity?",
                  answer:
                    "Yes, but premature withdrawal usually attracts a penalty (typically 0.5-1% reduction in interest rate). Some banks allow partial withdrawals, but terms vary. It's best to check with your bank about their specific RD withdrawal policies.",
                },
                {
                  question: "RD vs FD: Which is better?",
                  answer:
                    "RD is better if you want to save regularly in small amounts. FD is better if you have a lump sum to invest. RD helps build discipline, while FD typically offers slightly higher interest rates for lump sum investments. Choose based on your cash flow and savings pattern.",
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

