import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-7">
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
              Smart Finance. Powered by Insights. MoneySynth empowers you to make
              confident financial decisions with intelligent calculators, expert
              insights, and data-driven tools for loans, investments, and financial planning.
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
                  href="/calculators/home-loan-emi-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Home Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/personal-loan-emi-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Personal Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/car-loan-emi-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Car Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/credit-card-emi-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Credit Card EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/loan-eligibility-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Loan Eligibility Calculator
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
                  href="/calculators/sip-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/step-up-sip-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Step-up SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/lumpsum-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Lumpsum Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/swp-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  SWP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/rd-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  RD Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/fd-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  FD Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/goal-based-mf-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Goal-Based MF Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/mutual-fund-returns-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Mutual Fund Returns Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* General Calculators */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              General Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculators/age-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/percentage-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/salary-calculator"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Salary Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text-primary">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools/home-loan-emi-comparison"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Home Loan EMI Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/salary-comparison-labour-code-2025"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Salary Comparison - Labour Code 2025
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
                  href="/about-us"
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

