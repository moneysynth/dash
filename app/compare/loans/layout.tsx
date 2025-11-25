import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Comparison Tools - Compare Loan Scenarios | MoneySynth",
  description:
    "Compare different loan scenarios side by side. Use our loan comparison tools to compare home loans, interest rates, and find the best loan option for you.",
  keywords: [
    "loan comparison",
    "loan comparison tools",
    "compare loans",
    "loan calculator comparison",
    "compare loan scenarios",
    "loan EMI comparison",
  ],
  openGraph: {
    title: "Loan Comparison Tools - Compare Loan Scenarios | MoneySynth",
    description:
      "Compare different loan scenarios side by side. Use our loan comparison tools to find the best loan option.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Comparison Tools - Compare Loan Scenarios",
    description: "Compare different loan scenarios side by side to make informed decisions.",
  },
  alternates: {
    canonical: "/compare/loans",
  },
};

export default function LoanComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

