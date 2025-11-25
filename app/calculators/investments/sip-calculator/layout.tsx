import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIP Calculator - Calculate SIP Returns & Maturity Value Online | MoneySynth",
  description:
    "Free SIP calculator to calculate returns on Systematic Investment Plan (SIP). Calculate SIP maturity value, wealth gain, and see year-by-year growth. Plan your mutual fund SIP investments.",
  keywords: [
    "SIP calculator",
    "SIP calculator India",
    "mutual fund SIP calculator",
    "SIP returns calculator",
    "SIP maturity calculator",
    "SIP investment calculator",
    "systematic investment plan calculator",
    "SIP calculator online",
    "SIP calculator with returns",
    "monthly SIP calculator",
    "SIP calculator mutual fund",
    "SIP growth calculator",
    "SIP calculator India online",
    "calculate SIP returns",
    "SIP calculator with XIRR",
  ],
  openGraph: {
    title: "SIP Calculator - Calculate SIP Returns & Maturity Value | MoneySynth",
    description:
      "Calculate your SIP returns and maturity value. See how your monthly SIP investments can grow over time with detailed growth charts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator - Calculate SIP Returns & Maturity Value | MoneySynth",
    description:
      "Free SIP calculator to calculate returns on Systematic Investment Plan. Plan your mutual fund SIP investments.",
  },
  alternates: {
    canonical: "/calculators/investments/sip-calculator",
  },
};

export default function SIPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

