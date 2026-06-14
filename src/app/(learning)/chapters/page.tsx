import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";
import { ChapterCard } from "@/components/chapter/ChapterCard";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Physics Chapters — ${siteConfig.name}`,
  description:
    "All 32 Physics chapters for JEE Main, JEE Advanced & NEET. Each chapter includes theory notes, derivations, formulas, PYQs and practice questions.",
  alternates: { canonical: "/chapters" },
};

type Props = {
  searchParams: Promise<{ class?: string; filter?: string }>;
};

const FILTERS = [
  { label: "All Chapters", value: "" },
  { label: "Class 11", value: "XI" },
  { label: "Class 12", value: "XII" },
  { label: "High Weightage", value: "high-weightage" },
];

export default async function ChaptersPage({ searchParams }: Props) {
  const { class: classFilter, filter } = await searchParams;

  const allChapters = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

  const filtered = allChapters.filter((c) => {
    if (classFilter === "XI") return c.class === "XI";
    if (classFilter === "XII") return c.class === "XII";
    if (filter === "high-weightage") return c.weightage.jeeMain >= 7;
    return true;
  });

  const class11 = filtered.filter((c) => c.class === "XI");
  const class12 = filtered.filter((c) => c.class === "XII");
  const grouped = !classFilter && filter !== "high-weightage";

  return (
    <div className="py-10">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Physics Chapters</h1>
          <p className="mt-2 text-muted-foreground">
            {allChapters.length} chapters covering Class 11 &amp; 12 curriculum for JEE &amp; NEET
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map(({ label, value }) => {
            const isActive =
              value === ""
                ? !classFilter && !filter
                : value === "high-weightage"
                ? filter === "high-weightage"
                : classFilter === value;

            const href =
              value === ""
                ? "/chapters"
                : value === "high-weightage"
                ? "/chapters?filter=high-weightage"
                : `/chapters?class=${value}`;

            return (
              <Link key={value} href={href}>
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5 text-sm"
                >
                  {label}
                  {value === "XI" && (
                    <span className="ml-1.5 opacity-70">({CLASS_11_CHAPTERS.length})</span>
                  )}
                  {value === "XII" && (
                    <span className="ml-1.5 opacity-70">({CLASS_12_CHAPTERS.length})</span>
                  )}
                </Badge>
              </Link>
            );
          })}
        </div>

        {/* Chapter grid */}
        {grouped ? (
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-xl font-semibold">
                Class 11 Physics
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({class11.length} chapters)
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {class11.map((chapter) => (
                  <ChapterCard key={chapter.slug} chapter={chapter} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                Class 12 Physics
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({class12.length} chapters)
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {class12.map((chapter) => (
                  <ChapterCard key={chapter.slug} chapter={chapter} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              {filtered.length} chapter{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
