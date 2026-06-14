import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type BlogPost,
  CATEGORY_COLORS,
  formatBlogDate,
} from "@/config/blog-data";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border bg-card/60 overflow-hidden hover:border-primary/40 hover:bg-card/90 transition-all",
        featured && "sm:flex-row"
      )}
    >
      {/* Cover gradient */}
      <div
        className={cn(
          "flex-shrink-0 bg-gradient-to-br flex items-center justify-center",
          post.coverGradient,
          featured ? "sm:w-56 h-40 sm:h-auto" : "h-36"
        )}
      >
        <span className="text-4xl select-none opacity-60">⚛️</span>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-2 p-5", featured && "flex-1")}>
        {/* Category + read time */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              CATEGORY_COLORS[post.category]
            )}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readTimeMinutes} min read
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-bold leading-snug group-hover:text-primary transition-colors",
            featured ? "text-lg sm:text-xl" : "text-base"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs text-muted-foreground">{formatBlogDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
