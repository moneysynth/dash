import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWP Calculator - Systematic Withdrawal Plan Calculator Online | MoneySynth",
  description:
    "Calculate Systematic Withdrawal Plan (SWP) for regular income generation. Calculate monthly withdrawal amount, corpus depletion timeline, and withdrawal sustainability.",
  keywords: [
    "SWP calculator",
    "systematic withdrawal plan calculator",
    "SWP calculator India",
    "SWP mutual fund calculator",
    "monthly withdrawal calculator",
    "SWP returns calculator",
    "systematic withdrawal calculator",
    "SWP calculator online",
    "retirement SWP calculator",
    "monthly income calculator",
    "SWP calculator mutual fund",
    "withdrawal plan calculator",
    "SWP calculator India online",
    "calculate SWP returns",
  ],
  openGraph: {
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator | MoneySynth",
    description:
      "Calculate Systematic Withdrawal Plan for regular income. See withdrawal timeline and sustainability analysis.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator | MoneySynth",
    description:
      "Calculate SWP for regular income generation. Calculate monthly withdrawal and corpus depletion timeline.",
  },
  alternates: {
    canonical: "/calculators/swp-calculator",
  },
};

export default function SWPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

