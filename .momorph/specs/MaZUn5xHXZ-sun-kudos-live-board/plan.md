# Implementation Plan: Sun* Kudos Live Board

**Frame**: `MaZUn5xHXZ-sun-kudos-live-board`
**Date**: 2026-04-09
**Spec**: `specs/MaZUn5xHXZ-sun-kudos-live-board/spec.md`

---

## Summary

Create a new authenticated page at `/kudos` — the Sun* Kudos Live Board. The page follows the established pattern: `src/app/kudos/page.tsx` (Server Component) imports a `KudosPage` client-shell component from `src/components/kudos/`. The page uses the existing `Header` and `Footer` shared components.

The board has 4 major sections: **KV Hero** (static, SSR), **Highlight Kudos** (SSR initial, client carousel), **Spotlight Board** (client interactive canvas), and **All Kudos + Sidebar** (SSR initial, client interactions). Interactive features (heart toggle, filter dropdowns, carousel, send dialog) are isolated to `'use client'` islands. Real-time feed updates use Supabase Realtime subscription.

All data is backed by new Supabase tables: `kudos`, `kudos_hearts`, `hashtags`, `departments`, `secret_boxes`. API access goes through Next.js Route Handlers under `src/app/api/kudos/`.

---

## Technical Context

**Language/Framework**: TypeScript 5.x / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4.x, Supabase SSR (`@supabase/ssr ^0.8`, `@supabase/supabase-js ^2`)
**Database**: Supabase (PostgreSQL)
**Testing**: Vitest + @testing-library/react + happy-dom
**State Management**: Local `useState` / `useReducer` per client island; no global state store
**API Style**: Next.js Route Handlers (REST) — same pattern as existing auth routes

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (PascalCase components, kebab-case modules, 2-space indent, single quotes)
- [x] Uses approved libraries and patterns (Next.js App Router, React, Tailwind, Supabase SSR)
- [x] Adheres to folder structure (`src/components/kudos/`, `src/app/kudos/`, `src/app/api/kudos/`)
- [x] Meets security requirements (auth enforced by existing middleware — `/kudos` is not in `PUBLIC_ROUTES`)
- [x] Follows testing standards (TDD: failing tests before implementation, Vitest, no DB mocking in integration tests)
- [x] Navigation URLs from `ROUTES.kudos` in `src/config/navigation.ts` (already defined: `kudos: '/kudos'`)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| New dependency: `d3` (optional, Phase 5 only) | Spotlight Board requires pan-zoom interactive SVG network visualization; no existing library covers this | CSS absolute positioning can approximate a word cloud but cannot support pan/zoom/force layout without D3 |

**Notes**:
- `d3` is **deferred to Phase 5** (Spotlight Board). MVP can ship with a CSS word-cloud placeholder that renders names as absolutely-positioned spans. This avoids the new-dep discussion until Spotlight priority is confirmed.
- All existing CSS variables in `globals.css` already cover the Kudos dark theme (`--color-bg-page: #00101A`, `--color-text-primary-gold: #ffea9e`, `--color-border: #998c5f`). Only a small set of new kudos-specific tokens need to be added.
- `src/config/navigation.ts` already has `ROUTES.kudos = '/kudos'` — no change needed.
- Middleware already protects `/kudos` (not in `PUBLIC_ROUTES`) — no middleware change needed.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/components/kudos/` for all kudos-specific components; existing `src/components/shared/Header` and `Footer` reused as-is.
- **Rendering Strategy**:
  - `src/app/kudos/page.tsx` — **Server Component** (`force-dynamic`) that fetches initial kudos data and user session server-side, passes as props to `KudosPage`.
  - **Client islands**: `KudosCarousel`, `KudosFilters`, `HeartButton`, `SendKudosInput`, `SpotlightBoard`, `KudosFeed` (realtime subscription), `PersonalStatsBlock` — all `'use client'`.
  - Static sections (`KudosHero`, `HighlightHeader`, `SectionTitle`) are Server Components.
- **Styling Strategy**: TailwindCSS utilities + CSS variables from `globals.css`. New kudos tokens added to `:root` in `globals.css`.
- **Data Fetching**:
  - Server-side initial load: Supabase server client in `page.tsx` (kudos list, highlights, personal stats, top gifts, hashtags, departments, spotlight data).
  - Client-side mutations: Route Handlers (`POST /api/kudos`, `POST /api/kudos/:id/heart`).
  - Real-time feed: `useKudosFeed` hook subscribes to Supabase Realtime channel on `kudos` table inserts.
- **Optimistic updates**: `HeartButton` optimistically updates count on click; reconciles with server response.

### Backend Approach

- **API Design**: Next.js Route Handlers under `src/app/api/kudos/`. RESTful, typed with Zod validation.
- **Data Access**: Supabase client (server-side) with Row Level Security. Service functions in `src/services/kudos.ts`.
- **Validation**: Zod schemas for all request bodies. Input validated at route handler boundary.
- **Auth**: All write endpoints (`POST /api/kudos`, `POST /api/kudos/:id/heart`, `POST /api/secret-boxes/open`) require authenticated session via `createClient` from `@/libs/supabase/server`.

### Integration Points

- **Existing Services**:
  - `src/libs/supabase/server.ts` — server-side Supabase client (reused)
  - `src/libs/supabase/client.ts` — browser-side Supabase client (reused for realtime)
  - `src/libs/supabase/middleware.ts` — session refresh (already handles `/kudos`)
- **Shared Components**:
  - `src/components/shared/Header.tsx` — reused with `activeRoute="kudos"`
  - `src/components/shared/Footer.tsx` — reused as-is
- **Config**:
  - `src/config/navigation.ts` — `ROUTES.kudos` already defined
- **Types**:
  - New: `src/types/kudos.ts` — `Kudos`, `KudosHeart`, `Hashtag`, `Department`, `SecretBox`, `PersonalStats`, `SpotlightNode`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/MaZUn5xHXZ-sun-kudos-live-board/
├── spec.md              ✅ done
├── design-style.md      ✅ done
├── plan.md              ✅ this file
├── assets/              ✅ created
└── tasks.md             📋 next step
```

### Source Code (new + modified files)

```text
src/
├── app/
│   ├── kudos/
│   │   └── page.tsx                              # NEW — route entry (Server Component, force-dynamic)
│   │
│   └── api/
│       ├── kudos/
│       │   ├── route.ts                          # NEW — GET (list) + POST (create)
│       │   └── [id]/
│       │       ├── route.ts                      # NEW — GET single kudos
│       │       └── heart/
│       │           └── route.ts                  # NEW — POST toggle heart
│       ├── kudos/highlights/
│       │   └── route.ts                          # NEW — GET top 5 most-hearted
│       ├── stats/personal/
│       │   └── route.ts                          # NEW — GET logged-in user stats
│       ├── sunners/top-gifts/
│       │   └── route.ts                          # NEW — GET top 10 gift recipients
│       ├── spotlight/
│       │   └── route.ts                          # NEW — GET spotlight node data
│       ├── hashtags/
│       │   └── route.ts                          # NEW — GET hashtag list
│       ├── departments/
│       │   └── route.ts                          # NEW — GET department list
│       └── secret-boxes/
│           └── open/
│               └── route.ts                      # NEW — POST open secret box
│
├── components/
│   └── kudos/                                    # NEW directory
│       ├── KudosPage.tsx                         # NEW — page shell (client, composes all sections)
│       ├── KudosHero.tsx                         # NEW — Section A: hero KV + SAA logo (server)
│       ├── SendKudosInput.tsx                    # NEW — A.1: pill input opens send dialog (client)
│       ├── SendKudosDialog.tsx                   # NEW — dialog/modal for composing kudos (client)
│       ├── HighlightSection.tsx                  # NEW — Section B: wrapper (server shell)
│       ├── HighlightHeader.tsx                   # NEW — B.1: title + filters (server)
│       ├── KudosFilters.tsx                      # NEW — B.1.1 + B.1.2: Hashtag + Dept dropdowns (client)
│       ├── KudosCarousel.tsx                     # NEW — B.2: carousel of 5 highlight cards (client)
│       ├── KudoHighlightCard.tsx                 # NEW — B.3: single highlight card (server-compatible)
│       ├── SlideIndicator.tsx                    # NEW — B.5: pagination "2/5" control (client)
│       ├── SectionTitle.tsx                      # NEW — shared section heading component (server)
│       ├── SpotlightSection.tsx                  # NEW — B.7: spotlight board container (server shell)
│       ├── SpotlightBoard.tsx                    # NEW — B.7 interactive canvas/SVG (client)
│       ├── AllKudosSection.tsx                   # NEW — Section C: all kudos feed (server shell)
│       ├── KudosFeed.tsx                         # NEW — C.2: realtime feed list (client)
│       ├── KudoPostCard.tsx                      # NEW — C.3: full kudos post card (server-compatible)
│       ├── HeartButton.tsx                       # NEW — C.4.1: heart toggle with optimistic update (client)
│       ├── CopyLinkButton.tsx                    # NEW — C.4.2: copy URL to clipboard (client)
│       ├── KudosImageGallery.tsx                 # NEW — C.3.6: attached images row (client)
│       ├── KudosSidebar.tsx                      # NEW — Section D: right sidebar (server shell)
│       ├── PersonalStatsBlock.tsx                # NEW — D.1: stats rows + divider (server)
│       ├── OpenGiftButton.tsx                    # NEW — D.1.8: mở quà CTA (client)
│       ├── TopGiftRecipients.tsx                 # NEW — D.3: top 10 recipients list (server)
│       └── SunnerRow.tsx                         # NEW — D.3.2: individual sunner row (server)
│
├── services/
│   └── kudos.ts                                  # NEW — Supabase service layer (server-side)
│
├── hooks/
│   ├── useKudosFeed.ts                           # NEW — realtime feed subscription hook
│   ├── useHeartToggle.ts                         # NEW — optimistic heart toggle logic
│   └── useKudosFilters.ts                        # NEW — filter state management
│
├── types/
│   └── kudos.ts                                  # NEW — all kudos-related TypeScript interfaces
│
└── test/
    └── kudos/                                    # NEW test directory
        ├── KudosPage.test.tsx                    # NEW — integration: page render + auth gate
        ├── KudosCarousel.test.tsx                # NEW — carousel navigation states
        ├── KudoPostCard.test.tsx                 # NEW — card rendering, truncation
        ├── HeartButton.test.tsx                  # NEW — optimistic update, toggle states
        ├── KudosFilters.test.tsx                 # NEW — dropdown open/close, selection
        ├── SendKudosDialog.test.tsx              # NEW — form validation, submit flow
        ├── PersonalStatsBlock.test.tsx           # NEW — stats display, x2 badge
        └── api/
            ├── kudos.test.ts                     # NEW — GET + POST /api/kudos
            ├── kudos-heart.test.ts               # NEW — POST /api/kudos/:id/heart
            └── stats-personal.test.ts            # NEW — GET /api/stats/personal

public/
└── assets/
    └── kudos/                                    # NEW directory
        ├── images/
        │   └── bg-kv.png                         # Figma: I2940:13432;2167:5141 (KV background)
        ├── icons/
        │   ├── pencil.svg                        # Figma: I2940:13449;186:2759 (send input icon)
        │   ├── chevron-left.svg                  # Figma: I2940:13470;186:1420 (carousel back)
        │   ├── chevron-right.svg                 # Figma: I2940:13468;186:1420 (carousel next)
        │   ├── arrow-sent.svg                    # Figma: I3127:21871;256:5171 (sender→receiver)
        │   ├── copy-link.svg                     # Figma: I3127:21871;256:5216;186:1441
        │   ├── gift-box.svg                      # Figma: I2940:13497;186:1766 (mở quà button)
        │   └── search.svg                        # Figma: I2940:14833;186:2759 (spotlight search)
        └── logos/
            └── saa-kudos.svg                     # Figma: 2940:13440 (SAA 2025 KUDOS logo in hero)
```

### Modified Files

| File | Change |
|------|--------|
| `src/app/globals.css` | Add kudos-specific CSS variables (card bg, carousel gradient, filter tokens) |
| `src/middleware.ts` | No change needed — `/kudos` already auth-gated |
| `src/config/navigation.ts` | No change needed — `ROUTES.kudos` already defined |

### New Dependencies

| Package | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| `d3` | `^7` | Spotlight Board force-directed layout + pan/zoom | **Deferred to Phase 5**. MVP ships with CSS word cloud. Add only if Spotlight is confirmed P1. |

---

## CSS Variables to Add (globals.css)

```css
/* ─── Kudos Live Board Design Tokens ─────────────────────────────────────── */
/* Colors */
--color-bg-card: #00070C;
--color-bg-header-translucent: rgba(16, 20, 23, 0.8);
--color-text-muted: rgba(219, 209, 193, 1);
--color-heart-active: rgba(212, 39, 29, 1);
--color-heart-inactive: rgba(153, 153, 153, 1);

/* Gradients */
--gradient-carousel-left: linear-gradient(90deg, #00101A 50%, rgba(255,255,255,0) 100%);
--gradient-carousel-right: linear-gradient(270deg, #00101A 50%, rgba(255,255,255,0) 100%);

/* Spacing */
--spacing-kudos-px: 144px;
--spacing-kudos-section-gap: 40px;
--spacing-kudos-card-gap: 24px;
--spacing-kudos-sidebar-gap: 80px;

/* Border & Radius */
--radius-card: 16px;
--radius-pill: 100px;
--radius-filter: 4px;
--border-card: 1px solid #998C5F;
--border-primary-half: 0.5px solid #FFEA9E;
```

> Most tokens (`--color-bg-page`, `--color-text-primary-gold`, `--color-border`, `--color-login-btn`, `--color-divider`) already exist — map to them where possible.

---

## TypeScript Types (`src/types/kudos.ts`)

```ts
export interface Sunner {
  id: string
  name: string
  department: string
  starCount: number
  title: string
  avatarUrl: string | null
}

export interface Kudos {
  id: string
  sender: Sunner
  receiver: Sunner
  message: string
  hashtags: string[]
  imageUrls: string[]
  heartCount: number
  isHearted: boolean        // resolved for current user
  createdAt: string         // ISO timestamp
}

export interface Hashtag {
  id: string
  name: string
  kudosCount: number
}

export interface Department {
  id: string
  name: string
}

export interface PersonalStats {
  kudosReceived: number
  kudosSent: number
  heartsReceived: number
  openedSecretBoxes: number
  unopenedSecretBoxes: number
  heartsX2Active: boolean
}

export interface GiftRecipient {
  id: string
  name: string
  avatarUrl: string | null
  giftDescription: string
  receivedAt: string
}

export interface SpotlightNode {
  id: string
  name: string
  kudosCount: number
}
```

---

## Database Schema (Supabase)

```sql
-- kudos table
CREATE TABLE kudos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    UUID NOT NULL REFERENCES auth.users(id),
  receiver_id  UUID NOT NULL REFERENCES auth.users(id),
  message      TEXT NOT NULL CHECK (char_length(message) <= 500),
  hashtag_ids  UUID[] DEFAULT '{}',
  image_urls   TEXT[] DEFAULT '{}',
  heart_count  INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- kudos_hearts table (toggle mechanism)
CREATE TABLE kudos_hearts (
  kudos_id  UUID REFERENCES kudos(id) ON DELETE CASCADE,
  user_id   UUID REFERENCES auth.users(id),
  PRIMARY KEY (kudos_id, user_id)
);

-- hashtags table
CREATE TABLE hashtags (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL UNIQUE
);

-- departments table (may already exist in Supabase from user profile)
CREATE TABLE departments (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL UNIQUE
);

-- secret_boxes table
CREATE TABLE secret_boxes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id),
  reward       TEXT,
  is_opened    BOOLEAN NOT NULL DEFAULT FALSE,
  opened_at    TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- sunners view (profile info for sender/receiver)
-- Assumes a `profiles` table exists (common Supabase pattern)
-- If not, create it:
CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id),
  name         TEXT NOT NULL,
  department   TEXT,
  star_count   INT NOT NULL DEFAULT 0,
  title        TEXT,
  avatar_url   TEXT
);
```

**RLS Policies**:
- `kudos`: SELECT for all authenticated users; INSERT only for sender_id = auth.uid()
- `kudos_hearts`: SELECT/INSERT/DELETE only for user_id = auth.uid()
- `secret_boxes`: SELECT/UPDATE only for user_id = auth.uid()
- `profiles`: SELECT for all authenticated users

---

## Implementation Strategy

### Phase 0: Asset Download

Download all Figma media assets to `public/assets/kudos/` using `mcp__momorph__get_media_files` (already retrieved, URLs available):

| Asset | Figma Node | Target Path |
|-------|-----------|-------------|
| KV Background | `I2940:13432;2167:5141` | `public/assets/kudos/images/bg-kv.png` |
| SAA Kudos Logo | `2940:13440` | `public/assets/kudos/logos/saa-kudos.svg` |
| Pencil icon | `I2940:13449;186:2759` | `public/assets/kudos/icons/pencil.svg` |
| Chevron left | `I2940:13470;186:1420` | `public/assets/kudos/icons/chevron-left.svg` |
| Chevron right | `I2940:13468;186:1420` | `public/assets/kudos/icons/chevron-right.svg` |
| Arrow sent | `I3127:21871;256:5171` | `public/assets/kudos/icons/arrow-sent.svg` |
| Copy link icon | `I3127:21871;256:5216;186:1441` | `public/assets/kudos/icons/copy-link.svg` |
| Gift box icon | `I2940:13497;186:1766` | `public/assets/kudos/icons/gift-box.svg` |
| Search icon | `I2940:14833;186:2759` | `public/assets/kudos/icons/search.svg` |

### Phase 1: Foundation — Types, DB schema, CSS tokens

TDD: Write type tests (compile-only) and CSS variable validation first.

1. Create `src/types/kudos.ts` with all interfaces
2. Add kudos CSS variables to `globals.css` (`:root` block)
3. Write and run database migration SQL in Supabase dashboard (or migration file)
4. Verify Supabase RLS policies are in place
5. Create `src/services/kudos.ts` with stub functions (no implementation yet — TDD anchor)

### Phase 2: API Route Handlers

TDD: Write failing API tests in `src/test/kudos/api/`, then implement.

1. **[TEST]** `kudos.test.ts` — GET returns list; POST creates kudos with valid body; POST rejects unauthenticated
2. **Implement** `src/app/api/kudos/route.ts` — GET (list + filter by hashtag/dept) + POST (create)
3. **[TEST]** `kudos-heart.test.ts` — POST toggles heart; idempotent; updates heart_count
4. **Implement** `src/app/api/kudos/[id]/heart/route.ts`
5. **Implement** remaining read-only routes: highlights, stats/personal, sunners/top-gifts, spotlight, hashtags, departments
6. **Implement** `src/app/api/secret-boxes/open/route.ts`

### Phase 3: Kudos Feed (US1 — P1 core)

TDD: Write failing component tests first.

1. **[TEST]** `KudoPostCard.test.tsx` — renders sender, receiver, content (max 5 lines), hashtags, timestamp; heart button present
2. **Implement** `KudoPostCard.tsx` (server-compatible display component)
3. **[TEST]** `HeartButton.test.tsx` — inactive state grey; active state red; optimistic update increments count; API error reverts
4. **Implement** `HeartButton.tsx` + `useHeartToggle.ts`
5. **Implement** `CopyLinkButton.tsx` (clipboard API + toast)
6. **Implement** `KudosImageGallery.tsx`
7. **Implement** `KudosFeed.tsx` (client, Supabase realtime subscription)
8. **[TEST]** `KudosPage.test.tsx` — page renders all sections; auth-protected; initial data passed as props
9. **Implement** `src/app/kudos/page.tsx` + `KudosPage.tsx` + `AllKudosSection.tsx`
10. Run full integration test — page loads with feed at `/kudos`

### Phase 4: Highlight Carousel + Filters (US2, US3 — P1/P2)

TDD: Write failing tests first.

1. **[TEST]** `KudosCarousel.test.tsx` — renders cards; back disabled on slide 1; next disabled on slide 5; indicator shows "1/5" → "2/5" on next click
2. **Implement** `KudosCarousel.tsx` + `SlideIndicator.tsx` + `KudoHighlightCard.tsx`
3. **[TEST]** `KudosFilters.test.tsx` — dropdown opens on click; selecting hashtag calls onFilterChange; clearing filter restores full list
4. **Implement** `KudosFilters.tsx` + `useKudosFilters.ts` + `HighlightHeader.tsx`
5. **Implement** `HighlightSection.tsx`

### Phase 5: Personal Stats + Send Kudos (US7, US2 — P2)

TDD: Write failing tests first.

1. **[TEST]** `PersonalStatsBlock.test.tsx` — renders 5 stat rows; x2 badge shows when heartsX2Active; mở quà button disabled when 0 unopened boxes
2. **Implement** `PersonalStatsBlock.tsx` + `OpenGiftButton.tsx`
3. **Implement** `TopGiftRecipients.tsx` + `SunnerRow.tsx`
4. **Implement** `KudosSidebar.tsx`
5. **[TEST]** `SendKudosDialog.test.tsx` — opens on input click; form validates required fields; submits POST /api/kudos; closes on success
6. **Implement** `SendKudosInput.tsx` + `SendKudosDialog.tsx`

### Phase 6: Spotlight Board (US8 — P3, deferred option)

**Option A (MVP — CSS word cloud, no new dep)**:
- Render `SpotlightNode` array as absolutely-positioned spans inside a relative container
- Font size proportional to `kudosCount`
- Search highlights matching node
- Pan/Zoom: scroll + CSS transform (basic)

**Option B (Full — D3 force layout)**:
- Requires `yarn add d3 @types/d3`
- Document as constitution exception in PR
- `SpotlightBoard.tsx` uses `useRef` + D3 `forceSimulation` for force-directed layout
- Pan/Zoom via D3 zoom behavior

**Decision**: Ship Phase 6 Option A with MVP. Upgrade to Option B after stakeholder confirmation.

1. **Implement** `SpotlightBoard.tsx` (CSS-based initially)
2. **Implement** `SpotlightSection.tsx`

### Phase 7: Polish + Responsive + Accessibility

1. Add ARIA labels to all interactive elements (carousel controls, heart button, filters)
2. Implement responsive layout (mobile: single column, no sidebar; tablet: 2-col narrow; desktop: full 2-col)
3. Add loading skeleton states for feed, carousel, sidebar
4. Add empty states (no kudos, no highlights)
5. Add error states with retry (API failure)
6. Run `yarn tsc --noEmit` — zero type errors
7. Run `yarn lint` — zero lint errors
8. Run `yarn test` — all tests pass

---

## Component Ownership (Client vs Server)

| Component | Type | Owns |
|-----------|------|------|
| `KudosPage` | **Client** (shell) | Page composition, filter state |
| `KudosHero` | Server | Hero layout, KV image |
| `SendKudosInput` | **Client** | Dialog open state |
| `SendKudosDialog` | **Client** | Form state, submit |
| `HighlightSection` | Server (shell) | Section wrapper |
| `HighlightHeader` | Server | Title, subtitle |
| `KudosFilters` | **Client** | Dropdown open/close, selected filter |
| `KudosCarousel` | **Client** | Active slide index, prev/next |
| `KudoHighlightCard` | Server-compatible | Renders props only |
| `SlideIndicator` | **Client** | Slide position display |
| `SpotlightSection` | Server (shell) | Spotlight wrapper |
| `SpotlightBoard` | **Client** | Canvas interaction, search |
| `AllKudosSection` | Server (shell) | Section wrapper |
| `KudosFeed` | **Client** | Realtime subscription, local kudos state |
| `KudoPostCard` | Server-compatible | Renders props only |
| `HeartButton` | **Client** | Optimistic heart state |
| `CopyLinkButton` | **Client** | Clipboard API |
| `KudosImageGallery` | **Client** | Lightbox open state |
| `KudosSidebar` | Server (shell) | Sidebar layout |
| `PersonalStatsBlock` | Server | Stats display |
| `OpenGiftButton` | **Client** | Secret box dialog |
| `TopGiftRecipients` | Server | Recipients list |
| `SunnerRow` | Server | Single row display |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: `KudosPage` ↔ `KudosFeed` ↔ Supabase realtime; `KudosCarousel` ↔ `SlideIndicator`; `KudosFilters` ↔ feed refetch
- [x] **External dependencies**: Supabase client (mocked in unit tests; real in integration)
- [x] **Data layer**: API Route Handlers → Supabase → response types
- [x] **User workflows**: View feed; heart a kudos; send kudos; open secret box; filter by hashtag

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Heart toggle optimistic update; carousel prev/next; filter selection triggers refetch |
| Service ↔ Service | Yes | `useKudosFeed` realtime subscription updates local state on insert |
| App ↔ External API | Yes | Route Handlers correctly proxy Supabase; auth check on write endpoints |
| App ↔ Data Layer | Yes | POST /api/kudos inserts row; GET /api/kudos returns typed response |
| Cross-platform | Yes | PC 2-column layout vs SP single-column; carousel swipe on mobile |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase server client | Mock in unit/component tests | Constitution: no real DB in component tests |
| Supabase realtime | Mock `RealtimeChannel` in `useKudosFeed` tests | Isolate hook from network |
| Supabase browser client | Mock in API route tests | Deterministic test data |
| `next/navigation` (`useRouter`) | Mock | Standard Next.js test pattern |
| Clipboard API | Mock `navigator.clipboard.writeText` | jsdom doesn't implement it |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user loads `/kudos` — all 4 sections render with data
   - [ ] Highlight carousel: click Next advances to slide 2; indicator updates
   - [ ] Heart button: click on un-hearted kudos → turns red, count +1; API call succeeds
   - [ ] Copy link: click button → clipboard.writeText called with correct URL; toast shown
   - [ ] Filter by hashtag → feed re-fetches with `hashtag` param
   - [ ] Send kudos: open dialog, fill fields, submit → POST /api/kudos called; dialog closes; new card appears in feed
   - [ ] Open secret box: click "Mở quà" → POST /api/secret-boxes/open called; dialog opens

2. **Error Handling**
   - [ ] API returns 500 → feed shows error state with retry button
   - [ ] Heart API fails → optimistic count reverts to original
   - [ ] Send kudos with empty message → validation error shown inline
   - [ ] Unauthenticated user visits `/kudos` → middleware redirects to `/login`

3. **Edge Cases**
   - [ ] Feed has 0 kudos → empty state shown
   - [ ] Kudos message > 5 lines → truncated with "..."
   - [ ] Kudos has 0 images → gallery section hidden
   - [ ] Carousel on slide 5: Next button disabled
   - [ ] Carousel on slide 1: Back button disabled
   - [ ] 0 unopened secret boxes → "Mở quà" button disabled

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| API route handlers | 85%+ | High |
| Core components (KudoPostCard, HeartButton, KudosCarousel) | 80%+ | High |
| Feed realtime hook (`useKudosFeed`) | 80%+ | High |
| Send dialog form validation | 90%+ | High |
| Spotlight Board (Phase 6) | 60%+ | Low (deferred) |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase `profiles` table doesn't exist | High | High | Confirm schema before Phase 1; create `profiles` table in migration |
| Realtime feed causes re-render storm (too many updates) | Medium | Medium | Debounce realtime inserts; batch state updates |
| Spotlight Board CSS word cloud looks nothing like the Figma design | High | Medium | Treat Phase 6 as spike; get stakeholder sign-off on CSS approach before building |
| `d3` bundle size impacts LCP | Medium | Medium | Lazy-load `SpotlightBoard` with `next/dynamic` + `{ ssr: false }` |
| Heart optimistic update race condition (double-click) | Low | Low | Disable heart button while API call is in-flight |
| `KudosFeed` realtime subscription leaks memory on unmount | Low | Medium | `useEffect` cleanup returns `channel.unsubscribe()` |
| SP layout needs testing — no existing mobile kudos pattern | Medium | Medium | Test at 390px breakpoint from Phase 3 onwards |
| Card image gallery needs lightbox — not currently a spec priority | Low | Low | Show images inline; full lightbox deferred to next sprint |

---

## Dependencies & Prerequisites

### Required Before Start

- [ ] `constitution.md` reviewed ✅
- [ ] `spec.md` reviewed ✅
- [ ] `design-style.md` reviewed ✅
- [ ] Supabase `profiles` table exists (verify in Supabase dashboard)
- [ ] DB migrations for `kudos`, `kudos_hearts`, `hashtags`, `departments`, `secret_boxes` tables applied
- [ ] RLS policies enabled for all new tables
- [ ] Figma assets downloaded (Phase 0)
- [ ] `SUPABASE_URL` and `SUPABASE_ANON_KEY` set in `.env`

### External Dependencies

- Supabase project (existing — already used for auth)
- Figma media assets (download in Phase 0 using `get_media_files` URLs documented in plan)

---

## Key Implementation Notes

### 1. Page Route Pattern (follows awards pattern exactly)
```ts
// src/app/kudos/page.tsx
import { createClient } from '@/libs/supabase/server'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { KudosPage } from '@/components/kudos/KudosPage'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sun* Kudos | Sun* Annual Awards 2025',
  description: 'Gửi lời cảm ơn và ghi nhận đồng nghiệp — Sun* Annual Awards 2025',
}

export default async function KudosRoute() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // Fetch initial data server-side for fast SSR
  // (highlights, top kudos, personal stats, spotlight, hashtags, departments)
  const [highlights, allKudos, personalStats, topGifts, hashtags, departments, spotlight] =
    await Promise.all([
      fetchHighlightKudos(supabase),
      fetchAllKudos(supabase),
      user ? fetchPersonalStats(supabase, user.id) : null,
      fetchTopGiftRecipients(supabase),
      fetchHashtags(supabase),
      fetchDepartments(supabase),
      fetchSpotlightData(supabase),
    ])

  return (
    <div className="min-h-screen bg-[var(--color-bg-page,#00101A)]">
      <Header activeRoute="kudos" />
      <KudosPage
        initialHighlights={highlights}
        initialKudos={allKudos}
        personalStats={personalStats}
        topGiftRecipients={topGifts}
        hashtags={hashtags}
        departments={departments}
        spotlightNodes={spotlight}
        currentUserId={user?.id ?? null}
      />
      <Footer />
    </div>
  )
}
```

### 2. Realtime Feed Hook Pattern
```ts
// src/hooks/useKudosFeed.ts
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/libs/supabase/client'
import type { Kudos } from '@/types/kudos'

export function useKudosFeed(initialKudos: Kudos[]) {
  const [kudos, setKudos] = useState(initialKudos)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('kudos-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'kudos' }, (payload) => {
        // transform payload.new → Kudos shape, prepend to list
        setKudos((prev) => [transformKudos(payload.new), ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return kudos
}
```

### 3. Optimistic Heart Toggle
```ts
// src/hooks/useHeartToggle.ts
export function useHeartToggle(kudosId: string, initialCount: number, initialHearted: boolean) {
  const [hearted, setHearted] = useState(initialHearted)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  const toggle = async () => {
    if (pending) return
    setPending(true)
    const newHearted = !hearted
    setHearted(newHearted)          // optimistic
    setCount((c) => newHearted ? c + 1 : c - 1)  // optimistic

    const res = await fetch(`/api/kudos/${kudosId}/heart`, { method: 'POST' })
    if (!res.ok) {
      setHearted(hearted)           // revert
      setCount(initialCount)
    }
    setPending(false)
  }
  return { hearted, count, toggle, pending }
}
```

### 4. Carousel State Management
```ts
// KudosCarousel.tsx (client)
const [activeIndex, setActiveIndex] = useState(0)
const total = cards.length  // 5

const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
const next = () => setActiveIndex((i) => Math.min(total - 1, i + 1))
// back button: disabled when activeIndex === 0
// next button: disabled when activeIndex === total - 1
```

### 5. Lazy-load SpotlightBoard (avoid SSR hydration issues)
```ts
// SpotlightSection.tsx
import dynamic from 'next/dynamic'
const SpotlightBoard = dynamic(() => import('./SpotlightBoard'), { ssr: false })
```

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown for `MaZUn5xHXZ-sun-kudos-live-board`
2. **Review** `tasks.md` for parallelization (Phase 0 asset download + Phase 1 DB setup can run in parallel with type/CSS work)
3. **Confirm** Supabase `profiles` table existence before beginning Phase 1
4. **Confirm** Spotlight Board approach (CSS MVP vs D3) with stakeholder before Phase 6

---

## Open Questions

- [ ] **Supabase profiles table**: Does the `profiles` table already exist (common Supabase pattern) or does it need to be created as part of this feature?
- [ ] **Secret Box opening UX**: What does the opening animation/dialog look like? (Out of scope for this spec — separate spec needed before Phase 5 "Mở quà" implementation)
- [ ] **Spotlight Board priority**: Is the Spotlight Board P1 (must ship with initial release) or can it ship as a CSS placeholder in v1?
- [ ] **Send Kudos dialog spec**: The dialog is triggered from this screen but its spec is listed as out of scope. Is there a separate spec, or should it be folded into this feature?
- [ ] **Heart x2 multiplier**: What's the backend logic for `heartsX2Active`? Is there a time-based event flag in the database, or a config value?
- [ ] **Kudos images**: Are image uploads to Supabase Storage needed? Or are image URLs provided externally? (Affects `SendKudosDialog` implementation)
