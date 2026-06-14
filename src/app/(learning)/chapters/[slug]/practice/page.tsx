import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { ChapterPracticeClient } from "@/components/practice/ChapterPracticeClient";

const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — Practice | ${siteConfig.name}`,
    description: `Practice questions for ${chapter.title} with hints and detailed solutions. JEE Main, JEE Advanced & NEET.`,
  };
}

export async function generateStaticParams() {
  return ALL_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function ChapterPracticePage({ params }: Props) {
  const { slug } = await params;
  const chapter = ALL_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">{chapter.title} — Practice</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse questions, reveal hints & solutions, or start a timed session.
          </p>
        </div>
        <ChapterPracticeClient chapterSlug={slug} chapterTitle={chapter.title} />
      </div>
    </div>
  );
}
