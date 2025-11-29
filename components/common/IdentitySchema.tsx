import Script from "next/script";

const identitySchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MoneySynth",
  alternateName: "MoneySynth Financial Calculators",
  url: "https://moneysynth.com",
  logo: "https://moneysynth.com/fulllogo_transparent_nobuffer.png",
  description:
    "MoneySynth is a modern financial platform that helps individuals and businesses make confident financial decisions through intelligent calculators, expert insights, and data-driven tools.",
  slogan: "Synthesizing Money. Simplifying Growth.",
  foundingDate: "2025",
  sameAs: [
    // Add social media profiles when available
    // "https://twitter.com/moneysynth",
    // "https://www.facebook.com/moneysynth",
    // "https://www.linkedin.com/company/moneysynth",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["English"],
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  knowsAbout: [
    "Financial Calculators",
    "EMI Calculator",
    "SIP Calculator",
    "Loan Calculator",
    "Investment Calculator",
    "Financial Planning",
    "Loan EMI",
    "Mutual Funds",
    "Systematic Investment Plan",
    "Home Loan",
    "Car Loan",
    "Personal Loan",
    "Credit Card EMI",
    "Fixed Deposit",
    "Recurring Deposit",
    "Goal-Based Investment",
    "Retirement Planning",
    "Financial Literacy",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Free Financial Calculators",
        description:
          "Free online financial calculators for loans and investments including EMI, SIP, SWP, RD, FD calculators with detailed analysis and visualizations.",
        provider: {
          "@type": "Organization",
          name: "MoneySynth",
        },
      },
      price: "0",
      priceCurrency: "USD",
    },
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://moneysynth.com/calculators?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export function IdentitySchema() {
  return (
    <Script
      id="identity-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(identitySchema, null, 2),
      }}
    />
  );
}

