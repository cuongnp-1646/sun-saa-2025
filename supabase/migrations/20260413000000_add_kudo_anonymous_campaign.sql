-- ─── Sun* Kudos — Add anonymous flag + campaigns ─────────────────────────────
-- Depends on: 20260409000000_kudos_live_board.sql
-- Tables added/modified: campaigns (NEW), kudos (ALTER)
-- Storage: kudos-images bucket RLS policies

-- ─── campaigns ────────────────────────────────────────────────────────────────
-- Stores award/campaign types displayed in the Viết KUDO modal (Frame 552).
-- Populated via seed; end users cannot insert.

create table if not exists campaigns (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null unique,  -- e.g. "IDOL GIỚI TRẺ"
  slug       text        not null unique,  -- URL-safe, e.g. "idol-gioi-tre"
  created_at timestamptz not null default now()
);

alter table campaigns enable row level security;

create policy "Anyone authenticated can read campaigns"
  on campaigns for select
  to authenticated
  using (true);

-- ─── kudos — add is_anonymous + campaign_id ──────────────────────────────────

alter table kudos
  add column if not exists is_anonymous boolean not null default false;

alter table kudos
  add column if not exists campaign_id uuid references campaigns(id) on delete set null;

create index if not exists kudos_campaign_id_idx on kudos(campaign_id);

-- ─── Storage: kudos-images RLS ────────────────────────────────────────────────
-- Bucket is declared in config.toml [storage.buckets.kudos-images].
-- These policies control object-level access inside that bucket.

-- Anyone authenticated can view images (public CDN read)
create policy "Public read kudos images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'kudos-images');

-- Authenticated users can upload to their own path prefix only
create policy "Authenticated users can upload kudos images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'kudos-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Authenticated users can delete their own images
create policy "Users can delete their own kudos images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'kudos-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
