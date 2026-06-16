// Registry of rich "Learn" chapter modules.
import type { ChapterLearnModule } from "../shared/types";
import { electrostatics } from "./electrostatics";
import { capacitance } from "./capacitance";
import { currentElectricity } from "./current-electricity";
import { movingChargesMagnetism } from "./moving-charges-magnetism";
import { magnetismAndMatter } from "./magnetism-and-matter";
import { electromagneticInduction } from "./electromagnetic-induction";
import { alternatingCurrent } from "./alternating-current";

export const LEARN_CHAPTERS = {
  electrostatics,
  capacitance,
  "current-electricity": currentElectricity,
  "moving-charges-magnetism": movingChargesMagnetism,
  "magnetism-and-matter": magnetismAndMatter,
  "electromagnetic-induction": electromagneticInduction,
  "alternating-current": alternatingCurrent,
} satisfies Record<string, ChapterLearnModule>;

export type LearnSlug = keyof typeof LEARN_CHAPTERS;

export const LEARN_CHAPTER_LIST: ChapterLearnModule[] = [
  electrostatics,
  capacitance,
  currentElectricity,
  movingChargesMagnetism,
  magnetismAndMatter,
  electromagneticInduction,
  alternatingCurrent,
];

export function getLearnChapter(slug: string): ChapterLearnModule | undefined {
  return (LEARN_CHAPTERS as Record<string, ChapterLearnModule>)[slug];
}
