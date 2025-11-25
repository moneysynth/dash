"use client";
import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
// import { AdUnit } from "@/components/common/AdUnit";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // EMI & Loans
  {
    id: "1",
    question: "What is EMI and how is it calculated?",
    answer: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal loan amount, R is the monthly interest rate, and N is the number of monthly installments.",
    category: "Loans",
    tags: ["EMI", "loan", "calculation", "formula"],
  },
  {
    id: "2",
    question: "How does prepayment affect my loan EMI?",
    answer: "Prepayment reduces your principal amount, which can either reduce your EMI (if you opt for EMI reduction) or shorten your loan tenure (if you keep the same EMI). Both options help you save on total interest paid. Use our Advanced Home Loan Calculator to see the exact savings from prepayments.",
    category: "Loans",
    tags: ["prepayment", "EMI", "loan", "savings"],
  },
  {
    id: "3",
    question: "What factors affect my loan eligibility?",
    answer: "Loan eligibility depends on several factors including your monthly income, existing financial obligations (current EMIs), credit score, age, employment stability, and the loan tenure. Banks typically allow 40-60% of your net income for EMI payments. Use our Loan Eligibility Calculator to check your eligibility.",
    category: "Loans",
    tags: ["loan eligibility", "credit score", "income", "EMI"],
  },
  {
    id: "4",
    question: "What is the difference between reducing balance and flat interest rate?",
    answer: "In a reducing balance method, interest is calculated on the outstanding principal amount, which decreases over time. In a flat rate method, interest is calculated on the original principal amount throughout the loan tenure. Reducing balance method results in lower total interest. Most banks use the reducing balance method.",
    category: "Loans",
    tags: ["interest rate", "reducing balance", "flat rate", "loan"],
  },
  {
    id: "5",
    question: "Can I change my EMI amount during the loan tenure?",
    answer: "Yes, you can modify your EMI through part payments or prepayments. Some lenders also allow you to increase or decrease your EMI amount during the loan tenure, subject to their policies. This can help you adjust your monthly budget or pay off the loan faster.",
    category: "Loans",
    tags: ["EMI", "loan modification", "prepayment", "part payment"],
  },
  // SIP & Investments
  {
    id: "6",
    question: "What is SIP and how does it work?",
    answer: "SIP (Systematic Investment Plan) is an investment method where you invest a fixed amount regularly (usually monthly) in mutual funds. SIP helps in rupee cost averaging and compounding, allowing you to build wealth over time. It's ideal for long-term financial goals and helps inculcate disciplined investing habits.",
    category: "Investments",
    tags: ["SIP", "mutual funds", "investment", "systematic investment"],
  },
  {
    id: "7",
    question: "What is the difference between SIP and lump sum investment?",
    answer: "SIP involves investing a fixed amount regularly over time, while lump sum is a one-time investment. SIP helps in rupee cost averaging and reduces the impact of market volatility. Lump sum investments can be beneficial if you have a large amount and can time the market, but SIP is generally recommended for most investors due to its disciplined approach.",
    category: "Investments",
    tags: ["SIP", "lump sum", "investment", "mutual funds"],
  },
  {
    id: "8",
    question: "What is Step-up SIP?",
    answer: "Step-up SIP is a feature where you can increase your SIP amount annually by a fixed percentage or amount. This helps you invest more as your income grows, accelerating your wealth creation. It's an excellent way to align your investments with your increasing earning capacity.",
    category: "Investments",
    tags: ["step-up SIP", "SIP", "investment", "mutual funds"],
  },
  {
    id: "9",
    question: "How are SIP returns calculated?",
    answer: "SIP returns are calculated using the future value of annuity formula, which accounts for monthly investments, expected annual returns, and compounding. The formula considers that each monthly installment compounds for different periods. Use our SIP Calculator to see projected returns based on your investment amount, tenure, and expected returns.",
    category: "Investments",
    tags: ["SIP", "returns", "calculation", "formula"],
  },
  {
    id: "10",
    question: "What is the power of compounding in SIP?",
    answer: "Compounding in SIP means your returns generate their own returns over time. As you continue investing, not only does your principal grow, but the returns on previous investments also compound. This exponential growth is why long-term SIP investments can generate significant wealth. The longer you stay invested, the more powerful compounding becomes.",
    category: "Investments",
    tags: ["compounding", "SIP", "returns", "long-term investment"],
  },
  // SWP
  {
    id: "11",
    question: "What is SWP and when should I use it?",
    answer: "SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount regularly from your mutual fund investments. It's ideal for retirees or those who need regular income from their investments. SWP helps you maintain your investment corpus while generating monthly income, making it a tax-efficient alternative to fixed deposits.",
    category: "Investments",
    tags: ["SWP", "withdrawal", "retirement", "income"],
  },
  {
    id: "12",
    question: "How does SWP differ from regular withdrawals?",
    answer: "SWP is a systematic approach where you withdraw a fixed amount at regular intervals (monthly/quarterly), while regular withdrawals are ad-hoc. SWP helps in better financial planning, maintains investment discipline, and can be more tax-efficient. It also allows your remaining corpus to continue growing.",
    category: "Investments",
    tags: ["SWP", "withdrawal", "systematic", "planning"],
  },
  // RD & FD
  {
    id: "13",
    question: "What is the difference between RD and FD?",
    answer: "RD (Recurring Deposit) requires monthly deposits of a fixed amount, while FD (Fixed Deposit) is a one-time lump sum investment. RD is ideal for those who want to save regularly, while FD suits those with a lump sum. Both offer fixed returns and are low-risk investment options. Interest rates and tax benefits are similar for both.",
    category: "Investments",
    tags: ["RD", "FD", "fixed deposit", "recurring deposit"],
  },
  {
    id: "14",
    question: "How is interest calculated on RD?",
    answer: "RD interest is calculated using the formula: Maturity Amount = P × [((1 + r)^n - 1) / (1 - (1 + r)^(-1/3))] × (1 + r), where P is monthly deposit, r is monthly interest rate, and n is number of months. Interest is compounded quarterly in most banks. Use our RD Calculator to see your maturity amount.",
    category: "Investments",
    tags: ["RD", "interest", "calculation", "recurring deposit"],
  },
  {
    id: "15",
    question: "What are the tax benefits of FD and RD?",
    answer: "FD and RD interest is taxable as per your income tax slab. However, you can claim tax deduction under Section 80C for tax-saving FDs (5-year lock-in). Senior citizens can claim deduction up to ₹50,000 under Section 80TTB on interest income. TDS is deducted if interest exceeds ₹40,000 (₹50,000 for senior citizens) annually.",
    category: "Investments",
    tags: ["FD", "RD", "tax", "deduction", "TDS"],
  },
  // Goal-Based Planning
  {
    id: "16",
    question: "How do I plan for financial goals using calculators?",
    answer: "Start by defining your goal amount, timeline, and current savings. Use our Goal-Based MF Calculator to determine how much you need to invest monthly (SIP) or as a lump sum to achieve your goal. Consider inflation while setting your target amount. Regularly review and adjust your investments based on progress.",
    category: "Planning",
    tags: ["goal planning", "financial goals", "SIP", "investment"],
  },
  {
    id: "17",
    question: "What is inflation-adjusted goal amount?",
    answer: "Inflation-adjusted goal amount accounts for the decrease in purchasing power over time. For example, if your goal costs ₹10 lakhs today, with 6% inflation, you'll need approximately ₹17.9 lakhs in 10 years. Always calculate your goals considering inflation to ensure you have sufficient funds when needed.",
    category: "Planning",
    tags: ["inflation", "goal planning", "purchasing power", "financial planning"],
  },
  // General Finance
  {
    id: "18",
    question: "What is the 50-30-20 rule in personal finance?",
    answer: "The 50-30-20 rule suggests allocating 50% of income to needs (rent, groceries, EMIs), 30% to wants (entertainment, dining out), and 20% to savings and investments. This is a simple budgeting framework that helps maintain financial discipline and ensures you save and invest regularly.",
    category: "General",
    tags: ["budgeting", "personal finance", "savings", "financial planning"],
  },
  {
    id: "19",
    question: "How much should I save for emergency fund?",
    answer: "Financial experts recommend maintaining an emergency fund equivalent to 3-6 months of your monthly expenses. This fund should be easily accessible (like a savings account or liquid mutual funds) and should cover essential expenses like rent, groceries, EMIs, and medical emergencies. Start building this fund before investing in other instruments.",
    category: "General",
    tags: ["emergency fund", "savings", "financial planning", "budgeting"],
  },
  {
    id: "20",
    question: "What is the difference between saving and investing?",
    answer: "Saving is setting aside money in low-risk, easily accessible instruments (savings account, FDs) for short-term goals and emergencies. Investing involves putting money in assets that can grow over time (mutual funds, stocks) for long-term wealth creation. Savings preserve capital, while investments aim to grow wealth but carry higher risk.",
    category: "General",
    tags: ["saving", "investing", "financial planning", "wealth creation"],
  },
  {
    id: "21",
    question: "How do I calculate my net worth?",
    answer: "Net worth = Total Assets (property, investments, savings, valuables) - Total Liabilities (loans, credit card debt, other obligations). Regularly calculating your net worth helps track your financial progress. Aim to increase your net worth over time through savings, investments, and debt reduction.",
    category: "General",
    tags: ["net worth", "assets", "liabilities", "financial health"],
  },
  {
    id: "22",
    question: "What is asset allocation and why is it important?",
    answer: "Asset allocation is the distribution of your investments across different asset classes (equity, debt, gold, real estate). It's important because different assets perform differently in various market conditions. A well-diversified portfolio reduces risk and helps achieve stable returns. Your allocation should align with your risk tolerance, age, and financial goals.",
    category: "General",
    tags: ["asset allocation", "diversification", "portfolio", "risk management"],
  },
  // Calculator Usage
  {
    id: "23",
    question: "How accurate are the calculator results?",
    answer: "Our calculators use standard financial formulas and provide accurate results based on the inputs you provide. However, actual results may vary due to factors like changing interest rates, market conditions, fees, and charges not included in calculations. Always verify with your financial institution for exact figures.",
    category: "Calculators",
    tags: ["accuracy", "calculators", "results", "formulas"],
  },
  {
    id: "24",
    question: "Can I save my calculations for future reference?",
    answer: "Yes! Most of our calculators have a 'Save Calculation' feature that allows you to save your calculations to your browser's local storage. You can access saved calculations later and compare different scenarios. Note that saved data is stored locally on your device.",
    category: "Calculators",
    tags: ["save", "calculations", "local storage", "comparison"],
  },
  {
    id: "25",
    question: "How do I compare different loan scenarios?",
    answer: "Use our Home Loan Comparison tool to compare up to 3 different home loan scenarios side by side. You can compare different interest rates, loan amounts, and tenures to find the best option. The tool provides visual charts and detailed breakdowns to help you make informed decisions.",
    category: "Calculators",
    tags: ["comparison", "EMI", "loan", "scenarios"],
  },
  {
    id: "26",
    question: "What information do I need to use the calculators?",
    answer: "Basic information required varies by calculator: EMI calculators need loan amount, interest rate, and tenure. SIP calculators need monthly investment, expected returns, and tenure. Most calculators have default values to help you get started. You can adjust all inputs using sliders or number inputs.",
    category: "Calculators",
    tags: ["calculators", "inputs", "information", "usage"],
  },
  {
    id: "27",
    question: "Are the calculators free to use?",
    answer: "Yes, all our financial calculators are completely free to use. There's no registration required, and you can use them as many times as you need. We provide these tools to help you make informed financial decisions without any cost.",
    category: "Calculators",
    tags: ["free", "calculators", "cost", "accessibility"],
  },
  // Tax & Benefits
  {
    id: "28",
    question: "What are the tax benefits of home loans?",
    answer: "Home loans offer tax benefits under Section 24(b) for interest paid (up to ₹2 lakhs for self-occupied property, unlimited for let-out property) and Section 80C for principal repayment (up to ₹1.5 lakhs). Additional deduction of ₹1.5 lakhs is available under Section 80EE for first-time home buyers. Use our EMI calculator to see the effective cost after tax benefits.",
    category: "Tax",
    tags: ["home loan", "tax benefits", "Section 24", "Section 80C"],
  },
  {
    id: "29",
    question: "How are mutual fund returns taxed?",
    answer: "Equity mutual funds: Long-term capital gains (held >1 year) are taxed at 10% above ₹1 lakh. Short-term gains are taxed at 15%. Debt mutual funds: Gains are taxed as per your income tax slab. ELSS funds offer tax deduction under Section 80C. Always consult a tax advisor for your specific situation.",
    category: "Tax",
    tags: ["mutual funds", "tax", "capital gains", "ELSS"],
  },
  {
    id: "30",
    question: "What is TDS on fixed deposits?",
    answer: "TDS (Tax Deducted at Source) is deducted on FD interest if it exceeds ₹40,000 annually (₹50,000 for senior citizens) at 10% rate. You can avoid TDS by submitting Form 15G/15H if your total income is below the taxable limit. TDS deducted can be claimed as credit while filing your income tax return.",
    category: "Tax",
    tags: ["TDS", "FD", "fixed deposit", "tax"],
  },
];

const categories = Array.from(new Set(faqData.map((item) => item.category)));

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === null || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    faqData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Find answers to common questions about our financial calculators
                and tools
              </p>
            </div>

            {/* Search Box */}
            <Card className="mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                  <Input
                    type="text"
                    placeholder="Search questions, answers, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-6 text-base"
                  />
                </div>
                {searchQuery && (
                  <p className="mt-3 text-sm text-text-secondary">
                    Found {filteredFAQs.length} result
                    {filteredFAQs.length !== 1 ? "s" : ""}
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar - Category Filters */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Filters</CardTitle>
                    <CardDescription>Filter by category</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "primary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Questions
                      <span className="ml-auto text-xs opacity-70">
                        ({faqData.length})
                      </span>
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "primary" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <span className="ml-auto text-xs opacity-70">
                          ({categoryCounts[category]})
                        </span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* <AdUnit size="300x250" className="mt-6" /> */}
              </div>

              {/* Main Content - FAQ Items */}
              <div className="lg:col-span-3">
                {filteredFAQs.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-lg text-text-secondary">
                        No questions found matching your search.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((item) => {
                      const isOpen = openItems.has(item.id);
                      return (
                        <Card key={item.id} className="transition-shadow hover:shadow-md">
                          <CardHeader
                            className="cursor-pointer"
                            onClick={() => toggleItem(item.id)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="mb-2">
                                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                    {item.category}
                                  </span>
                                </div>
                                <CardTitle className="text-left text-lg">
                                  {item.question}
                                </CardTitle>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 flex-shrink-0 p-0"
                              >
                                {isOpen ? (
                                  <ChevronUp className="h-5 w-5" />
                                ) : (
                                  <ChevronDown className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          {isOpen && (
                            <CardContent className="pt-0">
                              <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed">
                                <p>{item.answer}</p>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-md bg-surface px-2 py-1 text-xs text-text-secondary"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}

                {filteredFAQs.length > 0 && (
                  <div className="mt-8">
                    {/* <AdUnit size="728x90" className="mx-auto" /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

