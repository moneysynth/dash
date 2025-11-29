import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Calculator - Calculate Home Loan EMI Online | MoneySynth",
  description:
    "Free home loan EMI calculator to calculate Equated Monthly Installment for home loans. Get amortization schedule, interest breakdown, and payment schedule. Calculate home loan EMI online instantly.",
  keywords: [
    "home loan calculator",
    "home loan EMI calculator",
    "housing loan calculator",
    "home loan EMI",
    "home loan EMI calculation",
    "monthly home loan EMI calculator",
    "home loan calculator India",
    "home loan calculator with amortization",
    "housing loan EMI calculator",
    "calculate home loan EMI online",
    "home loan EMI formula calculator",
    "home loan repayment calculator",
  ],
  openGraph: {
    title: "Home Loan Calculator - Calculate Home Loan EMI Online | MoneySynth",
    description:
      "Calculate your Equated Monthly Installment (EMI) for home loans. Get detailed amortization schedule and payment breakdown.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan Calculator - Calculate Home Loan EMI Online | MoneySynth",
    description:
      "Free home loan EMI calculator. Calculate home loan EMI with amortization schedule.",
  },
  alternates: {
    canonical: "/calculators/emi-calculator",
  },
};

export default function EMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

