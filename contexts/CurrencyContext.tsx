"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type Currency = "INR" | "USD" | "EUR" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  formatNumber: (num: number) => string;
  formatInIndianUnits: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencyConfig: Record<Currency, { locale: string; symbol: string }> = {
  INR: { locale: "en-IN", symbol: "₹" },
  USD: { locale: "en-US", symbol: "$" },
  EUR: { locale: "de-DE", symbol: "€" },
  GBP: { locale: "en-GB", symbol: "£" },
};

// Map country codes to currencies
const countryToCurrency: Record<string, Currency> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  IE: "EUR", // Ireland
  AT: "EUR", // Austria
  BE: "EUR", // Belgium
  FI: "EUR", // Finland
  FR: "EUR", // France
  DE: "EUR", // Germany
  GR: "EUR", // Greece
  IT: "EUR", // Italy
  LU: "EUR", // Luxembourg
  NL: "EUR", // Netherlands
  PT: "EUR", // Portugal
  ES: "EUR", // Spain
  // Add more EU countries
  AD: "EUR",
  MC: "EUR",
  SM: "EUR",
  VA: "EUR",
  MT: "EUR",
  CY: "EUR",
  SK: "EUR",
  SI: "EUR",
  EE: "EUR",
  LV: "EUR",
  LT: "EUR",
};

// Detect currency based on IP
async function detectCurrencyFromIP(): Promise<Currency> {
  try {
    // Using ipapi.co free tier (no API key needed for basic country detection)
    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await response.json();
    const countryCode = data.country_code;

    if (countryCode && countryToCurrency[countryCode]) {
      return countryToCurrency[countryCode];
    }

    // Default to INR if country not mapped
    return "INR";
  } catch (error) {
    console.error("Error detecting currency from IP:", error);
    // Default to INR on error
    return "INR";
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize currency on mount (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setIsInitialized(true);
      return;
    }

    const initializeCurrency = async () => {
      try {
        // First check localStorage
        const savedCurrency = localStorage.getItem("currency") as Currency | null;
        
        if (savedCurrency && ["INR", "USD", "EUR", "GBP"].includes(savedCurrency)) {
          setCurrencyState(savedCurrency);
          setIsInitialized(true);
          return;
        }

        // If no saved currency, detect from IP
        const detectedCurrency = await detectCurrencyFromIP();
        setCurrencyState(detectedCurrency);
        localStorage.setItem("currency", detectedCurrency);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing currency:", error);
        // Default to INR on error
        setCurrencyState("INR");
        setIsInitialized(true);
      }
    };

    initializeCurrency();
  }, []);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", newCurrency);
    }
  }, []);

  const formatCurrency = useCallback(
    (amount: number): string => {
      const config = currencyConfig[currency];
      return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      }).format(amount);
    },
    [currency]
  );

  const formatNumber = useCallback(
    (num: number): string => {
      const config = currencyConfig[currency];
      return new Intl.NumberFormat(config.locale).format(num);
    },
    [currency]
  );

  const formatInIndianUnits = useCallback(
    (amount: number): string => {
      if (currency !== "INR") {
        // For non-INR currencies, just format normally
        return formatCurrency(amount);
      }

      // Indian units only for INR
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
      }
      return formatCurrency(amount);
    },
    [currency, formatCurrency]
  );

  // Always provide context value, even during initialization
  // This prevents errors during SSR when components try to use useCurrency
  // Memoize the context value to ensure proper re-renders when currency changes
  const contextValue = useMemo(
    () => ({
      currency,
      setCurrency,
      formatCurrency,
      formatNumber,
      formatInIndianUnits,
    }),
    [currency, setCurrency, formatCurrency, formatNumber, formatInIndianUnits]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

