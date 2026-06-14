import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, ArrowLeft, Tag } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  BLOG_POSTS,
  CATEGORY_COLORS,
  getRelatedPosts,
  formatBlogDate,
} from "@/config/blog-data";
import { getBlogContent } from "@/lib/mdx/mdx-utils";
import { blogPostSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      url: `${siteConfig.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const mdx = await getBlogContent(slug);
  const related = getRelatedPosts(post);

  const postSchemaData = blogPostSchema({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: null,
    publishedAt: new Date(post.publishedAt),
    readTimeMinutes: post.readTimeMinutes,
    authorName: siteConfig.author.name,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Cover gradient banner */}
            <div
              className={cn(
                "rounded-2xl bg-gradient-to-br flex items-center justify-center h-48 mb-8",
                post.coverGradient
              )}
            >
              <span className="text-6xl opacity-60 select-none">⚛️</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={cn(
                  "rounded-full px-3 py-0.5 text-xs font-medium",
                  CATEGORY_COLORS[post.category]
                )}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatBlogDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-muted-foreground mb-8">{post.excerpt}</p>

            {/* MDX content */}
            {mdx ? (
              <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
                {mdx.content}
              </article>
            ) : (
              <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
                Content coming soon.
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-border/40">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6 rounded-2xl border bg-card/60 p-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                A
              </div>
              <div>
                <p className="text-sm font-semibold">{siteConfig.author.name}</p>
                <p className="text-xs text-muted-foreground">{siteConfig.author.designation}</p>
              </div>
              <Link
                href="/faculty"
                className="ml-auto text-xs font-medium text-primary hover:underline flex-shrink-0"
              >
                View profile
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-6 flex flex-col gap-6">
              <RelatedPosts posts={related} />

              {/* CTA card */}
              <div className="rounded-2xl border bg-primary/5 p-4 flex flex-col gap-3">
                <p className="text-sm font-semibold">Start Practising</p>
                <p className="text-xs text-muted-foreground">
                  Put this knowledge to work with chapter-specific problems and PYQs.
                </p>
                <Link
                  href="/practice"
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground text-center hover:bg-primary/90 transition-colors"
                >
                  Go to Practice
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
