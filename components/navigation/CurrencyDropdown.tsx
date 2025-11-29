"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";

const currencies: { code: Currency; name: string; symbol: string }[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

export function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find current currency - this will update when currency changes
  const currentCurrency = currencies.find((c) => c.code === currency) || currencies[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
          "border border-border bg-surface hover:bg-surface/80",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "text-text-primary"
        )}
        aria-label="Select currency"
      >
        <span>{currentCurrency.symbol}</span>
        <span className="hidden sm:inline">{currentCurrency.code}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-text-secondary transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface shadow-lg z-50">
          <div className="p-1">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                type="button"
                onClick={() => {
                  setCurrency(curr.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm",
                  "transition-colors text-left",
                  currency === curr.code
                    ? "bg-primary text-white"
                    : "text-text-primary hover:bg-surface/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{curr.symbol}</span>
                  <span>{curr.name}</span>
                </div>
                <span className="text-xs opacity-70">{curr.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

