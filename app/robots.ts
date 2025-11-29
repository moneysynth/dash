import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://moneysynth.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot-Mobile",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Sogou",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Exabot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "facebot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "ia_archiver",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

