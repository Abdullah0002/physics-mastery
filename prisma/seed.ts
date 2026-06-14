// =============================================================================
// Database Seed — Physics Mastery
// Run: npm run db:seed
// =============================================================================

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { CLASS_11_CHAPTERS, CLASS_12_CHAPTERS } from "../src/config/curriculum";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---- Admin & Faculty User --------------------------------------------------
  const adminPassword = await hash("Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "abd161199@gmail.com" },
    update: {},
    create: {
      name: "Abdullah",
      email: "abd161199@gmail.com",
      password: adminPassword,
      role: "FACULTY",
      emailVerified: new Date(),
      isActive: true,
    },
  });
  console.log("Created admin/faculty user:", admin.email);

  // Faculty profile
  await prisma.facultyProfile.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      displayName: "Abdullah",
      designation: "Senior Physics Faculty",
      bio: "Passionate Physics educator with expertise in JEE Advanced and NEET preparation. Dedicated to making Physics intuitive and approachable for every student.",
      qualifications: JSON.stringify([
        "B.Tech (Physics)",
        "Specialized in IIT-JEE & NEET Physics",
      ]),
      experience: 8,
      teachingSince: 2016,
      specializations: JSON.stringify([
        "JEE Advanced",
        "JEE Main",
        "NEET",
        "Electrodynamics",
        "Mechanics",
        "Modern Physics",
      ]),
      achievements: JSON.stringify([
        "500+ students cleared JEE Advanced",
        "1000+ students cleared NEET",
        "Top rated Physics faculty",
      ]),
      isVerified: true,
    },
  });

  // ---- Courses ---------------------------------------------------------------
  const class11Course = await prisma.course.upsert({
    where: { slug: "physics-class-11" },
    update: {},
    create: {
      title: "Physics Class 11",
      slug: "physics-class-11",
      description: "Complete Class 11 Physics for JEE Main, JEE Advanced & NEET",
      class: "XI",
      order: 1,
      isPublished: true,
    },
  });

  const class12Course = await prisma.course.upsert({
    where: { slug: "physics-class-12" },
    update: {},
    create: {
      title: "Physics Class 12",
      slug: "physics-class-12",
      description: "Complete Class 12 Physics for JEE Main, JEE Advanced & NEET",
      class: "XII",
      order: 2,
      isPublished: true,
    },
  });

  // ---- Chapters --------------------------------------------------------------
  console.log("Seeding Class 11 chapters...");
  for (const chapterMeta of CLASS_11_CHAPTERS) {
    await prisma.chapter.upsert({
      where: { slug: chapterMeta.slug },
      update: {
        weightageJeeMain: chapterMeta.weightage.jeeMain,
        weightageJeeAdvanced: chapterMeta.weightage.jeeAdvanced,
        weightageNeet: chapterMeta.weightage.neet,
      },
      create: {
        title: chapterMeta.title,
        slug: chapterMeta.slug,
        courseId: class11Course.id,
        order: chapterMeta.order,
        difficulty: chapterMeta.difficulty,
        estimatedHours: chapterMeta.estimatedHours,
        weightageJeeMain: chapterMeta.weightage.jeeMain,
        weightageJeeAdvanced: chapterMeta.weightage.jeeAdvanced,
        weightageNeet: chapterMeta.weightage.neet,
        isPublished: true,
      },
    });
  }

  console.log("Seeding Class 12 chapters...");
  for (const chapterMeta of CLASS_12_CHAPTERS) {
    await prisma.chapter.upsert({
      where: { slug: chapterMeta.slug },
      update: {
        weightageJeeMain: chapterMeta.weightage.jeeMain,
        weightageJeeAdvanced: chapterMeta.weightage.jeeAdvanced,
        weightageNeet: chapterMeta.weightage.neet,
      },
      create: {
        title: chapterMeta.title,
        slug: chapterMeta.slug,
        courseId: class12Course.id,
        order: chapterMeta.order,
        difficulty: chapterMeta.difficulty,
        estimatedHours: chapterMeta.estimatedHours,
        weightageJeeMain: chapterMeta.weightage.jeeMain,
        weightageJeeAdvanced: chapterMeta.weightage.jeeAdvanced,
        weightageNeet: chapterMeta.weightage.neet,
        isPublished: true,
      },
    });
  }

  // ---- Achievements ----------------------------------------------------------
  const achievements = [
    { type: "STREAK_MILESTONE" as const, name: "7-Day Streak", description: "Study for 7 consecutive days", points: 50 },
    { type: "QUESTIONS_MILESTONE" as const, name: "Centurion", description: "Attempt 100 questions", points: 30 },
    { type: "CHAPTER_COMPLETE" as const, name: "Chapter Master", description: "Complete your first chapter", points: 100 },
    { type: "PERFECT_SCORE" as const, name: "Perfect Score", description: "Get 100% in a mock test", points: 200 },
    { type: "FIRST_TEST" as const, name: "Test Pioneer", description: "Attempt your first mock test", points: 20 },
    { type: "ACCURACY_MASTER" as const, name: "Sharp Shooter", description: "Maintain 90%+ accuracy over 50 questions", points: 150 },
    { type: "SPEED_DEMON" as const, name: "Speed Demon", description: "Solve 10 questions under 30s each", points: 75 },
    { type: "EARLY_BIRD" as const, name: "Early Bird", description: "Study before 7 AM", points: 15 },
    { type: "NIGHT_OWL" as const, name: "Night Owl", description: "Study after 11 PM", points: 15 },
    { type: "TEST_TOPPER" as const, name: "Top 10", description: "Rank in top 10 in a mock test", points: 100 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { type: ach.type },
      update: {},
      create: ach,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
