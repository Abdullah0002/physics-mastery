import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { registerSchema } from "@/lib/validations/auth";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, password, class: cls, target } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { success: false, error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      class: cls,
      target,
      role: "STUDENT",
    },
    select: { id: true, name: true, email: true },
  });

  // Initialise study plan
  await prisma.studyPlan.create({
    data: { userId: user.id, targetExam: target },
  });

  return NextResponse.json({ success: true, data: { id: user.id, email: user.email } });
}
