# Claudict: design spec

## Overview

Claudict (claudict.com) is a satirical community website for developers addicted to Claude Code. The entire UX is framed as an addiction recovery center, while functioning as a real community platform with forum, project showcase, and a "wall of shame."

**Tagline:** "The first step is admitting you have a problem."

## Core concept

The site uses addiction/recovery clinic language throughout. Every UI element maps to a clinical metaphor:

| Feature | Clinical framing |
|---|---|
| Signup | Intake form |
| Profile | Patient file |
| Forum | Group therapy sessions |
| Wall of shame | Clinical evidence |
| Project showcase | Relapse gallery |
| Donations | Sponsor a Claudict's recovery |
| Days since last session | Days clean |
| Login | Return to facility |

The humor comes from the framing, not the functionality. Everything works as a normal community site.

## Target audience

Developers actively using Claude Code who identify with the "addicted to coding with AI" experience. English-speaking, international. The kind of person who has a terminal open at 3AM "just fixing one more thing."

## Pages and routes

### / (landing page)

Hero section with tagline, live stats (patient count, avg days clean, relapse rate), and "Begin intake" CTA. Below: latest group therapy threads and recent clinical evidence. Purpose: communicate the concept immediately and drive signups.

### /intake (signup)

GitHub OAuth flow framed as an intake process. After authentication, a short "intake form" collects:
- Username (patient alias)
- Drug of choice (favorite Claude model)
- Hours per day (self-reported usage)
- "Has anyone expressed concern about your usage?" (boolean)

Profile row is created on intake form submission (not during auth callback). Redirects to /my-file after completion.

### /my-file (profile)

Patient file displaying:
- GitHub avatar
- Username and intake date
- "Days clean" counter (calculated from `last_relapse_at`, always resets to 0 via "I relapsed" button)
- Relapse count (lifetime total)
- Badge collection (awarded based on activity)
- List of own posts, evidence submissions, and showcases

### /group-therapy (forum)

Forum with threaded discussions. Categories ("therapy rooms"):
- **Relapse stories:** "I was only going to fix one bug..."
- **Enablers corner:** Tips, workflows, prompts (irony: helping each other use more)
- **Intervention requests:** Help questions
- **Success stories:** "I didn't code for 4 hours" (they're lying)
- **Meta:** Site feedback and feature requests

Each thread shows: title, author, category, reply count, last activity. Thread detail page shows original post and chronological comments.

Pagination: 20 threads per page, offset-based. Sorted by last activity by default.

Post editing and deletion are out of scope for MVP. Users cannot edit or delete posts or comments after submission.

### /clinical-evidence (wall of shame)

User-submitted screenshots of extreme usage: absurd token counts, 3AM timestamps, ridiculous project scopes. Each submission has:
- Screenshot (uploaded to Supabase Storage)
- Description
- Vote count ("Deeply concerning" as the vote label)
- Author attribution

Sorted by most votes by default, with option for newest. Pagination: 20 items per page, offset-based.

### /relapse-gallery (project showcase)

Projects built during a "coding episode." Each showcase card includes:
- Title and description
- Tech stack tags
- Project URL
- Screenshot
- Author

Filterable by tech stack tags. Pagination: 12 items per page (grid layout), offset-based.

### /sponsor (donations)

Simple donation page. Framing: "Your generous contribution funds treatment facilities (server costs) and supports ongoing research (new features)." Links to external payment (Buy Me a Coffee, GitHub Sponsors, or similar).

### Error pages

- **404:** "Patient not found. They may have been discharged."
- **500:** "The facility is experiencing technical difficulties. Our staff is on it."
- **Empty states:** Clinical language per context (e.g., "No evidence has been submitted yet. The patients are covering their tracks.")

## Technical architecture

### Stack

- **Framework:** Next.js 15 (App Router, Server Components by default)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth with GitHub OAuth
- **Storage:** Supabase Storage (evidence screenshots, showcase images)
- **Hosting:** Vercel (free tier)

### Project structure

```
claudict/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── intake/page.tsx
│   ├── my-file/page.tsx
│   ├── group-therapy/
│   │   ├── page.tsx
│   │   └── [postId]/page.tsx
│   ├── clinical-evidence/page.tsx
│   ├── relapse-gallery/page.tsx
│   ├── sponsor/page.tsx
│   └── auth/callback/route.ts
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forum/
│   ├── evidence/
│   └── showcase/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── helpers.ts
│   └── utils.ts
├── middleware.ts              # Next.js middleware (imports from lib/supabase/helpers.ts)
├── supabase/
│   └── migrations/
└── public/
    └── assets/
```

### Data model

**profiles** (extends auth.users)
- `id` uuid PK, FK to auth.users
- `username` text, unique
- `drug_of_choice` text
- `hours_per_day` integer
- `anyone_concerned` boolean
- `relapse_count` integer, default 0
- `last_relapse_at` timestamptz, default now()
- `created_at` timestamptz
- `updated_at` timestamptz

Days clean is calculated: `floor(extract(epoch from now() - last_relapse_at) / 86400)`.

**posts**
- `id` uuid PK
- `author_id` uuid FK profiles
- `category` text, CHECK constraint (relapse_stories, enablers_corner, intervention, success_stories, meta)
- `title` text
- `body` text
- `reply_count` integer, default 0
- `last_activity_at` timestamptz, default now()
- `created_at` timestamptz
- `updated_at` timestamptz

`reply_count` and `last_activity_at` are updated via Postgres trigger on comment insert/delete.

**comments**
- `id` uuid PK
- `post_id` uuid FK posts
- `author_id` uuid FK profiles
- `body` text
- `created_at` timestamptz
- `updated_at` timestamptz

**evidence**
- `id` uuid PK
- `author_id` uuid FK profiles
- `image_url` text
- `description` text
- `vote_count` integer, default 0
- `created_at` timestamptz
- `updated_at` timestamptz

`vote_count` is updated via Postgres trigger on `evidence_votes` insert/delete.

**evidence_votes**
- `evidence_id` uuid FK evidence
- `user_id` uuid FK profiles
- Compound PK (evidence_id, user_id)

**showcases**
- `id` uuid PK
- `author_id` uuid FK profiles
- `title` text
- `description` text
- `tech_stack` text[]
- `project_url` text
- `image_url` text
- `created_at` timestamptz
- `updated_at` timestamptz

**badges**
- `id` uuid PK
- `slug` text, unique
- `name` text
- `description` text
- `icon` text

**profile_badges**
- `profile_id` uuid FK profiles
- `badge_id` uuid FK badges
- `awarded_at` timestamptz
- Compound PK (profile_id, badge_id)

All tables with `updated_at` use a Postgres trigger to auto-set the value on update.

### Row Level Security

**profiles:**
- SELECT: public (all fields are visible, intake answers included as part of the community profile)
- UPDATE: own profile only (`auth.uid() = id`)
- INSERT: authenticated, only own id (`auth.uid() = id`)

**posts, comments, evidence, showcases:**
- SELECT: public
- INSERT: authenticated users only
- UPDATE: own content only (`auth.uid() = author_id`). Note: editing UI is out of scope for MVP, but RLS permits it for future use.
- DELETE: own content only (`auth.uid() = author_id`)

**evidence_votes:**
- SELECT: public
- INSERT: authenticated, one per user per evidence (`auth.uid() = user_id`)
- DELETE: own votes only (`auth.uid() = user_id`)

**badges, profile_badges:**
- SELECT: public
- INSERT/UPDATE/DELETE: service role only (server-side badge awarding)

### Storage

**Bucket: `uploads`**
- Max file size: 5MB
- Allowed MIME types: image/png, image/jpeg, image/webp
- Path convention: `evidence/{user_id}/{uuid}.{ext}` and `showcases/{user_id}/{uuid}.{ext}`
- RLS: authenticated users can insert to their own path (`storage.foldername(name)[1] IN ('evidence','showcases') AND storage.foldername(name)[2] = auth.uid()::text`), public read on all files

### Authentication flow

1. User clicks "Begin intake" on landing page
2. Redirect to Supabase Auth with GitHub provider
3. GitHub OAuth consent screen
4. Callback to /auth/callback, exchanges code for session
5. Check if profile row exists for `auth.uid()`: if not, redirect to /intake
6. Intake form submission creates the profile row with all fields
7. If profile exists, redirect to /group-therapy

### "Days clean" mechanism

- `last_relapse_at` stores the timestamp of the last self-reported relapse
- `relapse_count` tracks lifetime total relapses
- Days clean = calculated difference between now and `last_relapse_at`
- "I relapsed" button on /my-file updates `last_relapse_at` to now() and increments `relapse_count`
- There is no "I stayed clean" action. Only relapses. That's the joke.

### Rate limiting

- "I relapsed" button: 1 click per minute (client-side debounce + server-side check)
- Post/comment creation: 1 per 30 seconds
- Evidence/showcase submission: 1 per 5 minutes
- Voting: 1 per second (client-side debounce)

Implemented at the API route level using simple timestamp checks against the database.

## Visual design

### Design language

Anthropic-inspired design system with warm palette and clean typography. Both light and dark themes supported, respecting system preference with manual toggle.

### Design tokens

**Light theme:**
- Background: #FAFAF7
- Text: #1A1410
- Accent: #D97757 (Anthropic terracotta)
- Border: #E8E4DE
- Muted text: #6B6459
- Surface: #FFFFFF
- Surface elevated: #F0EDE7

**Dark theme:**
- Background: #1A1410
- Text: #F0EDE7
- Accent: #D97757
- Border: #2E2820
- Muted text: #8A8078
- Surface: #221C16
- Surface elevated: #140F0B

### Typography

- Headings: system-ui with serif accent (Georgia) for hero/tagline
- Body: system-ui, -apple-system
- Monospace accents for stats, counters, and clinical data
- Font sizes follow a modular scale

### Component patterns

- Cards with warm border colors and subtle shadows
- Rounded corners (8-10px)
- Generous whitespace
- Warm, muted color palette throughout
- Accent color used sparingly for CTAs and highlights

### SEO and metadata

- Dynamic page titles: "[Page name] | Claudict Recovery Center"
- Meta descriptions per page with clinical framing
- Open Graph image: shared OG image with Claudict branding for social sharing
- Structured data not required for MVP

## Badge system (initial set)

| Badge | Slug | Trigger |
|---|---|---|
| First Admission | first_admission | Complete intake |
| First Relapse | first_relapse | Click "I relapsed" for the first time |
| Serial Relapser | serial_relapser | 10 relapses (checks relapse_count) |
| Terminal Case | terminal_case | 50 relapses (checks relapse_count) |
| Enabler | enabler | Post 10 threads in Enablers corner |
| Group Regular | group_regular | 50 forum comments |
| Evidence Collector | evidence_collector | Submit 5 evidence items |
| Deeply Concerning | deeply_concerning | Receive 100 votes on a single evidence item |
| Show-off | show_off | Submit 5 showcase projects |

Badges are awarded via application logic (checked after relevant actions in API routes). No database triggers for badges to keep logic debuggable and in one place.

## Monetization

Donations only via external service (Buy Me a Coffee or GitHub Sponsors). No ads, no premium tier in MVP. Donation page uses recovery-themed copy.

## Out of scope for MVP

- Real-time chat/messaging
- Email notifications
- Admin dashboard
- Content moderation tools (manual via Supabase dashboard initially)
- API for third-party integrations
- Mobile app
- Search functionality (can use browser search initially)
- User-to-user following
- Rich text editor (markdown only)
- Post/comment editing and deletion UI
