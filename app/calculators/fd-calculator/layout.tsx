import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FD Calculator - Fixed Deposit Calculator with Interest Rates | MoneySynth",
  description:
    "Calculate Fixed Deposit (FD) returns with different payout options - monthly, quarterly, cumulative. Calculate FD maturity amount, interest earned, TDS, and senior citizen rates.",
  keywords: [
    "FD calculator",
    "fixed deposit calculator",
    "FD calculator India",
    "FD maturity calculator",
    "fixed deposit calculator online",
    "FD interest calculator",
    "FD calculator with TDS",
    "senior citizen FD calculator",
    "FD calculator bank",
    "fixed deposit calculator India",
    "FD returns calculator",
    "FD calculator online India",
    "calculate FD maturity",
    "FD calculator monthly payout",
    "FD calculator quarterly payout",
  ],
  openGraph: {
    title: "FD Calculator - Fixed Deposit Calculator | MoneySynth",
    description:
      "Calculate Fixed Deposit returns with monthly, quarterly, or cumulative payout options. Calculate FD maturity and interest with TDS.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FD Calculator - Fixed Deposit Calculator | MoneySynth",
    description:
      "Calculate FD returns with different payout options. Calculate maturity amount, interest, and TDS.",
  },
  alternates: {
    canonical: "/calculators/fd-calculator",
  },
};

export default function FDCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

