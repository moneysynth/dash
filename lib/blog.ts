import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      author: data.author || "MoneySynth Team",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "General",
      readTime: data.readTime || 5,
      content: content,
      image: data.image,
      keywords: data.keywords || [],
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return posts;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

