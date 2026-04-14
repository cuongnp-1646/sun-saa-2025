-- ─── Backfill profiles for existing auth.users ───────────────────────────────
-- Users who signed up via Google OAuth before the handle_new_user trigger was
-- deployed do not have a profiles row. This migration creates missing rows.

insert into public.profiles (id, name, avatar_url)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', u.email, ''),
  u.raw_user_meta_data->>'avatar_url'
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);
