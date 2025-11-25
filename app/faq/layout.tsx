import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions About Financial Calculators | MoneySynth",
  description:
    "Find answers to frequently asked questions about financial calculators, EMI, SIP, SWP, loans, investments, and financial planning. Get help using MoneySynth's tools. Common questions about loan calculators, investment calculators, EMI calculation, SIP returns, and more.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "financial calculator FAQ",
    "EMI FAQ",
    "SIP FAQ",
    "loan FAQ",
    "investment FAQ",
    "financial planning FAQ",
    "calculator help",
    "financial questions",
    "EMI calculator FAQ",
    "SIP calculator FAQ",
    "home loan FAQ",
    "personal loan FAQ",
    "SWP calculator FAQ",
    "RD calculator FAQ",
    "FD calculator FAQ",
    "loan eligibility FAQ",
    "financial calculator questions",
    "calculator help guide",
    "EMI calculation questions",
    "SIP investment questions",
    "loan prepayment FAQ",
    "investment planning FAQ",
    "financial calculator support",
  ],
  openGraph: {
    title: "FAQ - Frequently Asked Questions About Financial Calculators | MoneySynth",
    description:
      "Find answers to frequently asked questions about financial calculators, EMI, SIP, SWP, loans, and investments. Get help using our tools.",
    url: "https://moneysynth.com/faq",
    siteName: "MoneySynth",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Frequently Asked Questions About Financial Calculators | MoneySynth",
    description:
      "Find answers to frequently asked questions about financial calculators, EMI, SIP, SWP, loans, and investments.",
  },
  alternates: {
    canonical: "https://moneysynth.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

