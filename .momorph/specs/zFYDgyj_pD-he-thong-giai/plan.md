# Implementation Plan: Hệ Thống Giải Thưởng (Awards System)

**Frame**: `zFYDgyj_pD-he-thong-giai`
**Date**: 2026-04-08
**Spec**: `specs/zFYDgyj_pD-he-thong-giai/spec.md`
**Design Style**: `specs/zFYDgyj_pD-he-thong-giai/design-style.md`

---

## Summary

Build the `/awards` page — a **read-only, publicly accessible** page that presents all 6 SAA 2025
award categories with full detail (image, description, count, value). Desktop shows a sticky
sidebar nav with scroll-spy; mobile shows a dropdown selector. A Kudos promo block at the bottom
links to `/kudos`. All data is static (no API). The existing `AwardCard` homepage component is
**not reused** — the `/awards` page uses a completely different layout (large image + content
block side-by-side, with count/value meta blocks) per Figma `313:8436`.

---

## Technical Context

| Item | Value |
|------|-------|
| Framework | Next.js 15 App Router |
| Language | TypeScript 5.x (strict) |
| Styling | TailwindCSS 4.x + CSS variables |
| Testing | Vitest + React Testing Library |
| Package Manager | Yarn |
| Auth | Supabase (page is PUBLIC — no auth needed) |
| State Management | React `useState` / `useRef` (Client Component islands only) |
| API | None — all data is static constants |

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components)
- [x] Uses approved libraries and patterns (Next.js, TailwindCSS, Vitest)
- [x] Adheres to folder structure guidelines (feature components under `src/components/awards/`)
- [x] Meets security requirements (public page, no sensitive data)
- [x] Follows testing standards (tests alongside implementation, Vitest)
- [x] TDD cycle: write tests → confirm red → implement → green → refactor

**No violations.** No new runtime dependencies required.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — all awards-specific components under
  `src/components/awards/`. Shared layout components (Header, Footer, KudosSection) are reused
  from existing `src/components/shared/` and `src/components/home/`.
- **Styling Strategy**: Tailwind utility classes + CSS variables (tokens from `design-style.md`).
  No new CSS variables needed — all tokens already defined in `src/app/globals.css`.
- **Data Fetching**: Static constants in `src/config/awards.ts`. The existing `Award` type in
  `src/types/home.ts` needs to be **extended** with `count`, `countUnit`, `value`, `valueSuffix`
  fields for the full awards page detail view.
- **Server/Client split**:
  - `src/app/awards/page.tsx` → Server Component (SEO-friendly static HTML)
  - `src/components/awards/AwardsSidebarNav.tsx` → Client Component (scroll-spy with
    `IntersectionObserver`)
  - `src/components/awards/AwardsDropdown.tsx` → Client Component (open/close state)
  - All award cards and layout → Server Components

### Integration Points

- **Existing**: `src/components/shared/Header.tsx` — pass `activeRoute="awards"`
- **Existing**: `src/components/home/KudosSection.tsx` — reuse directly
- **Existing**: `src/config/awards.ts` — extend `Award` type and add new fields
- **Existing**: `src/config/navigation.ts` — `ROUTES.awards` already defined
- **Existing**: `src/middleware.ts` — add `/awards` to `PUBLIC_ROUTES`
- **Existing**: `src/types/home.ts` — extend `Award` interface

### No Backend Changes

All data is static. No API, no DB, no server actions.

---

## Project Structure

### Documentation

```text
.momorph/specs/zFYDgyj_pD-he-thong-giai/
├── spec.md           ✅ done
├── design-style.md   ✅ done
├── plan.md           ✅ this file
└── tasks.md          📋 next step
```

### New Files to Create

| File | Purpose |
|------|---------|
| `src/app/awards/page.tsx` | Page route — Server Component shell |
| `src/components/awards/AwardsPage.tsx` | Full page layout (keyvisual + content) |
| `src/components/awards/AwardsSectionTitle.tsx` | "Sun* Annual Awards 2025" + heading block |
| `src/components/awards/AwardsDetailCard.tsx` | Detail award card (image 336px + content block) |
| `src/components/awards/AwardsSidebarNav.tsx` | Sticky left sidebar with scroll-spy — **Client** |
| `src/components/awards/AwardsDropdown.tsx` | SP dropdown selector — **Client** |
| `src/components/awards/AwardsKeyvisual.tsx` | Hero banner with bg-keyvisual + title overlay |
| `src/test/awards/awards-data.test.ts` | Unit: static award data correctness |
| `src/test/awards/awards-page.test.tsx` | Unit: AwardsPage renders all 6 cards |
| `src/test/awards/awards-nav.test.tsx` | Unit: sidebar active state + dropdown behavior |

### Modified Files

| File | Change |
|------|--------|
| `src/types/home.ts` | Add `count`, `countUnit`, `value`, `valueSuffix` to `Award` interface |
| `src/config/awards.ts` | Add count/value data to all 6 award entries |
| `src/middleware.ts` | Add `/awards` to `PUBLIC_ROUTES` set |
| `src/test/middleware.test.ts` | Update tests to cover `/awards` as public route |

### No New Dependencies

All needed packages are already present (`react`, `next`, `tailwindcss`, `vitest`).

---

## Implementation Strategy

### Phase 0: Asset Verification

Verify all award images exist in `public/assets/home/images/`:
- `award-bg.png` ✅ (shared background)
- `award-name-top-talent.png` ✅
- `award-name-top-project.png` ✅
- `award-name-top-project-leader.png` ✅
- `award-name-best-manager.png` ✅
- `award-name-signature-creator.png` ✅
- `award-name-mvp.png` ✅

No download needed — all assets already present from homepage phase.

### Phase 1: Foundation — Types & Data (US1 prerequisite)

1. Extend `Award` type with detail fields: `count`, `countUnit`, `value`, `valueSuffix`
2. Add count/value data to `src/config/awards.ts`
3. Add `/awards` to `PUBLIC_ROUTES` in `src/middleware.ts`
4. Write `src/test/awards/awards-data.test.ts` (TDD: verify data shape and values)

### Phase 2: Core Static UI — All Award Cards (US1)

Build the full static page from top to bottom:
1. `AwardsSectionTitle` — sub-label + divider + gold heading
2. `AwardsDetailCard` — large layout with 336×336px image + content block (title, description,
   count meta, value meta) matching Figma `D.1–D.6`
3. `AwardsKeyvisual` — hero banner (reuse bg-keyvisual.png)
4. `AwardsPage` — orchestrates all sections
5. `src/app/awards/page.tsx` — wires up the page route
6. Tests: `awards-page.test.tsx`

### Phase 3: Navigation (US2)

1. `AwardsSidebarNav` (Client) — sticky 178px sidebar, 6 items, click → smooth scroll,
   `IntersectionObserver` for scroll-spy active state
2. `AwardsDropdown` (Client) — SP dropdown selector, click → scroll to section, outside-click
   closes, Escape closes
3. Wire both into `AwardsPage` with responsive visibility (`hidden lg:block` / `lg:hidden`)
4. Tests: `awards-nav.test.tsx`

### Phase 4: Kudos Block + Polish (US3)

1. Reuse `KudosSection` from homepage — already implemented
2. Verify hover states, `focus` ring on sidebar links, keyboard navigation
3. ARIA attributes: `<nav aria-label="Award categories">`, `role="combobox"` on dropdown
4. Run full test suite — ensure all tests green
5. Playwright screenshot for visual verification

---

## Component Ownership

| Component | Type | Owner module |
|-----------|------|--------------|
| `AwardsPage` | Server | `src/components/awards/` |
| `AwardsSectionTitle` | Server | `src/components/awards/` |
| `AwardsDetailCard` | Server | `src/components/awards/` |
| `AwardsKeyvisual` | Server | `src/components/awards/` |
| `AwardsSidebarNav` | **Client** | `src/components/awards/` |
| `AwardsDropdown` | **Client** | `src/components/awards/` |
| `KudosSection` | Server (reused) | `src/components/home/` |
| `Header` | Server (reused) | `src/components/shared/` |
| `Footer` | Server (reused) | `src/components/shared/` |

---

## Design Token Mapping

Key values from `design-style.md` to Tailwind:

| Design Value | Tailwind Class |
|-------------|----------------|
| Section heading 57px 700 `#FFEA9E` ls:-0.25px | `text-[57px] font-bold text-[#FFEA9E] leading-[64px] tracking-[-0.25px]` |
| Award name 24px 700 `#FFEA9E` | `text-[24px] font-bold text-[#FFEA9E] leading-8` |
| Award description 16px 700 white 0.5px ls justified | `text-[16px] font-bold text-white leading-6 tracking-[0.5px] lg:text-justify` |
| Count/value 36px 700 white | `text-[36px] font-bold text-white leading-[44px]` |
| Meta label 24px 700 gold | `text-[24px] font-bold text-[#FFEA9E] leading-8` |
| Unit/note 14px 700 white | `text-[14px] font-bold text-white leading-5` |
| Award image | `w-[336px] h-[336px]` + `shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287]` |
| Content block | `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` |
| Sidebar nav item active | `text-[#FFEA9E] border-b border-[#FFEA9E]` + text-shadow |
| Gap between award sections | `gap-[80px]` |
| Page px (PC) | `lg:px-[144px]` |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: AwardsSidebarNav ↔ anchor scroll; AwardsDropdown ↔ scroll
- [x] **Static data**: All 6 awards have required fields
- [x] **Middleware**: `/awards` is public (no auth redirect)
- [ ] **External dependencies**: None
- [ ] **Database**: Not applicable

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Sidebar click → scroll + active; dropdown select → scroll |
| App ↔ Middleware | Yes | `/awards` returns 200 without auth |
| Static Data | Yes | Award data matches spec values |
| Responsive | Yes | Sidebar hidden on mobile; dropdown hidden on desktop |

### Test Environment

- **Environment type**: Local (Vitest with jsdom)
- **Test data strategy**: Static constants from `src/config/awards.ts`
- **Isolation approach**: Each test file independent; no shared state

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| `next/navigation` | Mock (`vi.mock`) | Avoid full Next.js router in unit tests |
| `next/image` | Passthrough mock | Avoid network requests in tests |
| `IntersectionObserver` | Mock | jsdom does not implement it |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Static award data | 100% | High — data accuracy is critical |
| Page render (6 cards) | 95%+ | High — core US1 |
| Navigation (sidebar + dropdown) | 80%+ | Medium — US2 |
| Middleware (public route) | 100% | High — security |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `IntersectionObserver` not in jsdom | High | Medium | Mock it in `src/test/setup.ts` |
| `backdrop-filter: blur` not rendering in screenshots | Low | Low | Document as known visual limitation |
| Existing `Award` type extension breaks homepage | Medium | High | Add new fields as optional first, then required |
| SP dropdown z-index clash with sticky header | Low | Medium | Use `z-50` on header, `z-40` on dropdown |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved
- [x] `design-style.md` completed
- [x] Award image assets present in `public/assets/home/images/`
- [x] No API contracts needed (static data)

### External Dependencies

None.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown for `zFYDgyj_pD-he-thong-giai`
2. **Review** tasks.md for parallelization opportunities (data + UI tasks can run in parallel)
3. **Begin** Phase 1 (Foundation) following TDD cycle

---

## Notes

- The homepage `AwardCard` component (`src/components/home/AwardCard.tsx`) is a compact grid
  card (336px). The `/awards` page `AwardsDetailCard` is a full-width expanded layout
  (image 336×336px + content block side by side). These are **two different components**.
- The `Award` type extension should add the new fields as **optional** in the first step to
  avoid breaking the homepage `AwardsSection`. After confirming no regression, make required.
- Tailwind CSS `text-shadow` is not a built-in utility in TailwindCSS 4 — use inline `style`
  for the active nav text-shadow: `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`.
- `scroll-behavior: smooth` must be set globally in `globals.css` on `html` element (already
  common for Next.js apps — verify it's present).
- The SP "Awards" bottom nav bar is part of the SP layout and is shown only on mobile.
  This shares design with the iOS `[iOS] Award_*` Figma frames.
