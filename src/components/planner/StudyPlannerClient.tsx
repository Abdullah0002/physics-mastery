"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target, Clock, CalendarDays, BookOpen, CheckCircle2,
  Circle, Flame, RotateCcw, Zap, AlertTriangle,
  ArrowRight, Trophy, ChevronRight,
} from "lucide-react";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS, type ChapterMeta } from "@/config/curriculum";

// ─── Types ────────────────────────────────────────────────────────────────────

type Exam = "JEE_MAIN" | "JEE_ADVANCED" | "NEET";
type ClassFilter = "BOTH" | "XI" | "XII";
type Tab = "setup" | "schedule" | "today";

interface PlanConfig {
  exam: Exam;
  hoursPerDay: number;
  examDate: string;
  classFilter: ClassFilter;
  weakSlugs: string[];
}

interface ScheduledChapter extends ChapterMeta {
  priority: number;
  allocatedHours: number;
  startDay: number;
  endDay: number;
  isCompleted: boolean;
  isWeak: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EXAM_LABELS: Record<Exam, string> = {
  JEE_MAIN: "JEE Main",
  JEE_ADVANCED: "JEE Advanced",
  NEET: "NEET",
};

const STORAGE_KEY = "abd-study-planner-v1";
const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWeightage(ch: ChapterMeta, exam: Exam): number {
  if (exam === "JEE_MAIN") return ch.weightage.jeeMain;
  if (exam === "JEE_ADVANCED") return ch.weightage.jeeAdvanced;
  return ch.weightage.neet;
}

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]!;
}

function addDays(base: string, n: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0]!;
}

function formatDate(str: string): string {
  return new Date(str).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function buildSchedule(config: PlanConfig, completedSlugs: Set<string>): ScheduledChapter[] {
  const source = ALL_CHAPTERS.filter((c) =>
    config.classFilter === "BOTH" || c.class === config.classFilter
  );

  const diffOrder: Record<string, number> = { EASY: 1, MEDIUM: 2, HARD: 3, ADVANCED: 4 };
  const sorted = [...source].sort((a, b) => {
    const aWeak = config.weakSlugs.includes(a.slug) ? 1 : 0;
    const bWeak = config.weakSlugs.includes(b.slug) ? 1 : 0;
    if (bWeak !== aWeak) return bWeak - aWeak;
    const wDiff = getWeightage(b, config.exam) - getWeightage(a, config.exam);
    if (wDiff !== 0) return wDiff;
    return (diffOrder[b.difficulty] ?? 0) - (diffOrder[a.difficulty] ?? 0);
  });

  let dayPointer = 0;
  return sorted.map((ch, i) => {
    const isWeak = config.weakSlugs.includes(ch.slug);
    const hours = isWeak ? ch.estimatedHours * 1.2 : ch.estimatedHours;
    const daysNeeded = Math.max(1, Math.ceil(hours / config.hoursPerDay));
    const start = dayPointer;
    dayPointer += daysNeeded;
    return {
      ...ch,
      priority: i + 1,
      allocatedHours: Math.round(hours * 10) / 10,
      startDay: start,
      endDay: dayPointer - 1,
      isCompleted: completedSlugs.has(ch.slug),
      isWeak,
    };
  });
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function DifficultyDot({ d }: { d: string }) {
  const colors: Record<string, string> = {
    EASY: "bg-emerald-500", MEDIUM: "bg-amber-500",
    HARD: "bg-red-500", ADVANCED: "bg-purple-500",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[d] ?? "bg-gray-400"}`} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

const DEFAULT_CONFIG: PlanConfig = {
  exam: "JEE_MAIN",
  hoursPerDay: 4,
  examDate: addDays(todayStr(), 180),
  classFilter: "BOTH",
  weakSlugs: [],
};

export function StudyPlannerClient() {
  const [tab, setTab] = useState<Tab>("setup");
  const [config, setConfig] = useState<PlanConfig>(DEFAULT_CONFIG);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [schedule, setSchedule] = useState<ScheduledChapter[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);

  // ── Load persisted state ────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        config?: PlanConfig;
        completedSlugs?: string[];
        isGenerated?: boolean;
      };
      const cfg = saved.config ?? DEFAULT_CONFIG;
      const done = new Set<string>(saved.completedSlugs ?? []);
      if (saved.isGenerated) {
        setConfig(cfg);
        setCompletedSlugs(done);
        setSchedule(buildSchedule(cfg, done));
        setIsGenerated(true);
        setTab("schedule");
      }
    } catch { /* ignore */ }
  }, []);

  // ── Persist whenever plan changes ──────────────────────────────────────────
  useEffect(() => {
    if (!isGenerated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      config,
      completedSlugs: [...completedSlugs],
      isGenerated: true,
    }));
  }, [config, completedSlugs, isGenerated]);

  // ── Rebuild schedule when config or completions change ─────────────────────
  useEffect(() => {
    if (isGenerated) {
      setSchedule(buildSchedule(config, completedSlugs));
    }
  }, [config, completedSlugs, isGenerated]);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const handleGenerate = () => {
    const s = buildSchedule(config, completedSlugs);
    setSchedule(s);
    setIsGenerated(true);
    setTab("schedule");
  };

  const handleReset = () => {
    setSchedule([]);
    setCompletedSlugs(new Set());
    setConfig(DEFAULT_CONFIG);
    setIsGenerated(false);
    setTab("setup");
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleCompleted = (slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const toggleWeak = (slug: string) => {
    setConfig((prev) => ({
      ...prev,
      weakSlugs: prev.weakSlugs.includes(slug)
        ? prev.weakSlugs.filter((s) => s !== slug)
        : [...prev.weakSlugs, slug],
    }));
  };

  // ── Derived values ──────────────────────────────────────────────────────────
  const totalCount = schedule.length;
  const completedCount = schedule.filter((c) => c.isCompleted).length;
  const remainingChapters = schedule.filter((c) => !c.isCompleted);
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalDaysNeeded = schedule.length > 0
    ? (schedule[schedule.length - 1]?.endDay ?? 0) + 1
    : 0;
  const daysLeft = daysUntil(config.examDate);
  const isOnTrack = totalDaysNeeded <= daysLeft;
  const completionDate = addDays(todayStr(), totalDaysNeeded);

  // Today's task: simply the next 2 incomplete chapters in schedule order
  const todayChapters = remainingChapters.slice(0, 2);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Study Planner</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Personalised schedule based on your exam, weak chapters, and available time
          </p>
        </div>
        {isGenerated && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-muted/40 p-1 w-fit">
        {(["setup", "schedule", "today"] as Tab[]).map((t) => {
          const label = t === "today" ? "Today's Task" : t.charAt(0).toUpperCase() + t.slice(1);
          const isDisabled = !isGenerated && t !== "setup";
          return (
            <button
              key={t}
              onClick={() => !isDisabled && setTab(t)}
              title={isDisabled ? "Generate a plan first" : undefined}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all
                ${tab === t
                  ? "bg-background shadow-sm text-foreground"
                  : isDisabled
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-muted-foreground hover:text-foreground cursor-pointer"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════════ SETUP TAB ══════════════════════ */}
      {tab === "setup" && (
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left column */}
          <div className="flex flex-col gap-5">

            {/* Target exam */}
            <div className="rounded-2xl border bg-card/60 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Target Exam</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["JEE_MAIN", "JEE_ADVANCED", "NEET"] as Exam[]).map((e) => (
                  <button
                    key={e}
                    onClick={() => setConfig((p) => ({ ...p, exam: e }))}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all
                      ${config.exam === e
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:border-primary/40 hover:bg-accent"
                      }`}
                  >
                    {EXAM_LABELS[e]}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours per day */}
            <div className="rounded-2xl border bg-card/60 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Daily Study Hours</span>
                <span className="ml-auto font-bold text-primary">{config.hoursPerDay}h / day</span>
              </div>
              <input
                type="range" min={1} max={10} step={0.5}
                value={config.hoursPerDay}
                onChange={(e) => setConfig((p) => ({ ...p, hoursPerDay: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1h</span><span>5h</span><span>10h</span>
              </div>
            </div>

            {/* Exam date */}
            <div className="rounded-2xl border bg-card/60 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Exam Date</span>
              </div>
              <input
                type="date"
                value={config.examDate}
                min={addDays(todayStr(), 1)}
                onChange={(e) => setConfig((p) => ({ ...p, examDate: e.target.value }))}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-muted-foreground">
                {daysUntil(config.examDate)} days remaining from today
              </p>
            </div>

            {/* Class filter */}
            <div className="rounded-2xl border bg-card/60 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Chapters to Cover</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["BOTH", "XI", "XII"] as ClassFilter[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setConfig((p) => ({ ...p, classFilter: c }))}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all
                      ${config.classFilter === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:border-primary/40 hover:bg-accent"
                      }`}
                  >
                    {c === "BOTH" ? "Both Classes" : `Class ${c}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: weak chapters */}
          <div className="rounded-2xl border bg-card/60 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-sm">Mark Your Weak Chapters</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {config.weakSlugs.length} selected
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Weak chapters get 20% extra time and are prioritised first.
            </p>
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[440px] pr-1">
              {ALL_CHAPTERS
                .filter((c) => config.classFilter === "BOTH" || c.class === config.classFilter)
                .map((ch) => {
                  const isWeak = config.weakSlugs.includes(ch.slug);
                  return (
                    <button
                      key={ch.slug}
                      onClick={() => toggleWeak(ch.slug)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all
                        ${isWeak
                          ? "border border-amber-400/40 bg-amber-500/5 text-amber-700 dark:text-amber-400"
                          : "border border-transparent hover:border-border hover:bg-muted/40"
                        }`}
                    >
                      {isWeak
                        ? <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                        : <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                      }
                      <span className="flex-1 font-medium">{ch.title}</span>
                      <DifficultyDot d={ch.difficulty} />
                      <span className="text-xs text-muted-foreground">{ch.estimatedHours}h</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Generate button */}
          <div className="lg:col-span-2">
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
            >
              <Zap className="h-4 w-4" />
              Generate My Study Schedule
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════ SCHEDULE TAB ══════════════════════ */}
      {tab === "schedule" && (
        <>
          {!isGenerated ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <Zap className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">Set up your plan first, then click Generate.</p>
              <button
                onClick={() => setTab("setup")}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Go to Setup
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">

              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border bg-card/60 p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">{completedCount}/{totalCount}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Chapters done</p>
                </div>
                <div className="rounded-xl border bg-card/60 p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">{completionPct}%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
                </div>
                <div className={`rounded-xl border p-4 text-center
                  ${isOnTrack ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                  <p className={`text-2xl font-extrabold ${isOnTrack ? "text-emerald-600" : "text-red-500"}`}>
                    {totalDaysNeeded}d
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isOnTrack ? "✓ On track" : "⚠ Tight"}
                  </p>
                </div>
                <div className="rounded-xl border bg-card/60 p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">{daysLeft}d</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Until exam</p>
                </div>
              </div>

              {/* Warning */}
              {!isOnTrack && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/5 p-4 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-700 dark:text-amber-400">Schedule is tight</p>
                    <p className="text-muted-foreground mt-0.5">
                      At {config.hoursPerDay}h/day you need {totalDaysNeeded} days, but only {daysLeft} remain.
                      Try increasing daily hours or covering fewer chapters.
                    </p>
                    <button onClick={() => setTab("setup")} className="mt-2 text-xs font-semibold text-amber-600 hover:underline">
                      Adjust settings →
                    </button>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Overall progress</span>
                  <span>{completionPct}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>

              {/* Chapter list */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1 mb-1">
                  <span># · Chapter · Weight · Hours · Days</span>
                  <span>Done?</span>
                </div>
                {schedule.map((ch) => (
                  <div
                    key={ch.slug}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all
                      ${ch.isCompleted
                        ? "border-emerald-500/20 bg-emerald-500/5 opacity-60"
                        : ch.isWeak
                          ? "border-amber-400/30 bg-amber-500/5"
                          : "bg-card/60 hover:border-primary/20"
                      }`}
                  >
                    <span className="text-xs font-bold text-muted-foreground w-6 shrink-0 text-center">
                      #{ch.priority}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium text-sm ${ch.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                          {ch.title}
                        </span>
                        {ch.isWeak && (
                          <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Weak
                          </span>
                        )}
                        <DifficultyDot d={ch.difficulty} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{getWeightage(ch, config.exam)}% weight</span>
                        <span>·</span>
                        <span>{ch.allocatedHours}h</span>
                        <span>·</span>
                        <span>Day {ch.startDay + 1}–{ch.endDay + 1}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <Link
                        href={`/chapters/${ch.slug}/theory`}
                        className="rounded-lg border px-2.5 py-1 text-xs hover:bg-accent transition-colors"
                      >
                        Theory
                      </Link>
                      <Link
                        href={`/chapters/${ch.slug}/practice`}
                        className="rounded-lg border px-2.5 py-1 text-xs hover:bg-accent transition-colors"
                      >
                        Practice
                      </Link>
                    </div>
                    <button
                      onClick={() => toggleCompleted(ch.slug)}
                      title={ch.isCompleted ? "Mark incomplete" : "Mark complete"}
                      className="shrink-0 ml-1"
                    >
                      {ch.isCompleted
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        : <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-primary transition-colors" />
                      }
                    </button>
                  </div>
                ))}
              </div>

              {/* Estimated completion */}
              <div className="flex items-center justify-between rounded-xl border bg-card/60 px-5 py-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Estimated completion date
                </div>
                <span className={`font-semibold ${isOnTrack ? "text-emerald-600" : "text-amber-600"}`}>
                  {formatDate(completionDate)}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* ══════════════════════ TODAY'S TASK TAB ══════════════════════ */}
      {tab === "today" && (
        <>
          {!isGenerated ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <Flame className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">Generate your plan first to see today&apos;s tasks.</p>
              <button
                onClick={() => setTab("setup")}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Go to Setup
              </button>
            </div>
          ) : completedCount === totalCount ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 py-16 text-center">
              <Trophy className="h-12 w-12 text-emerald-500" />
              <div>
                <p className="text-xl font-bold">All chapters completed!</p>
                <p className="text-muted-foreground mt-1">Focus on revision and mock tests now.</p>
              </div>
              <Link
                href="/mock-tests"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Take a Mock Test <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">

              {/* Header */}
              <div className="flex items-center gap-3 rounded-2xl border bg-card/60 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Today&apos;s Focus</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-IN", {
                      weekday: "long", day: "numeric", month: "long",
                    })}
                    &nbsp;·&nbsp;{daysLeft} days left
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-extrabold text-primary">{config.hoursPerDay}h</p>
                  <p className="text-xs text-muted-foreground">target today</p>
                </div>
              </div>

              {/* Next 2 chapters */}
              {todayChapters.map((ch, i) => (
                <div
                  key={ch.slug}
                  className={`rounded-2xl border p-5 flex flex-col gap-4
                    ${i === 0 ? "border-primary/30 bg-primary/5" : "bg-card/60"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {i === 0 ? "Primary chapter" : "Secondary chapter"}
                        </span>
                        {ch.isWeak && (
                          <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Weak — extra focus
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold">{ch.title}</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {ch.allocatedHours}h total &nbsp;·&nbsp;
                        {getWeightage(ch, config.exam)}% {EXAM_LABELS[config.exam]} weight &nbsp;·&nbsp;
                        #{ch.priority} in schedule
                      </p>
                    </div>
                    <button
                      onClick={() => { toggleCompleted(ch.slug); setTab("schedule"); }}
                      className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors shrink-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Mark done
                    </button>
                  </div>

                  {/* Key topics */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Key topics to cover</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ch.keyTopics.map((t) => (
                        <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/chapters/${ch.slug}/theory`}
                      className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Study Theory
                    </Link>
                    <Link
                      href={`/chapters/${ch.slug}/formulas`}
                      className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold hover:bg-accent transition-colors"
                    >
                      Formulas
                    </Link>
                    <Link
                      href={`/chapters/${ch.slug}/practice`}
                      className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold hover:bg-accent transition-colors"
                    >
                      Practice
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Mini progress */}
              <div className="rounded-2xl border bg-card/60 p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Overall progress</span>
                    <span>{completedCount}/{totalCount} chapters · {completionPct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setTab("schedule")}
                  className="text-xs font-semibold text-primary hover:underline whitespace-nowrap"
                >
                  Full schedule →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
