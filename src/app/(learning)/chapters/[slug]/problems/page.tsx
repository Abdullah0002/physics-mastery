import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { getChapterContent } from "@/lib/mdx/mdx-utils";

const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — Problems | ${siteConfig.name}`,
    description: `JEE Main and JEE Advanced level problems for ${chapter.title} with complete step-by-step solutions.`,
  };
}

export async function generateStaticParams() {
  return ALL_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function ChapterProblemsPage({ params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const [jeeMain, jeeAdvanced] = await Promise.all([
    getChapterContent(slug, "jee-main-problems"),
    getChapterContent(slug, "jee-advanced-problems"),
  ]);

  const hasContent = jeeMain || jeeAdvanced;

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        {hasContent ? (
          <div className="space-y-16">
            {jeeMain && (
              <article className="prose prose-slate dark:prose-invert max-w-none">
                {jeeMain.content}
              </article>
            )}
            {jeeAdvanced && (
              <article className="prose prose-slate dark:prose-invert max-w-none">
                {jeeAdvanced.content}
              </article>
            )}
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-16 text-center">
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <FlaskConical className="h-8 w-8 text-emerald-500" />
            </div>
            <div>
              <p className="font-semibold text-lg">{chapter.title} — Problems</p>
              <p className="mt-1 text-muted-foreground">
                JEE-level problems for this chapter are being authored and will be published soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
