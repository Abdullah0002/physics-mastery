import type { Metadata } from "next";
import { PYQModule } from "@/components/pyq/shared/PYQModule";
import { PYQ_CHAPTERS } from "@/components/pyq/data";

export const metadata: Metadata = {
  title: "Atomic Physics PYQs — JEE Main 2026",
  description:
    "JEE Main 2026 (January) Atomic Physics previous-year questions — Bohr model, hydrogen spectra and Rutherford scattering — with detailed step-by-step solutions, JEE shortcuts and common mistakes.",
  alternates: { canonical: "/pyqs/atomic-physics" },
};

export default function AtomicPhysicsPyqPage() {
  return <PYQModule data={PYQ_CHAPTERS["atomic-physics"]} showThemeToggle={false} />;
}
