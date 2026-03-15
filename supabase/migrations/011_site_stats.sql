-- Site-wide stats (thoughts & prayers counter, etc.)
create table if not exists site_stats (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz default now()
);

-- Seed the thoughts & prayers counter
insert into site_stats (key, value) values ('thoughts_and_prayers', 0)
on conflict (key) do nothing;

-- Allow anyone to read
alter table site_stats enable row level security;
create policy "Anyone can read site_stats" on site_stats for select using (true);

-- Only service role can update (via API route)
create policy "Service role can update site_stats" on site_stats for update using (true);
