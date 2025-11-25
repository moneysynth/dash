import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Personal Loan EMI Calculator - Calculate Personal Loan EMI Online Free | MoneySynth",
  description:
    "Free personal loan EMI calculator to calculate Equated Monthly Installment (EMI) for personal loans in India. Get detailed amortization schedule, interest breakdown, and payment schedule. Calculate personal loan EMI with accurate results.",
  keywords: [
    "personal loan calculator",
    "personal loan EMI calculator",
    "personal loan EMI",
    "personal loan calculator India",
    "EMI calculator personal loan",
    "personal loan EMI calculator India",
    "calculate personal loan EMI",
    "personal loan interest calculator",
    "personal loan amortization calculator",
    "personal loan EMI calculation",
    "personal loan payment calculator",
    "personal loan EMI formula",
    "personal loan calculator with amortization",
    "personal loan EMI schedule",
    "personal loan calculator free",
    "online personal loan calculator",
    "personal loan EMI calculator online",
    "unsecured loan calculator",
    "personal loan EMI calculator India",
    "personal loan calculator online free",
  ],
  openGraph: {
    title: "Personal Loan EMI Calculator - Calculate Personal Loan EMI Online Free | MoneySynth",
    description:
      "Free personal loan EMI calculator to calculate Equated Monthly Installment for personal loans with detailed amortization schedule and interest breakdown.",
    type: "website",
    url: "https://moneysynth.com/calculators/loans/personal-loan",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan EMI Calculator - Calculate Personal Loan EMI Online Free",
    description:
      "Free personal loan EMI calculator with amortization schedule. Calculate your personal loan EMI, total interest, and payment schedule.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/loans/personal-loan",
  },
};

// Dynamically import calculator component for route-based code splitting
const PersonalLoanCalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/PersonalLoanCalculatorClient").then((mod) => ({ default: mod.PersonalLoanCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const personalLoanCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Personal Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free personal loan EMI calculator to calculate Equated Monthly Installment for personal loans with amortization schedule.",
  featureList: [
    "Calculate Personal Loan EMI",
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

export default function PersonalLoanCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="personal-loan-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personalLoanCalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Personal Loan Calculator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Calculate your Equated Monthly Installment for personal loans
              </p>
            </div>

            <PersonalLoanCalculatorClient />

            <CalculatorFAQ
              calculatorName="Personal Loan"
              calculatorType="EMI"
              whatIs="A Personal Loan EMI Calculator helps you calculate the Equated Monthly Installment (EMI) for personal loans. Personal loans are unsecured loans that don't require collateral, making them popular for various needs like medical emergencies, weddings, home renovation, debt consolidation, or any personal expense. They typically have higher interest rates than secured loans but offer quick approval and flexible usage."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Personal Loan EMI Formula:</p>
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
                      <strong>N</strong> = Loan tenure in months (typically 12-60 months)
                    </li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter the <strong>Loan Amount</strong> you need
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate)
                  </li>
                  <li>
                    Select the <strong>Loan Tenure</strong> in years or months (typically 1-5 years)
                  </li>
                  <li>
                    Choose the <strong>EMI Payment Start Date</strong>
                  </li>
                  <li>
                    View your <strong>Monthly EMI</strong>, total interest payable, and complete amortization schedule
                  </li>
                  <li>
                    Analyze the breakdown to understand how much goes towards principal vs interest
                  </li>
                  <li>
                    Export results to <strong>XLSX</strong> or <strong>PDF</strong> for your records
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the typical interest rate for personal loans?",
                  answer:
                    "Personal loan interest rates typically range from 10% to 24% per annum, depending on your credit score, income, employment stability, and the lender. Lower credit scores result in higher interest rates. It's important to compare rates from multiple lenders before applying.",
                },
                {
                  question: "What factors affect personal loan eligibility?",
                  answer:
                    "Key factors include: Credit score (CIBIL score 750+ preferred), Monthly income, Employment stability, Existing debts and obligations, Age (typically 21-60 years), and Repayment capacity. Lenders assess these to determine your loan amount and interest rate.",
                },
                {
                  question: "Can I prepay my personal loan?",
                  answer:
                    "Yes, most lenders allow prepayment, but charges may apply. Some banks charge 2-4% of the outstanding principal as prepayment penalty, while others may offer free prepayment after a certain period. Always check prepayment terms before taking the loan.",
                },
                {
                  question: "What is the maximum loan amount I can get?",
                  answer:
                    "Personal loan amounts typically range from ₹10,000 to ₹40-50 lakhs, depending on your income and credit profile. Most lenders offer up to 10-20 times your monthly income. Higher income and better credit scores qualify for larger loan amounts.",
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

