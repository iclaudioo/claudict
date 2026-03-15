# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Community website voor Claude Code-verslaafden. Satirisch verslavingskliniek-thema over een functionele community met forum, wall of shame, project showcase en GitHub OAuth.

**URL:** claudict.com

## Stack

- Next.js 15 (App Router, Server Components default)
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth met GitHub OAuth, Storage)
- Vercel (hosting)

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

## Documenten

- **Spec:** `docs/superpowers/specs/2026-03-15-claudict-design.md`
- **Implementatieplan:** `docs/superpowers/plans/2026-03-15-claudict-implementation.md`

## Architectuur

### Supabase clients

Drie clients voor verschillende contexten:
- `lib/supabase/client.ts`: browser client (Client Components)
- `lib/supabase/server.ts`: server client (Server Components, API routes) + `createServiceClient()` voor service role operaties
- `lib/supabase/helpers.ts`: gedeelde helpers, gebruikt door `middleware.ts`

`createServiceClient()` is nodig voor badge inserts. RLS op `profile_badges` blokkeert anon key, alleen service role mag schrijven.

### Data flow

- Server Components halen data op via `createClient()` uit `lib/supabase/server.ts`
- Client Components gebruiken browser client voor mutaties (votes, relapse button, form submissions)
- Auth callback via `/auth/callback/route.ts` wisselt OAuth code voor sessie
- `middleware.ts` refresht sessie-tokens op elke request

### Database triggers

- `reply_count` en `last_activity_at` op posts: bijgewerkt via Postgres trigger bij comment insert/delete
- `vote_count` op evidence: bijgewerkt via Postgres trigger bij evidence_votes insert/delete
- `updated_at` op alle tabellen: auto-set via trigger

### Badge systeem

Badges worden **niet** via database triggers toegekend. Applicatielogica in API routes checkt criteria na relevante acties en gebruikt `createServiceClient()` voor inserts.

## Design system

Anthropic-inspired design met warm palet. Light en dark theme.

### Design tokens

| Token | Light | Dark |
|---|---|---|
| Background | #FAFAF7 | #1A1410 |
| Text | #1A1410 | #F0EDE7 |
| Accent | #D97757 | #D97757 |
| Border | #E8E4DE | #2E2820 |
| Muted | #6B6459 | #8A8078 |
| Surface | #FFFFFF | #221C16 |
| Surface elevated | #F0EDE7 | #140F0B |

### Typografie

- Headings: system-ui, serif accent (Georgia) voor hero
- Body: system-ui, -apple-system
- Stats/counters: monospace

## Thema-taal (klinische metaforen)

Alle UI-tekst gebruikt verslavingskliniek-taal:

- Signup = "Intake"
- Profiel = "Patient file"
- Forum = "Group therapy"
- Wall of shame = "Clinical evidence"
- Showcase = "Relapse gallery"
- Login = "Return to facility"
- Logout = "Leave facility"
- Donaties = "Sponsor a recovery"
- Vote = "Deeply concerning"

## Conventies

- Taal in de app: Engels
- Server Components als default, Client Components alleen voor interactiviteit
- Shared constants in `lib/constants.ts`
- Utility functies in `lib/utils.ts`
- Category labels altijd via `CATEGORIES` constant, niet inline
- Storage pad: `evidence/{user_id}/{uuid}.{ext}` en `showcases/{user_id}/{uuid}.{ext}`
- Paginering: offset-based, 20 items (forum/evidence), 12 items (showcase grid)
- Rate limiting: server-side timestamp checks in API routes

## Formattering

- Sentence case in alle koppen (alleen eerste woord en eigennamen met hoofdletter)
- Geen em dashes. Gebruik punt, komma of dubbele punt.
