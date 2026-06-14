import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStudyHeatmap, getWeeklyStats } from "@/lib/analytics/tracking";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const [heatmap, weekly] = await Promise.all([
    getStudyHeatmap(session.user.id, 90),
    getWeeklyStats(session.user.id),
  ]);

  return NextResponse.json({ success: true, data: { heatmap, weekly } });
}
