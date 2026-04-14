# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Figma Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-06
**Status**: In Review

---

## Overview

The Login screen is the entry point for the **Sun Annual Awards 2025 (SAA 2025)** application. It
allows users to authenticate via their Google accounts using OAuth. Unauthenticated users who access
any protected page are redirected here. Authenticated users who land on this page are immediately
redirected to the main application.

**Target users**: All Sun* employees participating in the SAA 2025 programme.

**Business context**: SAA 2025 requires identity-based access so that kudos and awards are tied to
authenticated Sun* accounts. Google OAuth is used because all Sun* employees have a company Google
account.

---

## User Scenarios & Testing

### User Story 1 - Google Sign-In (Priority: P1)

**As an** unauthenticated user,
**I want to** click "LOGIN With Google" and complete Google OAuth authentication,
**So that** I can access the SAA 2025 application.

**Why this priority**: Core access gate — the entire application is unusable without this.

**Independent Test**: Open the login page without a session cookie → click the button → complete
Google auth → verify redirect to the main application page.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated, **When** they visit the login URL, **Then** the Login
   screen is displayed with the "LOGIN With Google" button enabled.
2. **Given** the login page is displayed, **When** the user clicks "LOGIN With Google", **Then** the
   Google authentication popup/tab opens.
3. **Given** the Google auth flow is in progress, **When** authentication is processing, **Then** the
   button becomes disabled and shows a loading indicator.
4. **Given** the user completes Google auth successfully, **When** the OAuth callback is received,
   **Then** the user is redirected to the main application page with an active session.
5. **Given** the user cancels or fails Google auth, **When** the popup is closed or an error is
   returned, **Then** the user remains on the Login screen and the button is re-enabled.
6. **Given** the OAuth callback receives an invalid or expired code, **When** `/auth/callback` is
   called, **Then** the system redirects back to the login page with an error query param and
   displays an inline error message.
7. **Given** the user successfully authenticated, **When** redirected to the main page and then
   navigates back to the login URL, **Then** the system redirects them to the main page immediately
   (no login screen rendered).

---

### User Story 2 - Language Selection (Priority: P2)

**As a** user,
**I want to** select my preferred display language via the language toggle in the header,
**So that** the interface is shown in a language I understand.

**Why this priority**: Important for accessibility and inclusivity; does not block core auth flow.

**Independent Test**: Open the login page → click the "VN" language selector → verify the language
dropdown opens.

**Acceptance Scenarios**:

1. **Given** the login page is displayed, **When** the user inspects the header, **Then** the
   language selector shows "VN" with the Vietnam flag and a chevron-down icon.
2. **Given** the language selector is visible, **When** the user clicks "VN", **Then** the language
   dropdown (Dropdown-ngôn ngữ) opens.
3. **Given** the language selector is visible, **When** the user hovers over it, **Then** the
   selector highlights and the cursor changes to a pointer.
4. **Given** the language dropdown is open, **When** the user selects a language option, **Then**
   the dropdown closes, the selector label updates to the chosen language, and the page UI
   switches to the selected language without a full page reload.
   > **TODO(Q3)**: Confirm: dynamic switch (no reload) vs. hard reload. Assumption: dynamic switch.
5. **Given** the language dropdown is open, **When** the user presses `Escape` or clicks outside,
   **Then** the dropdown closes and focus returns to the language toggle button.

---

### User Story 3 - Authenticated User Redirect (Priority: P1)

**As an** already-authenticated user,
**I want** the system to automatically redirect me away from the login page,
**So that** I do not have to see the login screen unnecessarily.

**Why this priority**: Security / UX baseline — prevents double-login confusion.

**Independent Test**: Set a valid session cookie → navigate to the login URL → verify redirect to
the main application page.

**Acceptance Scenarios**:

1. **Given** the user has a valid active session, **When** they navigate to the login URL, **Then**
   the system redirects them to the main application page without showing the login form.
2. **Given** an authenticated user is on a protected page, **When** they click logout, **Then** the
   session is destroyed and the user is redirected to the Login screen.

---

### Edge Cases

- **OAuth domain restriction**: If Google OAuth is restricted to `@sun-asterisk.com` accounts and
  the user logs in with a non-Sun* account → stay on login page; display an inline error:
  *"Your account is not authorised. Please use your Sun* Google account."*
  > **TODO(Q1)**: Confirm whether domain restriction is enforced and what the exact error message is.
  > Assumption: restriction is active; error displayed inline below the button.
- **Invalid/expired OAuth callback code**: If `/auth/callback` receives a bad code → redirect back
  to login page with `?error=auth_failed`; display inline error message.
- **Network unavailable when clicking button**: Button re-enables after the OAuth popup fails to
  open; show error: *"Connection failed. Please check your network and try again."*
- **Concurrent double-click**: Button is disabled immediately on first click; second click is
  ignored.
- **Very small screens (< 320px)**: Layout degrades gracefully with no horizontal overflow.

---

## UI/UX Requirements *(from Figma)*

> Visual specs are in [design-style.md](./design-style.md). All pixel values, colors, and typography
> come from that document.

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| C_Keyvisual | 662:14388 | Full-bleed background artwork image | None |
| Rectangle 57 | 662:14392 | Left-to-right gradient overlay (#00101A → transparent) | None |
| Cover | 662:14390 | Bottom-to-top gradient overlay (#00101A → transparent) | None |
| A_Header | 662:14391 | Fixed top navigation bar (logo + language selector) | Language click |
| A.1_Logo | I662:14391;186:2166 | SAA 2025 logo at top-left | None |
| A.2_Language | I662:14391;186:1601 | Language toggle ("VN" + flag + chevron) at top-right | Click → open dropdown |
| B_Bìa | 662:14393 | Hero section covering most of the viewport | None |
| B.1_Key Visual | 662:14395 | "ROOT FURTHER" logo image | None |
| B.2_content | 662:14753 | Hero description text (2 lines) | None (not interactive) |
| B.3_Login | 662:14425 | "LOGIN With Google" CTA button with Google icon | Click → Google OAuth |
| Error message | N/A | Inline error text below login button; shown on OAuth failure or `?error=` param | None (display only) |
| D_Footer | 662:14447 | Fixed footer with copyright text and top border | None |

### Navigation Flow

- **From**:
  - Direct URL access (unauthenticated user)
  - Redirect from any protected page (unauthenticated access attempt)
  - Redirect after logout
  - Countdown page (pre-launch → login after countdown ends, screen `8PJQswPZmU`)
- **To**:
  - Main application page on successful authentication
    > **TODO(Q2)**: Confirm exact URL path (`/`, `/home`, or other). Assumption: `/`.
  - Language dropdown overlay (screen `hUyaaugye2`) on language selector click — stays on Login page
- **Triggers**:
  - Click "LOGIN With Google" → Google OAuth → success → main page
  - Already authenticated → immediate redirect to main page (server-side, pre-render)
  - Click language toggle → opens Dropdown-ngôn ngữ overlay
  - OAuth callback with `?error=` param → re-display login page with error state

### Visual Requirements

- See [design-style.md](./design-style.md) for complete visual specs.
- **Responsive breakpoints**: Mobile (≥320px), Tablet (≥768px), Desktop (≥1024px)
  - Desktop reference: 1440 × 1024px (Figma frame dimensions)
- **Animations/Transitions**:
  - Login button: `box-shadow` lift on hover (150ms ease-in-out)
  - Login button: disabled + loading spinner state during OAuth
  - Language selector: cursor pointer + highlight on hover
- **Accessibility**: WCAG 2.1 AA — all interactive elements must have accessible labels;
  contrast ≥ 4.5:1 for text
- **Keyboard navigation**:
  - `Tab` focuses the Language selector, then the Login button (in DOM order)
  - `Enter` / `Space` on the Language selector opens the dropdown
  - `Escape` closes the language dropdown and returns focus to the Language selector
  - `Enter` on the Login button triggers the OAuth flow
  - Focus ring MUST be visible on all interactive elements (not suppressed globally)
- **ARIA**:
  - Login button: `aria-label="Sign in with Google"`, `aria-busy="true"` during loading
  - Language selector: `aria-haspopup="listbox"`, `aria-expanded="true/false"`,
    `aria-label="Select language"`
  - Background image and gradient overlays: `aria-hidden="true"`
  - Hero description text: standard readable content, no special role needed

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display the Login screen to unauthenticated users.
- **FR-002**: System MUST redirect authenticated users away from the Login screen to the main page.
- **FR-003**: Users MUST be able to initiate Google OAuth by clicking "LOGIN With Google".
- **FR-004**: System MUST disable the login button and show a loading indicator during OAuth processing.
- **FR-005**: System MUST redirect users to the main application page on successful Google OAuth.
- **FR-006**: System MUST keep the user on the Login screen and re-enable the button on OAuth failure.
- **FR-007**: Users MUST be able to open the language selector dropdown from the header.
- **FR-008**: System MUST destroy the session on logout and redirect to the Login screen.

### Technical Requirements

- **TR-001**: Authentication MUST use Supabase Auth with Google OAuth provider via `@supabase/ssr`.
- **TR-002**: Session cookies MUST be handled server-side (Next.js middleware) to enforce redirect
  before page render.
- **TR-003**: The Google OAuth callback route (`/auth/callback`) MUST exchange the code for a
  session and redirect to the main page.
- **TR-004**: No credentials or secrets MUST be hard-coded; all keys MUST come from environment
  variables.
- **TR-005**: The login page MUST be a Next.js Server Component (or use server-side redirect logic)
  to avoid flash-of-login-content for authenticated users.

### Key Entities

- **User session**: Managed by Supabase Auth; contains `user.id`, `user.email`, `user.user_metadata`
  (Google profile data).
- No local form data — authentication is fully delegated to Google OAuth.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase `signInWithOAuth({ provider: 'google' })` | Client SDK | Initiate Google OAuth flow | Exists (Supabase) |
| `/auth/callback` | GET | Receive OAuth code, exchange for session, redirect to main page | New (Next.js route) |
| Supabase `signOut()` | Client SDK | Destroy session on logout, redirect to login | Exists (Supabase) |
| Next.js middleware | — | Check session cookie server-side; redirect unauthenticated → login, authenticated → main | New |

---

## State Management

- **Local component state**:
  - `isLoading: boolean` — controls button disabled state and loading spinner during OAuth
  - `error: string | null` — stores OAuth error message; displayed as inline error text below the
    login button (no separate error UI component exists in this Figma frame; the error message
    appears as a small text block below B.3_Login in the same golden-toned or red-tinted style)
    > **TODO(Q1)**: Confirm error display location and styling with design team.
- **Global state**:
  - Supabase session (managed by `@supabase/ssr` `createServerClient` / `createBrowserClient`)
  - Language preference (stored in cookie for persistence across login redirect; key: `lang`)
- **URL-driven state**:
  - `?error=auth_failed` query param triggers error display on page load (from callback redirect)
- **Cache requirements**: None — login page MUST NOT be cached; `Cache-Control: no-store`

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: An unauthenticated user can complete the full Google OAuth login flow and land on the
  main application page within ≤5 seconds of completing Google auth.
- **SC-002**: An authenticated user visiting the login URL is redirected to the main page before
  the login screen is rendered (no flash).
- **SC-003**: The login button is disabled for the full duration of the OAuth processing state,
  preventing double-clicks.

---

## Out of Scope

- Email/password authentication — only Google OAuth is supported.
- User registration flow — new users are auto-provisioned via Google OAuth.
- Password reset — not applicable.
- Remember-me / persistent session toggle — session lifetime managed by Supabase.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`)
- [ ] Language dropdown spec available (screen_id: `hUyaaugye2`) — needed for full language UX
- [ ] Supabase Google OAuth provider configured in Supabase project dashboard
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env`

---

## Notes

- The "LOGIN With Google" button is the **only** authentication method — there is no fallback.
- The Figma design is desktop-first (1440 × 1024px). Mobile/tablet layouts are not explicitly
  designed in this frame; implement responsively per constitution Principle V.
- The hero background image (`C_Keyvisual`) is a full-bleed decorative image. It MUST have
  `aria-hidden="true"` and NOT serve as a content carrier.
- Language selection on the login page should persist (via cookie or localStorage) so the selected
  language is still active after login redirect.
