import { prisma } from "@/lib/prisma";
import type { ProgressSummary } from "@/types";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "@/config/curriculum";

export async function getUserProgressSummary(userId: string): Promise<ProgressSummary> {
  const totalChapters = CLASS_11_CHAPTERS.length + CLASS_12_CHAPTERS.length;

  const [chapterProgress, studyPlan, allAttempts] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId, topicId: null },
    }),
    prisma.studyPlan.findUnique({ where: { userId } }),
    prisma.questionAttempt.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { isCorrect: true } as never,
    }),
  ]);

  const completedChapters = chapterProgress.filter(
    (p) => p.status === "COMPLETED" || p.status === "REVISED"
  ).length;

  const inProgressChapters = chapterProgress.filter(
    (p) => p.status === "IN_PROGRESS"
  ).length;

  const totalMinutes = chapterProgress.reduce(
    (sum, p) => sum + p.totalMinutesSpent,
    0
  );

  const totalAttempted = (allAttempts._count as { id: number }).id;
  const totalCorrect = ((allAttempts as { _sum: { isCorrect: number | null } })._sum.isCorrect) ?? 0;

  return {
    totalChapters,
    completedChapters,
    inProgressChapters,
    totalTopics: 0, // computed separately
    completedTopics: chapterProgress.filter((p) => p.status === "COMPLETED").length,
    totalQuestionsAttempted: totalAttempted,
    overallAccuracy: totalAttempted > 0
      ? parseFloat(((totalCorrect / totalAttempted) * 100).toFixed(1))
      : 0,
    currentStreak: studyPlan?.currentStreak ?? 0,
    longestStreak: studyPlan?.longestStreak ?? 0,
    totalStudyMinutes: totalMinutes,
  };
}

export async function getWeakTopics(userId: string, limit = 5) {
  const topicProgress = await prisma.userProgress.findMany({
    where: {
      userId,
      topicId: { not: null },
      questionsAttempted: { gte: 5 }, // at least 5 attempts to be meaningful
    },
    include: {
      topic: { select: { id: true, title: true } },
      chapter: { select: { id: true, title: true } },
    },
    orderBy: { accuracy: "asc" },
    take: limit,
  });

  return topicProgress.map((p) => ({
    topicId: p.topicId!,
    topicTitle: p.topic?.title ?? "Unknown",
    chapterTitle: p.chapter.title,
    accuracy: p.accuracy ?? 0,
    questionsAttempted: p.questionsAttempted,
  }));
}

export async function updateStudyStreak(userId: string): Promise<void> {
  const plan = await prisma.studyPlan.findUnique({ where: { userId } });
  if (!plan) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastStreakDate = plan.lastStreakDate;

  if (!lastStreakDate) {
    // First day
    await prisma.studyPlan.update({
      where: { userId },
      data: { currentStreak: 1, longestStreak: 1, lastStreakDate: today },
    });
    return;
  }

  const lastDate = new Date(lastStreakDate);
  lastDate.setHours(0, 0, 0, 0);

  if (lastDate.getTime() === today.getTime()) return; // already counted today

  const newStreak =
    lastDate.getTime() === yesterday.getTime()
      ? plan.currentStreak + 1
      : 1; // streak broken

  await prisma.studyPlan.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak: Math.max(plan.longestStreak, newStreak),
      lastStreakDate: today,
    },
  });
}
