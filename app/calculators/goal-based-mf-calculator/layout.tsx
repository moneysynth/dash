import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goal-Based MF Calculator - Plan Financial Goals with Mutual Funds | MoneySynth",
  description:
    "Plan and calculate investments needed to achieve your financial goals - child education, retirement, house purchase. Calculate required SIP, lumpsum, or mixed investment strategy with inflation adjustment.",
  keywords: [
    "goal-based calculator",
    "financial goal calculator",
    "goal planning calculator",
    "mutual fund goal calculator",
    "retirement planning calculator",
    "child education calculator",
    "house purchase calculator",
    "financial goal planning",
    "goal-based investment calculator",
    "SIP goal calculator",
    "retirement calculator India",
    "education planning calculator",
    "goal-based MF calculator",
    "financial planning calculator",
  ],
  openGraph: {
    title: "Goal-Based MF Calculator - Plan Financial Goals | MoneySynth",
    description:
      "Plan your financial goals with mutual funds. Calculate required SIP or lumpsum investment to achieve goals like retirement, child education, house purchase.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goal-Based MF Calculator - Plan Financial Goals | MoneySynth",
    description:
      "Calculate investments needed to achieve financial goals. Plan for retirement, education, house purchase with inflation adjustment.",
  },
  alternates: {
    canonical: "/calculators/goal-based-mf-calculator",
  },
};

export default function GoalBasedMFCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

