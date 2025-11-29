import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Blogs - Investment Tips, Loan Guides & Financial Planning | MoneySynth",
  description:
    "Read expert financial articles, investment tips, loan guides, and financial planning advice. Learn about EMI, SIP, SWP, mutual funds, personal finance, retirement planning, tax benefits, and wealth creation strategies.",
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
    title: "Financial Blogs - Investment Tips & Financial Planning | MoneySynth",
    description:
      "Expert financial articles, investment tips, loan guides, and financial planning advice. Learn about personal finance and investments.",
    type: "website",
    url: "https://moneysynth.com/blogs",
    siteName: "MoneySynth",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Blogs - Investment Tips & Financial Planning | MoneySynth",
    description:
      "Read expert financial articles, investment tips, and loan guides. Learn about personal finance and investments.",
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

