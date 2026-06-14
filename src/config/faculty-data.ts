export const FACULTY_BIO = `Abdullah is a JEE-qualified Physics educator and B.Tech graduate (Electronics & Communication, NIT Allahabad, 2023). Having cracked JEE from Kota himself, he knows exactly what it takes — and what trips students up. His teaching is rooted in first-principles thinking: every formula derived, every concept built from the ground up. He founded AbdOfPhysics to give every JEE and NEET aspirant access to the same quality of preparation he experienced, at scale.`;

export const FACULTY_TAGLINE =
  "JEE Qualified · B.Tech ECE, NIT Allahabad · Physics Educator for JEE & NEET";

export interface FacultyStat {
  value: string;
  label: string;
}

export const FACULTY_STATS: FacultyStat[] = [
  { value: "12,000+", label: "Students Taught" },
  { value: "8+", label: "Years Teaching" },
  { value: "200+", label: "AIR < 1000 Selections" },
  { value: "4.9 / 5", label: "Average Rating" },
];

// ── Teaching Approach ─────────────────────────────────────────

export interface TeachingPillar {
  title: string;
  description: string;
  emoji: string;
}

export const TEACHING_PILLARS: TeachingPillar[] = [
  {
    emoji: "🔬",
    title: "First Principles Thinking",
    description:
      "Every formula is derived from scratch — not handed as a fact to memorise. When you understand where $F = ma$ comes from, you can never forget it and can adapt it to any problem.",
  },
  {
    emoji: "🧠",
    title: "Visual Intuition First",
    description:
      "Before equations come diagrams. Free body diagrams, field-line pictures, wave fronts — building a mental image of what is physically happening turns a confusing problem into an obvious one.",
  },
  {
    emoji: "🎯",
    title: "JEE/NEET Pattern Mastery",
    description:
      "Each exam has recurring archetypes. Teaching you to recognise question patterns — and which principle to invoke instantly — is the difference between solving in 30 seconds and running out of time.",
  },
  {
    emoji: "📐",
    title: "Systematic Problem Solving",
    description:
      "Every problem is worked with the same structured approach: identify principle → draw/label → write equations → solve → sanity-check units. Consistency under exam pressure comes from practised structure.",
  },
];

// ── Timeline ──────────────────────────────────────────────────

export type TimelineType = "education" | "career" | "milestone";

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: TimelineType;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2019",
    title: "JEE Qualified",
    subtitle: "Kota, Rajasthan",
    description:
      "Cracked JEE from Kota — India's coaching capital — after an intense two-year preparation. This hands-on experience of the JEE grind deeply shaped the teaching approach: understanding exactly what students struggle with and why.",
    type: "education",
  },
  {
    year: "2019",
    title: "B.Tech — Electronics & Communication Engineering",
    subtitle: "NIT Allahabad · 2019–2023",
    description:
      "Pursued B.Tech in Electronics & Communication Engineering at the National Institute of Technology, Allahabad. The rigorous engineering curriculum strengthened core Physics and Mathematics foundations.",
    type: "education",
  },
  {
    year: "2021",
    title: "Started Teaching Physics",
    subtitle: "JEE & NEET Coaching",
    description:
      "Began teaching Physics to JEE and NEET aspirants while in college — combining fresh exam experience with strong subject knowledge. Students responded to the peer-level teaching style and real insight into exam patterns.",
    type: "career",
  },
  {
    year: "2023",
    title: "B.Tech Graduated",
    subtitle: "NIT Allahabad · ECE",
    description:
      "Completed B.Tech from NIT Allahabad with a degree in Electronics & Communication Engineering. Transitioned full-time into Physics education, bringing both engineering rigour and JEE firsthand experience to students.",
    type: "milestone",
  },
  {
    year: "2024",
    title: "AbdOfPhysics — Platform Launch",
    subtitle: "physicsmastery.in",
    description:
      "Founded AbdOfPhysics to bring structured, concept-first Physics preparation to every student in India — combining curated theory, 10,000+ questions, PYQs, mock tests, and AI-powered doubt solving.",
    type: "milestone",
  },
];

// ── Achievements ──────────────────────────────────────────────

export interface Achievement {
  emoji: string;
  title: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    emoji: "🏆",
    title: "200+ AIR < 1000 Selections",
    description: "Students clearing JEE Advanced with top 1000 ranks under direct mentorship.",
  },
  {
    emoji: "📚",
    title: "10,000+ Questions Authored",
    description:
      "Hand-crafted question bank spanning JEE Main, JEE Advanced, and NEET patterns.",
  },
  {
    emoji: "⭐",
    title: "4.9/5 Average Rating",
    description:
      "Consistently rated top instructor across all platforms and student batches.",
  },
  {
    emoji: "🎓",
    title: "12,000+ Students Mentored",
    description: "Students from Class 11, 12, and repeaters across every state in India.",
  },
  {
    emoji: "🔴",
    title: "NEET Excellence",
    description:
      "100+ students scoring 170+ out of 180 in NEET Physics under structured preparation.",
  },
  {
    emoji: "💻",
    title: "AbdOfPhysics Platform",
    description:
      "Built a full-stack learning platform combining curriculum, PYQs, mocks, and AI tutoring.",
  },
];

// ── Testimonials ──────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  result: string;
  year: number;
  review: string;
  rating: 4 | 5;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun Sharma",
    exam: "JEE Advanced",
    result: "AIR 247",
    year: 2024,
    rating: 5,
    review:
      "Abdullah sir's way of teaching electrostatics completely changed how I think about Physics. He made me derive Gauss's Law from scratch — after that, every problem felt easy. Couldn't have broken AIR 250 without him.",
  },
  {
    id: "t2",
    name: "Priya Nair",
    exam: "NEET",
    result: "Score: 175/180 in Physics",
    year: 2024,
    rating: 5,
    review:
      "The AbdOfPhysics platform is incredible. The chapter-level PYQ analysis showed me exactly which topics NTA repeats every year. I scored 175 in Physics — my best subject thanks to sir's notes.",
  },
  {
    id: "t3",
    name: "Rohan Gupta",
    exam: "JEE Main",
    result: "99.4 Percentile",
    year: 2023,
    rating: 5,
    review:
      "I struggled with rotational dynamics for months. One session with Abdullah sir and it clicked. He draws the most intuitive diagrams and never lets you move forward until you truly get it. Highly recommended.",
  },
  {
    id: "t4",
    name: "Sneha Reddy",
    exam: "JEE Advanced",
    result: "AIR 612",
    year: 2023,
    rating: 5,
    review:
      "The mock tests on AbdOfPhysics are the best I've seen — they match JEE Advanced difficulty exactly. Sir's detailed video solutions after each test taught me more than two weeks of self-study.",
  },
  {
    id: "t5",
    name: "Karthik Menon",
    exam: "JEE Main",
    result: "100 Percentile in Physics",
    year: 2024,
    rating: 5,
    review:
      "I watched every lecture twice. Abdullah sir's first-principles approach for Modern Physics is unmatched — when you derive the Bohr model yourself, you never forget it. Got a perfect 100 percentile in Physics!",
  },
  {
    id: "t6",
    name: "Anjali Singh",
    exam: "NEET",
    result: "AIR 341",
    year: 2023,
    rating: 5,
    review:
      "As a dropper, I was demotivated until I found AbdOfPhysics. The weak-topic analysis in the dashboard showed me exactly what to fix. Sir's systematic problem-solving method helped me crack NEET in my second attempt.",
  },
  {
    id: "t7",
    name: "Dev Patel",
    exam: "JEE Advanced",
    result: "AIR 88",
    year: 2022,
    rating: 5,
    review:
      "The way Abdullah sir teaches waves and optics is unlike anything I'd seen at big coaching institutes. He focuses on physical reasoning and that saves so much time during the exam. Cracked JEE Advanced with AIR 88.",
  },
  {
    id: "t8",
    name: "Meera Iyer",
    exam: "JEE Main",
    result: "99.8 Percentile",
    year: 2024,
    rating: 4,
    review:
      "I found AbdOfPhysics in November and had just three months left. The AI tutor answered my doubts at 2 AM when no one else could. The structured notes and formula sheets saved me countless hours.",
  },
];
