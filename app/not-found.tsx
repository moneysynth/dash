import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Home, Calculator, Search } from "lucide-react";
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
                or the URL might be incorrect.
              </p>

              {/* Quick Links */}
              <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Home className="h-5 w-5" />
                    <span>Go to Homepage</span>
                  </Button>
                </Link>
                <Link href="/calculators">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Calculator className="h-5 w-5" />
                    <span>Browse Calculators</span>
                  </Button>
                </Link>
                <Link href="/compare/loans">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Search className="h-5 w-5" />
                    <span>Compare Loans</span>
                  </Button>
                </Link>
              </div>

              {/* Popular Calculators */}
              <div className="mb-12 rounded-lg border border-border bg-surface p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-semibold text-text-primary">
                  Popular Calculators
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    href="/calculators/loans/emi-calculator"
                    className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                  >
                    <h4 className="mb-1 font-semibold text-text-primary">Home Loan Calculator</h4>
                    <p className="text-sm text-text-secondary">
                      Calculate EMI for home loans
                    </p>
                  </Link>
                  <Link
                    href="/calculators/investments/sip-calculator"
                    className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                  >
                    <h4 className="mb-1 font-semibold text-text-primary">SIP Calculator</h4>
                    <p className="text-sm text-text-secondary">
                      Calculate SIP returns
                    </p>
                  </Link>
                  <Link
                    href="/calculators/loans/loan-eligibility"
                    className="rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:bg-surface/80 hover:border-primary"
                  >
                    <h4 className="mb-1 font-semibold text-text-primary">Loan Eligibility</h4>
                    <p className="text-sm text-text-secondary">
                      Check your loan eligibility
                    </p>
                  </Link>
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

