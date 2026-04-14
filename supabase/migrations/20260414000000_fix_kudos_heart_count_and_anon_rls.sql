-- ─── Sun* Kudos — Fix heart_count + anon RLS read policies ──────────────────
-- Problems fixed:
--   1. fetchHighlightKudos ordered by kudos_hearts_count which doesn't exist.
--      Add a materialized heart_count column maintained by trigger.
--   2. RLS policies only allowed `authenticated` role, so unauthenticated
--      visitors of the public /kudos page (anon role) received no data.
--      Add matching `to anon` read policies for all public tables.
--   3. fetchTopGiftRecipients queried opened=false (wrong).
--      No migration change needed — fixed in service layer.
-- Depends on: 20260409000000_kudos_live_board.sql

-- ─── 1. Add heart_count to kudos ─────────────────────────────────────────────

alter table kudos
  add column if not exists heart_count integer not null default 0;

create index if not exists kudos_heart_count_idx on kudos(heart_count desc);

-- Backfill existing rows from kudos_hearts
update kudos k
set heart_count = (
  select count(*) from kudos_hearts kh where kh.kudos_id = k.id
);

-- ─── 2. Trigger: maintain kudos.heart_count on kudos_hearts change ────────────

create or replace function update_kudos_heart_count()
returns trigger language plpgsql security definer as $$
begin
  if TG_OP = 'INSERT' then
    update kudos set heart_count = heart_count + 1 where id = NEW.kudos_id;
    return NEW;
  elsif TG_OP = 'DELETE' then
    update kudos set heart_count = greatest(heart_count - 1, 0) where id = OLD.kudos_id;
    return OLD;
  end if;
  return null;
end;
$$;

drop trigger if exists on_kudos_heart_change on kudos_hearts;

create trigger on_kudos_heart_change
  after insert or delete
  on kudos_hearts
  for each row
  execute procedure update_kudos_heart_count();

-- ─── 3. Anon read policies (public /kudos page is unauthenticated-accessible) ─
-- The page is publicly accessible; unauthenticated users use the `anon` role.
-- Mirror every existing authenticated SELECT policy with a matching anon one.

create policy "Anon can read departments"
  on departments for select
  to anon
  using (true);

create policy "Anon can read profiles"
  on profiles for select
  to anon
  using (true);

create policy "Anon can read hashtags"
  on hashtags for select
  to anon
  using (true);

create policy "Anon can read kudos"
  on kudos for select
  to anon
  using (true);

create policy "Anon can read kudos_hearts"
  on kudos_hearts for select
  to anon
  using (true);

create policy "Anon can read kudos_hashtags"
  on kudos_hashtags for select
  to anon
  using (true);
