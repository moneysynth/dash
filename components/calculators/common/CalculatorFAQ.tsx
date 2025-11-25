"use client";

// import { AdUnit } from "@/components/common/AdUnit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface CalculatorFAQProps {
  calculatorName: string;
  calculatorType: string;
  whatIs: string | React.ReactNode;
  calculationFormula: string | React.ReactNode;
  howToUse: string | React.ReactNode;
  additionalInfo?: FAQItem[];
}

export function CalculatorFAQ({
  calculatorName,
  calculatorType,
  whatIs,
  calculationFormula,
  howToUse,
  additionalInfo = [],
}: CalculatorFAQProps) {
  const faqs: FAQItem[] = [
    {
      question: `What is ${calculatorName}?`,
      answer: whatIs,
    },
    {
      question: `How to calculate ${calculatorName}?`,
      answer: calculationFormula,
    },
    {
      question: `How to use the ${calculatorName}?`,
      answer: howToUse,
    },
    ...additionalInfo,
  ];

  return (
    <div className="mt-16 space-y-8">
      {/* Ad Section */}
      {/* <div className="flex justify-center">
        <AdUnit size="728x90" />
      </div> */}

      {/* FAQ Section */}
      <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-text-primary">
          Frequently Asked Questions about {calculatorName}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-border bg-surface">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-text-secondary">
                  {typeof faq.answer === "string" ? (
                    <p className="leading-relaxed">{faq.answer}</p>
                  ) : (
                    faq.answer
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ad Section */}
      {/* <div className="flex justify-center">
        <AdUnit size="300x250" />
      </div> */}
    </div>
  );
}

