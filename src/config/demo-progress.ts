// =============================================================================
// Demo progress data — used when the database is not connected.
// Replace with real API calls (/api/progress, /api/analytics) once seeded.
// =============================================================================

import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "./curriculum";

export const DEMO_STATS = {
  currentStreak: 12,
  longestStreak: 28,
  totalQuestionsAttempted: 342,
  overallAccuracy: 74,
  totalStudyMinutes: 2840,
  completedChapters: 9,
  totalChapters: 32,
  xp: 4250,
};

export const DEMO_DAILY_GOAL = {
  questionsTarget: 10,
  questionsToday: 7,
  minutesTarget: 60,
  minutesToday: 43,
};

// ── Study heatmap (last 26 weeks) ────────────────────────────────────────────
// Values: 0 = no study, 1-4 = intensity levels

function buildHeatmap(): Record<string, number> {
  // Anchor to 2026-06-06 (current date)
  const anchor = new Date(2026, 5, 6);
  const data: Record<string, number> = {};

  // Deterministic pattern — realistic with some streaks, some gaps
  const pattern = [
    3, 2, 0, 4, 3, 0, 0,  // week 26 (most recent)
    4, 3, 2, 4, 3, 0, 0,  // week 25
    2, 0, 3, 3, 4, 2, 0,  // week 24
    3, 3, 0, 2, 4, 3, 0,  // week 23
    1, 2, 3, 4, 2, 0, 0,  // week 22
    0, 3, 3, 2, 3, 2, 0,  // week 21
    2, 4, 3, 0, 4, 3, 0,  // week 20
    1, 2, 3, 4, 3, 0, 0,  // week 19
    0, 0, 2, 3, 2, 2, 0,  // week 18
    3, 2, 4, 3, 2, 0, 0,  // week 17
    2, 3, 3, 4, 0, 2, 1,  // week 16
    0, 2, 3, 2, 3, 4, 0,  // week 15
    2, 1, 2, 3, 3, 0, 0,  // week 14
    3, 4, 2, 0, 3, 2, 0,  // week 13
    1, 2, 3, 4, 2, 0, 0,  // week 12
    0, 3, 2, 3, 4, 1, 0,  // week 11
    3, 2, 0, 4, 3, 2, 0,  // week 10
    2, 3, 4, 2, 0, 3, 0,  // week 9
    0, 2, 3, 3, 2, 4, 0,  // week 8
    3, 4, 0, 2, 3, 2, 0,  // week 7
    1, 2, 3, 4, 2, 0, 0,  // week 6
    0, 3, 2, 3, 3, 2, 0,  // week 5
    2, 3, 4, 0, 3, 2, 0,  // week 4
    3, 2, 3, 4, 0, 2, 1,  // week 3
    0, 2, 3, 2, 4, 3, 0,  // week 2
    2, 3, 0, 4, 3, 2, 0,  // week 1 (oldest)
  ];

  for (let i = 181; i >= 0; i--) {
    const d = new Date(anchor);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0]!;
    data[key] = pattern[181 - i] ?? 0;
  }
  return data;
}

export const DEMO_HEATMAP = buildHeatmap();

// ── Chapter progress ─────────────────────────────────────────────────────────

export interface ChapterProgress {
  slug: string;
  title: string;
  class: "XI" | "XII";
  percent: number;
  questionsAttempted: number;
  accuracy: number;
  studyMinutes: number;
  status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";
}

const CLASS_11_PROGRESS_DATA: Record<string, Omit<ChapterProgress, "slug" | "title" | "class">> = {
  "kinematics":            { percent: 90, questionsAttempted: 52, accuracy: 82, studyMinutes: 240, status: "COMPLETED" },
  "laws-of-motion":        { percent: 85, questionsAttempted: 44, accuracy: 78, studyMinutes: 195, status: "COMPLETED" },
  "friction":              { percent: 70, questionsAttempted: 28, accuracy: 75, studyMinutes: 120, status: "IN_PROGRESS" },
  "work-power-energy":     { percent: 80, questionsAttempted: 38, accuracy: 76, studyMinutes: 175, status: "COMPLETED" },
  "circular-motion":       { percent: 60, questionsAttempted: 22, accuracy: 68, studyMinutes: 95,  status: "IN_PROGRESS" },
  "rotational-mechanics":  { percent: 45, questionsAttempted: 30, accuracy: 58, studyMinutes: 180, status: "IN_PROGRESS" },
  "gravitation":           { percent: 65, questionsAttempted: 24, accuracy: 71, studyMinutes: 110, status: "IN_PROGRESS" },
  "thermodynamics":        { percent: 55, questionsAttempted: 20, accuracy: 65, studyMinutes: 130, status: "IN_PROGRESS" },
  "simple-harmonic-motion":{ percent: 75, questionsAttempted: 32, accuracy: 74, studyMinutes: 145, status: "IN_PROGRESS" },
  "waves":                 { percent: 40, questionsAttempted: 18, accuracy: 62, studyMinutes: 90,  status: "IN_PROGRESS" },
  "vectors":               { percent: 95, questionsAttempted: 30, accuracy: 90, studyMinutes: 85,  status: "COMPLETED" },
  "units-and-dimensions":  { percent: 100,questionsAttempted: 20, accuracy: 95, studyMinutes: 60,  status: "COMPLETED" },
  "center-of-mass":        { percent: 50, questionsAttempted: 16, accuracy: 66, studyMinutes: 110, status: "IN_PROGRESS" },
  "properties-of-matter":  { percent: 20, questionsAttempted: 8,  accuracy: 60, studyMinutes: 45,  status: "IN_PROGRESS" },
  "thermal-physics":       { percent: 10, questionsAttempted: 4,  accuracy: 55, studyMinutes: 30,  status: "IN_PROGRESS" },
  "kinetic-theory-of-gases":{ percent: 0, questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "sound-waves":           { percent: 0, questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
};

const CLASS_12_PROGRESS_DATA: Record<string, Omit<ChapterProgress, "slug" | "title" | "class">> = {
  "electrostatics":           { percent: 85, questionsAttempted: 48, accuracy: 76, studyMinutes: 210, status: "COMPLETED" },
  "capacitance":              { percent: 70, questionsAttempted: 28, accuracy: 71, studyMinutes: 130, status: "IN_PROGRESS" },
  "current-electricity":      { percent: 75, questionsAttempted: 36, accuracy: 73, studyMinutes: 165, status: "IN_PROGRESS" },
  "magnetism":                { percent: 50, questionsAttempted: 22, accuracy: 68, studyMinutes: 110, status: "IN_PROGRESS" },
  "electromagnetic-induction":{ percent: 35, questionsAttempted: 16, accuracy: 59, studyMinutes: 90,  status: "IN_PROGRESS" },
  "ray-optics":               { percent: 60, questionsAttempted: 24, accuracy: 72, studyMinutes: 130, status: "IN_PROGRESS" },
  "modern-physics":           { percent: 40, questionsAttempted: 18, accuracy: 61, studyMinutes: 100, status: "IN_PROGRESS" },
  "alternating-current":      { percent: 15, questionsAttempted: 6,  accuracy: 55, studyMinutes: 40,  status: "IN_PROGRESS" },
  "wave-optics":              { percent: 25, questionsAttempted: 10, accuracy: 52, studyMinutes: 55,  status: "IN_PROGRESS" },
  "electromagnetic-waves":    { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "dual-nature":              { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "atoms":                    { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "nuclei":                   { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "semiconductors":           { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
  "communication-systems":    { percent: 0,  questionsAttempted: 0,  accuracy: 0,  studyMinutes: 0,   status: "NOT_STARTED" },
};

export const DEMO_CHAPTER_PROGRESS: ChapterProgress[] = [
  ...CLASS_11_CHAPTERS.map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    class: "XI" as const,
    ...(CLASS_11_PROGRESS_DATA[ch.slug] ?? {
      percent: 0, questionsAttempted: 0, accuracy: 0, studyMinutes: 0, status: "NOT_STARTED" as const,
    }),
  })),
  ...CLASS_12_CHAPTERS.map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    class: "XII" as const,
    ...(CLASS_12_PROGRESS_DATA[ch.slug] ?? {
      percent: 0, questionsAttempted: 0, accuracy: 0, studyMinutes: 0, status: "NOT_STARTED" as const,
    }),
  })),
];

export const CLASS_11_AVG_PROGRESS = Math.round(
  DEMO_CHAPTER_PROGRESS.filter((c) => c.class === "XI").reduce((s, c) => s + c.percent, 0) /
    CLASS_11_CHAPTERS.length
);

export const CLASS_12_AVG_PROGRESS = Math.round(
  DEMO_CHAPTER_PROGRESS.filter((c) => c.class === "XII").reduce((s, c) => s + c.percent, 0) /
    CLASS_12_CHAPTERS.length
);

// ── Weak topics ──────────────────────────────────────────────────────────────

export const DEMO_WEAK_TOPICS = [
  { topicTitle: "Rolling Motion", chapterTitle: "Rotational Mechanics", chapterSlug: "rotational-mechanics", accuracy: 48 },
  { topicTitle: "Young's Double Slit", chapterTitle: "Wave Optics", chapterSlug: "wave-optics", accuracy: 52 },
  { topicTitle: "Faraday's Law", chapterTitle: "Electromagnetic Induction", chapterSlug: "electromagnetic-induction", accuracy: 55 },
  { topicTitle: "Carnot Engine", chapterTitle: "Thermodynamics", chapterSlug: "thermodynamics", accuracy: 59 },
  { topicTitle: "Photoelectric Effect", chapterTitle: "Modern Physics", chapterSlug: "modern-physics", accuracy: 61 },
];

// ── Recent activity ──────────────────────────────────────────────────────────

export const DEMO_RECENT_ACTIVITY = [
  { type: "question_attempt" as const, title: "Solved 7 questions", subtitle: "Kinematics · 82% accuracy", time: "2 hours ago", positive: true },
  { type: "topic_completed" as const, title: "Completed topic", subtitle: "Projectile Motion", time: "Yesterday", positive: true },
  { type: "test_submitted" as const, title: "Submitted Mock Test", subtitle: "JEE Main Physics #1 · 68/100", time: "2 days ago", positive: true },
  { type: "question_attempt" as const, title: "Solved 5 questions", subtitle: "Electrostatics · 60% accuracy", time: "2 days ago", positive: false },
  { type: "topic_completed" as const, title: "Completed topic", subtitle: "Coulomb's Law", time: "3 days ago", positive: true },
  { type: "question_attempt" as const, title: "Solved 10 questions", subtitle: "Rotational Mechanics · 50% accuracy", time: "4 days ago", positive: false },
  { type: "test_submitted" as const, title: "Submitted Mock Test", subtitle: "NEET Physics #1 · 72/80", time: "5 days ago", positive: true },
  { type: "question_attempt" as const, title: "Solved 8 questions", subtitle: "Current Electricity · 75% accuracy", time: "6 days ago", positive: true },
];

// ── Weekly study data (last 8 weeks) ─────────────────────────────────────────

export const DEMO_WEEKLY_STUDY = [
  { week: "Apr 7",  minutes: 180, questions: 22 },
  { week: "Apr 14", minutes: 220, questions: 28 },
  { week: "Apr 21", minutes: 145, questions: 18 },
  { week: "Apr 28", minutes: 260, questions: 34 },
  { week: "May 5",  minutes: 310, questions: 40 },
  { week: "May 12", minutes: 240, questions: 30 },
  { week: "May 19", minutes: 380, questions: 48 },
  { week: "May 26", minutes: 290, questions: 38 },
];

export const DEMO_EXAM_ACCURACY = [
  { exam: "JEE Main",     accuracy: 74, attempted: 180, color: "bg-blue-500" },
  { exam: "JEE Advanced", accuracy: 58, attempted: 62, color: "bg-purple-500" },
  { exam: "NEET",         accuracy: 82, attempted: 100, color: "bg-emerald-500" },
];
