-- Indexes for frequently filtered/sorted columns
create index idx_posts_category on public.posts(category);
create index idx_posts_last_activity_at on public.posts(last_activity_at desc);
create index idx_posts_author_id on public.posts(author_id);
create index idx_comments_post_id on public.comments(post_id);
create index idx_comments_author_id on public.comments(author_id);
create index idx_evidence_vote_count on public.evidence(vote_count desc);
create index idx_evidence_author_id on public.evidence(author_id);
create index idx_showcases_author_id on public.showcases(author_id);
create index idx_showcases_created_at on public.showcases(created_at desc);
create index idx_profile_badges_profile_id on public.profile_badges(profile_id);
