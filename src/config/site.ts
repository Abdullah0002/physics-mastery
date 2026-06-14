// =============================================================================
// Site-wide configuration constants
// =============================================================================

export const siteConfig = {
  name: "AbdOfPhysics",
  tagline: "From First Principles to JEE Advanced Excellence",
  description:
    "Master Physics for JEE Main, JEE Advanced & NEET with expert-crafted notes, 10,000+ questions, full PYQ database, and AI-powered doubt solving.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://abdofphysics.in",
  ogImage: "/og/default.jpg",

  author: {
    name: "Abdullah",
    role: "Senior Physics Faculty",
    designation: "IIT-JEE & NEET Physics Expert",
  },

  contact: {
    email: "abd161199@gmail.com",
    supportEmail: "support@abdofphysics.in",
  },

  social: {
    youtube: "",
    instagram: "",
    telegram: "",
    twitter: "",
  },

  stats: {
    students: "12,000+",
    questions: "10,000+",
    pyqs: "5,000+",
    mockTests: "200+",
    chapters: "35+",
    successStories: "1,500+",
  },

  seo: {
    keywords: [
      "JEE Main Physics",
      "JEE Advanced Physics",
      "NEET Physics",
      "Physics Notes",
      "Physics PYQ",
      "Physics Mock Test",
      "Physics Formula",
      "Kinematics JEE",
      "Electrostatics JEE",
      "Physics Practice Questions",
      "Online Physics Tutor India",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
