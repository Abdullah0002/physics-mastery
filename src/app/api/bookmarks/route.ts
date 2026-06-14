import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import type { NextRequest } from "next/server";

const bodySchema = z.object({ questionId: z.string().cuid() });

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      question: {
        select: {
          id: true, content: true, type: true, difficulty: true,
          chapter: { select: { id: true, title: true, slug: true } },
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: bookmarks });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });

  const bookmark = await prisma.bookmark.upsert({
    where: { userId_questionId: { userId: session.user.id, questionId: parsed.data.questionId } },
    create: { userId: session.user.id, questionId: parsed.data.questionId },
    update: {},
  });

  return NextResponse.json({ success: true, data: bookmark });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });

  await prisma.bookmark.deleteMany({
    where: { userId: session.user.id, questionId: parsed.data.questionId },
  });

  return NextResponse.json({ success: true });
}
