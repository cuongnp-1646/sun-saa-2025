# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-homepage-saa`
**Date**: 2026-04-07
**Spec**: `specs/i87tDx10uM-homepage-saa/spec.md`

---

## Summary

Replace the current placeholder `src/app/page.tsx` ("SAA 2025 — Coming Soon") with the full Homepage SAA layout. The page is a Next.js App Router **Server Component** with client islands for the countdown timer, floating widget, and header dropdowns. It reuses the existing `useCountdown` hook and countdown display components. All design tokens are CSS variables already defined in `globals.css` (partially — homepage-specific tokens will be added).

The page consists of 7 sections: sticky Header, Hero (keyvisual + countdown + event info + CTAs), Root Further text block, Awards grid (6 cards), Sun\* Kudos promo, Footer, and a fixed Floating Widget Button.

---

## Technical Context

**Language/Framework**: TypeScript 5.x / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4.x, Supabase SSR, Next.js `<Image>`
**Database**: Supabase (auth only — homepage has no DB writes)
**Testing**: Vitest + @testing-library/react + happy-dom
**State Management**: Local React state (header dropdowns, widget menu); countdown via `useCountdown` hook
**API Style**: Server Components fetch user session; notifications count via predicted REST endpoint

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (PascalCase components, kebab-case modules)
- [x] Uses approved libraries and patterns (Next.js, React, Tailwind, Supabase SSR)
- [x] Adheres to folder structure (`src/components/home/`, `src/app/page.tsx`)
- [x] Meets security requirements (auth check in Server Component; no secrets in client)
- [x] Follows testing standards (TDD: tests before implementation, Vitest)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

**Notes**:
- The `layout.tsx` Montserrat font only loads weight `700`. Homepage body text uses weight `400` and `500` — these must be added to the font loader config.
- No new runtime dependencies required.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/components/home/` for all homepage-specific components; shared components (Header, Footer) under `src/components/shared/` for reuse across future screens.
- **Styling Strategy**: TailwindCSS utilities + CSS variables from `globals.css`. No inline styles except where CSS variables require `style={}` prop.
- **Data Fetching**: User session fetched in `src/app/page.tsx` (Server Component). Notification count fetched server-side via Supabase (or placeholder `0` if API not yet available). Award list is **static config** in `src/config/awards.ts` (not API-driven — spec note: to be clarified, but static is safer for MVP).
- **Client Islands**: Only `CountdownTimer`, `FloatingWidget`, and header interactive controls (`HeaderControls`) are `'use client'`. The rest of the page renders server-side.

### Backend Approach

- **No new API routes** needed for homepage MVP. The notification badge count will be either: (a) a server-side Supabase query on the notifications table, or (b) hardcoded to `0` if the notifications feature isn't ready.
- Award data: static constants in `src/config/awards.ts` — no API call.

### Integration Points

- **Existing Services**:
  - `src/libs/supabase/server.ts` — server-side auth (already used in `page.tsx`)
  - `src/hooks/useCountdown.ts` — reused directly
  - `src/components/countdown/CountdownTimer.tsx` — reused with minor adaptation
  - `src/components/countdown/DigitCard.tsx`, `TimeUnit.tsx` — reused as-is
- **Shared Components**:
  - `Header` → new shared component, also used by future Awards, Kudos screens
  - `Footer` → new shared component (replaces `LoginFooter` pattern)
  - `ChiTietButton` ("Chi tiết" button) → reused across AwardCard and KudosSection
- **Navigation**: All URLs derived from `SCREENFLOW.md` constants in `src/config/navigation.ts`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/i87tDx10uM-homepage-saa/
├── spec.md           ✅ done
├── design-style.md   ✅ done
├── plan.md           ✅ this file
├── assets/
│   └── frame.png     ✅ done
└── tasks.md          📋 next step
```

### Source Code (affected areas)

```text
src/
├── app/
│   └── page.tsx                          # MODIFY — replace placeholder with HomePag
│
├── components/
│   ├── home/                             # NEW directory
│   │   ├── HomePage.tsx                  # NEW — page shell (server), composes all sections
│   │   ├── HeroSection.tsx               # NEW — hero: bg image, gradient, content area
│   │   ├── HeroContent.tsx               # NEW — countdown + event info + CTA area
│   │   ├── EventInfo.tsx                 # NEW — B2: time/venue/streaming static info
│   │   ├── HeroCTA.tsx                   # NEW — B3: ABOUT AWARDS + ABOUT KUDOS buttons
│   │   ├── RootFurtherSection.tsx        # NEW — B4 block with ROOT/FURTHER images + text
│   │   ├── AwardsSection.tsx             # NEW — C1 header + C2 award grid
│   │   ├── AwardCard.tsx                 # NEW — single award card (image + title + desc + Chi tiết)
│   │   ├── KudosSection.tsx              # NEW — D1: Kudos promo block
│   │   └── FloatingWidget.tsx            # NEW — fixed pill button (client component)
│   │
│   ├── shared/                           # NEW directory (shared across screens)
│   │   ├── Header.tsx                    # NEW — sticky top nav (logo, links, controls)
│   │   ├── HeaderNav.tsx                 # NEW — nav links with active state
│   │   ├── HeaderControls.tsx            # NEW — bell, language toggle, avatar (client)
│   │   └── Footer.tsx                    # NEW — footer with nav links + copyright
│   │
│   └── countdown/                        # EXISTING — reused as-is
│       ├── CountdownTimer.tsx            ✅ reused
│       ├── TimeUnit.tsx                  ✅ reused
│       └── DigitCard.tsx                 ✅ reused
│
├── config/
│   ├── awards.ts                         # NEW — static award list (name, slug, desc, images)
│   └── navigation.ts                     # NEW — URL constants from SCREENFLOW.md
│
├── types/
│   ├── countdown.ts                      ✅ existing
│   └── home.ts                           # NEW — Award, NavLink, NotificationCount types
│
├── hooks/
│   └── useCountdown.ts                   ✅ reused
│
└── test/
    └── home/                             # NEW test directory
        ├── AwardCard.test.tsx            # NEW
        ├── AwardsSection.test.tsx        # NEW
        ├── HeroCTA.test.tsx              # NEW
        ├── FloatingWidget.test.tsx       # NEW
        ├── Header.test.tsx               # NEW
        └── HomePage.test.tsx             # NEW (integration: full page render)

public/
└── assets/
    ├── home/                             # NEW
    │   ├── images/
    │   │   ├── bg-keyvisual.png          # Figma: 2167:9028
    │   │   ├── text-root.png             # Figma: MM_MEDIA_Root Text
    │   │   ├── text-further.png          # Figma: MM_MEDIA_Further Text
    │   │   ├── award-top-talent.png      # Figma: C2.1 MM_MEDIA_Award BG
    │   │   ├── award-top-project.png     # Figma: C2.2
    │   │   ├── award-top-project-leader.png  # Figma: C2.3
    │   │   ├── award-best-manager.png    # Figma: C2.4
    │   │   ├── award-signature-creator.png   # Figma: C2.5
    │   │   ├── award-mvp.png             # Figma: C2.6
    │   │   ├── award-name-top-talent.png
    │   │   ├── award-name-top-project.png
    │   │   ├── award-name-top-project-leader.png
    │   │   ├── award-name-best-manager.png
    │   │   ├── award-name-signature-creator.png
    │   │   ├── award-name-mvp.png
    │   │   └── bg-kudos.png              # Figma: D1 MM_MEDIA_Kudos Background
    │   └── icons/
    │       ├── arrow-up.svg              # Figma: MM_MEDIA_Up
    │       ├── pen.svg                   # Figma: MM_MEDIA_Pen
    │       ├── kudos-logo.svg            # Figma: MM_MEDIA_Kudos Logo
    │       └── bell.svg                  # Notification bell icon
    │
    └── shared/
        └── logos/
            └── saa-logo.png              # Figma: MM_MEDIA_Logo (if different from login logo)
```

### Modified Files

| File | Change |
|------|--------|
| `src/app/page.tsx` | Replace placeholder with `<HomePage>` server component |
| `src/app/globals.css` | Add homepage CSS tokens (hero gradient, award card colors, new spacing vars) |
| `src/app/layout.tsx` | Add Montserrat weights 400 and 500 to font loader |

### New Files Count
- **Components**: 12 new components (9 home-specific + 3 shared)
- **Config**: 2 new config files
- **Types**: 1 new types file
- **Tests**: 6 new test files
- **Assets**: ~17 image/icon assets

### Dependencies

No new npm packages required. All dependencies already in project.

---

## Implementation Strategy

### Phase 0: Asset Preparation
Download all Figma media assets to `public/assets/home/` using `mcp__momorph__get_media_files`:
- Hero background image (bg-keyvisual.png)
- ROOT/FURTHER text images
- 6× award background images + 6× award name overlays
- Kudos background image
- Icons: arrow-up.svg, pen.svg, kudos-logo.svg, bell.svg
- SAA logo (verify if same as `/assets/login/logos/logo.png`)

### Phase 1: Foundation — CSS tokens, types, config
1. Add Montserrat font weights 400 and 500 to `layout.tsx`
2. Add homepage CSS variables to `globals.css` (hero gradient, new colors, spacing)
3. Create `src/types/home.ts` — `Award`, `NavLink`, `NotificationCount` interfaces
4. Create `src/config/awards.ts` — static list of 6 award objects `{id, slug, name, description, imageSrc, nameSrc}`
5. Create `src/config/navigation.ts` — URL constants (`ROUTES.home`, `ROUTES.awards`, `ROUTES.kudos`, etc.)

### Phase 2: Shared Infrastructure (Header + Footer)
TDD: Write failing tests first, then implement.
1. **[TEST]** `Header.test.tsx` — renders logo, 3 nav links, controls; active link has gold color
2. **Implement** `Header.tsx` (server shell) + `HeaderNav.tsx` (active state logic) + `HeaderControls.tsx` (client: bell, language, avatar)
3. **[TEST]** Footer renders with 4 nav links and copyright
4. **Implement** `Footer.tsx` (server component)

### Phase 3: Hero Section (US1 + US2)
TDD: Write failing tests first, then implement.
1. **[TEST]** `HeroCTA.test.tsx` — ABOUT AWARDS and ABOUT KUDOS buttons render and link correctly
2. **Implement** `HeroCTA.tsx`
3. `EventInfo.tsx` — static display (no tests needed beyond render)
4. `HeroContent.tsx` — combines countdown + event info + CTAs
5. `HeroSection.tsx` — full bleed BG + gradient + content

### Phase 4: Awards Section (US3)
TDD: Write failing tests first, then implement.
1. **[TEST]** `AwardCard.test.tsx` — renders thumbnail, title, description (clamped), Chi tiết button; hover state applies; links to correct `/awards#{slug}`
2. **Implement** `AwardCard.tsx`
3. **[TEST]** `AwardsSection.test.tsx` — renders 6 cards; grid layout responsive (2-col tablet, 3-col desktop)
4. **Implement** `AwardsSection.tsx`

### Phase 5: Kudos + Floating Widget (US4 + US5)
1. **Implement** `KudosSection.tsx` — static section (server rendered)
2. **[TEST]** `FloatingWidget.test.tsx` — renders fixed pill, opens action menu on click, keyboard accessible
3. **Implement** `FloatingWidget.tsx` (client component — manages open/close state)

### Phase 6: Page Assembly + Integration
1. **[TEST]** `HomePage.test.tsx` — full page smoke test: authenticated user sees all sections; countdown renders; nav links present
2. **Implement** `HomePage.tsx` — composes all sections
3. **Modify** `src/app/page.tsx` — import `HomePage` component
4. Verify auth gate still works (unauthenticated → `/login`)

### Phase 7: Polish + Accessibility
1. Add ARIA labels to all interactive elements (per spec accessibility table)
2. Keyboard navigation verification
3. Responsive visual check at mobile/tablet breakpoints via Playwright screenshot
4. Run `yarn tsc --noEmit` — zero type errors
5. Run `yarn lint` — zero lint errors
6. Run `yarn test` — all tests pass

---

## Component Ownership Rules

| Component | Type | Location | Owns |
|-----------|------|----------|------|
| `HomePage` | Server | `src/components/home/` | Page composition |
| `Header` | Server (shell) | `src/components/shared/` | Header layout, logo, server nav |
| `HeaderNav` | Server | `src/components/shared/` | Active link state |
| `HeaderControls` | **Client** | `src/components/shared/` | Dropdown open/close state |
| `HeroSection` | Server | `src/components/home/` | Full-bleed bg + gradient + content |
| `HeroContent` | Server | `src/components/home/` | Countdown + EventInfo + CTA layout |
| `CountdownTimer` | **Client** (existing) | `src/components/countdown/` | Live countdown state |
| `EventInfo` | Server | `src/components/home/` | Static event info display |
| `HeroCTA` | Server | `src/components/home/` | CTA button links |
| `RootFurtherSection` | Server | `src/components/home/` | ROOT FURTHER text block |
| `AwardsSection` | Server | `src/components/home/` | Awards grid |
| `AwardCard` | Server | `src/components/home/` | Individual award card |
| `KudosSection` | Server | `src/components/home/` | Kudos promo |
| `FloatingWidget` | **Client** | `src/components/home/` | Floating action menu state |
| `Footer` | Server | `src/components/shared/` | Footer layout + nav |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: `HomePage` ↔ `Header` ↔ `CountdownTimer`; `AwardsSection` ↔ `AwardCard`; auth gate in `page.tsx`
- [x] **External dependencies**: Supabase auth (mock in tests)
- [ ] **Data layer**: Not applicable (homepage is read-only, awards data is static)
- [x] **User workflows**: Authenticated page load; nav link routing; award card navigation

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown decrement; header active state; floating widget open/close |
| Service ↔ Service | No | No inter-service calls on homepage |
| App ↔ External API | No | No external API calls (awards static; notifications server-side Supabase) |
| App ↔ Data Layer | No | No DB writes; auth session mocked in tests |
| Cross-platform | Yes | Responsive layout at mobile/tablet/desktop via Playwright |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase auth (`createClient`) | Mock in tests | Constitution: no real DB in unit/component tests |
| `useCountdown` hook | Mock in component tests | Isolate component rendering from timer logic |
| `next/navigation` (`useRouter`, `Link`) | Mock | Standard Next.js test pattern |
| Images (`next/image`) | Real (static files) | Assets already in `public/` |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Authenticated user loads `/` → HomePag renders with all 6 sections
   - [x] Header renders with "About SAA 2025" in active/selected state
   - [x] Countdown shows days/hours/minutes from `useCountdown`
   - [x] 6 award cards render with correct titles and `/awards#{slug}` links
   - [x] CTA buttons link to `/awards` and `/kudos`
   - [x] Floating widget renders at fixed position

2. **Error Handling**
   - [x] Unauthenticated user → redirected to `/login` (via middleware, tested in middleware tests)
   - [x] `NEXT_PUBLIC_LAUNCH_DATE` not set → countdown shows "00 00 00"
   - [x] Countdown reaches zero → "Coming soon" label hidden

3. **Edge Cases**
   - [x] Award card description > 2 lines → text-clamp applies
   - [x] Chi tiết button has distinct aria-label per award

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core components (AwardCard, Header, FloatingWidget) | 80%+ | High |
| Page integration (HomePage render, auth gate) | 90%+ | High |
| Error/edge cases (countdown=0, description clamp) | 75%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Montserrat weight 400/500 not loading (layout.tsx only loads 700) | High | Medium | Fix font loader in Phase 1 before any UI work |
| Award card images not matching Figma exactly (color overlays, ring effects) | Medium | Medium | Download exact assets from Figma; don't recreate in CSS |
| Shared `Header` component conflicts with future screens expecting different header behavior | Low | High | Keep `Header` generic with `activeRoute` prop; screens pass their own active state |
| CountdownTimer reuse: homepage and countdown page show same timer — behavior differs at t=0 (redirect vs freeze) | Low | Medium | Add `onZero?: () => void` callback prop to `CountdownTimer`; homepage passes no-op |
| Event info content (time/venue) changes per event — hardcoded in component | Medium | Low | Move to `src/config/event.ts` static config file |
| Notification badge requires API not yet available | Medium | Low | Default to `0`; add feature flag or fallback |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (review complete)
- [x] `design-style.md` reviewed (all tokens concrete)
- [ ] Award images downloaded from Figma (`get_media_files`)
- [ ] SAA logo confirmed (same as login logo or different)
- [ ] Event info values confirmed (see open question in spec: time `18h30` vs `26/12/2025` discrepancy)
- [ ] Notification badge API status confirmed (exists or mock with 0)

### External Dependencies

- Figma media assets (must be downloaded via `mcp__momorph__get_media_files` in Phase 0)
- `NEXT_PUBLIC_LAUNCH_DATE` env var (already set in `.env.development` from countdown work)

---

## Key Implementation Notes

### 1. Font Weights Fix (Phase 1 — must do first)
`layout.tsx` only loads Montserrat `700`. Homepage uses `400` (card titles, body) and `500` (Chi tiết button). Fix:
```ts
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
})
```

### 2. CSS Variables to Add (globals.css)
New tokens needed for homepage (not already in globals.css):
```css
--color-header-bg: rgba(16, 20, 23, 0.8);          /* already: --color-header-bg */
--color-award-card-bg: rgba(26, 33, 38, 1);
--color-widget-bg: #FFEA9E;                          /* same as --color-login-btn */
--color-btn-secondary-border: #998C5F;               /* same as --color-border */
--gradient-hero-overlay: linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%);
--spacing-awards-section-gap: 80px;
--spacing-card-gap: 24px;
--spacing-root-further-px: 104px;
--spacing-root-further-py: 120px;
--spacing-cta-gap: 40px;
--radius-cta-btn: 8px;
--radius-widget: 100px;
--shadow-card-hover: 0 8px 24px rgba(255, 234, 158, 0.15);
```
> Many tokens overlap with existing ones (`--color-login-btn` = gold, `--color-divider` = `#2E3940`). Map new tokens to existing where possible; add only truly new ones.

### 3. CountdownTimer Adaptation
The existing `CountdownTimer` redirects to `/` when the countdown hits zero (`router.replace('/')`). On the homepage this is wrong — the countdown should freeze at "00 00 00". Two approaches:
- **Preferred**: Add an `onZero?: () => void` callback prop to `CountdownTimer`. The countdown prelaunch page passes `() => router.replace('/')`, the homepage passes `undefined` (no redirect).
- This requires updating `CountdownTimer.tsx` and its tests.

### 4. Navigation Config Pattern
Per constitution rule "Navigation URLs MUST be derived from SCREENFLOW.md", create `src/config/navigation.ts`:
```ts
export const ROUTES = {
  home: '/',
  awards: '/awards',
  kudos: '/kudos',
  profile: '/profile',
  communityStandards: '/community-standards',
} as const
export const AWARD_ROUTES = {
  topTalent: `${ROUTES.awards}#top-talent`,
  topProject: `${ROUTES.awards}#top-project`,
  // ...
} as const
```

### 5. Award Config
`src/config/awards.ts`:
```ts
export interface Award {
  id: string
  slug: string
  name: string
  description: string
  imageSrc: string   // path to award BG image
  nameSrc: string    // path to award name overlay image
}
export const AWARDS: Award[] = [
  { id: 'top-talent', slug: 'top-talent', name: 'Top Talent', description: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện', imageSrc: '/assets/home/images/award-top-talent.png', nameSrc: '/assets/home/images/award-name-top-talent.png' },
  // ... 5 more
]
```

### 6. Header Active State
`Header` is a Server Component that needs to know the active route. Use `next/headers` (cookies/headers) or pass `activeRoute` as a prop from `page.tsx`. Since `page.tsx` is a Server Component, it can pass `activeRoute="home"` directly.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate the task breakdown for `i87tDx10uM-homepage-saa`
2. **Review** `tasks.md` for parallelization opportunities (Phase 2 Header/Footer and Phase 0 asset download can run in parallel)
3. **Begin** implementation following Phase 0 → Phase 1 → Phase 2 order

---

## Open Questions

- [ ] **Event info values**: Figma design items say "18h30 / Nhà hát nghệ thuật quân đội" but the frame image shows "26/12/2025 / Âu Cơ Art Center". Which is correct? Are these configurable (from a config file or CMS)?
- [ ] **Notification badge**: Is the `/api/notifications` endpoint available now, or should the badge be hardcoded to `0` for MVP?
- [ ] **SAA Logo**: Is the homepage logo the same file as `/assets/login/logos/logo.png` or a different asset?
- [ ] **Award data source**: Confirmed static config for MVP? Or should award list be fetched from Supabase?
