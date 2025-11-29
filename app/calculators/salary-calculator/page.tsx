import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Salary Calculator - Take-home Pay Calculator",
  description:
    "Calculate your take-home salary after deductions. Includes PF, taxes, and other components for accurate planning.",
  keywords: [
    "salary calculator",
    "take home salary calculator",
    "CTC calculator",
    "net salary calculator",
    "salary calculator online",
    "salary calculator free",
    "calculate take home salary",
    "PF calculator salary",
    "HRA calculator",
    "salary breakdown calculator",
    "monthly salary calculator",
    "annual salary calculator",
    "salary calculator with deductions",
    "gross to net salary calculator",
    "salary calculator tool",
    "best salary calculator",
    "free salary calculator",
    "take home pay calculator",
    "salary planning calculator",
    "CTC to take home calculator",
    "salary structure calculator",
    "employee salary calculator",
  ],
  openGraph: {
    title: "Salary Calculator - Take-home Pay Calculator",
    description:
      "Calculate your take-home salary after deductions. Includes PF, taxes, and other components for accurate planning.",
    type: "website",
    url: "https://moneysynth.com/calculators/salary-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator - Take-home Pay Calculator",
    description:
      "Calculate your take-home salary after deductions. Includes PF, taxes, and other components for accurate planning.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/salary-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const SalaryCalculatorClient = dynamic(
  () => import("@/components/calculators/general-calculators/SalaryCalculatorClient").then((mod) => ({ default: mod.SalaryCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const salaryCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Salary Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Free online salary calculator to calculate your take-home salary. Calculate net salary after PF, professional tax, and other deductions.",
  url: "https://moneysynth.com/calculators/salary-calculator",
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <Script
        id="salary-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(salaryCalculatorSchema),
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SalaryCalculatorClient />

              <CalculatorFAQ
                calculatorName="Salary Calculator"
                calculatorType="General Calculator"
                whatIs="The Salary Calculator is a comprehensive tool that helps you calculate your take-home salary (net salary) from your Cost to Company (CTC). It calculates all the components of your salary including basic salary, HRA (House Rent Allowance), Provident Fund (PF), Gratuity, and Professional Tax. This calculator provides a detailed breakdown of your monthly and annual salary after all deductions."
                calculationFormula={
                  <div className="space-y-3">
                    <p className="font-semibold">Salary Calculation:</p>
                    <div className="space-y-2 rounded-lg bg-surface p-4 font-mono text-sm">
                      <div>Monthly CTC = Annual CTC ÷ 12</div>
                      <div>Basic Salary = Monthly CTC × Basic %</div>
                      <div>HRA = Basic Salary × HRA %</div>
                      <div>PF (Employee) = Min(Basic × 12%, ₹1,800)</div>
                      <div>Gratuity = Basic Salary × 4.81%</div>
                      <div>Net Salary = Gross Salary - PF - Professional Tax</div>
                    </div>
                    <p className="text-sm">Key Components:</p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li>
                        <strong>CTC:</strong> Cost to Company - your total annual compensation
                      </li>
                      <li>
                        <strong>Basic Salary:</strong> Core salary component (typically 40-50% of CTC)
                      </li>
                      <li>
                        <strong>HRA:</strong> House Rent Allowance - typically 40-50% of basic salary
                      </li>
                      <li>
                        <strong>PF:</strong> Provident Fund - 12% of basic (capped at ₹1,800/month)
                      </li>
                      <li>
                        <strong>Gratuity:</strong> 4.81% of basic salary (part of CTC, not deducted from salary)
                      </li>
                      <li>
                        <strong>Professional Tax:</strong> State-specific tax (typically ₹200/month)
                      </li>
                    </ul>
                  </div>
                }
                howToUse={
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      <strong>Enter Annual CTC:</strong> Enter your total Cost to Company (annual salary)
                    </li>
                    <li>
                      <strong>Set Basic Salary Percentage:</strong> Adjust the percentage of CTC that is basic salary (typically 40-50%)
                    </li>
                    <li>
                      <strong>Set HRA Percentage:</strong> Enter the percentage of basic salary that is HRA (typically 40-50%)
                    </li>
                    <li>
                      <strong>Set Professional Tax:</strong> Enter your monthly professional tax (typically ₹200, varies by state)
                    </li>
                    <li>
                      <strong>View Results:</strong> The calculator will display:
                      <ul className="ml-4 mt-1 list-disc space-y-1">
                        <li>Your monthly take-home salary</li>
                        <li>Gross salary breakdown (Basic, HRA, Allowances)</li>
                        <li>All deductions (PF, Professional Tax)</li>
                        <li>Annual salary breakdown</li>
                      </ul>
                    </li>
                  </ol>
                }
                additionalInfo={[
                  {
                    question: "What is CTC?",
                    answer:
                      "CTC (Cost to Company) is your total annual compensation package including all components like basic salary, allowances, PF, gratuity, and other benefits. It represents the total cost the company incurs for employing you.",
                  },
                  {
                    question: "What is Gratuity?",
                    answer:
                      "Gratuity is a retirement benefit paid by the employer. It's calculated as 4.81% of basic salary per month and is part of your CTC. Gratuity is not deducted from your monthly salary but is accumulated and paid when you leave the company after completing 5 years of service.",
                  },
                  {
                    question: "What is the PF contribution limit?",
                    answer:
                      "Employee Provident Fund (PF) contribution is 12% of basic salary, but it's capped at ₹1,800 per month. This means even if 12% of your basic is more than ₹1,800, you'll only contribute ₹1,800. The employer also contributes a matching amount.",
                  },
                  {
                    question: "What is Professional Tax?",
                    answer:
                      "Professional Tax is a state-level tax deducted from your salary. It varies by state, typically ranging from ₹0 to ₹500 per month. Most states charge around ₹200 per month.",
                  },
                  {
                    question: "How accurate is the salary calculator?",
                    answer:
                      "The calculator provides a good estimate of your take-home salary. However, actual salary may vary based on: specific company policies, additional allowances or deductions, state-specific professional tax rates, and other factors. Always refer to your salary slip for exact figures.",
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

