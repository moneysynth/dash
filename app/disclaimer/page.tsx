import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer - MoneySynth | Important Legal Information",
  description:
    "Read MoneySynth's Disclaimer to understand the limitations and important information regarding the use of our financial calculators and services.",
  keywords: [
    "disclaimer",
    "legal disclaimer",
    "financial disclaimer",
    "calculator disclaimer",
    "investment disclaimer",
    "legal notice",
  ],
  openGraph: {
    title: "Disclaimer - MoneySynth",
    description:
      "Read MoneySynth's Disclaimer to understand the limitations and important information regarding the use of our services.",
    url: "https://moneysynth.com/disclaimer",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer - MoneySynth",
    description:
      "Read MoneySynth's Disclaimer to understand the limitations and important information regarding the use of our services.",
  },
  alternates: {
    canonical: "https://moneysynth.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Disclaimer
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  <CardTitle className="text-accent">Important Notice</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p className="font-semibold text-text-primary">
                  The information and calculations provided by MoneySynth are for informational and educational purposes only and should not be considered as financial, legal, tax, or professional advice.
                </p>
                <p>
                  Please read this disclaimer carefully before using our financial calculators and services. By using MoneySynth, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>1. Not Financial Advice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  MoneySynth provides financial calculators and educational content to help users understand financial concepts and perform calculations. However, we do not provide personalized financial advice, investment recommendations, or financial planning services.
                </p>
                <p>
                  <strong className="text-text-primary">You should always consult with a qualified financial advisor, accountant, or other professional before making any financial decisions.</strong> Our tools are designed to assist in your research and planning, not to replace professional financial advice.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>2. Accuracy of Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  While we strive to ensure the accuracy of our calculators and formulas, we make no warranties or representations regarding the accuracy, completeness, or reliability of any calculations or results.
                </p>
                <p>
                  Financial calculations may vary based on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Actual interest rates and terms offered by financial institutions</li>
                  <li>Tax implications and regulations</li>
                  <li>Fees, charges, and other costs not included in calculations</li>
                  <li>Market conditions and economic factors</li>
                  <li>Individual circumstances and eligibility criteria</li>
                </ul>
                <p>
                  <strong className="text-text-primary">Always verify calculations with your financial institution or advisor before making decisions.</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>3. No Guarantees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  MoneySynth does not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>That you will achieve the results shown in any calculations</li>
                  <li>That the information provided is current, accurate, or complete</li>
                  <li>That our services will be uninterrupted or error-free</li>
                  <li>Any specific financial outcomes or returns</li>
                </ul>
                <p>
                  Past performance, calculations, or examples are not indicative of future results. Financial markets and conditions are subject to change, and actual results may differ significantly from calculated estimates.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>4. Investment Risks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  All investments carry risk, including the potential loss of principal. The investment calculators and information provided on MoneySynth are for educational purposes only and do not constitute investment advice.
                </p>
                <p>
                  <strong className="text-text-primary">Important considerations:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Investments are subject to market risks</li>
                  <li>Returns are not guaranteed</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>You should carefully consider your risk tolerance and investment objectives</li>
                  <li>Diversification does not ensure profit or protect against loss</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>5. Loan and Credit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Loan calculators provide estimates based on the information you provide. Actual loan terms, interest rates, and eligibility are determined by financial institutions and may differ from calculator results.
                </p>
                <p>
                  <strong className="text-text-primary">Important:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Interest rates and terms are subject to change</li>
                  <li>Eligibility criteria vary by lender</li>
                  <li>Additional fees and charges may apply</li>
                  <li>Credit scores and financial history affect loan approval and terms</li>
                  <li>Always consult with lenders for actual rates and terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>6. Tax Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Tax laws and regulations vary by jurisdiction and are subject to change. Our calculators may not account for all tax implications, deductions, exemptions, or credits that may apply to your specific situation.
                </p>
                <p>
                  <strong className="text-text-primary">You should consult with a qualified tax advisor or accountant for advice regarding your specific tax situation.</strong>
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>7. Third-Party Content and Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Our website may contain links to third-party websites, advertisements, or content. We are not responsible for the accuracy, completeness, or reliability of any third-party content or websites.
                </p>
                <p>
                  The inclusion of any link or advertisement does not imply endorsement by MoneySynth. You access third-party content at your own risk.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  To the maximum extent permitted by law, MoneySynth, its owners, employees, and affiliates shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Any financial losses resulting from use of our calculators or information</li>
                  <li>Decisions made based on our calculations or content</li>
                  <li>Errors, inaccuracies, or omissions in our information</li>
                  <li>Interruptions or unavailability of our services</li>
                  <li>Any indirect, incidental, or consequential damages</li>
                </ul>
                <p>
                  You use our services at your own risk and are solely responsible for your financial decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>9. Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  MoneySynth is an educational platform providing financial calculators and information. We are not a registered financial advisor, investment advisor, or financial institution.
                </p>
                <p>
                  Our services are provided for informational purposes only and do not constitute:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Investment advice or recommendations</li>
                  <li>Financial planning services</li>
                  <li>Loan origination or lending services</li>
                  <li>Securities trading or brokerage services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>10. Updates to Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We reserve the right to update this disclaimer at any time. Changes will be posted on this page with an updated "Last updated" date.
                </p>
                <p>
                  Your continued use of MoneySynth after any changes constitutes acceptance of the updated disclaimer. We encourage you to review this page periodically.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  If you have any questions about this disclaimer, please contact us:
                </p>
                <div className="mt-4 p-4 bg-surface rounded-lg">
                  <p className="font-semibold text-text-primary">MoneySynth</p>
                  <p className="mt-2">Email: support@moneysynth.com</p>
                  <p>Website: <a href="https://moneysynth.com" className="text-primary hover:underline">https://moneysynth.com</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

