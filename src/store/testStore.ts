"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TestResponse, TestStatus } from "@/types";

interface TestState {
  testId: string | null;
  attemptId: string | null;
  currentQuestionIndex: number;
  responses: Record<string, TestResponse>;
  flaggedQuestions: Set<string>;
  visitedQuestions: Set<string>;
  status: TestStatus;
  startedAt: Date | null;
  timeRemainingSeconds: number;

  // Actions
  initTest: (testId: string, attemptId: string, durationSeconds: number) => void;
  setAnswer: (questionId: string, answer: string | string[] | number | null) => void;
  toggleFlag: (questionId: string) => void;
  markVisited: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  tick: () => void;
  submitTest: () => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>()(
  devtools(
    (set, get) => ({
      testId: null,
      attemptId: null,
      currentQuestionIndex: 0,
      responses: {},
      flaggedQuestions: new Set(),
      visitedQuestions: new Set(),
      status: "NOT_STARTED",
      startedAt: null,
      timeRemainingSeconds: 0,

      initTest: (testId, attemptId, durationSeconds) =>
        set({
          testId,
          attemptId,
          status: "IN_PROGRESS",
          startedAt: new Date(),
          timeRemainingSeconds: durationSeconds,
          responses: {},
          flaggedQuestions: new Set(),
          visitedQuestions: new Set([]),
          currentQuestionIndex: 0,
        }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          responses: {
            ...state.responses,
            [questionId]: {
              answer,
              flagged: state.responses[questionId]?.flagged ?? false,
              timeSpent: state.responses[questionId]?.timeSpent ?? 0,
            },
          },
        })),

      toggleFlag: (questionId) =>
        set((state) => {
          const next = new Set(Array.from(state.flaggedQuestions));
          if (next.has(questionId)) next.delete(questionId);
          else next.add(questionId);
          return { flaggedQuestions: next };
        }),

      markVisited: (questionId) =>
        set((state) => {
          const next = new Set(Array.from(state.visitedQuestions));
          next.add(questionId);
          return { visitedQuestions: next };
        }),

      goToQuestion: (index) =>
        set({ currentQuestionIndex: index }),

      tick: () =>
        set((state) => {
          if (state.timeRemainingSeconds <= 0) return { status: "SUBMITTED" };
          return { timeRemainingSeconds: state.timeRemainingSeconds - 1 };
        }),

      submitTest: () => set({ status: "SUBMITTED" }),

      resetTest: () =>
        set({
          testId: null,
          attemptId: null,
          currentQuestionIndex: 0,
          responses: {},
          flaggedQuestions: new Set(),
          visitedQuestions: new Set(),
          status: "NOT_STARTED",
          startedAt: null,
          timeRemainingSeconds: 0,
        }),
    }),
    { name: "test-store" }
  )
);

// Selectors
export const testSelectors = {
  answeredCount: (state: TestState) =>
    Object.values(state.responses).filter((r) => r.answer !== null).length,

  unansweredCount: (totalQuestions: number) => (state: TestState) =>
    totalQuestions - Object.values(state.responses).filter((r) => r.answer !== null).length,

  isAnswered: (questionId: string) => (state: TestState) =>
    state.responses[questionId]?.answer != null,

  isFlagged: (questionId: string) => (state: TestState) =>
    state.flaggedQuestions.has(questionId),

  isVisited: (questionId: string) => (state: TestState) =>
    state.visitedQuestions.has(questionId),
};
