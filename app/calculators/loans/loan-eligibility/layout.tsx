import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator - Check Home Loan Eligibility Online | MoneySynth",
  description:
    "Calculate your loan eligibility based on income, existing obligations, and tenure. Get eligibility score, maximum loan amount, and personalized suggestions to improve eligibility.",
  keywords: [
    "loan eligibility calculator",
    "home loan eligibility calculator",
    "loan eligibility check",
    "home loan eligibility",
    "car loan eligibility calculator",
    "personal loan eligibility calculator",
    "loan eligibility based on income",
    "maximum loan amount calculator",
    "loan eligibility score",
    "home loan eligibility India",
    "loan eligibility check online",
    "housing loan eligibility calculator",
    "loan eligibility calculator India",
    "check loan eligibility",
  ],
  openGraph: {
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility | MoneySynth",
    description:
      "Check your loan eligibility instantly. Calculate maximum loan amount, eligibility score, and get suggestions to improve your eligibility.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Eligibility Calculator - Check Your Loan Eligibility | MoneySynth",
    description:
      "Calculate your loan eligibility based on income and existing obligations. Get eligibility score and suggestions.",
  },
  alternates: {
    canonical: "/calculators/loans/loan-eligibility",
  },
};

export default function LoanEligibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

