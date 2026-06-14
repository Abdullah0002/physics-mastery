import { prisma } from "@/lib/prisma";
import type { Chapter } from "@/types";

export async function getAllChapters(options?: {
  class?: "XI" | "XII";
  published?: boolean;
}): Promise<Chapter[]> {
  const chapters = await prisma.chapter.findMany({
    where: {
      isPublished: options?.published ?? true,
      course: options?.class ? { class: options.class } : undefined,
    },
    include: {
      _count: { select: { questions: true, pyqs: true, topics: true } },
    },
    orderBy: [{ course: { order: "asc" } }, { order: "asc" }],
  });

  return chapters as unknown as Chapter[];
}

export async function getChapterBySlug(
  slug: string,
  userId?: string
): Promise<(Chapter & { userProgress?: unknown }) | null> {
  const chapter = await prisma.chapter.findUnique({
    where: { slug, isPublished: true },
    include: {
      topics: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
      formulas: {
        orderBy: [{ isKeyFormula: "desc" }, { name: "asc" }],
      },
      _count: {
        select: { questions: true, pyqs: true, topics: true },
      },
    },
  });

  if (!chapter) return null;

  if (userId) {
    const progress = await prisma.userProgress.findFirst({
      where: { userId, chapterId: chapter.id, topicId: null },
    });
    return { ...(chapter as unknown as Chapter), userProgress: progress };
  }

  return chapter as unknown as Chapter;
}

export async function getChapterStats(chapterId: string) {
  const [questionCount, pyqCount, topicCount] = await Promise.all([
    prisma.question.count({ where: { chapterId, isActive: true } }),
    prisma.pYQ.count({ where: { chapterId } }),
    prisma.topic.count({ where: { chapterId, isPublished: true } }),
  ]);

  const difficultyBreakdown = await prisma.question.groupBy({
    by: ["difficulty"],
    where: { chapterId, isActive: true },
    _count: true,
  });

  return {
    questionCount,
    pyqCount,
    topicCount,
    difficultyBreakdown: Object.fromEntries(
      difficultyBreakdown.map((d) => [d.difficulty, d._count])
    ),
  };
}
