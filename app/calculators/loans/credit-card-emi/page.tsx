import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Credit Card EMI Calculator - Calculate Credit Card EMI Online Free | MoneySynth",
  description:
    "Free credit card EMI calculator to calculate Equated Monthly Installment (EMI) for credit card outstanding amounts. Convert credit card balance to EMI, calculate interest, and get detailed payment schedule. Credit card EMI conversion calculator.",
  keywords: [
    "credit card EMI calculator",
    "credit card EMI",
    "credit card EMI conversion calculator",
    "credit card balance EMI calculator",
    "credit card EMI calculator India",
    "calculate credit card EMI",
    "credit card interest calculator",
    "credit card payment calculator",
    "credit card EMI conversion",
    "credit card outstanding EMI calculator",
    "credit card EMI schedule",
    "credit card EMI calculator online",
    "credit card EMI calculator free",
    "online credit card EMI calculator",
    "credit card EMI calculator India",
    "convert credit card to EMI",
    "credit card EMI interest rate",
    "credit card EMI tenure",
    "credit card EMI calculator with processing fee",
    "credit card EMI calculator online free",
  ],
  openGraph: {
    title: "Credit Card EMI Calculator - Calculate Credit Card EMI Online Free | MoneySynth",
    description:
      "Free credit card EMI calculator to convert credit card outstanding balance to EMI. Calculate monthly installments, interest, and payment schedule.",
    type: "website",
    url: "https://moneysynth.com/calculators/loans/credit-card-emi",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Card EMI Calculator - Calculate Credit Card EMI Online Free",
    description:
      "Free credit card EMI calculator. Convert credit card balance to EMI, calculate monthly installments and interest.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/loans/credit-card-emi",
  },
};

// Dynamically import calculator component for route-based code splitting
const CreditCardEMICalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/CreditCardEMICalculatorClient").then((mod) => ({ default: mod.CreditCardEMICalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const creditCardEMICalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Credit Card EMI Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free credit card EMI calculator to calculate Equated Monthly Installment for credit card outstanding amounts with amortization schedule.",
  featureList: [
    "Calculate Credit Card EMI",
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

export default function CreditCardEMICalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="credit-card-emi-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creditCardEMICalculatorSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Credit Card EMI Calculator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Calculate your Equated Monthly Installment for credit card outstanding amounts
              </p>
            </div>

            <CreditCardEMICalculatorClient />

            <CalculatorFAQ
              calculatorName="Credit Card EMI"
              calculatorType="EMI"
              whatIs="Credit Card EMI (Equated Monthly Installment) allows you to convert your credit card outstanding balance into fixed monthly installments. Instead of paying the minimum amount due (which incurs high interest), you can opt for EMI conversion which spreads your payment over a fixed tenure. This helps manage large credit card bills by converting them into affordable monthly payments, though it still involves interest charges."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Credit Card EMI Formula:</p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
                  </div>
                  <p className="text-sm">Where:</p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      <strong>P</strong> = Outstanding credit card amount
                    </li>
                    <li>
                      <strong>R</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>N</strong> = EMI tenure in months
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Note: Credit card interest rates are typically higher (24-48% p.a.) compared to other loans, so the EMI amount and total interest will be higher.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Outstanding Amount</strong> (the credit card balance you want to convert to EMI)
                  </li>
                  <li>
                    Enter the <strong>Interest Rate</strong> (annual percentage rate - typically 24-48% for credit cards)
                  </li>
                  <li>
                    Select the <strong>EMI Tenure</strong> in years or months (typically 6 months to 3 years)
                  </li>
                  <li>
                    Choose the <strong>EMI Payment Start Date</strong> (month and year)
                  </li>
                  <li>
                    The calculator will show your <strong>Monthly EMI</strong>, total interest, and complete amortization schedule
                  </li>
                  <li>
                    View the <strong>Amortization Schedule</strong> to see the breakdown of principal and interest for each payment
                  </li>
                  <li>
                    Export the schedule to <strong>XLSX</strong> or <strong>PDF</strong> for your records
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is credit card EMI conversion?",
                  answer:
                    "Credit card EMI conversion allows you to convert a large credit card purchase or outstanding balance into fixed monthly installments. Instead of paying the full amount immediately or just the minimum due (which incurs high interest), you can opt for EMI conversion. The bank converts your outstanding amount into a loan with fixed monthly payments over a chosen tenure.",
                },
                {
                  question: "What is the typical interest rate for credit card EMI?",
                  answer:
                    "Credit card EMI interest rates typically range from 24% to 48% per annum, which is much higher than personal loans or home loans. The exact rate depends on your bank, credit card type, and credit history. Some banks offer promotional rates (12-18%) for specific purchases or during festive seasons.",
                },
                {
                  question: "Should I convert credit card balance to EMI?",
                  answer:
                    "Converting to EMI is beneficial if: You have a large outstanding amount that's difficult to pay off immediately, You want predictable monthly payments, You can't afford to pay the full amount. However, consider: EMI still involves interest charges, It may be cheaper to take a personal loan (lower interest rates), Paying off the full amount immediately avoids all interest. Always compare the total interest cost before deciding.",
                },
                {
                  question: "What is the minimum tenure for credit card EMI?",
                  answer:
                    "Most banks offer credit card EMI tenure from 3 months to 60 months (5 years). The minimum tenure is usually 3-6 months, while the maximum can go up to 5 years depending on the bank and the purchase amount. Shorter tenures result in higher EMI but lower total interest, while longer tenures have lower EMI but higher total interest.",
                },
                {
                  question: "Are there any charges for credit card EMI conversion?",
                  answer:
                    "Yes, banks typically charge: Processing fee (usually 1-3% of the amount or a fixed fee), GST on processing fee, and Interest charges (24-48% p.a.). Some banks may waive processing fees during promotional periods. Always check with your bank about all applicable charges before converting to EMI.",
                },
                {
                  question: "Can I prepay credit card EMI?",
                  answer:
                    "Yes, most banks allow prepayment of credit card EMI, but charges may apply. Some banks charge a prepayment penalty (typically 2-4% of the outstanding amount), while others may allow free prepayment after a certain period. Prepaying reduces your interest burden, so it's often beneficial even with penalties. Check with your bank about prepayment terms.",
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

