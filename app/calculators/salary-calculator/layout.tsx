import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator - Calculate Take-Home Salary Online Free | MoneySynth",
  description:
    "Free online salary calculator to calculate your take-home salary in India. Calculate net salary after tax, PF, professional tax, and other deductions.",
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
    title: "Salary Calculator - Calculate Take-Home Salary Online Free | MoneySynth",
    description:
      "Free online salary calculator to calculate your take-home salary in India. Calculate net salary after tax, PF, professional tax, and other deductions.",
    url: "https://moneysynth.com/calculators/salary-calculator",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator - Calculate Take-Home Salary Online Free",
    description:
      "Free online salary calculator to calculate your take-home salary in India. Calculate net salary after tax, PF, and other deductions.",
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

