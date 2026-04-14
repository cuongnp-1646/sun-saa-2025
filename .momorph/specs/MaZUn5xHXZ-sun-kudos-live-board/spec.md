# Feature Specification: Sun* Kudos Live Board

**Frame ID**: `MaZUn5xHXZ` (PC) / `fO0Kt19sZZ` (SP/iOS)
**Frame Name**: `Sun* Kudos - Live board` / `[iOS] Sun*Kudos`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

The **Sun* Kudos Live Board** is the main authenticated page of the SAA 2025 Kudos system. It serves as a real-time recognition feed where Sunners (Sun* employees) can:

- Send appreciation messages ("kudos") to colleagues
- Browse highlighted (most-hearted) kudos in a carousel
- Explore a visual Spotlight network board showing kudos relationships
- View the full All Kudos feed with filtering capability
- Check their personal kudos statistics and open Secret Box rewards
- See the 10 most recently rewarded Sunners

The page is publicly accessible but the send-kudos action requires authentication. Route: `/kudos`.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View & Browse Kudos Live Feed (Priority: P1)

A logged-in Sunner visits `/kudos` and sees the full live board: the hero banner, highlight carousel, spotlight board, and all-kudos feed. They can scroll through all sections and see real-time data.

**Why this priority**: This is the core read experience. Without a working feed, no other feature has context. Must be stable before all other stories.

**Independent Test**: Navigate to `/kudos` as a logged-in user and verify all sections load with data.

**Acceptance Scenarios**:

1. **Given** the user is logged in, **When** they visit `/kudos`, **Then** the page loads with KV hero banner, Highlight Kudos section, Spotlight Board, and All Kudos feed all visible.
2. **Given** the user is on the kudos page, **When** data loads successfully, **Then** the Highlight Kudos carousel shows up to 5 top-hearted kudos cards with sender, receiver, content, hashtags, and heart count.
3. **Given** the user is on the kudos page, **When** the feed loads, **Then** All Kudos section shows recent kudos in chronological order with all card fields populated.
4. **Given** the user is not authenticated, **When** they visit `/kudos`, **Then** they are redirected to `/login`.

---

### User Story 2 - Send a Kudos (Priority: P1)

A logged-in Sunner clicks the "Ghi nhận" button/input field and sends a kudos message to a colleague.

**Why this priority**: The primary write action. Without the ability to send kudos, the board has no content.

**Independent Test**: Click the "Ghi nhận" input, fill out the dialog, and submit.

**Acceptance Scenarios**:

1. **Given** the user is on the kudos page, **When** they click the "Ghi nhận" input field (Node: 2940:13449 / 6885:9083), **Then** a dialog/modal opens to compose a kudos.
2. **Given** the send-kudos dialog is open, **When** the user fills in receiver, message, and optional hashtags, **Then** they can submit the kudos.
3. **Given** the kudos is submitted successfully, **Then** the new kudos appears in the All Kudos feed and the dialog closes.
4. **Given** the send-kudos dialog is open, **When** the user clicks outside or cancels, **Then** the dialog closes without creating a kudos.

---

### User Story 3 - Highlight Kudos Carousel Navigation (Priority: P2)

A Sunner navigates through the 5 highlighted kudos in the carousel using Previous/Next buttons or the slide indicator.

**Why this priority**: Core carousel UX. Important for surfacing top content but does not block the basic read experience.

**Independent Test**: Open the kudos page and use carousel navigation buttons.

**Acceptance Scenarios**:

1. **Given** the Highlight Kudos section loads, **When** the user views it, **Then** the first card is active and the Back button (B.2.1 / B.5.1) is disabled.
2. **Given** the user is on slide 1, **When** they click the Next button (B.2.2 / B.5.3), **Then** the carousel advances to slide 2 and the slide indicator updates to "2/5".
3. **Given** the user is on slide 5, **When** viewing, **Then** the Next button is disabled.
4. **Given** the user is on slide 5, **When** they click the Back button, **Then** the carousel moves to slide 4.

---

### User Story 4 - Filter Kudos by Hashtag or Department (Priority: P2)

A Sunner filters the Highlight Kudos section by selecting a hashtag or department from the dropdown filters.

**Why this priority**: Enhances discoverability. The board is still usable without filtering.

**Independent Test**: Click the Hashtag or Department filter dropdown and select an option.

**Acceptance Scenarios**:

1. **Given** the Highlight Kudos header is visible, **When** the user clicks the Hashtag dropdown (B.1.1 / 2940:13459), **Then** a list of available hashtags loads from the API.
2. **Given** the user selects a hashtag, **Then** the carousel and All Kudos feed filter to show only kudos with that hashtag.
3. **Given** the user clicks the Department dropdown (B.1.2 / 2940:13460), **Then** a list of departments loads from the API.
4. **Given** the user selects a department, **Then** only kudos involving members of that department are shown.
5. **Given** a filter is active, **When** the user clears it, **Then** the full unfiltered list is restored.

---

### User Story 5 - Heart / Like a Kudos (Priority: P2)

A Sunner taps/clicks the heart button on a kudos card to express appreciation.

**Why this priority**: Social engagement feature. Important for ranking highlight kudos but does not block core read.

**Independent Test**: Click the heart icon on any kudos card.

**Acceptance Scenarios**:

1. **Given** a kudos card is visible, **When** the user clicks the heart icon (C.4.1 / I3127:21871;256:5175), **Then** the icon changes from grey to red and the count increments by 1.
2. **Given** the user has already hearted a kudos, **When** they click the heart again, **Then** the heart reverts to grey and the count decrements by 1.
3. **Given** the user is not authenticated, **When** they click the heart, **Then** they are prompted to log in.

---

### User Story 6 - Copy Kudos Link (Priority: P2)

A Sunner copies the direct link to a kudos post to share externally.

**Why this priority**: Sharing feature, nice-to-have for engagement.

**Independent Test**: Click the Copy Link button on a kudos card.

**Acceptance Scenarios**:

1. **Given** a kudos card is visible, **When** the user clicks "Copy Link" (C.4.2), **Then** the kudos URL is copied to the clipboard.
2. **Given** the link is copied, **Then** a toast notification appears: "Link copied — ready to share!".

---

### User Story 7 - Personal Statistics & Open Secret Box (Priority: P2)

A Sunner views their personal kudos stats in the sidebar (PC) or stats section (SP) and opens their Secret Box if they have unopened ones.

**Why this priority**: Gamification mechanic that drives engagement. Stats require authentication context.

**Independent Test**: Log in and view the stats sidebar; click "Mở quà" if secret boxes are available.

**Acceptance Scenarios**:

1. **Given** the user is logged in, **When** viewing the kudos page, **Then** the personal stats block (D.1) shows: Kudos received, Kudos sent, Hearts received, Opened Secret Boxes, Unopened Secret Boxes.
2. **Given** the user has unopened Secret Boxes, **When** they click "Mở quà" (D.1.8), **Then** a Secret Box opening dialog appears.
3. **Given** the x2 Fire Bonus Badge is active (D.1.4 / Sunner S: 6885:9239), **Then** the hearts count row displays the x2 multiplier badge.

---

### User Story 8 - Spotlight Board Exploration (Priority: P3)

A Sunner explores the interactive Spotlight Board which visualizes kudos relationships as a network/bubble chart.

**Why this priority**: Visually engaging but supplementary to the main feed.

**Independent Test**: Load the kudos page and interact with the Spotlight Board canvas.

**Acceptance Scenarios**:

1. **Given** the Spotlight Board loads (B.7), **When** the user views it, **Then** a network/bubble chart of Sunner name nodes is displayed with the total kudos count (B.7.1).
2. **Given** the Spotlight Board is visible, **When** the user types in the search field (B.7.3), **Then** the matching Sunner node is highlighted in the chart.
3. **Given** the user clicks the Pan/Zoom control (B.7.2), **Then** the chart toggles between pan and zoom interaction modes.

---

### User Story 9 - View Profile from Kudos Card (Priority: P3)

A Sunner clicks on a sender's or receiver's avatar/name on a kudos card to view their profile.

**Why this priority**: Nice-to-have discovery feature.

**Independent Test**: Click an avatar or name on any kudos card.

**Acceptance Scenarios**:

1. **Given** a kudos card is displayed, **When** the user clicks the sender's avatar or name (B.3.1 / C.3.1), **Then** they are navigated to the sender's profile page (`/profile/{id}`).
2. **Given** a kudos card is displayed, **When** the user hovers over the sender's name, **Then** a profile preview tooltip appears.
3. **Given** a kudos card is displayed, **When** the user clicks the receiver's avatar or name (B.3.5 / C.3.3), **Then** they are navigated to the receiver's profile page.

---

### Edge Cases

- What happens when there are no kudos to display? → Show an empty state message in the carousel and feed.
- What happens when the API fails to load kudos? → Show an error state with a retry button.
- What happens if the user has 0 Secret Boxes? → The "Mở quà" button is disabled or hidden.
- What happens if kudos content exceeds 3 lines (Highlight) or 5 lines (All Kudos)? → Truncate with "..." ellipsis.
- What happens if a kudos has more than 5 hashtags? → Show first 5, truncate with "...".
- What happens if a kudos has more than 5 attached images? → Show first 5 thumbnails, truncate.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID (PC) | Node ID (SP) | Description | Interactions |
|-----------|-------------|-------------|-------------|--------------|
| KV Hero Banner | 2940:13437 | 6885:9066 | Full-width hero with title 'Hệ thống ghi nhận lời cảm ơn' and SAA 2025 KUDOS logo | Readonly |
| Send Kudos Input (Button ghi nhận) | 2940:13449 | 6885:9083 | Pill-shaped input field with pencil icon; placeholder text | Click → open send dialog |
| Highlight Section | 2940:13451 | 6885:9084 | Container for top-hearted kudos | Scroll |
| Highlight Header | 2940:13452 | 6885:9085 | Title 'HIGHLIGHT KUDOS' + subtitle + 2 filter dropdowns | Dropdown click |
| Hashtag Filter | 2940:13459 | — | Dropdown to filter by hashtag | Click → open dropdown |
| Department Filter | 2940:13460 | — | Dropdown to filter by department | Click → open dropdown |
| Highlight Carousel | 2940:13461–13463 | 6885:9090 | Horizontal carousel of 5 top-hearted kudos cards | Slide navigation |
| KUDO Highlight Card | 2940:13465 | 6885:9091 | Card with sender info, receiver info, content (3-line), hashtags, hearts | Heart, avatar click |
| Carousel Back Button | 2940:13470 | — | Previous slide button (disabled on slide 1) | Click |
| Carousel Next Button | 2940:13468 | — | Next slide button (disabled on slide 5) | Click |
| Slide Indicator | 2940:13471 | 6885:9098 | Pagination control showing "2/5" | Click arrows |
| Spotlight Board Header | 2940:13476 | 6885:9100 | Section header 'SPOTLIGHT BOARD' | Readonly |
| Spotlight Board | 2940:14174 | 6885:9101 | Interactive network/bubble chart of Sunner names | Pan, zoom, search |
| Spotlight Kudos Count | 3007:17482 | 6885:9219 | Large text showing total kudos count (e.g., '388 KUDOS') | Readonly |
| Spotlight Pan/Zoom | 3007:17479 | 6885:9217 | Toggle button for pan/zoom mode | Click |
| Spotlight Search | 2940:14833 | 6885:9216 | Search input to find a Sunner in the board | Type, Enter |
| All Kudos Header | 2940:14221 | 6885:9221 | Title 'ALL KUDOS' + subtitle | Readonly |
| All Kudos Feed | 2940:13482 | 6885:9220 | Scrollable list of kudos post cards | Scroll |
| KUDO Post Card | 3127:21871 | 6885:9263–9265 | Full kudos card: sender, receiver, content (5-line), images, hashtags, hearts, copy link | Heart, copy, click sender/receiver |
| Heart Button | I3127:21871;256:5175 | — | Toggle heart with count. Grey = not hearted, Red = hearted | Click to toggle |
| Copy Link Button | I3127:21871;256:5216 | — | Copy kudos URL to clipboard | Click |
| Attached Images Gallery | I3127:21871;256:5176 | — | Up to 5 thumbnail images; click to view full | Click |
| Personal Stats Block (PC sidebar) | 2940:13489 | 6885:9223 | 5 stat rows + divider + secret boxes count | Readonly |
| Open Gift Button | 2940:13497 | — | 'Mở quà' CTA button | Click → secret box dialog |
| Top 10 Gift Recipients | 2940:13510 | 6885:9255 | List of 10 most recently rewarded Sunners with avatar + name + gift description | Click → profile |

### Navigation Flow

- **From**: Homepage SAA (`/`) via "About Kudos" CTA; also direct URL
- **From**: Awards System (`/awards`) via Kudos block
- **To**: `/profile/{id}` — on sender/receiver avatar or name click
- **To**: `/kudos/{id}` — on kudos card content click (detail view)
- **To**: Send Kudos dialog (modal) — on "Ghi nhận" input click
- **To**: Secret Box dialog (modal) — on "Mở quà" button click
- **To**: `/login` — if unauthenticated user attempts a write action

### Visual Requirements

See [design-style.md](./design-style.md) for complete visual specs.

- **Responsive breakpoints**: Mobile (≥320px), Tablet (≥768px), Desktop (≥1024px / 1440px design width)
- **Layout**: PC uses a 2-column layout for the All Kudos + Stats sidebar. SP uses single-column.
- **Animations/Transitions**: Carousel slide animation, heart icon toggle animation, toast fade-in/out
- **Accessibility**: WCAG 2.1 AA — all interactive elements labeled, keyboard navigation for carousel and filters

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the Highlight Kudos carousel with the top 5 most-hearted kudos, sorted by heart count descending.
- **FR-002**: System MUST display the All Kudos feed in reverse chronological order (newest first).
- **FR-003**: Users MUST be able to filter kudos by hashtag and/or department; filters are cumulative.
- **FR-004**: System MUST allow authenticated users to heart/un-heart any kudos; the count updates optimistically.
- **FR-005**: System MUST allow authenticated users to send a kudos via the send dialog opened from the "Ghi nhận" input.
- **FR-006**: System MUST display personal stats (kudos received, sent, hearts received, opened/unopened Secret Boxes) for the authenticated user.
- **FR-007**: System MUST allow authenticated users with unopened Secret Boxes to open them via the "Mở quà" button.
- **FR-008**: System MUST display the Spotlight Board showing all Sunner names as interactive nodes with the total kudos count.
- **FR-009**: System MUST truncate kudos content at 3 lines in Highlight cards and 5 lines in All Kudos cards, with "..." overflow.
- **FR-010**: System MUST copy the kudos URL to clipboard and show a toast confirmation when "Copy Link" is clicked.
- **FR-011**: Carousel Back button MUST be disabled on slide 1; Next button MUST be disabled on slide 5 (last).
- **FR-012**: System MUST navigate to `/profile/{id}` when clicking sender or receiver avatar/name on any kudos card.

### Technical Requirements

- **TR-001**: Kudos feed MUST support real-time updates or auto-refresh (polling or WebSocket) so new kudos appear without page reload.
- **TR-002**: Authentication MUST use Supabase Auth via `@supabase/ssr`; unauthenticated write actions redirect to `/login`.
- **TR-003**: Heart toggle MUST use optimistic updates with server reconciliation to ensure responsive UX.
- **TR-004**: Spotlight Board visualization MUST be rendered using an SVG/Canvas library; the pan/zoom interaction MUST be smooth.
- **TR-005**: All API calls MUST be type-safe using TypeScript; no `any` types in service layer.

### Key Entities *(if feature involves data)*

- **Kudos**: `{ id, senderId, receiverId, message, hashtags[], imageUrls[], heartCount, createdAt }`
- **User/Sunner**: `{ id, name, department, starCount, title, avatarUrl }`
- **Hashtag**: `{ id, name, kudosCount }`
- **Department**: `{ id, name }`
- **SecretBox**: `{ id, userId, isOpened, reward, openedAt }`
- **PersonalStats**: `{ kudosReceived, kudosSent, heartsReceived, openedBoxes, unopenedBoxes }`

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/kudos` | GET | Fetch All Kudos feed (paginated, filterable by hashtag/department) | New |
| `/api/kudos/highlights` | GET | Fetch top 5 most-hearted kudos for the Highlight carousel | New |
| `/api/kudos` | POST | Create a new kudos (authenticated) | New |
| `/api/kudos/:id/heart` | POST | Toggle heart on a kudos (authenticated) | New |
| `/api/kudos/:id` | GET | Fetch single kudos detail (for copy link / permalink) | New |
| `/api/stats/personal` | GET | Fetch personal statistics for the logged-in user | New |
| `/api/sunners/top-gifts` | GET | Fetch top 10 most recently rewarded Sunners | New |
| `/api/spotlight` | GET | Fetch spotlight network data (Sunner nodes + connections) | New |
| `/api/hashtags` | GET | Fetch available hashtag list for filter dropdown | New |
| `/api/departments` | GET | Fetch department list for filter dropdown | New |
| `/api/secret-boxes/open` | POST | Open a Secret Box (authenticated) | New |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Kudos page loads in < 3 seconds on a 4G connection (LCP < 3s).
- **SC-002**: The send-kudos flow completes in ≤ 3 user interactions (click input → fill form → submit).
- **SC-003**: Heart toggle responds within 200ms (optimistic update) with server sync within 2 seconds.
- **SC-004**: All Kudos feed scrolls smoothly at 60fps on modern mobile devices.
- **SC-005**: 100% of kudos cards are accessible via keyboard navigation and have proper ARIA labels.

---

## Out of Scope

- Detailed `/kudos/{id}` kudos detail page (separate spec needed).
- `/profile/{id}` user profile page (separate spec needed).
- Secret Box opening animation/game mechanic (separate spec needed).
- Send Kudos dialog full specification (separate spec needed; this spec covers the trigger only).
- Admin moderation of kudos content.
- Notification system for received kudos.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [ ] Send Kudos dialog spec created

---

## Notes

- The page has both authenticated and non-authenticated states; unauthenticated users can view the board but cannot send kudos, heart, or open Secret Boxes.
- The design uses a dark navy theme (`#00101A` background) consistent with the SAA 2025 branding.
- The Spotlight Board is a complex interactive canvas — implementation may require a dedicated visualization library (e.g., D3.js or similar).
- The x2 Fire Bonus multiplier badge on hearts count indicates a time-limited bonus period; the backend should provide a flag to drive this display.
- SP (iOS) layout matches the PC content structure but uses a single-column, mobile-optimized layout with swipeable carousels. Screen ID: `fO0Kt19sZZ`.
