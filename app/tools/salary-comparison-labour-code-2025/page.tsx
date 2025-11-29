import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
// import { AdUnit } from "@/components/common/AdUnit";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Salary Comparison - New Labour Code 2025 Impact Calculator | MoneySynth",
  description:
    "Compare your current take-home salary with New Labour Code 2025 (50% basic salary mandate). See how the new labour code affects your salary structure, PF contributions, gratuity, and net take-home. Free salary comparison tool for understanding labour code 2025 impact.",
  keywords: [
    "labour code 2025",
    "new labour code",
    "labour code 2025 salary",
    "50% basic salary",
    "labour code 2025 calculator",
    "salary comparison labour code",
    "take home salary comparison",
    "labour code 2025 impact",
    "basic salary 50%",
    "labour code 2025 India",
    "salary calculator labour code",
    "new labour code salary impact",
    "labour code 2025 take home",
    "salary structure labour code",
    "PF contribution labour code",
    "gratuity labour code 2025",
    "salary comparison tool",
    "labour code 2025 calculator India",
    "50% basic salary calculator",
    "salary impact calculator",
  ],
  openGraph: {
    title: "Salary Comparison - New Labour Code 2025 Impact Calculator | MoneySynth",
    description:
      "Compare your current take-home salary with New Labour Code 2025 (50% basic salary mandate). See the impact on your salary structure and take-home pay.",
    type: "website",
    url: "https://moneysynth.com/tools/salary-comparison-labour-code-2025",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Comparison - New Labour Code 2025 Impact Calculator",
    description:
      "Compare your current salary with New Labour Code 2025 impact. See how 50% basic salary mandate affects your take-home pay.",
  },
  alternates: {
    canonical: "https://moneysynth.com/tools/salary-comparison-labour-code-2025",
  },
};

const salaryComparisonSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Salary Comparison - New Labour Code 2025",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
  url: "https://moneysynth.com/tools/salary-comparison-labour-code-2025",
};

// Dynamically import calculator component for route-based code splitting
const SalaryComparisonClient = dynamic(
  () =>
    import("@/components/calculators/general-calculators/SalaryComparisonClient").then((mod) => ({
      default: mod.SalaryComparisonClient,
    })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function SalaryComparisonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="salary-comparison-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(salaryComparisonSchema),
        }}
      />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Banner Ad - Top */}
            {/* <div className="mb-8 flex justify-center">
              <AdUnit size="728x90" />
            </div> */}

            <SalaryComparisonClient />

            {/* Banner Ad - Before FAQ */}
            {/* <div className="my-8 flex justify-center">
              <AdUnit size="728x90" />
            </div> */}

            <CalculatorFAQ
              calculatorName="Salary Comparison - New Labour Code 2025"
              calculatorType="Comparison Tool"
              whatIs="The Salary Comparison Tool for New Labour Code 2025 helps you understand how the new labour code regulations will impact your take-home salary. Under the New Labour Code 2025, basic salary must be at least 50% of gross salary (or CTC), which affects PF contributions, gratuity, and ultimately your net take-home salary. This tool compares your current salary structure with the new mandatory structure to show you the exact difference in take-home pay, PF contributions, and other components."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Salary Calculation (Both Scenarios):</p>
                  <p className="text-sm">
                    The calculation follows the same formula for both current and new scenarios:
                  </p>
                  <div className="rounded-lg bg-surface p-4 font-mono text-sm space-y-2">
                    <p>1. Gross Salary = Annual CTC ÷ 12</p>
                    <p>2. Employer PF = 12% of Basic Salary (min ₹1,800/month)</p>
                    <p>3. Gratuity = 4.81% of Basic Salary</p>
                    <p>4. Available for Salary = Gross Salary - Employer PF - Gratuity</p>
                    <p>5. Basic Salary = Available × Basic % (Current: User input, New: 50%)</p>
                    <p>6. HRA = Basic Salary × HRA %</p>
                    <p>7. Other Allowances = Available - Basic - HRA</p>
                    <p>8. Employee PF = 12% of Basic Salary (min ₹1,800/month)</p>
                    <p>9. Net Salary = Available - Employee PF - Professional Tax</p>
                  </div>
                  <p className="text-sm mt-2">
                    <strong>Key Difference:</strong> Under New Labour Code 2025, Basic Salary is
                    fixed at 50% of available salary, while in current scenario it can vary from
                    15-60% based on your company's structure.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    <strong>Enter Annual CTC:</strong> Input your current Cost to Company (CTC)
                    amount
                  </li>
                  <li>
                    <strong>Enter Current Basic Salary %:</strong> Enter your current basic salary
                    percentage (typically 15-60%, often around 40%)
                  </li>
                  <li>
                    <strong>Enter HRA %:</strong> Enter your House Rent Allowance percentage (typically 40-50% of basic salary)
                  </li>
                  <li>
                    <strong>Enter Professional Tax:</strong> Enter your monthly professional tax (typically ₹200/month, varies by state)
                  </li>
                  <li>
                    <strong>View Comparison:</strong> The tool automatically calculates and displays:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Current scenario with your basic salary percentage</li>
                      <li>New Labour Code 2025 scenario with 50% basic salary</li>
                      <li>Side-by-side comparison of all components</li>
                      <li>Impact summary showing the difference</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Analyze Impact:</strong> Review the impact summary to see:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Change in monthly take-home salary</li>
                      <li>Change in PF contributions (employee and employer)</li>
                      <li>Change in gratuity</li>
                      <li>Annual impact on your finances</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is New Labour Code 2025?",
                  answer:
                    "The New Labour Code 2025 (also known as the Code on Wages, 2019) mandates that basic salary must be at least 50% of gross salary or CTC. This regulation aims to ensure better social security benefits for employees by increasing PF contributions and gratuity, which are calculated based on basic salary. The code consolidates multiple labour laws into simplified codes for better compliance and employee protection.",
                },
                {
                  question: "How does 50% basic salary affect my take-home salary?",
                  answer:
                    "The impact depends on your current basic salary percentage. If your current basic is less than 50%, your basic salary will increase, leading to higher PF contributions (both employee and employer) and gratuity. This typically results in a lower take-home salary but higher retirement benefits. If your current basic is already 50% or more, there may be minimal impact. The tool shows you the exact difference based on your current structure.",
                },
                {
                  question: "Why does take-home salary decrease under New Labour Code 2025?",
                  answer:
                    "When basic salary increases to 50%, PF contributions (12% of basic) and gratuity (4.81% of basic) also increase. Since PF is deducted from your salary, a higher basic salary means higher PF deduction, resulting in lower take-home. However, this also means higher employer PF contribution and gratuity, which are part of your CTC and provide better long-term benefits. The trade-off is lower immediate take-home for better retirement security.",
                },
                {
                  question: "What are the benefits of higher basic salary?",
                  answer:
                    "Higher basic salary provides several benefits: (1) Higher PF contributions - both employee and employer contributions increase, building a larger retirement corpus, (2) Higher gratuity - gratuity is calculated as 4.81% of basic salary, so you get more gratuity on retirement, (3) Better loan eligibility - banks consider basic salary for loan approvals, (4) Higher ESI benefits (if applicable), (5) Better long-term financial security through increased retirement savings.",
                },
                {
                  question: "When will New Labour Code 2025 be implemented?",
                  answer:
                    "The New Labour Code 2025 has been passed by the Indian Parliament and is expected to be implemented in phases. The exact implementation date may vary by state and industry. Companies are required to restructure salary components to comply with the 50% basic salary mandate. It's advisable to prepare for this change and understand its impact on your finances using tools like this calculator.",
                },
                {
                  question: "Can I negotiate with my employer about salary structure?",
                  answer:
                    "While the 50% basic salary is mandatory under the new code, you can discuss with your employer about: (1) Overall CTC adjustment to maintain similar take-home, (2) Timing of implementation, (3) Transition plans, (4) Understanding the long-term benefits. However, the basic salary percentage itself must comply with the 50% mandate. The code is designed to protect employee interests through better social security benefits.",
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

