-- Auto-update updated_at on all tables
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = public;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.posts
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.comments
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.evidence
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.showcases
  for each row execute function public.handle_updated_at();

-- Update reply_count and last_activity_at on posts when comments change
create or replace function public.handle_comment_change()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.posts
    set reply_count = reply_count + 1,
        last_activity_at = now()
    where id = new.post_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.posts
    set reply_count = greatest(0, reply_count - 1)
    where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql
set search_path = public;

create trigger on_comment_insert after insert on public.comments
  for each row execute function public.handle_comment_change();
create trigger on_comment_delete after delete on public.comments
  for each row execute function public.handle_comment_change();

-- Update vote_count on evidence when votes change
create or replace function public.handle_vote_change()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.evidence
    set vote_count = vote_count + 1
    where id = new.evidence_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.evidence
    set vote_count = greatest(0, vote_count - 1)
    where id = old.evidence_id;
    return old;
  end if;
end;
$$ language plpgsql
set search_path = public;

create trigger on_vote_insert after insert on public.evidence_votes
  for each row execute function public.handle_vote_change();
create trigger on_vote_delete after delete on public.evidence_votes
  for each row execute function public.handle_vote_change();
