import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
// import { AdUnit } from "@/components/common/AdUnit";
import { Calendar, Clock, User } from "lucide-react";
import type { BlogPost } from "@/types";

// Mock blog posts - replace with actual data source
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding EMI: A Complete Guide",
    excerpt:
      "Learn how Equated Monthly Installments work and how to calculate them for your loans. This comprehensive guide covers everything from basic concepts to advanced calculations.",
    author: "MoneySynth Team",
    date: "2024-01-15",
    category: "Education",
    readTime: 5,
  },
  {
    id: "2",
    title: "SIP vs Lump Sum: Which is Better?",
    excerpt:
      "Compare Systematic Investment Plans with lump sum investments to make informed decisions. We break down the pros and cons of each approach.",
    author: "MoneySynth Team",
    date: "2024-01-10",
    category: "Investment",
    readTime: 7,
  },
  {
    id: "3",
    title: "SWP: A Smart Way to Generate Regular Income",
    excerpt:
      "Discover how Systematic Withdrawal Plans can help you create a steady income stream from your investments during retirement.",
    author: "MoneySynth Team",
    date: "2024-01-05",
    category: "Retirement",
    readTime: 6,
  },
  {
    id: "4",
    title: "5 Financial Planning Mistakes to Avoid",
    excerpt:
      "Common pitfalls in financial planning and how to avoid them. Learn from these mistakes to secure your financial future.",
    author: "MoneySynth Team",
    date: "2024-01-01",
    category: "Planning",
    readTime: 8,
  },
  {
    id: "5",
    title: "Tax Benefits of SIP Investments",
    excerpt:
      "Explore the various tax benefits available for Systematic Investment Plans and how to maximize your savings.",
    author: "MoneySynth Team",
    date: "2023-12-28",
    category: "Tax",
    readTime: 6,
  },
  {
    id: "6",
    title: "Building an Emergency Fund: A Step-by-Step Guide",
    excerpt:
      "Learn how to build and maintain an emergency fund that can help you weather financial storms without derailing your long-term goals.",
    author: "MoneySynth Team",
    date: "2023-12-25",
    category: "Savings",
    readTime: 5,
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                MoneySynth Blog
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                Financial insights, tips, and guides to help you make better
                decisions
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {blogPosts.map((post, index) => (
                  <div key={post.id}>
                    <Card className="transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription className="text-base">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <span className="text-sm font-medium text-primary hover:text-accent transition-colors">
                            Read More →
                          </span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Ad after 3rd post */}
                  {/* {index === 2 && (
                    <div className="my-8 flex justify-center">
                      <AdUnit size="728x90" />
                    </div>
                  )} */}
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {Array.from(new Set(blogPosts.map((p) => p.category))).map(
                        (category) => (
                          <li key={category}>
                            <Link
                              href={`/blog?category=${category.toLowerCase()}`}
                              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                            >
                              {category}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* <AdUnit size="300x250" /> */}

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-sm font-medium text-text-primary transition-colors hover:text-primary"
                          >
                            {post.title}
                          </Link>
                          <p className="mt-1 text-xs text-text-secondary">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

