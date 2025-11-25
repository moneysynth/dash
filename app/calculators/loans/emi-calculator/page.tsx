import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator - Calculate Home Loan EMI Online Free | MoneySynth",
  description:
    "Free home loan EMI calculator to calculate Equated Monthly Installment (EMI) for home loans in India. Get detailed amortization schedule, interest breakdown, yearly and monthly payment schedule. Calculate home loan EMI with accurate results.",
  keywords: [
    "home loan calculator",
    "home loan EMI calculator",
    "EMI calculator",
    "home loan EMI",
    "housing loan calculator",
    "home loan calculator India",
    "EMI calculator online",
    "home loan EMI calculator India",
    "calculate home loan EMI",
    "home loan interest calculator",
    "home loan amortization calculator",
    "home loan EMI calculation",
    "housing loan EMI calculator",
    "home loan payment calculator",
    "home loan EMI formula",
    "home loan calculator with amortization",
    "home loan EMI schedule",
    "home loan calculator free",
    "online home loan calculator",
    "home loan EMI calculator online",
  ],
  openGraph: {
    title: "Home Loan EMI Calculator - Calculate Home Loan EMI Online Free | MoneySynth",
    description:
      "Free home loan EMI calculator to calculate Equated Monthly Installment for home loans with detailed amortization schedule and interest breakdown.",
    type: "website",
    url: "https://moneysynth.com/calculators/loans/emi-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator - Calculate Home Loan EMI Online Free",
    description:
      "Free home loan EMI calculator with amortization schedule. Calculate your home loan EMI, total interest, and payment schedule.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/loans/emi-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const EMICalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/EMICalculatorClient").then((mod) => ({ default: mod.EMICalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const emiCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Home Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free home loan EMI calculator to calculate Equated Monthly Installment for home loans with amortization schedule.",
  featureList: [
    "Calculate Home Loan EMI",
    "Amortization Schedule",
    "Interest Breakdown",
    "Payment Schedule",
    "Yearly and Monthly Views",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

export default function EMICalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="emi-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(emiCalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Home Loan Calculator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Calculate your Equated Monthly Installment for home loans
              </p>
              <div className="mt-4">
                <Link href="/compare/loans/home-loan">
                  <Button variant="outline" size="sm">
                    Compare Scenarios
                  </Button>
                </Link>
              </div>
            </div>

            <EMICalculatorClient />

            <CalculatorFAQ
              calculatorName="Home Loan (EMI)"
              calculatorType="EMI"
              whatIs="EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is used to pay off both interest and principal each month, so that over a specified number of years, the loan is fully paid off along with all the interest."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">EMI Formula:</p>
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
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter the <strong>Loan Amount</strong> you wish to borrow
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate)
                  </li>
                  <li>
                    Select the <strong>Loan Tenure</strong> in years or months
                  </li>
                  <li>
                    Choose the <strong>EMI Payment Start Date</strong> (month and year)
                  </li>
                  <li>
                    The calculator will automatically compute your monthly EMI, total interest, and
                    provide a detailed amortization schedule
                  </li>
                  <li>
                    View the <strong>Amortization Schedule</strong> to see the breakdown of
                    principal and interest for each payment
                  </li>
                  <li>
                    Export the schedule to <strong>XLSX</strong> or <strong>PDF</strong> for your
                    records
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What factors affect EMI?",
                  answer:
                    "EMI is affected by three main factors: Principal amount (higher principal = higher EMI), Interest rate (higher rate = higher EMI), and Loan tenure (longer tenure = lower EMI but more total interest).",
                },
                {
                  question: "Can I prepay my loan?",
                  answer:
                    "Yes, most lenders allow prepayment. Prepaying reduces your principal amount, which can lower your EMI or reduce your loan tenure. Use our Advanced Home Loan Calculator to see how prepayments affect your loan.",
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

