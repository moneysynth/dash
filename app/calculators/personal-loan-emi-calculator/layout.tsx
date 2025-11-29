import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Loan Calculator - Calculate Personal Loan EMI Online | MoneySynth",
  description:
    "Free personal loan EMI calculator to calculate Equated Monthly Installment for personal loans. Get amortization schedule, interest breakdown, and payment schedule. Calculate personal loan EMI online instantly.",
  keywords: [
    "personal loan calculator",
    "personal loan EMI calculator",
    "personal loan EMI",
    "personal loan EMI calculation",
    "monthly personal loan EMI calculator",
    "personal loan calculator India",
    "personal loan calculator with amortization",
    "calculate personal loan EMI online",
    "personal loan EMI formula calculator",
    "personal loan repayment calculator",
  ],
  openGraph: {
    title: "Personal Loan Calculator - Calculate Personal Loan EMI Online | MoneySynth",
    description:
      "Calculate your Equated Monthly Installment (EMI) for personal loans. Get detailed amortization schedule and payment breakdown.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan Calculator - Calculate Personal Loan EMI Online | MoneySynth",
    description:
      "Free personal loan EMI calculator. Calculate personal loan EMI with amortization schedule.",
  },
  alternates: {
    canonical: "/calculators/personal-loan",
  },
};

export default function PersonalLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

