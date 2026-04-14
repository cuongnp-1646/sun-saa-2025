# Feature Specification: Hệ Thống Giải Thưởng (Awards System)

**Frame ID**: `zFYDgyj_pD`
**Figma Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-08
**Status**: Draft

---

## Overview

The Awards System page (`/awards`) presents the complete catalog of Sun* Annual Awards 2025
prize categories to all users. Each category displays its award image, eligibility criteria,
quantity of prizes, and monetary value. The page also promotes the Sun* Kudos program at the
bottom.

**Platforms covered**: Desktop/PC (1440px canvas) and Mobile/SP (390px — iOS native layout).

Key behaviours:
- **PC**: Left-column sidebar navigation allows jumping to any award category via smooth scroll.
  Active category is highlighted with a gold underline.
- **SP**: A dropdown selector at the top replaces the sidebar; selecting an item scrolls to the
  corresponding award card.
- All data is **read-only static display** (no auth required to view this page).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse all award categories (Priority: P1)

A visitor lands on `/awards` and wants to scan every prize category to understand what SAA 2025
offers, without needing to scroll the whole page manually.

**Why this priority**: Core value of the page — all users need to discover the awards.

**Independent Test**: Render `/awards` without auth; verify all 6 award cards appear with correct
name, description, count, and value.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/awards`, **When** the page loads, **Then** 6 award category cards
   are visible: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 –
   Creator, MVP — each showing its image, title, description, count, and prize value.
2. **Given** the page is loaded on desktop, **When** the user scrolls, **Then** the left sidebar
   navigation follows the viewport (sticky) showing all 6 categories.
3. **Given** the page is loaded on mobile, **When** the user views the top of the content,
   **Then** a dropdown selector is shown listing all 6 categories.

---

### User Story 2 — Jump to a specific award (Priority: P2)

A user wants to navigate directly to a specific award category (e.g., "MVP") without manual
scrolling.

**Why this priority**: Navigation UX — improves discoverability and reduces scroll friction.

**Independent Test**: Click a sidebar/dropdown option; verify the viewport scrolls to the
matching award section and the clicked item becomes active.

**Acceptance Scenarios**:

1. **Given** the user is on desktop and sees the sidebar, **When** they click "MVP",
   **Then** the page smooth-scrolls to the MVP award card and the "MVP" nav item gains the
   active state (gold text + gold underline).
2. **Given** the user is on mobile and opens the dropdown, **When** they select "Best Manager",
   **Then** the dropdown closes, the Best Manager card scrolls into view, and the dropdown
   trigger shows "Best Manager".
3. **Given** a nav item is active (user has scrolled to that section), **When** the user
   scrolls past it into the next section, **Then** the next item becomes active automatically
   (scroll-spy).

---

### User Story 3 — Navigate to Sun* Kudos (Priority: P3)

A user wants to learn more about the Sun* Kudos program after seeing the promo block at the
bottom of the page.

**Why this priority**: Secondary CTA — promotes Kudos but not essential to the awards view.

**Independent Test**: Click "Chi tiết" button in Kudos block; verify navigation to `/kudos`.

**Acceptance Scenarios**:

1. **Given** the user has scrolled to the bottom of the awards page, **When** they click
   "Chi tiết", **Then** they are navigated to `/kudos`.
2. **Given** the user hovers over "Chi tiết", **Then** the button shows hover state (slight
   lift / gold glow).

---

### Edge Cases

- Award count / value strings must render exactly as in Figma (e.g. "7.000.000 VNĐ",
  "Cá nhân", "Tập thể"). No rounding or reformatting.
- If award image fails to load, a gold-glow placeholder box must still maintain the 336×336px
  (desktop) or full-width (mobile) size so layout does not collapse.
- The SP dropdown must close when the user taps outside it or presses Escape.
- On mobile, the bottom navigation bar must mark "Awards" tab as active.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| **Header** (shared) | Sticky top nav: logo, nav links, bell, language, avatar | — (shared global component) |
| **Keyvisual** (A_Keyvisual) | Full-bleed hero banner with artwork + "Hệ thống giải thưởng SAA 2025" title block | None — decorative |
| **Section Title** (A_Title) | "Sun* Annual Awards 2025" sub-label + divider + main heading in gold | None |
| **Sidebar Nav** (C_Menu list) — PC only | Vertical list of 6 award names; active item highlighted gold | Click → smooth scroll + active state; Hover → highlight |
| **Award Dropdown** (SP only) | Dropdown selector showing current award category | Tap → open/close; Select → scroll + close |
| **Award Card** (D.1–D.6) | Each card: award image (336×336px PC) + content block (title, description, count, value) | Static display |
| **Sun* Kudos Block** (D1_Sunkudos) | Promo block: heading, description, Kudos logo, "Chi tiết" CTA | Click "Chi tiết" → `/kudos` |
| **Bottom Nav Bar** — SP only | SAA 2025 / Awards (active) / Kudos / Profile | Tab navigation |
| **Footer** (shared) | Links + copyright | — (shared global component) |

### Navigation Flow

- From: Homepage (`/`) → "Award Information" nav link or "ABOUT AWARDS" CTA
- On page: Sidebar (PC) or dropdown (SP) → smooth scroll to card section
- To: `/kudos` via "Chi tiết" button in Kudos block

### Visual Requirements

- **Responsive breakpoints**:
  - Mobile (SP): < 768px — dropdown nav, stacked layout, bottom tab bar
  - Desktop (PC): ≥ 1024px — sidebar nav, side-by-side image + content layout
- **Animations/Transitions**:
  - Sidebar active state: instant highlight (no animation needed)
  - Dropdown open/close: 150ms ease opacity + slide
  - Smooth scroll to anchor: native CSS `scroll-behavior: smooth`
  - "Chi tiết" hover: `transition: box-shadow 150ms ease-out`
- **Accessibility**:
  - Sidebar nav: `<nav aria-label="Award categories">`, items as `<a href="#award-id">`
  - Dropdown: `role="combobox"`, `aria-expanded`, keyboard navigable
  - Award images: `alt="[Award name] award image"`
  - WCAG AA contrast for all text

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The awards page MUST display all 6 award categories with static content matching
  the Figma design.
- **FR-002**: On desktop, the sidebar nav MUST be sticky and highlight the currently visible
  award section via scroll-spy.
- **FR-003**: On mobile, a dropdown selector MUST replace the sidebar and allow navigation to
  any award category.
- **FR-004**: Clicking a sidebar item or selecting a dropdown option MUST smooth-scroll to the
  corresponding award card.
- **FR-005**: The "Chi tiết" button in the Kudos block MUST navigate to `/kudos`.
- **FR-006**: The page MUST be accessible without authentication (public route).
- **FR-007**: On mobile, the bottom navigation bar MUST show "Awards" as the active tab.

### Technical Requirements

- **TR-001**: The page MUST be a Next.js Server Component (`/awards`) rendering static HTML for
  SEO and performance.
- **TR-002**: Interactive components (sidebar scroll-spy, dropdown) MUST be isolated as Client
  Component islands.
- **TR-003**: Award data (name, count, value, description) MUST be defined as static typed
  constants — no API call required for this read-only page.
- **TR-004**: Award images MUST use Next.js `<Image>` with explicit `width`, `height`, and `alt`.
- **TR-005**: `/awards` MUST be added to `PUBLIC_ROUTES` in `src/middleware.ts`.

### Key Entities *(static data)*

- **AwardCategory**: `{ id, slug, name, description, count, countUnit, value, valueSuffix, imageSrc }`
  — 6 instances (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 –
  Creator, MVP).

---

## Award Data (Static)

| # | Name | Count | Unit | Value | Note |
|---|------|-------|------|-------|------|
| 1 | Top Talent | 10 | Cá nhân | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 2 | Top Project | 02 | Tập thể | 15.000.000 VNĐ | cho mỗi giải thưởng |
| 3 | Top Project Leader | 03 | Cá nhân | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 4 | Best Manager | 01 | Cá nhân | 10.000.000 VNĐ | cho mỗi giải thưởng |
| 5 | Signature 2025 – Creator | 01 | Cá nhân | 5.000.000 VNĐ | cho giải cá nhân / 8.000.000 VNĐ cho giải tập thể |
| 6 | MVP (Most Valuable Person) | 01 | Cá nhân | 15.000.000 VNĐ | cho giải cá nhân |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | No API needed; all data is static | — |

---

## Success Criteria *(mandatory)*

- **SC-001**: All 6 award categories render on `/awards` with correct data on both PC and SP.
- **SC-002**: Sidebar click (PC) / dropdown select (SP) smoothly scrolls to the correct award section.
- **SC-003**: Active nav item matches the award section currently in the viewport (scroll-spy).
- **SC-004**: "Chi tiết" in Kudos block navigates to `/kudos`.
- **SC-005**: Page is accessible without login; `/awards` is in `PUBLIC_ROUTES`.
- **SC-006**: All tests in `src/test/awards/` pass (unit + integration for static data and nav).

---

## Out of Scope

- Fetching award data from an API or database (data is static).
- Filtering or searching award categories.
- Admin editing of award information.
- Award candidate submission or voting from this page.
- Localization of award descriptions (VN content only for now).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`) — in progress
- [x] Award image assets exist in `public/assets/home/images/` (award-bg.png etc.)
- [x] Shared Header component exists (`src/components/shared/Header.tsx`)
- [x] `PUBLIC_ROUTES` pattern established in `src/middleware.ts`

---

## Notes

- The Figma PC frame (`313:8436`) is 1440×6410px. The awards content starts at approximately
  y=454px (after the hero keyvisual).
- Award images in Figma use a circular glow/podium graphic — assets should be pre-downloaded.
- The SP layout (`[iOS] Award_*` frames) shows a stacked layout with a dropdown at the top
  replacing the sidebar, and a bottom navigation bar.
- Design style details are in `design-style.md`.
