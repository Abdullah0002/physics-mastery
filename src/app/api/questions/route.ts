import { NextResponse } from "next/server";
import { getQuestions } from "@/services/question.service";
import { questionFilterSchema } from "@/lib/validations/question";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const parsed = questionFilterSchema.safeParse({
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    search: searchParams.get("search"),
    chapterId: searchParams.get("chapterId"),
    topicId: searchParams.get("topicId"),
    difficulty: searchParams.getAll("difficulty"),
    type: searchParams.getAll("type"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = await getQuestions(parsed.data);
  return NextResponse.json({ success: true, ...result });
}
