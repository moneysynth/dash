"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, href, children, ...props }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link
                  href={href as string}
                  className="text-primary hover:text-accent underline"
                  {...props}
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold text-text-primary mb-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-text-primary mb-3" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-text-secondary leading-relaxed mb-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 space-y-2 mb-4 text-text-secondary" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-6 space-y-2 mb-4 text-text-secondary" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-text-secondary" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-text-primary" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-border rounded-lg" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-surface" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold text-text-primary" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2 text-text-secondary" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary my-4" {...props} />
          ),
          code: ({ node, className, ...props }: any) => {
            const isInline = !className?.includes("language-");
            if (isInline) {
              return (
                <code className="bg-surface px-2 py-1 rounded text-sm font-mono text-text-primary" {...props} />
              );
            }
            return (
              <code className="block bg-surface p-4 rounded-lg text-sm font-mono text-text-primary overflow-x-auto" {...props} />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

