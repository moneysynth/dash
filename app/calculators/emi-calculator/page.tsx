import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator - With Prepayment & Part Payment | MoneySynth",
  description:
    "Free home loan EMI calculator with prepayment and part payment options. Calculate Equated Monthly Installment (EMI) for home loans in India. Get detailed amortization schedule, interest breakdown, and see how prepayments affect your loan. Calculate home loan EMI with accurate results.",
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
    "home loan calculator with prepayment",
    "home loan prepayment calculator",
    "home loan part payment calculator",
    "home loan calculator with part payment",
    "home loan EMI calculator with prepayment",
    "home loan prepayment impact calculator",
    "home loan calculator reduce EMI",
    "home loan calculator reduce tenure",
    "home loan prepayment savings calculator",
    "advanced home loan calculator",
  ],
  openGraph: {
    title: "Home Loan EMI Calculator - With Prepayment & Part Payment | MoneySynth",
    description:
      "Free home loan EMI calculator with prepayment and part payment options. Calculate Equated Monthly Installment for home loans with detailed amortization schedule, interest breakdown, and prepayment impact analysis.",
    type: "website",
    url: "https://moneysynth.com/calculators/emi-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator - With Prepayment & Part Payment",
    description:
      "Free home loan EMI calculator with prepayment options. Calculate your home loan EMI, total interest, payment schedule, and see how prepayments save money.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/emi-calculator",
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
    "Free home loan EMI calculator to calculate Equated Monthly Installment for home loans with amortization schedule, prepayment options, and part payment analysis.",
  featureList: [
    "Calculate Home Loan EMI",
    "Amortization Schedule",
    "Interest Breakdown",
    "Payment Schedule",
    "Yearly and Monthly Views",
    "Part Payment & Prepayment Options",
    "Interest Savings Calculator",
    "Scenario Comparison",
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
            <EMICalculatorClient />

            <CalculatorFAQ
              calculatorName="Home Loan (EMI)"
              calculatorType="EMI"
              whatIs="EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is used to pay off both interest and principal each month, so that over a specified number of years, the loan is fully paid off along with all the interest. This calculator also supports part payments and prepayments, allowing you to see how additional payments affect your loan tenure, EMI amount, and total interest paid."
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
                    Add <strong>Part Payments</strong> (optional) by clicking "Add Part Payment":
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Enter the payment amount</li>
                      <li>Select the payment date (month number)</li>
                      <li>Choose payment type: One-time or Recurring</li>
                    </ul>
                  </li>
                  <li>
                    View the <strong>Amortization Schedule</strong> to see the breakdown of
                    principal and interest for each payment, including prepayments
                  </li>
                  <li>
                    Check the <strong>Savings from Part Payments</strong> to see how much interest you save
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
                  question: "How do part payments affect my loan?",
                  answer:
                    "Part payments (prepayments) reduce your outstanding principal, which can lower your EMI or reduce your loan tenure. When you make a part payment, the calculator automatically recalculates your EMI based on the remaining principal and tenure. This results in significant interest savings over the loan period.",
                },
                {
                  question: "Should I reduce EMI or reduce tenure with prepayments?",
                  answer:
                    "Reducing tenure saves more interest in the long run, while reducing EMI improves your monthly cash flow. If you can afford the current EMI, reducing tenure is financially better. If you need more monthly liquidity, reducing EMI is the better option.",
                },
                {
                  question: "When is the best time to make part payments?",
                  answer:
                    "Early in the loan tenure is best, as most of your EMI goes towards interest initially. Making prepayments early maximizes interest savings. However, consider your other financial goals and emergency fund before making large prepayments.",
                },
                {
                  question: "Are there any charges for prepayment?",
                  answer:
                    "For floating rate home loans, prepayment is usually free. For fixed rate loans, some banks may charge a prepayment penalty (typically 2-4% of the prepaid amount). Always check with your lender about prepayment terms.",
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

