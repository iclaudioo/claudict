-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.evidence enable row level security;
alter table public.evidence_votes enable row level security;
alter table public.showcases enable row level security;
alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;

-- Profiles
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Posts
create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Authenticated users can create posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = author_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = author_id);

-- Comments
create policy "Comments are viewable by everyone" on public.comments for select using (true);
create policy "Authenticated users can create comments" on public.comments for insert with check (auth.uid() = author_id);
create policy "Users can update own comments" on public.comments for update using (auth.uid() = author_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = author_id);

-- Evidence
create policy "Evidence is viewable by everyone" on public.evidence for select using (true);
create policy "Authenticated users can submit evidence" on public.evidence for insert with check (auth.uid() = author_id);
create policy "Users can update own evidence" on public.evidence for update using (auth.uid() = author_id);
create policy "Users can delete own evidence" on public.evidence for delete using (auth.uid() = author_id);

-- Evidence votes
create policy "Votes are viewable by everyone" on public.evidence_votes for select using (true);
create policy "Authenticated users can vote" on public.evidence_votes for insert with check (auth.uid() = user_id);
create policy "Users can remove own vote" on public.evidence_votes for delete using (auth.uid() = user_id);

-- Showcases
create policy "Showcases are viewable by everyone" on public.showcases for select using (true);
create policy "Authenticated users can create showcases" on public.showcases for insert with check (auth.uid() = author_id);
create policy "Users can update own showcases" on public.showcases for update using (auth.uid() = author_id);
create policy "Users can delete own showcases" on public.showcases for delete using (auth.uid() = author_id);

-- Badges (read-only for users)
create policy "Badges are viewable by everyone" on public.badges for select using (true);
create policy "Profile badges are viewable by everyone" on public.profile_badges for select using (true);
