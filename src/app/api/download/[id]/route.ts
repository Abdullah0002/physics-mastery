import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { RESOURCES } from "@/config/resources-data";
import { SAMPLE_QUESTIONS } from "@/config/sample-questions";

function stripMdx(raw: string): string {
  return raw
    .replace(/^---[\s\S]*?---\n?/m, "")
    .replace(/<Callout[^>]*type="([^"]*)"[^>]*>/g, "\n\n💡 [$1] ")
    .replace(/<\/Callout>/g, "\n")
    .replace(/<Formula\s+label="([^"]*)"[^>]*>/g, "\n  [$1]\n")
    .replace(/<\/Formula>/g, "\n")
    .replace(/<Step\s+n=\{(\d+)\}>/g, "\nStep $1: ")
    .replace(/<\/Step>/g, "")
    .replace(/<Diagram[^>]*\/>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function readMdxFile(slug: string, file: "theory" | "formulas"): string | null {
  const p = join(process.cwd(), "content", "chapters", slug, `${file}.mdx`);
  if (existsSync(p)) return readFileSync(p, "utf8");
  return null;
}

function generateDppContent(chapterSlug: string, chapterTitle: string, title: string): string {
  const qs = SAMPLE_QUESTIONS.filter((q) => q.chapterId === chapterSlug);
  if (qs.length === 0) {
    const fallbackSlugs = ["kinematics", "laws-of-motion", "electrostatics", "current-electricity",
      "ray-optics", "modern-physics", "units-and-dimensions", "vectors"];
    const allQs = SAMPLE_QUESTIONS.filter((q) => fallbackSlugs.includes(q.chapterId)).slice(0, 15);
    return buildDppText(title, "All Chapters", allQs);
  }
  return buildDppText(title, chapterTitle, qs);
}

function buildDppText(title: string, chapterTitle: string, qs: typeof SAMPLE_QUESTIONS): string {
  const header = [
    "═".repeat(60),
    `PHYSICS MASTERY`,
    title,
    `Chapter: ${chapterTitle}`,
    "═".repeat(60),
    "",
  ].join("\n");

  const body = qs.map((q, i) => {
    const lines: string[] = [
      `Q${i + 1}. [${q.difficulty}] ${q.content}`,
    ];
    if (q.options) {
      q.options.forEach((o) => lines.push(`   (${o.id}) ${o.content}`));
    } else {
      lines.push("   [Integer type — write your answer]");
    }
    lines.push(`   Marks: +${q.marks}  |  Negative: ${q.negativeMarks}`);
    lines.push("");
    return lines.join("\n");
  }).join("\n");

  const answers = [
    "",
    "─".repeat(60),
    "ANSWER KEY",
    "─".repeat(60),
    ...qs.map((q, i) => {
      const ans = Array.isArray(q.correctAnswer)
        ? q.correctAnswer.join(", ")
        : String(q.correctAnswer);
      return `Q${i + 1}: ${ans}`;
    }),
    "",
    "─".repeat(60),
    "SOLUTIONS",
    "─".repeat(60),
    ...qs.map((q, i) => [
      `Q${i + 1}: ${q.solution ?? ""}`,
      q.hint ? `   Hint: ${q.hint}` : "",
      "",
    ].filter(Boolean).join("\n")),
  ].join("\n");

  return `${header}${body}${answers}\n\n© AbdOfPhysics — abdofphysics.in\n`;
}

function generateMindMapContent(chapterTitle: string, theoryRaw: string | null): string {
  const header = [
    "═".repeat(60),
    `PHYSICS MASTERY`,
    `${chapterTitle} — Concept Map`,
    "═".repeat(60),
    "",
  ].join("\n");

  if (!theoryRaw) {
    return `${header}Content coming soon.\n`;
  }

  const sections = theoryRaw
    .split(/\n#{1,3} /)
    .filter(Boolean)
    .slice(1)
    .map((sec) => {
      const lines = sec.split("\n");
      const heading = (lines[0] ?? "").trim();
      return `  ▸ ${heading}`;
    })
    .join("\n");

  return `${header}${chapterTitle}\n${"─".repeat(40)}\n${sections}\n\n© AbdOfPhysics — abdofphysics.in\n`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const resource = RESOURCES.find((r) => r.id === id);

  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  let content = "";
  const filename = `${resource.id}-${resource.type.toLowerCase()}.txt`;

  if (resource.type === "DPP") {
    content = generateDppContent(resource.chapterSlug, resource.chapterTitle, resource.title);
  } else if (resource.type === "MIND_MAP") {
    const theory = readMdxFile(resource.chapterSlug, "theory");
    content = generateMindMapContent(resource.chapterTitle, theory);
  } else if (resource.type === "FORMULA_SHEET") {
    const formulas = readMdxFile(resource.chapterSlug, "formulas");
    const theory = readMdxFile(resource.chapterSlug, "theory");
    const raw = formulas ?? theory;
    const stripped = raw ? stripMdx(raw) : "Content coming soon.";
    content = [
      "═".repeat(60),
      "PHYSICS MASTERY",
      resource.title,
      "═".repeat(60),
      "",
      stripped,
      "",
      "© AbdOfPhysics — abdofphysics.in",
    ].join("\n");
  } else {
    // NOTES
    const theory = readMdxFile(resource.chapterSlug, "theory");
    const stripped = theory ? stripMdx(theory) : "Content coming soon.";
    content = [
      "═".repeat(60),
      "PHYSICS MASTERY",
      resource.title,
      `Chapter: ${resource.chapterTitle}`,
      "═".repeat(60),
      "",
      stripped,
      "",
      "© AbdOfPhysics — abdofphysics.in",
    ].join("\n");
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
