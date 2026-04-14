# Tasks: Hệ Thống Giải Thưởng (Awards System)

**Frame**: `zFYDgyj_pD-he-thong-giai`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅
**Created**: 2026-04-08

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1, US2, US3)
- **|**: Primary file affected

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and verify assets needed for all phases.

- [x] T001 Create `src/components/awards/` directory and verify all award image assets exist in `public/assets/home/images/` (award-bg.png, award-name-*.png × 6) | public/assets/home/images/
- [x] T002 [P] Extend `Award` interface in `src/types/home.ts` — add optional fields: `count: string`, `countUnit: string`, `value: string`, `valueSuffix: string` | src/types/home.ts
- [x] T003 [P] Add count/value data to all 6 entries in `src/config/awards.ts` using spec values (Top Talent: 10/Cá nhân/7.000.000 VNĐ/cho mỗi giải thưởng … MVP: 01/Cá nhân/15.000.000 VNĐ/cho giải cá nhân) | src/config/awards.ts

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Middleware public-route registration and test infrastructure required by all stories.

**⚠️ CRITICAL**: User story phases cannot begin until this is complete.

- [x] T004 Add `/awards` to `PUBLIC_ROUTES` set in `src/middleware.ts` so the page is accessible without auth | src/middleware.ts
- [x] T005 Update `src/test/middleware.test.ts` — add test asserting GET `/awards` returns 200 without Supabase session (verify public route) | src/test/middleware.test.ts
- [x] T006 Create `src/test/awards/` directory and add `src/test/awards/awards-data.test.ts` — write unit tests that assert: (a) `AWARDS` has exactly 6 entries, (b) each entry has non-empty `count`, `countUnit`, `value`, `valueSuffix`, (c) exact values match spec (e.g., Top Talent count="10", value="7.000.000 VNĐ") | src/test/awards/awards-data.test.ts

**Checkpoint**: Run `npx vitest run src/test/middleware.test.ts src/test/awards/awards-data.test.ts` — both must pass (green) before Phase 3.

---

## Phase 3: User Story 1 — Browse all award categories (Priority: P1) 🎯 MVP

**Goal**: `/awards` page renders all 6 award categories with correct image, title, description, count, and prize value — visible on both PC and SP without authentication.

**Independent Test**: Open `/awards` in browser (or run unit tests) — verify 6 cards are present with correct data. No auth required.

### Static UI Components (US1)

- [x] T007 [P] [US1] Create `AwardsSectionTitle` Server Component — renders "Sun* Annual Awards 2025" sub-label (24px 700 white) + `#2E3940` 1px divider + "Hệ thống giải thưởng SAA 2025" heading (57px 700 `#FFEA9E` ls:-0.25px); responsive scaling (32px/40px/57px) | src/components/awards/AwardsSectionTitle.tsx
- [x] T008 [P] [US1] Create `AwardsKeyvisual` Server Component — full-bleed hero banner reusing `public/assets/home/images/bg-keyvisual.png` with gradient overlay and the SAA 2025 hero artwork; no interactive content | src/components/awards/AwardsKeyvisual.tsx
- [x] T009 [US1] Create `AwardsDetailCard` Server Component — full-detail layout per Figma D.1–D.6: left side award image (336×336px, `box-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`, `mix-blend-mode: screen`), right side content block (`flex-col gap-8 rounded-2xl backdrop-blur-[32px]`) containing: (1) icon+name row (24px 700 `#FFEA9E`), (2) description (16px 700 white ls:0.5px text-justify), (3) count meta block ("Số lượng giải thưởng:" label 24px gold + number 36px white + unit 14px white), (4) value meta block ("Giá trị giải thưởng:" label 24px gold + value 36px white + note 14px white); responsive: stacked on mobile, side-by-side on lg | src/components/awards/AwardsDetailCard.tsx
- [x] T010 [US1] Create `AwardsPage` Server Component — assembles full page layout: `<AwardsKeyvisual>` → `<AwardsSectionTitle>` → content area with `flex-row` (sidebar placeholder left + `<AwardsDetailCard>` list right, gap-[80px] between cards) → `<KudosSection>`; page px: `lg:px-[144px]` | src/components/awards/AwardsPage.tsx
- [x] T011 [US1] Create `src/app/awards/page.tsx` — Next.js page route; Server Component; `export const dynamic = "force-static"`; renders `<Header activeRoute="awards" />` + `<AwardsPage />` + `<Footer />`; no auth check (public) | src/app/awards/page.tsx

### Tests (US1)

- [x] T012 [US1] Write `src/test/awards/awards-page.test.tsx` — render `<AwardsPage />` and assert: (a) 6 `<article>` or `<section>` elements with award names present, (b) "Top Talent" text visible, (c) "7.000.000 VNĐ" text visible, (d) "Hệ thống giải thưởng SAA 2025" heading present | src/test/awards/awards-page.test.tsx

**Checkpoint**: Run `npx vitest run src/test/awards/` — all pass. Open `http://localhost:3001/awards` — 6 award sections visible without login.

---

## Phase 4: User Story 2 — Jump to a specific award (Priority: P2)

**Goal**: Desktop sidebar nav (sticky, 178px, scroll-spy) + mobile dropdown selector — both allow navigating to any award section with smooth scroll and active state highlight.

**Independent Test**: (a) Click sidebar item "MVP" → page scrolls to MVP section, "MVP" nav item shows gold text + gold underline. (b) Open SP dropdown → select "Best Manager" → scrolls to Best Manager, dropdown trigger shows "Best Manager".

### Interactive Navigation (US2)

- [x] T013 [P] [US2] Create `AwardsSidebarNav` Client Component (`'use client'`) — vertical list of 6 award items (178px wide, `gap: 16px`, sticky); each item is `<a href="#award-{slug}">` with Montserrat 16px 700; inactive: white text; active: `#FFEA9E` text + `border-b border-[#FFEA9E]` + `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`; implement `IntersectionObserver` on each award section ref to track active item as user scrolls | src/components/awards/AwardsSidebarNav.tsx
- [x] T014 [P] [US2] Create `AwardsDropdown` Client Component (`'use client'`) — SP-only dropdown selector showing current award name + chevron; open/close on click; panel: `rounded-xl border-[#998C5F] bg-[#0B0F12]`; selecting an item: updates trigger label, smooth-scrolls to `#award-{slug}`, closes panel; closes on outside click and Escape key; `role="combobox"`, `aria-expanded`, keyboard navigable | src/components/awards/AwardsDropdown.tsx
- [x] T015 [US2] Update `AwardsPage` to wire in navigation: add `id="award-{slug}"` on each `AwardsDetailCard` wrapper; add `<AwardsSidebarNav>` in left column (hidden below lg: `hidden lg:flex`); add `<AwardsDropdown>` above award list (visible below lg: `block lg:hidden`); ensure `scroll-behavior: smooth` is set on `html` in `src/app/globals.css` | src/components/awards/AwardsPage.tsx

### Tests (US2)

- [x] T016 [US2] Write `src/test/awards/awards-nav.test.tsx` — mock `IntersectionObserver`; render `<AwardsSidebarNav awards={AWARDS} activeSlug="top-talent" onSelect={fn} />`; assert: (a) "Top Talent" item has gold active class, (b) clicking "MVP" calls `onSelect("mvp")`, (c) render `<AwardsDropdown>` closed by default, (d) after click opens and lists 6 items, (e) selecting "Best Manager" calls onSelect and closes | src/test/awards/awards-nav.test.tsx

**Checkpoint**: Run `npx vitest run src/test/awards/awards-nav.test.tsx` — all pass. In browser: sidebar click scrolls to section and highlights correct item.

---

## Phase 5: User Story 3 — Navigate to Sun* Kudos (Priority: P3)

**Goal**: Sun* Kudos promo block at page bottom shows correctly and "Chi tiết" button navigates to `/kudos`.

**Independent Test**: Scroll to bottom of `/awards` → click "Chi tiết" → browser navigates to `/kudos`.

### Kudos Block Integration (US3)

- [x] T017 [US3] Verify `<KudosSection>` is correctly included in `AwardsPage` and renders after the last award card (`D.6_MVP`); confirm "Chi tiết" button `href` points to `/kudos` (uses `ROUTES.kudos` from `src/config/navigation.ts`) | src/components/awards/AwardsPage.tsx

**Checkpoint**: Navigate to `/awards` bottom — Kudos block visible, "Chi tiết" → `/kudos`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, visual fine-tuning, responsive verification, and final test run.

- [x] T018 [P] Add `aria-label="Award categories"` to sidebar `<nav>`, `aria-current="true"` on active nav item, and `alt="[Award name] award image"` on all award images in `AwardsDetailCard` | src/components/awards/AwardsSidebarNav.tsx, src/components/awards/AwardsDetailCard.tsx
- [x] T019 [P] Verify responsive layout: award card is `flex-col` on mobile (image full-width stacked above content) and `flex-row` on lg (image 336px left, content right); section heading scales from 32px (mobile) → 40px (sm) → 57px (lg) | src/components/awards/AwardsDetailCard.tsx, src/components/awards/AwardsSectionTitle.tsx
- [x] T020 [P] Add hover state to "Chi tiết" button in KudosSection: `transition: box-shadow 150ms ease-out` with gold glow on hover (already implemented in KudosSection — verify it applies correctly from `/awards` page context) | src/components/home/KudosSection.tsx
- [x] T021 Run full Vitest suite (`npx vitest run`) — all 74+ tests must pass; fix any regressions | src/test/
- [x] T022 Take Playwright screenshot of `/awards` (desktop 1440px and mobile 390px) and compare against Figma `313:8436` reference; adjust any visual mismatches | .playwright-mcp/

---

## Phase 7: Bug Fixes (Figma Diff — 2026-04-08)

**Source**: Compared running screenshot vs `get_frame_node_tree` for `zFYDgyj_pD`.

- [x] T023 Fix duplicate anchor IDs — remove `id={award-${slug}}` from `<article>` in `AwardsDetailCard` (keep only wrapper `<div id>` in `AwardsPage`) | src/components/awards/AwardsDetailCard.tsx
- [x] T024 Add `#2E3940` 1px horizontal dividers inside award content block — one between description and count block (Figma `Rectangle 8`), one between count and value block (Figma `Rectangle 10`) | src/components/awards/AwardsDetailCard.tsx
- [x] T025 Signature Creator: add second value block — extend `Award` with optional `value2`/`valueSuffix2`; add data `value2="8.000.000 VNĐ" valueSuffix2="cho giải tập thể"`; render second value block with "Hoặc" separator (Figma node `313:8498`–`313:8501`) | src/types/home.ts, src/config/awards.ts, src/components/awards/AwardsDetailCard.tsx
- [x] T026 Update description texts to match Figma — Top Talent: use Figma node `I313:8467;214:2531` text; Signature Creator: use Figma node `313:8479` unique text; other 4 awards: use a long description that fits their context (Figma reused Top Talent placeholder for all instances) | src/config/awards.ts
- [x] T027 Add Target icon to sidebar nav items — both active and inactive items show `MM_MEDIA_Target`-style icon before label text (Figma `C.1_Top talent → MM_MEDIA_Target`) | src/components/awards/AwardsSidebarNav.tsx
- [x] T028 Fix value label icon — replace map-pin SVG with `MM_MEDIA_License` style icon (license/certificate shape) before "Giá trị giải thưởng:" (Figma `I313:8467;214:2543`) | src/components/awards/AwardsDetailCard.tsx
- [x] T029 Run full test suite + update tests for new data fields (value2/valueSuffix2); take final visual screenshot | src/test/

---

## Phase 8: Bug Fixes — Footer & Sun* Kudos (2026-04-09)

**Source**: Visual comparison revealed two UI mismatches shared with Homepage SAA. Both components (`Footer`, `KudosSection`) are shared — fixes on the shared components resolve both screens.

**Bugs identified**:
| ID | Section | Issue | Severity |
|----|---------|-------|----------|
| FB-FOOTER | Footer | Shared `Footer` component has `flex-col` stacked layout. Figma `354:4323` shows `flex-row justify-between`: logo (left), nav links (center), copyright (right) — same spec as homepage footer. | High |
| FB-KUDOS | Sun* Kudos | Shared `KudosSection` is missing Kudos brand logo (icon + "KUDOS" text — Figma node `I335:12023;329:2948`) on the right side. | High |

- [x] T030 [FB-FOOTER] Footer fix confirmed on `/awards` — shared `Footer` component uses horizontal layout (logo left, nav center, copyright right, `px-[90px]`) | src/components/shared/Footer.tsx
- [x] T031 [FB-KUDOS] KudosSection moved to `src/components/shared/KudosSection.tsx`; AwardsPage now imports from shared path; Kudos brand logo (364×74px) appears on right side matching Figma `I335:12023;329:2948` | src/components/shared/KudosSection.tsx, src/components/awards/AwardsPage.tsx

**Checkpoint**: `/awards` footer renders horizontal; KudosSection shows Kudos logo; tests pass.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └─► Phase 2 (Foundation) — BLOCKS all user stories
        ├─► Phase 3 (US1 — Browse) — MVP, must complete first
        │     └─► Phase 4 (US2 — Navigate) — depends on Phase 3 (needs section IDs)
        │           └─► Phase 5 (US3 — Kudos) — depends on AwardsPage existing
        └─► Phase 6 (Polish) — after all user stories
```

### Within Each Phase

- Phase 1: T002 and T003 can run **in parallel** (different files)
- Phase 3: T007 and T008 can run **in parallel** (different components, no dependency)
- Phase 4: T013 and T014 can run **in parallel** (AwardsSidebarNav and AwardsDropdown are independent)
- Phase 6: T018, T019, T020 can run **in parallel** (different files)

### Critical Path (sequential)

```
T001 → T004 → T005 → T006 → T009 → T010 → T011 → T012
                                              ↓
                                      T013 → T015 → T016
                                      T014 ↗
                                              ↓
                                           T017
                                              ↓
                                      T018/T019/T020 → T021 → T022
```

---

## Parallel Execution Examples

### Solo developer (sequential by priority):

```
Phase 1 → Phase 2 → Phase 3 (MVP) → VALIDATE → Phase 4 → Phase 5 → Phase 6
```

### Two developers in parallel:

```
Dev A: T001, T002, T004, T005, T007, T009, T010, T011, T013, T015, T018, T021
Dev B: T003, T006, T008, T012, T014, T016, T017, T019, T020, T022
```

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2 (T001–T006)
2. Complete Phase 3 US1 (T007–T012)
3. **STOP and VALIDATE**: `/awards` loads with 6 award sections, tests pass
4. Continue Phase 4 (navigation), Phase 5 (Kudos), Phase 6 (polish)

### Incremental Delivery

1. T001–T006 → foundation green
2. T007–T012 → static page visible → test → deploy
3. T013–T016 → navigation works → test → deploy
4. T017 → Kudos CTA works → test → deploy
5. T018–T022 → polish → final deploy

---

## Notes

- TDD cycle is **mandatory** per constitution: write tests → confirm red → implement → green → refactor.
- `IntersectionObserver` must be mocked in `src/test/setup.ts` for jsdom compatibility — check if mock already exists before adding.
- The `Award` type extension (T002) must be backward-compatible: add fields as **optional** first so existing homepage `AwardsSection` continues to work. After all phases pass, fields can be made required if desired.
- `AwardsDetailCard` is a **new component** distinct from the homepage `AwardCard` — do NOT reuse or modify `src/components/home/AwardCard.tsx`.
- Tailwind `text-shadow` is not built-in — use inline `style` prop for active nav text-shadow.
- Mark tasks `[x]` as you complete them.
- Commit after each checkpoint.
