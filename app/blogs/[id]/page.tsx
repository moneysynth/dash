import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Calendar, User, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";

// Mock blog posts - should match the ones in blog/page.tsx
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

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Blog Post Not Found - MoneySynth",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - Coming Soon | MoneySynth Blog`,
    description: post.excerpt,
    keywords: [
      post.category.toLowerCase(),
      "financial blog",
      "money management",
      "personal finance",
      "investment advice",
      "financial planning",
    ],
    openGraph: {
      title: `${post.title} - Coming Soon | MoneySynth Blogs`,
      description: post.excerpt,
      url: `https://moneysynth.com/blogs/${id}`,
      siteName: "MoneySynth",
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Coming Soon`,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://moneysynth.com/blogs/${id}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Post Not Found
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                The blog post you're looking for doesn't exist.
              </p>
              <Link href="/blogs" className="mt-6 inline-block">
                <Button variant="outline">Back to Blogs</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Link href="/blogs">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>

            {/* Coming Soon Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Coming Soon</CardTitle>
                <CardDescription className="text-lg mt-2">
                  This article is currently being prepared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Post Preview */}
                <div className="rounded-lg bg-surface/50 p-6 border border-border">
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
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
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-3">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Coming Soon Message */}
                <div className="text-center space-y-4">
                  <p className="text-text-secondary">
                    We're working hard to bring you this comprehensive article. 
                    Our team is preparing detailed insights and expert analysis to help you make better financial decisions.
                  </p>
                  <p className="text-text-secondary">
                    Check back soon, or explore our other articles in the meantime.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/blogs">
                    <Button variant="outline" size="lg">
                      Browse All Articles
                    </Button>
                  </Link>
                  <Link href="/calculators">
                    <Button variant="primary" size="lg">
                      Explore Calculators
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts Suggestion */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>While You Wait</CardTitle>
                <CardDescription>
                  Check out these related articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPosts
                    .filter((p) => p.id !== id)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blogs/${relatedPost.id}`}
                        className="block rounded-lg border border-border p-4 hover:border-primary transition-colors"
                      >
                        <div className="mb-2 flex items-center gap-2 text-xs text-text-secondary">
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {relatedPost.category}
                          </span>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-1 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

