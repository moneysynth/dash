import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingUp, DollarSign, BookOpen, Target, PiggyBank, Building2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
// import { AdUnit } from "@/components/common/AdUnit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SEOStructuredData } from "@/components/common/SEOStructuredData";
import { CalculatorLoading } from "@/components/calculators/common/CalculatorLoading";
import type { BlogPost } from "@/types";

// Dynamically import calculator components for route-based code splitting
const QuickEMICalculator = dynamic(
  () => import("@/components/calculators/loan-calculators/QuickEMICalculator").then((mod) => ({ default: mod.QuickEMICalculator })),
  {
    loading: () => <CalculatorLoading />,
  }
);

const LoanEligibilityCalculator = dynamic(
  () => import("@/components/calculators/loan-calculators/LoanEligibilityCalculator").then((mod) => ({ default: mod.LoanEligibilityCalculator })),
  {
    loading: () => <CalculatorLoading />,
  }
);

export const metadata: Metadata = {
  title: "Free Financial Calculators - EMI, SIP, SWP, Loan & Investment Calculators | MoneySynth",
  description:
    "Free online financial calculators for loans and investments in India. Calculate EMI for home loans, car loans, personal loans. Calculate SIP returns, SWP, RD, FD maturity. Loan eligibility calculator, goal-based planning, credit card EMI calculator. Get accurate results with amortization schedules, growth charts, and expert insights.",
  keywords: [
    "financial calculator",
    "EMI calculator",
    "SIP calculator",
    "loan calculator",
    "investment calculator",
    "home loan calculator",
    "car loan calculator",
    "personal loan calculator",
    "SIP returns calculator",
    "loan eligibility calculator",
    "SWP calculator",
    "RD calculator",
    "FD calculator",
    "credit card EMI calculator",
    "free calculator",
    "online calculator",
    "calculator India",
    "financial planning",
    "loan EMI calculator",
    "mutual fund calculator",
    "retirement calculator",
    "goal planning calculator",
    "EMI calculator online",
    "SIP calculator online",
    "home loan EMI calculator",
    "car loan EMI calculator",
    "personal loan EMI calculator",
    "loan calculator India",
    "investment calculator India",
    "financial calculator online",
    "EMI calculator India",
    "SIP calculator India",
    "loan EMI calculator India",
    "home loan calculator India",
    "car loan calculator India",
    "SIP returns calculator India",
    "mutual fund SIP calculator",
    "fixed deposit calculator",
    "recurring deposit calculator",
    "loan prepayment calculator",
    "amortization calculator",
    "loan comparison calculator",
    "financial planning tools",
    "retirement planning calculator",
    "education planning calculator",
    "goal based investment calculator",
  ],
  openGraph: {
    title: "Free Financial Calculators - EMI, SIP, SWP Calculators | MoneySynth",
    description:
      "Free online financial calculators for loans and investments in India. Calculate EMI, SIP, SWP, RD, FD, loan eligibility, and more with accurate results, amortization schedules, and growth charts.",
    type: "website",
    url: "https://moneysynth.com",
    siteName: "MoneySynth",
    locale: "en_IN",
    images: [
      {
        url: "/fulllogo_transparent_nobuffer.png",
        width: 1200,
        height: 630,
        alt: "MoneySynth - Free Financial Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Financial Calculators - EMI, SIP, SWP Calculators | MoneySynth",
    description:
      "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, and more with accurate results.",
    images: ["/fulllogo_transparent_nobuffer.png"],
  },
  alternates: {
    canonical: "https://moneysynth.com/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MoneySynth",
  description:
    "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, and more with accurate results.",
  url: "https://moneysynth.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://moneysynth.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Mock blog posts - replace with actual data source
const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding EMI: A Complete Guide",
    excerpt:
      "Learn how Equated Monthly Installments work and how to calculate them for your loans.",
    author: "MoneySynth Team",
    date: "2024-01-15",
    category: "Education",
    readTime: 5,
  },
  {
    id: "2",
    title: "SIP vs Lump Sum: Which is Better?",
    excerpt:
      "Compare Systematic Investment Plans with lump sum investments to make informed decisions.",
    author: "MoneySynth Team",
    date: "2024-01-10",
    category: "Investment",
    readTime: 7,
  },
  {
    id: "3",
    title: "SWP: A Smart Way to Generate Regular Income",
    excerpt:
      "Discover how Systematic Withdrawal Plans can help you create a steady income stream.",
    author: "MoneySynth Team",
    date: "2024-01-05",
    category: "Retirement",
    readTime: 6,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title & Tagline */}
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                Smart Financial
                <span className="text-primary"> Calculators</span> for
                Everyone
              </h1>
              <p className="mt-6 text-xl leading-8 text-text-secondary sm:text-2xl">
                Synthesizing Money. Simplifying Growth.
              </p>
              <p className="mt-4 text-lg font-medium text-primary">
                Smart Finance. Powered by Insights.
              </p>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                Make informed financial decisions with our easy-to-use
                calculators. Calculate EMI, SIP, SWP, and more with accurate
                results and beautiful visualizations.
              </p>
            </div>

            {/* Interactive Calculators */}
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <QuickEMICalculator />
              <LoanEligibilityCalculator />
            </div>

            {/* CTA */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                <Link href="/calculators">
                  <Button size="lg" variant="primary">
                    Explore All Calculators
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline">
                    Read Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Our Calculators
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Choose the right calculator for your financial planning needs
              </p>
            </div>
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CalculatorCard
                title="Home Loan Calculator"
                description="Calculate your Equated Monthly Installment for home loans with detailed amortization schedule."
                href="/calculators/loans/emi-calculator"
                icon={<DollarSign className="h-6 w-6" />}
              />
              <CalculatorCard
                title="Advanced Home Loan Calculator"
                description="Home loan calculator with part payments, prepayment options, and scenario comparison."
                href="/calculators/loans/emi-calculator-advanced"
                icon={<Calculator className="h-6 w-6" />}
              />
              <CalculatorCard
                title="Loan Eligibility Calculator"
                description="Check your loan eligibility based on income, existing obligations, and tenure."
                href="/calculators/loans/loan-eligibility"
                icon={<Target className="h-6 w-6" />}
              />
              <CalculatorCard
                title="SIP Calculator"
                description="Plan your Systematic Investment Plan and see how your investments can grow over time."
                href="/calculators/investments/sip-calculator"
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <CalculatorCard
                title="SWP Calculator"
                description="Calculate your Systematic Withdrawal Plan to generate regular income from your investments."
                href="/calculators/investments/swp-calculator"
                icon={<Calculator className="h-6 w-6" />}
              />
              <CalculatorCard
                title="RD Calculator"
                description="Calculate maturity amount for Recurring Deposit investments."
                href="/calculators/investments/rd-calculator"
                icon={<PiggyBank className="h-6 w-6" />}
              />
            </div>
            <div className="mt-12 text-center">
              <Link href="/calculators">
                <Button variant="outline" size="lg">
                  View All Calculators
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="bg-surface/50 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Latest from Our Blog
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Stay informed with our financial tips and insights
              </p>
            </div>
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="flex flex-col transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2 text-xs text-text-secondary">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-secondary">
                        <p>{post.author}</p>
                        <p>{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  View All Posts
                  <BookOpen className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Ad Section */}
        <section className="border-t border-border py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              {/* <AdUnit size="728x90" className="mx-auto" /> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SEOStructuredData type="WebSite" data={structuredData} />
    </div>
  );
}
