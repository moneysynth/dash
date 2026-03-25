"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { CalculatorDropdown } from "@/components/navigation/CalculatorDropdown";
import { ToolsDropdown } from "@/components/navigation/ToolsDropdown";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { CurrencyDropdown } from "@/components/navigation/CurrencyDropdown";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Show currency selector only on calculator and tool pages
  const showCurrencySelector = pathname?.startsWith("/calculators/") || pathname?.startsWith("/tools/");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/fulllogo_transparent_nobuffer.png"
              alt="MoneySynth Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Home
            </Link>
            <CalculatorDropdown />
            <ToolsDropdown />
            <Link
              href="/faq"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              FAQ
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {showCurrencySelector && <CurrencyDropdown />}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        showCurrencySelector={showCurrencySelector}
      />
    </>
  );
}

