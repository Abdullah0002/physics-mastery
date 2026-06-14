import { prisma } from "@/lib/prisma";

export async function createAiChat(userId: string, options?: {
  chapterId?: string;
  questionId?: string;
  title?: string;
}) {
  return prisma.aiChat.create({
    data: {
      userId,
      title: options?.title ?? "New Conversation",
      chapterId: options?.chapterId,
      questionId: options?.questionId,
    },
  });
}

export async function getUserChats(userId: string) {
  return prisma.aiChat.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { messages: true } },
    },
  });
}

export async function getChatMessages(chatId: string, userId: string) {
  const chat = await prisma.aiChat.findUnique({
    where: { id: chatId, userId },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
  return chat;
}

export async function saveAiMessage(data: {
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  inputTokens?: number;
  outputTokens?: number;
}) {
  const [message] = await Promise.all([
    prisma.aiMessage.create({ data }),
    // Update chat's updatedAt
    prisma.aiChat.update({
      where: { id: data.chatId },
      data: { updatedAt: new Date() },
    }),
  ]);
  return message;
}

// Builds the system prompt for the AI tutor
export function buildPhysicsSystemPrompt(context?: {
  chapterTitle?: string;
  questionContent?: string;
}) {
  const base = `You are an expert Physics tutor for JEE Main, JEE Advanced, and NEET preparation. You specialize in:
- Making Physics concepts crystal clear with intuition
- Breaking down complex problems step-by-step
- Using LaTeX for all mathematical expressions (wrap in $ for inline, $$ for display)
- Identifying common mistakes students make
- Relating concepts to real-world examples
- Providing JEE/NEET specific tips and tricks

Guidelines:
- Always use LaTeX for formulas and equations
- Start with the core concept/principle being applied
- Show step-by-step solution with reasoning at each step
- Highlight the key insight or trick
- Mention if this is a commonly asked JEE/NEET pattern
- Keep explanations concise but complete
- If asked about a derivation, show it with physical reasoning`;

  if (context?.chapterTitle) {
    return `${base}\n\nCurrent chapter: ${context.chapterTitle}`;
  }

  if (context?.questionContent) {
    return `${base}\n\nQuestion context:\n${context.questionContent}`;
  }

  return base;
}
