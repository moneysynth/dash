import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Card EMI Calculator - MoneySynth | Calculate Credit Card EMI",
  description:
    "Free credit card EMI calculator to calculate Equated Monthly Installment for credit card outstanding amounts. Get detailed amortization schedule, interest breakdown, and payment schedule.",
  keywords: [
    "credit card emi calculator",
    "credit card emi",
    "credit card installment",
    "credit card payment calculator",
    "credit card balance emi",
    "emi conversion",
    "credit card interest calculator",
    "credit card repayment calculator",
    "credit card emi conversion",
    "credit card outstanding emi",
  ],
  openGraph: {
    title: "Credit Card EMI Calculator - MoneySynth",
    description:
      "Calculate your credit card EMI with detailed amortization schedule and interest breakdown.",
    url: "https://moneysynth.com/calculators/credit-card-emi",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Card EMI Calculator - MoneySynth",
    description:
      "Calculate your credit card EMI with detailed amortization schedule and interest breakdown.",
  },
  alternates: {
    canonical: "https://moneysynth.com/calculators/credit-card-emi",
  },
};

export default function CreditCardEMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

