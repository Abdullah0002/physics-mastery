import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Electromagnetic Waves — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Electromagnetic Waves module: displacement current, Maxwell's equations, the nature & properties of EM waves (c = 1/√μ₀ε₀, E⟂B⟂c, E = cB), energy, intensity & radiation pressure, and the electromagnetic spectrum — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/electromagnetic-waves" },
};

export default function ElectromagneticWavesLearnPage() {
  return <ChapterLearnModule data={LEARN_CHAPTERS["electromagnetic-waves"]} showThemeToggle={false} />;
}
