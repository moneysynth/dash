import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { IdentitySchema } from "@/components/common/IdentitySchema";
import { ToastContainer } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Use font-display: swap for better perceived performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Use font-display: swap for better perceived performance
});

export const metadata: Metadata = {
  title: {
    default: "MoneySynth - Free Financial Calculators for Loans & Investments | EMI, SIP, SWP Calculator",
    template: "%s | MoneySynth",
  },
  description:
    "Free online financial calculators for loans and investments. Calculate EMI, SIP, SWP, RD, FD, loan eligibility, and more. Get accurate results with amortization schedules, growth charts, and expert financial insights. Plan your financial goals with our comprehensive calculator suite.",
  keywords: [
    "financial calculator",
    "EMI calculator",
    "SIP calculator",
    "SWP calculator",
    "loan calculator",
    "investment calculator",
    "mutual fund calculator",
    "RD calculator",
    "FD calculator",
    "loan eligibility calculator",
    "home loan calculator",
    "car loan calculator",
    "personal loan calculator",
    "SIP returns calculator",
    "loan EMI calculator",
    "financial planning tools",
    "online calculator",
    "free calculator",
    "financial calculator online",
    "loan calculator",
    "investment calculator",
    "EMI calculator online",
    "SIP calculator online",
    "financial planning calculator",
    "goal-based calculator",
    "retirement calculator",
    "education planning calculator",
    "credit card loan calculator",
    "credit card EMI calculator",
    "credit card interest calculator",
    "credit card balance calculator",
    "credit card payment calculator",
    "credit card payment schedule calculator",
    "credit card payment schedule calculator",
  ],
  authors: [{ name: "MoneySynth Team" }],
  creator: "MoneySynth",
  publisher: "MoneySynth",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://moneysynth.com",
    siteName: "MoneySynth",
    title: "MoneySynth - Free Financial Calculators for Loans & Investments",
    description:
      "Free online financial calculators for EMI, SIP, SWP, RD, FD, and more. Calculate loans, investments, and plan your financial goals with accurate results.",
    images: [
      {
        url: "/fulllogo_transparent_nobuffer.png",
        width: 1200,
        height: 630,
        alt: "MoneySynth - Financial Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneySynth - Free Financial Calculators for Loans & Investments",
    description:
      "Free online financial calculators for EMI, SIP, SWP, RD, FD, and more. Calculate loans, investments, and plan your financial goals.",
    images: ["/fulllogo_transparent_nobuffer.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://moneysynth.com",
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5962590910003151"
      crossOrigin="anonymous"></script>
        <IdentitySchema />
        <GoogleAnalytics />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <CurrencyProvider>
              {children}
              <ToastContainer />
            </CurrencyProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
