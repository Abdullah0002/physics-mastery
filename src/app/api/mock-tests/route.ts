import { NextResponse } from "next/server";
import { getMockTests } from "@/services/test.service";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const result = await getMockTests({
    exam: searchParams.get("exam") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 12),
  });

  return NextResponse.json({ success: true, ...result });
}
