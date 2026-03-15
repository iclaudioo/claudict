-- Track intake starts separately (counter goes up when quiz starts, not on profile completion)
insert into site_stats (key, value)
values ('intake_starts', (select count(*) from profiles))
on conflict (key) do nothing;
