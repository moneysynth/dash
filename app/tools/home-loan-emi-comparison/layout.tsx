import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan EMI Comparison - Compare Home Loan Scenarios | MoneySynth",
  description:
    "Compare up to 3 different home loan scenarios side by side. Compare EMI, interest rates, tenure, and total amounts to make the best financial decision.",
  keywords: [
    "home loan comparison",
    "home loan calculator comparison",
    "compare home loan scenarios",
    "home loan EMI comparison tool",
    "home loan EMI comparison",
    "compare home loan EMI",
    "home loan calculator comparison",
    "financial comparison tool",
    "loan comparison tool",
    "loan comparison calculator",
    "loan comparison calculator tool",
    "loan comparison calculator tool",
  ],
  openGraph: {
    title: "Home Loan EMI Comparison - Compare Home Loan Scenarios | MoneySynth",
    description:
      "Compare up to 3 different home loan scenarios side by side. Compare EMI, interest rates, tenure, and total amounts.",
    url: "https://moneysynth.com/tools/home-loan-emi-comparison",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan EMI Comparison - Compare Home Loan Scenarios",
    description:
      "Compare up to 3 different home loan scenarios side by side. Compare EMI, interest rates, tenure, and total amounts.",
  },
  alternates: {
    canonical: "https://moneysynth.com/tools/home-loan-emi-comparison",
  },
};

export default function HomeLoanCompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

