# Tasks: Countdown - Prelaunch page

**Screen**: `8PJQswPZmU-countdown-prelaunch-page`
**Plan**: `plan.md`
**Created**: 2026-04-07

---

## Phase 0 — Asset Preparation

- [x] T-001: Download background image from Figma (`MM_MEDIA_BG Image`, node `2268:35129`) → `public/assets/countdown/images/bg-countdown.png`
- [ ] T-002: Source "Digital Numbers" font file `.woff2` → `public/assets/countdown/fonts/digital-numbers.woff2`

---

## Phase 1 — Foundation (CSS Tokens, Types, Hook)

- [x] T-101: Add countdown design tokens to `src/app/globals.css` (colors, spacing, gradient, radius)
- [x] T-102: Add `@font-face` declaration for "Digital Numbers" in `src/app/globals.css`
- [x] T-103: Create `src/types/countdown.ts` — `CountdownState` interface
- [x] T-104: Write failing tests → `src/test/countdown/useCountdown.test.ts` (TDD)
- [x] T-105: Implement `src/hooks/useCountdown.ts` — make T-104 tests pass

---

## Phase 2 — Core Components (P1: Countdown Display)

- [x] T-201: Write failing tests → `src/test/countdown/CountdownTimer.test.tsx` (TDD)
- [x] T-202: Implement `src/components/countdown/DigitCard.tsx`
- [x] T-203: Implement `src/components/countdown/TimeUnit.tsx`
- [x] T-204: Implement `src/components/countdown/CountdownTimer.tsx` (`'use client'`)
- [x] T-205: Implement `src/components/countdown/CountdownPage.tsx` (layout shell)
- [x] T-206: Create `src/app/countdown/page.tsx` (Server Component + metadata)

---

## Phase 3 — Middleware: Countdown Gate

- [x] T-301: Write failing tests → `src/test/countdown/middleware-countdown.test.ts` (TDD)
- [x] T-302: Update `src/middleware.ts` — add countdown-active gate before auth checks

---

## Phase 4 — Background Visual (P2)

- [x] T-401: Integrate `bg-countdown.png` into `CountdownPage.tsx` via Next.js `<Image>`
- [x] T-402: Add `<noscript>` fallback to `CountdownPage.tsx`

---

## Phase 5 — Responsive + Polish (P3)

- [x] T-501: Add responsive Tailwind classes (mobile/tablet breakpoints) to countdown components
- [x] T-502: Add skeleton animation for hydration placeholder state
- [x] T-503: Add `-webkit-backdrop-filter` for Safari support in `DigitCard.tsx`

---

## Phase 6 — Environment & Validation

- [x] T-601: Add `NEXT_PUBLIC_LAUNCH_DATE` and `NEXT_PUBLIC_COUNTDOWN_ACTIVE` to `.env.example`
- [x] T-602: Run `yarn test` — verify all countdown tests pass
- [x] T-603: TypeScript type-check — `yarn tsc --noEmit`
- [x] T-601b: Add `NEXT_PUBLIC_LAUNCH_DATE` and `NEXT_PUBLIC_COUNTDOWN_ACTIVE` to `.env.development`

---

## Phase 7 — Visual Bug Fixes

- [x] T-701: Fix `CountdownTimer.tsx` — timer row direction backwards (`sm:flex-col` → `flex-col sm:flex-row`)
- [x] T-702: Fix `CountdownPage.tsx` — content vertical centering (`absolute top-[218px]` → `flex items-center justify-center`)
- [x] T-703: Fix `TimeUnit.tsx` — label alignment (`items-start sm:items-center` → `items-center`)
- [x] T-704: Fix `DigitCard.tsx` — responsive sizes backwards (`w-[77px] md:w-[70px] sm:w-[60px]` → `w-[54px] sm:w-[65px] lg:w-[77px]`)
- [x] T-705: Fix `TimeUnit.tsx` — label font sizes backwards → `text-[20px] sm:text-[26px] lg:text-[36px]`
- [x] T-706: Fix `CountdownPage.tsx` — title font sizes backwards → `text-[22px] sm:text-[28px] lg:text-[36px]`
- [x] T-707: Fix `CountdownTimer.tsx` — unit gaps backwards → `gap-8 sm:gap-10 lg:gap-[60px]`
- [x] T-708: Screenshot verification at 1512×1077 — layout matches Figma reference ✓
- [ ] T-709: Source "Digital Numbers" font `.woff2` and enable `@font-face` in `globals.css` (unblocks pixel-perfect digit rendering)

---

## Phase 8 — Bug Fixes (vs Figma 2268:35127)

### Bug comparison method
- Figma source: `momorphFrameId: 6380`, `figmaFrameId: 2268:35127`
- Screenshot taken at 1512×1077 and compared against Figma frame data from `list_frame_styles` / `list_design_items`

- [x] T-801: Fix `CountdownPage.tsx` — content vertical position
  - **Bug**: `flex items-center justify-center` places content at ~38% from top (~406px), but Figma positions "Bìa" container with `absolute top-[218px]` placing the title at y=314px (29.1% from top) — delta ~92px lower than design
  - **Fix**: Used `lg:absolute lg:top-[314px]` (= 218px Bìa top + 96px padding = 314px title start); mobile/tablet keeps flex-centered flow
  - **Files**: `src/components/countdown/CountdownPage.tsx`

- [x] T-802: Fix `DigitCard.tsx` — digit font size at intermediate breakpoints
  - **Bug**: `clamp(36px, 4.9vw, 73.73px)` — at lg breakpoint start (1024px), 4.9vw = 50.2px but card width is 77px (should be ~73.73px); font too small relative to card at all non-max viewport widths
  - **Fix**: Replaced with `text-[52px] sm:text-[62px] lg:text-[73.73px]` (proportional to card widths at each breakpoint)
  - **Files**: `src/components/countdown/DigitCard.tsx`

- [x] T-803: Fix `TimeUnit.tsx` — label alignment `items-center` → `items-start`
  - **Bug**: `items-center` centers the label (e.g. DAYS=103px, HOURS=138px) within the 175px unit container; Figma shows `align-items: flex-start` — label x=434 same as digit pair x=434 (left-aligned)
  - **Fix**: Changed outer container `items-center` → `items-start` in `TimeUnit.tsx`
  - **Files**: `src/components/countdown/TimeUnit.tsx`

- [x] T-804: Screenshot verification after T-801–T-803 — layout matches Figma at 1512×1077 ✓
  - Title at y≈314px ✓, timer at y≈386px ✓, labels left-aligned ✓, digit sizes proportional ✓
  - Remaining gap: Digital Numbers font (T-709, pending font file)
