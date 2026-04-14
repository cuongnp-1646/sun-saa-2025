# Tasks: Homepage SAA

**Screen**: `i87tDx10uM-homepage-saa`
**Plan**: `plan.md`
**Created**: 2026-04-07

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1–US6)
- **|**: Primary file affected

---

## Phase 0: Asset Preparation

**Purpose**: Download all Figma media assets before any UI work begins.

**⚠️ BLOCKING**: Phases 3–6 depend on assets being present in `public/assets/home/`.

- [x] T001 Download all Figma media assets via `mcp__momorph__get_media_files` for screenId `i87tDx10uM` | public/assets/home/
- [x] T002 [P] Verify asset filenames and paths match plan.md mapping table; rename to kebab-case if needed | public/assets/home/

**Asset targets** (from plan.md):
```
public/assets/home/images/
  bg-keyvisual.png, text-root.png, text-further.png
  award-top-talent.png, award-top-project.png, award-top-project-leader.png
  award-best-manager.png, award-signature-creator.png, award-mvp.png
  award-name-top-talent.png, award-name-top-project.png, award-name-top-project-leader.png
  award-name-best-manager.png, award-name-signature-creator.png, award-name-mvp.png
  bg-kudos.png
public/assets/home/icons/
  arrow-up.svg, pen.svg, kudos-logo.svg, bell.svg
public/assets/shared/logos/
  saa-logo.png  (verify if same as /assets/login/logos/logo.png)
```

**Checkpoint**: All assets present in `public/assets/home/` — UI phases can begin.

---

## Phase 1: Foundation (Blocking Prerequisites)

**Purpose**: CSS tokens, types, config files, and CountdownTimer adaptation.

**⚠️ CRITICAL**: No component work can begin until T003–T008 are complete.

- [x] T003 Add Montserrat font weights 400 and 500 to font loader | src/app/layout.tsx
- [x] T004 [P] Add homepage CSS design tokens to globals.css (hero gradient, award card vars, new spacing/shadow tokens from plan.md §CSS Variables) | src/app/globals.css
- [x] T005 [P] Create Award, NavLink, NotificationCount TypeScript interfaces | src/types/home.ts
- [x] T006 [P] Create ROUTES and AWARD_ROUTES navigation constants (derived from SCREENFLOW.md) | src/config/navigation.ts
- [x] T007 [P] Create AWARDS static config array (6 items: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025-Creator, MVP) | src/config/awards.ts
- [x] T008 Adapt CountdownTimer — add `onZero?: () => void` callback prop; update existing countdown tests to cover new prop | src/components/countdown/CountdownTimer.tsx

**Checkpoint**: Foundation complete — all tokens defined, types exist, navigation constants ready, CountdownTimer adapted.

---

## Phase 2: Shared Infrastructure (Header + Footer)

**Purpose**: Reusable header and footer used across all screens. TDD required.

**⚠️ PREREQUISITE**: Phase 1 complete.

- [x] T009 Write failing tests: Header renders logo, 3 nav links, controls; "About SAA 2025" has `aria-current="page"` when `activeRoute="home"` | src/test/home/Header.test.tsx
- [x] T010 Implement Header server shell (logo + HeaderNav + HeaderControls layout, `backdrop-filter` blur, sticky positioning) | src/components/shared/Header.tsx
- [x] T011 [P] Implement HeaderNav — active link gold text + underline, hover bg, `aria-current` prop | src/components/shared/HeaderNav.tsx
- [x] T012 Implement HeaderControls client component (bell icon with badge, VN/EN language toggle, avatar button; manages `isProfileMenuOpen`, `isLanguageMenuOpen`, `isNotificationOpen` state) | src/components/shared/HeaderControls.tsx
- [x] T013 [P] Write failing tests: Footer renders 4 nav links and copyright text | src/test/home/Footer.test.tsx
- [x] T014 [P] Implement Footer server component (logo, nav links, copyright "Bản quyền thuộc về Sun* © 2025") | src/components/shared/Footer.tsx

**Checkpoint**: Header and Footer render correctly; tests pass.

---

## Phase 3: User Stories 1 & 2 — Navigation + Countdown Hero (P1) 🎯 MVP

**Goal**: Authenticated user sees full hero section with countdown, event info, and CTAs; all nav links work.

**Independent Test**: Visit `/` as authenticated user; verify header visible with correct links, countdown updates, CTA buttons navigate to `/awards` and `/kudos`.

### US1 — Navigation & CTAs

- [x] T015 [US1] Write failing tests: HeroCTA renders "ABOUT AWARDS" → `/awards` and "ABOUT KUDOS" → `/kudos`; buttons have correct visual styles (primary gold vs bordered) | src/test/home/HeroCTA.test.tsx
- [x] T016 [US1] Implement HeroCTA server component (two buttons with CSS tokens from design-style.md: sizes 276×60px and 258×60px, `--radius-cta-btn`, hover shadow) | src/components/home/HeroCTA.tsx

### US2 — Countdown Timer in Hero

- [x] T017 [P] [US2] Implement EventInfo server component (static B2 block: 18h30 time, venue, streaming note; typography from design-style.md `--text-body-bold`) | src/components/home/EventInfo.tsx
- [x] T018 [US2] Implement HeroContent server component (B1 countdown label + CountdownTimer with `onZero={undefined}`, B2 EventInfo, B3 HeroCTA; gap/layout from design-style.md) | src/components/home/HeroContent.tsx
- [x] T019 [US1] Implement HeroSection server component (full-bleed `bg-keyvisual.png` via `<Image priority>`, gradient overlay `--gradient-hero-overlay`, HeroContent positioned in left half) | src/components/home/HeroSection.tsx

**Checkpoint**: Hero section visible with countdown, event info, and CTA buttons; US1+US2 independently testable.

---

## Phase 4: User Story 3 — Awards Section (P2)

**Goal**: 6 award cards display in 3-col grid (desktop), 2-col (tablet/mobile) with hover effect and working navigation.

**Independent Test**: Scroll to awards section; verify 6 cards render with thumbnails, titles, descriptions clamped at 2 lines, and "Chi tiết" links resolve to `/awards#{slug}`.

- [x] T020 [US3] Write failing tests: AwardCard renders image with alt text, title, 2-line-clamped description, "Chi tiết" link → `/awards#{slug}`; `aria-label` unique per card | src/test/home/AwardCard.test.tsx
- [x] T021 [US3] Implement AwardCard server component (336×336px card, `--color-award-card-bg`, `--border-award-card`, hover lift with `--shadow-card-hover`, description line-clamp-2, `aria-label="Chi tiết về {name}"`) | src/components/home/AwardCard.tsx
- [x] T022 [US3] Write failing tests: AwardsSection renders exactly 6 AwardCards; grid is 3-col at lg, 2-col at md | src/test/home/AwardsSection.test.tsx
- [x] T023 [US3] Implement AwardsSection server component (C1 header: caption "GIẢI THƯỞNG", title "Hệ thống giải thưởng", divider; C2 grid with 6 AwardCards from `AWARDS` config) | src/components/home/AwardsSection.tsx
- [x] T024 [P] [US3] Implement RootFurtherSection server component (B4: text-root.png + text-further.png images + quote paragraph; `--spacing-root-further-px/py`) | src/components/home/RootFurtherSection.tsx

**Checkpoint**: Awards section visible with 6 working cards; RootFurther block renders.

---

## Phase 5: User Stories 4 & 5 — Kudos Section + Floating Widget (P2 + P3)

**Goal**: Kudos promo block with working "Chi tiết" link; floating pill button always visible and opens action menu.

**Independent Test (US4)**: Scroll to D1 Kudos section; click "Chi tiết" → navigates to `/kudos`.
**Independent Test (US5)**: Floating button visible at any scroll position; click → action menu opens.

- [x] T025 [P] [US4] Implement KudosSection server component (D1: label "Phong trào ghi nhận", title "Sun* Kudos", description, "Chi tiết" button → `/kudos`, `bg-kudos.png` image) | src/components/home/KudosSection.tsx
- [x] T026 [US5] Write failing tests: FloatingWidget renders fixed at bottom-right; click opens action menu; keyboard accessible | src/test/home/FloatingWidget.test.tsx
- [x] T027 [US5] Implement FloatingWidget client component (106×64px pill, `--color-widget-bg`, `--radius-widget`, `fixed bottom-8 right-8 z-50`, pen icon + separator + SAA logo, `isMenuOpen` state, `aria-label="Quick actions"`) | src/components/home/FloatingWidget.tsx

**Checkpoint**: Kudos section and floating widget functional; US4+US5 independently testable.

---

## Phase 6: Page Assembly + Integration

**Goal**: Compose full HomePage; wire into `src/app/page.tsx`; verify auth gate and full render.

**Independent Test**: Load `/` as authenticated user → all 6 sections visible, no JS errors, auth gate redirects unauthenticated users to `/login`.

- [x] T028 [US1] Write failing tests: HomePage renders Header, HeroSection, RootFurtherSection, AwardsSection, KudosSection, Footer, FloatingWidget; authenticated user sees all sections | src/test/home/HomePage.test.tsx
- [x] T029 [US1] Implement HomePage server component (compose all sections in correct order; pass `activeRoute="home"` to Header) | src/components/home/HomePage.tsx
- [x] T030 [US1] Modify page.tsx — replace placeholder "SAA 2025 — Coming Soon" with `<HomePage />`; preserve Supabase auth check and redirect to `/login` for unauthenticated | src/app/page.tsx
- [x] T031 Visual verification: Playwright screenshot at 1512×1077 and compare against `assets/frame.png` reference | .playwright-mcp/

**Checkpoint**: All tests pass; full page renders correctly; auth gate preserved.

---

## Phase 8: Visual Bug Fixes (Figma Diff — 2026-04-07)

**Source**: Playwright screenshot at 1512×982 compared against Figma frame `i87tDx10uM` (figmaFrameId `2167:9026`).

**Bugs identified**:
| ID | Section | Issue | Severity |
|----|---------|-------|----------|
| FB-01 | Hero | ROOT FURTHER logo images missing from HeroContent — only appear in B4, not in B1 hero area as Figma shows | High |
| FB-02 | Hero | EventInfo content mismatch — Figma shows "26/12/2025 / Âu Cơ Art Center / Tường thuật trực tiếp qua sóng Livestream"; implementation has "18h30 / Nhà hát nghệ thuật quân đội" | Medium |
| FB-03 | Root Further | Body text truncated — implementation has 2 paragraphs + quote; Figma has 5+ substantial paragraphs describing the Root Further theme | Medium |
| FB-04 | Kudos | Missing "ĐIỂM MỚI CỦA SAA 2025" label and description text differs from Figma (Figma describes the Kudos activity details; implementation has a generic description) | Medium |
| FB-05 | Hero | `CountdownTimer` was receiving an arrow function prop from a Server Component (`HeroContent`) causing a 500 runtime error — **FIXED**: removed arrow fn, added `CountdownPageTimer` client wrapper for the prelaunch page | Critical (Fixed) |

---

- [x] T037 [FB-01] Add ROOT FURTHER logo images (text-root.png + text-further.png) to HeroContent above the "Coming soon" label; use same image sizes as B4 but at a larger display scale matching Figma hero layout (verify exact size from Figma design item `2167:9026`) | src/components/home/HeroContent.tsx
- [x] T038 [FB-02] Update EventInfo static content to match Figma: time → "26/12/2025", venue → "Âu Cơ Art Center", streaming note → "Tường thuật trực tiếp qua sóng Livestream" | src/components/home/EventInfo.tsx
- [x] T039 [FB-03] Expand RootFurtherSection body text with full Figma narrative (5+ paragraphs) retrieved via `mcp__momorph__list_design_items` for node `5001:14827`; preserve quote and translation line | src/components/home/RootFurtherSection.tsx
- [x] T040 [FB-04] Add "ĐIỂM MỚI CỦA SAA 2025" label to KudosSection (between title and description); update description text with Figma content retrieved via design item `3390:10349` | src/components/home/KudosSection.tsx
- [x] T041 [P] Re-run Playwright screenshot after FB-01–FB-04 fixes and verify visual match against Figma frame | .playwright-mcp/

**Checkpoint**: All FB-xx bugs resolved, visual comparison within acceptable threshold.

---

## Phase 9: Bug Fixes — Footer & Sun* Kudos (2026-04-09)

**Source**: Visual comparison revealed two UI mismatches vs Figma frame `i87tDx10uM`.

**Bugs identified**:
| ID | Section | Issue | Severity |
|----|---------|-------|----------|
| FB-FOOTER | Footer | Layout is `flex-col` (vertically stacked: logo → links → copyright). Figma shows `flex-row justify-between`: logo (left), nav links (center), copyright (right). Padding should be `px-[90px]` not `px-[144px]`. Nav link weight should be 700, not 400. | High |
| FB-KUDOS | Sun* Kudos | Kudos brand logo (icon + "KUDOS" text — Figma node `I3390:10349;329:2948`) is missing from the right side of the section. `kudos-brand-logo.svg` asset is also corrupted (S3 expired URL). | High |

- [x] T042 [FB-FOOTER] Fix Footer layout: change `flex-col items-center` → `flex-row justify-between items-center`; set `px-[90px] py-10`; make logo 69×64px; set nav link `font-bold text-[14px] hover:text-[#FFEA9E]`; copyright `text-white/70 text-[14px] font-normal` | src/components/shared/Footer.tsx
- [x] T043 [FB-KUDOS] Re-downloaded Kudos brand logo (892ba531…svg 364×74px) from Figma media; saved to `public/assets/home/icons/kudos-brand-logo.svg`; moved KudosSection to `src/components/shared/KudosSection.tsx` (shared by home + awards); added brand logo to right side matching Figma node `I3390:10349;329:2948` | src/components/shared/KudosSection.tsx, src/components/home/KudosSection.tsx (re-export), public/assets/home/icons/kudos-brand-logo.svg
- [x] T044 [P] KudosSection moved to shared/; HomePage and AwardsPage both import from `@/components/shared/KudosSection`; tsc --noEmit passes | src/components/home/HomePage.tsx, src/components/awards/AwardsPage.tsx

**Checkpoint**: Footer renders as single horizontal row; KudosSection shows Kudos brand logo on right; tests pass.

---

## Phase 10: Bug Fixes — FloatingWidget 2-State Design (2026-04-14)

**Source**: FAB designs `_hphd32jN2` (collapsed) and `Sv7DFwBw1h` (expanded) reviewed against implementation.

**Bugs identified**:
| ID | Component | Issue | Severity |
|----|-----------|-------|----------|
| FB-FAB-01 | FloatingWidget | Collapsed pill shows `kudos-logo` as 3rd icon (correct), but expanded state was a generic dark dropdown with only "Viết Kudo" — missing "Thể lệ" action button and proper yellow pill style | High |
| FB-FAB-02 | FloatingWidget | Expanded state had no dedicated close button; used the pill to toggle. Figma shows separate red 56×56px circular close button at bottom | High |
| FB-FAB-03 | FloatingWidget | "Viết KUDOS" in FAB opened `/kudos` link instead of launching WriteKudoModal directly | Medium |
| FB-FAB-04 | navigation.ts | Missing `theLeRules: '/the-le'` route for the "Thể lệ" destination | Low |

- [x] T045 [FB-FAB-04] Add `theLeRules: '/the-le'` to ROUTES in navigation.ts | src/config/navigation.ts
- [x] T046 [FB-FAB-01] [FB-FAB-02] [FB-FAB-03] Rewrite FloatingWidget with 2 proper states matching Figma designs `_hphd32jN2` (collapsed pill 106×64px, glow shadow) and `Sv7DFwBw1h` (expanded: Thể lệ 149×64px + Viết KUDOS 214×64px + red close 56×56px); wire WriteKudoModal internally | src/components/home/FloatingWidget.tsx

**Checkpoint**: Collapsed pill shows pen + "/" + SAA logo with glow; click expands to 2 action buttons + red close; "Viết KUDOS" opens WriteKudoModal.

---

## Phase 7: Polish & Accessibility

**Purpose**: Accessibility audit, type safety, lint, and responsive checks.

- [ ] T032 [P] Verify all interactive elements have correct ARIA labels per spec accessibility table (Header nav, bell, language, avatar, countdown, award cards, "Chi tiết" buttons, floating widget, footer) | src/components/
- [ ] T033 [P] Run `yarn tsc --noEmit` — zero TypeScript type errors | (CI validation)
- [ ] T034 [P] Run `yarn lint` — zero ESLint errors | (CI validation)
- [ ] T035 Run `yarn test` — all tests pass with ≥80% coverage on core components | (CI validation)
- [ ] T036 Playwright responsive visual check at mobile (375px width) and tablet (768px width) — verify hero stacks, award grid is 2-col, header controls remain accessible | .playwright-mcp/

**Checkpoint**: All tests pass, zero type/lint errors, responsive layouts verified — Homepage SAA is complete.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 0 (Assets) ──────────────────────┐
                                        │
Phase 1 (Foundation) ──────────────────┤──> Phase 2 (Header/Footer) ──> Phase 3 (Hero)
  T003 → T004,T005,T006,T007 [P]       │                                     │
  T008 (requires T005)                  │                            Phase 4 (Awards) ──> Phase 5 (Kudos/Widget)
                                        │                                     │
Phase 0 unblocks Phases 3–5 visuals ───┘              Phase 6 (Assembly) <──┘
                                                              │
                                                       Phase 7 (Polish)
```

### Within Each Phase (TDD order)

1. **Tests FIRST** → must fail before implementation begins
2. Types/interfaces before components that use them
3. Leaf components (`AwardCard`) before container (`AwardsSection`)
4. Shared components (`Header`, `Footer`) before page composition (`HomePage`)

### Parallel Opportunities

| Parallel Group | Tasks | Condition |
|----------------|-------|-----------|
| Phase 1 foundation files | T004, T005, T006, T007 | Different files, no deps on each other |
| Shared components | T011, T013, T014 | T010 must start first; T011/T013/T014 can parallelize |
| Hero components | T017 (EventInfo) | Independent of T015/T016 |
| Awards leaf + Root Further | T020–T023, T024 | T024 independent; T020→T021, T022→T023 sequential |
| Kudos + Widget | T025, T026→T027 | T025 independent of T026/T027 |
| Phase 7 checks | T032, T033, T034 | Independent validations |

---

## Implementation Strategy

### MVP Scope (Phase 0 + 1 + 2 + 3 = US1 + US2)

1. Complete Phase 0 (assets) + Phase 1 (foundation)
2. Complete Phase 2 (Header/Footer)
3. Complete Phase 3 (Hero with navigation + countdown)
4. **STOP and VALIDATE**: Visit `/`, verify nav links work and countdown displays
5. Deploy if ready — US1+US2 alone make the page functional

### Incremental Delivery

1. Phase 0 + 1 + 2 + 3 → US1+US2 functional (navigation + countdown) → Test + Deploy
2. Phase 4 → US3 (awards grid) → Test + Deploy
3. Phase 5 → US4+US5 (Kudos + widget) → Test + Deploy
4. Phase 6+7 → Full assembly + polish → Final deploy

---

## Open Questions (from plan.md)

Resolve before starting Phase 3:
- [ ] **Event info values**: Which is correct — "18h30 / Nhà hát nghệ thuật quân đội" or "26/12/2025 / Âu Cơ Art Center"?
- [ ] **Notification badge**: Use `/api/notifications` or hardcode `0` for MVP?
- [ ] **SAA Logo**: Same file as `/assets/login/logos/logo.png`? (check before Phase 0 download)
- [ ] **Award data**: Confirmed static config for MVP? No Supabase fetch needed?

---

## Notes

- Commit after each phase checkpoint (conventional commit format: `feat: add homepage hero section`)
- Mark tasks complete as you go: `[x]`
- All design token values come from `design-style.md` — no guessing or hardcoding
- Navigation URLs come from `navigation.ts` constants — never hardcoded in components (constitution rule TR-005)
