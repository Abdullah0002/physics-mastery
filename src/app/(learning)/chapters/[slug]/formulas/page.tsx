import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sigma } from "lucide-react";
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
    title: `${chapter.title} — Formulas | ${siteConfig.name}`,
    description: `All ${chapter.formulaCount} key formulas for ${chapter.title} with derivations and usage notes for JEE & NEET.`,
  };
}

export async function generateStaticParams() {
  return ALL_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function ChapterFormulasPage({ params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  const result = await getChapterContent(slug, "formulas");

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        {result ? (
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {result.content}
          </article>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-16 text-center">
            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30">
              <Sigma className="h-8 w-8 text-violet-500" />
            </div>
            <div>
              <p className="font-semibold text-lg">{chapter.title} — Formula Sheet</p>
              <p className="mt-1 text-muted-foreground">
                {chapter.formulaCount} formulas for this chapter are being compiled.
              </p>
            </div>
            <div className="mt-2 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Topics with formulas:</p>
              <p>{chapter.keyTopics.slice(0, 5).join(" · ")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
