// Central registry of all chapter PYQ datasets.
// Add a new chapter by dropping a JSON file here and registering it below.

import type { ChapterPYQData } from "../shared/types";
import kinematics from "./kinematics.json";
import alternatingCurrent from "./alternating-current.json";
import atomicPhysics from "./atomic-physics.json";
import capacitance from "./capacitance.json";

export const PYQ_CHAPTERS = {
  kinematics: kinematics as ChapterPYQData,
  "alternating-current": alternatingCurrent as ChapterPYQData,
  "atomic-physics": atomicPhysics as ChapterPYQData,
  capacitance: capacitance as ChapterPYQData,
} satisfies Record<string, ChapterPYQData>;

export type ChapterSlug = keyof typeof PYQ_CHAPTERS;

/** Ordered list used by the PYQ landing page to render chapter cards. */
export const PYQ_CHAPTER_LIST: ChapterPYQData[] = [
  PYQ_CHAPTERS.kinematics,
  PYQ_CHAPTERS["alternating-current"],
  PYQ_CHAPTERS["atomic-physics"],
  PYQ_CHAPTERS.capacitance,
];

export function getChapter(slug: string): ChapterPYQData | undefined {
  return (PYQ_CHAPTERS as Record<string, ChapterPYQData>)[slug];
}
