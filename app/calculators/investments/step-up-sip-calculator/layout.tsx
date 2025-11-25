import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Step-up SIP Calculator - Calculate Increasing SIP Returns | MoneySynth",
  description:
    "Calculate returns for Step-up SIP with annual increases. Compare step-up SIP vs regular SIP. See how increasing your SIP annually can boost your wealth creation.",
  keywords: [
    "step-up SIP calculator",
    "increasing SIP calculator",
    "step up SIP calculator",
    "SIP with annual increase calculator",
    "escalating SIP calculator",
    "step up SIP returns calculator",
    "SIP increase calculator",
    "step-up SIP vs regular SIP",
    "increasing SIP investment calculator",
    "step-up SIP calculator India",
    "SIP calculator with step up",
    "annual SIP increase calculator",
    "step-up mutual fund calculator",
  ],
  openGraph: {
    title: "Step-up SIP Calculator - Calculate Increasing SIP Returns | MoneySynth",
    description:
      "Calculate returns for SIP with annual step-up increases. Compare with regular SIP and see the additional wealth gain.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Step-up SIP Calculator - Calculate Increasing SIP Returns | MoneySynth",
    description:
      "Calculate returns for Step-up SIP with annual increases. Compare step-up SIP vs regular SIP.",
  },
  alternates: {
    canonical: "/calculators/investments/step-up-sip-calculator",
  },
};

export default function StepUpSIPCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

