"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FLASHCARDS,
  REVISION_NOTES,
  EXAM_TIPS,
  FLASHCARD_CHAPTERS,
  type FlashCard,
  type TipCategory,
} from "@/data/revision-data";

// ─────────────────────────────────────────────────────────────────────────────
// localStorage helpers
// ─────────────────────────────────────────────────────────────────────────────
const KNOWN_KEY = "abd-revision-known-v1";

function loadKnown(): Set<string> {
  try {
    const raw = localStorage.getItem(KNOWN_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}
function saveKnown(set: Set<string>) {
  try {
    localStorage.setItem(KNOWN_KEY, JSON.stringify([...set]));
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  hard: "bg-red-100 text-red-700 border border-red-200",
};

const TIP_CATEGORY_META: Record<
  TipCategory,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  strategy: {
    label: "Strategy",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  mistakes: {
    label: "Common Mistakes",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  time: {
    label: "Time Management",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  lastminute: {
    label: "Last Minute",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Tab type
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "flashcards" | "notes" | "tips";

// =============================================================================
// Main component
// =============================================================================
export function RevisionClient() {
  const [activeTab, setActiveTab] = useState<Tab>("flashcards");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Revision Center
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Flashcards · Quick Notes · Exam Tips — all in one place
              </p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="mt-4 flex gap-1 border-b border-transparent">
            {(
              [
                { id: "flashcards", label: "⬡ Formula Flashcards" },
                { id: "notes", label: "📋 Quick Notes" },
                { id: "tips", label: "💡 Exam Tips" },
              ] as { id: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all ${
                  activeTab === t.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {activeTab === "flashcards" && <FlashcardsTab />}
        {activeTab === "notes" && <NotesTab />}
        {activeTab === "tips" && <TipsTab />}
      </div>
    </div>
  );
}

// =============================================================================
// FLASHCARDS TAB
// =============================================================================
function FlashcardsTab() {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setKnown(loadKnown());
    setMounted(true);
  }, []);

  // Build deck when chapter or shuffle changes
  useEffect(() => {
    const base =
      selectedChapter === "all"
        ? FLASHCARDS
        : FLASHCARDS.filter((c) => c.chapter === selectedChapter);
    setDeck(isShuffled ? shuffle(base) : [...base]);
    setIndex(0);
    setFlipped(false);
  }, [selectedChapter, isShuffled]);

  const card = deck[index] ?? null;

  const markKnown = useCallback(() => {
    if (!card) return;
    setKnown((prev) => {
      const next = new Set(prev);
      next.add(card.id);
      saveKnown(next);
      return next;
    });
    goNext();
  }, [card]);

  const markReview = useCallback(() => {
    if (!card) return;
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      saveKnown(next);
      return next;
    });
    goNext();
  }, [card]);

  function goNext() {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % Math.max(deck.length, 1)), 80);
  }
  function goPrev() {
    setFlipped(false);
    setTimeout(
      () => setIndex((i) => (i - 1 + deck.length) % Math.max(deck.length, 1)),
      80
    );
  }

  const knownCount = useMemo(
    () => deck.filter((c) => known.has(c.id)).length,
    [deck, known]
  );
  const progress = deck.length ? (knownCount / deck.length) * 100 : 0;

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Chapter filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedChapter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedChapter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Chapters
          </button>
          {FLASHCARD_CHAPTERS.map((ch) => (
            <button
              key={ch.slug}
              onClick={() => setSelectedChapter(ch.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedChapter === ch.slug
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {ch.name}
            </button>
          ))}
        </div>

        {/* Shuffle toggle */}
        <button
          onClick={() => setIsShuffled((s) => !s)}
          className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isShuffled
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
          </svg>
          {isShuffled ? "Shuffled" : "Shuffle"}
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {knownCount} / {deck.length} known
        </span>
        {knownCount > 0 && (
          <button
            onClick={() => {
              const next = new Set<string>();
              deck.forEach((c) => next.delete(c.id));
              setKnown((prev) => {
                const n = new Set(prev);
                deck.forEach((c) => n.delete(c.id));
                saveKnown(n);
                return n;
              });
            }}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* Card */}
      {card ? (
        <div className="flex flex-col items-center gap-6">
          {/* Flip card */}
          <div
            className="w-full max-w-2xl cursor-pointer select-none"
            style={{ perspective: "1200px", minHeight: "280px" }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: "280px",
                transformStyle: "preserve-3d",
                transition: "transform 0.45s ease",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className="rounded-2xl border border-slate-200 bg-white shadow-lg p-8 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {card.chapterName}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${DIFFICULTY_COLOR[card.difficulty]}`}
                  >
                    {card.difficulty}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-6">
                  <p className="text-xl font-semibold text-slate-800 text-center leading-relaxed">
                    {card.front}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{card.topic}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
                    </svg>
                    Tap to flip
                  </span>
                </div>
              </div>

              {/* BACK */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-lg p-8 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-indigo-600 bg-white/70 px-2.5 py-1 rounded-full border border-indigo-100">
                    {card.chapterName} · {card.topic}
                  </span>
                  {known.has(card.id) && (
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                      ✓ Known
                    </span>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center py-4">
                  <pre className="font-mono text-sm leading-relaxed text-slate-700 whitespace-pre-wrap text-center bg-white/60 rounded-xl px-6 py-4 w-full">
                    {card.back}
                  </pre>
                </div>

                <p className="text-xs text-indigo-400 text-center">
                  Tap to flip back
                </p>
              </div>
            </div>
          </div>

          {/* Navigation + action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
            >
              ← Prev
            </button>

            <button
              onClick={markReview}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-all"
            >
              🔁 Review Again
            </button>

            <button
              onClick={markKnown}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm"
            >
              ✓ Know It
            </button>

            <button
              onClick={goNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
            >
              Next →
            </button>
          </div>

          {/* Card position */}
          <p className="text-xs text-slate-400">
            Card {index + 1} of {deck.length}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-slate-400">
          <span className="text-4xl">🃏</span>
          <p>No cards in this deck.</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// QUICK NOTES TAB
// =============================================================================
function NotesTab() {
  const [selectedChapter, setSelectedChapter] = useState<string>(
    REVISION_NOTES[0]?.chapter ?? ""
  );

  const note = REVISION_NOTES.find((n) => n.chapter === selectedChapter);

  return (
    <div className="flex flex-col gap-6">
      {/* Chapter selector grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {REVISION_NOTES.map((n) => (
          <button
            key={n.chapter}
            onClick={() => setSelectedChapter(n.chapter)}
            className={`rounded-xl border p-3 text-left transition-all ${
              selectedChapter === n.chapter
                ? "border-indigo-400 bg-indigo-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`text-[10px] font-medium rounded px-1.5 py-0.5 ${
                n.class === 11
                  ? "bg-sky-100 text-sky-700"
                  : "bg-violet-100 text-violet-700"
              }`}
            >
              Class {n.class}
            </span>
            <p
              className={`mt-1.5 text-sm font-semibold ${
                selectedChapter === n.chapter
                  ? "text-indigo-700"
                  : "text-slate-700"
              }`}
            >
              {n.chapterName}
            </p>
          </button>
        ))}
      </div>

      {/* Note content */}
      {note ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Key Points */}
          <NoteSection
            title="Key Points"
            icon="🔑"
            accent="indigo"
            items={note.keyPoints}
          />

          {/* Common Mistakes */}
          <NoteSection
            title="Common Mistakes"
            icon="⚠️"
            accent="red"
            items={note.commonMistakes}
          />

          {/* Must Remember */}
          <NoteSection
            title="Must Remember"
            icon="⭐"
            accent="amber"
            items={note.mustRemember}
          />
        </div>
      ) : (
        <div className="py-16 text-center text-slate-400">Select a chapter above.</div>
      )}
    </div>
  );
}

function NoteSection({
  title,
  icon,
  accent,
  items,
}: {
  title: string;
  icon: string;
  accent: "indigo" | "red" | "amber";
  items: string[];
}) {
  const styles = {
    indigo: {
      header: "bg-indigo-600",
      border: "border-indigo-200",
      dot: "bg-indigo-400",
      bg: "bg-indigo-50/40",
    },
    red: {
      header: "bg-red-500",
      border: "border-red-200",
      dot: "bg-red-400",
      bg: "bg-red-50/40",
    },
    amber: {
      header: "bg-amber-500",
      border: "border-amber-200",
      dot: "bg-amber-400",
      bg: "bg-amber-50/40",
    },
  }[accent];

  return (
    <div className={`rounded-2xl border ${styles.border} overflow-hidden`}>
      <div className={`${styles.header} px-4 py-3 flex items-center gap-2`}>
        <span className="text-base">{icon}</span>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <ul className={`${styles.bg} p-4 flex flex-col gap-3`}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${styles.dot}`}
            />
            <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================================
// EXAM TIPS TAB
// =============================================================================
function TipsTab() {
  const [activeCategory, setActiveCategory] = useState<TipCategory | "all">(
    "all"
  );

  const tips = useMemo(
    () =>
      activeCategory === "all"
        ? EXAM_TIPS
        : EXAM_TIPS.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  const categories: { id: TipCategory | "all"; label: string }[] = [
    { id: "all", label: "All Tips" },
    { id: "strategy", label: "Strategy" },
    { id: "mistakes", label: "Common Mistakes" },
    { id: "time", label: "Time Management" },
    { id: "lastminute", label: "Last Minute" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const meta =
            cat.id === "all" ? null : TIP_CATEGORY_META[cat.id as TipCategory];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                isActive
                  ? cat.id === "all"
                    ? "bg-slate-800 text-white border-slate-800"
                    : `${meta?.bg} ${meta?.color} ${meta?.border} font-semibold`
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {meta && (
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tips grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => {
          const meta = TIP_CATEGORY_META[tip.category];
          return (
            <div
              key={tip.id}
              className={`rounded-2xl border ${meta.border} ${meta.bg} p-5 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                <span className={`text-xs font-semibold uppercase tracking-wide ${meta.color}`}>
                  {meta.label}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 leading-snug">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {tip.body}
              </p>
            </div>
          );
        })}
      </div>

      {tips.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          No tips in this category.
        </div>
      )}
    </div>
  );
}
