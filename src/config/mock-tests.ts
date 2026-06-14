// =============================================================================
// Mock Test Catalog — sample tests built from sample-questions + pyq-data.
// When the database is seeded, replace resolveQuestion() with a DB query.
// =============================================================================

import { SAMPLE_QUESTIONS } from "./sample-questions";
import { PYQ_ENTRIES } from "./pyq-data";
import type { ExamType, Question, QuestionOption } from "@/types";

export interface MockTestSection {
  name: string;
  questionIds: string[];
  marksPerCorrect: number;
  negativeMarks: number;
}

export interface MockTestConfig {
  id: string;
  title: string;
  exam: ExamType;
  durationMinutes: number;
  description: string;
  difficulty: "Beginner" | "Moderate" | "Advanced";
  isFree: boolean;
  sections: MockTestSection[];
}

export const MOCK_TESTS: MockTestConfig[] = [
  {
    id: "jm-physics-1",
    title: "JEE Main Physics — Full Length #1",
    exam: "JEE_MAIN",
    durationMinutes: 60,
    difficulty: "Moderate",
    isFree: true,
    description: "20 questions covering kinematics, mechanics, electrostatics, optics and modern physics. Mirrors the actual JEE Main Physics section.",
    sections: [
      {
        name: "Section A — MCQ",
        questionIds: [
          "pyq-jm24-k1",
          "pyq-jm24-lm1",
          "pyq-jm24-mag1",
          "sq-k1",
          "sq-k2",
          "sq-lm1",
          "sq-wpe2",
          "sq-es2",
          "sq-ro1",
          "sq-ce1",
          "pyq-jm23-thermo1",
          "pyq-jm23-grav1",
          "pyq-jm22-shm1",
          "pyq-jm22-es1",
          "pyq-jm22-em1",
        ],
        marksPerCorrect: 4,
        negativeMarks: 1,
      },
      {
        name: "Section B — Integer",
        questionIds: [
          "pyq-jm24-wpe1",
          "pyq-jm22-ce1",
          "sq-int1",
          "sq-int2",
          "sq-int3",
        ],
        marksPerCorrect: 4,
        negativeMarks: 0,
      },
    ],
  },
  {
    id: "jm-physics-2",
    title: "JEE Main Physics — Full Length #2",
    exam: "JEE_MAIN",
    durationMinutes: 60,
    difficulty: "Moderate",
    isFree: true,
    description: "Another 20-question full-length test with fresh questions from rotational mechanics, wave optics, thermodynamics, and current electricity.",
    sections: [
      {
        name: "Section A — MCQ",
        questionIds: [
          "pyq-jm24-mp1",
          "pyq-jm23-rot1",
          "pyq-jm23-wo1",
          "sq-k3",
          "sq-lm2",
          "sq-wpe1",
          "sq-es3",
          "sq-mc1",
          "pyq-neet22-lm1",
          "pyq-neet22-mp1",
          "pyq-neet23-k1",
          "pyq-neet23-thermo1",
          "pyq-neet21-shm1",
          "pyq-neet21-waves1",
          "pyq-ja21-waves1",
        ],
        marksPerCorrect: 4,
        negativeMarks: 1,
      },
      {
        name: "Section B — Integer",
        questionIds: [
          "pyq-jm23-ro1",
          "pyq-ja21-cap1",
          "pyq-ja22-mp1",
          "sq-int1",
          "sq-int3",
        ],
        marksPerCorrect: 4,
        negativeMarks: 0,
      },
    ],
  },
  {
    id: "ja-physics-mini",
    title: "JEE Advanced Physics — Mini Test",
    exam: "JEE_ADVANCED",
    durationMinutes: 45,
    difficulty: "Advanced",
    isFree: true,
    description: "15 questions including multi-correct MCQs and integer-type — modelled on JEE Advanced Paper 1 format with higher negative marking.",
    sections: [
      {
        name: "Part I — Single Correct",
        questionIds: [
          "sq-es2",
          "sq-k3",
          "sq-wpe2",
          "pyq-ja21-waves1",
          "pyq-jm22-shm1",
        ],
        marksPerCorrect: 3,
        negativeMarks: 1,
      },
      {
        name: "Part II — One or More Correct",
        questionIds: [
          "pyq-ja23-mc1",
          "pyq-ja23-es1",
          "pyq-ja22-em1",
          "sq-mc1",
          "sq-mc2",
        ],
        marksPerCorrect: 4,
        negativeMarks: 2,
      },
      {
        name: "Part III — Integer",
        questionIds: [
          "pyq-ja23-rot1",
          "pyq-ja21-cap1",
          "pyq-ja22-mp1",
          "sq-int2",
          "sq-int3",
        ],
        marksPerCorrect: 4,
        negativeMarks: 0,
      },
    ],
  },
  {
    id: "neet-physics-1",
    title: "NEET Physics — Practice Test",
    exam: "NEET",
    durationMinutes: 40,
    difficulty: "Beginner",
    isFree: true,
    description: "20 single-correct MCQs covering Class 11 & 12 Physics topics at NEET difficulty. All topics carry equal weightage.",
    sections: [
      {
        name: "Physics",
        questionIds: [
          "pyq-neet23-k1",
          "pyq-neet23-ro1",
          "pyq-neet23-mag1",
          "pyq-neet23-thermo1",
          "pyq-neet22-lm1",
          "pyq-neet22-mp1",
          "pyq-neet22-ce1",
          "pyq-neet21-shm1",
          "pyq-neet21-waves1",
          "sq-k1",
          "sq-k2",
          "sq-lm1",
          "sq-wpe1",
          "sq-ce1",
          "sq-ro1",
          "pyq-jm23-thermo1",
          "pyq-jm23-grav1",
          "pyq-jm22-shm1",
          "pyq-jm24-k1",
          "pyq-jm24-lm1",
        ],
        marksPerCorrect: 4,
        negativeMarks: 1,
      },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function pyqEntryToQuestion(p: (typeof PYQ_ENTRIES)[number]): Question {
  return {
    id: p.id,
    content: p.content,
    options: p.options as QuestionOption[] | null,
    correctAnswer: p.correctAnswer,
    solution: p.solution,
    hint: p.hint,
    explanation: p.explanation,
    type: p.type,
    difficulty: p.difficulty,
    chapterId: p.chapterSlug,
    topicId: null,
    tags: p.tags,
    marks: p.marks,
    negativeMarks: p.negativeMarks,
    timeToSolve: null,
    isVerified: true,
    isStarred: false,
    chapter: { id: p.chapterSlug, title: p.chapterTitle, slug: p.chapterSlug },
  };
}

export function resolveQuestion(id: string): Question | null {
  const sq = SAMPLE_QUESTIONS.find((q) => q.id === id);
  if (sq) return sq;
  const pyq = PYQ_ENTRIES.find((p) => p.id === id);
  if (pyq) return pyqEntryToQuestion(pyq);
  return null;
}

export interface FlatQuestion {
  question: Question;
  sectionName: string;
  marksPerCorrect: number;
  negativeMarks: number;
}

export function getTestQuestions(testId: string): FlatQuestion[] {
  const test = MOCK_TESTS.find((t) => t.id === testId);
  if (!test) return [];
  return test.sections.flatMap((sec) =>
    sec.questionIds
      .map((qid) => {
        const question = resolveQuestion(qid);
        if (!question) return null;
        return {
          question,
          sectionName: sec.name,
          marksPerCorrect: sec.marksPerCorrect,
          negativeMarks: sec.negativeMarks,
        } satisfies FlatQuestion;
      })
      .filter((x): x is FlatQuestion => x !== null)
  );
}

export function getMockTest(id: string): MockTestConfig | undefined {
  return MOCK_TESTS.find((t) => t.id === id);
}

export function getTotalMarks(test: MockTestConfig): number {
  return test.sections.reduce(
    (sum, sec) => sum + sec.questionIds.length * sec.marksPerCorrect,
    0
  );
}
