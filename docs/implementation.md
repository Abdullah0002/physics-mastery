# Physics Mastery — Implementation Document

**Last Updated:** 2026-06-06  
**Session:** Phase 12 — Blog System (ALL PHASES COMPLETE)  
**Status:** Complete & Validated  
**Server:** Running at http://localhost:3000  

---

## 1. Project Overview

**Physics Mastery** is a world-class Physics learning platform for JEE Main, JEE Advanced, and NEET preparation.

- **Tagline:** "From First Principles to JEE Advanced Excellence"
- **Faculty:** Abdullah (Senior Physics Faculty)
- **Contact:** abd161199@gmail.com
- **Target Users:** Students (Class 11, Class 12, Droppers), Faculty, Admins

### Platform Goals

| Goal | Implementation |
|---|---|
| Concept learning | MDX chapter pages with derivations, theory, illustrations |
| Practice | 10,000+ questions with hints, solutions, difficulty filter |
| PYQ access | Searchable 5,000+ previous year question database |
| Mock tests | Full JEE Main / JEE Advanced / NEET timed interface |
| Progress tracking | Per-chapter analytics, weak topic detection, streaks |
| AI doubt solving | Claude-powered AI tutor with physics system prompt |
| SEO dominance | Sitemap, robots, JSON-LD, OG tags, 35+ chapter pages |

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 16.2.7 | App Router, Server Components |
| Language | TypeScript | 5.7.x | strict mode, noUncheckedIndexedAccess |
| Styling | Tailwind CSS | 3.4.x | Custom design tokens, dark mode |
| Components | ShadCN UI (manual) | — | Radix UI primitives |
| Animation | Framer Motion | 11.x | Page transitions, micro-interactions |
| Database | PostgreSQL | — | Hosted on Supabase |
| ORM | Prisma | 5.22.x | Type-safe queries, migrations |
| Auth | NextAuth v5 (beta.25) | — | JWT strategy, Google + Credentials |
| Storage | Supabase Storage | 2.46.x | PDFs, images, resources |
| AI | Anthropic Claude | Opus 4.8 | Physics tutor with custom system prompt |
| Email | Resend | — | Transactional email |
| Deployment | Vercel | — | Edge network, automatic deploys |
| State | Zustand | 5.x | testStore, uiStore with persistence |
| Forms | React Hook Form | 7.x | Zod resolver validation |
| Charts | Recharts | 2.x | Progress analytics |
| Math | KaTeX | 0.16.x | LaTeX rendering in content |
| Content | next-mdx-remote | 5.x | RSC-compatible MDX with remark-math + rehype-katex |

### Critical Version Notes

- **Next.js 16** uses Turbopack by default for `next dev` — webpack is no longer available for dev
- **Next.js 16** renames `middleware.ts` → `proxy.ts` (the old name triggers a deprecation warning)
- **NextAuth v5** uses `auth()` server-side instead of `getServerSession()`, and `handlers` export for the API route
- **React 19** is the peer requirement — some older packages may warn about peer dep conflicts

---

## 3. Environment Setup

### Prerequisites

- Node.js v24+ (installed via `winget install OpenJS.NodeJS.LTS`)
- A Supabase project (free tier works)
- Google OAuth app credentials
- Anthropic API key (for AI tutor)

### First-Time Setup

```bash
cd c:\Users\Abdullah\projects\physics-mastery

# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local with real Supabase, Google, Anthropic credentials

# Push the Prisma schema to Supabase
npm run db:push

# Seed the database (creates courses, chapters, achievements, Abdullah's faculty profile)
npm run db:seed

# Start development server
npm run dev
# → http://localhost:3000
```

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| Dev server | `npm run dev` | Starts Next.js 16 with Turbopack |
| Build | `npm run build` | Production webpack build |
| Type check | `npm run type-check` | `tsc --noEmit` — 0 errors confirmed |
| DB push | `npm run db:push` | Sync Prisma schema → database (no migration file) |
| DB migrate | `npm run db:migrate` | Create + apply migration file |
| DB seed | `npm run db:seed` | Populate initial data |
| DB studio | `npm run db:studio` | Prisma Studio GUI |

---

## 4. Repository Structure

```
physics-mastery/
├── docs/
│   └── implementation.md          ← this file
├── prisma/
│   ├── schema.prisma               ← complete 25-model schema
│   └── seed.ts                     ← seeds courses, chapters, achievements
├── public/
│   ├── manifest.json               ← PWA manifest
│   └── icons/, images/, fonts/
├── content/                        ← MDX content (Phase 4+)
│   ├── chapters/
│   │   ├── class-11/
│   │   └── class-12/
│   ├── blog/
│   └── resources/
├── src/
│   ├── app/
│   │   ├── (auth)/                 ← /login, /register, /reset-password
│   │   │   ├── layout.tsx          ← split-screen auth layout
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (marketing)/            ← public pages with Navbar+Footer
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx            ← homepage stub (full in Phase 3)
│   │   ├── (learning)/             ← chapters, practice, pyqs, tests (Phase 4+)
│   │   ├── (dashboard)/            ← authenticated user dashboard (Phase 8+)
│   │   ├── (ai)/                   ← AI tutor interface (Phase 9+)
│   │   ├── (admin)/                ← admin panel (Phase 9+)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts   ← NextAuth handler
│   │   │   │   └── register/route.ts        ← POST /api/auth/register
│   │   │   ├── chapters/route.ts
│   │   │   ├── questions/route.ts
│   │   │   ├── pyqs/route.ts
│   │   │   ├── mock-tests/route.ts
│   │   │   ├── bookmarks/route.ts
│   │   │   ├── progress/route.ts
│   │   │   ├── analytics/route.ts
│   │   │   └── ai/route.ts
│   │   ├── sitemap.ts              ← auto-generates XML sitemap
│   │   ├── robots.ts               ← robots.txt
│   │   ├── layout.tsx              ← root layout (SessionProvider + ThemeProvider)
│   │   ├── globals.css             ← design tokens, Tailwind layers
│   │   ├── error.tsx               ← global error boundary
│   │   ├── not-found.tsx           ← 404 page
│   │   └── loading.tsx             ← root loading UI
│   ├── components/
│   │   ├── ui/                     ← ShadCN base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── separator.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← sticky navbar with dropdowns, mobile menu
│   │   │   └── Footer.tsx          ← 5-column footer with nav links
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx       ← Google OAuth + credentials form
│   │   │   └── RegisterForm.tsx    ← registration with class/target fields
│   │   └── providers/
│   │       ├── ThemeProvider.tsx   ← next-themes wrapper
│   │       └── SessionProvider.tsx ← NextAuth SessionProvider for client hooks
│   ├── config/
│   │   ├── site.ts                 ← brand constants, stats, SEO keywords
│   │   ├── curriculum.ts           ← ALL 32 chapters with weightage data
│   │   ├── nav.ts                  ← mainNav, dashboardNav, adminNav, footerNav
│   │   └── exam.ts                 ← JEE Main / JEE Advanced / NEET patterns
│   ├── lib/
│   │   ├── auth.ts                 ← NextAuth v5 config (Google + Credentials)
│   │   ├── prisma.ts               ← singleton Prisma client
│   │   ├── supabase.ts             ← Supabase client + storage helpers
│   │   ├── utils.ts                ← cn(), slugify(), format helpers, config maps
│   │   ├── validations/
│   │   │   ├── auth.ts             ← registerSchema, loginSchema (Zod)
│   │   │   └── question.ts         ← questionFilterSchema, createQuestionSchema
│   │   ├── mdx/
│   │   │   ├── mdx-components.tsx  ← Callout, Formula, Step, Diagram + HTML overrides
│   │   │   └── mdx-utils.ts        ← getChapterContent(), getBlogContent() with RSC
│   │   ├── analytics/
│   │   │   └── tracking.ts         ← recordStudySession(), getStudyHeatmap()
│   │   └── seo/
│   │       └── structured-data.ts  ← JSON-LD: Organization, Course, BlogPost, FAQ
│   ├── hooks/
│   │   ├── useAuth.ts              ← wraps useSession with role helpers
│   │   ├── useProgress.ts          ← fetches /api/progress
│   │   ├── useBookmarks.ts         ← optimistic bookmark toggle
│   │   ├── useTimer.ts             ← countdown + stopwatch hooks
│   │   └── useDebounce.ts          ← debounce hook
│   ├── services/                   ← server-side business logic (used in API routes + RSC)
│   │   ├── chapter.service.ts      ← getAllChapters(), getChapterBySlug(), getChapterStats()
│   │   ├── question.service.ts     ← getQuestions(), getPYQs(), recordQuestionAttempt()
│   │   ├── test.service.ts         ← getMockTests(), createTestAttempt(), submitTestAttempt()
│   │   ├── progress.service.ts     ← getUserProgressSummary(), getWeakTopics(), updateStudyStreak()
│   │   └── ai.service.ts           ← createAiChat(), saveAiMessage(), buildPhysicsSystemPrompt()
│   ├── store/
│   │   ├── testStore.ts            ← Zustand store for live mock test state
│   │   └── uiStore.ts              ← persisted UI preferences (theme, examMode, fontSize)
│   ├── types/
│   │   └── index.ts                ← all TypeScript types mirroring Prisma models
│   └── proxy.ts                    ← Next.js 16 route protection (was middleware.ts)
├── .env.example                    ← template for all required env vars
├── .env.local                      ← local values (gitignored)
├── .eslintrc.json
├── .gitignore
├── next.config.ts                  ← simplified (no createMDX — Turbopack compatible)
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts              ← full design token system
└── tsconfig.json                   ← ES2017 target, strict, bundler moduleResolution
```

---

## 5. Database Schema

**25 Prisma models** across 6 domains. Database: PostgreSQL on Supabase.

### Domain Map

```
AUTH             CURRICULUM          QUESTIONS
─────────        ──────────          ─────────
User             Course              Question
Account          Chapter             PYQ (PreviousYearQuestion)
Session          Topic               QuestionAttempt
VerificationToken Formula            Bookmark
PasswordResetToken
                 TESTS               PROGRESS & LEARNING
                 ─────               ───────────────────
                 MockTest            UserProgress
                 MockTestQuestion    StudyPlan
                 TestAttempt         StudySession
                                     DailyAnalytics
                                     UserAchievement
                                     Achievement

CONTENT & FACULTY                    PLATFORM
─────────────────                    ────────
FacultyProfile                       Notification
FacultyReview                        Announcement
Resource
BlogPost
AiChat
AiMessage
RevisionNote
```

### Key Schema Decisions

- **Questions** store `correctAnswer` as `Json` — handles MCQ (`"A"`), Multi-correct (`["A","C"]`), Integer (`5`), Numerical range (`{min: 4.9, max: 5.1}`)
- **TestAttempt** stores `responses` as Json and `chapterAnalysis` as a denormalized Json — avoids N+1 queries on result pages
- **UserProgress** uses a compound unique key `(userId, chapterId, topicId)` — `topicId: null` represents chapter-level progress
- **DailyAnalytics** is a daily snapshot keyed by `(userId, date)` — powers the heatmap calendar
- **AiMessage** stores `inputTokens`/`outputTokens` for usage tracking

### Running the Schema

```bash
# Development (no migration file, fast iteration)
npm run db:push

# Production (creates migration file for CI/CD)
npm run db:migrate

# Seed initial data
npm run db:seed
# Creates:
# - Abdullah's user account (role: FACULTY) + FacultyProfile
# - Class 11 course + 17 chapters with weightage data
# - Class 12 course + 15 chapters with weightage data
# - 10 Achievement definitions
```

---

## 6. Authentication Flow

```
                    ┌─────────────────────────────────┐
                    │         /login or /register      │
                    └──────────────┬──────────────────-┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                     ▼
       Google OAuth          Email+Password           Register
       signIn("google")      signIn("credentials")    POST /api/auth/register
              │                    │                     │
              │              bcryptjs.compare()    bcryptjs.hash(pw, 12)
              │                    │               prisma.user.create()
              └────────────────────┴─────────────────────┘
                                   │
                          NextAuth JWT callback
                          { id, role } added to token
                                   │
                          session.user.id + session.user.role
                                   │
                           proxy.ts middleware
                    ┌──────────────┴──────────────┐
                    ▼                              ▼
             Protected routes               Role-gated routes
             /dashboard, /ai-tutor          /admin → ADMIN only
             redirect → /login              /faculty/manage → FACULTY+ADMIN
```

### Auth Files

| File | Purpose |
|---|---|
| `src/lib/auth.ts` | NextAuth v5 config — providers, JWT/session callbacks, events |
| `src/proxy.ts` | Route protection middleware (Next.js 16 convention) |
| `src/app/api/auth/[...nextauth]/route.ts` | Exports `{ GET, POST }` from handlers |
| `src/app/api/auth/register/route.ts` | Creates user + study plan, returns success/error |
| `src/lib/validations/auth.ts` | Zod schemas: registerSchema, loginSchema |
| `src/components/auth/LoginForm.tsx` | Google button + email/password form, error mapping |
| `src/components/auth/RegisterForm.tsx` | Registration with class + target exam selection |
| `src/components/providers/SessionProvider.tsx` | Client-side NextAuth session context |

### Role System

| Role | Access |
|---|---|
| `STUDENT` | All public pages, own dashboard, practice, tests |
| `FACULTY` | All student access + content management |
| `ADMIN` | Full access including admin panel |

---

## 7. Curriculum Configuration

All 32 chapters are defined as static config in `src/config/curriculum.ts`. This is the source of truth for:
- Chapter slugs (used in URL routes like `/chapters/kinematics`)
- Exam weightage percentages (JEE Main / JEE Advanced / NEET)
- Difficulty classification
- Estimated study hours
- Formula counts

The seed script reads from this config to populate the database.

### Class 11 Chapters (17)

| Slug | JEE Main % | JEE Adv % | NEET % |
|---|---|---|---|
| units-and-dimensions | 3 | 2 | 2 |
| vectors | 3 | 3 | 2 |
| kinematics | 7 | 6 | 5 |
| laws-of-motion | 8 | 7 | 6 |
| friction | 4 | 3 | 3 |
| circular-motion | 4 | 4 | 3 |
| work-power-energy | 8 | 7 | 6 |
| center-of-mass | 5 | 5 | 3 |
| rotational-mechanics | 8 | 10 | 5 |
| gravitation | 5 | 5 | 4 |
| properties-of-matter | 4 | 3 | 5 |
| thermal-physics | 5 | 4 | 6 |
| kinetic-theory-of-gases | 4 | 3 | 5 |
| thermodynamics | 6 | 6 | 6 |
| simple-harmonic-motion | 5 | 5 | 4 |
| waves | 4 | 5 | 4 |
| sound-waves | 4 | 4 | 5 |

### Class 12 Chapters (15)

| Slug | JEE Main % | JEE Adv % | NEET % |
|---|---|---|---|
| electrostatics | 9 | 10 | 8 |
| capacitance | 6 | 6 | 5 |
| current-electricity | 8 | 7 | 8 |
| magnetism | 8 | 8 | 7 |
| electromagnetic-induction | 7 | 8 | 6 |
| alternating-current | 5 | 5 | 4 |
| electromagnetic-waves | 3 | 2 | 3 |
| ray-optics | 8 | 8 | 10 |
| wave-optics | 5 | 6 | 5 |
| modern-physics | 8 | 9 | 8 |
| dual-nature | 4 | 4 | 4 |
| atoms | 4 | 4 | 5 |
| nuclei | 4 | 4 | 5 |
| semiconductors | 4 | 2 | 6 |
| communication-systems | 2 | 1 | 2 |

---

## 8. Design System (Defined, Not Yet Built)

The design tokens are wired into `tailwind.config.ts` and `globals.css`. The actual ShadCN component library will be built in **Phase 2**.

### Color Palette

| Token | Usage |
|---|---|
| `brand-500` (#6366f1) | Primary CTA, links, active states |
| `easy` (#22c55e) | Easy difficulty badge |
| `medium` (#f59e0b) | Medium difficulty badge |
| `hard` (#ef4444) | Hard difficulty badge |
| `advanced` (#8b5cf6) | Advanced/JEE Adv difficulty badge |
| `jee-main` (#3b82f6) | JEE Main exam tag |
| `jee-advanced` (#6366f1) | JEE Advanced exam tag |
| `neet` (#10b981) | NEET exam tag |

### Utility Classes (in globals.css)

| Class | Effect |
|---|---|
| `.gradient-text` | Brand indigo→violet gradient text |
| `.glass` | Frosted glass card background |
| `.glass-card` | Glass + rounded-2xl + shadow |
| `.dot-grid` | Physics-inspired dot background |
| `.shimmer` | Loading skeleton animation |
| `.option-card` | Question MCQ option card |
| `.option-card.selected` | Selected state |
| `.option-card.correct` | Correct answer reveal |
| `.option-card.incorrect` | Wrong answer reveal |

### ShadCN UI Components — Phase 2 Complete

| Component | File | Status |
|---|---|---|
| Button | `src/components/ui/button.tsx` | ✅ Complete |
| Input | `src/components/ui/input.tsx` | ✅ Complete |
| Label | `src/components/ui/label.tsx` | ✅ Complete |
| Separator | `src/components/ui/separator.tsx` | ✅ Complete |
| Badge | `src/components/ui/badge.tsx` | ✅ Complete |
| Card | `src/components/ui/card.tsx` | ✅ Complete |
| Avatar | `src/components/ui/avatar.tsx` | ✅ Complete |
| Tabs | `src/components/ui/tabs.tsx` | ✅ Complete |
| Dialog | `src/components/ui/dialog.tsx` | ✅ Complete |
| AlertDialog | `src/components/ui/alert-dialog.tsx` | ✅ Complete |
| Sheet | `src/components/ui/sheet.tsx` | ✅ Complete |
| ScrollArea | `src/components/ui/scroll-area.tsx` | ✅ Complete |
| Progress | `src/components/ui/progress.tsx` | ✅ Complete |
| Skeleton | `src/components/ui/skeleton.tsx` | ✅ Complete |
| Tooltip | `src/components/ui/tooltip.tsx` | ✅ Complete |
| DropdownMenu | `src/components/ui/dropdown-menu.tsx` | ✅ Complete |
| Select | `src/components/ui/select.tsx` | ✅ Complete |
| Accordion | `src/components/ui/accordion.tsx` | ✅ Complete |
| HoverCard | `src/components/ui/hover-card.tsx` | ✅ Complete |
| Popover | `src/components/ui/popover.tsx` | ✅ Complete |
| Switch | `src/components/ui/switch.tsx` | ✅ Complete |
| Checkbox | `src/components/ui/checkbox.tsx` | ✅ Complete |
| RadioGroup | `src/components/ui/radio-group.tsx` | ✅ Complete |
| Slider | `src/components/ui/slider.tsx` | ✅ Complete |
| Toaster | `src/components/ui/toaster.tsx` | ✅ Complete |
| Motion | `src/components/ui/motion.tsx` | ✅ Complete |
| Typography | `src/components/ui/typography.tsx` | ✅ Complete |
| Barrel export | `src/components/ui/index.ts` | ✅ Complete |

---

## 8b. Phase 5 — Question System (Complete)

### New Files

| File | Purpose |
|---|---|
| `src/config/sample-questions.ts` | 18 sample physics questions across 7 chapters — used when DB is not connected |
| `src/components/practice/KatexRenderer.tsx` | Client component: parses `$...$` and `$$...$$` in strings and renders KaTeX HTML |
| `src/components/practice/QuestionDisplay.tsx` | Single question UI: MCQ options, integer input, timer, hint reveal, solution reveal |
| `src/components/practice/PracticeFilters.tsx` | Chip filter bar: difficulty × type × chapter |
| `src/components/practice/PracticeInterface.tsx` | Full practice session manager: question palette, progress bar, stopwatch, answer tracking |
| `src/components/practice/SessionSummary.tsx` | End-of-session results: score, accuracy, chapter breakdown, per-question review |
| `src/components/practice/PYQExplorer.tsx` | PYQ explorer: exam × year × chapter filters, side-by-side list + question panel |
| `src/app/(learning)/practice/page.tsx` | Updated: renders `<PracticeInterface />` |
| `src/app/(learning)/pyqs/page.tsx` | Updated: renders `<PYQExplorer />` |

### Architecture Notes

- **No database required** — all data comes from `sample-questions.ts`; when the database is seeded, `PracticeInterface` can be updated to call `/api/questions` instead
- **KaTeX client-side** — LaTeX in question strings is parsed and rendered by `katex.renderToString()` in `KatexRenderer`; uses `dangerouslySetInnerHTML` but the content comes from our own config, not user input
- **Correct answer logic** handles all 4 types: MCQ_SINGLE (string match), MCQ_MULTIPLE (sorted array match), INTEGER/NUMERICAL (Number(submitted) comparison), Numerical range (`{min, max}`)
- **Per-question timer** resets to 0 when navigating between questions in the session
- **Question palette** in the sidebar shows colour-coded status (green=correct, red=wrong, grey=unanswered) with ring indicator for current question

---

## 9. API Routes

All routes follow the pattern `{ success: boolean, data?: T, error?: string }`.

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | — | NextAuth handler |
| `/api/auth/register` | POST | — | Create new student account |
| `/api/chapters` | GET | — | List chapters (filter: `?class=XI\|XII`) |
| `/api/questions` | GET | — | List questions (filter: chapter, difficulty, type) |
| `/api/pyqs` | GET | — | List PYQs (filter: exam, year, chapter) |
| `/api/mock-tests` | GET | — | List mock tests (filter: exam) |
| `/api/bookmarks` | GET/POST/DELETE | ✅ JWT | Get/toggle/remove bookmarks |
| `/api/progress` | GET | ✅ JWT | Get summary + weak topics |
| `/api/analytics` | GET | ✅ JWT | Study heatmap + weekly stats |
| `/api/ai` | POST | ✅ JWT | Send message to AI tutor |

---

## 10. SEO Architecture

| File | Purpose |
|---|---|
| `src/app/sitemap.ts` | Dynamic XML sitemap — all chapters + blog posts |
| `src/app/robots.ts` | robots.txt — blocks /dashboard, /admin, /api |
| `src/lib/seo/structured-data.ts` | JSON-LD generators: Organization, Course, FAQ, BlogPost, Breadcrumb |
| `src/app/layout.tsx` | Root metadata with OG tags, Twitter card, canonical URL |

### JSON-LD Schemas Implemented

- `EducationalOrganization` — site-wide, injected on homepage
- `Course` — per chapter page (Phase 4)
- `FAQPage` — on homepage and chapter pages (Phase 4)
- `BlogPosting` — per blog post (Phase 12)
- `BreadcrumbList` — on all deep pages (Phase 4+)
- `Person` — on faculty page (Phase 10)

---

## 11. Known Issues & Fixes Applied

These bugs were discovered and fixed during Phase 1 validation:

| Bug | Root Cause | Fix Applied |
|---|---|---|
| `@radix-ui/react-badge` 404 | Package doesn't exist | Removed from package.json |
| `@radix-ui/react-sheet` 404 | Package doesn't exist | Removed from package.json |
| Missing `bcryptjs` | Not included in original deps | Added to dependencies |
| Missing `geist` font | Not included | Added to dependencies |
| Missing `remark-math` / `rehype-katex` | Used in config but not listed | Added to dependencies |
| Missing `@tailwindcss/typography` | Used in tailwind.config.ts | Added to devDependencies |
| Missing `autoprefixer` | Required by postcss.config.mjs | Added to devDependencies |
| `readonly` array type error | `siteConfig.seo.keywords as const` can't be assigned to `string[]` | Spread with `[...siteConfig.seo.keywords]` |
| `Set<string>` iteration error | TypeScript ES2017 target needed | Added `"target": "ES2017"` to tsconfig; changed spreads to `Array.from()` |
| MDX loader + Turbopack incompatibility | `createMDX` with JS plugins not serializable in Turbopack | Removed `createMDX` wrapper from next.config.ts; MDX processing via `next-mdx-remote` at runtime |
| `--no-turbopack` flag unknown | Next.js 16 removed webpack dev mode | Not needed after MDX fix |
| `@import` CSS position error | KaTeX `@import` was after `@tailwind` directives | Moved to top of globals.css |
| `middleware.ts` deprecation | Next.js 16 renamed convention | Renamed to `proxy.ts` |
| `SessionProvider` missing | `useSession()` in Navbar requires provider | Added `SessionProvider` to root layout |

---

## 12. Roadmap — Remaining Phases

| Phase | Title | Key Deliverables |
|---|---|---|
| **Phase 2** | UI/UX Design System | Full ShadCN component library, typography scale, spacing system, dark/light mode polish, motion primitives |
| **Phase 3** | Homepage | Hero section with physics animation, stats counter, features grid, testimonials, CTA |
| **Phase 4** | Physics Curriculum | 32 chapter pages each with theory, derivations, formulas, MDX content |
| ✅ **Phase 5** | Question System | Practice interface, difficulty filter, timer, hints, solution reveal, performance tracking |
| ✅ **Phase 6** | PYQ System | Searchable PYQ explorer filtered by exam/year/chapter/difficulty |
| ✅ **Phase 7** | Mock Test System | Full exam interface with timer, question palette, auto-submit, rank prediction |
| ✅ **Phase 8** | Student Dashboard | Progress charts, streak calendar, weak topics, analytics, daily goals, settings |
| ✅ **Phase 9** | AI Features | Streaming chat (SSE), formula finder with LaTeX copy, concept explainer with area tabs |
| ✅ **Phase 10** | Faculty Profile | Hero with stats, teaching philosophy, achievement cards, career timeline, 8 student testimonials, Person JSON-LD |
| ✅ **Phase 11** | Resource Center | 32 resources across Notes/DPP/Formula/MindMap, search + type + exam filters, download tracking with toast, featured section |
| ✅ **Phase 12** | Blog System | 6 MDX posts, category/tag/search filters, post detail with JSON-LD + breadcrumbs, related posts sidebar, author card |

---

## 13. Phase 2 Starting Point

When beginning Phase 2, the agent should:

1. **Read this document** to understand the full architecture
2. **Check current state:** `npm run type-check` (should be 0 errors), `npm run dev` (should boot in ~500ms)
3. **Build ShadCN components** — the following are needed immediately for Phase 3:
   - `Badge`, `Card`, `Avatar`, `Tabs`, `Dialog`, `Sheet`, `ScrollArea`
   - `Progress`, `Skeleton`, `Tooltip`, `DropdownMenu`, `Select`
   - `Accordion`, `HoverCard`, `Popover`
4. **Add `@/components/ui/index.ts`** barrel export for all UI components
5. **Design token audit** — review `tailwind.config.ts` brand palette and `globals.css` CSS variables; ensure dark mode mirrors work correctly
6. **Add animation primitives** in `@/components/ui/motion.tsx` — `FadeIn`, `SlideUp`, `ScaleIn` wrappers using Framer Motion
7. **Typography component** — `@/components/ui/typography.tsx` with `H1`, `H2`, `Lead`, `Muted` variants

The homepage (Phase 3) imports from all of the above, so Phase 2 must be complete first.

---

## 14. Content Strategy (Phase 4+)

MDX chapter files live in `content/chapters/[slug]/`. Each chapter folder contains:

```
content/chapters/kinematics/
├── index.mdx          ← overview, importance, weightage
├── theory.mdx         ← concept explanations with LaTeX
├── derivations.mdx    ← step-by-step derivations
└── formulas.mdx       ← formula reference sheet
```

Custom MDX components available (defined in `src/lib/mdx/mdx-components.tsx`):

```mdx
<Callout type="tip">Use energy conservation when forces are non-constant.</Callout>
<Callout type="derivation">Proof of v² = u² + 2as from first principles:</Callout>
<Formula label="Kinematic Equation">$$v^2 = u^2 + 2as$$</Formula>
<Step n={1}>Start from the definition of acceleration: $a = \frac{dv}{dt}$</Step>
<Diagram src="/images/projectile.svg" alt="Projectile motion" caption="Fig 1: Trajectory" />
```

LaTeX is rendered by KaTeX via `remark-math` + `rehype-katex` inside `next-mdx-remote/rsc`. Inline math uses `$...$`, display math uses `$$...$$`.

---

## 15. Deployment Checklist (Pre-Production)

Before going live on Vercel:

- [ ] Replace all placeholder values in `.env.local` with real credentials
- [ ] Run `npm run db:migrate` (not `db:push`) for production schema deployment
- [ ] Run `npm run db:seed` against production database
- [ ] Set all env vars in Vercel dashboard
- [ ] Configure Google OAuth redirect URI: `https://physicsmastery.in/api/auth/callback/google`
- [ ] Set `AUTH_URL=https://physicsmastery.in` in production env
- [ ] Configure Supabase RLS (Row Level Security) policies for all tables
- [ ] Upload favicon, OG images, and PWA icons to `/public/icons/`
- [ ] Run `npm run build` locally to verify zero build errors
- [ ] Set up Resend domain for email delivery

---

*This document was generated after completing Phase 1 of the Physics Mastery platform build. It represents the complete state of the system architecture and serves as the handoff document for all future development phases.*
