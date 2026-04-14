# Feature Specification: Countdown - Prelaunch page

**Frame ID**: `2268:35127`
**Screen ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The **Countdown - Prelaunch page** is a full-screen holding page displayed before the main application officially launches. It features a dark, cinematic background with a glass-morphism countdown timer showing the remaining time (Days, Hours, Minutes) until the event/platform goes live.

The page is purely informational — there are no user interactions beyond viewing the countdown. The timer updates in real time (client-side) based on a configured target launch date.

**Target Users**: All visitors (authenticated or not) who access the platform before the launch date.

**Business Context**: Builds anticipation and communicates the upcoming launch timeline to employees/users.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Countdown Timer (Priority: P1)

A visitor navigates to the platform before the launch date and sees a real-time countdown showing the time remaining until the event starts, displayed as DAYS, HOURS, and MINUTES in large LED-style digit cards.

**Why this priority**: This is the sole purpose of the page — the primary and only content. Without a working countdown, the page has no value.

**Independent Test**: Navigate to `/countdown` before the target launch date; verify the countdown displays correctly and decrements in real time.

**Acceptance Scenarios**:

1. **Given** the launch date is in the future, **When** a user opens the page, **Then** the countdown shows the correct remaining days, hours, and minutes with 2-digit zero-padded display (e.g., "05", "23", "59").
2. **Given** the page is open, **When** one minute elapses, **Then** the minutes counter decrements by 1 automatically without page refresh.
3. **Given** there are 0 days remaining, **When** a user opens the page, **Then** the DAYS counter shows "00" and hours/minutes still count down correctly.
4. **Given** the countdown reaches 00 days, 00 hours, 00 minutes, **When** the timer hits zero, **Then** the page handles end-of-countdown gracefully (e.g., redirects to main app or shows a "launched" state).

---

### User Story 2 - Background Visual Experience (Priority: P2)

A visitor sees a visually rich pre-launch page with a themed background image and gradient overlay, providing brand context and creating anticipation.

**Why this priority**: Enhances the user experience and brand impression; secondary to the functional countdown itself.

**Independent Test**: Open `/countdown` and verify background image, gradient overlay, and title text render correctly on all breakpoints.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the background image is available, **Then** the image is displayed full-screen behind the gradient overlay and content.
2. **Given** a user views the page on mobile (< 768px), **When** the page renders, **Then** the background scales correctly with no layout breakage and countdown is readable.
3. **Given** the background image fails to load, **When** the page renders, **Then** the dark background color (#00101A) provides a fallback that keeps the page legible.

---

### User Story 3 - Responsive Layout (Priority: P3)

A user accesses the countdown page on mobile, tablet, or desktop and the layout adapts gracefully to the screen size.

**Why this priority**: The design is desktop-first at 1512px, but mobile support is required per constitution Principle V.

**Independent Test**: Open `/countdown` on mobile viewport (375px), tablet (768px), and desktop (1024px+). Verify all elements are visible and correctly laid out.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** the page renders, **Then** the timer units stack vertically (column) with reduced font sizes.
2. **Given** a tablet viewport, **When** the page renders, **Then** timer units remain in a row with moderately sized digit cards.
3. **Given** a desktop viewport, **When** the page renders, **Then** the layout matches the Figma design exactly (1512px reference).

---

### Edge Cases

- What happens when the launch date environment variable is not set? → Display a fallback state (e.g., all zeros or an error message).
- What happens if the user's clock is ahead of the server time? → Use server-derived target date; client JS computes delta from `Date.now()` against a fixed UTC timestamp.
- What if the countdown is already past zero? → Show "00 DAYS / 00 HOURS / 00 MINUTES" frozen, then redirect to main app (`/`) within 1 second.
- What if JavaScript is disabled? → Show a static "Coming Soon" message as a no-JS fallback.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Page Container | 2268:35127 | Full-screen dark page wrapper | None |
| BG Image Layer | 2268:35129 | Full-screen background photo | None (decorative) |
| Gradient Overlay | 2268:35130 | Dark gradient overlay over image | None (decorative) |
| Title Text | 2268:35137 | "Sự kiện sẽ bắt đầu sau" — centered white heading | None |
| Timer Row | 2268:35138 | Horizontal row of 3 time units | None |
| 1_Days Unit | 2268:35139 | Days counter (2 digit cards + "DAYS" label) | Auto-updates |
| 2_Hours Unit | 2268:35144 | Hours counter (2 digit cards + "HOURS" label) | Auto-updates |
| 3_Minutes Unit | 2268:35149 | Minutes counter (2 digit cards + "MINUTES" label) | Auto-updates |
| Digit Card | 186:2619 | Single LED-style glass digit card (77×123px) | None |

For full visual specs (dimensions, colors, typography, spacing) → see [design-style.md](./design-style.md).

### Navigation Flow

- **Inbound**: Direct URL access (`/countdown`) — no navigation from other screens while in pre-launch state. All routes may redirect here while `COUNTDOWN_ACTIVE=true`.
- **Outbound**: When countdown reaches zero → redirect to main app (`/`).
- **Triggers**: Timer reaching `00:00:00` automatically redirects.

### Visual Requirements

- **Responsive breakpoints**: Mobile (≥320px), Tablet (≥768px), Desktop (≥1024px) — see [design-style.md → Responsive Specifications](./design-style.md).
- **Animations/Transitions**: Digit updates every second with smooth transition; consider a flip/roll card animation for each digit change.
- **Accessibility**: WCAG 2.1 AA minimum:
  - Timer container: `role="timer"` + `aria-live="polite"` + `aria-label="Countdown to launch"`
  - Each time unit: `aria-label="X days"`, `"X hours"`, `"X minutes"` (using current numeric values)
  - Title text: normal `<h1>` element (not a `<div>`)
  - Color contrast: white (#FFF) on dark (#00101A) = 18.1:1 — passes AAA ✅
  - Keyboard navigation: N/A (no interactive elements)
  - No-JS fallback: static `<noscript>` "Coming Soon" message
- **Font**: "Digital Numbers" (custom) for digit display; Montserrat for title and labels.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a real-time countdown to a configurable target launch date/time (stored as environment variable `NEXT_PUBLIC_LAUNCH_DATE` in UTC ISO format).
- **FR-002**: The countdown MUST update every second client-side without a page refresh.
- **FR-003**: The system MUST display three time units: DAYS (00–99+), HOURS (00–23), MINUTES (00–59), each zero-padded to 2 digits.
- **FR-004**: The system MUST show "00" for any unit that has reached or passed zero.
- **FR-005**: When the countdown reaches 00:00:00, the system MUST redirect to the main application (`/`).
- **FR-006**: The page MUST render the title "Sự kiện sẽ bắt đầu sau" centered above the timer.
- **FR-007**: The page MUST display a full-screen background image with gradient overlay.
- **FR-008**: The page MUST set an appropriate HTML `<title>` (e.g., "Coming Soon | Sun* Kudos") and `<meta name="description">` for the pre-launch state.

### Technical Requirements

- **TR-001**: The countdown computation MUST be pure client-side using `setInterval` (1000ms), calculating delta from `Date.now()` against the fixed `NEXT_PUBLIC_LAUNCH_DATE`.
- **TR-002**: The "Digital Numbers" font MUST be loaded as a local web font from `public/assets/countdown/fonts/` to avoid FOUT (Flash of Unstyled Text).
- **TR-003**: The Montserrat font MUST be loaded via `next/font/google`.
- **TR-004**: The countdown page MUST be accessible at `/countdown` and optionally enforced via middleware redirect when `NEXT_PUBLIC_COUNTDOWN_ACTIVE=true` (string `"true"`). The middleware MUST redirect all authenticated and unauthenticated app routes to `/countdown` while this flag is active.
- **TR-005**: The component MUST clean up `setInterval` on unmount to avoid memory leaks.
- **TR-006**: All design tokens (colors, spacing, radii) MUST be defined as CSS variables in `globals.css` — no raw values in component files.
- **TR-007**: The countdown component MUST handle SSR/CSR hydration by rendering a placeholder (e.g., `--:--:--` or skeleton digits) on the server and populating real values only after client-side hydration to prevent React hydration mismatch errors.
- **TR-008**: The countdown timer container MUST have `role="timer"` and `aria-live="polite"` so screen readers announce updates without interrupting the user.

### Key Entities *(feature involves display data only)*

- **LaunchConfig**: `{ targetDate: Date, isActive: boolean }` — sourced from `NEXT_PUBLIC_LAUNCH_DATE` and `NEXT_PUBLIC_COUNTDOWN_ACTIVE` env vars.
- **CountdownState**: `{ days: number, hours: number, minutes: number }` — local component state, updated every second. Seconds are computed internally for update timing but NOT stored in state (not displayed).

---

## State Management

### Local Component State

| State | Type | Initial Value | Description |
|-------|------|---------------|-------------|
| `countdown` | `{ days: number, hours: number, minutes: number } \| null` | `null` | `null` before client hydration; populated after first `useEffect` tick |
| `isHydrated` | `boolean` | `false` | Prevents SSR/CSR mismatch; set `true` on first `useEffect` |

### State Transitions

```
Server render       → countdown: null, isHydrated: false → render skeleton/placeholder digits
Client hydration    → countdown: null, isHydrated: false → useEffect fires
First tick (≤1s)    → countdown: { days, hours, minutes } → render real values
Every 1000ms        → countdown updated in-place
Countdown reaches 0 → clearInterval, redirect to "/"
```

### Error States

| Condition | Behavior |
|-----------|----------|
| `NEXT_PUBLIC_LAUNCH_DATE` missing or invalid | Show "00 DAYS / 00 HOURS / 00 MINUTES" frozen; log warning to console |
| `Date.parse()` returns `NaN` | Same as above |
| Negative delta (date in past) | Treat as zero — show all "00" and trigger redirect |

### Global State

None — this page has no global state requirements (no auth, no user data, no store).

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | No API calls required; countdown is computed client-side from env var | N/A |

> **Note**: If the launch date needs to be dynamic (admin-configurable), a future `GET /api/launch-config` endpoint could be added to return `{ launchDate: string }`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Countdown displays correct remaining time (verified against UTC target date) with ≤1 second drift.
- **SC-002**: Timer updates every second without visible jank or layout shift (CLS < 0.1).
- **SC-003**: Page renders correctly on all 3 breakpoints (mobile 375px, tablet 768px, desktop 1440px) — verified via visual regression or manual QA.
- **SC-004**: Lighthouse accessibility score ≥ 90 on the countdown page.
- **SC-005**: At countdown zero, redirect to `/` occurs within 1 second.

---

## Out of Scope

- Seconds display — the design shows only DAYS, HOURS, MINUTES (no seconds unit).
- User authentication on this page — it is a public holding page.
- Admin UI to configure the launch date — managed via environment variable only (in this version).
- Email/notification signup on the countdown page — not present in the design.
- Social sharing features.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — not required for this screen
- [ ] Database design completed (`.momorph/database.sql`) — not required for this screen
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`) — created 2026-04-07
- [ ] "Digital Numbers" font file available in `public/assets/countdown/fonts/`
- [ ] `NEXT_PUBLIC_LAUNCH_DATE` env var (UTC ISO string, e.g., `"2026-05-01T00:00:00Z"`) defined in `.env.example`
- [ ] `NEXT_PUBLIC_COUNTDOWN_ACTIVE` env var (`"true"` | `"false"`) defined in `.env.example`

---

## Notes

- The Figma design shows sample values: DAYS=00, HOURS=25, MINUTES=20 — these are placeholder display values only.
- The content is in Vietnamese: "Sự kiện sẽ bắt đầu sau" = "The event will start after".
- The unit labels (DAYS, HOURS, MINUTES) are in English uppercase — keep as-is per design.
- Seconds are NOT shown in the design — the timer only counts down to the nearest minute.
- The digit card glass effect (`opacity: 0.5` + `backdrop-filter: blur`) — implementation note: if the digit text needs to be fully opaque while the card background is semi-transparent, wrap the background and border in a pseudo-element or a separate `div`, and keep the text in a sibling element with `opacity: 1`.
- Related design-style file: [design-style.md](./design-style.md)
- Frame image: [assets/frame.url.txt](./assets/frame.url.txt)
