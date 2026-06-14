import { z } from "zod";

export const questionFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
  search: z.string().optional(),
  chapterId: z.string().optional(),
  topicId: z.string().optional(),
  difficulty: z
    .union([
      z.enum(["EASY", "MEDIUM", "HARD", "ADVANCED"]),
      z.array(z.enum(["EASY", "MEDIUM", "HARD", "ADVANCED"])),
    ])
    .optional(),
  type: z
    .union([
      z.enum([
        "MCQ_SINGLE", "MCQ_MULTIPLE", "INTEGER", "NUMERICAL",
        "SUBJECTIVE", "MATCH_COLUMN", "ASSERTION_REASON", "COMPREHENSION",
      ]),
      z.array(z.enum([
        "MCQ_SINGLE", "MCQ_MULTIPLE", "INTEGER", "NUMERICAL",
        "SUBJECTIVE", "MATCH_COLUMN", "ASSERTION_REASON", "COMPREHENSION",
      ])),
    ])
    .optional(),
  exam: z
    .union([
      z.enum(["JEE_MAIN", "JEE_ADVANCED", "NEET", "BITSAT", "INTERNAL"]),
      z.array(z.enum(["JEE_MAIN", "JEE_ADVANCED", "NEET", "BITSAT", "INTERNAL"])),
    ])
    .optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["createdAt", "difficulty", "accuracy"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type QuestionFilterInput = z.infer<typeof questionFilterSchema>;

export const createQuestionSchema = z.object({
  content: z.string().min(10, "Question content is too short"),
  type: z.enum([
    "MCQ_SINGLE", "MCQ_MULTIPLE", "INTEGER", "NUMERICAL",
    "SUBJECTIVE", "MATCH_COLUMN", "ASSERTION_REASON", "COMPREHENSION",
  ]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "ADVANCED"]),
  chapterId: z.string().cuid(),
  topicId: z.string().cuid().optional(),
  options: z
    .array(
      z.object({
        id: z.enum(["A", "B", "C", "D", "E"]),
        content: z.string().min(1),
        isImage: z.boolean().default(false),
      })
    )
    .optional(),
  correctAnswer: z.union([
    z.string(),
    z.array(z.string()),
    z.number(),
    z.object({ min: z.number(), max: z.number() }),
  ]),
  solution: z.string().min(10, "Solution is too short"),
  hint: z.string().optional(),
  explanation: z.string().optional(),
  marks: z.number().min(0).default(4),
  negativeMarks: z.number().min(0).default(1),
  timeToSolve: z.number().min(0).optional(),
  tags: z.array(z.string()).default([]),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
