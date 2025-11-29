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
    answer: "Prepayment reduces your principal amount, which can either reduce your EMI (if you opt for EMI reduction) or shorten your loan tenure (if you keep the same EMI). Both options help you save on total interest paid. Use our Home Loan Calculator to see the exact savings from prepayments.",
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
    answer: "Use our Home Loan EMI Comparison tool to compare up to 3 different home loan scenarios side by side. You can compare different interest rates, loan amounts, and tenures to find the best option. The tool provides visual charts and detailed breakdowns to help you make informed decisions.",
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
  // Step-up EMI
  {
    id: "31",
    question: "What is Step-up EMI and how does it work?",
    answer: "Step-up EMI is a feature where you increase your EMI amount annually by a fixed percentage. This helps you pay off your loan faster and save on interest. As your income grows, you can afford higher EMIs, which reduces your loan tenure and total interest paid. Use our Home Loan EMI Calculator to see how step-up EMI can save you money.",
    category: "Loans",
    tags: ["step-up EMI", "EMI", "home loan", "savings"],
  },
  {
    id: "32",
    question: "When should I opt for Step-up EMI?",
    answer: "Step-up EMI is ideal if you expect your income to increase over time. It's particularly beneficial for young professionals, those with variable income, or anyone who wants to pay off their loan faster. Start with a lower EMI and increase it annually as your income grows. This approach reduces financial stress initially while accelerating loan repayment later.",
    category: "Loans",
    tags: ["step-up EMI", "loan strategy", "planning", "income growth"],
  },
  {
    id: "33",
    question: "How much can I save with Step-up EMI?",
    answer: "Savings from Step-up EMI depend on your loan amount, interest rate, and the step-up percentage. Typically, a 5-10% annual step-up can save 10-20% of total interest and reduce loan tenure by 2-5 years. Use our calculator to compare scenarios with and without step-up EMI to see exact savings.",
    category: "Loans",
    tags: ["step-up EMI", "savings", "interest", "loan tenure"],
  },
  // Part Payments & Prepayments
  {
    id: "34",
    question: "What is the difference between part payment and prepayment?",
    answer: "Part payment is a one-time or recurring payment made in addition to your regular EMI, which reduces the principal amount. Prepayment typically refers to paying off a portion of the loan before the scheduled date. Both reduce your principal, but part payments can be made regularly (monthly/quarterly) while prepayments are usually one-time. Both help save interest and reduce loan tenure.",
    category: "Loans",
    tags: ["part payment", "prepayment", "EMI", "loan reduction"],
  },
  {
    id: "35",
    question: "Should I make part payments or increase my EMI?",
    answer: "Both strategies save interest, but part payments offer more flexibility. With part payments, you can pay extra when you have surplus funds without committing to a higher monthly EMI. Increasing EMI provides consistent savings but reduces monthly cash flow. Choose based on your income stability and financial goals. Use our calculator to compare both options.",
    category: "Loans",
    tags: ["part payment", "EMI increase", "loan strategy", "flexibility"],
  },
  {
    id: "36",
    question: "Are there any charges for part payments or prepayments?",
    answer: "Most banks allow part payments and prepayments, but some may charge a fee (typically 2-4% of the prepayment amount) if made within the first year. After the lock-in period (usually 1-3 years), prepayments are usually free. Always check with your lender about prepayment charges and policies before making extra payments.",
    category: "Loans",
    tags: ["prepayment charges", "part payment", "fees", "loan policy"],
  },
  // Home Loan Specific
  {
    id: "37",
    question: "What is the maximum home loan amount I can get?",
    answer: "Home loan eligibility typically ranges from 60-80% of the property value, depending on the property type and your profile. The loan amount is also limited by your income (EMI should not exceed 40-60% of net income) and property valuation. Use our Loan Eligibility Calculator to check your maximum loan amount based on your income and existing obligations.",
    category: "Loans",
    tags: ["home loan", "loan amount", "eligibility", "property value"],
  },
  {
    id: "38",
    question: "What is the difference between fixed and floating interest rates?",
    answer: "Fixed rates remain constant throughout the loan tenure, providing predictability but usually higher initial rates. Floating rates change with market conditions (linked to MCLR, repo rate), offering lower initial rates but uncertainty. Most home loans in India use floating rates. Choose based on your risk tolerance and market outlook.",
    category: "Loans",
    tags: ["interest rate", "fixed rate", "floating rate", "MCLR"],
  },
  {
    id: "39",
    question: "How do I compare different home loan offers?",
    answer: "Use our Home Loan EMI Comparison tool to compare up to 3 loan scenarios side by side. Compare interest rates, loan amounts, tenures, and total interest paid. Also consider processing fees, prepayment charges, and other hidden costs. The tool shows visual charts and detailed breakdowns to help you make an informed decision.",
    category: "Loans",
    tags: ["home loan", "comparison", "interest rate", "loan offers"],
  },
  // Car Loan & Personal Loan
  {
    id: "40",
    question: "What is the typical interest rate for car loans?",
    answer: "Car loan interest rates typically range from 7-15% per annum, depending on the car value, loan amount, tenure, and your credit profile. New cars usually get better rates than used cars. Shorter tenures (3-5 years) often have lower rates. Use our Car Loan Calculator to see EMI for different rates and tenures.",
    category: "Loans",
    tags: ["car loan", "interest rate", "EMI", "vehicle loan"],
  },
  {
    id: "41",
    question: "What is the maximum tenure for a personal loan?",
    answer: "Personal loan tenure typically ranges from 1-5 years, with some lenders offering up to 7 years for high-value loans. Shorter tenures have higher EMIs but lower total interest. Longer tenures reduce monthly burden but increase total interest. Choose based on your repayment capacity and financial goals.",
    category: "Loans",
    tags: ["personal loan", "tenure", "EMI", "loan duration"],
  },
  {
    id: "42",
    question: "Can I prepay my car loan or personal loan?",
    answer: "Yes, most lenders allow prepayment of car and personal loans, but charges may apply if prepaid within the first 6-12 months. After the lock-in period, prepayments are usually free. Prepayment reduces your principal and saves interest. Use our calculators to see the exact savings from prepayment.",
    category: "Loans",
    tags: ["car loan", "personal loan", "prepayment", "charges"],
  },
  // Credit Card EMI
  {
    id: "43",
    question: "What is Credit Card EMI and how is it calculated?",
    answer: "Credit Card EMI converts your large purchases into monthly installments. Interest rates are typically higher (12-24% per annum) than regular loans. EMI is calculated on the converted amount plus processing fees. Use our Credit Card EMI Calculator to see your monthly payment and total cost. Note that additional charges like processing fees and GST apply.",
    category: "Loans",
    tags: ["credit card EMI", "EMI conversion", "processing fees", "interest rate"],
  },
  {
    id: "44",
    question: "Should I convert my credit card purchase to EMI?",
    answer: "Credit Card EMI is convenient but expensive due to high interest rates. Consider it only if you cannot pay the full amount and need to spread payments. Compare with personal loan rates first. If you can pay within 2-3 months, it's better to pay directly. Use our calculator to see the total cost before converting.",
    category: "Loans",
    tags: ["credit card EMI", "decision", "cost", "comparison"],
  },
  // SIP & Mutual Funds
  {
    id: "45",
    question: "What is the ideal SIP amount to start with?",
    answer: "Start with an amount you can invest consistently for the long term. Even ₹500-1000 per month can grow significantly over 10-15 years due to compounding. The key is consistency, not the initial amount. As your income grows, increase your SIP through step-up SIP. Use our SIP Calculator to see how small amounts can grow over time.",
    category: "Investments",
    tags: ["SIP", "investment amount", "starting", "consistency"],
  },
  {
    id: "46",
    question: "What is the difference between equity and debt mutual funds?",
    answer: "Equity funds invest primarily in stocks, offering higher returns (12-15% expected) but higher risk and volatility. Debt funds invest in bonds and fixed-income securities, offering lower returns (6-8% expected) but more stability. Equity funds are for long-term goals (5+ years), while debt funds suit short-term goals (1-3 years) or conservative investors.",
    category: "Investments",
    tags: ["equity funds", "debt funds", "mutual funds", "risk"],
  },
  {
    id: "47",
    question: "What is CAGR and why is it important?",
    answer: "CAGR (Compound Annual Growth Rate) is the average annual return rate over a period, accounting for compounding. It's a better measure than simple average returns as it shows the actual growth rate. Use our Mutual Fund Returns Calculator to calculate CAGR for your investments. Higher CAGR indicates better performance, but consider risk and consistency too.",
    category: "Investments",
    tags: ["CAGR", "returns", "mutual funds", "compounding"],
  },
  {
    id: "48",
    question: "How do I choose the right mutual fund for SIP?",
    answer: "Consider your financial goals, risk tolerance, and investment horizon. For long-term goals (10+ years), equity funds are suitable. Check the fund's historical performance (3-5 year CAGR), expense ratio (lower is better), and fund manager's track record. Diversify across large-cap, mid-cap, and small-cap funds. Start with index funds if you're a beginner.",
    category: "Investments",
    tags: ["mutual funds", "SIP", "selection", "diversification"],
  },
  // SWP
  {
    id: "49",
    question: "How much can I withdraw through SWP?",
    answer: "SWP withdrawal amount depends on your corpus size and expected returns. Typically, you can withdraw 0.5-1% of your corpus monthly (6-12% annually) while maintaining the principal. Higher withdrawal rates may deplete your corpus. Use our SWP Calculator to determine sustainable withdrawal amounts based on your corpus and expected returns.",
    category: "Investments",
    tags: ["SWP", "withdrawal", "corpus", "sustainable income"],
  },
  {
    id: "50",
    question: "Is SWP better than FD for regular income?",
    answer: "SWP can be more tax-efficient and potentially offer higher returns than FD. SWP withdrawals from equity funds held over 1 year are taxed at 10% (above ₹1 lakh), while FD interest is taxed as per your income slab. However, SWP carries market risk, while FD offers guaranteed returns. Choose based on your risk tolerance and tax situation.",
    category: "Investments",
    tags: ["SWP", "FD", "regular income", "tax efficiency"],
  },
  // RD & FD
  {
    id: "51",
    question: "What is the maximum tenure for RD and FD?",
    answer: "RD tenure typically ranges from 6 months to 10 years, with most banks offering up to 10 years. FD tenure can range from 7 days to 10 years, with longer tenures usually offering higher interest rates. Senior citizens often get 0.25-0.50% higher rates. Use our RD and FD calculators to compare returns for different tenures.",
    category: "Investments",
    tags: ["RD", "FD", "tenure", "interest rate"],
  },
  {
    id: "52",
    question: "Can I break my FD or RD before maturity?",
    answer: "Yes, but premature withdrawal usually incurs a penalty (0.5-1% reduction in interest rate). Some banks allow partial withdrawal from FD. RD can be closed early, but you may lose interest benefits. Always check the bank's premature withdrawal policy. Consider the penalty before breaking your deposit.",
    category: "Investments",
    tags: ["FD", "RD", "premature withdrawal", "penalty"],
  },
  // Goal Planning
  {
    id: "53",
    question: "How do I calculate the amount needed for retirement?",
    answer: "Estimate your monthly expenses in retirement, multiply by 12 for annual expenses, and then by 25-30 (assuming 4% withdrawal rate) to get your retirement corpus. Account for inflation (6-7% annually) and healthcare costs. Use our Goal-Based MF Calculator to determine how much to invest monthly to achieve your retirement goal.",
    category: "Planning",
    tags: ["retirement", "corpus", "planning", "inflation"],
  },
  {
    id: "54",
    question: "How much should I invest for my child's education?",
    answer: "Education costs are rising rapidly (10-12% annually). Calculate the future cost of education considering inflation, then use our Goal-Based MF Calculator to determine monthly SIP needed. Start early - investing for 15-18 years can significantly reduce your monthly investment requirement due to compounding.",
    category: "Planning",
    tags: ["education", "planning", "SIP", "inflation"],
  },
  {
    id: "55",
    question: "What is the rule of 72 in investing?",
    answer: "The rule of 72 helps estimate how long it takes for your investment to double. Divide 72 by your annual return rate. For example, at 12% returns, your money doubles in 6 years (72/12). At 8% returns, it takes 9 years. This rule helps set realistic expectations and plan long-term investments.",
    category: "Planning",
    tags: ["rule of 72", "doubling", "returns", "planning"],
  },
  // Salary Calculator
  {
    id: "56",
    question: "How is take-home salary calculated?",
    answer: "Take-home salary = Gross Salary - (Employee PF + Professional Tax + Other Deductions). Gross Salary includes Basic Salary, HRA, and other allowances. Employee PF is 12% of basic salary (minimum ₹1,800). Professional Tax varies by state (typically ₹200/month). Use our Salary Calculator to see detailed breakdown of your salary components.",
    category: "General",
    tags: ["salary", "take-home", "PF", "deductions"],
  },
  {
    id: "57",
    question: "What is the New Labour Code 2025 and how does it affect my salary?",
    answer: "The New Labour Code 2025 mandates that Basic Salary should be at least 50% of Gross Salary (up from current 40-45% in many cases). This increases PF contributions (12% of basic) and gratuity (4.81% of basic), which may reduce take-home salary but increase retirement benefits. Use our Salary Comparison Tool to see the difference between current and post-implementation scenarios.",
    category: "General",
    tags: ["New Labour Code", "basic salary", "PF", "gratuity"],
  },
  {
    id: "58",
    question: "How is PF calculated on salary?",
    answer: "Employee PF = 12% of Basic Salary (minimum ₹1,800 per month). Employer also contributes 12% of Basic Salary (minimum ₹1,800). If 12% of basic is less than ₹1,800, the contribution is capped at ₹1,800. PF is deducted from gross salary, and employer PF is part of CTC. Use our Salary Calculator to see exact PF calculations.",
    category: "General",
    tags: ["PF", "provident fund", "employee", "employer"],
  },
  {
    id: "59",
    question: "What is gratuity and how is it calculated?",
    answer: "Gratuity is a retirement benefit paid by employers. It's calculated as (Last drawn salary × 15/26) × Number of years of service, where salary includes basic and dearness allowance. For calculation purposes, it's often estimated as 4.81% of basic salary per month. Gratuity is payable after 5 years of continuous service.",
    category: "General",
    tags: ["gratuity", "retirement", "benefits", "calculation"],
  },
  // General Calculators
  {
    id: "60",
    question: "How do I use the Age Calculator?",
    answer: "Enter your date of birth, and the Age Calculator will show your exact age in years, months, and days. It's useful for loan eligibility checks (age limits), retirement planning, and various financial calculations that depend on your age. The calculator accounts for leap years and provides precise age calculations.",
    category: "Calculators",
    tags: ["age calculator", "date of birth", "age calculation"],
  },
  {
    id: "61",
    question: "What can I calculate with the Percentage Calculator?",
    answer: "The Percentage Calculator helps you: (1) Calculate percentage of a number, (2) Find what percentage one number is of another, (3) Calculate percentage increase/decrease, and (4) Find the original value after a percentage change. Useful for discounts, markups, growth rates, and financial analysis.",
    category: "Calculators",
    tags: ["percentage", "calculation", "increase", "decrease"],
  },
  // Best Practices & Tips
  {
    id: "62",
    question: "What are common mistakes to avoid in financial planning?",
    answer: "Common mistakes include: (1) Not starting early - delaying investments reduces compounding benefits, (2) Not accounting for inflation - goals cost more in the future, (3) Over-diversification or under-diversification, (4) Emotional investing - making decisions based on market fluctuations, (5) Not having an emergency fund, (6) Ignoring insurance needs. Use our calculators to plan properly and avoid these pitfalls.",
    category: "General",
    tags: ["mistakes", "financial planning", "tips", "best practices"],
  },
  {
    id: "63",
    question: "How often should I review my financial plan?",
    answer: "Review your financial plan annually or when major life events occur (marriage, children, job change, etc.). Review investments quarterly, but avoid frequent changes based on short-term market movements. Update your goals, income, and expenses. Recalculate using our calculators to ensure you're on track. Adjust SIP amounts if your income changes significantly.",
    category: "Planning",
    tags: ["review", "financial plan", "annual review", "adjustments"],
  },
  {
    id: "64",
    question: "What is the importance of an emergency fund?",
    answer: "An emergency fund covers 3-6 months of expenses and protects you from unexpected situations (job loss, medical emergencies, major repairs). It prevents you from taking high-interest loans or breaking long-term investments. Keep it in a savings account or liquid mutual funds for easy access. Build this fund before aggressive investing.",
    category: "General",
    tags: ["emergency fund", "savings", "financial security", "planning"],
  },
  {
    id: "65",
    question: "How do I prioritize between paying off debt and investing?",
    answer: "Generally, pay off high-interest debt (credit cards, personal loans >12%) before investing, as the interest cost exceeds potential investment returns. For low-interest debt (home loans <8%), consider investing surplus funds in equity for long-term wealth creation. Use our calculators to compare: debt interest saved vs. investment returns potential.",
    category: "General",
    tags: ["debt", "investing", "prioritization", "strategy"],
  },
  // Export & Sharing
  {
    id: "66",
    question: "How do I export my calculation results?",
    answer: "Most calculators offer export options: (1) PDF Export - Download a detailed PDF with charts and tables, (2) XLSX Export - Download an Excel file with amortization schedules or investment breakdowns. Exports include all calculation details, charts, and can be shared with financial advisors or saved for records.",
    category: "Calculators",
    tags: ["export", "PDF", "XLSX", "download"],
  },
  {
    id: "67",
    question: "Can I share my calculations with others?",
    answer: "Yes! Use the 'Share' button in calculators to copy a link to your calculation. You can share this link via email, WhatsApp, or social media. Recipients can view your calculation results. Note that shared links contain your input parameters, so share only with trusted parties.",
    category: "Calculators",
    tags: ["share", "link", "social sharing", "collaboration"],
  },
  // Advanced Topics
  {
    id: "68",
    question: "What is rupee cost averaging in SIP?",
    answer: "Rupee cost averaging means buying more units when prices are low and fewer when prices are high, as you invest a fixed amount regularly. This reduces the average purchase price over time and minimizes the impact of market volatility. It's one of the key benefits of SIP investing.",
    category: "Investments",
    tags: ["rupee cost averaging", "SIP", "volatility", "benefits"],
  },
  {
    id: "69",
    question: "What is the difference between XIRR and CAGR?",
    answer: "CAGR calculates returns for a single investment with regular intervals. XIRR (Extended Internal Rate of Return) calculates returns for multiple investments at irregular intervals, accounting for different investment dates and amounts. XIRR is more accurate for real-world SIP scenarios with varying investment dates.",
    category: "Investments",
    tags: ["XIRR", "CAGR", "returns", "SIP"],
  },
  {
    id: "70",
    question: "How does loan tenure affect total interest paid?",
    answer: "Longer tenure = lower EMI but higher total interest. Shorter tenure = higher EMI but lower total interest. For example, a ₹50 lakh home loan at 8%: 20 years = ₹4.18L total interest, 30 years = ₹6.65L total interest. Choose tenure based on your EMI affordability and total interest you're willing to pay.",
    category: "Loans",
    tags: ["loan tenure", "EMI", "total interest", "strategy"],
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

