import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumpsum Calculator - Calculate One-Time Investment Returns | MoneySynth",
  description:
    "Calculate future value of one-time lump sum investments. Get inflation-adjusted returns and compare with SIP. Plan your lump sum mutual fund investments.",
  keywords: [
    "lumpsum calculator",
    "lump sum calculator",
    "one-time investment calculator",
    "lumpsum investment calculator",
    "lump sum mutual fund calculator",
    "lumpsum returns calculator",
    "one-time investment returns calculator",
    "lumpsum calculator India",
    "lump sum investment calculator",
    "lumpsum vs SIP calculator",
    "one-time investment calculator India",
    "lumpsum calculator online",
    "lump sum calculator mutual fund",
  ],
  openGraph: {
    title: "Lumpsum Calculator - Calculate One-Time Investment Returns | MoneySynth",
    description:
      "Calculate future value of lump sum investments with inflation-adjusted returns. Compare lump sum vs SIP investment strategies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumpsum Calculator - Calculate One-Time Investment Returns | MoneySynth",
    description:
      "Calculate returns on one-time lump sum investments. Get inflation-adjusted returns and compare with SIP.",
  },
  alternates: {
    canonical: "/calculators/lumpsum-calculator",
  },
};

export default function LumpsumCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

