import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Magnetism & Matter — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Magnetism & Matter module: bar magnet as a magnetic dipole, Gauss's law for magnetism, the Earth's magnetic field and its elements, magnetization & magnetic intensity, and dia/para/ferromagnetism with hysteresis — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/magnetism-and-matter" },
};

export default function MagnetismAndMatterLearnPage() {
  return (
    <ChapterLearnModule data={LEARN_CHAPTERS["magnetism-and-matter"]} showThemeToggle={false} />
  );
}
