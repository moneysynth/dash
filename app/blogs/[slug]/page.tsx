import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts, getBlogPostSlugs } from "@/lib/blog";
import { MarkdownContent } from "@/components/blogs/MarkdownContent";
import { PopularCalculators } from "@/components/calculators/common/PopularCalculators";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Allow dynamic routes for blog posts not in static params
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - MoneySynth",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | MoneySynth Blog`,
    description: post.excerpt,
    keywords: [
      post.category.toLowerCase(),
      "financial blog",
      "money management",
      "personal finance",
      "investment advice",
      "financial planning",
      ...(post.keywords || []),
    ],
    openGraph: {
      title: `${post.title} | MoneySynth Blogs`,
      description: post.excerpt,
      url: `https://moneysynth.com/blogs/${slug}`,
      siteName: "MoneySynth",
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://moneysynth.com/blogs/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== slug && (p.category === post.category || Math.random() > 0.5))
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Back Button */}
                <Link href="/blogs">
                  <Button variant="ghost" size="sm" className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blogs
                  </Button>
                </Link>

                {/* Blog Post Content */}
                <Card>
                  <CardContent className="pt-6">
                    <article>
                      {/* Post Metadata */}
                      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
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

                      {/* Post Title */}
                      <h1 className="text-4xl font-bold text-text-primary mb-6">
                        {post.title}
                      </h1>

                      {/* Post Content */}
                      {post.content && <MarkdownContent content={post.content} />}
                    </article>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Related Articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedPosts.map((relatedPost) => (
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
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="lg:pt-16">
                  <PopularCalculators currentPath="" sticky={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
