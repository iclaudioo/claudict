-- Atomic increment functions to fix race conditions in read-modify-write patterns

CREATE OR REPLACE FUNCTION increment_site_stat(stat_key text)
RETURNS integer AS $$
DECLARE
  new_val integer;
BEGIN
  UPDATE site_stats SET value = value + 1, updated_at = now() WHERE key = stat_key RETURNING value INTO new_val;
  RETURN COALESCE(new_val, 0);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_relapse_count(user_id uuid)
RETURNS integer AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE profiles SET relapse_count = relapse_count + 1, last_relapse_at = now() WHERE id = user_id RETURNING relapse_count INTO new_count;
  RETURN COALESCE(new_count, 0);
END;
$$ LANGUAGE plpgsql;
