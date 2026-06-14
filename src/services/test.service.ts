import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getMockTests(filters: {
  exam?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const { exam, page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.MockTestWhereInput = {
    isPublished: true,
    ...(exam && { exam: exam as never }),
  };

  const [tests, total] = await Promise.all([
    prisma.mockTest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        exam: true,
        duration: true,
        totalMarks: true,
        totalQuestions: true,
        isFree: true,
        scheduledAt: true,
        totalAttempts: true,
        avgScore: true,
      },
    }),
    prisma.mockTest.count({ where }),
  ]);

  return {
    data: tests,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total,
  };
}

export async function createTestAttempt(userId: string, mockTestId: string) {
  // Check if test exists and user hasn't already started an IN_PROGRESS attempt
  const existing = await prisma.testAttempt.findFirst({
    where: { userId, mockTestId, status: "IN_PROGRESS" },
  });

  if (existing) return existing;

  return prisma.testAttempt.create({
    data: {
      userId,
      mockTestId,
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
  });
}

export async function submitTestAttempt(
  attemptId: string,
  userId: string,
  responses: Record<string, { answer: unknown; timeSpent: number; flagged: boolean }>
) {
  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId, userId },
    include: {
      mockTest: {
        include: {
          questions: {
            include: { question: true },
          },
        },
      },
    },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.status === "SUBMITTED") throw new Error("Already submitted");

  // Calculate score
  let totalScore = 0;
  const chapterScores: Record<string, { correct: number; attempted: number; score: number }> = {};

  for (const mtq of attempt.mockTest.questions) {
    const { question } = mtq;
    const response = responses[question.id];
    if (!response || response.answer === null) continue;

    const marks = mtq.marks ?? question.marks;
    const negativeMarks = mtq.negativeMarks ?? question.negativeMarks;
    const isCorrect = evaluateAnswer(question.correctAnswer, response.answer, question.type);

    const questionScore = isCorrect ? marks : -negativeMarks;
    totalScore += questionScore;

    // Accumulate chapter analysis
    const ch = question.chapterId;
    if (!chapterScores[ch]) chapterScores[ch] = { correct: 0, attempted: 0, score: 0 };
    chapterScores[ch]!.attempted++;
    if (isCorrect) chapterScores[ch]!.correct++;
    chapterScores[ch]!.score += questionScore;
  }

  const chapterAnalysis = Object.fromEntries(
    Object.entries(chapterScores).map(([chId, data]) => [
      chId,
      {
        ...data,
        incorrect: data.attempted - data.correct,
        accuracy: data.attempted > 0 ? (data.correct / data.attempted) * 100 : 0,
      },
    ])
  );

  const startedAt = attempt.startedAt ?? new Date();
  const durationSeconds = Math.round((Date.now() - startedAt.getTime()) / 1000);

  return prisma.testAttempt.update({
    where: { id: attemptId },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      durationSeconds,
      responses: JSON.stringify(responses),
      totalScore,
      maxScore: attempt.mockTest.totalMarks,
      percentageScore: (totalScore / attempt.mockTest.totalMarks) * 100,
      chapterAnalysis: JSON.stringify(chapterAnalysis),
    },
  });
}

function evaluateAnswer(
  correctAnswerRaw: string,
  userAnswer: unknown,
  type: string
): boolean {
  // correctAnswer is stored as a JSON string in SQLite
  let correctAnswer: unknown;
  try {
    correctAnswer = JSON.parse(correctAnswerRaw);
  } catch {
    correctAnswer = correctAnswerRaw;
  }

  switch (type) {
    case "MCQ_SINGLE":
      return correctAnswer === userAnswer;
    case "MCQ_MULTIPLE":
      if (!Array.isArray(correctAnswer) || !Array.isArray(userAnswer)) return false;
      return (
        correctAnswer.length === userAnswer.length &&
        (correctAnswer as string[]).every((a) => (userAnswer as string[]).includes(a))
      );
    case "INTEGER":
      return Number(correctAnswer) === Number(userAnswer);
    case "NUMERICAL": {
      const range = correctAnswer as { min: number; max: number };
      const val = Number(userAnswer);
      return val >= range.min && val <= range.max;
    }
    default:
      return false;
  }
}
