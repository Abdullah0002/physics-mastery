import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserProgressSummary, getWeakTopics } from "@/services/progress.service";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const [summary, weakTopics] = await Promise.all([
    getUserProgressSummary(session.user.id),
    getWeakTopics(session.user.id),
  ]);

  return NextResponse.json({ success: true, data: { summary, weakTopics } });
}
