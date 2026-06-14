# AbdOfPhysics — Implementation Summary

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Database | SQLite (via Prisma 5) — local dev |
| Auth | NextAuth v5 (credentials + Google OAuth) |
| Content | MDX files compiled with `next-mdx-remote/rsc` |
| Math rendering | KaTeX via `rehype-katex` |
| Animations | Framer Motion |
| State | Zustand |
| Forms | React Hook Form + Zod |
| AI Tutor | Anthropic Claude API (`ai` SDK) |

---

## Directory Structure

```
physics-mastery/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (marketing)/          # Public pages: home, about, faculty, contact, blog, resources
│   │   ├── (learning)/           # Chapters, formula hub, PYQs, mock tests, practice, revision
│   │   ├── (dashboard)/          # Student dashboard, analytics, bookmarks, progress, study planner
│   │   ├── (auth)/               # Login, register, reset-password, verify-email
│   │   ├── (ai)/                 # AI tutor chat interface
│   │   ├── (admin)/              # Admin panel: users, content, questions, analytics
│   │   └── api/                  # API routes: auth, register, download, ai chat
│   ├── components/               # React components (organised by feature)
│   ├── config/                   # Static data: curriculum, faculty, resources, site, questions
│   ├── lib/                      # Utilities: auth, prisma client, MDX compiler, validations, SEO
│   ├── services/                 # Data access layer: question, test services
│   └── types/                    # TypeScript types mirroring the Prisma schema
├── content/
│   └── chapters/                 # MDX content files
│       └── <slug>/
│           ├── theory.mdx        # Chapter theory notes (34 chapters — all complete)
│           └── formulas.mdx      # Formula sheets (34 chapters — all complete)
├── prisma/
│   ├── schema.prisma             # Database schema (SQLite, enums as String)
│   ├── seed.ts                   # Seeds admin user + all chapters
│   └── dev.db                    # SQLite database file (local)
├── public/
│   ├── images/instructor/        # Profile photo
│   └── manifest.json             # PWA manifest
└── docs/                         # This directory — setup guides and summaries
```

---

## Authentication System

### Providers
| Provider | Status | Notes |
|----------|--------|-------|
| Email + Password | **Working** | bcryptjs hashing, Zod validation |
| Google OAuth | Disabled until configured | See `docs/google-oauth-setup.md` |

### Flow (Email/Password)
```
POST /api/auth/register
  → validate with Zod registerSchema
  → hash password (bcrypt, 12 rounds)
  → prisma.user.create (role: "STUDENT")
  → prisma.studyPlan.create (linked to user)
  → return { success: true, data: { id, email } }

POST /api/auth/callback/credentials (NextAuth)
  → validate email + password
  → prisma.user.findUnique by email
  → bcrypt.compare password
  → return user object → JWT created
  → redirect to /dashboard
```

### Database tables used for auth
- `users` — stores name, email, hashed password, role, class, target
- `accounts` — OAuth provider accounts (Google, etc.)
- `sessions` — JWT session data
- `verification_tokens` — email verification
- `study_plans` — auto-created on registration

---

## Content System

### MDX Pipeline
```
content/chapters/<slug>/theory.mdx
content/chapters/<slug>/formulas.mdx
        ↓
getChapterContent(slug, file)   [src/lib/mdx/mdx-utils.ts]
        ↓
compileMDX (next-mdx-remote/rsc)
  + remarkMath → rehypeKatex   (LaTeX rendering)
  + mdxComponents              (custom Formula, Callout, Step, Diagram)
        ↓
React server component renders content
```

### Custom MDX Components
| Component | Props | Renders |
|-----------|-------|---------|
| `<Formula label="...">` | `label?: string` | Indigo-bordered formula card |
| `<Callout type="tip\|warning\|important\|info\|derivation">` | `type` | Coloured callout box |
| `<Step n={1}>` | `n: number` | Numbered step with circle badge |
| `<Diagram src alt caption>` | standard | Image with caption |

### Content coverage
- **34 chapters** (17 Class XI + 17 Class XII)
- **theory.mdx**: all 34 complete ✓
- **formulas.mdx**: all 34 complete ✓

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, Problem of the Day, stats, features, curriculum, testimonials |
| `/about` | About — founder story, mission pillars, platform stats |
| `/faculty` | Faculty profile — bio, timeline, teaching approach, testimonials |
| `/chapters` | Chapter list (Class XI / XII tabs) |
| `/chapters/[slug]/theory` | Theory notes (MDX rendered) |
| `/chapters/[slug]/formulas` | Formula sheet (MDX rendered) |
| `/chapters/[slug]/practice` | Question practice interface |
| `/chapters/[slug]/pyqs` | PYQ browser |
| `/formula-hub` | All-chapters formula index |
| `/practice` | Cross-chapter practice |
| `/pyqs` | PYQ explorer |
| `/mock-tests` | Mock test catalogue |
| `/resources` | Downloadable resources |
| `/ai-tutor` | AI doubt-solving chat |
| `/dashboard` | Student progress dashboard |
| `/login` | Sign in (email/password + Google) |
| `/register` | Create account |

---

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/register` | Create new user account |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler (login, OAuth callbacks) |
| GET | `/api/download/[id]` | Generate & download resource files (DPP, notes, formula sheet, mind map) |

### Download API
Generates real file content on-the-fly:
- **DPP**: filters SAMPLE_QUESTIONS by chapter, formats as numbered question paper with answer key
- **Notes**: strips MDX syntax from theory.mdx, returns plain-text notes
- **Formula Sheet**: strips MDX syntax from formulas.mdx
- **Mind Map**: extracts headings from theory.mdx as a tree outline

---

## Database Schema (SQLite)

All Prisma enums converted to `String` fields (SQLite limitation). Values enforced at TypeScript layer.

Key models:
```
User          → core auth + profile
Account       → OAuth provider links
Session       → NextAuth JWT sessions
Chapter       → curriculum chapters
Question      → question bank
PYQ           → past year questions
MockTest      → full-length tests
TestAttempt   → student test results
UserProgress  → chapter/topic completion tracking
StudyPlan     → personalised study schedule
AiChat        → AI tutor conversation threads
AiMessage     → individual chat messages
Resource      → downloadable files
BlogPost      → blog articles
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite: `file:./dev.db` |
| `AUTH_SECRET` | Yes | NextAuth JWT signing secret (min 32 chars) |
| `AUTH_GOOGLE_ID` | For Google OAuth | Google Cloud OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | For Google OAuth | Google Cloud OAuth Client Secret |
| `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED` | Yes | `"true"` only when real Google credentials added |
| `ANTHROPIC_API_KEY` | For AI Tutor | From console.anthropic.com |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` in dev |

---

## Enabling Features (currently using placeholder keys)

| Feature | What to do |
|---------|-----------|
| Google OAuth | See `docs/google-oauth-setup.md` |
| AI Tutor | Get API key from [console.anthropic.com](https://console.anthropic.com) → set `ANTHROPIC_API_KEY` |
| Email sending | Get API key from [resend.com](https://resend.com) → set `RESEND_API_KEY` |

---

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run type-check   # TypeScript check (0 errors)
npm run db:push      # Apply schema to SQLite database
npm run db:seed      # Seed admin user + all chapters
npm run db:studio    # Open Prisma Studio (visual DB browser)
```

---

*Last updated: June 2026*
