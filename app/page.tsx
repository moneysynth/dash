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
import { getAllBlogPosts } from "@/lib/blog";

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
  title: "MoneySynth - Financial Calculators & Investment Tools",
  description:
    "Free financial calculators for loans, investments, and planning. EMI, SIP, mutual fund tools to make informed money decisions.",
  keywords: [
    "financial calculators",
    "loan calculator",
    "investment tools",
    "EMI calculator",
    "SIP calculator",
    "mutual fund calculator",
    "money tools",
    "finance planning",
    "investment planning",
    "free financial calculators online",
    "best investment planning tools",
    "personal finance calculators",
    "free online financial calculators",
    "best investment calculator website",
    "personal finance planning tools",
    "money management calculators for beginners",
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
    "financial planning",
    "loan EMI calculator",
    "retirement calculator",
    "goal planning calculator",
    "home loan EMI calculator",
    "car loan EMI calculator",
    "personal loan EMI calculator",
    "financial calculator online",
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
    title: "MoneySynth - Financial Calculators & Investment Tools",
    description:
      "Free financial calculators for loans, investments, and planning. EMI, SIP, mutual fund tools to make informed money decisions.",
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
    title: "MoneySynth - Financial Calculators & Investment Tools",
    description:
      "Free financial calculators for loans, investments, and planning. EMI, SIP, mutual fund tools to make informed money decisions.",
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

export default function Home() {
  const allBlogPosts = getAllBlogPosts();
  const featuredPosts = allBlogPosts.slice(0, 3);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title & Tagline */}
            <div className="mx-auto max-w-4xl text-center mb-8">
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
              <p className="mt-6 text-lg leading-8 text-text-secondary max-w-3xl mx-auto">
                Make informed financial decisions with our easy-to-use
                calculators. Calculate EMI, SIP, SWP, and more with accurate
                results and beautiful visualizations. Whether you're planning a home loan, 
                investing in mutual funds, or calculating your retirement corpus, MoneySynth 
                provides the tools and insights you need to achieve your financial goals.
              </p>
            </div>

            {/* Interactive Calculators - Prominently Placed */}
            <div className="mx-auto max-w-6xl mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Try Our Calculators Now
                </h2>
                <p className="text-text-secondary">
                  Get instant results and save your calculations for later
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:sticky lg:top-24">
                  <QuickEMICalculator />
                </div>
                <div className="lg:sticky lg:top-24">
                  <LoanEligibilityCalculator />
                </div>
              </div>
            </div>

            {/* Additional Content */}
            <div className="mx-auto max-w-4xl text-base leading-7 text-text-secondary space-y-4">
              <p>
                MoneySynth is a trusted financial calculator platform, offering comprehensive 
                tools for loans, investments, and financial planning. Our calculators help millions 
                of users worldwide make smarter financial decisions by providing accurate calculations, detailed 
                amortization schedules, growth projections, and visual charts that make complex 
                financial concepts easy to understand.
              </p>
              <p>
                From calculating your home loan EMI with prepayment options to planning your SIP 
                investments for long-term wealth creation, our suite of calculators covers all aspects 
                of personal finance. Each calculator is designed with precision, transparency, and 
                user-friendliness in mind, ensuring you have all the information you need to plan 
                your financial future confidently.
              </p>
            </div>

            {/* CTA */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                <Link href="/calculators">
                  <Button size="lg" variant="primary">
                    Explore All Calculators
                  </Button>
                </Link>
                <Link href="/blogs">
                  <Button size="lg" variant="outline">
                    Read Blogs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose MoneySynth Section */}
        <section className="bg-surface/50 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  Why Choose MoneySynth?
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
                  Your trusted partner for financial planning and decision-making
                </p>
              </div>
              <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
                <p>
                  <strong className="text-text-primary">Accurate Calculations:</strong> All our calculators 
                  use industry-standard formulas and algorithms to ensure precise results. Whether you're 
                  calculating EMI for a home loan or projecting SIP returns, you can trust our calculations 
                  to be accurate and reliable.
                </p>
                <p>
                  <strong className="text-text-primary">Comprehensive Analysis:</strong> Our calculators go 
                  beyond basic calculations. They provide detailed breakdowns, amortization schedules, 
                  growth charts, and visual representations that help you understand every aspect of your 
                  financial decision. See how your loan balance decreases over time, visualize your 
                  investment growth, and understand the impact of prepayments and step-up options.
                </p>
                <p>
                  <strong className="text-text-primary">Advanced Features:</strong> Many of our calculators 
                  include advanced features like step-up EMI, part payments, prepayment analysis, goal-based 
                  planning, and scenario comparison. These features help you explore different financial 
                  strategies and make informed decisions based on your unique circumstances.
                </p>
                <p>
                  <strong className="text-text-primary">Free and Accessible:</strong> All our calculators 
                  are completely free to use, with no registration required. We believe financial literacy 
                  should be accessible to everyone, which is why we've made our entire suite of tools 
                  available at no cost. Use our calculators as many times as you need, save your calculations, 
                  and export results for your records.
                </p>
                <p>
                  <strong className="text-text-primary">Expert Insights:</strong> Along with our calculators, 
                  we provide expert-written blogs, financial guides, and educational content that help you 
                  understand financial concepts, make better decisions, and plan for your future. Our FAQ 
                  section answers common questions and provides additional context for using our tools effectively.
                </p>
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
            
            {/* Detailed Calculator Categories */}
            <div className="mx-auto max-w-4xl mb-12 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">Loan Calculators</h3>
                <p className="text-text-secondary leading-7 mb-4">
                  Our loan calculators help you understand the true cost of borrowing and plan your loan 
                  repayment strategy. Calculate EMI for home loans, car loans, personal loans, and credit 
                  card outstanding amounts. Our advanced EMI calculator includes features like step-up EMI 
                  (where your EMI increases annually), part payments, and prepayment analysis. See how 
                  prepayments can reduce your loan tenure and save thousands in interest. Get detailed 
                  amortization schedules that show the breakdown of principal and interest for each payment, 
                  helping you understand how your loan balance decreases over time.
                </p>
                <p className="text-text-secondary leading-7">
                  Use our loan eligibility calculator to check how much loan you can get based on your 
                  income, existing obligations, and credit profile. Compare different loan scenarios 
                  side-by-side to find the best option for your financial situation. All calculations 
                  are based on standard banking formulas and include options for different interest rate 
                  structures and repayment methods.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">Investment Calculators</h3>
                <p className="text-text-secondary leading-7 mb-4">
                  Plan your investments and achieve your financial goals with our comprehensive investment 
                  calculators. Calculate returns on Systematic Investment Plans (SIP) and see how regular 
                  monthly investments can grow into substantial wealth over time. Our SIP calculator shows 
                  the power of compounding and helps you understand how even small monthly investments can 
                  lead to significant returns over the long term.
                </p>
                <p className="text-text-secondary leading-7 mb-4">
                  Use our Step-up SIP calculator to plan investments that increase annually, aligning with 
                  your growing income. Calculate Systematic Withdrawal Plans (SWP) to generate regular 
                  income from your investments during retirement. Our lumpsum calculator helps you understand 
                  the future value of one-time investments, while our RD and FD calculators help you plan 
                  your fixed deposit and recurring deposit investments.
                </p>
                <p className="text-text-secondary leading-7">
                  Our Goal-Based Mutual Fund calculator helps you plan investments for specific financial 
                  goals like retirement, children's education, house purchase, or any other major expense. 
                  Simply enter your goal amount, time horizon, and expected returns, and the calculator 
                  will tell you how much you need to invest monthly or as a lumpsum to achieve your goal. 
                  This helps you create a structured investment plan that aligns with your financial objectives.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">General Calculators & Tools</h3>
                <p className="text-text-secondary leading-7 mb-4">
                  Our general calculators include useful tools for everyday financial calculations. Calculate 
                  your age, work with percentages, and understand your salary structure. Our salary calculator 
                  helps you understand your take-home salary, CTC breakdown, PF contributions, gratuity, and 
                  other components of your compensation package.
                </p>
                <p className="text-text-secondary leading-7">
                  We also offer comparison tools that help you make informed decisions. Compare different 
                  home loan scenarios to find the best option, or compare your current salary structure with 
                  the New Labour Code 2025 requirements to understand how regulatory changes might affect 
                  your take-home pay. These tools provide side-by-side comparisons with visual charts that 
                  make it easy to understand the differences and make the right choice.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CalculatorCard
                title="Home Loan Calculator"
                description="Calculate your Equated Monthly Installment for home loans with prepayment options, part payments, and detailed amortization schedule."
                href="/calculators/emi-calculator"
                icon={<DollarSign className="h-6 w-6" />}
              />
              <CalculatorCard
                title="Loan Eligibility Calculator"
                description="Check your loan eligibility based on income, existing obligations, and tenure."
                href="/calculators/loan-eligibility"
                icon={<Target className="h-6 w-6" />}
              />
              <CalculatorCard
                title="SIP Calculator"
                description="Plan your Systematic Investment Plan and see how your investments can grow over time."
                href="/calculators/sip-calculator"
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <CalculatorCard
                title="SWP Calculator"
                description="Calculate your Systematic Withdrawal Plan to generate regular income from your investments."
                href="/calculators/swp-calculator"
                icon={<Calculator className="h-6 w-6" />}
              />
              <CalculatorCard
                title="RD Calculator"
                description="Calculate maturity amount for Recurring Deposit investments."
                href="/calculators/rd-calculator"
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

        {/* How It Works Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  How MoneySynth Helps You
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
                  Simple steps to better financial planning
                </p>
              </div>
              <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
                <p>
                  <strong className="text-text-primary">Step 1: Choose Your Calculator</strong> - Browse 
                  our comprehensive collection of financial calculators. Whether you need to calculate loan 
                  EMI, plan investments, or understand your salary structure, we have the right tool for you. 
                  Each calculator is designed for a specific financial need, making it easy to find exactly 
                  what you're looking for.
                </p>
                <p>
                  <strong className="text-text-primary">Step 2: Enter Your Details</strong> - Our calculators 
                  feature intuitive interfaces with sliders, input fields, and helpful tooltips. Simply enter 
                  your loan amount, interest rate, tenure, or investment details. The calculators provide 
                  real-time updates as you adjust values, so you can instantly see how different scenarios 
                  affect your results.
                </p>
                <p>
                  <strong className="text-text-primary">Step 3: Analyze Results</strong> - Get comprehensive 
                  results including detailed breakdowns, charts, and visualizations. See amortization schedules 
                  for loans, growth projections for investments, and understand how different factors impact 
                  your financial outcomes. Our charts and graphs make complex financial data easy to understand 
                  at a glance.
                </p>
                <p>
                  <strong className="text-text-primary">Step 4: Make Informed Decisions</strong> - Use the 
                  insights from our calculators to make better financial decisions. Compare different scenarios, 
                  understand the long-term impact of your choices, and plan your finances with confidence. 
                  Save your calculations for future reference, export them as PDF or Excel files, and share 
                  them with your financial advisor or family members.
                </p>
                <p>
                  <strong className="text-text-primary">Step 5: Learn and Grow</strong> - Explore our blog 
                  section for expert insights, financial tips, and educational content. Read about EMI calculations, 
                  SIP strategies, loan prepayment benefits, and more. Our FAQ section answers common questions 
                  and provides additional context to help you make the most of our calculators.
                </p>
              </div>
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
              <p className="mt-4 text-base text-text-secondary max-w-2xl mx-auto">
                Our blog features expert-written articles covering various aspects of personal finance, 
                investment strategies, loan management, and financial planning. Learn about EMI calculations, 
                SIP benefits, loan prepayment strategies, retirement planning, and more. Each article is 
                designed to help you make better financial decisions and achieve your financial goals.
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
                      <Link href={`/blogs/${post.id}`}>
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
              <Link href="/blogs">
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
