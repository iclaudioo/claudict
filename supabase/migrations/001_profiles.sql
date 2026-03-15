create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  drug_of_choice text not null,
  hours_per_day integer not null,
  anyone_concerned boolean not null default false,
  relapse_count integer not null default 0,
  last_relapse_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
