import { prisma } from "@/lib/prisma";
import { updateStudyStreak } from "@/services/progress.service";

export async function recordStudySession(
  userId: string,
  data: {
    minutes: number;
    chapterId?: string;
    topicId?: string;
    questionsAttempted?: number;
    questionsCorrect?: number;
  }
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await Promise.all([
    // Upsert daily analytics
    prisma.dailyAnalytics.upsert({
      where: { userId_date: { userId, date: today } },
      create: {
        userId,
        date: today,
        totalMinutesStudied: data.minutes,
        questionsAttempted: data.questionsAttempted ?? 0,
        questionsCorrect: data.questionsCorrect ?? 0,
      },
      update: {
        totalMinutesStudied: { increment: data.minutes },
        questionsAttempted: { increment: data.questionsAttempted ?? 0 },
        questionsCorrect: { increment: data.questionsCorrect ?? 0 },
      },
    }),

    // Update chapter progress time
    data.chapterId &&
      prisma.userProgress.upsert({
        where: {
          userId_chapterId_topicId: {
            userId,
            chapterId: data.chapterId,
            topicId: data.topicId ?? "",
          },
        },
        create: {
          userId,
          chapterId: data.chapterId,
          topicId: data.topicId,
          totalMinutesSpent: data.minutes,
          lastStudiedAt: new Date(),
          status: "IN_PROGRESS",
        },
        update: {
          totalMinutesSpent: { increment: data.minutes },
          lastStudiedAt: new Date(),
        },
      }),

    // Update streak
    updateStudyStreak(userId),
  ]);
}

export async function getStudyHeatmap(userId: string, days = 90) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const records = await prisma.dailyAnalytics.findMany({
    where: {
      userId,
      date: { gte: since },
    },
    select: {
      date: true,
      totalMinutesStudied: true,
      questionsAttempted: true,
    },
    orderBy: { date: "asc" },
  });

  return records.map((r) => ({
    date: r.date.toISOString().split("T")[0],
    minutes: r.totalMinutesStudied,
    questions: r.questionsAttempted,
    level: r.totalMinutesStudied === 0 ? 0
      : r.totalMinutesStudied < 30 ? 1
      : r.totalMinutesStudied < 60 ? 2
      : r.totalMinutesStudied < 120 ? 3
      : 4,
  }));
}

export async function getWeeklyStats(userId: string) {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const records = await prisma.dailyAnalytics.findMany({
    where: { userId, date: { gte: since } },
    orderBy: { date: "asc" },
  });

  const totalMinutes = records.reduce((sum, r) => sum + r.totalMinutesStudied, 0);
  const totalQuestions = records.reduce((sum, r) => sum + r.questionsAttempted, 0);
  const totalCorrect = records.reduce((sum, r) => sum + r.questionsCorrect, 0);

  return {
    totalMinutes,
    totalQuestions,
    accuracy: totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0,
    dailyData: records,
  };
}
