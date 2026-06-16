import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Electromagnetic Induction — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Electromagnetic Induction module: magnetic flux, Faraday's & Lenz's laws, motional EMF, eddy currents, self- & mutual inductance, energy in a magnetic field, the AC generator and LR circuits — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/electromagnetic-induction" },
};

export default function ElectromagneticInductionLearnPage() {
  return (
    <ChapterLearnModule
      data={LEARN_CHAPTERS["electromagnetic-induction"]}
      showThemeToggle={false}
    />
  );
}
