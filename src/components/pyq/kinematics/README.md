# Kinematics PYQ Module

A self-contained, production-ready Previous-Year-Questions module for the **Kinematics**
chapter (JEE Main 2026 January question bank — Motion in One & Two Dimensions).

It has **no coupling** to Prisma or app-wide types, so it can be dropped into any
React / Next.js project that uses Tailwind CSS.

## Contents

| File | Purpose |
| --- | --- |
| `kinematics-pyq.json` | Structured question database (8 questions). |
| `types.ts` | TypeScript interfaces for the data. |
| `KinematicsPYQModule.tsx` | Main client component: search, filters, dark mode, list. |
| `KinematicsQuestionCard.tsx` | Single question card: options, show/hide solution, bookmark, concept, shortcut, common mistakes. |
| `SvgFigure.tsx` | Responsive, theme-aware inline-SVG renderer for diagrams. |
| `useBookmarks.ts` | `localStorage`-backed bookmark hook. |

## Usage

```tsx
import { KinematicsPYQModule } from "@/components/pyq/kinematics/KinematicsPYQModule";

export default function Page() {
  // showThemeToggle defaults to true (standalone). Set false if your app
  // already toggles the `dark` class on <html>.
  return <KinematicsPYQModule showThemeToggle={false} />;
}
```

A ready-made route is wired at **`/pyqs/kinematics`**
(`src/app/(learning)/pyqs/kinematics/page.tsx`).

## Features

- 🔍 **Search** across question text, concept, session and solution.
- 🎚️ **Filters** for topic, difficulty (Easy / Medium / Hard) and year.
- 👁️ **Show / Hide solution** per question.
- 🔖 **Bookmark** questions (persisted in `localStorage`) + "Bookmarked only" view.
- 🌙 **Dark mode** (Tailwind `class` strategy) — built-in toggle or host-managed.
- 📱 **Mobile responsive** layout throughout.
- 🎓 Every question includes the **concept tested**, a **JEE shortcut**, and **common mistakes**.
- 📐 **Publication-quality SVG diagrams** (velocity–distance graph + options, projectile
  trajectory) — responsive and theme-aware via `currentColor`.

## Question schema

```jsonc
{
  "id": "kin-1d-2026-jan28-s2-q1",
  "topic": "Motion In One Dimension",
  "year": "2026",
  "session": "JEE Main 2026 (28 January Shift 2)",
  "difficulty": "Hard",
  "concept": "…",
  "question": "…",
  "options": ["…"],          // a value starting with "<svg" renders as a graphic
  "answer": "…",
  "answerIndex": 0,
  "diagram": "<svg…>",        // "" when there is no diagram
  "solution": "…",            // newline-separated steps
  "shortcut": "…",
  "commonMistakes": ["…"]
}
```

## Dependencies

- React 18+ / Next.js (App Router)
- Tailwind CSS with `darkMode: "class"`
- `lucide-react` for icons

To add more chapters, copy this folder and replace `kinematics-pyq.json`.
