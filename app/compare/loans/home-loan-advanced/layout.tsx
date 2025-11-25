import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Home Loan Comparison - Compare Home Loan Scenarios with Part Payments | MoneySynth",
  description:
    "Compare up to 3 different home loan scenarios with part payments side by side. Compare EMI, interest rates, tenure, total amounts, and savings from prepayments.",
  keywords: [
    "advanced home loan comparison",
    "home loan comparison with prepayment",
    "compare home loan scenarios with part payments",
    "home loan EMI comparison with prepayment",
    "home loan EMI comparison tool",
    "compare home loan with prepayment",
    "home loan calculator comparison with part payment",
    "financial comparison tool with prepayment",
    "advanced loan comparison tool",
    "advanced loan comparison calculator",
    "advanced loan comparison calculator tool",
    "advanced loan comparison calculator tool",
    "loan comparison with prepayment",
    "loan comparison with part payment",
    "loan comparison with part payment tool",
    "loan comparison with part payment calculator",
    "loan comparison with part payment calculator tool",
    "loan comparison with part payment calculator tool",
  ],
  openGraph: {
    title: "Advanced Home Loan Comparison - Compare Home Loan Scenarios with Part Payments | MoneySynth",
    description:
      "Compare up to 3 different home loan scenarios with part payments side by side. Compare EMI, interest rates, tenure, total amounts, and savings.",
    url: "https://moneysynth.com/compare/loans/home-loan-advanced",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Home Loan Comparison - Compare Home Loan Scenarios with Part Payments",
    description:
      "Compare up to 3 different home loan scenarios with part payments side by side. Compare EMI, interest rates, tenure, total amounts, and savings.",
  },
  alternates: {
    canonical: "https://moneysynth.com/compare/loans/home-loan-advanced",
  },
};

export default function AdvancedHomeLoanCompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

