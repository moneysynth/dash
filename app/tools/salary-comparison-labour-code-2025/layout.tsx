import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Comparison - New Labour Code 2025 Impact Calculator | MoneySynth",
  description:
    "Compare your current take-home salary with New Labour Code 2025 (50% basic salary mandate). See how the new labour code affects your salary structure and take-home pay.",
  alternates: {
    canonical: "https://moneysynth.com/tools/salary-comparison-labour-code-2025",
  },
};

export default function SalaryComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

