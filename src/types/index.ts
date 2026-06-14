// =============================================================================
// AbdOfPhysics — Core Type Definitions
// Mirrors the Prisma schema with frontend-friendly additions
// =============================================================================

export type UserRole = "STUDENT" | "FACULTY" | "ADMIN";
export type Class = "XI" | "XII" | "DROPPER" | "OTHER";
export type ExamTarget = "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "ALL";
export type ExamType = "JEE_MAIN" | "JEE_ADVANCED" | "NEET" | "BITSAT" | "INTERNAL";
export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "ADVANCED";
export type QuestionType =
  | "MCQ_SINGLE"
  | "MCQ_MULTIPLE"
  | "INTEGER"
  | "NUMERICAL"
  | "SUBJECTIVE"
  | "MATCH_COLUMN"
  | "ASSERTION_REASON"
  | "COMPREHENSION";
export type TopicStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "REVISED";
export type TestStatus = "NOT_STARTED" | "IN_PROGRESS" | "PAUSED" | "SUBMITTED" | "EVALUATED";

// -----------------------------------------------------------------------------
// Auth types
// -----------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  class: Class | null;
  target: ExamTarget;
}

// -----------------------------------------------------------------------------
// Curriculum types
// -----------------------------------------------------------------------------

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  class: Class;
  coverImage: string | null;
  order: number;
  isPublished: boolean;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  overview: string | null;
  importance: string | null;
  courseId: string;
  order: number;
  isPublished: boolean;
  coverImage: string | null;
  difficulty: Difficulty;
  estimatedHours: number | null;
  weightageJeeMain: number | null;
  weightageJeeAdvanced: number | null;
  weightageNeet: number | null;
  avgQuestionsJeeMain: number | null;
  avgQuestionsJeeAdvanced: number | null;
  avgQuestionsNeet: number | null;
  topics?: Topic[];
  formulas?: Formula[];
  _count?: {
    questions: number;
    pyqs: number;
    topics: number;
  };
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  chapterId: string;
  order: number;
  isPublished: boolean;
  isDerivation: boolean;
  isConcept: boolean;
  isFormula: boolean;
  estimatedMinutes: number | null;
}

export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string | null;
  derivation: string | null;
  conditions: string | null;
  chapterId: string;
  topicId: string | null;
  tags: string[];
  isKeyFormula: boolean;
}

// -----------------------------------------------------------------------------
// Question types
// -----------------------------------------------------------------------------

export interface QuestionOption {
  id: string; // "A", "B", "C", "D"
  content: string;
  isImage?: boolean;
}

export interface Question {
  id: string;
  content: string;
  options: QuestionOption[] | null;
  correctAnswer: string | string[] | number | { min: number; max: number };
  solution: string;
  hint: string | null;
  explanation: string | null;
  type: QuestionType;
  difficulty: Difficulty;
  chapterId: string;
  topicId: string | null;
  tags: string[];
  marks: number;
  negativeMarks: number;
  timeToSolve: number | null;
  isVerified: boolean;
  isStarred: boolean;
  chapter?: Pick<Chapter, "id" | "title" | "slug">;
  topic?: Pick<Topic, "id" | "title">;
  pyqDetail?: PYQ | null;
}

export interface PYQ {
  id: string;
  questionId: string;
  exam: ExamType;
  year: number;
  session: string | null;
  shift: string | null;
  questionNumber: number | null;
  chapterId: string;
  marks: number;
  negativeMarks: number | null;
  officialAnswer: string | null;
  isMultiYear: boolean;
  repeatYears: number[];
  question?: Question;
}

// -----------------------------------------------------------------------------
// Test types
// -----------------------------------------------------------------------------

export interface MockTest {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  exam: ExamType;
  duration: number;
  totalMarks: number;
  totalQuestions: number;
  sections: TestSection[] | null;
  isPublished: boolean;
  isFree: boolean;
  scheduledAt: Date | null;
  totalAttempts: number;
  avgScore: number | null;
}

export interface TestSection {
  name: string;
  questions: number;
  marks: number;
  timeLimit: number | null;
}

export interface TestAttempt {
  id: string;
  userId: string;
  mockTestId: string;
  status: TestStatus;
  startedAt: Date | null;
  submittedAt: Date | null;
  durationSeconds: number | null;
  responses: Record<string, TestResponse>;
  totalScore: number | null;
  maxScore: number | null;
  percentageScore: number | null;
  percentile: number | null;
  rank: number | null;
  sectionScores: Record<string, SectionScore> | null;
  chapterAnalysis: Record<string, ChapterAnalysis> | null;
}

export interface TestResponse {
  answer: string | string[] | number | null;
  flagged: boolean;
  timeSpent: number; // seconds
}

export interface SectionScore {
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  maxScore: number;
}

export interface ChapterAnalysis {
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracy: number;
}

// -----------------------------------------------------------------------------
// Progress types
// -----------------------------------------------------------------------------

export interface UserProgress {
  id: string;
  userId: string;
  chapterId: string;
  topicId: string | null;
  status: TopicStatus;
  completionPercent: number;
  totalMinutesSpent: number;
  lastStudiedAt: Date | null;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number | null;
}

export interface ProgressSummary {
  totalChapters: number;
  completedChapters: number;
  inProgressChapters: number;
  totalTopics: number;
  completedTopics: number;
  totalQuestionsAttempted: number;
  overallAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyMinutes: number;
}

// -----------------------------------------------------------------------------
// Dashboard types
// -----------------------------------------------------------------------------

export interface DashboardStats {
  progress: ProgressSummary;
  recentActivity: RecentActivity[];
  weakTopics: WeakTopic[];
  strongTopics: StrongTopic[];
  upcomingRevisions: UpcomingRevision[];
  dailyGoal: DailyGoal;
}

export interface RecentActivity {
  type: "question_attempt" | "topic_completed" | "test_submitted" | "achievement";
  title: string;
  subtitle: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface WeakTopic {
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  accuracy: number;
  questionsAttempted: number;
}

export interface StrongTopic {
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  accuracy: number;
  questionsAttempted: number;
}

export interface UpcomingRevision {
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  dueDate: Date;
  daysSinceLastRevision: number;
}

export interface DailyGoal {
  targetMinutes: number;
  completedMinutes: number;
  percentComplete: number;
  questionsTarget: number;
  questionsCompleted: number;
}

// -----------------------------------------------------------------------------
// Faculty types
// -----------------------------------------------------------------------------

export interface FacultyProfile {
  id: string;
  userId: string;
  displayName: string;
  designation: string;
  institution: string | null;
  bio: string;
  qualifications: string[];
  experience: number;
  teachingSince: number;
  specializations: string[];
  profileImage: string | null;
  bannerImage: string | null;
  achievements: string[];
  socialLinks: Record<string, string>;
  totalStudents: number;
  avgRating: number | null;
  totalReviews: number;
  isVerified: boolean;
  reviews?: FacultyReview[];
}

export interface FacultyReview {
  id: string;
  reviewerName: string;
  reviewText: string;
  rating: number;
  examYear: number | null;
  createdAt: Date;
}

// -----------------------------------------------------------------------------
// Blog types
// -----------------------------------------------------------------------------

export type BlogCategory =
  | "JEE_STRATEGY"
  | "NEET_STRATEGY"
  | "PHYSICS_CONCEPTS"
  | "EXAM_ANALYSIS"
  | "TIME_MANAGEMENT"
  | "STUDY_TECHNIQUES"
  | "MOTIVATION"
  | "CAREER_GUIDANCE";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  authorId: string;
  category: BlogCategory;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  isFeatured: boolean;
  readTimeMinutes: number;
  viewCount: number;
  author?: Pick<AuthUser, "name" | "image">;
}

// -----------------------------------------------------------------------------
// Resource types
// -----------------------------------------------------------------------------

export type ResourceType =
  | "PDF_NOTES"
  | "DPP"
  | "ASSIGNMENT"
  | "FORMULA_SHEET"
  | "MIND_MAP"
  | "MOCK_PAPER"
  | "PYQ_COLLECTION"
  | "VIDEO_NOTES"
  | "REFERENCE_BOOK";

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  fileUrl: string;
  fileSize: number | null;
  pageCount: number | null;
  chapterId: string | null;
  exam: ExamType | null;
  class: Class | null;
  tags: string[];
  isPublished: boolean;
  isFree: boolean;
  downloadCount: number;
}

// -----------------------------------------------------------------------------
// AI types
// -----------------------------------------------------------------------------

export interface AiChat {
  id: string;
  userId: string;
  title: string;
  chapterId: string | null;
  questionId: string | null;
  createdAt: Date;
  messages?: AiMessage[];
}

export interface AiMessage {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  attachments?: AiAttachment[] | null;
  createdAt: Date;
}

export interface AiAttachment {
  type: "image" | "formula";
  url: string;
  alt?: string;
}

// -----------------------------------------------------------------------------
// Utility types
// -----------------------------------------------------------------------------

export type SortOrder = "asc" | "desc";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FilterParams {
  search?: string;
  difficulty?: Difficulty | Difficulty[];
  exam?: ExamType | ExamType[];
  chapterId?: string;
  topicId?: string;
  year?: number | number[];
  type?: QuestionType | QuestionType[];
  tags?: string[];
}
