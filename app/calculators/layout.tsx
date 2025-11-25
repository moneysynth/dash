import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators - Free Online Calculators for Loans & Investments | MoneySynth",
  description:
    "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, and more. Loan calculators, investment calculators, and goal planning tools.",
  keywords: [
    "financial calculators",
    "loan calculators",
    "investment calculators",
    "EMI calculator",
    "SIP calculator",
    "SWP calculator",
    "RD calculator",
    "FD calculator",
    "loan calculator India",
    "investment calculator India",
    "financial planning tools",
    "online calculators",
    "free calculators",
    "calculator hub",
  ],
  openGraph: {
    title: "Financial Calculators - Free Online Calculators | MoneySynth",
    description:
      "Access all financial calculators - EMI, SIP, SWP, RD, FD, and more. Free online calculators for loans and investments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators - Free Online Calculators | MoneySynth",
    description:
      "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, and more.",
  },
  alternates: {
    canonical: "/calculators",
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

