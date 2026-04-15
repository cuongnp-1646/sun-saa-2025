# Tasks: Sun* Kudos Live Board

**Frame**: `MaZUn5xHXZ-sun-kudos-live-board`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1–US9 per spec.md)
- **|**: Primary file affected

---

## Phase 1: Setup (Assets + Directory Structure)

**Purpose**: Discover and download Figma media assets using `list_media_items` → `get_media_files`, create directory scaffolding.

**Tool flow**:
1. `list_media_items(screenId)` — enumerate all media nodes in the frame
2. `get_media_files(screenId)` — bulk-download all media at once; save to `public/assets/kudos/`

**Key assets discovered in PC frame (MaZUn5xHXZ)**:

| Node ID | Name | Save as |
|---------|------|---------|
| `I2940:13432;2167:5141` | KV Background | `images/bg-kv.png` |
| `2940:13440` | Kudos logo (SAA) | `logos/saa-kudos.svg` |
| `I2940:13449;186:2759` | Pen icon (send kudos) | `icons/pencil.svg` |
| `I2940:13450;186:2759` | Search icon (hero) | `icons/search.svg` |
| `I2940:13459;186:2761` | Down/Chevron-down (filter) | `icons/chevron-down.svg` |
| `I2940:13470;186:1420` | Left/Chevron-left (carousel) | `icons/chevron-left.svg` |
| `I2940:13468;186:1420` | Right/Chevron-right (carousel) | `icons/chevron-right.svg` |
| `I3127:21871;256:5147` | Send/Arrow-sent icon | `icons/arrow-sent.svg` |
| `I3127:21871;256:5216;186:1441` | Link/Copy-link icon | `icons/copy-link.svg` |
| `I3127:21871;256:5171` | Heart icon | `icons/heart.svg` |
| `I2940:13497;186:1766` | Open Gift icon | `icons/gift-box.svg` |
| `I2940:14833;186:2759` | Search icon (all kudos) | `icons/search-kudos.svg` |

**Key assets discovered in SP frame (fO0Kt19sZZ)**:

| Node ID | Name | Save as |
|---------|------|---------|
| `6885:9060` | bg | `sp/bg.png` |
| `6885:9061` | Keyvisual BG | `sp/bg-kv.png` |
| `6885:9071` | logo | `sp/logo.svg` |
| `I6885:9083;28:2013` | icon (pencil/send) | `sp/icons/pencil.svg` |
| `6885:9097` | next (carousel) | `sp/icons/next.svg` |

- [x] T001 Create public/assets/kudos/ directory structure: images/, logos/, icons/, sp/, sp/icons/ | public/assets/kudos/
- [x] T002 [P] Call list_media_items(screenId: MaZUn5xHXZ) to enumerate all PC frame media nodes → verify asset list matches expected (KV bg, logo, icons) | public/assets/kudos/
- [x] T003 [P] Call list_media_items(screenId: fO0Kt19sZZ) to enumerate all SP frame media nodes → verify asset list | public/assets/kudos/sp/
- [x] T004 Call get_media_files(screenId: MaZUn5xHXZ) → bulk-download all PC media → save each file to public/assets/kudos/ under the path mapping table above | public/assets/kudos/
- [x] T005 Call get_media_files(screenId: fO0Kt19sZZ) → bulk-download all SP media → save each file to public/assets/kudos/sp/ under the path mapping table above | public/assets/kudos/sp/
- [x] T006 [P] Verify downloaded assets: check file sizes > 0, verify bg-kv.png and saa-kudos.svg exist; log any missing files | public/assets/kudos/

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Types, DB schema, CSS tokens, service skeleton — required by ALL user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T007 Create Supabase DB migration: tables kudos, kudos_hearts, hashtags, departments, secret_boxes, profiles (if absent) with RLS policies as defined in plan.md | supabase/migrations/
- [x] T008 [P] Create TypeScript interfaces (Kudos, Sunner, Hashtag, Department, PersonalStats, GiftRecipient, SpotlightNode) | src/types/kudos.ts
- [x] T009 [P] Add kudos CSS design tokens to :root block (--color-bg-card, --color-text-muted, --color-heart-active, --color-heart-inactive, --gradient-carousel-left, --gradient-carousel-right, --radius-card, --radius-pill, --border-card, kudos spacing vars) | src/app/globals.css
- [x] T010 Create service skeleton with stub functions (fetchHighlightKudos, fetchAllKudos, fetchPersonalStats, fetchTopGiftRecipients, fetchHashtags, fetchDepartments, fetchSpotlightData) | src/services/kudos.ts
- [x] T011 [P] Create src/components/kudos/ directory with index barrel and SectionTitle server component (subtitle + large title layout, Figma nodes 2940:13452 / 2940:14221) | src/components/kudos/SectionTitle.tsx
- [x] T012 [P] Create SunnerRow server component (avatar 32px circle + name + sub-text layout matching Figma D.3.2) | src/components/kudos/SunnerRow.tsx

### 🐛 Bug Fix — Dedicated `/kudos` page + public access (no login required)

**Bug 1 — Missing page route**: `src/app/kudos/page.tsx` does not exist. There is no route handler for `/kudos`, so navigating to it returns a 404.

**Bug 2 — Auth gate blocks the route**: `/kudos` is not in `PUBLIC_ROUTES`, so even after the page is created, unauthenticated users would be redirected to `/login`. Per spec: _"The page is publicly accessible but the send-kudos action requires authentication."_

These two bugs must be fixed together before any user story work can be validated.

- [x] T013 Create `src/app/kudos/` directory and a minimal `page.tsx` route: Server Component with `export const dynamic = 'force-dynamic'`, renders `<Header activeRoute="kudos" />`, a placeholder `<main>` with text "Kudos Live Board — loading…", and `<Footer />` — this makes the route exist and serve a 200 so middleware fix can be verified | src/app/kudos/page.tsx
- [x] T014 Add `/kudos` to `PUBLIC_ROUTES` set in middleware so unauthenticated users can visit `/kudos` without being redirected to `/login` | src/middleware.ts
- [x] T015 [P] Update kudos read API routes (GET /api/kudos, GET /api/kudos/highlights, GET /api/hashtags, GET /api/departments, GET /api/spotlight, GET /api/sunners/top-gifts) to not require auth — `hasHearted` defaults to `false` when no session; personal stats sidebar hidden when unauthenticated | src/services/kudos.ts
- [x] T016 [P] Update spec.md Acceptance Scenario 4 of US1 — change "redirected to /login" to "page loads normally; 'Ghi nhận' button prompts login when user is not authenticated" | .momorph/specs/MaZUn5xHXZ-sun-kudos-live-board/spec.md

**Checkpoint**: Foundation complete — `/kudos` exists and is publicly accessible. User story phases can begin.

---

## Phase 3: User Story 1 — View & Browse Kudos Live Feed (Priority: P1) 🎯 MVP

**Goal**: Authenticated user visits `/kudos` and sees all four sections with real data.

**Independent Test**: Navigate to `/kudos` as a logged-in user — page loads with KV hero, Highlight section, Spotlight placeholder, and All Kudos feed showing at least the initial server-fetched kudos.

### API Layer (US1)

- [x] T017 [US1] Implement GET /api/kudos route handler — query kudos table with optional hashtag/department filters, pagination (page, limit), return typed KudosListResponse | src/app/api/kudos/route.ts
- [x] T018 [US1] Implement GET /api/kudos/highlights route handler — query top 5 most-hearted kudos, join sender/receiver profiles, return typed array | src/app/api/kudos/highlights/route.ts
- [x] T019 [P] [US1] Implement GET /api/hashtags route handler — return all hashtags ordered by kudos_count desc | src/app/api/hashtags/route.ts
- [x] T020 [P] [US1] Implement GET /api/departments route handler — return all departments ordered by name | src/app/api/departments/route.ts
- [x] T021 [P] [US1] Implement GET /api/sunners/top-gifts route handler — return top 10 most recently rewarded sunners with gift description | src/app/api/sunners/top-gifts/route.ts
- [x] T022 [P] [US1] Implement GET /api/spotlight route handler — return all sunner nodes with kudosCount for network visualization | src/app/api/spotlight/route.ts
- [x] T023 [US1] Fill in service function implementations (fetchHighlightKudos, fetchAllKudos, fetchHashtags, fetchDepartments, fetchTopGiftRecipients, fetchSpotlightData) using Supabase server client | src/services/kudos.ts

### UI — Static Sections (US1)

- [x] T024 [P] [US1] Implement KudosHero server component: full-width 512px KV image (bg-kv.png) with gradient overlay (linear-gradient 25deg #00101A 14.74% → transparent 47.8%), hero title 'Hệ thống ghi nhận lời cảm ơn' (SVN-Gotham 57px #FFEA9E), SAA Kudos logo below title — Figma node 2940:13437 | src/components/kudos/KudosHero.tsx
- [x] T025 [P] [US1] Implement HighlightHeader server component: subtitle 'Sun* Annual Awards 2025' (14px) + title 'HIGHLIGHT KUDOS' (36px bold #FFEA9E) + filter placeholder slots — Figma node 2940:13452 | src/components/kudos/HighlightHeader.tsx
- [x] T026 [P] [US1] Implement KudoHighlightCard server-compatible component: sender info (avatar 40px circle border 1px #FFEA9E + name 16px 500 + sub 12px) → arrow-sent icon → receiver info, timestamp (HH:mm - MM/DD/YYYY, 12px muted), content (3-line max-clamp, 14px #FFF), hashtags row (12px #FFEA9E), heart count — Figma node 2940:13465 | src/components/kudos/KudoHighlightCard.tsx
- [x] T027 [P] [US1] Implement KudoPostCard server-compatible component: sender→receiver info, timestamp 'HH:mm - MM/DD/YYYY', content (5-line max clamp, 14px #FFF), image gallery slot, hashtags row (max 5), action bar slot (HeartButton + CopyLinkButton) — Figma node 3127:21871 | src/components/kudos/KudoPostCard.tsx

### UI — Client Feed (US1)

- [x] T028 [US1] Implement useKudosFeed hook: accepts initialKudos[], subscribes to Supabase Realtime channel 'kudos-feed' on INSERT, prepends new items, cleans up channel on unmount | src/hooks/useKudosFeed.ts
- [x] T029 [US1] Implement KudosFeed client component: uses useKudosFeed with initial data, renders list of KudoPostCard components, handles empty state ('No kudos yet — be the first to send one!') | src/components/kudos/KudosFeed.tsx
- [x] T030 [US1] Implement AllKudosSection server shell: renders SectionTitle ('ALL KUDOS') + accepts KudosFeed as children, 2-column layout with sidebar slot on desktop (gap 80px per design), stacks on mobile | src/components/kudos/AllKudosSection.tsx
- [x] T031 [US1] Implement HighlightSection server shell: wraps HighlightHeader + carousel slot + spotlight section, gap 40px dark bg — Figma node 2940:13451 | src/components/kudos/HighlightSection.tsx
- [x] T032 [US1] Implement KudosPage client shell: accepts all initial data as props, composes KudosHero → HighlightSection → AllKudosSection+Sidebar layout | src/components/kudos/KudosPage.tsx
- [x] T033 [US1] Replace the Phase 2 placeholder page.tsx with full implementation: force-dynamic, fetches all initial data server-side via service functions, renders Header (activeRoute="kudos") + KudosPage + Footer | src/app/kudos/page.tsx

### Tests (US1)

- [x] T034 [US1] Write integration test: unauthenticated user can view `/kudos` page (public route); all section headings render; send-kudos button prompts login when not authenticated | src/test/kudos/KudosPage.test.tsx
- [x] T035 [P] [US1] Write API test: GET /api/kudos returns 200 with array (no auth required); GET /api/kudos/highlights returns exactly 5 items sorted by heart_count desc | src/test/kudos/api/kudos.test.ts

**Checkpoint**: US1 complete — `/kudos` loads with live feed data. ✅ MVP shippable.

---

## Phase 4: User Story 2 — Send a Kudos (Priority: P1)

**Goal**: Logged-in user clicks the "Ghi nhận" input, fills the dialog, and submits a new kudos that appears in the feed.

**Independent Test**: Click the SendKudosInput → dialog opens → fill receiver + message → submit → POST /api/kudos called → new card visible in KudosFeed.

### API Layer (US2)

- [x] T036 [US2] Implement POST /api/kudos route handler: validate body (receiverId required, message max 500 chars), check auth session, insert into kudos table, return created kudos with sender/receiver profiles | src/app/api/kudos/route.ts
- [x] T037 [US2] Add Zod validation schema for create-kudos request body (receiverId: UUID, message: string min 1 max 500, hashtags: string[] optional, imageUrls: string[] optional) | src/app/api/kudos/route.ts

### UI (US2)

- [x] T038 [US2] Implement SendKudosInput client component: pill-shaped input (100px border-radius, border 1px #FFEA9E, bg rgba(255,234,158,0.1)), pencil icon (public/assets/kudos/icons/pencil.svg) left, placeholder 'Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?', click opens SendKudosDialog — Figma node 2940:13449 | src/components/kudos/SendKudosInput.tsx
- [x] T039 [US2] Implement SendKudosDialog client component: modal overlay, receiver search field (GET /api/sunners), message textarea (max 500 chars with counter), optional hashtag selector, submit button (POST /api/kudos), close on success or cancel — Figma send dialog spec | src/components/kudos/SendKudosDialog.tsx
- [x] T040 [US2] Wire SendKudosInput into KudosHero so it renders below hero content | src/components/kudos/KudosHero.tsx

### Tests (US2)

- [x] T041 [US2] Write component test: SendKudosDialog opens on SendKudosInput click; submit with empty message shows validation error; successful submit calls POST /api/kudos and closes dialog | src/test/kudos/SendKudosDialog.test.tsx

**Checkpoint**: US1 + US2 complete — users can view and send kudos.

---

## Phase 5: User Story 3 — Highlight Carousel Navigation (Priority: P2)

**Goal**: Users navigate through the 5 highlighted kudos using Prev/Next buttons and the slide indicator.

**Independent Test**: Load the kudos page → Highlight section shows carousel → click Next → slide advances and indicator shows "2/5" → click Next 3 more times → Next button disabled → click Back → re-enabled.

### UI (US3)

- [x] T042 [US3] Implement SlideIndicator client component: displays "X/5" text (16px #FFEA9E), chevron-left + chevron-right buttons (24px icons from public/assets/kudos/icons/, disabled state rgba(153,153,153,1) when at first/last slide), pill border (0.5px solid #FFEA9E, 48px radius) — Figma node 2940:13471 | src/components/kudos/SlideIndicator.tsx
- [x] T043 [US3] Implement KudosCarousel client component: manages activeIndex state (0-based, max 4), renders 5 KudoHighlightCard instances, CSS transform translateX animation (300ms ease-in-out), left/right gradient fade overlays (--gradient-carousel-left/right), passes activeIndex/total to SlideIndicator — Figma node 2940:13461 | src/components/kudos/KudosCarousel.tsx
- [x] T044 [US3] Wire KudosCarousel (with highlights data) and SlideIndicator into HighlightSection | src/components/kudos/HighlightSection.tsx

### Tests (US3)

- [x] T045 [US3] Write component test: carousel renders 5 cards; Back disabled on slide 1; Next disabled on slide 5; clicking Next updates indicator text from "1/5" to "2/5" | src/test/kudos/KudosCarousel.test.tsx

**Checkpoint**: US1–US3 complete — browsable highlight carousel functional.

---

## Phase 6: User Story 4 — Filter Kudos by Hashtag or Department (Priority: P2)

**Goal**: Users select a hashtag or department from the dropdowns and the feed filters accordingly.

**Independent Test**: Click Hashtag dropdown → select a hashtag → feed re-fetches with hashtag param → only matching kudos shown → clear filter → full list restored.

### Hooks & State (US4)

- [x] T046 [US4] Implement useKudosFilters hook: manages selectedHashtag and selectedDepartment state, provides setter functions and resetFilters helper | src/hooks/useKudosFilters.ts

### UI (US4)

- [x] T047 [US4] Implement KudosFilters client component: two filter dropdowns (Hashtag + Phòng ban), each with open/close state, renders option list from props, emits onHashtagChange/onDepartmentChange — Figma nodes 2940:13459 + 2940:13460 | src/components/kudos/KudosFilters.tsx
- [x] T048 [US4] Wire KudosFilters into HighlightHeader (passing hashtags/departments data), connect filter changes to KudosFeed refetch via KudosPage state | src/components/kudos/HighlightHeader.tsx
- [x] T049 [US4] Update KudosFeed to accept activeHashtag/activeDepartment props and re-fetch GET /api/kudos with filter params when they change | src/components/kudos/KudosFeed.tsx

### Tests (US4)

- [x] T050 [US4] Write component test: KudosFilters dropdown opens on click; selecting option calls onHashtagChange; selecting same option again clears filter | src/test/kudos/KudosFilters.test.tsx

**Checkpoint**: US1–US4 complete — filtered browsing works.

---

## Phase 7: User Story 5 & 6 — Heart a Kudos + Copy Link (Priority: P2)

**Goal**: Users heart/un-heart kudos with optimistic UI; copy kudos URL to clipboard with toast confirmation.

**Independent Test (US5)**: Click heart on any card → icon turns red, count increments immediately (optimistic) → API POST /api/kudos/:id/heart succeeds → state persists. Click again → reverts.

**Independent Test (US6)**: Click "Copy Link" → navigator.clipboard.writeText called with correct URL → toast "Link copied — ready to share!" appears.

### API Layer (US5)

- [x] T051 [US5] Implement POST /api/kudos/[id]/heart route handler: check auth session, toggle row in kudos_hearts (insert if absent / delete if present), update heart_count on kudos row, return { hearted: boolean, heartCount: number } | src/app/api/kudos/[id]/heart/route.ts

### Hooks & UI (US5)

- [x] T052 [US5] Implement useHeartToggle hook: manages hearted/count state, optimistic update on toggle(), reverts on API error, disables button during pending state | src/hooks/useHeartToggle.ts
- [x] T053 [US5] Implement HeartButton client component: heart icon (20px from public/assets/kudos/icons/heart.svg, grey inactive rgba(153,153,153,1) / red active rgba(212,39,29,1)), count label (14px), uses useHeartToggle, disables during API call, accessible aria-label — Figma node I3127:21871;256:5175 | src/components/kudos/HeartButton.tsx
- [x] T054 [P] [US5] Wire HeartButton into KudoPostCard action bar and KudoHighlightCard action area | src/components/kudos/KudoPostCard.tsx

### UI (US6)

- [x] T055 [P] [US6] Implement CopyLinkButton client component: calls navigator.clipboard.writeText with kudos permalink (/kudos/${id}), shows inline toast "Link copied — ready to share!" for 2s, uses copy-link icon (public/assets/kudos/icons/copy-link.svg) — Figma node I3127:21871;256:5216 | src/components/kudos/CopyLinkButton.tsx
- [x] T056 [P] [US6] Wire CopyLinkButton into KudoPostCard action bar alongside HeartButton | src/components/kudos/KudoPostCard.tsx

### UI (Images Gallery)

- [x] T057 [P] [US5] Implement KudosImageGallery client component: renders up to 5 thumbnail images (square 80px, radius 8px, gap 8px), click opens full-size view, hidden when imageUrls empty — Figma node I3127:21871;256:5176 | src/components/kudos/KudosImageGallery.tsx
- [x] T058 [P] [US5] Wire KudosImageGallery into KudoPostCard | src/components/kudos/KudoPostCard.tsx

### Tests (US5 & US6)

- [x] T059 [US5] Write component test: HeartButton inactive state grey; click → optimistic red + count+1; API error → reverts to original; pending state disables button | src/test/kudos/HeartButton.test.tsx
- [x] T060 [P] [US5] Write API test: POST /api/kudos/:id/heart toggles heart for authenticated user; returns 401 for unauthenticated request | src/test/kudos/api/kudos-heart.test.ts

**Checkpoint**: US1–US6 complete — full read + interaction experience.

---

## Phase 8: User Story 7 — Personal Statistics & Open Secret Box (Priority: P2)

**Goal**: Logged-in user sees their personal stats sidebar (kudos sent/received, hearts, secret boxes) and can open Secret Box if available.

**Independent Test**: Load `/kudos` as authenticated user → sidebar shows correct stat values → if unopened boxes > 0, click "Mở quà" → POST /api/secret-boxes/open called → dialog appears.

### API Layer (US7)

- [x] T061 [US7] Implement GET /api/stats/personal route handler: requires auth, query kudos received/sent counts, heart count, opened/unopened secret_boxes for current user, return PersonalStats type | src/app/api/stats/personal/route.ts
- [x] T062 [P] [US7] Implement GET /api/stats/personal Supabase query in service layer | src/services/kudos.ts
- [x] T063 [P] [US7] Implement POST /api/secret-boxes/open route handler: requires auth, mark one unopened secret_box as opened, return reward content | src/app/api/secret-boxes/open/route.ts

### UI (US7)

- [x] T064 [US7] Implement PersonalStatsBlock server component: 5 stat rows (label + value, flex space-between, 14px), divider (1px #2E3940 separator), x2 Fire Bonus badge on hearts row when heartsX2Active is true (bg #FFF3C6, radius 12px, 12px 700 #00101A), padding 24px, bg #00070C, border 1px #998C5F, radius 16px — Figma node 2940:13489 | src/components/kudos/PersonalStatsBlock.tsx
- [x] T065 [P] [US7] Implement OpenGiftButton client component: full-width pill button (bg #FFEA9E, text #00101A, 48px height, radius 100px), gift icon (public/assets/kudos/icons/gift-box.svg), disabled when unopenedSecretBoxes === 0, calls POST /api/secret-boxes/open on click, shows result dialog — Figma node 2940:13497 | src/components/kudos/OpenGiftButton.tsx
- [x] T066 [P] [US7] Implement TopGiftRecipients server component: section title '10 SUNNER NHẬN QUÀ MỚI NHẤT' (14px 700 #FFEA9E), list of up to 10 SunnerRow items — Figma node 2940:13510 | src/components/kudos/TopGiftRecipients.tsx
- [x] T067 [US7] Implement KudosSidebar server shell: composes PersonalStatsBlock + OpenGiftButton + TopGiftRecipients, fixed min-width on desktop, hidden/collapsible on mobile | src/components/kudos/KudosSidebar.tsx
- [x] T068 [US7] Wire KudosSidebar into AllKudosSection 2-column layout (feed takes ~65% width, sidebar ~35%, gap 80px as per design-style.md) | src/components/kudos/AllKudosSection.tsx

### Tests (US7)

- [x] T069 [US7] Write component test: PersonalStatsBlock renders 5 stat rows with correct values; x2 badge visible when heartsX2Active=true; hidden when false | src/test/kudos/PersonalStatsBlock.test.tsx
- [x] T070 [P] [US7] Write API test: GET /api/stats/personal returns 401 for unauthenticated; returns correct PersonalStats shape for authenticated user | src/test/kudos/api/stats-personal.test.ts

**Checkpoint**: US1–US7 complete — full board with stats sidebar.

---

## Phase 9: User Story 8 — Spotlight Board Exploration (Priority: P3)

**Goal**: Users explore the Spotlight Board showing kudos relationships as an interactive network. Ships as CSS word cloud MVP; D3 upgrade deferred.

**Independent Test**: Load `/kudos` → Spotlight Board section visible → total kudos count label shows → sunner names rendered as word cloud → search input highlights matching name.

### UI (US8) — CSS MVP Approach

- [x] T071 [US8] Implement SpotlightBoard client component (CSS word cloud MVP): renders SpotlightNode array as absolutely-positioned spans in relative container, font-size proportional to kudosCount (min 12px max 48px), total kudos count displayed as large background watermark text (opacity 0.1 #FFEA9E, 139.78px Montserrat 700), search icon from public/assets/kudos/icons/search-kudos.svg, pill search input (40px height) highlights matching node with #FFEA9E border, lazy-loaded via next/dynamic ssr:false — Figma node 2940:14174 | src/components/kudos/SpotlightBoard.tsx
- [x] T072 [US8] Implement SpotlightSection server shell: SectionTitle 'SPOTLIGHT BOARD', renders total kudos count text, wraps SpotlightBoard in 1157px container (responsive: 100% on mobile), bg #00070C, border 1px #998C5F, radius 16px — Figma node 2940:14174 | src/components/kudos/SpotlightSection.tsx
- [x] T073 [US8] Wire SpotlightSection into HighlightSection below the carousel area, passing spotlightNodes + totalKudosCount from page SSR data | src/components/kudos/HighlightSection.tsx

**Checkpoint**: US1–US8 complete.

---

## Phase 10: User Story 9 — View Profile from Kudos Card (Priority: P3)

**Goal**: Clicking sender or receiver avatar/name navigates to their profile page.

**Independent Test**: Click sender avatar on any kudos card → navigate to /profile/{senderId}; hover over sender name → profile preview tooltip shown.

### UI (US9)

- [x] T074 [US9] Add clickable avatar and name links to KudoHighlightCard: wrap avatar + name in Next.js Link to ROUTES.profile + `/${id}`, add hover underline style on name — Figma nodes B.3.1/B.3.2/B.3.5/B.3.6 | src/components/kudos/KudoHighlightCard.tsx
- [x] T075 [US9] Add clickable avatar and name links to KudoPostCard sender/receiver info blocks, same pattern as above — Figma nodes C.3.1/C.3.3 | src/components/kudos/KudoPostCard.tsx
- [x] T076 [P] [US9] Add /profile/:id to ROUTES config if not already present | src/config/navigation.ts
- [x] T077 [US9] Add clickable avatar + name to SunnerRow (D.3 Top Gift Recipients list), links to profile page | src/components/kudos/SunnerRow.tsx

**Checkpoint**: All user stories US1–US9 complete.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout, accessibility, loading/empty/error states, final QA.

- [ ] T078 Add responsive mobile layout to KudosPage: sidebar hidden on mobile (< lg), stacks below feed; hero reduced height (320px on mobile); carousel single-card view; padding 16px on mobile per design-style.md SP breakpoint (390px) | src/components/kudos/KudosPage.tsx
- [ ] T079 [P] Add skeleton loading states: KudosFeed shows 3 skeleton cards while loading; PersonalStatsBlock shows placeholder rows during initial SSR hydration | src/components/kudos/KudosFeed.tsx
- [ ] T080 [P] Add error boundary and retry: KudosFeed shows "Failed to load kudos. Retry?" on fetch error with retry button; PersonalStatsBlock shows "–" on stat fetch error | src/components/kudos/KudosFeed.tsx
- [ ] T081 [P] Add ARIA labels to all interactive elements: carousel buttons (aria-label="Previous kudos" / "Next kudos"), HeartButton (aria-label="Like this kudos" / "Unlike this kudos"), filter dropdowns (aria-label="Filter by hashtag"), SendKudosInput (aria-label="Send a kudos") | src/components/kudos/
- [ ] T082 [P] Add keyboard navigation for carousel: Left/Right arrow keys advance/retreat when carousel is focused | src/components/kudos/KudosCarousel.tsx
- [ ] T083 [P] Verify KudoPostCard content truncation: message max 5 lines (line-clamp-5 Tailwind); hashtags max 1 row (truncate with "..."); timestamp format HH:mm - MM/DD/YYYY | src/components/kudos/KudoPostCard.tsx
- [ ] T084 Run `yarn tsc --noEmit` — resolve all TypeScript strict-mode errors | —
- [ ] T085 Run `yarn lint` — resolve all ESLint errors | —
- [ ] T086 Run `yarn test` — ensure all tests pass (target: ≥80% coverage on core components) | —
- [ ] T087 [P] Visual check at 390px (SP/iOS), 768px (tablet), 1440px (PC desktop) breakpoints against Figma design — use Playwright or browser DevTools | —

---

## Phase 12: Logic Review & DB Connection (2026-04-14)

**Purpose**: Verify implementation logic against Figma design MaZUn5xHXZ and fix bugs found when connecting real API routes to the Supabase database.

**Triggered by**: User request — design check + DB connection task.

### Bugs found & fixed

- [x] T088 [BUG] Review Figma design (screenId: MaZUn5xHXZ, fileKey: 9ypp4enmFmdK3YAFJLIu6C) against current service layer, API routes, migration, and middleware to identify logic gaps | —
- [x] T089 [BUG] Fix `fetchHighlightKudos`: was ordering by non-existent column `kudos_hearts_count`. Add `heart_count integer` column to `kudos` table with backfill + trigger `on_kudos_heart_change` to maintain it. Update query to `.order("heart_count", …)` | supabase/migrations/20260414000000_fix_kudos_heart_count_and_anon_rls.sql + src/services/kudos.ts
- [x] T090 [BUG] Fix RLS: all read policies were `to authenticated` only. Unauthenticated visitors (anon Supabase role) of the public `/kudos` page received empty data. Add `to anon` SELECT policies for `kudos`, `kudos_hearts`, `kudos_hashtags`, `hashtags`, `departments`, `profiles` | supabase/migrations/20260414000000_fix_kudos_heart_count_and_anon_rls.sql
- [x] T091 [BUG] Fix middleware: `/kudos` was NOT added to `PUBLIC_ROUTES` (T014 was marked done but implementation was missing). Unauthenticated users were being redirected to `/login` | src/middleware.ts
- [x] T092 [BUG] Fix `fetchTopGiftRecipients`: queried `opened = false` which showed only people who had NOT opened their gift. Remove the filter so all recently-awarded sunners appear ordered by `created_at` desc | src/services/kudos.ts
- [x] T093 [BUG] Fix `fetchPersonalStats` hearts count: the nested join filter `kudos!inner(receiver_id)` on `kudos_hearts` was unreliable. Replace with a direct sum of `kudos.heart_count` for all kudos received by the user | src/services/kudos.ts
- [x] T094 [BUG] Fix `page.tsx` mock fallback: `useMock = USE_MOCK || highlightKudosLive.length === 0` auto-fell back to mock data when DB returned empty (masking real RLS/connection errors). Removed the auto-fallback — mock is only used when `NEXT_PUBLIC_USE_MOCK_DATA=true` | src/app/kudos/page.tsx

---

## Phase 13: Highlight UI Bugs (2026-04-14)

**Purpose**: Fix 4 UI/UX bugs identified by visual review against Figma design MaZUn5xHXZ.

**Triggered by**: User request — highlight wrong colors, slider not centered, write kudos action broken, missing sunner profile search.

### Bugs found & fixed

- [x] T095 [BUG] Fix Highlight card active-state styling: active slide card must use `border: 4px solid #FFEA9E` (--border-primary-thick token) to stand out; non-active cards use `border: 1px solid rgba(153,153,153,0.3)` (dimmed). Pass `isActive` prop from KudosCarousel to KudoHighlightCard | src/components/kudos/KudoHighlightCard.tsx + src/components/kudos/KudosCarousel.tsx
- [x] T096 [BUG] Fix carousel slider centering: current `translateX(calc(50% - 170px - ...))` uses 50% of the TRACK element width, not the parent container → cards appear off-center. Fix with ResizeObserver on the overflow container to measure actual width and compute correct pixel offset | src/components/kudos/KudosCarousel.tsx
- [x] T097 [BUG] Fix Write Kudos action: (a) wire `onSuccess` in KudosPage so dialog closes after submit; (b) fix hero layout — two pill inputs side by side (SendKudosInput flex-1 + SunnerProfileSearch 280px) per Figma, with `z-index: 20` on the hero overlay so the inputs are always clickable | src/components/kudos/KudosPage.tsx + src/components/kudos/SendKudosInput.tsx
- [x] T098 [BUG] Add missing SunnerProfileSearch component in hero area (right of SendKudosInput, Figma node I2940:13450;186:2759): pill input "Tìm kiếm profile Sunner", debounced /api/sunners?q= search, dropdown with avatar+name+department results, click → navigate to /profile/{id} | src/components/kudos/SunnerProfileSearch.tsx + src/components/kudos/KudosPage.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)       → No dependencies. Start immediately.
Phase 2 (Foundation)  → Can start after T001 (directory). BLOCKS all US phases.
Phase 3 (US1 MVP)     → Requires Phase 2. First deliverable.
Phase 4 (US2)         → Requires Phase 2 (POST API needs DB).
Phase 5 (US3)         → Requires Phase 3 (KudoHighlightCard from US1).
Phase 6 (US4)         → Requires Phase 3 (KudosFeed) + Phase 5 (HighlightHeader slot).
Phase 7 (US5+US6)     → Requires Phase 3 (KudoPostCard action bar).
Phase 8 (US7)         → Requires Phase 2 (DB) + Phase 3 (AllKudosSection sidebar slot).
Phase 9 (US8)         → Requires Phase 3 (SpotlightSection wiring).
Phase 10 (US9)        → Requires Phase 3 (KudoPostCard/KudoHighlightCard components).
Phase 11 (Polish)     → Requires all desired US phases complete.
```

### Parallel Opportunities

- **Phase 1**: T002 + T003 run in parallel (two different screen IDs); T004 + T005 run in parallel after T002/T003
- **Phase 2**: T008 (types) + T009 (CSS) + T011 (SectionTitle) + T012 (SunnerRow) + T015 (API public) + T016 (spec fix) run in parallel; T007 (DB migration) runs in parallel with all; T013 (page) → T014 (middleware) must run sequentially (page must exist before middleware can be verified)
- **Phase 3**: T016–T021 (API routes) run in parallel; T023–T026 (UI static components) run in parallel with API work
- **Phase 7**: HeartButton (T051–T053) + CopyLinkButton (T054–T055) + KudosImageGallery (T056–T057) fully parallel
- **Phase 8**: T060–T062 (API) parallel; T063–T065 (UI) parallel

### Critical Path (MVP — minimum to ship US1)

```
T001 → T007 → T008 → T009 → T010 → T013 → T014 → T022 → T027 → T028 → T029 → T030 → T031 → T032
(dir)  (DB)  (types)(CSS)(svc stubs)(page)(middleware)(svc impl)(hook)(feed)(sections)(page full)
```
T016–T021 (API routes) + T023–T026 (UI components) can run in parallel alongside T022 and T027.

---

## Implementation Strategy

### MVP First (US1 only — ~31 tasks)

1. Complete Phase 1 (assets — 6 tasks) + Phase 2 (foundation — 6 tasks)
2. Complete Phase 3 (US1 — feed page with SSR + realtime)
3. **STOP and VALIDATE**: `yarn build` passes, page loads at `/kudos`, feed shows data
4. Deploy or demo MVP

### Asset Download Note

Phase 1 uses the two-tool flow:
- **`list_media_items(screenId)`** — enumerate what's in the frame (idempotent, safe to re-run)
- **`get_media_files(screenId)`** — bulk download all at once (replaces the broken per-node `get_media_file`)

If `get_media_files` returns partial results, re-run for the missing screenId only.

### Incremental Delivery

| Milestone | Phases | Stories Delivered |
|-----------|--------|-------------------|
| MVP | 1 + 2 + 3 | US1: View & browse feed |
| Sprint 2 | + 4 + 5 | US2: Send kudos; US3: Carousel |
| Sprint 3 | + 6 + 7 | US4: Filters; US5: Hearts; US6: Copy link |
| Sprint 4 | + 8 + 9 + 10 | US7: Stats; US8: Spotlight; US9: Profile nav |
| Sprint 5 | + 11 | Polish + responsive + a11y |

---

## Task Summary

| Phase | Tasks | Story | Parallelizable |
|-------|-------|-------|---------------|
| Phase 1: Setup | T001–T006 | — | 4/6 parallel |
| Phase 2: Foundation + Bug Fix | T007–T016 | — | 6/10 parallel |
| Phase 3: US1 Feed | T017–T035 | US1 | 12/19 parallel |
| Phase 4: US2 Send | T036–T041 | US2 | 0/6 parallel |
| Phase 5: US3 Carousel | T042–T045 | US3 | 0/4 parallel |
| Phase 6: US4 Filters | T046–T050 | US4 | 0/5 parallel |
| Phase 7: US5+US6 | T051–T060 | US5/US6 | 7/10 parallel |
| Phase 8: US7 Stats | T061–T070 | US7 | 5/10 parallel |
| Phase 9: US8 Spotlight | T071–T073 | US8 | 0/3 parallel |
| Phase 10: US9 Profile | T074–T077 | US9 | 1/4 parallel |
| Phase 11: Polish | T078–T087 | — | 7/11 parallel |
| Phase 12: Logic Review & DB Connection | T088–T093 | — | 4/6 parallel |
| **Total** | **87 tasks** | — | **~43 parallelizable** |

## Phase 13: Bug Fix — UI Design Alignment (2026-04-15)

**Purpose**: Fix visual mismatch between current implementation and Figma design (screen MaZUn5xHXZ).

**Triggered by**: User report — Highlight slider cards and All Kudos cards not matching design. Attached screenshot confirmed cards should use light cream background with dark text.

### Bugs found & fixed

- [x] T095 [BUG] Fix KudoHighlightCard background: was dark `#00070C` (design-style.md was incorrect). Figma shows light cream `#FFF3C6` (`--color-primary-soft`). Changed card background to `#FFF3C6` for both active and inactive states | src/components/kudos/KudoHighlightCard.tsx
- [x] T096 [BUG] Fix KudoHighlightCard text colors: all text was using light colors (gold, white) designed for dark background. Updated name → `#00101A`, message → `#1A1209`, timestamp → `rgba(80,60,30,0.7)`, arrow icon filter → dark | src/components/kudos/KudoHighlightCard.tsx
- [x] T097 [BUG] Fix KudoHighlightCard category label: was displayed at top of card with gold border. Figma shows it centered below timestamp with no border, plain dark text | src/components/kudos/KudoHighlightCard.tsx
- [x] T098 [BUG] Fix KudoHighlightCard hashtag color: `#FFEA9E` gold invisible on light background. Changed to `#CC4422` warm orange-red | src/components/kudos/KudoHighlightCard.tsx
- [x] T099 [BUG] Fix KudoHighlightCard heart count: was showing raw number (e.g. "1000"). Changed to `toLocaleString("vi-VN")` for proper thousand-separator format (e.g. "1.000") | src/components/kudos/KudoHighlightCard.tsx
- [x] T100 [BUG] Fix KudoPostCard — same background, text color, category placement, hashtag color, and heart count format issues as Highlight card | src/components/kudos/KudoPostCard.tsx
- [x] T101 [BUG] Fix HeartButton count display: was `{count}` raw number. Changed to `{count.toLocaleString("vi-VN")}` and updated inactive color to warm dark for light-background legibility | src/components/kudos/HeartButton.tsx
- [x] T102 [BUG] Fix CopyLinkButton on light background: icon was unfiltered (white SVG invisible). Added `brightness(0) opacity(0.6)` filter. Updated "Copy Link" text color to `rgba(80,60,30,0.7)` | src/components/kudos/CopyLinkButton.tsx
