import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Loan Calculator - Calculate Car Loan EMI Online | MoneySynth",
  description:
    "Free car loan EMI calculator to calculate Equated Monthly Installment for car loans. Get amortization schedule, interest breakdown, and payment schedule. Calculate car loan EMI online instantly.",
  keywords: [
    "car loan calculator",
    "car loan EMI calculator",
    "vehicle loan calculator",
    "car loan EMI",
    "car loan EMI calculation",
    "monthly car loan EMI calculator",
    "car loan calculator India",
    "car loan calculator with amortization",
    "calculate car loan EMI online",
    "car loan EMI formula calculator",
    "car loan repayment calculator",
  ],
  openGraph: {
    title: "Car Loan Calculator - Calculate Car Loan EMI Online | MoneySynth",
    description:
      "Calculate your Equated Monthly Installment (EMI) for car loans. Get detailed amortization schedule and payment breakdown.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Loan Calculator - Calculate Car Loan EMI Online | MoneySynth",
    description:
      "Free car loan EMI calculator. Calculate car loan EMI with amortization schedule.",
  },
  alternates: {
    canonical: "/calculators/loans/car-loan",
  },
};

export default function CarLoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

