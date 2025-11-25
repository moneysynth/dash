import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - MoneySynth | Smart Finance. Powered by Insights.",
  description:
    "MoneySynth is a modern financial platform that helps individuals and businesses make confident financial decisions. Discover our mission, vision, and commitment to financial literacy.",
  keywords: [
    "about moneysynth",
    "financial platform",
    "financial literacy",
    "financial tools",
    "money management",
    "financial planning",
    "investment guidance",
    "loan calculators",
    "financial education",
    "about us",
    "company mission",
    "financial technology",
  ],
  openGraph: {
    title: "About Us - MoneySynth | Smart Finance. Powered by Insights.",
    description:
      "MoneySynth is a modern financial platform that helps individuals and businesses make confident financial decisions.",
    url: "https://moneysynth.com/about",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - MoneySynth",
    description:
      "MoneySynth is a modern financial platform that helps individuals and businesses make confident financial decisions.",
  },
  alternates: {
    canonical: "https://moneysynth.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

