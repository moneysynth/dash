import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutual Fund Returns Calculator - Calculate MF Returns & CAGR Online | MoneySynth",
  description:
    "Free mutual fund returns calculator to calculate returns on mutual fund investments. Calculate future value, CAGR, total returns, and inflation-adjusted returns. Plan your mutual fund investments.",
  keywords: [
    "mutual fund returns calculator",
    "mutual fund calculator",
    "MF returns calculator",
    "mutual fund calculator India",
    "calculate mutual fund returns",
    "mutual fund CAGR calculator",
    "mutual fund calculator online",
    "mutual fund calculator free",
    "mutual fund returns calculator India",
    "mutual fund calculator with CAGR",
    "mutual fund investment calculator",
    "mutual fund calculator online free",
  ],
  openGraph: {
    title: "Mutual Fund Returns Calculator - Calculate MF Returns & CAGR Online | MoneySynth",
    description:
      "Calculate returns on your mutual fund investments. Get future value, CAGR, total returns, and inflation-adjusted returns.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutual Fund Returns Calculator - Calculate MF Returns & CAGR Online | MoneySynth",
    description:
      "Free mutual fund returns calculator. Calculate future value, CAGR, and returns on your mutual fund investments.",
  },
  alternates: {
    canonical: "/calculators/mutual-fund-returns-calculator",
  },
};

export default function MutualFundReturnsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

