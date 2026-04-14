-- ─── Sun* Kudos — Auto-maintain hashtags.kudos_count ─────────────────────────
-- Problem: kudos_count on hashtags is read + sorted by GET /api/hashtags
-- (services/kudos.ts fetchHashtags) but was never updated after real kudos
-- are inserted. Without this trigger, all counts stay at seed values (0).
--
-- Fix: trigger on kudos_hashtags that increments on INSERT, decrements on DELETE.
-- Depends on: 20260409000000_kudos_live_board.sql

-- ─── Trigger function ─────────────────────────────────────────────────────────

create or replace function update_hashtag_kudos_count()
returns trigger language plpgsql security definer as $$
begin
  if TG_OP = 'INSERT' then
    update hashtags
    set kudos_count = kudos_count + 1
    where id = NEW.hashtag_id;
    return NEW;
  elsif TG_OP = 'DELETE' then
    update hashtags
    set kudos_count = greatest(kudos_count - 1, 0)  -- floor at 0, never negative
    where id = OLD.hashtag_id;
    return OLD;
  end if;
  return null;
end;
$$;

-- ─── Trigger ─────────────────────────────────────────────────────────────────

drop trigger if exists on_kudos_hashtag_change on kudos_hashtags;

create trigger on_kudos_hashtag_change
  after insert or delete
  on kudos_hashtags
  for each row
  execute procedure update_hashtag_kudos_count();
