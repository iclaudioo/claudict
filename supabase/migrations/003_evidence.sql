create table public.evidence (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  image_url text not null,
  description text not null,
  vote_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.evidence_votes (
  evidence_id uuid not null references public.evidence(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (evidence_id, user_id)
);
