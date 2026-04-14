# Feature Specification: Homepage SAA

**Frame ID**: `2167:9026`
**Screen ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The **Homepage SAA** is the main landing page for the Sun* Annual Awards 2025 (SAA) platform. It serves as the central hub introducing users to the event — showcasing the "ROOT FURTHER" campaign theme, a live countdown timer to the event, the awards system, and the Sun* Kudos initiative.

The page is composed of:
1. **Header** — fixed navigation bar with logo, nav links, and user controls
2. **Hero / Keyvisual** — full-bleed background, "ROOT FURTHER" headline, countdown timer, event info, and CTA buttons
3. **Root Further Content** — introductory text block explaining the program's mission
4. **Awards System** — grid of 6 award category cards, each linking to Awards Information
5. **Sun\* Kudos** — promotional section for the peer recognition program
6. **Footer** — nav links and copyright
7. **Floating Widget Button** — persistent quick-action button for writing a Kudos

**Target Users**: Authenticated Sun* employees accessing the platform during or after the launch period.

**Business Context**: Drives awareness and participation in Sun* Annual Awards 2025; directs users to the awards info page and the Sun* Kudos peer-recognition system.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — View Homepage and Navigate (Priority: P1)

An authenticated user lands on the homepage and can navigate to all major sections of the application via the header, hero CTAs, award cards, and footer links.

**Why this priority**: Navigation is the core utility of this page. Without working links, the homepage provides no actionable value.

**Independent Test**: Visit `/` as an authenticated user; verify all nav links route correctly, the header is visible, and the page renders without errors.

**Acceptance Scenarios**:

1. **Given** an authenticated user visits `/`, **When** the page loads, **Then** the header renders with logo, nav links (About SAA 2025, Awards Information, Sun* Kudos), and controls (bell, language toggle, avatar). The "About SAA 2025" link is in selected state.
2. **Given** the user clicks **Awards Information** (header or CTA), **When** navigated, **Then** the user lands on the Awards Information page.
3. **Given** the user clicks **Sun\* Kudos** (header or CTA), **When** navigated, **Then** the user lands on the Sun* Kudos page.
4. **Given** the user clicks an award card's **Chi tiết** link or card title/image, **When** navigated, **Then** the user lands on the Awards Information page scrolled to the relevant award section (via URL hash anchor).
5. **Given** the user clicks the **Sun\* Kudos "Chi tiết"** button, **When** navigated, **Then** the user lands on the Sun* Kudos tab.
6. **Given** the user clicks the **logo**, **When** clicked, **Then** the page scrolls to the top.

---

### User Story 2 — View Countdown Timer (Priority: P1)

An authenticated user sees the live countdown timer in the hero section showing the remaining time (DAYS, HOURS, MINUTES) until the event.

**Why this priority**: The countdown is the hero's primary dynamic element; it communicates the imminence of the event and creates urgency.

**Independent Test**: Visit `/` and verify the countdown reads correct values and decrements in real time (minutes).

**Acceptance Scenarios**:

1. **Given** the launch date is in the future, **When** the user views the hero, **Then** the countdown displays correct remaining DAYS, HOURS, MINUTES with 2-digit zero-padded values (e.g., "05", "08", "42") and a "Coming soon" label.
2. **Given** 1 minute elapses while the page is open, **When** the timer ticks, **Then** the MINUTES counter decrements by 1 without a page reload.
3. **Given** the countdown has reached 0 days 0 hours 0 minutes, **When** the event time has passed, **Then** the "Coming soon" label is hidden and the timer shows "00 00 00".

---

### User Story 3 — Browse Awards System (Priority: P2)

An authenticated user scrolls to the awards section and can view all 6 award categories with their names, descriptions, and navigate to their detail pages.

**Why this priority**: Core informational content about the event; secondary to navigation.

**Independent Test**: Verify 6 award cards render with thumbnail, title, description, and working "Chi tiết" links.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the "Hệ thống giải thưởng" section, **When** the section is visible, **Then** 6 award cards are displayed in a 3-column grid (desktop): Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
2. **Given** the user hovers an award card, **When** hovering, **Then** the card lifts slightly with a highlighted border/glow effect.
3. **Given** the user clicks a card's image, title, or "Chi tiết" link, **When** clicked, **Then** they are navigated to `/awards#{award-slug}` which scrolls to the correct award detail.
4. **Given** viewport is ≤ 768px (tablet/mobile), **When** rendered, **Then** the award grid displays in 2 columns.

---

### User Story 4 — View Sun* Kudos Section (Priority: P2)

An authenticated user sees the Sun* Kudos promotional block and can navigate to the Kudos page.

**Why this priority**: Secondary feature promotion; important for driving Kudos engagement.

**Independent Test**: Scroll to D1 section, verify "Chi tiết" button works and navigates to `/kudos`.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Sun* Kudos section, **When** visible, **Then** the block displays the label "Phong trào ghi nhận", title "Sun* Kudos", a description paragraph, and a "Chi tiết" button with an illustration.
2. **Given** the user clicks "Chi tiết", **When** clicked, **Then** they navigate to the Sun* Kudos tab.

---

### User Story 5 — Use Floating Widget Button (Priority: P3)

An authenticated user can click the floating action button to open a quick-action menu (e.g., write a Kudos).

**Why this priority**: Enhancement; not blocking core flows.

**Independent Test**: Verify the floating button is always visible, click it, and confirm the quick-action menu opens.

**Acceptance Scenarios**:

1. **Given** the user is on any scroll position, **When** the page is visible, **Then** the floating pill button (pen icon + "/" + SAA logo) is visible at the bottom-right of the screen.
2. **Given** the user clicks the widget button, **When** clicked, **Then** a quick-action menu opens with options (e.g., write Kudos, view rules).

---

### User Story 6 — Language & Profile Controls (Priority: P2)

An authenticated user can switch language (VN/EN) and access the profile dropdown from the header.

**Why this priority**: Core UX controls for all users.

**Independent Test**: Click each header control (bell, VN/EN, avatar) and verify the correct overlay/panel opens.

**Acceptance Scenarios**:

1. **Given** the user clicks the language button (VN/EN), **When** clicked, **Then** the language dropdown opens with VN/EN options; selecting one switches the UI language.
2. **Given** the user clicks the avatar icon, **When** clicked, **Then** the profile dropdown opens with options: Profile, Sign out, and Admin Dashboard (for admin roles only).
3. **Given** the user clicks the bell icon, **When** clicked, **Then** the notification panel opens showing unread notifications (badge count displayed when unread exist).

---

### Edge Cases

- If the background image fails to load, the page remains readable with the `#00101A` background.
- If `NEXT_PUBLIC_LAUNCH_DATE` is not set or invalid, the countdown should show "00 00 00" gracefully.
- If the award card image fails to load, a placeholder is shown.
- Description text in award cards MUST be clamped to 2 lines with ellipsis if it overflows.
- On mobile, the header navigation links collapse (hamburger menu or similar responsive behavior).
- Unauthenticated users accessing `/` MUST be redirected to `/login` (handled by middleware, not homepage logic).
- The "Comming soon" label has a typo in Figma; the implementation should render **"Coming soon"** (correct spelling).
- When the countdown ends, "Coming soon" is hidden; the timer remains frozen at "00 00 00" — no redirect from the homepage (contrast with the prelaunch `/countdown` page which redirects).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | `2167:9091` | Top nav: logo, links, controls | Click links → navigate; hover → highlight |
| Logo | `I2167:9091;178:1033` | SAA logo 52×48px, top-left | Click → scroll to top |
| Nav Link (Selected) | `I2167:9091;186:1579` | "About SAA 2025", gold text+underline | Click → scroll top |
| Nav Link (Hover) | `I2167:9091;186:1587` | "Awards Information", highlight bg | Click → /awards |
| Nav Link (Normal) | `I2167:9091;186:1593` | "Sun* Kudos" | Click → /kudos |
| Bell/Notification | `I2167:9091;186:2101` | 40×40px icon, badge on unread | Click → notification panel |
| Language Toggle | `I2167:9091;186:1696` | "VN" pill button | Click → language dropdown |
| Avatar Button | `I2167:9091;186:1597` | 40×40px, gold border | Click → profile dropdown |
| Hero Keyvisual | `2167:9027` | Full-bleed background + gradient overlay | — |
| Countdown (B1) | `2167:9035` | 1224px wide, "Coming soon" + DAYS/HOURS/MINUTES | Auto-updates per minute |
| Coming Soon Label | `2167:9036` | Montserrat 24px 700, hidden at t=0 | Hidden when event starts |
| Countdown Timer | `2167:9037` | 3 digit pairs: Digital Numbers font | Live countdown |
| Event Info (B2) | `2167:9053` | Time: 18h30, Venue, streaming note | Static |
| CTA Buttons (B3) | `2167:9062` | ABOUT AWARDS (gold) + ABOUT KUDOS (bordered) | Click → navigate |
| Root Further Text (B4) | `5001:14827` | Descriptive paragraph | Static |
| Awards Header (C1) | `2167:9069` | Caption + title "Hệ thống giải thưởng" + divider | Static |
| Award Card Grid (C2) | `5005:14974` | 6 cards in 3-col grid | Hover lift, click → /awards#{slug} |
| Sun* Kudos Block (D1) | `3390:10349` | Label + title + description + CTA + bg image | Click "Chi tiết" → /kudos |
| Floating Widget (6) | `5022:15169` | Fixed pill button, pen+SAA icons | Click → quick action menu |
| Footer (7) | `5001:14800` | Logo + 4 nav links + copyright | Click links → navigate; "Tiêu chuẩn chung" → community standards |

### Navigation Flow

- **Entry**: Redirect from `/countdown` when countdown expires; direct access via `/` for authenticated users
- **Exit points**: → `/awards`, → `/awards#{slug}`, → `/kudos`, → `/profile`, → `/community-standards`, → notifications panel, → language/profile dropdowns
- **Header active state**: "About SAA 2025" is active/selected on this page

### Visual Requirements

See [design-style.md](./design-style.md) for all tokens, measurements, and component styles.

- **Responsive breakpoints**: mobile (≥320px), tablet (≥768px), desktop (≥1024px)
- **Mobile**: header collapses, award grid is 2-col, hero stacks vertically, CTA buttons stack
- **Animations**: card hover lift (transform + box-shadow), button hover transitions (150ms ease)
- **Accessibility**: WCAG 2.1 AA — all interactive elements have aria-labels, 4.5:1 contrast minimum, keyboard nav for all flows

### Accessibility Requirements

| Element | ARIA / Keyboard requirement |
|---------|-----------------------------|
| Header nav links | `<nav>` with `aria-label="Main navigation"`; active link has `aria-current="page"` |
| Logo link | `aria-label="Sun* Annual Awards 2025 — Go to homepage"` |
| Bell button | `aria-label="Notifications"` + `aria-haspopup="true"`; badge: `aria-label="N unread notifications"` |
| Language toggle | `aria-label="Select language"` + `aria-haspopup="listbox"` |
| Avatar button | `aria-label="User menu"` + `aria-haspopup="true"` |
| Countdown timer | `role="timer"`, `aria-live="polite"`, `aria-label="Countdown to event"` (reuse from countdown page) |
| Award cards | Each card is a `<article>`; image has `alt="{Award Name}"` |
| "Chi tiết" buttons | `aria-label="Chi tiết về {Award Name}"` to distinguish multiple identical labels |
| Floating widget | `aria-label="Quick actions"` + `aria-haspopup="true"` |
| Footer nav | `<footer>` with `<nav aria-label="Footer navigation">` |
| All interactive elements | Must be keyboard-focusable; focus ring: `outline: 2px solid #FFEA9E` |

---

## State Management

### Local Component State

| Component | State | Type | Notes |
|-----------|-------|------|-------|
| `CountdownTimer` | `countdown` | `CountdownState \| null` | From `useCountdown` hook; null during SSR |
| `Header` | `isProfileMenuOpen` | `boolean` | Profile dropdown visibility |
| `Header` | `isNotificationOpen` | `boolean` | Notification panel visibility |
| `Header` | `isLanguageMenuOpen` | `boolean` | Language dropdown visibility |
| `FloatingWidget` | `isMenuOpen` | `boolean` | Quick action menu visibility |

### Global / Server State

| State | Source | Notes |
|-------|--------|-------|
| User session | Supabase Auth (server) | Retrieved via `createServerClient` in Server Component |
| User role | Supabase session claims | Determines Admin Dashboard visibility in profile dropdown |
| Unread notification count | `/api/notifications` (predicted) | Fetched server-side for initial badge count; client-side polling optional |
| Locale / language | Cookie or URL param | Drives VN/EN UI language; persisted across sessions |

### Loading & Error States

| State | Component | Behavior |
|-------|-----------|----------|
| Countdown loading (SSR) | `CountdownTimer` | Renders `"-"` placeholder digits during hydration |
| Background image loading | `HeroSection` | Dark background (`#00101A`) as fallback while image loads |
| Award card image loading | `AwardCard` | Placeholder shimmer or dark bg fallback |
| Notifications fetch error | `Header bell` | Badge hidden; no error surfaced to user |

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the homepage with hero, awards, Kudos, and footer sections on first load.
- **FR-002**: Countdown MUST auto-update every minute using client-side interval based on `NEXT_PUBLIC_LAUNCH_DATE`.
- **FR-003**: "Coming soon" label MUST be hidden when countdown reaches 00 00 00.
- **FR-004**: Users MUST be able to navigate to Awards Information, Sun* Kudos, and profile from the header and page CTAs.
- **FR-005**: Award cards MUST link to `/awards#{award-slug}` to anchor to the correct award detail.
- **FR-006**: Award card description MUST be clamped to 2 lines with ellipsis on overflow.
- **FR-007**: Floating widget button MUST be fixed/sticky across all scroll positions.
- **FR-008**: Header "About SAA 2025" link MUST be in selected/active state when on the homepage.
- **FR-009**: Language toggle MUST switch UI locale between VN and EN.
- **FR-010**: Bell icon MUST show an unread badge when there are unread notifications.

### Technical Requirements

- **TR-001**: Page MUST be a Next.js App Router Server Component with client islands for countdown and interactive elements.
- **TR-002**: Countdown logic MUST reuse `useCountdown` hook from `src/hooks/useCountdown.ts`.
- **TR-003**: All design tokens MUST be consumed from CSS variables in `globals.css` (no hardcoded colors/spacing in component files).
- **TR-004**: All images MUST use Next.js `<Image>` component with `priority` for above-the-fold content.
- **TR-005**: Navigation URLs MUST be derived from `SCREENFLOW.md` — never hardcoded in component files.
- **TR-006**: Page MUST be accessible (WCAG 2.1 AA): semantic HTML, ARIA labels, keyboard navigation.
- **TR-007**: Award card slugs MUST be derived from a config/constants file, not hardcoded in components.
- **TR-008**: All images/icons from Figma MUST be placed under `public/assets/home/{images|icons}/` using kebab-case filenames.

### Key Entities

- **Award**: name, slug, description (short), thumbnail image, link target
- **CountdownState**: days, hours, minutes (from `useCountdown` hook)
- **NavLink**: label, href, isActive
- **Notification**: count (unread badge)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | Homepage is mostly static/config-driven | — |
| `/api/notifications` | GET | Fetch unread notification count for badge | Predicted (exists) |
| `/api/awards` | GET | Fetch award categories list (for dynamic rendering) | Predicted |

> **Note**: Award categories may be static config (hardcoded list) rather than API-driven, depending on backend. This should be clarified during planning.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads in < 2s on desktop; countdown renders without FOUC.
- **SC-002**: All 6 CTA/nav links navigate to the correct destination pages.
- **SC-003**: Countdown updates correctly every minute without memory leaks.
- **SC-004**: All 6 award cards render with correct thumbnails, titles, and links.
- **SC-005**: Page passes WCAG 2.1 AA audit with zero critical violations.
- **SC-006**: All Vitest unit/integration tests pass.

---

## Out of Scope

- Admin functionality (handled in separate Admin screens)
- Award winner announcement / result display (separate screen)
- Notification panel content (separate component spec)
- Profile dropdown content (separate spec: Dropdown-profile)
- Language dropdown content (separate spec: hUyaaugye2-Dropdown-ngôn-ngữ)
- Animation/transition details beyond hover states (unless specified in design-style.md)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/contexts/api-docs.yaml`)
- [ ] Database design completed (`.momorph/contexts/database-schema.sql`)
- [x] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`)
- [x] Related screen: `8PJQswPZmU-countdown-prelaunch-page` (redirects to homepage on expiry)
- [x] Reusable: `useCountdown` hook from countdown implementation

---

## Notes

- The "ROOT FURTHER" and "FURTHER" headline text are rendered as **images** in Figma (MM_MEDIA_Root Text, MM_MEDIA_Further Text), not text — these are image assets that must be downloaded.
- Award card thumbnails (MM_MEDIA_Award BG + award name images) must be sourced from Figma via `get_media_files`.
- The Sun* Kudos section background is an image (MM_MEDIA_Kudos Background) also sourced from Figma.
- Countdown uses the same `NEXT_PUBLIC_LAUNCH_DATE` env var as the prelaunch countdown page.
- The homepage is the **authenticated** experience; the `/countdown` page is the pre-launch gate for unauthenticated/pre-launch visitors.
