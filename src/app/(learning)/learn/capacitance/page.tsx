import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Capacitance — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Capacitance module: capacitance, parallel-plate & spherical capacitors, dielectrics, series/parallel combinations, energy, charge sharing and RC circuits — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/capacitance" },
};

export default function CapacitanceLearnPage() {
  return <ChapterLearnModule data={LEARN_CHAPTERS.capacitance} showThemeToggle={false} />;
}
