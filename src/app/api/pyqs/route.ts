import { NextResponse } from "next/server";
import { getPYQs } from "@/services/question.service";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const result = await getPYQs({
    exam: searchParams.get("exam") ?? undefined,
    year: searchParams.get("year") ? Number(searchParams.get("year")) : undefined,
    chapterId: searchParams.get("chapterId") ?? undefined,
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 20),
  });

  return NextResponse.json({ success: true, ...result });
}
