-- ─── Sun* Kudos Live Board — DB Migration ────────────────────────────────
-- Tables: profiles, departments, hashtags, kudos, kudos_hearts,
--         kudos_hashtags, secret_boxes
-- RLS: enabled on all tables; authenticated users can read all, write their own.

-- Enable UUID extension (idempotent)
create extension if not exists "pgcrypto";

-- ─── departments ─────────────────────────────────────────────────────────────

create table if not exists departments (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  created_at timestamptz not null default now()
);

alter table departments enable row level security;

create policy "Anyone authenticated can read departments"
  on departments for select
  to authenticated
  using (true);

-- ─── profiles ────────────────────────────────────────────────────────────────
-- Extends auth.users 1-to-1. Populated by trigger on signup.

create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null default '',
  avatar_url    text,
  department_id uuid references departments(id) on delete set null,
  job_title     text,
  created_at    timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Anyone authenticated can read profiles"
  on profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on new user signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─── hashtags ────────────────────────────────────────────────────────────────

create table if not exists hashtags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  kudos_count integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table hashtags enable row level security;

create policy "Anyone authenticated can read hashtags"
  on hashtags for select
  to authenticated
  using (true);

-- ─── kudos ───────────────────────────────────────────────────────────────────

create table if not exists kudos (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  message     text not null,
  image_urls  text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint kudos_no_self_kudos check (sender_id <> receiver_id)
);

create index if not exists kudos_sender_id_idx    on kudos(sender_id);
create index if not exists kudos_receiver_id_idx  on kudos(receiver_id);
create index if not exists kudos_created_at_idx   on kudos(created_at desc);

alter table kudos enable row level security;

create policy "Anyone authenticated can read kudos"
  on kudos for select
  to authenticated
  using (true);

create policy "Authenticated users can insert their own kudos"
  on kudos for insert
  to authenticated
  with check (auth.uid() = sender_id);

-- ─── kudos_hearts ────────────────────────────────────────────────────────────

create table if not exists kudos_hearts (
  id         uuid primary key default gen_random_uuid(),
  kudos_id   uuid not null references kudos(id) on delete cascade,
  user_id    uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (kudos_id, user_id)
);

create index if not exists kudos_hearts_kudos_id_idx on kudos_hearts(kudos_id);
create index if not exists kudos_hearts_user_id_idx  on kudos_hearts(user_id);

alter table kudos_hearts enable row level security;

create policy "Anyone authenticated can read hearts"
  on kudos_hearts for select
  to authenticated
  using (true);

create policy "Authenticated users can toggle their own heart"
  on kudos_hearts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can remove their own heart"
  on kudos_hearts for delete
  to authenticated
  using (auth.uid() = user_id);

-- ─── kudos_hashtags (join table) ─────────────────────────────────────────────

create table if not exists kudos_hashtags (
  kudos_id   uuid not null references kudos(id) on delete cascade,
  hashtag_id uuid not null references hashtags(id) on delete cascade,
  primary key (kudos_id, hashtag_id)
);

alter table kudos_hashtags enable row level security;

create policy "Anyone authenticated can read kudos_hashtags"
  on kudos_hashtags for select
  to authenticated
  using (true);

create policy "Authenticated users can insert kudos_hashtags"
  on kudos_hashtags for insert
  to authenticated
  with check (
    exists (
      select 1 from kudos
      where kudos.id = kudos_hashtags.kudos_id
        and kudos.sender_id = auth.uid()
    )
  );

-- ─── secret_boxes ────────────────────────────────────────────────────────────

create table if not exists secret_boxes (
  id               uuid primary key default gen_random_uuid(),
  recipient_id     uuid not null references profiles(id) on delete cascade,
  gift_description text not null default '',
  opened           boolean not null default false,
  created_at       timestamptz not null default now()
);

create index if not exists secret_boxes_recipient_id_idx on secret_boxes(recipient_id);

alter table secret_boxes enable row level security;

create policy "Users can read their own secret boxes"
  on secret_boxes for select
  to authenticated
  using (auth.uid() = recipient_id);

-- Admin can insert secret boxes (service role only)

-- ─── Realtime publication ─────────────────────────────────────────────────────

-- Enable realtime for the kudos table so useKudosFeed hook receives live inserts
alter publication supabase_realtime add table kudos;
