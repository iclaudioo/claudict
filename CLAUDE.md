# Claudict Recovery Center

## Project

Community website voor Claude Code-verslaafden. Satirisch verslavingskliniek-thema over een functionele community met forum, wall of shame, project showcase en GitHub OAuth.

**URL:** claudict.com

## Stack

- Next.js 15 (App Router, Server Components default)
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth met GitHub OAuth, Storage)
- Vercel (hosting)

## Documenten

- **Spec:** `docs/superpowers/specs/2026-03-15-claudict-design.md`
- **Implementatieplan:** `docs/superpowers/plans/2026-03-15-claudict-implementation.md`

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
- Supabase service role client (`createServiceClient`) voor badge inserts (RLS blokkeert anon key op `profile_badges`)
- Shared constants in `lib/constants.ts`
- Utility functies in `lib/utils.ts`
- Category labels altijd via `CATEGORIES` constant, niet inline

## Formattering

- Sentence case in alle koppen (alleen eerste woord en eigennamen met hoofdletter)
- Geen em dashes. Gebruik punt, komma of dubbele punt.
