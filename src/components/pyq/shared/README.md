# PYQ Module (multi-chapter)

Self-contained, production-ready Previous-Year-Questions modules for JEE Main 2026
(January). One reusable UI, many chapter datasets.

**No coupling** to Prisma or app-wide types — portable into any React / Next.js +
Tailwind project.

## Layout

```
src/components/pyq/
  shared/
    types.ts              TypeScript interfaces (PYQQuestion, ChapterPYQData)
    PYQModule.tsx         Main client component: search, filters, dark mode, list
    PYQQuestionCard.tsx   Single question: options/numeric, solution, bookmark, concept…
    SvgFigure.tsx         Responsive, theme-aware inline-SVG renderer
    useBookmarks.ts       localStorage bookmark hook (scoped per chapter)
    README.md
  data/
    index.ts              Chapter registry (PYQ_CHAPTERS, PYQ_CHAPTER_LIST)
    kinematics.json
    alternating-current.json
    atomic-physics.json
    capacitance.json
```

Routes live at `/pyqs/<slug>` (e.g. `/pyqs/kinematics`, `/pyqs/capacitance`).
The `/pyqs` landing page renders a card per chapter from the registry.

## Chapters

| Slug | Chapter | Questions |
| --- | --- | --- |
| `kinematics` | Kinematics | 8 |
| `alternating-current` | Alternating Current | 5 |
| `atomic-physics` | Atomic Physics | 5 |
| `capacitance` | Capacitance | 7 |

## Usage

```tsx
import { PYQModule } from "@/components/pyq/shared/PYQModule";
import { PYQ_CHAPTERS } from "@/components/pyq/data";

export default function Page() {
  // showThemeToggle defaults to true (standalone). Set false if your app
  // already toggles the `dark` class on <html>.
  return <PYQModule data={PYQ_CHAPTERS.kinematics} showThemeToggle={false} />;
}
```

### Add a new chapter

1. Drop a `data/<slug>.json` file following the schema below.
2. Register it in `data/index.ts` (`PYQ_CHAPTERS` + `PYQ_CHAPTER_LIST`).
3. Add a route `src/app/(learning)/pyqs/<slug>/page.tsx` passing `PYQ_CHAPTERS["<slug>"]`.

## Features

- 🔍 Search across question text, concept, session and solution.
- 🎚️ Filters for topic (when >1), difficulty (Easy / Medium / Hard) and year.
- 👁️ Show / Hide solution per question.
- 🔖 Bookmarks persisted in `localStorage`, scoped per chapter, + "Bookmarked only" view.
- 🌙 Dark mode (Tailwind `class` strategy) — built-in toggle or host-managed.
- 📱 Mobile-responsive throughout.
- 🎓 Every question includes the concept tested, a JEE shortcut, and common mistakes.
- 📐 Publication-quality responsive SVG diagrams (circuits, graphs, dielectric slabs,
  projectile trajectories) — theme-aware via `currentColor`.
- 🔢 Supports both MCQ and numeric/integer-answer questions (`answerIndex: -1`, empty `options`).

## Question schema

```jsonc
{
  "slug": "kinematics",            // chapter-level field
  "chapter": "Kinematics",
  "exam": "JEE Main 2026 (January)",
  "source": "…",
  "topics": ["Motion In One Dimension", "Motion In Two Dimensions"],
  "questions": [
    {
      "id": "kin-1d-2026-jan28-s2-q1",
      "topic": "Motion In One Dimension",
      "year": "2026",
      "session": "JEE Main 2026 (28 January Shift 2)",
      "difficulty": "Hard",
      "concept": "…",
      "question": "…",
      "options": ["…"],            // [] for numeric answers; "<svg…" renders as a graphic
      "answer": "…",
      "answerIndex": 0,            // -1 for numeric/integer answers
      "diagram": "<svg…>",         // "" when there is no diagram
      "solution": "…",            // newline-separated steps
      "shortcut": "…",
      "commonMistakes": ["…"]
    }
  ]
}
```

## Dependencies

- React 18+ / Next.js (App Router), `resolveJsonModule` enabled
- Tailwind CSS with `darkMode: "class"`
- `lucide-react` for icons
