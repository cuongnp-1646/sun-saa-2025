# Implementation Plan: Viết Kudo (Write Kudo Modal)

**Frame**: `ihQ26W78P2-viet-kudo`
**Date**: 2026-04-13
**Spec**: `specs/ihQ26W78P2-viet-kudo/spec.md`
**Design**: `specs/ihQ26W78P2-viet-kudo/design-style.md`

---

## Summary

Replace the existing simplified `SendKudosDialog` with the full Viết KUDO modal as designed in Figma (`ihQ26W78P2`). The modal is cream-yellow (`#FFF8E1`), 752px wide, and contains: recipient autocomplete, campaign/award type selector (Frame 552 — pending Q1 clarification), a rich-text editor with 6 formatting tools, hashtag chip input (max 5), image upload (max 5), anonymous toggle, and Cancel/Send action buttons.

Key constraint: an existing `SendKudosDialog` is already in production — the plan replaces it in-place to avoid breaking the live board that mounts it.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**UI Library**: React 19
**Styling**: TailwindCSS 4 + CSS custom properties in `globals.css`
**Auth & Database**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
**Testing**: Vitest + happy-dom + @vitejs/plugin-react
**State Management**: Local React state (no global store needed for modal)
**API Style**: REST (Next.js Route Handlers)
**Package Manager**: Yarn 1.22.22

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, single-quote strings, 2-space indent)
- [x] Uses approved tech stack (Next.js 15, React 19, TypeScript strict, TailwindCSS 4, Supabase)
- [x] Adheres to folder structure (`src/components/kudos/`, `src/app/api/`, `src/types/`, `src/services/`)
- [x] Meets security requirements (input sanitization server-side via Zod, auth check on POST, image type validation, DOMPurify for rich-text HTML rendering)
- [x] Follows TDD standards (tests written and approved before implementation code)
- [x] Design tokens defined as CSS variables in `globals.css`, consumed via Tailwind
- [x] Icons: existing codebase uses `<img>` with SVG files in `public/assets/` (see `SendKudosInput.tsx`). No `<Icon />` component exists. Follow existing `<img>` pattern for consistency; SVG files referenced from `public/assets/kudos/icons/`.
- [x] Navigation URLs derived from `ROUTES` / `SCREENFLOW.md`

**Violations (require justification):**

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| New dependency: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-placeholder` | Rich-text editor with Bold/Italic/Strikethrough/OrderedList/Link/Blockquote cannot be built without either a library or deprecated `document.execCommand`. Tiptap is headless, tree-shakeable, and well-maintained. Use **v2.9+** which has React 19 support; or v3.x if available. | `document.execCommand` is deprecated (MDN); `slate-react` heavier; `quill` not React 19 compatible. |
| New dependency: `isomorphic-dompurify` | Tiptap outputs HTML stored in DB. Before rendering via `dangerouslySetInnerHTML` in `KudoPostCard`, the HTML must be sanitized to prevent XSS (OWASP A03 — constitution §IV). `isomorphic-dompurify` works in both SSR (Next.js Server Components) and client. | `dompurify` alone fails in Node.js SSR without `jsdom`. |
| New API route: `POST /api/upload` | Image upload requires server-side file handling + Supabase Storage. No existing upload endpoint. | N/A — genuinely new capability. |
| New DB migration: `kudos.is_anonymous`, `kudos.campaign_id` | `is_anonymous` field is required for anonymous send (FR-006). `campaign_id` is needed for Frame 552 (pending Q1). | Not adding would leave FR-006 unimplementable. |

---

## Codebase Research Summary

### What already exists

| Asset | Location | Status |
|-------|----------|--------|
| `SendKudosDialog` | `src/components/kudos/SendKudosDialog.tsx` | **Replace** — exists but lacks rich-text, chips, image upload, anonymous, campaign |
| `SendKudosInput` | `src/components/kudos/SendKudosInput.tsx` | **Keep unchanged** — pill trigger that opens the dialog |
| `POST /api/kudos` | `src/app/api/kudos/route.ts` | **Extend** — add `isAnonymous`, `campaignId` to Zod schema |
| `GET /api/sunners` | `src/app/api/sunners/route.ts` | **Reuse as-is** — `?q=&limit=` autocomplete already correct |
| `GET /api/hashtags` | `src/app/api/hashtags/route.ts` | **Reuse as-is** — returns `{ data: Hashtag[] }` |
| `Kudos`, `Sunner`, `Hashtag` types | `src/types/kudos.ts` | **Extend** — add `isAnonymous: boolean`, `campaignId?: string` to `Kudos` and `KudosRow` |
| `globals.css` | `src/app/globals.css` | **Extend** — add modal-specific design tokens |
| `ROUTES` | `src/config/navigation.ts` | **Keep** — modal has no dedicated URL route |

### What is missing (must create)

| Asset | Location | Notes |
|-------|----------|-------|
| `WriteKudoModal` | `src/components/kudos/WriteKudoModal.tsx` | New: replaces `SendKudosDialog` internals |
| `RecipientSearch` | `src/components/kudos/RecipientSearch.tsx` | New: autocomplete with dropdown |
| `EditorToolbar` | `src/components/kudos/EditorToolbar.tsx` | New: Tiptap toolbar buttons |
| `HashtagSection` | `src/components/kudos/HashtagSection.tsx` | New: chip input, max 5 |
| `HashtagChip` | `src/components/kudos/HashtagChip.tsx` | New: individual chip with remove |
| `ImageUploadSection` | `src/components/kudos/ImageUploadSection.tsx` | New: thumbnail grid + file picker |
| `ImageThumbnail` | `src/components/kudos/ImageThumbnail.tsx` | New: 80×80 with remove button |
| `AnonymousToggle` | `src/components/kudos/AnonymousToggle.tsx` | New: checkbox + label |
| `CampaignSelector` | `src/components/kudos/CampaignSelector.tsx` | New: dropdown (pending Q1) |
| `useWriteKudo` | `src/hooks/useWriteKudo.ts` | New: form state + submit logic |
| `POST /api/upload` | `src/app/api/upload/route.ts` | New: multipart image upload → Supabase Storage |
| `GET /api/campaigns` | `src/app/api/campaigns/route.ts` | New: list campaign/award types (pending Q1) |
| DB migration | `supabase/migrations/` | Add `is_anonymous`, `campaign_id` to `kudos` table |
| Design tokens | `src/app/globals.css` | Add `--color-bg-modal`, `--color-required`, `--color-delete`, `--radius-modal` |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/components/kudos/`. Each sub-section of the modal is a dedicated component (`RecipientSearch`, `EditorToolbar`, `HashtagSection`, `ImageUploadSection`, `AnonymousToggle`, `CampaignSelector`). The parent `WriteKudoModal` composes them via `useWriteKudo` hook.
- **Styling Strategy**: Tailwind utility classes for layout/spacing; CSS variables from `globals.css` for design tokens (colors, radii, borders). Hard-coded hex values are **forbidden** in component files.
- **Rich Text**: Tiptap (`@tiptap/react` + `@tiptap/starter-kit` + `@tiptap/extension-link`). Editor renders into a `<div>` with `contentEditable`. Tiptap output is HTML; the backend stores it as-is and sanitizes on render.
- **Data Fetching**: Plain `fetch` in `useWriteKudo` hook (debounced for recipient search). Hashtag and campaign lists pre-fetched when modal opens via `useEffect`. No React Query needed for this scope.
- **Form State**: All in `useWriteKudo` custom hook — keeps `WriteKudoModal` clean. Hook exposes form values, handlers, validation errors, and submit function.
- **Image Upload Flow**: Client picks file → `POST /api/upload` (multipart) → Supabase Storage → returns public URL → stored in local state → included in `POST /api/kudos` payload as `imageUrls[]`.
- **Modal Mounting**: `WriteKudoModal` is rendered inside `KudosPage` (same as current `SendKudosDialog`), controlled by `isOpen` prop. Focus trap via `useEffect` + `tabIndex`.

### Backend Approach

- **API Design**: Extend existing `POST /api/kudos` route to accept `isAnonymous: boolean` and `campaignId?: string`. New `POST /api/upload` handles multipart image → Supabase Storage.
- **Data Access**: Continue existing pattern — Supabase client in route handlers, no new abstraction needed.
- **Validation**: Zod schemas for all route inputs. Image validation: MIME type check (image/jpeg, image/png, image/webp), max 5MB per file.
- **Anonymous handling**: `is_anonymous` stored in DB. When `true`, the `GET /api/kudos` service returns `sender` as `{ id: "anonymous", name: "Ẩn danh", avatarUrl: null, ... }` OR omits sender based on Q4 resolution.

### Integration Points

- **Existing Services**: `fetchHashtags()` in `src/services/kudos.ts` — reused via new `GET /api/hashtags` call on modal open.
- **Shared Components**: `<Button variant="primary|outline">` pattern — create `<Button>` shared component if not present, or inline styles matching constitution.
- **API Contracts**: `POST /api/kudos` schema extended. Consumers (`KudosPage`, `SendKudosInput`, `KudosFeed`) remain unchanged — only `SendKudosDialog` reference is replaced by `WriteKudoModal`.

---

## Database Design

> All schema changes live in `supabase/migrations/YYYYMMDD_add_kudo_anonymous_campaign.sql`. The existing `20260409000000_kudos_live_board.sql` must **not** be modified — additive migrations only.

### Current Schema (relevant tables)

```
profiles          hashtags           kudos
─────────────     ──────────         ──────────────────────────────────
id (PK)           id (PK)            id (PK)
name              name               sender_id  → profiles.id
avatar_url        kudos_count        receiver_id → profiles.id
department_id     created_at         message (text)
job_title                            image_urls (text[])
created_at                           created_at / updated_at
                                     ← MISSING: is_anonymous, campaign_id

kudos_hashtags    kudos_hearts
──────────────    ───────────
kudos_id (FK)     id (PK)
hashtag_id (FK)   kudos_id (FK)
                  user_id (FK)
                  created_at
```

### New Tables

#### `campaigns`

Stores the award/campaign types shown in Frame 552 (pending Q1 clarification — create now, populate later).

```sql
create table if not exists campaigns (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null unique,   -- e.g. "IDOL GIỚI TRẺ", "BEST TEAMWORK"
  slug       text        not null unique,   -- URL-safe identifier
  created_at timestamptz not null default now()
);

alter table campaigns enable row level security;

create policy "Anyone authenticated can read campaigns"
  on campaigns for select
  to authenticated
  using (true);

-- Admin/service role inserts campaigns (no end-user insert policy)
```

**ERD position**: `campaigns` is referenced by `kudos.campaign_id`.

### Modified Tables

#### `kudos` — Add 2 columns

```sql
-- Add anonymous flag
alter table kudos
  add column if not exists is_anonymous boolean not null default false;

-- Add campaign reference (nullable: a kudo may not belong to any campaign)
alter table kudos
  add column if not exists campaign_id uuid references campaigns(id) on delete set null;

-- Index for filtering kudos by campaign
create index if not exists kudos_campaign_id_idx on kudos(campaign_id);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `is_anonymous` | `boolean` | NOT NULL | `false` | When `true`, sender identity is masked in all API responses |
| `campaign_id` | `uuid` | NULL | `NULL` | FK to `campaigns.id`; optional campaign/award association |

#### `hashtags` — No schema change needed

`kudos_count` is already maintained. No new columns required.

### Supabase Storage

#### Bucket: `kudos-images`

| Property | Value |
|----------|-------|
| Bucket name | `kudos-images` |
| Public | `true` (images are publicly readable via CDN URL) |
| File size limit | 5 MB per file |
| Allowed MIME types | `image/jpeg`, `image/png`, `image/webp` |
| Path pattern | `{userId}/{uuid}.{ext}` |

**Create via Supabase Dashboard or CLI:**
```bash
# supabase/seed.sql or dashboard
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kudos-images', 'kudos-images', true, 5242880,
  array['image/jpeg','image/png','image/webp']
) on conflict (id) do nothing;
```

**Storage RLS policies:**
```sql
-- Anyone authenticated can read images
create policy "Public read kudos images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'kudos-images');

-- Only the uploader can insert (enforced by path prefix = auth.uid())
create policy "Authenticated users can upload kudos images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'kudos-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Only the uploader can delete their own images
create policy "Users can delete their own kudos images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'kudos-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
```

### Full ERD (after migration)

```
departments          campaigns
────────────         ──────────────────
id (PK)              id (PK)
name                 name
created_at           slug
                     created_at
     │                    │
     │ 0..*               │ 0..*
     ▼                    ▼
profiles            kudos
──────────────      ──────────────────────────────────
id (PK)  ◄──────── sender_id   (FK, NOT NULL)
name             ◄─ receiver_id (FK, NOT NULL)
avatar_url          message     (text, NOT NULL)
department_id (FK)  image_urls  (text[], default '{}')
job_title           is_anonymous (boolean, default false)  ← NEW
created_at          campaign_id  (FK → campaigns, NULL)    ← NEW
                    created_at
                    updated_at
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       kudos_hearts          kudos_hashtags
       ────────────          ──────────────
       id (PK)               kudos_id (FK)
       kudos_id (FK)         hashtag_id (FK)
       user_id (FK)
       created_at                   │
                                    ▼
                             hashtags
                             ──────────────
                             id (PK)
                             name
                             kudos_count
                             created_at

storage.objects (bucket: kudos-images)
───────────────────────────────────────
{userId}/{uuid}.{ext}   ← path pattern
```

### Anonymous Sender Masking

When `is_anonymous = true`, the sender identity **must not** leak through any API response. Masking happens at the service layer (not in DB via triggers/views) to keep it auditable:

```ts
// src/services/kudos.ts — toKudos() function
const ANONYMOUS_SUNNER: Sunner = {
  id: 'anonymous',
  name: 'Ẩn danh',
  avatarUrl: null,
  department: null,
  jobTitle: null,
};

function toKudos(row: KudosRow, ...): Kudos {
  return {
    ...
    sender: row.is_anonymous ? ANONYMOUS_SUNNER : mapProfile(row.sender_profile),
    isAnonymous: row.is_anonymous,
    campaignId: row.campaign_id ?? undefined,
  };
}
```

**Security note**: The real `sender_id` is always stored in the DB for audit trails. Masking is presentation-only. If the sender's profile is requested directly (e.g. `GET /api/profiles/:id`), no restriction applies — anonymity applies only to the kudo's sender field in the feed.

### Migration File Checklist

```text
supabase/migrations/
├── 20260409000000_kudos_live_board.sql   ← existing, DO NOT MODIFY
└── YYYYMMDD_add_kudo_anonymous_campaign.sql   ← CREATE THIS
    ├── CREATE TABLE campaigns (...)
    ├── ALTER TABLE kudos ADD COLUMN is_anonymous ...
    ├── ALTER TABLE kudos ADD COLUMN campaign_id ...
    ├── CREATE INDEX kudos_campaign_id_idx ...
    ├── RLS: campaigns select policy
    └── Storage: bucket creation + RLS policies
```

> **Run order**: The new migration must run after `20260409000000`. Supabase applies migrations in filename-timestamp order — use today's date as prefix (e.g. `20260413_...`).

### Seed Data

> **File**: `supabase/seed.sql` (Supabase runs this automatically on `supabase db reset`)
> **Purpose**: Provide realistic local dev / CI data covering all happy-path and edge-case test scenarios.
> **Constraint**: Seeds use `auth.users` → `profiles` flow, so user UUIDs must be inserted into `auth.users` first, then `profiles` is populated via the existing `handle_new_user` trigger (or inserted directly if the trigger is not available in test environments).

#### Seed: `supabase/seed.sql`

```sql
-- ─── Sun* Kudos — Seed Data ───────────────────────────────────────────────────
-- Purpose: local dev + CI test data
-- Run via: supabase db reset (applies migrations then seed.sql)
-- WARNING: Do NOT run against production.

-- ─── 1. departments ──────────────────────────────────────────────────────────

insert into departments (id, name) values
  ('d0000001-0000-0000-0000-000000000001', 'Engineering'),
  ('d0000001-0000-0000-0000-000000000002', 'Design'),
  ('d0000001-0000-0000-0000-000000000003', 'Product'),
  ('d0000001-0000-0000-0000-000000000004', 'Marketing'),
  ('d0000001-0000-0000-0000-000000000005', 'HR & Culture')
on conflict (id) do nothing;

-- ─── 2. auth.users (seed test accounts) ──────────────────────────────────────
-- Supabase local dev: insert directly into auth.users so handle_new_user trigger fires.

insert into auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at, aud, role
) values
  -- Alice Nguyen — Engineering
  ('u0000001-0000-0000-0000-000000000001',
   'alice@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Alice Nguyen"}'::jsonb, now(), now(), 'authenticated', 'authenticated'),
  -- Bob Tran — Design
  ('u0000001-0000-0000-0000-000000000002',
   'bob@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Bob Tran"}'::jsonb, now(), now(), 'authenticated', 'authenticated'),
  -- Carol Le — Product
  ('u0000001-0000-0000-0000-000000000003',
   'carol@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Carol Le"}'::jsonb, now(), now(), 'authenticated', 'authenticated'),
  -- Dave Pham — Marketing
  ('u0000001-0000-0000-0000-000000000004',
   'dave@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Dave Pham"}'::jsonb, now(), now(), 'authenticated', 'authenticated'),
  -- Eve Hoang — HR (anonymous sender test account)
  ('u0000001-0000-0000-0000-000000000005',
   'eve@sun.example', crypt('password123', gen_salt('bf')),
   now(), '{"full_name":"Eve Hoang"}'::jsonb, now(), now(), 'authenticated', 'authenticated')
on conflict (id) do nothing;

-- ─── 3. profiles (fill in job_title + department after trigger creates rows) ──

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000001',
  job_title     = 'Backend Engineer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Alice'
where id = 'u0000001-0000-0000-0000-000000000001';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000002',
  job_title     = 'UI/UX Designer',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Bob'
where id = 'u0000001-0000-0000-0000-000000000002';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000003',
  job_title     = 'Product Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Carol'
where id = 'u0000001-0000-0000-0000-000000000003';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000004',
  job_title     = 'Marketing Lead',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Dave'
where id = 'u0000001-0000-0000-0000-000000000004';

update profiles set
  department_id = 'd0000001-0000-0000-0000-000000000005',
  job_title     = 'Culture Manager',
  avatar_url    = 'https://api.dicebear.com/7.x/initials/svg?seed=Eve'
where id = 'u0000001-0000-0000-0000-000000000005';

-- ─── 4. hashtags ─────────────────────────────────────────────────────────────

insert into hashtags (id, name, kudos_count) values
  ('h0000001-0000-0000-0000-000000000001', 'teamwork',        5),
  ('h0000001-0000-0000-0000-000000000002', 'innovation',      3),
  ('h0000001-0000-0000-0000-000000000003', 'ownership',       4),
  ('h0000001-0000-0000-0000-000000000004', 'customer-focus',  2),
  ('h0000001-0000-0000-0000-000000000005', 'growth-mindset',  1),
  ('h0000001-0000-0000-0000-000000000006', 'helpfulness',     6),
  ('h0000001-0000-0000-0000-000000000007', 'quality',         3),
  ('h0000001-0000-0000-0000-000000000008', 'communication',   2)
on conflict (id) do nothing;

-- ─── 5. campaigns (award types — Frame 552) ───────────────────────────────────

insert into campaigns (id, name, slug) values
  ('c0000001-0000-0000-0000-000000000001', 'IDOL GIỚI TRẺ',   'idol-gioi-tre'),
  ('c0000001-0000-0000-0000-000000000002', 'BEST TEAMWORK',   'best-teamwork'),
  ('c0000001-0000-0000-0000-000000000003', 'BEST INNOVATION', 'best-innovation'),
  ('c0000001-0000-0000-0000-000000000004', 'RISING STAR',     'rising-star'),
  ('c0000001-0000-0000-0000-000000000005', 'SUN HERO',        'sun-hero')
on conflict (id) do nothing;

-- ─── 6. kudos ────────────────────────────────────────────────────────────────
-- Covers: plain text, rich-text HTML, with/without images, anonymous, with campaign

insert into kudos (id, sender_id, receiver_id, message, image_urls, is_anonymous, campaign_id, created_at, updated_at)
values
  -- K1: Plain text kudo, no images, no campaign
  ('k0000001-0000-0000-0000-000000000001',
   'u0000001-0000-0000-0000-000000000001',  -- Alice → Bob
   'u0000001-0000-0000-0000-000000000002',
   'Cảm ơn Bob đã hỗ trợ thiết kế cho sprint vừa rồi!',
   '{}', false, null,
   now() - interval '3 days', now() - interval '3 days'),

  -- K2: Rich-text HTML message (bold + list), with 2 images, campaign assigned
  ('k0000001-0000-0000-0000-000000000002',
   'u0000001-0000-0000-0000-000000000003',  -- Carol → Alice
   'u0000001-0000-0000-0000-000000000001',
   '<p>Alice là một backend engineer <strong>tuyệt vời</strong>.</p><ol><li>Luôn deliver đúng hạn</li><li>Code review chất lượng</li></ol>',
   array[
     'https://picsum.photos/seed/kudos1/400/300',
     'https://picsum.photos/seed/kudos2/400/300'
   ],
   false,
   'c0000001-0000-0000-0000-000000000001',  -- IDOL GIỚI TRẺ
   now() - interval '2 days', now() - interval '2 days'),

  -- K3: Anonymous kudo (is_anonymous = true)
  ('k0000001-0000-0000-0000-000000000003',
   'u0000001-0000-0000-0000-000000000005',  -- Eve (hidden) → Dave
   'u0000001-0000-0000-0000-000000000004',
   'Bạn đã làm rất tốt chiến dịch marketing tháng này. Cảm ơn bạn rất nhiều!',
   '{}', true, null,
   now() - interval '1 day', now() - interval '1 day'),

  -- K4: Max hashtags (5), with campaign
  ('k0000001-0000-0000-0000-000000000004',
   'u0000001-0000-0000-0000-000000000002',  -- Bob → Carol
   'u0000001-0000-0000-0000-000000000003',
   '<p>Carol đã dẫn dắt team qua một sprint <em>cực kỳ khó</em> với kết quả xuất sắc!</p>',
   '{}', false,
   'c0000001-0000-0000-0000-000000000002',  -- BEST TEAMWORK
   now() - interval '12 hours', now() - interval '12 hours'),

  -- K5: Max images (5), no hashtags
  ('k0000001-0000-0000-0000-000000000005',
   'u0000001-0000-0000-0000-000000000004',  -- Dave → Eve
   'u0000001-0000-0000-0000-000000000005',
   'Eve tổ chức team building thật hoàn hảo!',
   array[
     'https://picsum.photos/seed/kudos3/400/300',
     'https://picsum.photos/seed/kudos4/400/300',
     'https://picsum.photos/seed/kudos5/400/300',
     'https://picsum.photos/seed/kudos6/400/300',
     'https://picsum.photos/seed/kudos7/400/300'
   ],
   false, null,
   now() - interval '6 hours', now() - interval '6 hours')

on conflict (id) do nothing;

-- ─── 7. kudos_hashtags (join table) ──────────────────────────────────────────

insert into kudos_hashtags (kudos_id, hashtag_id) values
  -- K1: teamwork
  ('k0000001-0000-0000-0000-000000000001', 'h0000001-0000-0000-0000-000000000001'),
  -- K2: innovation + quality
  ('k0000001-0000-0000-0000-000000000002', 'h0000001-0000-0000-0000-000000000002'),
  ('k0000001-0000-0000-0000-000000000002', 'h0000001-0000-0000-0000-000000000007'),
  -- K3: helpfulness
  ('k0000001-0000-0000-0000-000000000003', 'h0000001-0000-0000-0000-000000000006'),
  -- K4: teamwork + ownership + customer-focus + growth-mindset + communication (max 5)
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000001'),
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000003'),
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000004'),
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000005'),
  ('k0000001-0000-0000-0000-000000000004', 'h0000001-0000-0000-0000-000000000008')
  -- K5: no hashtags intentionally
on conflict do nothing;

-- ─── 8. kudos_hearts ─────────────────────────────────────────────────────────

insert into kudos_hearts (kudos_id, user_id) values
  ('k0000001-0000-0000-0000-000000000001', 'u0000001-0000-0000-0000-000000000003'),
  ('k0000001-0000-0000-0000-000000000001', 'u0000001-0000-0000-0000-000000000004'),
  ('k0000001-0000-0000-0000-000000000002', 'u0000001-0000-0000-0000-000000000002'),
  ('k0000001-0000-0000-0000-000000000004', 'u0000001-0000-0000-0000-000000000001'),
  ('k0000001-0000-0000-0000-000000000004', 'u0000001-0000-0000-0000-000000000005')
on conflict do nothing;

-- ─── 9. secret_boxes ─────────────────────────────────────────────────────────

insert into secret_boxes (id, recipient_id, gift_description, opened) values
  ('sb000001-0000-0000-0000-000000000001',
   'u0000001-0000-0000-0000-000000000001',  -- Alice has 1 unopened box
   'Voucher ăn trưa 200k', false),
  ('sb000001-0000-0000-0000-000000000002',
   'u0000001-0000-0000-0000-000000000003',  -- Carol has 1 opened box
   'Áo Sun* Limited Edition', true)
on conflict (id) do nothing;

-- ─── 10. Update hashtag kudos_count to match seeded data ─────────────────────
-- (Re-count from kudos_hashtags to keep kudos_count consistent)

update hashtags h
set kudos_count = (
  select count(*) from kudos_hashtags kh where kh.hashtag_id = h.id
);
```

#### Seed Coverage Matrix

| Table | Rows | Edge Cases Covered |
|-------|------|--------------------|
| `departments` | 5 | All main org units |
| `auth.users` + `profiles` | 5 each | Multi-department, varying job titles |
| `hashtags` | 8 | Covers max-5 selection + extras for dropdown |
| `campaigns` | 5 | Award types for Frame 552 dropdown |
| `kudos` | 5 | Plain text / rich HTML / anonymous / max-images / max-hashtags |
| `kudos_hashtags` | 9 | K4 has exactly 5 tags (boundary), K5 has 0 (empty state) |
| `kudos_hearts` | 5 | Multiple hearts per kudo, cross-user |
| `secret_boxes` | 2 | 1 opened + 1 unopened |

#### How to Apply Seeds

```bash
# Reset local DB + re-run migrations + apply seed.sql
supabase db reset

# Or apply seed only (without resetting)
supabase db execute --file supabase/seed.sql
```

> **Note**: `supabase db reset` wipes all local data. Only run against local dev — never staging/production.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/ihQ26W78P2-viet-kudo/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Design style document
├── plan.md              ← This file
└── tasks.md             (next step — /momorph.tasks)
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── globals.css                          MODIFY  add modal tokens
│   └── api/
│       ├── kudos/route.ts                   MODIFY  add isAnonymous, campaignId
│       ├── upload/route.ts                  CREATE  image upload → Supabase Storage
│       └── campaigns/route.ts               CREATE  list campaign types (pending Q1)
│
├── components/kudos/
│   ├── SendKudosDialog.tsx                  DELETE  replaced entirely by WriteKudoModal
│   ├── WriteKudoModal.tsx                   CREATE  full modal (drop-in replacement, same props interface)
│   ├── RecipientSearch.tsx                  CREATE  autocomplete input + dropdown list
│   ├── SearchDropdown.tsx                   CREATE  reusable dropdown list (used by RecipientSearch + CampaignSelector)
│   ├── FieldLabel.tsx                       CREATE  label + required asterisk (shared by all form sections)
│   ├── FieldError.tsx                       CREATE  red error message text below fields
│   ├── KudoEditor.tsx                       CREATE  Tiptap <EditorContent> wrapper (200px height, border, placeholder)
│   ├── EditorToolbar.tsx                    CREATE  6 Tiptap toolbar buttons (Bold/Italic/Strike/List/Link/Quote)
│   ├── ToolbarButton.tsx                    CREATE  single toolbar icon button (toggle state, border #998C5F)
│   ├── HashtagSection.tsx                   CREATE  chip input container + "+ Hashtag" button
│   ├── HashtagChip.tsx                      CREATE  individual tag chip with remove icon
│   ├── ImageUploadSection.tsx               CREATE  file picker trigger + thumbnail grid
│   ├── ImageThumbnail.tsx                   CREATE  80×80 preview with red remove button
│   ├── AnonymousToggle.tsx                  CREATE  checkbox + label (G section)
│   ├── CampaignSelector.tsx                 CREATE  award type dropdown (pending Q1 — stub first)
│   ├── KudoPostCard.tsx                     MODIFY  render message via dangerouslySetInnerHTML + DOMPurify
│   ├── KudosPage.tsx                        MODIFY  import WriteKudoModal instead of SendKudosDialog
│   └── index.ts                             MODIFY  export new components, remove SendKudosDialog export
│
├── hooks/
│   └── useWriteKudo.ts                      CREATE  form state + validation + submit
│
├── types/
│   └── kudos.ts                             MODIFY  add isAnonymous, Campaign type
│
├── services/
│   └── kudos.ts                             MODIFY  update toKudos() for isAnonymous
│
└── test/kudos/
    ├── WriteKudoModal.test.tsx              CREATE  unit tests (TDD — write first)
    ├── RecipientSearch.test.tsx             CREATE  unit tests
    ├── HashtagSection.test.tsx              CREATE  unit tests
    ├── ImageUploadSection.test.tsx          CREATE  unit tests
    ├── AnonymousToggle.test.tsx             CREATE  unit tests
    ├── useWriteKudo.test.ts                 CREATE  hook unit tests
    └── write-kudo-api.test.ts               CREATE  API route integration tests

supabase/migrations/
└── YYYYMMDD_add_kudo_anonymous_campaign.sql CREATE  is_anonymous, campaign_id columns
```

### Dependencies

| Package | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| `@tiptap/react` | `>=2.9.0` | Rich-text editor React binding | No equivalent in current stack; 2.9+ required for React 19 compat |
| `@tiptap/starter-kit` | `>=2.9.0` | Bold, Italic, Strike, OrderedList, Blockquote | Bundled extensions |
| `@tiptap/extension-link` | `>=2.9.0` | Hyperlink insertion | Not included in starter-kit |
| `@tiptap/extension-placeholder` | `>=2.9.0` | Editor placeholder text via CSS | Needed for "Hãy gửi gắm lời cám ơn..." hint in textarea |
| `isomorphic-dompurify` | `^2.x` | XSS sanitization of Tiptap HTML output | SSR-safe; constitution §IV requires XSS prevention |

> **Tiptap React 19 note**: Verify that the installed Tiptap version is 2.9.0+ (or v3.x) before starting Phase 4. Run `yarn info @tiptap/react peerDependencies` to confirm React 19 is listed.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Design Tokens

**Goal**: Lay the CSS foundation before any component work. No UI logic yet.

Tasks:
- Add missing CSS variables to `globals.css`:
  ```css
  --color-bg-modal: #FFF8E1;
  --color-required: #CF1322;
  --color-delete: #D4271D;
  --radius-modal: 24px;
  --radius-send-btn: 8px;
  --shadow-modal: 0 20px 40px rgba(0,0,0,0.30);
  ```
- Verify existing tokens (`--color-border`, `--color-btn-primary-bg`) are usable in the new modal context.
- Download any Figma icon assets not yet in `public/assets/kudos/icons/` (Bold, Italic, Strikethrough, Number List, Link, Quote, Plus, Close Tiny, Send icons).
- Install Tiptap: `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link`.

### Phase 1: Types, Schema & DB Migration (Foundation)

**Goal**: Establish the data contracts before any component or API work.

Tasks:
- Add to `src/types/kudos.ts`:
  ```ts
  export interface Campaign {
    id: string;
    name: string;
  }
  // Extend Kudos:
  isAnonymous: boolean;
  campaignId?: string;
  ```
- Update `KudosRow` to include `is_anonymous: boolean` and `campaign_id: string | null`.
- Update `toKudos()` in `src/services/kudos.ts` to map `is_anonymous` and `campaign_id`.
- Update Zod schema in `POST /api/kudos` to accept `isAnonymous?: boolean` and `campaignId?: string`.
- Write DB migration: `ALTER TABLE kudos ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE NOT NULL; ALTER TABLE kudos ADD COLUMN campaign_id UUID REFERENCES campaigns(id);`
- Create `campaigns` table migration (or clarify with product after Q1 answer).

### Phase 2: API Endpoints

**Goal**: All server capabilities ready so frontend can integrate.

#### 2a. Extend `POST /api/kudos`

- Add `isAnonymous: z.boolean().optional().default(false)` to `createKudosSchema`.
- Add `campaignId: z.string().uuid().optional()` to schema.
- Insert `is_anonymous` and `campaign_id` into `kudos` table.
- In `GET /api/kudos` + `fetchAllKudos`: when `is_anonymous = true`, mask `sender` field as `{ id: "anonymous", name: "Ẩn danh", avatarUrl: null, department: null, jobTitle: null }`.

#### 2b. Create `POST /api/upload`

```
POST /api/upload
Content-Type: multipart/form-data
Body: file (image)
Response: { url: string }
```

- Authenticate user via Supabase session (401 if unauthenticated).
- Validate: MIME type `image/jpeg | image/png | image/webp`, max 5MB.
- Upload to Supabase Storage bucket `kudos-images` at path `{userId}/{uuid}.{ext}`.
- Return public URL.

#### 2c. Create `GET /api/campaigns`

```
GET /api/campaigns
Response: { data: Campaign[] }
```

- Fetches from `campaigns` table (created in Phase 1 migration).
- Ordered alphabetically.
- *(Blocked on Q1 resolution — stub with mock data if Q1 unresolved.)*

### Phase 3: Core Modal — `WriteKudoModal` + `useWriteKudo` + Hashtags (US1, US2, US5, US8)

> **TDD**: Write failing tests in `src/test/kudos/WriteKudoModal.test.tsx`, `RecipientSearch.test.tsx`, `HashtagSection.test.tsx`, `useWriteKudo.test.ts` BEFORE writing any implementation code. Get team/reviewer approval on test cases. Confirm tests fail (Red). Then implement (Green). Refactor.

**Goal**: A working form that can submit a valid kudo. Hashtags are P1 (required for submission) so they ship here alongside the core form.

#### 3a. `useWriteKudo` hook (`src/hooks/useWriteKudo.ts`)

```ts
interface WriteKudoForm {
  recipient: Sunner | null;
  campaignType: Campaign | null;
  message: string;         // plain string for Phase 3 (Tiptap HTML added in Phase 4)
  hashtags: Hashtag[];     // chip array, max 5
  images: File[];          // file objects, max 5
  isAnonymous: boolean;
}
```

Responsibilities:
- `recipientQuery` + debounced `fetchSunners()` (calls `GET /api/sunners?q=&limit=5`, 300ms debounce)
- `availableHashtags: Hashtag[]` — pre-fetched via `GET /api/hashtags` when modal opens
- `fetchCampaigns()` on mount — pre-fetches `GET /api/campaigns`
- `validate()` → returns `Record<'recipient' | 'message' | 'hashtags' | 'campaignType', string>` field errors
- `submit()` → upload images in parallel (`Promise.allSettled`) → then `POST /api/kudos`
- Reset all fields on success
- Expose: `isSubmitting`, `fieldErrors`, `submitError`, `searchResults`

> **Tiptap integration note**: `useEditor()` from `@tiptap/react` MUST be called inside `WriteKudoModal` (a React component), NOT inside `useWriteKudo` (a hook that may be tested without a component). The `editor` instance is passed into `useWriteKudo.setMessage(editor.getHTML())` via an `onEditorChange` callback. This keeps the hook framework-agnostic and testable.

#### 3b. `WriteKudoModal` component (`src/components/kudos/WriteKudoModal.tsx`)

- **Props interface** (identical to deleted `SendKudosDialog`): `{ isOpen: boolean; onClose: () => void; onSuccess?: () => void }`
- Renders: modal backdrop `div` (fixed, `rgba(0,16,26,0.8)`) + cream modal card (`var(--color-bg-modal)`, `var(--radius-modal)`).
- Backdrop click → `onClose()`.
- Focus trap: `useEffect` on `isOpen` focuses first focusable element inside modal; `keydown Escape` → `onClose()`.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="write-kudo-title"`.
- Layout: flex column, gap `var(--spacing-2xl)` (32px), padding 40px desktop / 24px mobile.
- Mounts `useEditor()` (Tiptap) here; passes `editor` to `KudoEditor` and `EditorToolbar`; calls `useWriteKudo.setMessage(editor.getHTML())` on every editor update.
- Scrollable on overflow (modal content can exceed viewport height on mobile).

#### 3c. Shared UI primitives

**`FieldLabel`** (`src/components/kudos/FieldLabel.tsx`):
- Props: `{ label: string; required?: boolean }`
- Renders: label text + `<span aria-hidden="true" style="color: var(--color-required)">*</span>` if required
- Typography: `var(--text-section-label)` (Montserrat 22px/700)

**`FieldError`** (`src/components/kudos/FieldError.tsx`):
- Props: `{ message?: string }`
- Renders only when `message` is non-empty: red text 14px, `var(--color-required)`, `margin-top: 4px`
- `role="alert"` for screen readers

**`SearchDropdown`** (`src/components/kudos/SearchDropdown.tsx`):
- Generic reusable dropdown list used by both `RecipientSearch` and `CampaignSelector`
- Props: `{ items: { id: string; label: string; sublabel?: string }[]; onSelect: (id: string) => void; isLoading?: boolean; emptyText?: string }`
- Style: `var(--color-bg-modal)`, `var(--color-border)` border, `border-radius: 8px`, `max-height: 200px`, `overflow-y: auto`
- Item hover: `rgba(255,234,158,0.3)` bg; selected: `var(--color-accent-primary)`

#### 3d. Form field sub-components (Phase 3)

**`RecipientSearch`** (`src/components/kudos/RecipientSearch.tsx`) — Section B:
- Props: `{ value: Sunner | null; query: string; results: Sunner[]; onQueryChange: (q: string) => void; onSelect: (s: Sunner) => void; onClear: () => void; error?: string }`
- Empty selection: search input (h=56px, border `var(--color-border)`, padding 16px 24px) + `MM_MEDIA_Down` icon
- Selected: chip showing `sunner.name` + clear button (×)
- Below: `<FieldError message={error} />`

**`HashtagSection`** (`src/components/kudos/HashtagSection.tsx`) — Section E:
- Props: `{ selected: Hashtag[]; available: Hashtag[]; onAdd: (tag: Hashtag) => void; onRemove: (id: string) => void; error?: string }`
- "+ Hashtag" button triggers dropdown (uses `<SearchDropdown>`); hidden when `selected.length >= 5`
- Chips: `selected.map(t => <HashtagChip key={t.id} tag={t} onRemove={onRemove} />)`
- Deduplication: `onAdd` checks `selected.some(t => t.id === tag.id)` before adding
- Max 5: "+ Hashtag" hidden/disabled at 5 chips; dropdown options exclude already-selected tags

**`HashtagChip`** (`src/components/kudos/HashtagChip.tsx`):
- Props: `{ tag: Hashtag; onRemove: (id: string) => void }`
- Style: `h-9 px-3 bg-[var(--color-accent-primary)] border border-[var(--color-border)] rounded-full flex gap-1.5 items-center text-[14px] font-bold`
- Remove: `<img src="/assets/kudos/icons/close-tiny.svg" aria-hidden />` + visually-hidden label "Xóa #{tag.name}"

**`AnonymousToggle`** (`src/components/kudos/AnonymousToggle.tsx`) — Section G:
- Props: `{ checked: boolean; onChange: (v: boolean) => void }`
- Checkbox 24×24, `border: 1px solid var(--color-border)` (unchecked) / `bg: var(--color-accent-primary)` (checked)
- Label: Montserrat 22px/700, `#999` (unchecked) / `var(--color-text-primary)` (checked)

**Action buttons** — Section H (inline in `WriteKudoModal`):
- H.1 Cancel: `border: 1px solid var(--color-border)`, transparent bg, `MM_MEDIA_Close` icon + "Hủy" text, `padding: 16px 40px`
- H.2 Send: `flex-1 h-[60px] bg-[var(--color-accent-primary)] rounded-lg`, Montserrat 22px/700, `MM_MEDIA_Send` icon; disabled state when `!isValid || isSubmitting`

### Phase 4: Hashtag → Rich Text Editor (US3)

> **TDD**: Write failing tests in `src/test/kudos/WriteKudoModal.test.tsx` for toolbar interactions BEFORE implementation. Confirm Red. Implement. Green.

**Goal**: Upgrade the plain `<textarea>` placeholder to Tiptap rich-text editor. Hashtag section is already wired (Phase 3); this phase only adds the editor.

Tasks:
- **`KudoEditor`** (`src/components/kudos/KudoEditor.tsx`):
  - Wraps `<EditorContent editor={editor} />` with border `var(--color-border)`, height 200px, padding 16px 24px, `font-family: var(--font-montserrat)`, `overflow-y: auto`
  - Tiptap extensions: `StarterKit` + `Link` + `Placeholder` (text: `'Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!'`)
  - Error state: `border-color: var(--color-required)`
  - Below editor: `<FieldError message={fieldErrors.message} />`

- **`ToolbarButton`** (`src/components/kudos/ToolbarButton.tsx`):
  - Props: `{ icon: string; label: string; isActive?: boolean; onClick: () => void }`
  - Style: `h-10 px-4 border border-[var(--color-border)] flex items-center`
  - Active: `bg-[var(--color-accent-primary)]`; Hover: `rgba(255,234,158,0.3)`

- **`EditorToolbar`** (`src/components/kudos/EditorToolbar.tsx`):
  - Props: `{ editor: Editor | null }`
  - Renders 6 `<ToolbarButton>` items: Bold, Italic, Strikethrough, Ordered List, Link, Quote
  - Each calls `editor.chain().focus().[command]().run()`
  - Link button: `window.prompt('Enter URL')` → `editor.chain().focus().setLink({ href }).run()`; empty prompt → `editor.chain().focus().unsetLink().run()`

- **Replace `<textarea>` in Phase 3** with `<EditorToolbar editor={editor} />` + `<KudoEditor editor={editor} />` in `WriteKudoModal`
- `useWriteKudo` receives `message` via callback `setMessage(html: string)` called from `WriteKudoModal` on Tiptap `onUpdate` event

- **`KudoPostCard.tsx` modification** (Section C.3 Figma):
  - Import `DOMPurify` from `'isomorphic-dompurify'`
  - Replace plain `{message}` text rendering with:
    ```tsx
    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} ... />
    ```
  - This handles rich-text HTML from new kudos AND plain text from legacy kudos (DOMPurify passes plain text unchanged)

### Phase 5: Image Upload (US4)

> **TDD**: Write failing tests in `src/test/kudos/ImageUploadSection.test.tsx` BEFORE implementation.

**Goal**: Image attachment — optional field, max 5.

#### 5a. `ImageUploadSection` + `ImageThumbnail`

**`ImageThumbnail`** (`src/components/kudos/ImageThumbnail.tsx`):
- Props: `{ file: File; index: number; onRemove: (index: number) => void }`
- Renders `URL.createObjectURL(file)` as `<img>` at 80×80, `border: 1px solid var(--color-border)`, `border-radius: 8px`
- Remove button: `position: absolute; top: 0; right: 0; width: 20px; height: 20px; border-radius: 71px; bg: var(--color-delete); cursor: pointer`
- Remove icon: `MM_MEDIA_Close_Tiny.svg` (17×17, white)

**`ImageUploadSection`** (`src/components/kudos/ImageUploadSection.tsx`):
- Props: `{ files: File[]; onAdd: (file: File) => void; onRemove: (index: number) => void }`
- Hidden `<input type="file" accept="image/jpeg,image/png,image/webp" ref={inputRef} onChange={...} />`
- "+ Image" button (`MM_MEDIA_Plus` icon + "Image" text + "Tối đa 5" note): hidden when `files.length >= 5`
- Client-side validation: reject files > 5MB or wrong MIME type with inline error message
- `F.1 "Image"` label: Montserrat 22px/700, shown always
- Upload-at-submit: files remain as `File` objects in state until submit

#### 5b. Submit integration in `useWriteKudo`:

```ts
// In submit():
const uploadResults = await Promise.allSettled(
  images.map(file => uploadImage(file))  // calls POST /api/upload
)
const imageUrls = uploadResults
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value)
// Then POST /api/kudos with imageUrls
```

If any upload fails: show `submitError` with count of failed images; allow retry.

### Phase 6: Campaign Selector (Frame 552) — *Blocked on Q1*

**Goal**: Implement Frame 552 dropdown once Q1 is answered.

Placeholder approach until unblocked:
- Render Frame 552 area as a disabled field with label "Loại giải thưởng (coming soon)".
- Once Q1 resolved: implement `CampaignSelector` as a dropdown identical in style to `RecipientSearch` but sourcing from `GET /api/campaigns`.

### Phase 7: Tests & Polish

**Goal**: All tests green, accessibility complete, responsive correct.

Tasks:
- Write/verify unit tests for all components and the `useWriteKudo` hook.
- Write API integration tests for `POST /api/kudos` (with `isAnonymous`, image URLs).
- Write integration test for `POST /api/upload`.
- Accessibility audit: keyboard nav (Tab order, Escape closes, focus returns on close), screen reader labels.
- Mobile responsive: verify bottom-sheet layout on < 768px.
- ESLint + TypeScript strict: zero errors.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Q1 unresolved**: Frame 552 purpose unknown | High (pending) | Med | Stub with disabled placeholder; ship without it |
| **Tiptap API changes** between v2 minor versions | Low | Low | Pin exact version in `package.json` |
| **Supabase Storage bucket not configured** for `kudos-images` | Med | High | Add bucket setup to Phase 0 checklist; stub upload with mock URL if unavailable |
| **Anonymous sender masking** leaks real sender via DB triggers | Med | High | Mask at service layer, not DB level; add integration test for anonymous kudo GET |
| **Image upload failures** break submit | Med | Med | Upload images in parallel with `Promise.allSettled`; fail gracefully if one upload fails |
| **`SendKudosDialog` consumers break** during replacement | Low | High | Keep same prop interface `{ isOpen, onClose, onSuccess }` — drop-in replacement |
| **Tiptap HTML output sanitization** missing on render | Med | High | Apply DOMPurify on the `message` field when rendering in `KudoPostCard`; add server-side sanitation |

### Estimated Complexity

- **Frontend**: High (rich-text editor, chip input, image upload, modal UX)
- **Backend**: Medium (extend existing schema, new upload endpoint)
- **Testing**: Medium (form interaction tests require happy-dom event simulation)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/UI interactions**: Form field interactions → submit → API call → success/error state
- [x] **External dependencies**: `POST /api/kudos`, `POST /api/upload`, `GET /api/sunners`, `GET /api/hashtags`
- [x] **Data layer**: `kudos` table receives `is_anonymous`, `campaign_id`, `image_urls`
- [x] **User workflows**: Full write → submit → feed refresh cycle

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Form validation on submit, disabled Send button, hashtag chip add/remove |
| App ↔ External API | Yes | `POST /api/kudos` happy path and 401/422/500 error cases |
| App ↔ Data Layer | Yes | Kudo created with correct `is_anonymous`, `image_urls`, hashtag linking |
| Cross-platform | Yes | Responsive: modal is bottom-sheet on < 768px |

### Test Environment

- **Environment type**: Vitest + happy-dom (unit/component); Supabase local containers (integration)
- **Test data strategy**: Fixtures for mock Supabase responses (as per constitution — no DB mocks in integration tests)
- **Isolation approach**: Fresh component mount per test; `vi.mock` for fetch in unit tests only

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `fetch` (API calls) | Mock in unit/component tests | Cannot hit real API in happy-dom |
| Supabase DB | Real local Supabase containers | Constitution forbids mocking DB in integration tests |
| File API | `File` constructor with `Blob` | happy-dom supports it |
| Tiptap editor | Real Tiptap instance | Mocking it defeats the purpose of testing toolbar actions |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Fill all required fields → Send → kudo created → modal closes → success toast
   - [x] Anonymous toggle ON → submit → kudo `is_anonymous = true` in DB
   - [x] Add 3 images → submit → `imageUrls` has 3 entries in kudo
   - [x] Add 5 hashtags → `+ Hashtag` button disappears

2. **Validation**
   - [x] Submit empty form → 3 red borders (recipient, message, hashtag)
   - [x] Fill recipient only → Send still disabled
   - [x] Max 5 images → 6th image rejected

3. **Error Handling**
   - [x] `POST /api/kudos` returns 500 → error toast, modal stays open, data preserved
   - [x] `POST /api/upload` fails for one image → `Promise.allSettled` handles gracefully
   - [x] Recipient search returns empty → "Không tìm thấy kết quả" shown

4. **Edge Cases**
   - [x] Click Cancel with filled form → modal closes, no API call
   - [x] Click backdrop → modal closes
   - [x] Escape key → modal closes
   - [x] Double-click Send → only one submission (idempotent)
   - [x] Message with `<script>` tags → sanitized on render in `KudoPostCard`

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| `useWriteKudo` hook | 90%+ | High |
| `WriteKudoModal` component | 80%+ | High |
| `POST /api/kudos` route | 85%+ | High |
| `POST /api/upload` route | 80%+ | Medium |
| Sub-components (search, hashtag, image) | 75%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` reviewed (open questions Q1–Q6 noted but Q2–Q6 do not block Phase 3)
- [x] Codebase research complete (see research section above)
- [ ] Q1 answered (Frame 552 purpose) — blocks Phase 6 only
- [ ] Supabase Storage bucket `kudos-images` created (or confirmed existing)
- [ ] `tasks.md` generated (next step)

### External Dependencies

- Supabase Storage bucket `kudos-images` (public read, auth-required write)
- Tiptap v2 packages published on npm
- Figma icon assets for toolbar buttons (Bold, Italic, Strikethrough, Number List, Link, Quote) available via MoMorph

---

## Pending Open Questions Impact

| Q# | Question | Blocks | Can ship without? |
|----|----------|--------|-------------------|
| Q1 | What is Frame 552 (Campaign Selector)? | Phase 6 | Yes — stub as disabled field |
| Q2 | Hashtags pre-defined or user-created? | Phase 5a | No — default to pre-defined list from `GET /api/hashtags` |
| Q3 | Navigation after submit (stay or go to View Kudo)? | Phase 3b | No — default to stay on page + toast |
| Q4 | Anonymous display name? | Phase 2a | No — default to "Ẩn danh" |
| Q5 | GIF support? | Phase 5b | No — default to jpg/png/webp only |
| Q6 | Max character limit? | Phase 3b | No — use existing 500 char limit from `POST /api/kudos` Zod schema |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Clarify** Q1 with design/product team (unblocks Phase 6)
3. **Create** Supabase Storage bucket `kudos-images` in local + staging environments
4. **Begin** Phase 0 (assets + tokens) in parallel with writing tests (TDD)

---

## Notes

- The existing `SendKudosDialog` is mounted in `KudosPage` via `isOpen` + `onClose` — the replacement uses the **identical prop interface** to avoid touching `KudosPage` state management.
- `KudoPostCard` already handles `imageUrls[]` and `hashtags[]` rendering — no changes needed to the card display layer.
- The `category` field on `Kudos` type maps to `campaign_id` after Phase 1. The card currently shows `category` as a badge — this will continue working after the migration.
- Tiptap outputs HTML; the existing `message` field in `KudoPostCard` renders it as plain text (`dangerouslySetInnerHTML` would be needed — add DOMPurify sanitization at that point).
- All Figma icon names (MM_MEDIA_Bold etc.) must be matched to actual SVG files in `public/assets/` — verify during Phase 0.
