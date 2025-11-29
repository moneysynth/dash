import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator - Calculate Car Loan EMI Online Free | MoneySynth",
  description:
    "Free car loan EMI calculator to calculate Equated Monthly Installment (EMI) for car loans in India. Get detailed amortization schedule, interest breakdown, and payment schedule. Calculate car loan EMI, auto loan EMI with accurate results.",
  keywords: [
    "car loan calculator",
    "car loan EMI calculator",
    "car loan EMI",
    "auto loan calculator",
    "car loan calculator India",
    "EMI calculator car loan",
    "car loan EMI calculator India",
    "calculate car loan EMI",
    "car loan interest calculator",
    "car loan amortization calculator",
    "car loan EMI calculation",
    "auto loan EMI calculator",
    "car loan payment calculator",
    "car loan EMI formula",
    "car loan calculator with amortization",
    "car loan EMI schedule",
    "car loan calculator free",
    "online car loan calculator",
    "car loan EMI calculator online",
    "vehicle loan calculator",
    "car loan calculator India",
    "auto loan EMI calculator India",
  ],
  openGraph: {
    title: "Car Loan EMI Calculator - Calculate Car Loan EMI Online Free | MoneySynth",
    description:
      "Free car loan EMI calculator to calculate Equated Monthly Installment for car loans with detailed amortization schedule and interest breakdown.",
    type: "website",
    url: "https://moneysynth.com/calculators/car-loan",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Loan EMI Calculator - Calculate Car Loan EMI Online Free",
    description:
      "Free car loan EMI calculator with amortization schedule. Calculate your car loan EMI, total interest, and payment schedule.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/car-loan",
  },
};

// Dynamically import calculator component for route-based code splitting
const CarLoanCalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/CarLoanCalculatorClient").then((mod) => ({ default: mod.CarLoanCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const carLoanCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Car Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free car loan EMI calculator to calculate Equated Monthly Installment for car loans with amortization schedule.",
  featureList: [
    "Calculate Car Loan EMI",
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

export default function CarLoanCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="car-loan-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(carLoanCalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CarLoanCalculatorClient />

            <CalculatorFAQ
              calculatorName="Car Loan"
              calculatorType="EMI"
              whatIs="A Car Loan EMI Calculator helps you calculate the Equated Monthly Installment (EMI) for your car loan. Car loans are typically secured loans where the vehicle itself serves as collateral. They usually have shorter tenures (3-7 years) compared to home loans and offer competitive interest rates. This calculator helps you plan your car purchase by showing your monthly payment obligations and total interest cost."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Car Loan EMI Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>P</strong> = Principal loan amount (car price - down payment)
                    </li>
                    <li>
                      <strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>N</strong> = Loan tenure in months (typically 36-84 months)
                    </li>
                  </ul>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter the <strong>Loan Amount</strong> (car price minus your down payment)
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate offered by the lender)
                  </li>
                  <li>
                    Select the <strong>Loan Tenure</strong> in years or months (typically 3-7 years)
                  </li>
                  <li>
                    Choose the <strong>EMI Payment Start Date</strong>
                  </li>
                  <li>
                    View your <strong>Monthly EMI</strong>, total interest, and amortization schedule
                  </li>
                  <li>
                    Export the schedule to <strong>XLSX</strong> or <strong>PDF</strong> for documentation
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is the typical interest rate for car loans?",
                  answer:
                    "Car loan interest rates typically range from 7% to 15% per annum, depending on factors like your credit score, loan amount, tenure, and the lender. New car loans usually have lower rates than used car loans. Banks and NBFCs offer competitive rates, so it's wise to compare before choosing.",
                },
                {
                  question: "How much down payment should I make?",
                  answer:
                    "Most lenders require a minimum down payment of 10-20% of the car's value. A higher down payment reduces your loan amount, resulting in lower EMI and less interest. However, consider your other financial commitments and emergency fund before making a large down payment.",
                },
                {
                  question: "Can I prepay my car loan?",
                  answer:
                    "Yes, most lenders allow prepayment, but some may charge a prepayment penalty (typically 2-4% of the outstanding amount). Prepaying reduces your interest burden. Check with your lender about prepayment terms before taking the loan.",
                },
                {
                  question: "What documents are needed for a car loan?",
                  answer:
                    "Typically required documents include: Identity proof (Aadhaar, PAN), Address proof, Income proof (salary slips, IT returns), Bank statements (3-6 months), and vehicle-related documents. Requirements may vary by lender.",
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

