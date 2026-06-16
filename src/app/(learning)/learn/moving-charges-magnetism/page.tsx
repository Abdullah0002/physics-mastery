import type { Metadata } from "next";
import { ChapterLearnModule } from "@/components/learn/shared/ChapterLearnModule";
import { LEARN_CHAPTERS } from "@/components/learn/data";

export const metadata: Metadata = {
  title: "Moving Charges & Magnetism — Complete Theory | JEE Main, Advanced & NEET",
  description:
    "Comprehensive Moving Charges & Magnetism module: Lorentz force, circular & helical motion, force on conductors, Biot–Savart & Ampère's laws, fields of wires/loops/solenoids, forces between currents, magnetic dipole torque and the moving-coil galvanometer — first principles to JEE Advanced, with derivations, SVG diagrams, worked examples and common mistakes.",
  alternates: { canonical: "/learn/moving-charges-magnetism" },
};

export default function MovingChargesMagnetismLearnPage() {
  return (
    <ChapterLearnModule
      data={LEARN_CHAPTERS["moving-charges-magnetism"]}
      showThemeToggle={false}
    />
  );
}
