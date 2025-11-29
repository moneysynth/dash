import type { MetadataRoute } from "next";

// Base URL for the site
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://moneysynth.com";

// Blog posts data (should match the data in blog pages)
// In production, this should be fetched from a CMS or database
const blogPosts = [
  { id: "1", date: "2024-01-15" },
  { id: "2", date: "2024-01-10" },
  { id: "3", date: "2024-01-05" },
  { id: "4", date: "2024-01-01" },
  { id: "5", date: "2023-12-28" },
  { id: "6", date: "2023-12-25" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Loan calculator pages
  const loanCalculators: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculators/emi-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/home-loan-emi-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/personal-loan-emi-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/car-loan-emi-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/credit-card-emi-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/loan-eligibility-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Investment calculator pages
  const investmentCalculators: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculators/sip-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/step-up-sip-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/swp-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/rd-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/fd-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/lumpsum-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/goal-based-mf-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/mutual-fund-returns-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // General calculators
  const generalCalculators: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculators/age-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/percentage-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/salary-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Tools pages
  const toolsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/home-loan-emi-comparison`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/salary-comparison-labour-code-2025`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.id}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...loanCalculators,
    ...investmentCalculators,
    ...generalCalculators,
    ...toolsPages,
    ...legalPages,
    ...blogPostPages,
  ];
}

