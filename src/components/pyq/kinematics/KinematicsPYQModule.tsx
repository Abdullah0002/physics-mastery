"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Moon, Sun, Bookmark, X, FileX2 } from "lucide-react";
import data from "./kinematics-pyq.json";
import type { KinematicsPYQData, KinematicsQuestion, Difficulty } from "./types";
import { KinematicsQuestionCard } from "./KinematicsQuestionCard";
import { useBookmarks } from "./useBookmarks";

const PYQ = data as KinematicsPYQData;
const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-300 bg-white text-slate-600 hover:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500"
      }`}
    >
      {label}
    </button>
  );
}

export function KinematicsPYQModule({
  showThemeToggle = true,
}: {
  /** Set false if the host app already manages the `dark` class on <html>. */
  showThemeToggle?: boolean;
}) {
  const { isBookmarked, toggleBookmark, bookmarks, hydrated } = useBookmarks();

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [year, setYear] = useState<string | "All">("All");
  const [topic, setTopic] = useState<string | "All">("All");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sync local toggle with the document's current theme on mount.
  useEffect(() => {
    if (!showThemeToggle) return;
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [showThemeToggle]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const years = useMemo(
    () => [...new Set(PYQ.questions.map((q) => q.year))].sort((a, b) => b.localeCompare(a)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PYQ.questions.filter((item: KinematicsQuestion) => {
      if (difficulty !== "All" && item.difficulty !== difficulty) return false;
      if (year !== "All" && item.year !== year) return false;
      if (topic !== "All" && item.topic !== topic) return false;
      if (onlyBookmarks && !isBookmarked(item.id)) return false;
      if (q) {
        const haystack = `${item.question} ${item.concept} ${item.session} ${item.solution} ${item.topic}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, difficulty, year, topic, onlyBookmarks, isBookmarked]);

  const resetFilters = () => {
    setQuery("");
    setDifficulty("All");
    setYear("All");
    setTopic("All");
    setOnlyBookmarks(false);
  };

  const hasActiveFilters =
    query || difficulty !== "All" || year !== "All" || topic !== "All" || onlyBookmarks;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {PYQ.exam}
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">{PYQ.chapter} — PYQ Bank</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {PYQ.questions.length} previous-year questions with full solutions, shortcuts &amp;
              diagrams.
            </p>
          </div>
          {showThemeToggle && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </header>

        {/* Controls */}
        <div className="mb-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, concepts, sessions…"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Topic filter */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Topic</span>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip label="All Topics" active={topic === "All"} onClick={() => setTopic("All")} />
              {PYQ.topics.map((t) => (
                <FilterChip key={t} label={t} active={topic === t} onClick={() => setTopic(t)} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {/* Difficulty filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Difficulty
              </span>
              <div className="flex flex-wrap gap-1.5">
                <FilterChip
                  label="All"
                  active={difficulty === "All"}
                  onClick={() => setDifficulty("All")}
                />
                {DIFFICULTIES.map((d) => (
                  <FilterChip
                    key={d}
                    label={d}
                    active={difficulty === d}
                    onClick={() => setDifficulty(d)}
                  />
                ))}
              </div>
            </div>

            {/* Year filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Year</span>
              <div className="flex flex-wrap gap-1.5">
                <FilterChip label="All" active={year === "All"} onClick={() => setYear("All")} />
                {years.map((y) => (
                  <FilterChip key={y} label={y} active={year === y} onClick={() => setYear(y)} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: bookmarks toggle + reset + count */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyBookmarks((b) => !b)}
                aria-pressed={onlyBookmarks}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  onlyBookmarks
                    ? "border-amber-400 bg-amber-100 text-amber-700 dark:border-amber-500/50 dark:bg-amber-500/15 dark:text-amber-400"
                    : "border-slate-300 bg-white text-slate-600 hover:border-amber-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${onlyBookmarks ? "fill-amber-400 text-amber-500" : ""}`}
                />
                Bookmarked{hydrated ? ` (${bookmarks.size})` : ""}
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-slate-500 underline-offset-2 hover:underline dark:text-slate-400"
                >
                  Reset
                </button>
              )}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {filtered.length} of {PYQ.questions.length} questions
            </span>
          </div>
        </div>

        {/* Questions list */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <FileX2 className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="font-semibold">No questions match your filters</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try clearing the search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((q, i) => (
              <KinematicsQuestionCard
                key={q.id}
                question={q}
                index={i}
                bookmarked={isBookmarked(q.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          Source: {PYQ.source}
        </footer>
      </div>
    </div>
  );
}

export default KinematicsPYQModule;
