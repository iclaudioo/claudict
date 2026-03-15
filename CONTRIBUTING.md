# Contributing to Claudict

Claudict is a community project. Whether you write code, suggest ideas, or report bugs: all contributions are welcome.

## Ways to contribute

### No code required

- **Report a bug**: [open an issue](https://github.com/iclaudioo/claudict/issues/new?template=bug.yml)
- **Suggest a feature**: [open an issue](https://github.com/iclaudioo/claudict/issues/new?template=feature.yml)
- **Share an idea or discuss**: visit [Discussions](https://github.com/iclaudioo/claudict/discussions)

### Code contributions

1. Fork the repo
2. Create a branch from `main` (`git checkout -b my-feature`)
3. Make your changes
4. Run `npm run build` to verify the build passes
5. Commit with a clear message
6. Open a pull request

## Local setup

```bash
git clone https://github.com/<your-fork>/claudict.git
cd claudict
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

You need your own Supabase project with the migrations from `supabase/migrations/` applied.

```bash
npm run dev
```

## Tech stack

- Next.js 15 (App Router, Server Components default)
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth, Storage)

## Conventions

- **Language in the app**: English
- **Headings**: sentence case (only first word and proper nouns capitalized)
- **No em dashes**. Use periods, commas, or colons.
- Server Components by default. Client Components only for interactivity.
- All UI text uses the addiction clinic metaphor (see `CLAUDE.md` for the full glossary).

## Good first issues

Look for issues labeled [`good first issue`](https://github.com/iclaudioo/claudict/labels/good%20first%20issue). These are scoped, well-described tasks suited for newcomers.

## Questions?

Open a thread in [Discussions](https://github.com/iclaudioo/claudict/discussions). No question is too small.
