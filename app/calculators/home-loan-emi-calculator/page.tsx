import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator - Mortgage Calculator",
  description:
    "Calculate your home loan EMI with principal, interest, and tenure. Compare different home loan scenarios instantly.",
  keywords: [
    "home loan calculator",
    "home loan EMI calculator",
    "mortgage calculator",
    "home loan EMI",
    "housing loan calculator",
    "EMI calculator online",
    "calculate home loan EMI",
    "home loan interest calculator",
    "home loan amortization calculator",
    "home loan EMI calculation",
    "housing loan EMI calculator",
    "home loan payment calculator",
    "home loan EMI formula",
    "home loan calculator with amortization",
    "home loan calculator with step-up EMI",
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
    "home loan step up EMI calculator",
    "step up EMI calculator",
    "home loan calculator with step up EMI",
    "increasing EMI calculator",
    "home loan EMI step up",
    "mortgage EMI calculator",
    "home loan planning",
    "best home loan calculator",
    "free home loan calculator",
    "home loan EMI calculator with prepayment",
    "home loan EMI calculator with part payment",
    "home loan EMI calculator with step-up EMI and prepayment",
    "home loan EMI calculator with step-up EMI and part payment",
    "home loan EMI calculator with step-up EMI and prepayment and part payment",
    "home loan EMI calculator with step-up EMI and prepayment and part payment",
  ],
  openGraph: {
    title: "Home Loan EMI Calculator - Mortgage Calculator",
    description:
      "Calculate your home loan EMI with principal, interest, and tenure. Compare different home loan scenarios instantly.",
    type: "website",
    url: "https://moneysynth.com/calculators/home-loan-emi-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Calculator - Mortgage Calculator",
    description:
      "Calculate your home loan EMI with principal, interest, and tenure. Compare different home loan scenarios instantly.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/home-loan-emi-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const EMICalculatorClient = dynamic(
  () => import("@/components/calculators/loan-calculators/EMICalculatorClient").then((mod) => ({ default: mod.EMICalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const homeLoanEMICalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Home Loan EMI Calculator",
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
    "Step-up EMI (Increasing EMI)",
    "Part Payment & Prepayment Options",
    "Interest Savings Calculator",
    "Scenario Comparison",
  ],
};

export default function HomeLoanEMICalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="home-loan-emi-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeLoanEMICalculatorSchema),
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
              whatIs="EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is used to pay off both interest and principal each month, so that over a specified number of years, the loan is fully paid off along with all the interest. This calculator supports step-up EMI (where your EMI increases annually by a specified percentage), part payments, and prepayments, allowing you to see how increasing payments and additional payments affect your loan tenure, EMI amount, and total interest paid."
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
                    Enable <strong>Step-up EMI</strong> (optional) to increase your EMI annually by a specified percentage. This is ideal if your income increases over time.
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
                  question: "What is Step-up EMI?",
                  answer:
                    "Step-up EMI is a feature where your EMI increases by a specified percentage each year. This is beneficial if your income increases over time. By increasing your EMI annually, you pay off your loan faster, reduce the total interest paid, and shorten the loan tenure. For example, if you start with ₹50,000 EMI and set a 10% step-up rate, your EMI will be ₹55,000 in year 2, ₹60,500 in year 3, and so on.",
                },
                {
                  question: "How do part payments affect my loan?",
                  answer:
                    "Part payments (prepayments) reduce your outstanding principal, which can lower your EMI or reduce your loan tenure. When you make a part payment, the calculator automatically recalculates your EMI based on the remaining principal and tenure. This results in significant interest savings over the loan period.",
                },
                {
                  question: "Can I combine Step-up EMI with part payments?",
                  answer:
                    "Yes! You can use both step-up EMI and part payments together. Step-up EMI increases your regular payment annually, while part payments are one-time or recurring additional payments. Combining both strategies maximizes your interest savings and minimizes loan tenure.",
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

