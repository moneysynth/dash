import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorFAQ } from "@/components/calculators/common/CalculatorFAQ";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";

export const metadata: Metadata = {
  title: "Step-up SIP Calculator - Calculate Step-up SIP Returns Online Free | MoneySynth",
  description:
    "Free step-up SIP calculator to calculate returns for SIP with annual step-up increases. Calculate step-up SIP maturity value, total investment, and returns. Step-up SIP calculator for mutual funds.",
  keywords: [
    "step up SIP calculator",
    "step-up SIP calculator",
    "step up SIP calculator India",
    "step-up SIP returns calculator",
    "step up SIP calculator online",
    "calculate step up SIP",
    "step up SIP calculator free",
    "step-up SIP calculator India",
    "step up SIP investment calculator",
    "step up SIP calculator mutual fund",
    "step up SIP calculator online free",
    "increasing SIP calculator",
    "step up SIP calculator with returns",
    "step up SIP calculator India",
    "step up SIP calculator formula",
    "step up SIP returns calculator",
    "step up SIP calculator online India",
    "annual step up SIP calculator",
    "step up SIP vs regular SIP",
    "step up SIP calculator growth",
  ],
  openGraph: {
    title: "Step-up SIP Calculator - Calculate Step-up SIP Returns Online Free | MoneySynth",
    description:
      "Free step-up SIP calculator to calculate returns for SIP with annual step-up increases. Calculate step-up SIP maturity value and returns.",
    type: "website",
    url: "https://moneysynth.com/calculators/investments/step-up-sip-calculator",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Step-up SIP Calculator - Calculate Step-up SIP Returns Online Free",
    description:
      "Free step-up SIP calculator. Calculate returns for SIP with annual increases, maturity value, and investment growth.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/investments/step-up-sip-calculator",
  },
};

// Dynamically import calculator component for route-based code splitting
const StepUpSIPCalculatorClient = dynamic(
  () => import("@/components/calculators/investment-calculators/StepUpSIPCalculatorClient").then((mod) => ({ default: mod.StepUpSIPCalculatorClient })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export default function StepUpSIPCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Step-up SIP Calculator
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Calculate returns for SIP with annual step-up increases
              </p>
            </div>

            <StepUpSIPCalculatorClient />

            <CalculatorFAQ
              calculatorName="Step-up SIP"
              calculatorType="Step-up SIP"
              whatIs="Step-up SIP (Systematic Investment Plan) is an advanced SIP strategy where your monthly investment amount increases annually by a fixed percentage. This is ideal for individuals whose income grows over time. Step-up SIP helps you invest more as you earn more, accelerating wealth creation while maintaining financial discipline. It's perfect for young professionals who expect salary increments."
              calculationFormula={
                <div className="space-y-3">
                  <p className="font-semibold">Step-up SIP Calculation:</p>
                  <p className="text-sm">
                    The calculation accounts for increasing SIP amounts each year:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      Year 1: Invest <strong>P</strong> per month
                    </li>
                    <li>
                      Year 2: Invest <strong>P × (1 + stepUpRate)</strong> per month
                    </li>
                    <li>
                      Year 3: Invest <strong>P × (1 + stepUpRate)²</strong> per month
                    </li>
                    <li>
                      And so on...
                    </li>
                  </ul>
                  <p className="text-sm mt-2">
                    Each year's SIP amount is calculated using the standard SIP formula, then summed up for total maturity value.
                  </p>
                </div>
              }
              howToUse={
                <ol className="ml-6 list-decimal space-y-2 text-sm">
                  <li>
                    Enter your <strong>Initial Monthly SIP Amount</strong> (starting investment)
                  </li>
                  <li>
                    Enter the <strong>Annual Step-up Rate</strong> (percentage increase each year, e.g., 10% means your SIP increases by 10% annually)
                  </li>
                  <li>
                    Enter the <strong>Expected Annual Return Rate</strong>
                  </li>
                  <li>
                    Select the <strong>Investment Tenure</strong> in years
                  </li>
                  <li>
                    The calculator shows:
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Total amount invested over the period</li>
                      <li>Final maturity value</li>
                      <li>Wealth gain (returns)</li>
                      <li>Year-wise breakdown showing increasing SIP amounts</li>
                      <li>Growth visualization</li>
                    </ul>
                  </li>
                </ol>
              }
              additionalInfo={[
                {
                  question: "What is a good step-up rate?",
                  answer:
                    "A step-up rate of 10-15% annually is reasonable and aligns with typical salary increments. You can match it to your expected income growth. Even a 5% step-up can significantly boost your returns compared to a regular SIP. Choose a rate you can sustain without straining your finances.",
                },
                {
                  question: "How does step-up SIP compare to regular SIP?",
                  answer:
                    "Step-up SIP typically generates 20-30% higher returns than regular SIP over the same period, assuming the same initial amount and returns. This is because you're investing more over time, benefiting from compounding on larger amounts. It's an excellent way to grow your investments as your income grows.",
                },
                {
                  question: "Can I change the step-up rate later?",
                  answer:
                    "Yes, most mutual fund platforms allow you to modify your step-up SIP settings. You can increase, decrease, or pause the step-up based on your financial situation. However, it's best to set a realistic rate from the start to maintain consistency.",
                },
                {
                  question: "When should I start a step-up SIP?",
                  answer:
                    "Start as early as possible! Step-up SIP is especially beneficial for young professionals who expect career growth. Even if you start with a small amount, the step-up feature ensures your investments grow with your income. The power of compounding combined with increasing investments creates significant wealth over time.",
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

