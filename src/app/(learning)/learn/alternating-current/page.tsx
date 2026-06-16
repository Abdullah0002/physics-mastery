import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Alternating Current — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Alternating Current module: rms values, reactance of R/L/C, series LCR circuits & phasors, resonance and quality factor, power & power factor, LC oscillations and the transformer — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/alternating-current" },
};

export default function AlternatingCurrentLearnPage() {
  return <ChapterLearnModule data={LEARN_CHAPTERS["alternating-current"]} showThemeToggle={false} />;
}
