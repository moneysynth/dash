import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RD Calculator - Recurring Deposit Calculator Online | MoneySynth",
  description:
    "Calculate Recurring Deposit (RD) maturity amount, interest earned, and TDS. Plan your RD investments with monthly deposit calculator. Compare RD returns.",
  keywords: [
    "RD calculator",
    "recurring deposit calculator",
    "RD calculator India",
    "RD maturity calculator",
    "recurring deposit calculator online",
    "RD interest calculator",
    "monthly RD calculator",
    "RD calculator bank",
    "recurring deposit maturity calculator",
    "RD calculator India online",
    "RD returns calculator",
    "recurring deposit calculator India",
    "RD calculator with TDS",
    "calculate RD maturity",
  ],
  openGraph: {
    title: "RD Calculator - Recurring Deposit Calculator | MoneySynth",
    description:
      "Calculate Recurring Deposit maturity amount and interest earned. Plan your RD investments with monthly deposit calculator.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RD Calculator - Recurring Deposit Calculator | MoneySynth",
    description:
      "Calculate RD maturity amount, interest earned, and TDS. Plan your recurring deposit investments.",
  },
  alternates: {
    canonical: "/calculators/rd-calculator",
  },
};

export default function RDCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

