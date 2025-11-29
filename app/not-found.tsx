import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Home, Calculator, TrendingUp, HelpCircle, BarChart3, BookOpen, HelpCircle as HelpIcon, Info } from "lucide-react";
// import { AdUnit } from "@/components/common/AdUnit";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Ad Section */}
            {/* <div className="mb-8 flex justify-center">
              <AdUnit size="728x90" />
            </div> */}

            {/* 404 Content */}
            <div className="text-center">
              <div className="mb-8">
                <h1 className="text-9xl font-bold text-primary sm:text-[12rem]">404</h1>
                <div className="mt-4 inline-block h-1 w-24 rounded-full bg-primary"></div>
              </div>

              <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                Page Not Found
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted,
                or the URL might be incorrect. Use the links below to navigate to where you want to go.
              </p>

              {/* Quick Navigation Links */}
              <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">Home</span>
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <Calculator className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">Calculators</span>
                  </Button>
                </Link>
                <Link href="/tools/home-loan-emi-comparison">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">Tools</span>
                  </Button>
                </Link>
                <Link href="/blogs">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">Blog</span>
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <HelpIcon className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">FAQ</span>
                  </Button>
                </Link>
                <Link href="/about-us">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-3"
                  >
                    <Info className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">About</span>
                  </Button>
                </Link>
              </div>

              {/* Calculators by Category */}
              <div className="mb-12 space-y-8">
                {/* Loan Calculators */}
                <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-text-primary">
                      Loan Calculators
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                      href="/calculators/emi-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Home Loan Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate EMI with prepayment options
                      </p>
                    </Link>
                    <Link
                      href="/calculators/home-loan-emi-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Home Loan EMI Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate home loan EMI
                      </p>
                    </Link>
                    <Link
                      href="/calculators/personal-loan-emi-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Personal Loan Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate personal loan EMI
                      </p>
                    </Link>
                    <Link
                      href="/calculators/car-loan-emi-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Car Loan Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate car loan EMI
                      </p>
                    </Link>
                    <Link
                      href="/calculators/credit-card-emi-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Credit Card EMI Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate credit card EMI
                      </p>
                    </Link>
                    <Link
                      href="/calculators/loan-eligibility-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Loan Eligibility Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Check your loan eligibility
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Investment Calculators */}
                <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-text-primary">
                      Investment Calculators
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                      href="/calculators/sip-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">SIP Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate SIP returns
                      </p>
                    </Link>
                    <Link
                      href="/calculators/lumpsum-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Lumpsum Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate one-time investment returns
                      </p>
                    </Link>
                    <Link
                      href="/calculators/fd-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">FD Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate fixed deposit returns
                      </p>
                    </Link>
                    <Link
                      href="/calculators/rd-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">RD Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate recurring deposit returns
                      </p>
                    </Link>
                    <Link
                      href="/calculators/swp-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">SWP Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate systematic withdrawal plan
                      </p>
                    </Link>
                    <Link
                      href="/calculators/mutual-fund-returns-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Mutual Fund Returns</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate MF returns with CAGR
                      </p>
                    </Link>
                  </div>
                </div>

                {/* General Calculators */}
                <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-text-primary">
                      General Calculators
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                      href="/calculators/age-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Age Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate your exact age
                      </p>
                    </Link>
                    <Link
                      href="/calculators/percentage-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Percentage Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate percentages and changes
                      </p>
                    </Link>
                    <Link
                      href="/calculators/salary-calculator"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Salary Calculator</h4>
                      <p className="text-sm text-text-secondary">
                        Calculate take-home salary
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Tools */}
                <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-text-primary">
                      Comparison Tools
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                      href="/tools/home-loan-emi-comparison"
                      className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                    >
                      <h4 className="mb-1 font-semibold text-text-primary">Home Loan EMI Comparison</h4>
                      <p className="text-sm text-text-secondary">
                        Compare up to 3 home loan scenarios
                      </p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="flex justify-center">
                <BackButton />
              </div>
            </div>

            {/* Ad Section */}
            {/* <div className="mt-12 flex justify-center">
              <AdUnit size="300x250" />
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

