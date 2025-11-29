import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy - MoneySynth | Your Data Protection & Privacy",
  description:
    "Read MoneySynth's Privacy Policy to understand how we collect, use, and protect your personal information when you use our financial calculators and services.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy",
    "data security",
    "user privacy",
    "personal information",
    "GDPR",
    "data collection",
    "financial calculator privacy",
    "calculator data privacy",
    "money tools privacy",
    "financial services privacy",
    "user data protection",
    "privacy policy financial tools",
  ],
  openGraph: {
    title: "Privacy Policy - MoneySynth",
    description:
      "Read MoneySynth's Privacy Policy to understand how we collect, use, and protect your personal information.",
    url: "https://moneysynth.com/privacy-policy",
    siteName: "MoneySynth",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - MoneySynth",
    description:
      "Read MoneySynth's Privacy Policy to understand how we collect, use, and protect your personal information.",
  },
  alternates: {
    canonical: "https://moneysynth.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Privacy Policy
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Welcome to MoneySynth ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our financial calculator services.
                </p>
                <p>
                  By using MoneySynth, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">2.1 Information You Provide</h3>
                  <p>
                    When you use our financial calculators, you may provide us with:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Financial data entered into calculators (loan amounts, interest rates, tenure, etc.)</li>
                    <li>Contact information if you subscribe to our newsletter or contact us</li>
                    <li>Feedback and comments you submit</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">2.2 Automatically Collected Information</h3>
                  <p>
                    We may automatically collect certain information when you visit our website:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and maintain our financial calculator services</li>
                  <li>Improve and optimize our website and user experience</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>4. Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                <p>
                  <strong className="text-text-primary">Important:</strong> The financial data you enter into our calculators is processed locally in your browser and is not stored on our servers unless you explicitly save a calculation. We do not retain your calculation data without your explicit consent.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>5. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>6. Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We may use third-party services that collect, monitor, and analyze information to help us improve our services. These services may include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Analytics services (e.g., Google Analytics)</li>
                  <li>Advertising services (e.g., Google AdSense)</li>
                  <li>Content delivery networks</li>
                </ul>
                <p>
                  These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>7. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong className="text-text-primary">Access:</strong> Request access to your personal data</li>
                  <li><strong className="text-text-primary">Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-text-primary">Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-text-primary">Objection:</strong> Object to processing of your personal data</li>
                  <li><strong className="text-text-primary">Portability:</strong> Request transfer of your data</li>
                  <li><strong className="text-text-primary">Withdrawal:</strong> Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>8. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>9. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>10. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-surface rounded-lg">
                  <p className="font-semibold text-text-primary">MoneySynth</p>
                  <p className="mt-2">Email: privacy@moneysynth.com</p>
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

