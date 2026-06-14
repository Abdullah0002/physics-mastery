import { NextResponse } from "next/server";
import { getAllChapters } from "@/services/chapter.service";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const classFilter = searchParams.get("class") as "XI" | "XII" | null;

  const chapters = await getAllChapters({
    class: classFilter ?? undefined,
    published: true,
  });

  return NextResponse.json({ success: true, data: chapters });
}
