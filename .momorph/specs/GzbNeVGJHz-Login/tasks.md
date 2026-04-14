# Tasks: Login Screen

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md ✅ · spec.md ✅ · design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies on sibling tasks)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: Primary file affected by this task

> **Note on asset paths**: Constitution Principle I requires assets under
> `public/assets/{group_name}/{icons|images|logos}/`. The plan listed flat
> `public/assets/login/` paths; this task list uses the correct subdirectories.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Test runner installation, project initialization, and asset downloads.
All setup tasks must complete before Phase 2 begins. Asset downloads (T004–T008) can
run in parallel after T001–T003 are done.

- [x] T001 Install Vitest + RTL devDeps and add test scripts to package.json (`yarn add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`, add `"test": "vitest"` and `"test:run": "vitest run"`) | `package.json`
- [x] T002 Create Vitest config with jsdom environment, React plugin, and setup file path | `vitest.config.ts`
- [x] T003 Create test global setup file that imports `@testing-library/jest-dom` matchers | `src/test/setup.ts`
- [x] T004 [P] Download SAA logo image from MoMorph (nodeId: `I662:14391;178:1033`, screenId: `GzbNeVGJHz`) | `public/assets/login/logos/logo.png`
- [x] T005 [P] Download ROOT FURTHER key visual from MoMorph (nodeId: `2939:9548`, screenId: `GzbNeVGJHz`) | `public/assets/login/images/key-visual.png`
- [x] T006 [P] Download Google icon SVG from MoMorph (nodeId: `I662:14426;186:1766`, screenId: `GzbNeVGJHz`) | `public/assets/login/icons/google-icon.svg`
- [x] T007 [P] Download Vietnam flag SVG from MoMorph (nodeId: `I662:14391;186:1709;178:1010`, screenId: `GzbNeVGJHz`) | `public/assets/login/icons/flag-vn.svg`
- [x] T008 [P] Download chevron-down SVG from MoMorph (nodeId: `I662:14391;186:1696;186:1821;186:1441`, screenId: `GzbNeVGJHz`) | `public/assets/login/icons/chevron-down.svg`

**Checkpoint**: Run `yarn test:run` — must exit with code 0 (no tests yet). All 5 assets present in `public/assets/login/`.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories — middleware, fonts, design tokens, OAuth callback.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T009 [P] Add Montserrat (subsets: `['latin', 'vietnamese']`, weight: 700) and Montserrat Alternates (same subsets + weight) via `next/font/google`; expose as CSS variables `--font-montserrat` and `--font-montserrat-alt` on `<html>` | `src/app/layout.tsx`
- [x] T010 [P] Add all login design tokens as CSS variables in the `:root` block — colors (`--color-bg-page: #00101A`, `--color-header-bg: #0B0F12`, `--color-login-btn: #FFEA9E`, `--color-login-btn-text: #00101A`, `--color-text-primary: #FFFFFF`, `--color-divider: #2E3940`), gradients, shadows, spacing, border-radius tokens from design-style.md | `src/app/globals.css`
- [x] T011 Write failing tests covering: (a) unauthenticated request to `/` redirects to `/login`; (b) authenticated request to `/login` redirects to `/`; (c) `/auth/callback` is excluded from middleware redirect — run `yarn test:run` and confirm RED | `src/test/middleware.test.ts`
- [x] T012 Implement root middleware using `src/libs/supabase/middleware.ts` helper; use `supabase.auth.getUser()` (NOT `getSession()`); redirect unauthenticated → `/login`, authenticated → `/` when on `/login`; export matcher `['/((?!_next/static|_next/image|favicon\\.ico|auth/callback|public/).*)']` — run `yarn test:run` and confirm GREEN | `middleware.ts`
- [x] T013 Write failing tests covering: (a) GET `/auth/callback?code=valid` → session exchanged → redirects to `/`; (b) GET `/auth/callback?code=invalid` or missing code → redirects to `/login?error=auth_failed` — run `yarn test:run` and confirm RED | `src/test/auth-callback.test.ts`
- [x] T014 Implement OAuth callback Route Handler: parse `code` query param, call `supabase.auth.exchangeCodeForSession(code)`, on success `redirect('/')`, on any error `redirect('/login?error=auth_failed')` — run `yarn test:run` and confirm GREEN | `src/app/auth/callback/route.ts`

**Checkpoint**: `yarn test:run` is GREEN. Middleware and callback route fully tested and implemented. Fonts and design tokens available.

---

## Phase 3: User Story 1 — Google Sign-In (Priority: P1) 🎯 MVP

**Goal**: A user visits `/login`, clicks "LOGIN With Google", completes Google OAuth, and lands on `/`.

**Independent Test**: With Supabase local stack running (`make up`):
1. Open `http://localhost:3000/login` without a session cookie — login screen renders correctly
2. Click "LOGIN With Google" — button disables + shows loading spinner
3. After successful OAuth → redirected to `http://localhost:3000/`
4. Navigate back to `/login` → immediately redirected to `/`

### Tests (write first — must FAIL before implementation)

- [x] T015 Write failing tests: LoginButton renders with `aria-label="Sign in with Google"`, Google icon `<img>` present, button is enabled by default | `src/test/login/LoginButton.test.tsx`
- [x] T016 Write failing tests: clicking LoginButton sets `aria-busy="true"` + button becomes `disabled`; `signInWithOAuth` called exactly once | `src/test/login/LoginButton.test.tsx`
- [x] T017 Write failing test: clicking LoginButton twice calls `signInWithOAuth` only once (double-click guard via `isLoading` check) | `src/test/login/LoginButton.test.tsx`
- [x] T018 Write failing test: LoginButton renders inline error text below button when `initialError` prop is non-null | `src/test/login/LoginButton.test.tsx`

### Implementation (US1)

- [x] T019 [P] [US1] Implement LoginFooter Server Component: renders "Bản quyền thuộc về Sun* © 2025" with Montserrat Alternates 16px/700/white, border-top `1px solid #2E3940`, padding `40px 90px`, `absolute bottom-0 w-full`; responsive: `py-6 px-4` on mobile, `py-8 px-12` on tablet | `src/components/login/LoginFooter.tsx`
- [x] T020 [P] [US1] Implement KeyVisual Server Component: renders ROOT FURTHER image via `next/image` with `aria-hidden={true}`, desktop `w-[451px] h-[200px]`, mobile `w-full max-w-[280px] h-auto`, tablet `w-[360px] h-auto`; import from `public/assets/login/images/key-visual.png` | `src/components/login/KeyVisual.tsx`
- [x] T021 [P] [US1] Implement LanguageSelector as a visual-only stub (Server Component for now): renders `public/assets/login/icons/flag-vn.svg` (24×24) + "VN" text (Montserrat 16px/700/white, tracking-[0.15px]) + `public/assets/login/icons/chevron-down.svg` (24×24); container `w-[108px] h-14 flex flex-row items-center p-4 rounded`; interactive behavior added in US2 | `src/components/login/LanguageSelector.tsx`
- [x] T022 [US1] Implement LoginButton Client Component (`'use client'`): state `isLoading: boolean`, `error: string | null`; on click — early return if `isLoading`, else set `isLoading = true`, call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: \`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback\` } })`; on Supabase error set `isLoading = false, error`; render golden button (`bg-[#FFEA9E]`, `w-full max-w-[400px] md:w-[305px] md:max-w-none`, `h-[60px]`, `py-4 px-6`, `rounded-lg`) with "LOGIN With Google" text + Google icon, `disabled={isLoading}`, `aria-label="Sign in with Google"`, `aria-busy={isLoading}`; inline error text (`text-sm text-[#FF6B6B] font-medium mt-2`) when error or `initialError` prop set; run `yarn test:run` → all T015–T018 GREEN | `src/components/login/LoginButton.tsx`
- [x] T023 [US1] Implement LoginHeader Server Component: flex row, `justify-between items-center`, `absolute top-0 w-full h-20`, `bg-[#0B0F12]/80`, `py-3 px-36`; left: `<Image>` logo (`w-[52px] h-14`) from `public/assets/login/logos/logo.png`; right: `<LanguageSelector />`; responsive: `px-4` mobile, `px-12` tablet | `src/components/login/LoginHeader.tsx`
- [x] T024 [US1] Implement HeroSection Server Component: renders `B_Bìa` section (`absolute top-[88px] w-full`, `flex flex-col items-start`, `py-24 px-36 gap-[120px]`); contains `<KeyVisual />` and inner Frame 550 (`flex flex-col pl-4 gap-6 w-[496px]`); inner Frame 550 contains hero text (`B.2_content`: "Bắt đầu hành trình của bạn cùng SAA 2025." / "Đăng nhập để khám phá!", Montserrat 20px/700/white, lh:40px, tracking-[0.5px]`) + `<LoginButton initialError={error} />`; responsive: `py-12 px-4 gap-[60px]` mobile, `py-16 px-12 gap-[80px]` tablet | `src/components/login/HeroSection.tsx`
- [x] T025 [US1] Implement LoginPage compositor Server Component: `relative w-full min-h-screen bg-[#00101A] overflow-hidden`; renders in z-order: (1) `C_Keyvisual` full-bleed bg image (`aria-hidden`, `absolute inset-0 w-full h-full object-cover`), (2) `Rectangle 57` left gradient overlay (`aria-hidden`, `absolute inset-0`, gradient `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)`), (3) `Cover` bottom gradient overlay (`aria-hidden`, `absolute inset-0`, gradient `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)`), (4) `<LoginHeader />`, (5) `<HeroSection error={error} />`, (6) `<LoginFooter />`; accepts `error?: string` prop | `src/components/login/LoginPage.tsx`
- [x] T026 [P] [US1] Implement login page route — Server Component: call `supabase.auth.getUser()` via `src/libs/supabase/server.ts`; if `user` non-null → `redirect('/')`; read `searchParams.error` and pass as `<LoginPage error={error} />`; export `export const revalidate = 0` and `export const dynamic = 'force-dynamic'` for `Cache-Control: no-store` | `src/app/login/page.tsx`
- [x] T027 [P] [US1] Update homepage route — Server Component: call `supabase.auth.getUser()`; if no `user` → `redirect('/login')`; render `<main><h1>SAA 2025 — Coming Soon</h1></main>` as placeholder (will be replaced by homepage spec `i87tDx10uM`) | `src/app/page.tsx`

**Checkpoint**: `yarn test:run` GREEN. Visit `http://localhost:3000/login` — full login screen renders with correct design. Click "LOGIN With Google" — OAuth flow initiates, loading state shows. Authenticated user visiting `/login` is immediately redirected to `/`.

---

## Phase 4: User Story 2 — Language Selector (Priority: P2)

**Goal**: Language toggle button in the header opens a dropdown overlay.

**Independent Test**: On the login page, click "VN" language selector → button highlights, chevron rotates 180°. Press `Escape` → dropdown closes and focus returns to the button. Tab to the button → visible focus ring appears.

- [x] T028 [P] [US2] Upgrade LanguageSelector to Client Component (`'use client'`): add `isOpen: boolean` state; `onClick` toggles `setIsOpen(!isOpen)`; keyboard: `Enter`/`Space` toggle, `Escape` closes (`onKeyDown` handler); ARIA: `aria-haspopup="listbox"`, `aria-expanded={isOpen}`, `aria-label="Select language"`, `role="button"`, `tabIndex={0}`; chevron rotates `transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`; hover: `hover:bg-white/10 cursor-pointer`; focus ring: `focus:outline focus:outline-2 focus:outline-[rgba(255,255,255,0.6)] focus:outline-offset-2`; when `isOpen` render a placeholder `<div role="listbox">` with "Dropdown coming soon" until `hUyaaugye2` spec is available | `src/components/login/LanguageSelector.tsx`
- [x] T029 [US2] Write test: LanguageSelector click toggles `aria-expanded` true/false; `Escape` closes dropdown and returns focus; `Enter`/`Space` toggles open — run `yarn test:run` and confirm GREEN | `src/test/login/LanguageSelector.test.tsx`

**Checkpoint**: Language selector button visually toggles open/closed. Keyboard navigation functional. `yarn test:run` GREEN.

---

## Phase 5: User Story 3 — Authenticated User Redirect (Priority: P1)

**Goal**: Authenticated users visiting `/login` are redirected to `/` before the page renders.

**Implementation status**: COMPLETE — fully handled by:
- Middleware (T012): redirects authenticated requests away from `/login`
- Login page server-side check (T026): `getUser()` → `redirect('/')` if session exists

No additional implementation tasks. Tests were written in T011 (middleware) and cover this behavior.

**Checkpoint**: With a valid session cookie, navigate to `http://localhost:3000/login` → redirected to `/` before any login HTML is rendered (no flash of login content).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive verification, accessibility audit, and final quality checks.

- [x] T034 Fix font bugs across all login components: (1) `LoginFooter` — replace broken `font-[family-name:var(--font-montserrat-alt)]` Tailwind v3 arbitrary class with correct `font-montserrat-alt` Tailwind v4 utility; remove misplaced logo `<Image>` (not in D_Footer spec); (2) Standardize all components to use `font-montserrat` / `font-montserrat-alt` Tailwind utilities (from `@theme inline`) instead of inline `style={{ fontFamily }}` — run `yarn test:run` GREEN | `src/components/login/*.tsx`
- [ ] T030 [P] Verify responsive layout at all 4 breakpoints — 320px (mobile min), 768px (tablet), 1024px (desktop min), 1440px (Figma reference) — check: no horizontal overflow, correct padding/gap adjustments from design-style.md responsive specs | Manual QA
- [ ] T031 [P] Audit keyboard navigation: `Tab` from page load focuses LanguageSelector first, then LoginButton (DOM order); `Enter`/`Space` on LanguageSelector opens dropdown; `Enter` on LoginButton initiates OAuth; `Escape` closes dropdown | Manual QA
- [ ] T032 [P] Verify focus rings visible on LanguageSelector (`outline: 2px solid rgba(255,255,255,0.6)`) and LoginButton (`outline: 2px solid #FFEA9E`) when focused via keyboard; confirm no global `outline: none` suppression in globals.css | `src/app/globals.css`
- [ ] T033 [P] Verify `aria-hidden={true}` on all decorative elements: background image (`C_Keyvisual`), left gradient overlay (`Rectangle 57`), bottom gradient overlay (`Cover`) — all rendered in `LoginPage.tsx` | `src/components/login/LoginPage.tsx`
- [x] T035 Fix footer copyright text alignment: change footer flex container from `justify-between` to `justify-center` so the text is horizontally centered across the full-width bar | `src/components/login/LoginFooter.tsx`

**Checkpoint**: Full WCAG 2.1 AA pass. Keyboard navigation works end-to-end. Responsive at all breakpoints. `yarn test:run` GREEN.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──────────────────────────────────────────> Phase 2 (Foundation)
                                                                    │
                                              ┌─────────────────────┤
                                              ▼                     ▼
                                   Phase 3 (US1 - P1)    Phase 4 (US2 - P2)
                                              │
                                              ▼
                                   Phase 5 (US3) [no-op — already done]
                                              │
                                              ▼
                                   Phase 6 (Polish)
```

- **Phase 1**: No dependencies — start immediately
- **Phase 2**: Requires Phase 1 complete (Vitest must be installed)
- **Phase 3 (US1)**: Requires Phase 2 complete (middleware, fonts, tokens must exist)
- **Phase 4 (US2)**: Requires Phase 3 T021 (LanguageSelector stub must exist to upgrade)
- **Phase 5 (US3)**: Already complete after Phase 2+3 — no tasks
- **Phase 6 (Polish)**: Requires Phase 3 + 4 complete

### Within Phase 3 (US1) — Dependency Chain

```
T015–T018 (write tests) ──> T022 (LoginButton — after tests RED)
T019–T021 (parallel stubs)
                           T020 (KeyVisual) ──┐
                                               ├──> T024 (HeroSection) ──┐
                           T022 (LoginButton) ─┘                         │
                           T021 (LanguageSelector stub) ──> T023 (LoginHeader) ──┤
                           T019 (LoginFooter) ───────────────────────────────────┤
                                                                                  ▼
                                                                       T025 (LoginPage) ──> T026 (login/page.tsx)
                                                                                           T027 (page.tsx) [parallel]
```

### Parallel Opportunities

| Group | Tasks | Condition |
|-------|-------|-----------|
| Asset downloads | T004–T008 | After T001–T003 done |
| Font + Token setup | T009, T010 | Independent files, run together |
| Leaf components | T019, T020, T021 | No inter-dependencies, different files |
| Page routes | T026, T027 | Different files, both depend on T025 |
| QA checks | T030–T033 | All manual/read-only, fully parallel |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete **Phase 1** (Setup) — ~30 min
2. Complete **Phase 2** (Foundation) — ~1h
3. Complete **Phase 3** (US1 — Google Sign-In) — the full OAuth flow end-to-end
4. **STOP and VALIDATE**: Run `yarn test:run`, manually test at `http://localhost:3000/login`
5. Deploy if approved

### Incremental Delivery

1. Phase 1 + 2
2. Phase 3 (US1) → Test → Deploy (MVP: users can log in)
3. Phase 4 (US2) → Test → Deploy (language selector)
4. Phase 6 (Polish) → Deploy (responsive + a11y hardening)

---

## Summary

| Phase | Tasks | Parallelizable |
|-------|-------|----------------|
| Phase 1 — Setup | T001–T008 (8 tasks) | T004–T008 in parallel |
| Phase 2 — Foundation | T009–T014 (6 tasks) | T009–T010 in parallel |
| Phase 3 — US1 Google Sign-In | T015–T027 (13 tasks) | T019–T021, T026–T027 in parallel |
| Phase 4 — US2 Language Selector | T028–T029 (2 tasks) | — |
| Phase 5 — US3 Auth Redirect | (no tasks — done by Phase 2+3) | — |
| Phase 6 — Polish | T030–T033 (4 tasks) | All parallel |
| **Total** | **33 tasks** | |

---

## Notes

- Commit after each phase checkpoint (Conventional Commits format: `feat:`, `test:`, `fix:`)
- Run `yarn test:run` before marking any phase complete
- Mark tasks complete as you go: `[x]`
- If TODO(Q1), TODO(Q2), or TODO(Q3) are resolved, update spec.md and this file before Phase 6
- Constitution Principle I requires assets in `public/assets/login/{icons|images|logos}/` — tasks T004–T008 use the correct subdirectories; update `plan.md` asset table accordingly
