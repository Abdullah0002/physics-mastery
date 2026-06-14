export type BlogCategory = "Strategy" | "Content" | "Analysis" | "Preparation";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  readTimeMinutes: number;
  publishedAt: string;
  isFeatured: boolean;
  coverGradient: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jee-main-physics-strategy",
    title: "How to Score 90+ in JEE Main Physics",
    excerpt:
      "A battle-tested strategy covering chapter priorities, time allocation, and the practice habits that separate 90+ scorers from the rest.",
    category: "Strategy",
    tags: ["JEE Main", "Study Tips", "Strategy", "Score Improvement"],
    readTimeMinutes: 6,
    publishedAt: "2026-05-10",
    isFeatured: true,
    coverGradient: "from-blue-500 to-indigo-600",
  },
  {
    slug: "electrostatics-jee-advanced",
    title: "Electrostatics for JEE Advanced: 10 Concepts You Must Master",
    excerpt:
      "JEE Advanced electrostatics goes far beyond Coulomb's law. Here are the 10 conceptual pillars that separate AIR 100 answers from AIR 5000 answers.",
    category: "Content",
    tags: ["JEE Advanced", "Electrostatics", "Concepts", "Capacitors"],
    readTimeMinutes: 7,
    publishedAt: "2026-05-18",
    isFeatured: true,
    coverGradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "why-students-fail-jee-physics",
    title: "Why Most Students Fail in JEE Physics (And How to Fix It)",
    excerpt:
      "After 8 years of teaching, I have seen the same five mistakes destroy otherwise capable students. Each one is fixable — if you catch it early enough.",
    category: "Strategy",
    tags: ["JEE", "Study Tips", "Common Mistakes", "Mindset"],
    readTimeMinutes: 5,
    publishedAt: "2026-04-22",
    isFeatured: true,
    coverGradient: "from-rose-500 to-pink-600",
  },
  {
    slug: "neet-physics-weightage-2024",
    title: "NEET Physics Chapter-wise Weightage Analysis 2024",
    excerpt:
      "A data-driven breakdown of which chapters NTA targets most in NEET Physics, based on 2019–2024 question distribution and trend shifts.",
    category: "Analysis",
    tags: ["NEET", "Analysis", "Chapter Weightage", "PYQ Analysis"],
    readTimeMinutes: 5,
    publishedAt: "2026-05-02",
    isFeatured: false,
    coverGradient: "from-emerald-500 to-teal-600",
  },
  {
    slug: "deriving-equations-of-motion",
    title: "From First Principles: Deriving the Equations of Motion",
    excerpt:
      "Most students memorise the three kinematic equations. Here is how to derive all three from a single definition — so you never need to memorise them again.",
    category: "Content",
    tags: ["Kinematics", "Derivations", "First Principles", "Class 11"],
    readTimeMinutes: 6,
    publishedAt: "2026-04-08",
    isFeatured: false,
    coverGradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "90-day-jee-study-plan",
    title: "Build a 90-Day Physics Study Plan for JEE Main",
    excerpt:
      "A week-by-week roadmap that takes you from foundations to full mock-test readiness in 90 days — with realistic time allocations and chapter sequencing.",
    category: "Preparation",
    tags: ["JEE Main", "Study Plan", "90 Days", "Strategy"],
    readTimeMinutes: 7,
    publishedAt: "2026-03-15",
    isFeatured: false,
    coverGradient: "from-cyan-500 to-blue-600",
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Strategy",
  "Content",
  "Analysis",
  "Preparation",
];

export const ALL_BLOG_TAGS = Array.from(
  new Set(BLOG_POSTS.flatMap((p) => p.tags))
).sort();

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  Strategy: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Content: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Analysis: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Preparation: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => {
    const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
    const sameCategory = p.category === post.category ? 2 : 0;
    return { post: p, score: sharedTags + sameCategory };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
