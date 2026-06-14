// =============================================================================
// Navigation configuration — main nav, sidebar, footer
// =============================================================================

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
  isExternal?: boolean;
  requiresAuth?: boolean;
  roles?: ("STUDENT" | "FACULTY" | "ADMIN")[];
}

export const mainNav: NavItem[] = [
  {
    title: "Chapters",
    href: "/chapters",
    description: "All Physics chapters with notes, derivations, and practice",
    children: [
      { title: "Class 11 Physics", href: "/chapters?class=XI" },
      { title: "Class 12 Physics", href: "/chapters?class=XII" },
      { title: "High Weightage Topics", href: "/chapters?filter=high-weightage" },
      { title: "Formula Hub", href: "/formula-hub" },
      { title: "Revision Center", href: "/revision", badge: "New" },
    ],
  },
  {
    title: "Practice",
    href: "/practice",
    description: "Topic-wise questions with hints and detailed solutions",
    children: [
      { title: "Topic-wise Practice", href: "/practice" },
      { title: "Previous Year Questions", href: "/pyqs" },
      { title: "Mixed Practice", href: "/practice/mixed" },
      { title: "Weak Areas", href: "/practice/weak-areas", requiresAuth: true },
    ],
  },
  {
    title: "Mock Tests",
    href: "/mock-tests",
    description: "Full-length JEE Main, JEE Advanced & NEET mock tests",
    children: [
      { title: "JEE Main Tests", href: "/mock-tests?exam=JEE_MAIN" },
      { title: "JEE Advanced Tests", href: "/mock-tests?exam=JEE_ADVANCED" },
      { title: "NEET Tests", href: "/mock-tests?exam=NEET" },
      { title: "Chapter Tests", href: "/mock-tests?type=chapter" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    description: "PDFs, DPPs, formula sheets, and mind maps",
    children: [
      { title: "PDF Notes", href: "/resources?type=PDF_NOTES" },
      { title: "Daily Practice Problems", href: "/resources?type=DPP" },
      { title: "Formula Sheets", href: "/resources?type=FORMULA_SHEET" },
      { title: "Mind Maps", href: "/resources?type=MIND_MAP" },
    ],
  },
  {
    title: "AI Tutor",
    href: "/ai-tutor",
    description: "Ask any Physics doubt — powered by AI",
    badge: "New",
    requiresAuth: true,
  },
  {
    title: "Faculty",
    href: "/faculty",
    description: "Meet Abdullah — your Physics mentor",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "JEE/NEET strategy, exam analysis, and study tips",
  },
];

export const dashboardNav: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "My Progress",
    href: "/dashboard/progress",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    title: "Bookmarks",
    href: "/dashboard/bookmarks",
  },
  {
    title: "My Notes",
    href: "/dashboard/notes",
  },
  {
    title: "Study Planner",
    href: "/study-planner",
  },
  {
    title: "AI Chats",
    href: "/ai-tutor",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
];

export const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Users", href: "/admin/users" },
  { title: "Content", href: "/admin/content" },
  { title: "Questions", href: "/admin/questions" },
  { title: "Analytics", href: "/admin/analytics" },
];

export const footerNav = {
  learn: [
    { title: "Class 11 Physics", href: "/chapters?class=XI" },
    { title: "Class 12 Physics", href: "/chapters?class=XII" },
    { title: "Formula Hub", href: "/formula-hub" },
    { title: "Revision Center", href: "/revision" },
  ],
  practice: [
    { title: "Topic Questions", href: "/practice" },
    { title: "Previous Year Questions", href: "/pyqs" },
    { title: "JEE Main Tests", href: "/mock-tests?exam=JEE_MAIN" },
    { title: "JEE Advanced Tests", href: "/mock-tests?exam=JEE_ADVANCED" },
    { title: "NEET Tests", href: "/mock-tests?exam=NEET" },
  ],
  resources: [
    { title: "PDF Notes", href: "/resources?type=PDF_NOTES" },
    { title: "DPPs", href: "/resources?type=DPP" },
    { title: "Formula Sheets", href: "/resources?type=FORMULA_SHEET" },
    { title: "Mind Maps", href: "/resources?type=MIND_MAP" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Faculty", href: "/faculty" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};
