# Implementation Plan: Login Screen

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-06
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`
**Design**: `specs/GzbNeVGJHz-Login/design-style.md`

---

## Summary

Implement the Login screen for SAA 2025 — a full-page Google OAuth entry point using Supabase Auth
with `@supabase/ssr`. The screen is dark-themed, desktop-first but fully responsive, and requires
zero user-input fields (Google OAuth only). Authentication state is enforced server-side via
Next.js middleware before any page is rendered.

The codebase already provides Supabase browser/server/middleware helpers
(`src/libs/supabase/`). What is missing is: the root `middleware.ts`, the `/login` route, the
`/auth/callback` route, and all UI components.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, Server + Client Components)
**Primary Dependencies**: React 19, TailwindCSS 4, `@supabase/ssr` 0.8, `@supabase/supabase-js` 2
**Database**: Supabase (PostgreSQL) — session management only, no schema changes for Login
**Testing**: Vitest + `@testing-library/react` — to be installed as part of Phase 0 (TDD mandatory per constitution)
**State Management**: Local React state (`useState`) for loading/error in Client Components
**API Style**: Supabase SDK + Next.js Route Handler (OAuth callback)
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare` (Edge-compatible)

**Key env vars** (actual names from codebase — note: existing code uses `PUBLISHABLE_KEY`, not
`ANON_KEY` as originally documented in the spec):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |
| `NEXT_PUBLIC_SITE_URL` | Base URL for OAuth redirect construction (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (Supabase config) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret (Supabase config) |

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components, 2-space indent)
- [x] Uses approved libraries and patterns (Next.js 15, Supabase Auth via `@supabase/ssr`, TailwindCSS 4)
- [x] Adheres to folder structure guidelines (components under `src/components/`, routes under `src/app/`)
- [x] Meets security requirements (no hardcoded secrets, server-side session check, OWASP)
- [x] Follows testing standards (tests written before implementation per TDD)

**Violations (if any):**

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| New devDependencies added | Vitest + `@testing-library/react` required for TDD per constitution Principle III | Jest rejected (heavier, needs Babel transform for Next.js 15) |
| `middleware.ts` at root (not `src/`) | Next.js requirement — middleware must be at project root | Cannot be moved |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/components/login/`. Each visual section is a
  separate component. Server Components by default; only `LoginButton` and `LanguageSelector` are
  Client Components (require `useState`/event handlers).
- **Styling Strategy**: TailwindCSS 4 utility classes only. Design tokens defined as CSS variables
  in `globals.css` and mapped to Tailwind utilities. No inline styles. No CSS Modules.
- **Data Fetching**: Session check performed server-side in `src/app/login/page.tsx` via
  `src/libs/supabase/server.ts`. No client-side data fetching on this screen.
- **Login page route**: `src/app/login/page.tsx` — Server Component. If session exists, redirect
  to `/` immediately (before rendering). If `?error=` query param present, pass error to
  `LoginButton` as a prop.

### Backend / Auth Approach

- **OAuth flow**: `LoginButton` (Client Component) calls
  `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` } })`
- **Callback route**: `src/app/auth/callback/route.ts` — exchanges the `code` param for a Supabase
  session via `supabase.auth.exchangeCodeForSession(code)`, then redirects to `/`.
  On error, redirects to `/login?error=auth_failed`.
- **Middleware**: Root `middleware.ts` uses `src/libs/supabase/middleware.ts` helper to refresh
  sessions on every request and enforces:
  - Unauthenticated → protected routes redirect to `/login`
  - Authenticated → `/login` redirects to `/`
- **Redirect target**: `/` (the homepage, per assumption TODO(Q2) — update if confirmed otherwise)

### Integration Points

- **Existing services**: `src/libs/supabase/{client,server,middleware}.ts` — used as-is
- **Shared components**: None exist yet — Login is the first feature
- **API contracts**: Supabase Auth SDK only (no custom API endpoints beyond `/auth/callback`)

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/GzbNeVGJHz-Login/
├── spec.md              ✅ Feature specification
├── design-style.md      ✅ Design specifications
├── plan.md              ✅ This file
├── tasks.md             → Next step
└── assets/
    └── frame.url.txt    ✅ Figma frame image URL
```

### New Files to Create

| File | Purpose |
|------|---------|
| `middleware.ts` | Root middleware: session refresh + auth redirect enforcement |
| `src/app/login/page.tsx` | Login page (Server Component, auth redirect, error prop) |
| `src/app/auth/callback/route.ts` | OAuth callback: exchange code → session → redirect |
| `src/components/login/LoginPage.tsx` | Page-level layout compositor |
| `src/components/login/LoginHeader.tsx` | Header: SAA logo + language selector |
| `src/components/login/LanguageSelector.tsx` | Language toggle button (Client Component) |
| `src/components/login/HeroSection.tsx` | Hero: key visual + text + login button |
| `src/components/login/KeyVisual.tsx` | ROOT FURTHER image component |
| `src/components/login/LoginButton.tsx` | "LOGIN With Google" button (Client Component) |
| `src/components/login/LoginFooter.tsx` | Copyright footer |
| `public/assets/login/logos/logo.png` | SAA logo (downloaded from MoMorph) |
| `public/assets/login/images/key-visual.png` | ROOT FURTHER key visual (downloaded from MoMorph) |
| `public/assets/login/icons/google-icon.svg` | Google icon (downloaded from MoMorph) |
| `public/assets/login/icons/flag-vn.svg` | Vietnam flag icon (downloaded from MoMorph) |
| `public/assets/login/icons/chevron-down.svg` | Chevron icon (downloaded from MoMorph) |

### New Infrastructure Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration (jsdom environment, React plugin, setup file) |
| `src/test/setup.ts` | Test global setup: imports `@testing-library/jest-dom` matchers |

### Modified Files

| File | Changes |
|------|---------|
| `package.json` | Add `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/*` as devDeps; add `test` + `test:run` scripts |
| `src/app/layout.tsx` | Add Montserrat + Montserrat Alternates fonts via `next/font/google` |
| `src/app/globals.css` | Add login design tokens as CSS variables |
| `src/app/page.tsx` | Replace default starter with Server Component: auth check → redirect to `/login` if unauthenticated, else render homepage placeholder |

### Dependencies

**New devDependencies to install** (required for TDD — constitution Principle III):

```bash
yarn add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add `vitest.config.ts` at project root:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

Add `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:
```json
"test": "vitest",
"test:run": "vitest run"
```

**Existing runtime dependencies (no changes needed):**

| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/ssr` | ^0.8.0 | Server-side Supabase session management |
| `@supabase/supabase-js` | ^2.90.1 | Supabase client SDK |
| `next` | 15.5.9 | App Router, Server Components, Route Handlers |
| `tailwindcss` | ^4 | Utility-first CSS |

---

## Implementation Approach

### Phase 0: Test Infrastructure + Asset Preparation

**0.1 Set up test runner** (must complete before any other phase — TDD requires tests first):

1. Install devDependencies (see Dependencies section above)
2. Create `vitest.config.ts` at project root
3. Create `src/test/setup.ts` with `@testing-library/jest-dom` import
4. Add `test` and `test:run` scripts to `package.json`
5. Verify: `yarn test:run` exits with no errors (no tests yet = passes vacuously)

**0.2 Download assets** — Download all required media assets from MoMorph and place in `public/assets/login/`.

| Asset | MoMorph Node ID | Target File |
|-------|----------------|-------------|
| SAA Logo | `I662:14391;178:1033` | `public/assets/login/logos/logo.png` |
| ROOT FURTHER key visual | `2939:9548` | `public/assets/login/images/key-visual.png` |
| Google icon | `I662:14426;186:1766` | `public/assets/login/icons/google-icon.svg` |
| Vietnam flag | `I662:14391;186:1709;178:1010` | `public/assets/login/icons/flag-vn.svg` |
| Chevron down | `I662:14391;186:1696;186:1821;186:1441` | `public/assets/login/icons/chevron-down.svg` |

Use `mcp__momorph__get_media_files` or `mcp__momorph__get_design_item_image` with screenId
`GzbNeVGJHz`.

### Phase 1: Foundation (Blocking — must complete before UI)

**Goal**: Middleware, fonts, CSS tokens, OAuth callback — infrastructure that all UI phases depend on.

1. **Root middleware** (`middleware.ts`):
   - Use `src/libs/supabase/middleware.ts` helper to refresh sessions
   - Redirect unauthenticated requests to `/login` for protected paths
   - Redirect authenticated requests away from `/login` to `/`
   - Use `supabase.auth.getUser()` (NOT `getSession()`) — `getUser()` verifies with the
     Supabase server, `getSession()` only reads the cookie without server verification
   - Matcher (exact config):
     ```ts
     export const config = {
       matcher: ['/((?!_next/static|_next/image|favicon\\.ico|auth/callback|public/).*)'],
     }
     ```

2. **Font setup** (`src/app/layout.tsx`):
   - Add `Montserrat` (subsets: `['latin', 'vietnamese']`, weights: `[700]`)
   - Add `Montserrat_Alternates` (subsets: `['latin', 'vietnamese']`, weight: `700`)
   - Expose as CSS variables `--font-montserrat` and `--font-montserrat-alt`

3. **Design tokens** (`src/app/globals.css`):
   - Add CSS variables from `design-style.md` Design Tokens section
   - Colors: `--color-bg-page`, `--color-header-bg`, `--color-login-btn`, etc.
   - Gradients, shadows as custom properties

4. **OAuth callback route** (`src/app/auth/callback/route.ts`):
   - Handle `GET` with `code` query param
   - Call `supabase.auth.exchangeCodeForSession(code)`
   - On success: `redirect('/')`
   - On error: `redirect('/login?error=auth_failed')`

### Phase 2: User Story 1 — Google Sign-In (P1 MVP)

**Goal**: A user can visit `/login`, click "LOGIN With Google", authenticate, and land on `/`.

1. **Login page** (`src/app/login/page.tsx`) — Server Component:
   - Check auth via `src/libs/supabase/server.ts` using `supabase.auth.getUser()` (not
     `getSession()`); if `user` is non-null → `redirect('/')`
   - Read `?error` query param; pass to `LoginPage` component as prop
   - Return `<LoginPage error={error} />`
   - Add `Cache-Control: no-store` via route segment config:
     ```ts
     export const revalidate = 0
     export const dynamic = 'force-dynamic'
     ```
   - Do NOT add `export const runtime = 'edge'` — OpenNext Cloudflare handles Edge runtime
     globally via `next.config.ts`; per-route runtime exports are not used in this codebase

2. **LoginPage compositor** (`src/components/login/LoginPage.tsx`):
   - Root-level layout: renders `C_Keyvisual` (full-bleed bg image, `aria-hidden`),
     `Rectangle 57` (left gradient overlay), `Cover` (bottom gradient overlay),
     `LoginHeader`, `HeroSection`, `LoginFooter` — all as absolute-positioned layers
   - Receives `error?: string` prop and forwards to `HeroSection` → `LoginButton`
   - These background layers are at page root (not inside HeroSection) per design-style
     component hierarchy

3. **LoginHeader** (`src/components/login/LoginHeader.tsx`) — Server Component:
   - Logo (left) + LanguageSelector (right)
   - Exact styles per design-style.md `A_Header` section

4. **KeyVisual** (`src/components/login/KeyVisual.tsx`) — Server Component:
   - Renders ROOT FURTHER image using `next/image`
   - `aria-hidden={true}` (decorative)

5. **HeroSection** (`src/components/login/HeroSection.tsx`) — Server Component:
   - Renders the `B_Bìa` section only (absolute, `top-[88px]`, `flex flex-col`, padding
     `96px 144px`, gap `120px`)
   - Contains: `KeyVisual` (B.1_Key Visual) + inner Frame 550 with hero text + `LoginButton`
   - Does NOT contain background/gradient layers — those live in `LoginPage`
   - Passes `error` prop to `LoginButton`

6. **LoginButton** (`src/components/login/LoginButton.tsx`) — **Client Component** (`'use client'`):
   - State: `isLoading`, `error` (initialized from `initialError` prop)
   - On click: if `isLoading` is already `true`, return immediately (double-click guard);
     otherwise set `isLoading = true`, call
     `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` } })`
   - Button is `disabled={isLoading}` (DOM-level prevention) + guard above for concurrent calls
   - On error from OAuth: set `isLoading = false`, set `error`
   - Also display `initialError` from URL `?error=` param
   - Renders: golden button with text + Google icon, error text below, loading spinner state
   - `aria-label="Sign in with Google"`, `aria-busy={isLoading}`

7. **LoginFooter** (`src/components/login/LoginFooter.tsx`) — Server Component:
   - Copyright text per design-style.md

### Phase 3: User Story 2 — Language Selector (P2)

**Goal**: Language toggle button opens the `Dropdown-ngôn ngữ` overlay.

1. **LanguageSelector** (`src/components/login/LanguageSelector.tsx`) — **Client Component**:
   - State: `isOpen: boolean`
   - Renders: flag icon + "VN" text + chevron (rotates when open)
   - On click: `setIsOpen(!isOpen)` — full dropdown content requires separate spec
     (`hUyaaugye2` — not yet specced)
   - Keyboard: `Enter`/`Space` toggles, `Escape` closes
   - ARIA: `aria-haspopup="listbox"`, `aria-expanded={isOpen}`, `aria-label="Select language"`
   - For now, toggling opens a **placeholder dropdown** — full language switching deferred
     until `Dropdown-ngôn ngữ` spec is available
   - Language preference stored as cookie `lang=VN` on selection

### Phase 4: User Story 3 — Authenticated User Redirect (P1)

Already handled by middleware (Phase 1) and login page server-side check (Phase 2).
No additional implementation needed beyond tests.

### Phase 5: Polish & Cross-Cutting

- Verify responsive layout at 320px, 768px, 1024px, 1440px
- Audit keyboard navigation (Tab order: Language selector → Login button)
- Verify focus rings visible on all interactive elements
- Verify `aria-hidden` on all decorative elements
- Update `src/app/page.tsx` — replace the default Next.js starter content with a Server
  Component that checks auth via `supabase.auth.getUser()`:
  - If not authenticated → `redirect('/login')`
  - If authenticated → render a minimal `<h1>SAA 2025 — Coming Soon</h1>` placeholder
  - This is a temporary placeholder; it will be replaced by the real homepage spec (`i87tDx10uM`)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: LoginButton click → loading state → OAuth call
- [x] **External dependencies**: Supabase Auth (`signInWithOAuth`, `exchangeCodeForSession`)
- [x] **User workflows**: Full OAuth flow, redirect on auth, redirect on unauthenticated access
- [ ] **Data layer**: Not applicable (no DB changes)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Button click → loading → OAuth initiated |
| App ↔ External API | Yes | Callback route: valid code, expired code |
| Cross-platform | Yes | Responsive layout at 3 breakpoints |

### Test Environment

- **Environment type**: Local (Supabase local stack via `make up`)
- **Test data strategy**: Mock `signInWithOAuth` at Supabase client boundary
- **Isolation approach**: Fresh component mount per test

### TDD Order (per constitution Principle III)

0. Install Vitest + testing libs; verify `yarn test:run` runs (no tests yet = passes)
1. Write test: middleware redirects unauthenticated → `/login` ❌ FAIL
2. Implement middleware → ✅ PASS
3. Write test: middleware redirects authenticated away from `/login` ❌ FAIL
4. Implement login page server-side redirect → ✅ PASS
5. Write test: LoginButton renders with Google icon and correct aria attributes ❌ FAIL
6. Write test: LoginButton shows loading state on click, disabled during load ❌ FAIL
7. Write test: LoginButton double-click does not call signInWithOAuth twice ❌ FAIL
8. Implement LoginButton → ✅ PASS (steps 5-7)
9. Write test: `/auth/callback` with valid code → redirect `/` ❌ FAIL
10. Implement callback route → ✅ PASS
11. Write test: `/auth/callback` with invalid code → redirect `/login?error=auth_failed` ❌ FAIL
12. Verify callback error handling → ✅ PASS
13. Write test: LoginPage renders error message when `initialError` prop is set ❌ FAIL
14. Verify LoginButton error display → ✅ PASS

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed — compliant
- [x] `spec.md` approved (In Review; 3 open TODOs are non-blocking for implementation)
- [x] `design-style.md` complete
- [ ] **Test runner installed** — Vitest + `@testing-library/react` (Phase 0.1 — blocks all TDD steps)
- [ ] Supabase Google OAuth configured in local Supabase (`supabase/config.toml` already has
  `[auth.external.google]` enabled; need `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` in `.env`)
- [ ] `.env` file populated with Supabase URL, publishable key, and `NEXT_PUBLIC_SITE_URL`

### External Dependencies

- Supabase local stack running (`make up`)
- Google OAuth credentials (client ID + secret) configured in `.env`

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase OAuth redirect URL mismatch in Cloudflare deploy | Medium | High | `NEXT_PUBLIC_SITE_URL` env var used in `redirectTo`; set correctly per environment |
| Montserrat font not loading (Vietnamese subset) | Low | Medium | Include `vietnamese` subset in `next/font` config |
| Language selector deferred (Q3 unanswered) | High | Low | Placeholder implementation sufficient for MVP; no blocking |
| Redirect loop (middleware misconfiguration) | Medium | High | Exclude `/auth/callback` and static paths from middleware matcher |

---

## Open Questions

- [ ] **TODO(Q1)**: Domain restriction — is `@sun-asterisk.com` enforced in Supabase Google OAuth?
  If yes, what error message to display? (Does not block Phase 2 — can add after confirmation)
- [ ] **TODO(Q2)**: Exact URL after login redirect — `/`, `/home`, or other? (Assumed `/`)
- [ ] **TODO(Q3)**: Language switch — dynamic or hard reload? (Deferred; dropdown spec pending)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate the task breakdown
2. **Review** tasks.md for phase ordering and parallelization
3. **Begin** implementation starting with Phase 0 (assets) + Phase 1 (foundation) in parallel
