import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { PYQStats } from "@/components/pyq/PYQStats";
import { ChapterPYQBrowser } from "@/components/pyq/ChapterPYQBrowser";
import { getPYQsByChapter } from "@/config/pyq-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const all = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];
  const chapter = all.find((c) => c.slug === slug);
  const title = chapter?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} — PYQs | ${siteConfig.name}`,
    description: `Previous year questions from JEE Main, JEE Advanced & NEET for ${title}.`,
  };
}

export async function generateStaticParams() {
  return [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS].map((c) => ({ slug: c.slug }));
}

export default async function ChapterPyqsPage({ params }: Props) {
  const { slug } = await params;

  const all = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];
  const chapter = all.find((c) => c.slug === slug);
  const chapterTitle =
    chapter?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const pyqs = getPYQsByChapter(slug);

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Stats only if this chapter has PYQs */}
      {pyqs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">PYQ Analysis — {chapterTitle}</h2>
            <span className="text-sm text-muted-foreground">{pyqs.length} questions</span>
          </div>
          <PYQStats chapterSlug={slug} />
        </section>
      )}

      {/* Interactive browser */}
      <section>
        {pyqs.length > 0 && (
          <h2 className="text-lg font-semibold mb-4">Solve PYQs</h2>
        )}
        <ChapterPYQBrowser chapterSlug={slug} chapterTitle={chapterTitle} />
      </section>
    </div>
  );
}
