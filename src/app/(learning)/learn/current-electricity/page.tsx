import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Current Electricity — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Current Electricity module: current & drift velocity, Ohm's law and resistivity, EMF & internal resistance, Kirchhoff's laws, Wheatstone bridge, potentiometer, power and grouping of cells — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/current-electricity" },
};

export default function CurrentElectricityLearnPage() {
  return <ChapterLearnModule data={LEARN_CHAPTERS["current-electricity"]} showThemeToggle={false} />;
}
