import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BLOG_POSTS } from "@/config/blog-data";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description:
    "JEE/NEET strategy, exam analysis, concept deep-dives, and Physics study tips from expert faculty.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Physics Blog — ${siteConfig.name}`,
    description: "Expert articles on JEE & NEET Physics preparation.",
    url: `${siteConfig.url}/blog`,
  },
};

const featured = BLOG_POSTS.filter((p) => p.isFeatured);

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-14 text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5">
            <PenLine className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{BLOG_POSTS.length} articles</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Physics Blog
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Strategy guides, concept deep-dives, exam analysis, and study plans — all written by
            the faculty who have seen what actually works.
          </p>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <h2 className="text-base font-semibold mb-4">Featured</h2>
          <div className="flex flex-col gap-4">
            {featured.map((p) => (
              <BlogCard key={p.slug} post={p} featured />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-border/40" />

      {/* All posts with client-side filters */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <h2 className="text-base font-semibold mb-5">All Articles</h2>
        <BlogListClient />
      </section>
    </>
  );
}
