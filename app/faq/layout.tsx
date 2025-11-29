import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoneySynth FAQ - Calculator Questions Answered",
  description:
    "Find answers to common questions about using our financial calculators, loan tools, and investment planning resources.",
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
    "how to use financial calculators",
    "calculator troubleshooting",
    "financial calculator guide",
    "loan calculator help",
    "investment calculator questions",
    "EMI calculator how to use",
    "SIP calculator guide",
  ],
  openGraph: {
    title: "MoneySynth FAQ - Calculator Questions Answered",
    description:
      "Find answers to common questions about using our financial calculators, loan tools, and investment planning resources.",
    url: "https://moneysynth.com/faq",
    siteName: "MoneySynth",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneySynth FAQ - Calculator Questions Answered",
    description:
      "Find answers to common questions about using our financial calculators, loan tools, and investment planning resources.",
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

