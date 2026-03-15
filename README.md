# Claudict Recovery Center

A community website for Claude Code addicts. Built as a satirical addiction clinic, but functioning as a real community with forum, wall of shame, project showcase, and GitHub OAuth.

**URL:** claudict.com

## Tech stack

- Next.js 15 (App Router, Server Components)
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth with GitHub OAuth, Storage)
- Vercel (hosting)

## Setup

### 1. Environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### 2. Database migrations

Run all SQL files in `supabase/migrations/` in order (001 through 010) against your Supabase project. This creates tables, triggers, RLS policies, storage buckets, seed data, and indexes.

### 3. GitHub OAuth

1. Create a GitHub OAuth App at Settings > Developer Settings > OAuth Apps
   - Callback URL: `https://<your-supabase-ref>.supabase.co/auth/v1/callback`
2. In Supabase dashboard, enable GitHub provider under Authentication > Providers and enter the Client ID and Secret

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Deploy to Vercel:

1. Connect your GitHub repo to Vercel
2. Add the three environment variables in Vercel project settings
3. Deploy

## Contributing

Claudict is a community project. Everyone can contribute:

- **Ideas and feedback**: [Discussions](https://github.com/iclaudioo/claudict/discussions)
- **Bug reports and feature requests**: [Issues](https://github.com/iclaudioo/claudict/issues/new/choose)
- **Code**: see [CONTRIBUTING.md](CONTRIBUTING.md)

## Features

- **Intake** (signup): GitHub OAuth with addiction questionnaire
- **Group therapy** (forum): categorized discussions with replies
- **Clinical evidence** (wall of shame): screenshot uploads with voting
- **Relapse gallery** (showcase): project submissions with tech stack tags
- **Patient file** (profile): stats, badges, relapse counter
- **9 achievement badges**: from "First Admission" to "Terminal Case"
- **Theme toggle**: light and dark mode
- **Relapse button**: increment your relapse counter from anywhere
