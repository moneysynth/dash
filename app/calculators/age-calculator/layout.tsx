import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age Online Free | MoneySynth",
  description:
    "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates and find your next birthday.",
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
  ],
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age Online Free | MoneySynth",
    description:
      "Free online age calculator to calculate your exact age in years, months, and days. Calculate age between two dates and find your next birthday.",
    url: "https://moneysynth.com/calculators/age-calculator",
    siteName: "MoneySynth",
    type: "website",
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

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

