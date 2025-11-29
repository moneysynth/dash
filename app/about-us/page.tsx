import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
// import { AdUnit } from "@/components/common/AdUnit";
import { Target, Lightbulb, TrendingUp, Shield, Users, Zap } from "lucide-react";
import { SEOStructuredData } from "@/components/common/SEOStructuredData";

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
  ],
  openGraph: {
    title: "About Us - MoneySynth | Smart Finance. Powered by Insights.",
    description:
      "MoneySynth is a modern financial platform that helps individuals and businesses make confident financial decisions.",
    url: "https://moneysynth.com/about-us",
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
    canonical: "https://moneysynth.com/about-us",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About MoneySynth",
  description:
    "MoneySynth is a modern financial platform built to help individuals and businesses make confident financial decisions.",
  url: "https://moneysynth.com/about-us",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* About Us Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">Welcome to MoneySynth</CardTitle>
                  <CardDescription className="text-base">
                    Where financial clarity meets intelligent technology
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                  <p className="text-base sm:text-lg">
                    MoneySynth is a modern financial platform built to help individuals and
                    businesses make confident financial decisions. Our mission is simple: turn
                    complex financial data into clear, actionable insights.
                  </p>
                  <p>
                    From expert-written blogs and real-time financial news to smart calculators
                    that simplify planning—MoneySynth empowers users to take charge of their
                    financial journeys. Whether you're budgeting, investing, or planning for
                    long-term goals, our tools and content are designed to guide you with
                    precision and trust.
                  </p>
                  <p>
                    Built on a foundation of transparency and innovation, we combine human
                    expertise with data-driven intelligence to deliver accurate, easy-to-understand
                    financial solutions. At MoneySynth, we believe that financial literacy should
                    be accessible to everyone—and we're here to make that a reality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-surface/50 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl sm:text-2xl">Our Mission</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary leading-relaxed">
                    <p>
                      To democratize financial knowledge by delivering intuitive tools, trustworthy
                      insights, and intelligent resources that enable users to make smarter
                      financial decisions every day.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-secondary" />
                      <CardTitle className="text-xl sm:text-2xl">Our Vision</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary leading-relaxed">
                    <p>
                      To become the world's most reliable and technology-driven financial
                      ecosystem—where anyone, regardless of background, can understand money, build
                      wealth, and design the future they aspire to.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Section */}
        {/* <section className="border-t border-border py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <AdUnit size="728x90" className="mx-auto" />
            </div>
          </div>
        </section> */}

        {/* Platform Introduction */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">
                    A Next-Generation Financial Intelligence Platform
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-text-secondary leading-relaxed">
                  <p className="text-base sm:text-lg">
                    MoneySynth is a next-generation financial intelligence platform designed to
                    simplify personal and business finance through technology.
                  </p>
                  <p>
                    In a world overwhelmed with financial complexity, MoneySynth bridges the gap
                    between raw data and real understanding. We offer users a seamless experience
                    combining insightful blogs, up-to-the-minute financial news, and
                    precision-driven tools for EMI, SIP, SWP, and long-term financial planning.
                  </p>
                  <p>
                    Our platform stands at the intersection of trust, technology, and financial
                    empowerment—providing clarity, accuracy, and a smarter way to interact with
                    money. MoneySynth is not just another finance website; it is a holistic
                    ecosystem built for the modern investor, the everyday saver, and the
                    financially curious mind.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-surface/50 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                  Why Choose MoneySynth?
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
                  Empowering your financial journey with intelligent tools and insights
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Smart Calculators</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Precision-driven tools for EMI, SIP, SWP, loans, and investments with
                      real-time calculations and visualizations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">Expert Insights</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Expert-written blogs and real-time financial news to keep you informed and
                      make better decisions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Trust & Transparency</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Built on a foundation of transparency with accurate, easy-to-understand
                      financial solutions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Accessible to Everyone</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Financial literacy should be accessible to everyone, regardless of
                      background or experience level.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">Goal-Based Planning</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Comprehensive tools for budgeting, investing, and planning for long-term
                      financial goals.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Data-Driven Intelligence</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-text-secondary text-sm">
                    <p>
                      Combining human expertise with data-driven intelligence for accurate and
                      reliable financial guidance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SEOStructuredData type="AboutPage" data={structuredData} />
    </div>
  );
}

