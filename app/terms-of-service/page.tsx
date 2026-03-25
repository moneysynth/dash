import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms of Service - MoneySynth | Terms & Conditions",
  description:
    "Read MoneySynth's Terms of Service to understand the terms and conditions governing your use of our financial calculator platform and services.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "service terms",
    "legal terms",
    "website terms",
    "financial calculator terms",
    "calculator platform terms",
    "money tools terms",
    "financial services terms",
    "user terms and conditions",
    "platform terms of use",
  ],
  openGraph: {
    title: "Terms of Service - MoneySynth",
    description:
      "Read MoneySynth's Terms of Service to understand the terms and conditions governing your use of our services.",
    url: "https://moneysynth.com/terms-of-service",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - MoneySynth",
    description:
      "Read MoneySynth's Terms of Service to understand the terms and conditions governing your use of our services.",
  },
  alternates: {
    canonical: "https://moneysynth.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Terms of Service
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  By accessing and using MoneySynth ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your access to and use of MoneySynth's website, financial calculators, and related services. By using our services, you agree to comply with and be bound by these Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  MoneySynth provides online financial calculators and educational content to help users make informed financial decisions. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Financial calculators (EMI, SIP, SWP, RD, FD, etc.)</li>
                  <li>Educational financial content</li>
                  <li>Financial planning tools and resources</li>
                  <li>Comparison tools for loan and investment scenarios</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>3. Use of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">3.1 Permitted Use</h3>
                  <p>You may use our services for:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Personal financial planning and calculations</li>
                    <li>Educational purposes</li>
                    <li>Business use in accordance with these Terms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">3.2 Prohibited Use</h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Reproduce, duplicate, copy, or resell any part of our service</li>
                    <li>Use automated systems to access the service without permission</li>
                    <li>Transmit any viruses, malware, or harmful code</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>4. Accuracy of Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any information provided through our services.
                </p>
                <p>
                  <strong className="text-text-primary">Important:</strong> The calculations and results provided by our tools are for informational and educational purposes only. They should not be considered as financial, legal, or professional advice.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>5. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  All content, features, and functionality of MoneySynth, including but not limited to text, graphics, logos, icons, images, software, and the compilation thereof, are the property of MoneySynth or its content suppliers and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use our content without our prior written permission.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>6. User Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  If you submit, post, or display content on our platform, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and distribute such content for the purpose of operating and promoting our services.
                </p>
                <p>
                  You are solely responsible for any content you submit and represent that you have all necessary rights to grant us the license described above.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>7. Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy, reliability, or completeness of information</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security or freedom from viruses or other harmful components</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  To the maximum extent permitted by law, MoneySynth and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Loss of profits, data, or other intangible losses</li>
                  <li>Financial losses resulting from use of our calculators</li>
                  <li>Damages arising from reliance on our information</li>
                </ul>
                <p>
                  Our total liability for any claims arising from your use of our services shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>9. Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  You agree to indemnify, defend, and hold harmless MoneySynth and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your use of our services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>10. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any reason, including if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>11. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page and updating the "Last updated" date.
                </p>
                <p>
                  Your continued use of our services after any changes constitutes acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using our services.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>12. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>13. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-surface rounded-lg">
                  <p className="font-semibold text-text-primary">MoneySynth</p>
                  <p className="mt-2">Email: legal@moneysynth.com</p>
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

