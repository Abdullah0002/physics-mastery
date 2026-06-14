import { readFile } from "fs/promises";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

const CONTENT_DIR = path.join(process.cwd(), "content");
// Pre-rendered chapter HTML, produced by `node scripts/prerender-content.mjs`
// (run automatically before `next dev` and `next build`). Reading static files
// here keeps the server bundle free of any child-process or runtime MDX
// compilation — required for Vercel's serverless build and runtime.
const RENDERED_DIR = path.join(CONTENT_DIR, ".rendered");

type MDXFrontmatter = {
  title?: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
};

// Strip YAML frontmatter from source and parse key/value pairs.
function extractFrontmatter(source: string): { body: string; frontmatter: MDXFrontmatter } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { body: source, frontmatter: {} };

  const frontmatter: Record<string, unknown> = {};
  for (const line of (match[1] ?? "").split("\n")) {
    const kv = line.match(/^(\w+):\s*"([^"]+)"/);
    if (kv && kv[1]) frontmatter[kv[1]] = kv[2];
    const kvArr = line.match(/^(\w+):\s*\[(.+)\]/);
    if (kvArr && kvArr[1]) frontmatter[kvArr[1]] = (kvArr[2] ?? "").split(",").map(s => s.trim().replace(/^"|"$/g, ""));
  }
  return { body: source.slice((match[0] ?? "").length), frontmatter: frontmatter as MDXFrontmatter };
}

export async function getChapterContent(
  chapterSlug: string,
  file: "index" | "theory" | "derivations" | "formulas" | "jee-main-problems" | "jee-advanced-problems" = "index"
) {
  const filePath = path.join(CONTENT_DIR, "chapters", chapterSlug, `${file}.mdx`);
  const htmlPath = path.join(RENDERED_DIR, `${chapterSlug}__${file}.html`);

  try {
    // Frontmatter is read from source; the body is the pre-rendered HTML.
    const source = await readFile(filePath, "utf-8");
    const { frontmatter } = extractFrontmatter(source);

    if (!existsSync(htmlPath)) return null;
    const html = readFileSync(htmlPath, "utf-8");

    const content = (
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
    return { content, frontmatter };
  } catch {
    return null;
  }
}

export async function getBlogContent(slug: string) {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);

  try {
    const source = await readFile(filePath, "utf-8");
    const { content, frontmatter } = await compileMDX<{
      title: string;
      excerpt?: string;
      publishedAt?: string;
      tags?: string[];
      category?: string;
    }>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [],
        },
      },
    });
    return { content, frontmatter };
  } catch {
    return null;
  }
}

export function estimateReadTime(source: string): number {
  const wordsPerMinute = 200;
  const wordCount = source.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
