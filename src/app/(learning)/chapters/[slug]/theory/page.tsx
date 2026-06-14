import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { getChapterContent } from "@/lib/mdx/mdx-utils";
import { KatexRenderer } from "@/components/mdx/KatexRenderer";

const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — Theory | ${siteConfig.name}`,
    description: `Complete theory notes and derivations for ${chapter.title}. Covers ${chapter.keyTopics.join(", ")}.`,
  };
}

export async function generateStaticParams() {
  return ALL_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function ChapterTheoryPage({ params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const result = await getChapterContent(slug, "theory");

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        {result ? (
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {result.content}
            <KatexRenderer />
          </article>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-16 text-center">
            <div className="rounded-2xl bg-brand-50 p-4 dark:bg-brand-950/50">
              <BookOpen className="h-8 w-8 text-brand-500" />
            </div>
            <div>
              <p className="font-semibold text-lg">{chapter.title} — Theory</p>
              <p className="mt-1 text-muted-foreground">
                Theory notes for this chapter are being authored and will be published soon.
              </p>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="font-medium mb-2">Topics covered in this chapter:</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {chapter.keyTopics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border bg-muted px-3 py-1 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
