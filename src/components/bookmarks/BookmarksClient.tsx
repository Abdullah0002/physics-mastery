"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Bookmark, BookmarkX, Search, BookOpen, FileText,
  Layers, Trash2, Download, ChevronRight, StickyNote,
  Zap, FlaskConical,
} from "lucide-react";
import { SAMPLE_QUESTIONS } from "@/config/sample-questions";
import { RESOURCES } from "@/config/resources-data";
import { ALL_CHAPTERS } from "@/config/curriculum";
import type { Question } from "@/types";
import type { Resource } from "@/config/resources-data";
import type { ChapterMeta } from "@/config/curriculum";

// ─── Storage ──────────────────────────────────────────────────────────────────

const KEYS = {
  questions: "abd-bookmarks-questions",
  resources: "abd-bookmarks-resources",
  chapters:  "abd-bookmarks-chapters",
} as const;

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

function saveSet(key: string, s: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...s]));
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "questions" | "resources" | "chapters";

const DIFF_COLORS: Record<string, string> = {
  EASY:     "text-emerald-600 bg-emerald-500/10",
  MEDIUM:   "text-amber-600  bg-amber-500/10",
  HARD:     "text-red-600    bg-red-500/10",
  ADVANCED: "text-purple-600 bg-purple-500/10",
};

const TYPE_COLORS: Record<string, string> = {
  NOTES:         "text-blue-600   bg-blue-500/10",
  DPP:           "text-orange-600 bg-orange-500/10",
  FORMULA_SHEET: "text-violet-600 bg-violet-500/10",
  MIND_MAP:      "text-teal-600   bg-teal-500/10",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function EmptyState({ tab, search }: { tab: Tab; search: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
      <BookmarkX className="h-10 w-10 text-muted-foreground/30" />
      <div>
        <p className="font-semibold text-muted-foreground">
          {search ? "No matches found" : `No ${tab} bookmarked yet`}
        </p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          {search
            ? "Try a different search term"
            : tab === "questions"
              ? "Bookmark questions while practising to save them here"
              : tab === "resources"
                ? "Bookmark resources from the Resources page"
                : "Bookmark chapters from the Chapters page"}
        </p>
      </div>
      {!search && (
        <Link
          href={tab === "questions" ? "/practice" : tab === "resources" ? "/resources" : "/chapters"}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go to {tab === "questions" ? "Practice" : tab === "resources" ? "Resources" : "Chapters"}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

// ─── Question card ─────────────────────────────────────────────────────────────

function QuestionCard({
  q,
  onRemove,
}: {
  q: Question;
  onRemove: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border bg-card/60 p-4 flex flex-col gap-3 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${DIFF_COLORS[q.difficulty] ?? ""}`}>
              {q.difficulty.charAt(0) + q.difficulty.slice(1).toLowerCase()}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
              {q.type.replace("_", " ")}
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {q.chapter?.title ?? q.chapterId}
            </span>
          </div>
          {/* Question text */}
          <p className="text-sm leading-relaxed line-clamp-3">
            {q.content.replace(/\$\$/g, "").replace(/\$/g, "")}
          </p>
        </div>
        <button
          onClick={() => onRemove(q.id)}
          title="Remove bookmark"
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Expand / collapse solution */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          {expanded ? "Hide solution" : "View solution"}
        </button>
        <span className="text-muted-foreground/40">·</span>
        <Link
          href={`/chapters/${q.chapterId}/practice`}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Go to chapter practice →
        </Link>
      </div>

      {expanded && q.solution && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-muted-foreground">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Solution</p>
          <p className="leading-relaxed">{q.solution.replace(/\$\$/g, "").replace(/\$/g, "")}</p>
        </div>
      )}
    </div>
  );
}

// ─── Resource card ─────────────────────────────────────────────────────────────

function ResourceCard({
  r,
  onRemove,
}: {
  r: Resource;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${TYPE_COLORS[r.type] ?? ""}`}>
            {r.type.replace("_", " ")}
          </span>
          <span className="text-xs text-muted-foreground">{r.chapterTitle}</span>
        </div>
        <p className="font-medium text-sm truncate">{r.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{r.pages} pages · {Math.round(r.fileSizeKB / 1024 * 10) / 10} MB</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <a
          href={r.fileUrl}
          download
          className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
        <button
          onClick={() => onRemove(r.id)}
          title="Remove bookmark"
          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Chapter card ──────────────────────────────────────────────────────────────

function ChapterCard({
  ch,
  onRemove,
}: {
  ch: ChapterMeta;
  onRemove: (slug: string) => void;
}) {
  return (
    <div className="rounded-xl border bg-card/60 p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <BookOpen className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-1">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${DIFF_COLORS[ch.difficulty] ?? ""}`}>
            {ch.difficulty.charAt(0) + ch.difficulty.slice(1).toLowerCase()}
          </span>
          <span className="text-xs text-muted-foreground">Class {ch.class}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{ch.estimatedHours}h</span>
        </div>
        <p className="font-medium text-sm">{ch.title}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={`/chapters/${ch.slug}/theory`}
          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors"
        >
          <StickyNote className="h-3.5 w-3.5" />
          Theory
        </Link>
        <Link
          href={`/chapters/${ch.slug}/practice`}
          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition-colors"
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Practice
        </Link>
        <button
          onClick={() => onRemove(ch.slug)}
          title="Remove bookmark"
          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BookmarksClient() {
  const [tab, setTab] = useState<Tab>("questions");
  const [search, setSearch] = useState("");

  // Bookmark ID sets
  const [questionIds, setQuestionIds] = useState<Set<string>>(new Set());
  const [resourceIds, setResourceIds] = useState<Set<string>>(new Set());
  const [chapterSlugs, setChapterSlugs] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    setQuestionIds(loadSet(KEYS.questions));
    setResourceIds(loadSet(KEYS.resources));
    setChapterSlugs(loadSet(KEYS.chapters));
  }, []);

  // Resolve IDs → actual objects
  const bookmarkedQuestions = useMemo(
    () => SAMPLE_QUESTIONS.filter((q) => questionIds.has(q.id)),
    [questionIds]
  );
  const bookmarkedResources = useMemo(
    () => RESOURCES.filter((r) => resourceIds.has(r.id)),
    [resourceIds]
  );
  const bookmarkedChapters = useMemo(
    () => ALL_CHAPTERS.filter((c) => chapterSlugs.has(c.slug)),
    [chapterSlugs]
  );

  // Filtered by search
  const filteredQuestions = useMemo(() => {
    if (!search) return bookmarkedQuestions;
    const q = search.toLowerCase();
    return bookmarkedQuestions.filter(
      (bq) =>
        bq.content.toLowerCase().includes(q) ||
        (bq.chapter?.title ?? "").toLowerCase().includes(q)
    );
  }, [bookmarkedQuestions, search]);

  const filteredResources = useMemo(() => {
    if (!search) return bookmarkedResources;
    const q = search.toLowerCase();
    return bookmarkedResources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.chapterTitle.toLowerCase().includes(q)
    );
  }, [bookmarkedResources, search]);

  const filteredChapters = useMemo(() => {
    if (!search) return bookmarkedChapters;
    const q = search.toLowerCase();
    return bookmarkedChapters.filter((c) => c.title.toLowerCase().includes(q));
  }, [bookmarkedChapters, search]);

  // Remove handlers
  const removeQuestion = (id: string) => {
    setQuestionIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveSet(KEYS.questions, next);
      return next;
    });
  };
  const removeResource = (id: string) => {
    setResourceIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveSet(KEYS.resources, next);
      return next;
    });
  };
  const removeChapter = (slug: string) => {
    setChapterSlugs((prev) => {
      const next = new Set(prev);
      next.delete(slug);
      saveSet(KEYS.chapters, next);
      return next;
    });
  };

  // Clear all in current tab
  const clearTab = () => {
    if (tab === "questions") {
      setQuestionIds(new Set());
      saveSet(KEYS.questions, new Set());
    } else if (tab === "resources") {
      setResourceIds(new Set());
      saveSet(KEYS.resources, new Set());
    } else {
      setChapterSlugs(new Set());
      saveSet(KEYS.chapters, new Set());
    }
  };

  const totalCount = questionIds.size + resourceIds.size + chapterSlugs.size;
  const tabCounts: Record<Tab, number> = {
    questions: questionIds.size,
    resources:  resourceIds.size,
    chapters:   chapterSlugs.size,
  };
  const currentCount = tab === "questions"
    ? filteredQuestions.length
    : tab === "resources"
      ? filteredResources.length
      : filteredChapters.length;

  // ── Demo seed — pre-bookmark a few items so page isn't empty on first visit ─
  useEffect(() => {
    const seeded = localStorage.getItem("abd-bookmarks-seeded");
    if (seeded) return;
    // Seed 3 questions, 2 resources, 2 chapters
    const qSet = new Set(["ud1", "k1", "lm1"]);
    const rSet = new Set(["n-kin", "fs-em"]);
    const cSet = new Set(["kinematics", "electrostatics"]);
    setQuestionIds(qSet);
    setResourceIds(rSet);
    setChapterSlugs(cSet);
    saveSet(KEYS.questions, qSet);
    saveSet(KEYS.resources, rSet);
    saveSet(KEYS.chapters, cSet);
    localStorage.setItem("abd-bookmarks-seeded", "1");
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookmarks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalCount === 0
              ? "Nothing saved yet"
              : `${totalCount} item${totalCount !== 1 ? "s" : ""} saved for later revision`}
          </p>
        </div>
        {tabCounts[tab] > 0 && (
          <button
            onClick={clearTab}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear {tab}
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search bookmarks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted/40 p-1 w-fit">
        {(["questions", "resources", "chapters"] as Tab[]).map((t) => {
          const icons: Record<Tab, React.ReactNode> = {
            questions: <Zap className="h-3.5 w-3.5" />,
            resources: <Layers className="h-3.5 w-3.5" />,
            chapters:  <BookOpen className="h-3.5 w-3.5" />,
          };
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all
                ${tab === t
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {icons[t]}
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold
                ${tab === t ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {tabCounts[t]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Result count */}
        {search && currentCount > 0 && (
          <p className="text-xs text-muted-foreground px-1">
            {currentCount} result{currentCount !== 1 ? "s" : ""} for &quot;{search}&quot;
          </p>
        )}

        {/* Questions */}
        {tab === "questions" && (
          filteredQuestions.length === 0
            ? <EmptyState tab="questions" search={search} />
            : filteredQuestions.map((q) => (
                <QuestionCard key={q.id} q={q} onRemove={removeQuestion} />
              ))
        )}

        {/* Resources */}
        {tab === "resources" && (
          filteredResources.length === 0
            ? <EmptyState tab="resources" search={search} />
            : filteredResources.map((r) => (
                <ResourceCard key={r.id} r={r} onRemove={removeResource} />
              ))
        )}

        {/* Chapters */}
        {tab === "chapters" && (
          filteredChapters.length === 0
            ? <EmptyState tab="chapters" search={search} />
            : filteredChapters.map((ch) => (
                <ChapterCard key={ch.slug} ch={ch} onRemove={removeChapter} />
              ))
        )}
      </div>

      {/* How to bookmark hint — only when empty */}
      {totalCount === 0 && !search && (
        <div className="rounded-2xl border border-dashed bg-muted/20 p-6">
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-primary" />
            How to bookmark items
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
              <span><strong>Questions</strong> — click the bookmark icon on any question in Practice or PYQs</span>
            </li>
            <li className="flex items-start gap-2">
              <Layers className="h-4 w-4 mt-0.5 shrink-0 text-violet-500" />
              <span><strong>Resources</strong> — click the bookmark icon on any resource card</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
              <span><strong>Chapters</strong> — click the bookmark icon on any chapter card</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
