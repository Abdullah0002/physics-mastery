// Shared types for all chapter PYQ modules.
// Self-contained: no dependency on Prisma or app-wide types, so the module is portable.

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface PYQQuestion {
  /** Stable unique id, also used as the bookmark key. */
  id: string;
  /** Topic within the chapter, e.g. "Motion In One Dimension". */
  topic: string;
  /** Exam year as a string, e.g. "2026". */
  year: string;
  /** Full session label, e.g. "JEE Main 2026 (28 January Shift 2)". */
  session: string;
  difficulty: Difficulty;
  /** One-line statement of the concept being tested. */
  concept: string;
  /** Full question text (may contain newlines and unicode math). */
  question: string;
  /** Answer options. A string starting with "<svg" is rendered as an inline SVG graphic. */
  options: string[];
  /** Human-readable correct answer. */
  answer: string;
  /** Zero-based index of the correct option within `options`, or -1 for numeric/integer answers. */
  answerIndex: number;
  /** Inline SVG markup for the question diagram, or "" if none. */
  diagram: string;
  /** Detailed step-by-step solution (newline separated). */
  solution: string;
  /** JEE exam shortcut / smart trick. */
  shortcut: string;
  /** Common mistakes students make on this question. */
  commonMistakes: string[];
}

export interface ChapterPYQData {
  /** URL slug, e.g. "kinematics". Used for the route and the bookmark storage key. */
  slug: string;
  chapter: string;
  exam: string;
  source: string;
  topics: string[];
  questions: PYQQuestion[];
}
