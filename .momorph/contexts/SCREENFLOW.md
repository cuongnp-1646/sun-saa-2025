# Screen Flow

## Screen Overview

This application is **Sun Annual Awards (SAA) 2025** — a kudos/recognition platform for Sun* employees.

| Screen | Screen ID | Description |
|--------|-----------|-------------|
| Login | GzbNeVGJHz | User login page with Google OAuth |
| Homepage SAA | i87tDx10uM | Main homepage after login |
| Sun* Kudos - Live board | MaZUn5xHXZ | Live leaderboard / kudos feed |
| Countdown - Prelaunch page | 8PJQswPZmU | Pre-launch countdown page |
| Viết Kudo | ihQ26W78P2 | Write/compose a Kudo message — **discovered** · APIs: `GET /api/users?search=`, `GET /api/hashtags`, `POST /api/kudos`, `POST /api/media/upload` · Nav→: Viết KUDO - Lỗi (`5c7PkAibyD`), View Kudo (`onDIohs2bS`) · [spec](screen_specs/viet_kudo.md) |
| Viết KUDO - Lỗi chưa điền đủ | 5c7PkAibyD | Kudo form validation error state |
| View Kudo | onDIohs2bS | View a single Kudo post |
| Gửi lời chúc Kudos (1) | RO7O6QOhfJ | Send Kudos greeting flow |
| Gửi lời chúc Kudos (2) | JsTvi8KVQA | Send Kudos greeting flow (alternate) |
| Profile bản thân | 3FoIx6ALVb | Own user profile page |
| Profile người khác | w4WUvsJ9KI | Other user's profile page |
| Tất cả thông báo | 6-1LRz3vqr | All notifications list |
| View thông báo | gWBVcaSVIf | Single notification detail view |
| Details | AyMaiSOBqz | Detail view |
| Award | TfCh7y1S-D | Award display screen |
| Hệ thống giải | zFYDgyj_pD | Award/prize system overview |
| Danh hiệu (variants) | DS7D7-HrIY, 0usTIbYmUm, L5eRr-5xla | Title/badge screens |
| Open secret box - chưa mở | J3-4YFIpMM | Unopened secret box |
| Open secret box - action bấm mở | p0qHd6DJ6A, K-LuEblC08 | Secret box opening action |
| Open secret box - Standby | 2i7DgydylV, cgeDZw-tDh, sACeeoE6Ge, iEhDBe3Id-, iJqdwTEiDj, AzMhNg8aqW, VsjjEDVgEx, P5b2MJQoW6 | Secret box standby states |
| Open Giftbox (variants) | A3J33jY-Wp, hCRbDKyaoT, _YLVd7Ij6e | Giftbox opening animations |
| Chúc mừng | SOzErYSp_S | Congratulations screen |
| Ẩn danh | p9vFVBE_tc | Anonymous post/action screen |
| Admin - Overview | 9ja9g9iJLW | Admin dashboard overview |
| Admin - Review content | MTExSUSdUn | Admin content review queue |
| Admin - Review content - Search | kO5qYafrMh | Admin content review with search |
| Admin - Setting | fTCVEC9aV_ | Admin settings page |
| Admin - Setting - add Campaign | cb7kD3-Xr6 | Admin: add campaign |
| Admin - Setting - add new Campaign | FVA7A5f8z8 | Admin: add new campaign form |
| Admin - Setting - Edit Campaign | htgRaDTO2f | Admin: edit campaign |
| Admin - User | -u1lKib0JL | Admin user management |
| Error page - 403 | T3e_iS9PCL | Forbidden error page |
| Error page - 404 | p0yJ89B-9_ | Not found error page |
| Màn Sửa bài viết - edit mode | 419VXmMy6I | Post edit mode |
| Thể lệ UPDATE | b1Filzi9i6 | Rules/terms updated screen |
| Tiêu chuẩn cộng đồng | Dpn7C89--r | Community standards page |
| Notification | D_jgDqvIc8 | Notification panel/overlay |
| Alert Overlay | ZUofoTelpc | Alert overlay dialog |
| Language Dropdown | IiLVGkACbt | Language selection dropdown |

### UI Components / Overlays (non-navigable screens)

| Component | Screen ID | Description |
|-----------|-----------|-------------|
| 1_Header | u-nF4z3tAC | Top navigation header |
| Dropdown-ngôn ngữ | hUyaaugye2 | Language selector dropdown |
| Dropdown-profile | z4sCl3_Qtk | User profile dropdown menu |
| Dropdown-profile Admin | 54rekaCHG1 | Admin profile dropdown menu |
| Dropdown Hashtag filter | JWpsISMAaM | Hashtag filter dropdown |
| Dropdown Phòng ban | WXK5AYB_rG | Department filter dropdown |
| Addlink Box | OyDLDuSGEa | Add link input box |
| Floating Action Button | _hphd32jN2, Sv7DFwBw1h | Floating action buttons |
| Hover Avatar info user | Bf5XiTE7AO | Avatar hover info card |

---

## Navigation Graph

### Login Page

Login (`GzbNeVGJHz`)
  ├─> "LOGIN With Google" button (B.3_Login) → Google OAuth flow → Homepage SAA (`i87tDx10uM`)
  └─> Language selector (A.2_Language) → Dropdown-ngôn ngữ overlay (`hUyaaugye2`) [on_click, stays on Login page]

### Pre-launch

Countdown - Prelaunch page (`8PJQswPZmU`)
  └─> (After countdown ends) → Login (`GzbNeVGJHz`)

### Main Application Flow (post-login)

Homepage SAA (`i87tDx10uM`)
  ├─> Logo click → /home (scroll to top)
  ├─> About SAA 2025 nav link → /home (About SAA 2025 section, same page scroll)
  ├─> Awards Information nav link → /awards
  ├─> Sun* Kudos nav link → /kudos
  ├─> Bell icon → Notification panel / Tất cả thông báo (`6-1LRz3vqr`)
  ├─> Language toggle VN/EN → Language Dropdown overlay (`IiLVGkACbt`)
  ├─> Avatar/profile menu → Dropdown-profile (`z4sCl3_Qtk`) [/profile, sign out, admin dashboard]
  ├─> ABOUT AWARDS button (B3) → /awards
  ├─> ABOUT KUDOS button (B3) → /kudos
  ├─> Award card "Chi tiết" (C2 grid) → /awards#{award-slug}
  ├─> Sun* Kudos "Chi tiết" button (D1) → /kudos (Sun* Kudos tab)
  ├─> Floating Widget Button (6) → opens floating action menu (send Kudos quick action) → Viết Kudo (`ihQ26W78P2`)
  ├─> Kudo feed item → View Kudo (`onDIohs2bS`)
  ├─> "Write Kudo" / compose action → Viết Kudo (`ihQ26W78P2`)
  ├─> "Send Kudos greeting" → Gửi lời chúc Kudos (`RO7O6QOhfJ`)
  ├─> Live board link → Sun* Kudos - Live board (`MaZUn5xHXZ`)
  ├─> Profile avatar → Profile bản thân (`3FoIx6ALVb`)
  ├─> Other user avatar/name → Profile người khác (`w4WUvsJ9KI`)
  └─> Language selector → Dropdown-ngôn ngữ overlay (`hUyaaugye2`)

Viết Kudo (`ihQ26W78P2`) — [spec](screen_specs/viet_kudo.md)
  ├─> H.1_Button "Hủy" → Close modal → previous screen (Homepage SAA / Kudos feed) [confidence: high]
  ├─> H.2_Button "Gửi" (valid form) → View Kudo (`onDIohs2bS`) / Homepage SAA (`i87tDx10uM`) [confidence: high]
  └─> H.2_Button "Gửi" (invalid/missing required fields) → Viết KUDO - Lỗi (`5c7PkAibyD`) [confidence: high]

View Kudo (`onDIohs2bS`)
  └─> Back → Homepage SAA (`i87tDx10uM`)

Tất cả thông báo (`6-1LRz3vqr`)
  └─> Notification item → View thông báo (`gWBVcaSVIf`)

Profile bản thân / Profile người khác (`3FoIx6ALVb` / `w4WUvsJ9KI`)
  ├─> Award/title items → Danh hiệu / Award screens
  └─> Back → Homepage SAA (`i87tDx10uM`)

### Secret Box / Gift Flow

Open secret box - chưa mở (`J3-4YFIpMM`)
  └─> Tap/click → Open secret box - action bấm mở → Open secret box - Standby → Open Giftbox → Chúc mừng (`SOzErYSp_S`)

### Admin Flow

Admin - Overview (`9ja9g9iJLW`)
  ├─> Review content → Admin - Review content (`MTExSUSdUn`)
  ├─> Settings → Admin - Setting (`fTCVEC9aV_`)
  └─> Users → Admin - User (`-u1lKib0JL`)

Admin - Review content (`MTExSUSdUn`)
  └─> Search → Admin - Review content - Search (`kO5qYafrMh`)

Admin - Setting (`fTCVEC9aV_`)
  ├─> Add Campaign → Admin - Setting - add Campaign (`cb7kD3-Xr6`)
  ├─> Add new Campaign → Admin - Setting - add new Campaign (`FVA7A5f8z8`)
  └─> Edit Campaign → Admin - Setting - Edit Campaign (`htgRaDTO2f`)

### Error Pages

Any protected route (unauthenticated/unauthorized) → Error page - 403 (`T3e_iS9PCL`)
Any unknown route → Error page - 404 (`p0yJ89B-9_`)

---

## Login Screen — Outgoing Navigation Edges

Screen: **Login** (`GzbNeVGJHz`, Figma frame `662:14387`)

| Element | ID | Trigger | Destination | Notes |
|---------|----|---------|-------------|-------|
| A.2_Language (Language selector button) | `I662:14391;186:1601` | on_click | Dropdown-ngôn ngữ (`hUyaaugye2`) | Opens language selection overlay; stays on Login page |
| B.3_Login (LOGIN With Google button) | `662:14425` | on_click | Google OAuth → Homepage SAA (`i87tDx10uM`) | Initiates Google authentication flow; on success navigates to main homepage; on processing, button is disabled with loading indicator |

### Login Screen Element Summary

| No | Element | Type | Description |
|----|---------|------|-------------|
| A | A_Header | INSTANCE | Top header with logo and language selector |
| A.1 | A.1_Logo | FRAME | Sun Annual Awards 2025 logo (non-interactive) |
| A.2 | A.2_Language | FRAME (button/toggle) | Language selector — opens Dropdown-ngôn ngữ on click |
| B | B_Bìa | FRAME | Hero section with key visual, title, description, and login button |
| B.1 | B.1_Key Visual | FRAME | Decorative background artwork and "ROOT FURTHER" title |
| B.2 | B.2_content | TEXT | Intro text: "Bắt đầu hành trình của bạn cùng SAA 2025." / "Đăng nhập để khám phá!" |
| B.3 | B.3_Login | FRAME (button) | "LOGIN With Google" CTA button — triggers Google OAuth |
| C | C_Keyvisual | GROUP | Decorative key visual group |
| D | D_Footer | INSTANCE | Footer displaying copyright "Bản quyền thuộc vè Sun* © 2025" (non-interactive) |

---

## Homepage SAA Screen — Outgoing Navigation Edges

Screen: **Homepage SAA** (`i87tDx10uM`, MoMorph frame `6382`, Figma frame `2167:9026`, File key `9ypp4enmFmdK3YAFJLIu6C`)
URL: `/` (or `/home`)

| Element | Section | Trigger | Destination | Notes |
|---------|---------|---------|-------------|-------|
| Logo | A1 Header | on_click | `/home` (scroll to top) | SAA 2025 logo in nav; reloads/scrolls to top of homepage |
| About SAA 2025 nav link | A1 Header | on_click | `/home` → About SAA 2025 section | Smooth scroll to the About SAA 2025 anchor on the same page |
| Awards Information nav link | A1 Header | on_click | `/awards` | Navigates to the Awards Information page |
| Sun* Kudos nav link | A1 Header | on_click | `/kudos` | Navigates to the Sun* Kudos page |
| Bell icon | A1 Header | on_click | Notification panel / Tất cả thông báo (`6-1LRz3vqr`) | Opens notifications panel overlay |
| Language toggle VN/EN | A1 Header | on_click | Language Dropdown overlay (`IiLVGkACbt`) | Opens language switcher dropdown; stays on current page |
| Avatar / profile menu | A1 Header | on_click | Dropdown-profile (`z4sCl3_Qtk`) | Opens profile dropdown with links to /profile, sign out, and admin dashboard |
| ABOUT AWARDS button | B3 CTA | on_click | `/awards` | Primary CTA; navigates to Awards Information page |
| ABOUT KUDOS button | B3 CTA | on_click | `/kudos` | Primary CTA; navigates to Sun* Kudos page |
| Top Talent card "Chi tiết" | C2 Awards grid | on_click | `/awards#top-talent` | Navigates to Awards page anchored to Top Talent section |
| Top Project card "Chi tiết" | C2 Awards grid | on_click | `/awards#top-project` | Navigates to Awards page anchored to Top Project section |
| Top Project Leader card "Chi tiết" | C2 Awards grid | on_click | `/awards#top-project-leader` | Navigates to Awards page anchored to Top Project Leader section |
| Best Manager card "Chi tiết" | C2 Awards grid | on_click | `/awards#best-manager` | Navigates to Awards page anchored to Best Manager section |
| Signature 2025 - Creator card "Chi tiết" | C2 Awards grid | on_click | `/awards#signature-2025-creator` | Navigates to Awards page anchored to Signature 2025 Creator section |
| MVP card "Chi tiết" | C2 Awards grid | on_click | `/awards#mvp` | Navigates to Awards page anchored to MVP section |
| Sun* Kudos "Chi tiết" button | D1 Kudos promo | on_click | `/kudos` (Sun* Kudos tab) | Navigates to Sun* Kudos tab/page |
| Floating Widget Button | 6 (pill, yellow bg) | on_click | Floating action menu | Opens quick action menu; primary action is send Kudos → Viết Kudo (`ihQ26W78P2`) |
| Footer nav links | 7 Footer | on_click | Various internal pages | Logo, nav links; copyright non-interactive |

### Homepage SAA Element Summary

| No | Element | Type | Description |
|----|---------|------|-------------|
| A1 | Header nav | INSTANCE | Top navigation bar with logo, nav links (About SAA 2025, Awards Information, Sun* Kudos), bell icon, VN/EN language toggle, avatar/profile menu |
| B1 | Countdown timer section | FRAME | "Coming soon" label with DAYS / HOURS / MINUTES digit display countdown |
| B2 | Event info block | FRAME | Event details: Thời gian 18h30, Địa điểm Nhà hát nghệ thuật quân đội, streaming note |
| B3 | CTA buttons | FRAME | Two primary CTA buttons: "ABOUT AWARDS" → /awards, "ABOUT KUDOS" → /kudos |
| B4 | "Root Further" content | TEXT | Descriptive paragraph for the Root Further theme |
| C1 | Awards section header | FRAME | Section title "Hệ thống giải thưởng" |
| C2 | Award cards grid | FRAME | Grid of award cards: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP — each with a "Chi tiết" link to /awards#{award-slug} |
| D1 | Sun* Kudos promo block | FRAME | Promotional block for Sun* Kudos with "Chi tiết" button → /kudos |
| 6 | Floating Widget Button | COMPONENT | Pill-shaped floating button (yellow bg, pen + SAA logo icons); opens quick action menu for sending Kudos |
| 7 | Footer | INSTANCE | Footer with logo, navigation links, and copyright notice (non-interactive copyright text) |

---

## Viết Kudo Screen — Outgoing Navigation Edges

Screen: **Viết Kudo** (`ihQ26W78P2`, Figma frame `520:11602`, File key `9ypp4enmFmdK3YAFJLIu6C`)
URL: Modal overlay (no dedicated route — triggered from Homepage SAA / Kudos feed)
Spec: [screen_specs/viet_kudo.md](screen_specs/viet_kudo.md)

| Element | ID | Trigger | Destination | Notes |
|---------|----|---------|-------------|-------|
| H.1_Button "Hủy" (Cancel) | `I520:11647;520:9906` | on_click | Close modal → previous screen (Homepage SAA / Kudos feed) | Discards all form data; no API call |
| H.2_Button "Gửi" (Send) — valid | `I520:11647;520:9907` | on_click (all required fields filled) | View Kudo (`onDIohs2bS`) / Homepage SAA (`i87tDx10uM`) | Submits kudo via `POST /api/kudos`; closes modal on success |
| H.2_Button "Gửi" (Send) — invalid | `I520:11647;520:9907` | on_click (missing required fields) | Viết KUDO - Lỗi (`5c7PkAibyD`) | Triggers validation error state |

### Viết Kudo Form Fields Summary

| Field | Label | Required | Validation |
|-------|-------|----------|------------|
| B_Chọn người nhận | Người nhận | Yes | Autocomplete select; min 1 |
| Frame 552 | Campaign/type | Yes | Must select one |
| D_text filed | Nội dung | Yes | Rich-text textarea; `@name` mention support |
| E_Frame 536 | Hashtag | Yes | Chip input; min 1, max 5 |
| F_Frame 537 | Image | No | File upload; max 5 images |
| G_Gửi ẩn danh | Gửi ẩn danh | No | Boolean checkbox |

### Viết Kudo Element Summary

| No | Element | Type | Description |
|----|---------|------|-------------|
| A | A_Title | TEXT | Modal header: "Gửi lời cám ơn và ghi nhận đến đồng đội" |
| B | B_Chọn người nhận | FRAME | Recipient search/autocomplete dropdown (required) |
| B.1 | B.1_Title | INSTANCE | Label "Người nhận *" |
| B.2 | B.2_Search | INSTANCE | Autocomplete search input with dropdown arrow |
| — | Frame 552 | FRAME | Campaign/award type selector (required) |
| C | C_Chức năng | FRAME | Rich-text toolbar: Bold, Italic, Strikethrough, Numbered list, Link, Quote |
| D | D_text filed | INSTANCE | Textarea body for kudo message |
| D.1 | D.1_Gợi ý | FRAME | Hint text: 'Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác' |
| E | E_Frame 536 | FRAME | Hashtag chip input (required, max 5) |
| F | F_Frame 537 | FRAME | Image upload section (optional, max 5 images) |
| G | G_Gửi ẩn danh | INSTANCE | Anonymous send checkbox toggle |
| H | H_Frame 538 | FRAME | Action footer |
| H.1 | H.1_Button | INSTANCE | "Hủy" cancel button — closes modal |
| H.2 | H.2_Button | INSTANCE | "Gửi" send button (primary, yellow) — submits kudo |

---

## API Endpoints Summary

### Predicted APIs from Viết Kudo Screen

| Method | Endpoint | Purpose | Screen |
|--------|----------|---------|--------|
| GET | /api/users?search={q} | Autocomplete recipient search | Viết Kudo |
| GET | /api/hashtags | Fetch available hashtags | Viết Kudo |
| GET | /api/campaigns | Fetch campaign/award types for selector | Viết Kudo |
| POST | /api/kudos | Submit kudo (recipient, content, hashtags, images, anonymous) | Viết Kudo |
| POST | /api/media/upload | Upload image attachment | Viết Kudo |

---

## Discovery Log

| Date | Screen | Action | Notes |
|------|--------|--------|-------|
| 2026-04-13 | Viết Kudo (`ihQ26W78P2`) | discovered | Node tree + image analyzed. Form modal with 6 fields (3 required). Rich-text editor. 3 outgoing nav edges. 5 predicted API endpoints. Spec created at `screen_specs/viet_kudo.md`. |
