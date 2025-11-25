# MoneySynth - Financial Calculator Platform

**Synthesizing Money. Simplifying Growth.**

MoneySynth is a modern, comprehensive financial calculator platform built with Next.js, TypeScript, and Tailwind CSS. It provides intuitive tools for loans, investments, and financial planning, helping users make informed financial decisions.

## 🚀 Features

### Financial Calculators

#### Loan Calculators
- **EMI Calculator** - Calculate Equated Monthly Installments for home loans, car loans, and personal loans
- **Advanced EMI Calculator** - EMI calculator with part payments, prepayment options, and detailed amortization schedules
- **EMI Calculator Comparison** - Compare up to 3 loan scenarios side by side
- **Advanced EMI Comparison** - Compare loan scenarios with part payments
- **Loan Eligibility Calculator** - Check loan eligibility based on income, existing obligations, and tenure

#### Investment Calculators
- **SIP Calculator** - Calculate returns on Systematic Investment Plans
- **Step-up SIP Calculator** - SIP with annual step-up increases
- **SWP Calculator** - Systematic Withdrawal Plan for regular income generation
- **Lumpsum Calculator** - Calculate future value of one-time investments
- **RD Calculator** - Recurring Deposit maturity calculations
- **FD Calculator** - Fixed Deposit returns with different payout options
- **Goal-Based MF Calculator** - Plan investments to achieve financial goals

### Key Features
- ✅ **Real-time Calculations** - Instant results as you adjust inputs
- ✅ **Interactive Charts** - Visual representations with Recharts
- ✅ **Filterable Legends** - Click legend items to show/hide chart series
- ✅ **Date-based Labels** - Charts show actual month/year instead of generic labels
- ✅ **Comparison Tools** - Compare multiple scenarios side by side
- ✅ **Export Functionality** - Export calculations as PDF or CSV
- ✅ **Save Calculations** - Save calculations to local storage
- ✅ **Social Sharing** - Share calculation results
- ✅ **Dark/Light Theme** - System preference detection with manual toggle
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **SEO Optimized** - Rich metadata, structured data, and server-side rendering
- ✅ **Accessibility** - WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes
- **Export**: jsPDF, jsPDF-autotable
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
dash/
├── app/                          # Next.js App Router pages
│   ├── about/                   # About page
│   ├── blog/                    # Blog listing and dynamic posts
│   ├── calculators/             # Calculator pages
│   │   ├── loans/              # Loan calculators
│   │   └── investments/         # Investment calculators
│   ├── faq/                     # FAQ page
│   ├── privacy-policy/          # Privacy policy
│   ├── terms-of-service/        # Terms of service
│   └── disclaimer/              # Disclaimer
├── components/
│   ├── calculators/             # Calculator components
│   │   ├── common/             # Shared calculator components
│   │   ├── loan-calculators/   # Loan calculator components
│   │   └── investment-calculators/ # Investment calculator components
│   ├── common/                  # Common components (AdUnit, SEO)
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── navigation/              # Navigation components
│   ├── providers/               # Context providers
│   └── ui/                      # UI components
├── lib/                         # Utility functions
│   ├── export.ts               # PDF/CSV export functions
│   ├── storage.ts               # Local storage utilities
│   └── utils.ts                 # General utilities
└── types/                       # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dash
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env.local file in the root directory
cp .env.example .env.local
```

Edit `.env.local` and add your Google Analytics Measurement ID:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

To get your Google Analytics Measurement ID:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to Admin → Data Streams → Web
4. Copy your Measurement ID (format: G-XXXXXXXXXX)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📊 Available Calculators

### Loan Calculators
- `/calculators/loans/emi-calculator` - Basic EMI Calculator
- `/calculators/loans/emi-calculator/compare` - EMI Comparison Tool
- `/calculators/loans/emi-calculator-advanced` - Advanced EMI with Part Payments
- `/calculators/loans/emi-calculator-advanced/compare` - Advanced EMI Comparison
- `/calculators/loans/loan-eligibility` - Loan Eligibility Checker

### Investment Calculators
- `/calculators/investments/sip-calculator` - SIP Returns Calculator
- `/calculators/investments/step-up-sip-calculator` - Step-up SIP Calculator
- `/calculators/investments/swp-calculator` - SWP Calculator
- `/calculators/investments/lumpsum-calculator` - Lumpsum Investment Calculator
- `/calculators/investments/rd-calculator` - Recurring Deposit Calculator
- `/calculators/investments/fd-calculator` - Fixed Deposit Calculator
- `/calculators/investments/goal-based-mf-calculator` - Goal-Based Planning

## 🎨 Design System

### Color Palette

**Light Theme:**
- Primary: `#2563eb` (Blue)
- Secondary: `#10b981` (Green)
- Accent: `#8b5cf6` (Purple)
- Background: `#ffffff`
- Surface: `#f9fafb`
- Text Primary: `#111827`
- Text Secondary: `#6b7280`
- Border: `#e5e7eb`

**Dark Theme:**
- Primary: `#3b82f6` (Blue)
- Secondary: `#34d399` (Green)
- Accent: `#a78bfa` (Purple)
- Background: `#111827`
- Surface: `#1f2937`
- Text Primary: `#f9fafb`
- Text Secondary: `#d1d5db`
- Border: `#374151`

## 🔧 Development

### Key Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Prefer Server Components by default
- Use `"use client"` only when necessary
- Follow the existing component structure

## 📝 Features in Detail

### Calculator Features
- **Synchronized Inputs** - Sliders and number inputs stay in sync
- **Real-time Updates** - Calculations update instantly
- **Visual Charts** - Bar charts, line charts, area charts, pie charts
- **Amortization Schedules** - Year-wise and month-wise breakdowns
- **Export Options** - PDF and CSV export
- **Save & Compare** - Save calculations and compare scenarios

### SEO & Performance
- Server-Side Rendering (SSR) for all pages
- Static Site Generation (SSG) where possible
- Rich metadata and structured data (JSON-LD)
- Open Graph and Twitter Card support
- Optimized images and lazy loading

### Analytics
- Google Analytics 4 (GA4) integration
- Automatic page view tracking
- Environment variable configuration
- Privacy-compliant implementation

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.

## 📞 Support

For support, visit our [FAQ page](/faq) or contact us through the website.

---

**Built with ❤️ for better financial planning**
