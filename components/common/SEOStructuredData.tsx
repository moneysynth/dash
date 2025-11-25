interface StructuredDataProps {
  type: "WebSite" | "FinancialProduct" | "Calculator" | "Article" | "AboutPage";
  data: Record<string, unknown>;
}

export function SEOStructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}

// Predefined schemas for calculators
export const calculatorSchemas = {
  emi: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EMI Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free EMI calculator to calculate Equated Monthly Installment for home loans, car loans, and personal loans.",
    featureList: [
      "Calculate EMI",
      "Amortization Schedule",
      "Interest Breakdown",
      "Payment Schedule",
    ],
  },
  sip: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SIP Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Calculate returns on Systematic Investment Plan (SIP) investments with growth charts.",
    featureList: [
      "Calculate SIP Returns",
      "Growth Visualization",
      "Wealth Gain Calculation",
      "Year-by-Year Growth",
    ],
  },
};

