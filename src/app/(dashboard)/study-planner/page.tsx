import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { StudyPlannerClient } from "@/components/planner/StudyPlannerClient";

export const metadata: Metadata = {
  title: `Study Planner — ${siteConfig.name}`,
  description: "Plan your JEE/NEET Physics study schedule with smart chapter recommendations.",
};

export default function StudyPlannerPage() {
  return <StudyPlannerClient />;
}
