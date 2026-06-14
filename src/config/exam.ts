// =============================================================================
// Exam configuration — JEE Main, JEE Advanced, NEET patterns
// =============================================================================

export interface ExamPattern {
  id: "JEE_MAIN" | "JEE_ADVANCED" | "NEET";
  name: string;
  fullName: string;
  duration: number; // minutes
  totalMarks: number;
  sections: ExamSection[];
  negativeMarking: boolean;
  conductedBy: string;
  frequency: string;
  description: string;
}

export interface ExamSection {
  name: string;
  subject: string;
  questionTypes: string[];
  totalQuestions: number;
  attemptedQuestions?: number; // if choice is given
  marksPerCorrect: number;
  marksPerWrong: number;
  maxMarks: number;
}

export const JEE_MAIN_PATTERN: ExamPattern = {
  id: "JEE_MAIN",
  name: "JEE Main",
  fullName: "Joint Entrance Examination (Main)",
  duration: 180,
  totalMarks: 300,
  conductedBy: "NTA",
  frequency: "Twice a year (January & April)",
  description: "National level entrance exam for NITs, IIITs and other CFTIs",
  negativeMarking: true,
  sections: [
    {
      name: "Physics",
      subject: "Physics",
      questionTypes: ["MCQ_SINGLE (20)", "INTEGER (10)"],
      totalQuestions: 30,
      attemptedQuestions: 25,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 100,
    },
    {
      name: "Chemistry",
      subject: "Chemistry",
      questionTypes: ["MCQ_SINGLE (20)", "INTEGER (10)"],
      totalQuestions: 30,
      attemptedQuestions: 25,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 100,
    },
    {
      name: "Mathematics",
      subject: "Mathematics",
      questionTypes: ["MCQ_SINGLE (20)", "INTEGER (10)"],
      totalQuestions: 30,
      attemptedQuestions: 25,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 100,
    },
  ],
};

export const JEE_ADVANCED_PATTERN: ExamPattern = {
  id: "JEE_ADVANCED",
  name: "JEE Advanced",
  fullName: "Joint Entrance Examination (Advanced)",
  duration: 180, // per paper; 2 papers
  totalMarks: 360, // ~180 per paper
  conductedBy: "IITs (rotating)",
  frequency: "Once a year (June)",
  description: "Most prestigious engineering entrance for IITs",
  negativeMarking: true,
  sections: [
    {
      name: "Physics — Paper 1",
      subject: "Physics",
      questionTypes: ["MCQ_SINGLE", "MCQ_MULTIPLE", "INTEGER", "MATCH_COLUMN", "COMPREHENSION"],
      totalQuestions: 18,
      marksPerCorrect: 4,
      marksPerWrong: -2,
      maxMarks: 60,
    },
    {
      name: "Physics — Paper 2",
      subject: "Physics",
      questionTypes: ["MCQ_SINGLE", "MCQ_MULTIPLE", "INTEGER", "MATCH_COLUMN"],
      totalQuestions: 18,
      marksPerCorrect: 4,
      marksPerWrong: -2,
      maxMarks: 60,
    },
  ],
};

export const NEET_PATTERN: ExamPattern = {
  id: "NEET",
  name: "NEET",
  fullName: "National Eligibility cum Entrance Test",
  duration: 200,
  totalMarks: 720,
  conductedBy: "NTA",
  frequency: "Once a year (May)",
  description: "National level entrance for MBBS, BDS and other medical courses",
  negativeMarking: true,
  sections: [
    {
      name: "Physics",
      subject: "Physics",
      questionTypes: ["MCQ_SINGLE"],
      totalQuestions: 50,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 180,
    },
    {
      name: "Chemistry",
      subject: "Chemistry",
      questionTypes: ["MCQ_SINGLE"],
      totalQuestions: 50,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 180,
    },
    {
      name: "Biology (Botany + Zoology)",
      subject: "Biology",
      questionTypes: ["MCQ_SINGLE"],
      totalQuestions: 100,
      marksPerCorrect: 4,
      marksPerWrong: -1,
      maxMarks: 360,
    },
  ],
};

export const EXAM_PATTERNS: Record<string, ExamPattern> = {
  JEE_MAIN: JEE_MAIN_PATTERN,
  JEE_ADVANCED: JEE_ADVANCED_PATTERN,
  NEET: NEET_PATTERN,
};

// PYQ year ranges
export const PYQ_YEARS: Record<string, number[]> = {
  JEE_MAIN: Array.from({ length: 12 }, (_, i) => 2024 - i),    // 2013–2024
  JEE_ADVANCED: Array.from({ length: 20 }, (_, i) => 2024 - i), // 2005–2024
  NEET: Array.from({ length: 12 }, (_, i) => 2024 - i),         // 2013–2024
};
