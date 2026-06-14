import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BlogPost, CATEGORY_COLORS, formatBlogDate } from "@/config/blog-data";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">Related Articles</h2>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col gap-1.5 rounded-xl border bg-card/60 p-3 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                CATEGORY_COLORS[post.category]
              )}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTimeMinutes} min
            </span>
          </div>
          <p className="text-xs font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{formatBlogDate(post.publishedAt)}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}
