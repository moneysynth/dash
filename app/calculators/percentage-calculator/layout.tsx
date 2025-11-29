import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentage Online Free | MoneySynth",
  description:
    "Free online percentage calculator to calculate percentages, percentage increase, decrease, and percentage of values. Calculate percentage of a number and percentage change.",
  keywords: [
    "percentage calculator",
    "calculate percentage",
    "percentage calculator online",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage of calculator",
    "percentage change calculator",
    "percentage calculator free",
    "percentage calculator India",
  ],
  openGraph: {
    title: "Percentage Calculator - Calculate Percentage Online Free | MoneySynth",
    description:
      "Free online percentage calculator to calculate percentages, percentage increase, decrease, and percentage of values. Calculate percentage of a number and percentage change.",
    url: "https://moneysynth.com/calculators/percentage-calculator",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Calculate Percentage Online Free",
    description:
      "Free online percentage calculator to calculate percentages, percentage increase, decrease, and percentage of values.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/percentage-calculator",
  },
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

