import { prisma } from "@/lib/prisma";
import type { Question, PaginatedResponse, FilterParams } from "@/types";
import type { Prisma } from "@prisma/client";

export async function getQuestions(
  filters: FilterParams & { page?: number; limit?: number }
): Promise<PaginatedResponse<Question>> {
  const { page = 1, limit = 20, search, chapterId, topicId, difficulty, type } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.QuestionWhereInput = {
    isActive: true,
    ...(search && {
      content: { contains: search },
    }),
    ...(chapterId && { chapterId }),
    ...(topicId && { topicId }),
    ...(difficulty && {
      difficulty: Array.isArray(difficulty)
        ? { in: difficulty }
        : difficulty,
    }),
    ...(type && {
      type: Array.isArray(type) ? { in: type } : type,
    }),
  };

  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip,
      take: limit,
      include: {
        chapter: { select: { id: true, title: true, slug: true } },
        topic: { select: { id: true, title: true } },
        pyqDetail: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.question.count({ where }),
  ]);

  return {
    data: questions as unknown as Question[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total,
  };
}

export async function getPYQs(filters: {
  exam?: string;
  year?: number;
  chapterId?: string;
  page?: number;
  limit?: number;
}) {
  const { exam, year, chapterId, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.PYQWhereInput = {
    ...(exam && { exam: exam as never }),
    ...(year && { year }),
    ...(chapterId && { chapterId }),
  };

  const [pyqs, total] = await Promise.all([
    prisma.pYQ.findMany({
      where,
      skip,
      take: limit,
      include: {
        question: {
          include: {
            chapter: { select: { id: true, title: true, slug: true } },
            topic: { select: { id: true, title: true } },
          },
        },
      },
      orderBy: [{ year: "desc" }, { questionNumber: "asc" }],
    }),
    prisma.pYQ.count({ where }),
  ]);

  return {
    data: pyqs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total,
  };
}

export async function recordQuestionAttempt(data: {
  userId: string;
  questionId: string;
  answer: unknown;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  hintsUsed?: number;
}) {
  const [attempt] = await Promise.all([
    prisma.questionAttempt.create({
      data: {
        userId: data.userId,
        questionId: data.questionId,
        answer: JSON.stringify(data.answer),
        isCorrect: data.isCorrect,
        timeSpentSeconds: data.timeSpentSeconds,
        hintsUsed: data.hintsUsed ?? 0,
      },
    }),
    // Update question analytics
    prisma.question.update({
      where: { id: data.questionId },
      data: {
        totalAttempts: { increment: 1 },
        ...(data.isCorrect && { correctAttempts: { increment: 1 } }),
      },
    }),
    // Update user progress for this chapter
    updateChapterProgress(data.userId, data.questionId, data.isCorrect),
  ]);

  return attempt;
}

async function updateChapterProgress(
  userId: string,
  questionId: string,
  isCorrect: boolean
) {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { chapterId: true, topicId: true },
  });
  if (!question) return;

  await prisma.userProgress.upsert({
    where: {
      userId_chapterId_topicId: {
        userId,
        chapterId: question.chapterId,
        topicId: question.topicId ?? "",
      },
    },
    create: {
      userId,
      chapterId: question.chapterId,
      topicId: question.topicId,
      questionsAttempted: 1,
      questionsCorrect: isCorrect ? 1 : 0,
      status: "IN_PROGRESS",
      lastStudiedAt: new Date(),
    },
    update: {
      questionsAttempted: { increment: 1 },
      ...(isCorrect && { questionsCorrect: { increment: 1 } }),
      lastStudiedAt: new Date(),
      status: "IN_PROGRESS",
    },
  });
}
