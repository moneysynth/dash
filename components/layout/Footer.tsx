import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/fulllogo_transparent_nobuffer.png"
                alt="MoneySynth Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-text-secondary max-w-md">
              Your trusted financial calculator platform for making informed
              investment decisions. Calculate EMI, SIP, SWP, and more with
              accurate results and beautiful visualizations.
            </p>
            <div className="pt-2">
              <Link
                href="/calculators"
                className="text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                View All Calculators →
              </Link>
            </div>
          </div>
          
          {/* Loan Calculators */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Loan Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculators/loans/emi-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Home Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loans/emi-calculator-advanced"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Advanced Home Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loans/personal-loan"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Personal Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loans/car-loan"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Car Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loans/credit-card-emi"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Credit Card EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loans/loan-eligibility"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Loan Eligibility Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Comparison Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Comparison Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/compare/loans"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Loan Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/loans/home-loan"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Home Loan Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/loans/home-loan-advanced"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Advanced Home Loan Comparison
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Investment Calculators */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Investment Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculators/investments/sip-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/step-up-sip-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Step-up SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/lumpsum-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Lumpsum Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/swp-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  SWP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/rd-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  RD Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/fd-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  FD Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/investments/goal-based-mf-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Goal-Based MF Calculator
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Resources
            </h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
            
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-sm text-text-secondary">
              © {currentYear} MoneySynth. All rights reserved.
            </p>
            <p className="text-center md:text-right text-xs text-text-secondary max-w-2xl">
              The calculations provided are for informational purposes only and
              should not be considered as financial advice. Please consult with
              a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

