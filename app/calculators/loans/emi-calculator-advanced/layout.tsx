import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Home Loan Calculator - Part Payment & Prepayment Calculator | MoneySynth",
  description:
    "Advanced home loan calculator with part payment, prepayment options, and scenario comparison. Calculate home loan EMI savings with one-time or recurring part payments. Compare multiple home loan scenarios.",
  keywords: [
    "advanced home loan calculator",
    "home loan calculator with part payment",
    "home loan prepayment calculator",
    "home loan prepayment calculator",
    "part payment home loan calculator",
    "home loan calculator with prepayment",
    "home loan part payment calculator",
    "home loan EMI reduction calculator",
    "prepayment home loan calculator",
    "home loan calculator with part payment",
    "home loan prepayment calculator",
    "home loan EMI savings calculator",
    "home loan scenario calculator",
  ],
  openGraph: {
    title: "Advanced Home Loan Calculator - Part Payment & Prepayment | MoneySynth",
    description:
      "Calculate home loan EMI with part payments and prepayment options. Compare multiple scenarios and see how prepayments can reduce your loan tenure and interest.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Home Loan Calculator - Part Payment & Prepayment | MoneySynth",
    description:
      "Advanced home loan calculator with part payment and prepayment options. Calculate home loan EMI savings and compare scenarios.",
  },
  alternates: {
    canonical: "/calculators/loans/emi-calculator-advanced",
  },
};

export default function AdvancedEMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

