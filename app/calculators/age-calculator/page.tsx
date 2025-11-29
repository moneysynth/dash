import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age Online Free | MoneySynth",
  description:
    "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates, find total days lived, and know when your next birthday is. Simple and accurate age calculator tool.",
  keywords: [
    "age calculator",
    "calculate age",
    "age calculator online",
    "how old am I",
    "age calculator free",
    "calculate age from date of birth",
    "age calculator India",
    "birthday calculator",
    "age in days calculator",
    "age in months calculator",
    "exact age calculator",
    "age between dates calculator",
    "date of birth calculator",
    "age calculator tool",
    "online age calculator",
    "age calculator free online",
    "calculate my age",
    "age calculator with date",
    "age finder",
    "age calculator accurate",
  ],
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age Online Free | MoneySynth",
    description:
      "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates and find your next birthday.",
    type: "website",
    url: "https://moneysynth.com/calculators/age-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Calculate Your Exact Age Online Free",
    description:
      "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/age-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const AgeCalculatorClient = dynamic(
  () => import("@/components/calculators/general-calculators/AgeCalculatorClient").then((mod) => ({ default: mod.AgeCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const ageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Age Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates and find your next birthday.",
  url: "https://moneysynth.com/calculators/age-calculator",
};

export default function AgeCalculatorPage() {
  return (
    <>
      <Script
        id="age-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ageCalculatorSchema),
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <AgeCalculatorClient />

              <CalculatorFAQ
                calculatorName="Age Calculator"
                calculatorType="General Calculator"
                whatIs="The Age Calculator is a simple utility tool that helps you calculate your exact age or the age between any two dates. It provides your age in years, months, and days, along with total days lived and information about your next birthday. This tool is useful for various purposes like planning events, calculating eligibility for services, or simply knowing your exact age."
                calculationFormula={
                  <div className="space-y-3">
                    <p className="font-semibold">Age Calculation:</p>
                    <p className="text-sm">
                      Age is calculated by finding the difference between the birth date and the comparison date (or today's date if not specified).
                    </p>
                    <div className="rounded-lg bg-surface p-4 font-mono text-sm">
                      Age = Comparison Date - Birth Date
                    </div>
                    <p className="text-sm">The calculation considers:</p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>Years: Full years between the two dates</li>
                      <li>Months: Remaining months after accounting for full years</li>
                      <li>Days: Remaining days after accounting for full years and months</li>
                      <li>Total Days: Complete number of days between the dates</li>
                      <li>Total Months: Complete number of months between the dates</li>
                    </ul>
                  </div>
                }
                howToUse={
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      <strong>Enter Birth Date:</strong> Select your date of birth using the date picker
                    </li>
                    <li>
                      <strong>Optional - Compare Date:</strong> If you want to calculate age as of a specific date, enter that date. Leave it empty to calculate age as of today
                    </li>
                    <li>
                      <strong>View Results:</strong> The calculator will display:
                      <ul className="ml-4 mt-1 list-disc space-y-1">
                        <li>Your age in years, months, and days</li>
                        <li>Total days lived</li>
                        <li>Total months lived</li>
                        <li>Days until your next birthday</li>
                        <li>Date of your next birthday</li>
                      </ul>
                    </li>
                  </ol>
                }
                additionalInfo={[
                  {
                    question: "How accurate is the age calculator?",
                    answer:
                      "The age calculator is highly accurate and accounts for leap years, different month lengths, and time zones. It calculates the exact difference between two dates, giving you precise results in years, months, and days.",
                  },
                  {
                    question: "Can I calculate age between any two dates?",
                    answer:
                      "Yes! You can calculate the age or time difference between any two dates. Simply enter the birth date and a comparison date. This is useful for calculating the age of historical figures, planning events, or calculating time periods.",
                  },
                  {
                    question: "What if I enter a future birth date?",
                    answer:
                      "The calculator will not accept a birth date that is in the future. The birth date must be today or earlier. This ensures accurate age calculations.",
                  },
                  {
                    question: "How is the next birthday calculated?",
                    answer:
                      "The next birthday is calculated by finding the next occurrence of your birth month and day. If your birthday has already passed this year, it will show next year's birthday. If it hasn't passed yet, it will show this year's birthday.",
                  },
                  {
                    question: "Can I use this for calculating age of children?",
                    answer:
                      "Absolutely! This calculator works perfectly for calculating the age of children, showing their exact age in years, months, and days. It's especially useful for tracking milestones and development stages.",
                  },
                ]}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

