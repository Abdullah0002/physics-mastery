import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Electrostatics — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "The most comprehensive Electrostatics module: charge, Coulomb's law, electric field, dipoles, Gauss's law, potential, conductors and shielding — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/electrostatics" },
};

export default function ElectrostaticsLearnPage() {
  return <ChapterLearnModule data={LEARN_CHAPTERS.electrostatics} showThemeToggle={false} />;
}
