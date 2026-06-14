"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  ALL_BLOG_TAGS,
  type BlogCategory,
} from "@/config/blog-data";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";

export function BlogListClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "ALL">("ALL");
  const [activeTag, setActiveTag] = useState<string | "ALL">("ALL");

  const filtered = useMemo(() => {
    let result = BLOG_POSTS;
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeCategory !== "ALL") result = result.filter((p) => p.category === activeCategory);
    if (activeTag !== "ALL") result = result.filter((p) => p.tags.includes(activeTag));
    return result;
  }, [query, activeCategory, activeTag]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border bg-card/60 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {(["ALL", ...BLOG_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setActiveCategory(cat); setActiveTag("ALL"); }}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {cat === "ALL" ? "All Categories" : cat}
          </button>
        ))}
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5">
        {["ALL", ...ALL_BLOG_TAGS].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs transition-colors",
              activeTag === tag
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {tag === "ALL" ? "All Tags" : tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} article{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No articles match your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
