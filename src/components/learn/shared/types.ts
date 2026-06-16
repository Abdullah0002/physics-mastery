// Types for the rich, self-study "Learn" chapter modules.
// Self-contained and portable: no Prisma / app-wide dependencies.

export type CalloutKind = "intuition" | "warning" | "note" | "tip" | "jee" | "history";

export interface Callout {
  kind: CalloutKind;
  title?: string;
  /** Body text (plain prose; supports **bold**, line breaks, and "- " bullet lines). */
  body: string;
}

export interface Figure {
  /** Inline SVG markup (author-controlled, theme-aware via currentColor). */
  svg: string;
  caption?: string;
}

export interface Formula {
  /** Short label, e.g. "Coulomb's Law". */
  label: string;
  /** The formula in unicode math, e.g. "F = (1/4πε₀)·q₁q₂/r²". */
  expr: string;
  /** Optional one-line note about validity / meaning. */
  note?: string;
}

export interface WorkedExample {
  level: "JEE Main" | "JEE Advanced" | "NEET";
  problem: string;
  solution: string;
  /** Optional final boxed answer. */
  answer?: string;
}

export interface Topic {
  id: string;
  title: string;
  /** Core theory. */
  theory?: string;
  /** Plain-language intuition / analogy. */
  intuition?: string;
  /** Step-by-step derivation. */
  derivation?: string;
  figures?: Figure[];
  formulas?: Formula[];
  callouts?: Callout[];
  mistakes?: string[];
  examples?: WorkedExample[];
  jeeNotes?: string[];
}

export interface Section {
  id: string;
  /** e.g. "5 · Coulomb's Law". */
  title: string;
  intro?: string;
  topics: Topic[];
}

export interface RevisionData {
  formulaSheet: Formula[];
  conceptMap?: string;
  lastMinuteTips: string[];
  pyqInsights?: string[];
}

export interface ChapterLearnModule {
  slug: string;
  chapter: string;
  exams: string;
  summary: string;
  sections: Section[];
  /** Cross-cutting compilation of frequent errors. */
  topMistakes?: string[];
  revision: RevisionData;
}
