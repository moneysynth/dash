import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate % Increase",
  description:
    "Calculate percentage increase, decrease, and difference. Useful for financial calculations and data analysis.",
  keywords: [
    "percentage calculator",
    "calculate percentage",
    "percentage calculator online",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage of calculator",
    "percentage change calculator",
    "percentage calculator free",
    "calculate percentage of number",
    "percentage formula calculator",
    "percentage difference calculator",
    "percentage growth calculator",
    "percentage discount calculator",
    "percentage markup calculator",
    "percentage tool",
    "online percentage calculator",
    "percentage calculator free online",
    "calculate percentage increase",
    "calculate percentage decrease",
    "best percentage calculator",
    "free percentage calculator",
    "percentage calculator tool",
    "financial percentage calculator",
  ],
  openGraph: {
    title: "Percentage Calculator - Calculate % Increase",
    description:
      "Calculate percentage increase, decrease, and difference. Useful for financial calculations and data analysis.",
    type: "website",
    url: "https://moneysynth.com/calculators/percentage-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Calculate % Increase",
    description:
      "Calculate percentage increase, decrease, and difference. Useful for financial calculations and data analysis.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/percentage-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const PercentageCalculatorClient = dynamic(
  () => import("@/components/calculators/general-calculators/PercentageCalculatorClient").then((mod) => ({ default: mod.PercentageCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const percentageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Percentage Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free online percentage calculator to calculate percentages, percentage increase, decrease, and percentage of values. Calculate percentage of a number and percentage change.",
  url: "https://moneysynth.com/calculators/percentage-calculator",
};

export default function PercentageCalculatorPage() {
  return (
    <>
      <Script
        id="percentage-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(percentageCalculatorSchema),
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <PercentageCalculatorClient />

              <CalculatorFAQ
                calculatorName="Percentage Calculator"
                calculatorType="General Calculator"
                whatIs="The Percentage Calculator is a versatile utility tool that helps you perform various percentage calculations. It can calculate basic percentages (what is X% of Y), percentage increase (how much did a value increase), percentage decrease (how much did a value decrease), and percentage of (what percentage is X of Y). This tool is useful for calculations involving discounts, markups, growth rates, test scores, and many other percentage-related calculations."
                calculationFormula={
                  <div className="space-y-3">
                    <p className="font-semibold">Percentage Formulas:</p>
                    <div className="space-y-2 rounded-lg bg-surface p-4 font-mono text-sm">
                      <div>Basic: Result = (Value × Percentage) ÷ 100</div>
                      <div>Increase: % Change = ((New - Original) ÷ Original) × 100</div>
                      <div>Decrease: % Change = ((Original - New) ÷ Original) × 100</div>
                      <div>Percentage Of: % = (Part ÷ Whole) × 100</div>
                    </div>
                    <p className="text-sm">Where:</p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>
                        <strong>Basic:</strong> Calculates what a certain percentage of a value is
                      </li>
                      <li>
                        <strong>Increase:</strong> Calculates the percentage increase from original to new value
                      </li>
                      <li>
                        <strong>Decrease:</strong> Calculates the percentage decrease from original to new value
                      </li>
                      <li>
                        <strong>Percentage Of:</strong> Calculates what percentage one value is of another
                      </li>
                    </ul>
                  </div>
                }
                howToUse={
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      <strong>Select Calculation Type:</strong> Choose from Basic, Increase, Decrease, or % Of tabs
                    </li>
                    <li>
                      <strong>Enter Values:</strong> Based on the selected type:
                      <ul className="ml-4 mt-1 list-disc space-y-1">
                        <li>
                          <strong>Basic:</strong> Enter the value and percentage you want to calculate
                        </li>
                        <li>
                          <strong>Increase/Decrease:</strong> Enter the original value and new value
                        </li>
                        <li>
                          <strong>% Of:</strong> Enter the part value and whole value
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>View Results:</strong> The calculator will display the calculated percentage result along with an explanation
                    </li>
                    <li>
                      <strong>Adjust Values:</strong> Use sliders or input fields to adjust values and see results update in real-time
                    </li>
                  </ol>
                }
                additionalInfo={[
                  {
                    question: "What is a percentage?",
                    answer:
                      "A percentage is a way of expressing a number as a fraction of 100. It is denoted using the percent sign (%). For example, 50% means 50 out of 100, or half. Percentages are commonly used to express proportions, rates, and changes.",
                  },
                  {
                    question: "How do I calculate percentage increase?",
                    answer:
                      "To calculate percentage increase: Subtract the original value from the new value, divide the result by the original value, and multiply by 100. For example, if a price increases from ₹100 to ₹120, the percentage increase is ((120-100)/100) × 100 = 20%.",
                  },
                  {
                    question: "How do I calculate percentage decrease?",
                    answer:
                      "To calculate percentage decrease: Subtract the new value from the original value, divide the result by the original value, and multiply by 100. For example, if a price decreases from ₹100 to ₹80, the percentage decrease is ((100-80)/100) × 100 = 20%.",
                  },
                  {
                    question: "What is the difference between percentage increase and decrease?",
                    answer:
                      "Percentage increase shows how much a value has grown (positive change), while percentage decrease shows how much a value has reduced (negative change). Both use the same formula but the direction of change determines whether it's an increase or decrease.",
                  },
                  {
                    question: "Can I use this calculator for discounts and markups?",
                    answer:
                      "Yes! This calculator is perfect for calculating discounts (percentage decrease) and markups (percentage increase). For discounts, use the Decrease tab. For markups, use the Increase tab. You can also use the Basic tab to calculate the discounted or marked-up amount.",
                  },
                  {
                    question: "How accurate are the calculations?",
                    answer:
                      "The percentage calculator provides highly accurate results with decimal precision. All calculations follow standard mathematical formulas and account for rounding where appropriate. Results are displayed with appropriate decimal places for clarity.",
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

