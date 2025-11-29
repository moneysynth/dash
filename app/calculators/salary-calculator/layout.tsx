import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator - Take-home Pay Calculator",
  description:
    "Calculate your take-home salary after deductions. Includes PF, taxes, and other components for accurate planning.",
  keywords: [
    "salary calculator",
    "take home salary calculator",
    "salary calculator India",
    "CTC calculator",
    "net salary calculator",
    "salary calculator online",
    "salary calculator free",
    "calculate take home salary",
  ],
  openGraph: {
    title: "Salary Calculator - Take-home Pay Calculator",
    description:
      "Calculate your take-home salary after deductions. Includes PF, taxes, and other components for accurate planning.",
    url: "https://moneysynth.com/calculators/salary-calculator",
    siteName: "MoneySynth",
    type: "website",
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

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

