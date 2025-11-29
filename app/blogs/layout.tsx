import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoneySynth Blog - Financial Tips & Insights",
  description:
    "Read our financial blog for insights on loans, investments, mutual funds, and money management strategies to grow your wealth.",
  keywords: [
    "financial blog",
    "investment blog",
    "personal finance blog",
    "loan guides",
    "investment tips",
    "financial planning blog",
    "mutual fund blog",
    "SIP investment blog",
    "loan advice",
    "financial education",
    "investment strategies",
    "personal finance tips",
    "financial literacy",
    "money management blog",
    "EMI guide",
    "SIP investment guide",
    "home loan guide",
    "retirement planning blog",
    "tax planning blog",
    "wealth creation blog",
    "financial planning articles",
    "investment education",
    "loan tips",
    "mutual fund tips",
    "financial advice blog",
    "money management tips",
    "investment planning blog",
    "financial literacy blog",
  ],
  openGraph: {
    title: "MoneySynth Blog - Financial Tips & Insights",
    description:
      "Read our financial blog for insights on loans, investments, mutual funds, and money management strategies to grow your wealth.",
    type: "website",
    url: "https://moneysynth.com/blogs",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneySynth Blog - Financial Tips & Insights",
    description:
      "Read our financial blog for insights on loans, investments, mutual funds, and money management strategies to grow your wealth.",
  },
  alternates: {
    canonical: "https://moneysynth.com/blogs",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

