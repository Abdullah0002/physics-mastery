import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { BLOG_POSTS } from "@/config/blog-data";

// Built entirely from static config (no database) so it prerenders at build time
// without requiring DATABASE_URL. Chapters and blog posts are the same static
// sources the pages themselves are generated from.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/chapters`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/practice`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/pyqs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/mock-tests`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/formula-hub`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faculty`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const chapters = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];
  const subRoutes = ["", "/theory", "/formulas", "/problems", "/practice", "/pyqs"];
  const chapterPages: MetadataRoute.Sitemap = chapters.flatMap((ch) =>
    subRoutes.map((s) => ({
      url: `${baseUrl}/chapters/${ch.slug}${s}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: s === "" ? 0.85 : 0.75,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...chapterPages, ...blogPages];
}
