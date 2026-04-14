# Implementation Plan: Countdown - Prelaunch page

**Frame**: `8PJQswPZmU-countdown-prelaunch-page`
**Date**: 2026-04-07
**Spec**: `specs/8PJQswPZmU-countdown-prelaunch-page/spec.md`

---

## Summary

Implement a full-screen pre-launch countdown page at `/countdown` that displays the remaining time (Days, Hours, Minutes) until the SAA 2025 event launches. The page is client-driven: a `useCountdown` hook runs a 1-second interval, derives `{ days, hours, minutes }` from `NEXT_PUBLIC_LAUNCH_DATE`, and feeds LED-style glass digit cards. The middleware is extended with a countdown-active gate so all app routes redirect to `/countdown` while `NEXT_PUBLIC_COUNTDOWN_ACTIVE=true`. The page is fully public (no auth required) and must handle SSR hydration safely.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4.x, `next/font/google` (Montserrat already loaded)
**Database**: N/A
**Testing**: Vitest + @testing-library/react + happy-dom (already configured)
**State Management**: Local React state via custom hook (`useCountdown`)
**API Style**: N/A — countdown is fully client-side from env var

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, single quotes, 2-space indent)
- [x] Uses approved libraries and patterns (Next.js 15, React 19, TailwindCSS 4.x, Vitest)
- [x] Adheres to folder structure guidelines (components under `src/components/countdown/`, page under `src/app/countdown/`, tests under `src/test/countdown/`)
- [x] Meets security requirements (public page, no auth, no user input, no secrets in code)
- [x] Follows testing standards (TDD: failing tests first, then implementation)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Local `@font-face` for "Digital Numbers" | Custom display font not available on Google Fonts; must be self-hosted | No equivalent font on Google Fonts produces the same LED-digit aesthetic |

> **Note**: Montserrat is **already loaded** globally in `src/app/layout.tsx` as `--font-montserrat` (weight 700). No additional Google Font setup is needed — the countdown page reuses the existing variable.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based (`src/components/countdown/`). Each component has single responsibility:
  - `CountdownPage` — layout shell (background, gradient, content area)
  - `CountdownTimer` — client component (`'use client'`), owns state + interval
  - `TimeUnit` — renders one time unit block (digit pair + label)
  - `DigitCard` — single glass digit card (presentational)
- **Styling Strategy**: TailwindCSS 4.x utility classes + CSS variables from `globals.css`. No raw hex values in component files.
- **Data Fetching**: None. Target date read from `process.env.NEXT_PUBLIC_LAUNCH_DATE` at module load time.
- **SSR Safety**: `CountdownTimer` is a `'use client'` component. Initial state is `null` (hydration placeholder). `useEffect` populates real values after mount. Prevents React hydration mismatch (TR-007).

### Backend Approach

- N/A — no backend changes. Middleware update only.

### Integration Points

- **Existing Middleware** (`src/middleware.ts`): Add countdown-active redirect logic **before** the existing auth checks. When `NEXT_PUBLIC_COUNTDOWN_ACTIVE === 'true'` and the route is not `/countdown` or `/login` (or static assets), redirect to `/countdown`.
- **globals.css**: Add countdown design tokens (CSS variables) to the existing `:root` block.
- **layout.tsx**: No changes — Montserrat font variable already provided; `<html lang="vi">` already set.
- **Shared Asset Path**: Background image follows existing pattern `public/assets/{group}/images/`.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/8PJQswPZmU-countdown-prelaunch-page/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Visual specifications
├── plan.md              ✅ This file
├── tasks.md             📋 Next step (momorph.tasks)
└── assets/
    └── frame.url.txt    ✅ Figma frame image URL
```

### Source Code (affected areas)

```text
src/
├── app/
│   └── countdown/
│       └── page.tsx                      # NEW — Server Component, sets metadata, renders CountdownPage
│
├── components/
│   └── countdown/
│       ├── CountdownPage.tsx             # NEW — full-screen layout shell (bg, gradient, content area)
│       ├── CountdownTimer.tsx            # NEW — 'use client', owns useCountdown state, renders TimeUnit×3
│       ├── TimeUnit.tsx                  # NEW — single time block (DigitPair + label)
│       └── DigitCard.tsx                 # NEW — single glass digit card (presentational)
│
├── hooks/
│   └── useCountdown.ts                   # NEW — countdown logic: setInterval, state, cleanup
│
├── types/
│   └── countdown.ts                      # NEW — CountdownState, LaunchConfig types
│
├── middleware.ts                         # MODIFIED — add countdown-active gate at top of middleware
│
└── test/
    └── countdown/
        ├── useCountdown.test.ts          # NEW — unit tests for hook logic
        ├── CountdownTimer.test.tsx       # NEW — component rendering tests
        └── middleware-countdown.test.ts  # NEW — middleware redirect tests for countdown gate

public/
└── assets/
    └── countdown/
        ├── fonts/
        │   └── digital-numbers.woff2    # NEW — self-hosted "Digital Numbers" font
        └── images/
            └── bg-countdown.png         # NEW — background image from Figma (MM_MEDIA_BG Image)

src/app/globals.css                       # MODIFIED — add countdown CSS variables to :root
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| _(none new)_ | — | All required packages already in the project |

> No new runtime dependencies. All implementation uses native browser APIs (`setInterval`, `Date`), existing React hooks, and project-approved libraries.

---

## Implementation Strategy

### Phase 0: Asset Preparation

1. Obtain `bg-countdown.png` — download from Figma via `mcp__momorph__get_media_files` (the `MM_MEDIA_BG Image` node `2268:35129`) and save to `public/assets/countdown/images/`.
2. Obtain "Digital Numbers" font — source `.woff2` file and place in `public/assets/countdown/fonts/digital-numbers.woff2`. Register via `@font-face` in `globals.css`.
3. Verify asset paths comply with constitution convention (kebab-case filenames).

### Phase 1: Foundation (Types, Tokens, Hook)

**All tests written BEFORE implementation (TDD — constitution Principle III)**

1. **Add CSS variables** to `src/app/globals.css`:
   ```css
   /* Countdown Design Tokens */
   --color-digit-border: #ffea9e;
   --radius-digit-card: 12px;
   --blur-digit-card: blur(24.96px);
   --spacing-units-gap: 60px;
   --spacing-digits-gap: 21px;
   --spacing-title-to-timer: 24px;
   --gradient-countdown-overlay: linear-gradient(18deg, #00101a 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0.00) 63.41%);
   ```

2. **Create `src/types/countdown.ts`**:
   ```ts
   export interface CountdownState {
     days: number
     hours: number
     minutes: number
   }
   ```

3. **Write tests first** → `src/test/countdown/useCountdown.test.ts`:
   - Test: returns `null` before mount (SSR)
   - Test: returns correct `{ days, hours, minutes }` for a future date
   - Test: returns all zeros when date is in the past
   - Test: returns all zeros when `NEXT_PUBLIC_LAUNCH_DATE` is missing/invalid
   - Test: interval cleans up on unmount (no memory leak)
   - Test: state updates after 1 second

4. **Implement `src/hooks/useCountdown.ts`**:
   ```ts
   'use client'
   export function useCountdown(targetIso: string | undefined): CountdownState | null
   ```
   - Returns `null` until `useEffect` fires (hydration safety)
   - Computes delta from `Date.now()` to `new Date(targetIso).getTime()`
   - Clamps to zero for negative delta
   - Cleans up `setInterval` on unmount

### Phase 2: Core Countdown — P1 (Components + Page)

**Write component tests before implementing each component.**

1. **Write tests** → `src/test/countdown/CountdownTimer.test.tsx`:
   - Test: renders placeholder digits ("--") when countdown is null (hydration)
   - Test: renders correct DAYS/HOURS/MINUTES values
   - Test: renders all "00" when countdown returns zeros
   - Test: has `role="timer"` and `aria-live="polite"` on container
   - Test: each TimeUnit has correct `aria-label`

2. **Implement `src/components/countdown/DigitCard.tsx`** (presentational):
   - Props: `digit: string` (single character "0"–"9" or "-")
   - Glass card styling with CSS variables
   - Structure: outer container (relative) → background div (opacity 0.5, backdrop-blur, border) + digit text (absolute, full opacity)
   - This separation solves the opacity inheritance issue noted in spec

3. **Implement `src/components/countdown/TimeUnit.tsx`**:
   - Props: `value: number | null`, `label: string`, `ariaLabel: string`
   - Renders two `<DigitCard>` components (tens + units digits)
   - Renders label text below
   - Shows "--" placeholder when `value` is null

4. **Implement `src/components/countdown/CountdownTimer.tsx`** (`'use client'`):
   - Calls `useCountdown(process.env.NEXT_PUBLIC_LAUNCH_DATE)`
   - Renders three `<TimeUnit>` components for days/hours/minutes
   - Container: `role="timer"` + `aria-live="polite"` + `aria-label="Countdown to launch"`
   - Handles redirect to `/` when countdown reaches zero (using `useRouter`)

5. **Implement `src/components/countdown/CountdownPage.tsx`**:
   - Server Component (no `'use client'`)
   - Layered structure matching Login page pattern:
     1. BG image (Next.js `<Image>`, `fill`, `object-cover`, `z-0`, `aria-hidden`)
     2. Gradient overlay (`<div>`, inline gradient style, `z-[1]`, `aria-hidden`)
     3. Content area (`<div>`, `absolute top-[218px] z-10`)
        - `<h1>` title: "Sự kiện sẽ bắt đầu sau"
        - `<CountdownTimer />`

6. **Create `src/app/countdown/page.tsx`**:
   ```tsx
   import type { Metadata } from 'next'
   import { CountdownPage } from '@/components/countdown/CountdownPage'

   export const metadata: Metadata = {
     title: 'Coming Soon | Sun Annual Awards 2025',
     description: 'The Sun Annual Awards 2025 is launching soon. Stay tuned!',
   }

   export default function CountdownPageRoute() {
     return <CountdownPage />
   }
   ```

### Phase 3: Middleware Update — Countdown Gate

1. **Write tests first** → `src/test/countdown/middleware-countdown.test.ts`:
   - Test: when `COUNTDOWN_ACTIVE=true`, request to `/` redirects to `/countdown`
   - Test: when `COUNTDOWN_ACTIVE=true`, request to `/countdown` passes through (no redirect loop)
   - Test: when `COUNTDOWN_ACTIVE=true`, request to `/login` passes through (no redirect)
   - Test: when `COUNTDOWN_ACTIVE=false`, request to `/` goes through normal auth flow
   - Test: when `COUNTDOWN_ACTIVE=true`, static assets (`/_next/`, `/assets/`) not redirected

2. **Modify `src/middleware.ts`**:
   - Add countdown gate at the **top** of the middleware function, before auth checks:
   ```ts
   const countdownActive = process.env.NEXT_PUBLIC_COUNTDOWN_ACTIVE === 'true'
   const countdownExcluded = pathname === '/countdown' || pathname === '/login'
   if (countdownActive && !countdownExcluded) {
     const url = request.nextUrl.clone()
     url.pathname = '/countdown'
     url.search = ''
     return NextResponse.redirect(url)
   }
   ```
   - `/countdown` must also be added to the Supabase session refresh bypass — it's public, no auth needed.

3. **Update matcher** in `middleware.ts` to ensure `/countdown` is included in the matcher (currently all non-static routes are matched — `countdown` is already covered).

### Phase 4: Background Visual — P2

1. Integrate `bg-countdown.png` into `CountdownPage.tsx` (completed in Phase 2, but requires the actual asset from Phase 0).
2. Add `<noscript>` fallback for no-JS environments:
   ```html
   <noscript>
     <p style="color:white; text-align:center; padding:2rem;">Coming Soon</p>
   </noscript>
   ```

### Phase 5: Responsive + Polish — P3

1. Add responsive Tailwind classes to `CountdownPage.tsx`, `CountdownTimer.tsx`, `TimeUnit.tsx`, `DigitCard.tsx` per `design-style.md` breakpoints:
   - Mobile: timer units stack vertically (`flex-col`), reduced digit size
   - Tablet: row layout maintained, moderate sizing
2. Add skeleton animation for hydration state (opacity fade-in on first real render).
3. Add `-webkit-backdrop-filter` for Safari support alongside `backdrop-filter`.
4. Verify WCAG AA contrast (#FFF on #00101A = 18.1:1 — passes AAA).

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| "Digital Numbers" font unavailable or proprietary | Medium | High | Research font license first; fallback: `font-family: 'Courier New', monospace` with styled digit cards still preserves the glass aesthetic |
| SSR hydration mismatch on countdown digits | Medium | Medium | `useEffect` + `isHydrated` pattern fully specified in TR-007; placeholder "--" on server render |
| Middleware countdown gate breaks auth tests | Low | Medium | Add countdown tests to existing middleware test file; ensure `COUNTDOWN_ACTIVE=false` in all existing test fixtures |
| `backdrop-filter` not supported on some browsers | Low | Low | Add `-webkit-backdrop-filter`; CSS fallback: semi-transparent solid background |
| Background image path mismatch | Low | Low | Confirm Figma media key for `MM_MEDIA_BG Image` before downloading |

### Estimated Complexity

- **Frontend**: Low-Medium (clear Figma spec, simple client state, follows existing login page patterns)
- **Backend**: Low (middleware-only change, no API)
- **Testing**: Low (no async data fetching, pure time computation is easily unit-tested)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: `CountdownTimer` ↔ `useCountdown` ↔ `TimeUnit` ↔ `DigitCard`
- [ ] **External dependencies**: None (no API calls)
- [ ] **Data layer**: Not applicable
- [x] **User workflows**: Middleware redirect flow (active/inactive countdown), countdown-to-zero redirect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Timer values update in DOM; hydration placeholder renders on first paint |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive layout on mobile (375px) / tablet (768px) / desktop (1440px) |

### Test Environment

- **Environment type**: Local (Vitest + happy-dom)
- **Test data strategy**: `vi.useFakeTimers()` for deterministic countdown testing; `process.env` mocking for `NEXT_PUBLIC_LAUNCH_DATE` and `NEXT_PUBLIC_COUNTDOWN_ACTIVE`
- **Isolation approach**: `vi.resetModules()` + `vi.clearAllMocks()` in `beforeEach`

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `Date.now()` / timers | Vitest fake timers (`vi.useFakeTimers()`) | Deterministic countdown testing without real waits |
| `process.env.NEXT_PUBLIC_LAUNCH_DATE` | `Object.assign(process.env, {...})` in `beforeEach` | Same pattern already used in `LoginButton.test.tsx` |
| `next/navigation` (`useRouter`) | `vi.mock('next/navigation', ...)` | Prevent redirect calls in unit tests |
| Supabase middleware | Existing mock from `middleware.test.ts` | Reuse established pattern |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Countdown displays correct `{ days, hours, minutes }` for a date 2 days, 5 hours, 30 minutes in the future
   - [ ] Timer decrements by 1 minute after 60 seconds (fake timers)
   - [ ] Page renders with title "Sự kiện sẽ bắt đầu sau"
   - [ ] Middleware redirects `/` → `/countdown` when `COUNTDOWN_ACTIVE=true`

2. **Error Handling**
   - [ ] Missing `NEXT_PUBLIC_LAUNCH_DATE` → all digits show "00"
   - [ ] Invalid date string → all digits show "00"
   - [ ] Past date → all digits show "00", redirect fires

3. **Edge Cases**
   - [ ] Exactly 00:00:00 → redirect to `/` within next tick
   - [ ] Hydration placeholder "--" renders on server (before `useEffect`)
   - [ ] `setInterval` cleared on component unmount (no memory leak)
   - [ ] `/countdown` itself is NOT redirected when `COUNTDOWN_ACTIVE=true`

### Tooling & Framework

- **Test framework**: Vitest 2.x (already configured)
- **Supporting tools**: `@testing-library/react`, `@testing-library/user-event`, `happy-dom`
- **CI integration**: Runs as part of existing `yarn test` / `vitest run` pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| `useCountdown` hook | 90%+ | High |
| `CountdownTimer` component | 80%+ | High |
| Middleware countdown gate | 90%+ | High |
| `DigitCard`, `TimeUnit` (presentational) | 70%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (review complete)
- [ ] Background image `bg-countdown.png` downloaded from Figma
- [ ] "Digital Numbers" font file (`.woff2`) sourced and licensed
- [ ] `NEXT_PUBLIC_LAUNCH_DATE` and `NEXT_PUBLIC_COUNTDOWN_ACTIVE` added to `.env.example`

### External Dependencies

- None. All dependencies are already installed in the project.

---

## Key Implementation Notes

### Digit Card Opacity Fix

The Figma spec sets `opacity: 0.5` on the entire digit card component (including border and background). If applied directly via `opacity: 0.5` on the wrapper, the digit text inside also becomes semi-transparent. The correct implementation splits the card into two layers:

```tsx
<div className="relative w-[77px] h-[123px]">
  {/* Background layer — semi-transparent */}
  <div className="absolute inset-0 rounded-xl border border-[--color-digit-border] opacity-50 backdrop-blur-[24.96px]"
    style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.10) 100%)' }}
    aria-hidden
  />
  {/* Text layer — full opacity */}
  <span className="relative z-10 font-['Digital_Numbers'] text-[73.73px] font-normal text-white">
    {digit}
  </span>
</div>
```

### Middleware Ordering

The countdown gate MUST come before the auth gate:
```ts
// 1. Countdown gate (highest priority)
if (countdownActive && !excluded) → redirect to /countdown

// 2. Auth gate (existing logic)
if (!user && pathname !== '/login') → redirect to /login
if (user && pathname === '/login') → redirect to /
```

### Font Fallback Chain

```css
@font-face {
  font-family: 'Digital Numbers';
  src: url('/assets/countdown/fonts/digital-numbers.woff2') format('woff2');
  font-display: swap;
}
```

Fallback chain in component: `font-family: 'Digital Numbers', 'Courier New', monospace`

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate detailed task breakdown
2. **Source** the "Digital Numbers" font file before Phase 1
3. **Begin** TDD cycle: write tests first, then implement (constitution Principle III)
