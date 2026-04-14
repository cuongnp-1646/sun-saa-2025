# Design Style: Sun* Kudos Live Board

**Frame ID**: `MaZUn5xHXZ` (PC) / `fO0Kt19sZZ` (SP/iOS)
**Frame Name**: `Sun* Kudos - Live board` / `[iOS] Sun*Kudos`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2940:13431
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex / RGBA Value | Opacity | Usage |
|------------|-----------------|---------|-------|
| `--color-bg-page` | `#00101A` / `rgba(0, 16, 26, 1)` | 100% | Main page background |
| `--color-bg-card` | `#00070C` / `rgba(0, 7, 12, 1)` | 100% | Card / container-2 background |
| `--color-bg-header` | `rgba(16, 20, 23, 0.8)` | 80% | Sticky navigation header |
| `--color-bg-sidebar-hover` | `rgba(255, 234, 158, 0.1)` | 10% | Secondary button / sidebar hover |
| `--color-primary` | `#FFEA9E` / `rgba(255, 234, 158, 1)` | 100% | Primary text, borders, highlights, CTA accent |
| `--color-primary-hover` | `#FFF8E1` / `rgba(255, 248, 225, 1)` | 100% | Primary button hover background |
| `--color-primary-bg-hover` | `rgba(255, 234, 158, 0.4)` | 40% | Secondary button hover state |
| `--color-primary-soft` | `#FFF3C6` / `rgba(255, 243, 198, 1)` | 100% | Soft accent (badge, secondary surfaces) |
| `--color-text-primary` | `#FFEA9E` | 100% | Primary text color (headings, labels) |
| `--color-text-secondary` | `#FFFFFF` | 100% | Secondary text, body content |
| `--color-text-muted` | `rgba(219, 209, 193, 1)` | 100% | Muted/tertiary text (hints, captions) |
| `--color-divider` | `#2E3940` | 100% | Horizontal divider lines |
| `--color-border` | `#998C5F` | 100% | Standard border color |
| `--color-border-primary` | `#FFEA9E` | 100% | Emphasized border (focused elements) |
| `--color-heart-active` | `rgba(212, 39, 29, 1)` | 100% | Heart icon in liked/active state |
| `--color-heart-inactive` | `rgba(153, 153, 153, 1)` | 100% | Heart icon in default/inactive state |
| `--color-error` | `rgba(241, 118, 118, 1)` | 100% | Error states |
| `--color-overlay-gradient-left` | `linear-gradient(90deg, #00101A 50%, rgba(255,255,255,0))` | — | Left fade gradient (carousel) |
| `--color-overlay-gradient-right` | `linear-gradient(270deg, #00101A 50%, rgba(255,255,255,0))` | — | Right fade gradient (carousel) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-hero-title` | SVN-Gotham | 57px | 700 | auto | — | Hero section main title |
| `--text-section-title` | Montserrat | 36px | 700 | auto | — | Section headings (HIGHLIGHT KUDOS, ALL KUDOS) |
| `--text-heading-1` | Montserrat | 32px | 700 | auto | — | Large headings |
| `--text-heading-2` | Montserrat | 28px | 700 | auto | — | Sub-headings |
| `--text-heading-3` | Montserrat Alternates | 24px | 700 | auto | — | Card headings |
| `--text-title` | Montserrat | 22px | 700 | auto | — | Card titles, section labels |
| `--text-body-lg` | Montserrat | 20px | 400 | auto | — | Large body text |
| `--text-body` | Montserrat | 16px | 400/500 | 24px | — | Default body text, nav items |
| `--text-body-sm` | Montserrat | 14px | 400 | auto | — | Small body text, stat labels |
| `--text-caption` | Montserrat | 12px | 400 | auto | — | Captions, timestamps, small tags |
| `--text-spotlight-count` | Montserrat | 139.78px | 700 | auto | — | Spotlight board total kudos count (very large) |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-xs` | 4px | Icon-text gap, tight gaps |
| `--spacing-sm` | 8px | Small element gaps |
| `--spacing-md` | 16px | Standard gap between elements |
| `--spacing-lg` | 24px | Section element gaps |
| `--spacing-xl` | 40px | Section spacing |
| `--spacing-2xl` | 64px | Large section separation |
| `--spacing-3xl` | 80px | Between major sections |
| `--spacing-4xl` | 96px | Top padding for full sections |
| `--spacing-5xl` | 120px | Hero section gap |
| `--page-padding-x` | 144px | Horizontal page padding (PC, 1440px width) |
| `--page-padding-y` | 96px–120px | Vertical page padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-xs` | 4px | Small tags, nav items |
| `--radius-sm` | 12px | Small cards, chips |
| `--radius-md` | 16px | Buttons, input fields |
| `--radius-lg` | 48px | Large pill buttons |
| `--radius-xl` | 64px | Extra-large pills |
| `--radius-full` | 100px | Circle elements (avatars) |
| `--border-default` | `1px solid #998C5F` | Default border |
| `--border-primary` | `1px solid #FFEA9E` | Emphasized/active border |
| `--border-primary-thick` | `4px solid #FFEA9E` | Highlighted border |
| `--border-primary-half` | `0.5px solid #FFEA9E` | Subtle primary border |
| `--border-divider-top` | `1px solid #2E3940` | Section divider (top) |
| `--border-divider-bottom` | `1px solid #2E3940` | Section divider (bottom) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-card` | `0 4px 16px rgba(0, 0, 0, 0.3)` | Kudos cards |
| `--shadow-header` | `0 2px 8px rgba(0, 0, 0, 0.5)` | Sticky header |

---

## Layout Specifications

### Page Container (PC)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Design width |
| background | `#00101A` | Dark navy |
| padding-x | 144px | Left/right page margins |
| padding-top | 96px | Top padding for content area |
| padding-bottom | 120px | Bottom padding |

### Navigation Header

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Full width |
| height | 80px | Fixed height |
| padding | `12px 144px` | Horizontal padding |
| background | `rgba(16, 20, 23, 0.8)` | Translucent dark |
| position | sticky / fixed | Stays at top on scroll |
| display | flex | Row layout |
| justify-content | space-between | Logo+nav left, actions right |
| gap | 238px | Between nav groups |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| gap | 40px | Between main sections |
| align-items | stretch | Full width |

### Layout Structure (ASCII) — PC 1440px

```
┌──────────────────────────────────────────────────────────────────────────┐
│  STICKY HEADER (1440x80, bg: rgba(16,20,23,0.8), px: 144px)              │
│  ┌────────┐  ┌──── NAV LINKS (gap:24px) ────┐     ┌─── ACTIONS ───┐     │
│  │  LOGO  │  │ Home | Awards | Kudos | ...  │     │ Lang | Notif  │     │
│  └────────┘  └──────────────────────────────┘     └───────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  A. KV HERO (1440x512, full-width KV image + gradient overlay)           │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  "Hệ thống ghi nhận lời cảm ơn"  (hero title, 57px SVN-Gotham)  │    │
│  │  [SAA 2025 KUDOS logo]                                           │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  A.1 BUTTON GHI NHẬN (pill input, pencil icon, 1152px wide)     │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  B. HIGHLIGHT SECTION (1440px, bg: #00101A, gap: 40px)                   │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  B.1 HEADER (px: 144px)                                          │    │
│  │  "Sun* Annual Awards 2025" (subtitle)  "HIGHLIGHT KUDOS" (h1)   │    │
│  │  [Hashtag ▼] [Phòng ban ▼]                                       │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  B.2 CAROUSEL (5 cards, horizontal scroll, gradient fade edges)  │    │
│  │  ◀  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ ▶ │    │
│  │     │  KUDO   │ │  KUDO   │ │  KUDO   │ │  KUDO   │ │ KUDO  │    │    │
│  │     │  CARD   │ │  CARD   │ │  CARD   │ │  CARD   │ │ CARD  │    │    │
│  │     └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘    │    │
│  │  B.5 SLIDE INDICATOR: ◀  2/5  ▶                                  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  B.6 SPOTLIGHT BOARD HEADER (px: 144px)                                  │
│  "Sun* Annual Awards 2025" / "SPOTLIGHT BOARD"                           │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  B.7 SPOTLIGHT BOARD (1157x548)                                  │    │
│  │  [388 KUDOS] (very large text)  [🔍 Tìm kiếm]  [Pan/Zoom]       │    │
│  │  ┌─────────────────────────────────────────────────────────────┐ │    │
│  │  │  Interactive bubble/network chart (Sunner name nodes)       │ │    │
│  │  └─────────────────────────────────────────────────────────────┘ │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  C+D. ALL KUDOS + SIDEBAR (1440px, 2-column layout, px: 144px, gap: 80px)│
│                                                                          │
│  C.1 HEADER (full-width)                                                 │
│  "Sun* Annual Awards 2025" / "ALL KUDOS"                                 │
│                                                                          │
│  ┌─────────────────────────────────┐ ┌──────────────────────────────┐   │
│  │  C.2 KUDOS FEED (flex-col)      │ │  D. SIDEBAR                  │   │
│  │                                 │ │  ┌──────────────────────────┐ │   │
│  │  ┌─────────────────────────┐    │ │  │ D.1 Personal Stats       │ │   │
│  │  │ KUDO POST CARD          │    │ │  │ Kudos nhận: 25           │ │   │
│  │  │ [sender] → [receiver]   │    │ │  │ Kudos gửi: 25            │ │   │
│  │  │ 10:00 - 10/30/2025      │    │ │  │ Tim nhận: 25  [x2🔥]     │ │   │
│  │  │ Message content (5-ln)  │    │ │  │ ─────────────────────── │ │   │
│  │  │ [📷 img] [📷 img]       │    │ │  │ Box đã mở: 25            │ │   │
│  │  │ #Tag1 #Tag2 #Tag3       │    │ │  │ Box chưa mở: 25          │ │   │
│  │  │ ❤ 10  [Copy Link]      │    │ │  │ [  Mở quà  ]             │ │   │
│  │  └─────────────────────────┘    │ │  └──────────────────────────┘ │   │
│  │  ┌─────────────────────────┐    │ │  ┌──────────────────────────┐ │   │
│  │  │ KUDO POST CARD ...      │    │ │  │ D.3 TOP 10 NHẬN QUÀ      │ │   │
│  │  └─────────────────────────┘    │ │  │ [●] Huỳnh Dương Xuân     │ │   │
│  │                                 │ │  │ [●] Sunner Name          │ │   │
│  └─────────────────────────────────┘ │  │ ...                      │ │   │
│                                      │  └──────────────────────────┘ │   │
│                                      └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  FOOTER (px: 90px, py: 40px)                                             │
│  "Bản quyền thuộc về Sun* © 2025" (16px, #FFF, weight: 700)             │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Navigation Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13433` | — |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | `12px 144px` | `padding: 12px 144px` |
| background | `rgba(16, 20, 23, 0.8)` | `background-color: rgba(16,20,23,0.8)` |
| backdrop-filter | blur | `backdrop-filter: blur(8px)` |
| position | sticky | `position: sticky; top: 0; z-index: 50` |
| display | flex row | `display: flex; flex-direction: row` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| gap | 238px | `gap: 238px` |

---

### A. KV Hero Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13437` (PC) / `6885:9066` (SP) | — |
| width | 1440px (PC) / 100% (SP) | `width: 100%` |
| height | 512px | `height: 512px` |
| background | KV image + gradient overlay | `background: url(...) cover; overlay: linear-gradient(25deg, #00101A 14.74%, transparent 47.8%)` |
| display | flex column | `display: flex; flex-direction: column` |
| align-items | center | `align-items: center` |
| padding | `96px 0 120px` | — |

---

### A.1 Send Kudos Button (Button ghi nhận)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13449` (PC) / `6885:9083` (SP) / `6891:21267` (SP alt) | — |
| width | ~1152px (PC) / 100% (SP) | — |
| height | 56px | `height: 56px` |
| border-radius | 100px | `border-radius: 100px` (pill shape) |
| border | `1px solid #FFEA9E` | `border: 1px solid var(--color-primary)` |
| background | `rgba(255, 234, 158, 0.1)` | `background: rgba(255,234,158,0.1)` |
| padding | `0 24px` | `padding: 0 24px` |
| display | flex row | `display: flex; flex-direction: row; align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |
| color (placeholder) | `#FFEA9E` | `color: var(--color-primary)` |
| font-size | 16px | `font-size: 16px` |

**States:**
| State | Changes |
|-------|---------|
| Hover | `background: rgba(255, 234, 158, 0.4)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### B.1 Highlight Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13452` (PC) / `6885:9085` (SP) | — |
| width | 1440px | `width: 100%` |
| padding | `0 144px` | `padding: 0 144px` |
| display | flex row | `display: flex; flex-direction: row; align-items: center; justify-content: space-between` |
| gap | 16px | `gap: 16px` |

**Subtitle text** ("Sun* Annual Awards 2025"):
- font: Montserrat, 14px, 400, `#FFEA9E`

**Title text** ("HIGHLIGHT KUDOS"):
- font: Montserrat, 36px, 700, `#FFEA9E`

---

### B.1.1 Hashtag Filter Dropdown

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13459` | — |
| height | 40px | `height: 40px` |
| border-radius | 4px | `border-radius: 4px` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| background | `transparent` | — |
| padding | `8px 16px` | — |
| color | `#FFEA9E` | — |
| font-size | 14px | — |

**States:**
| State | Changes |
|-------|---------|
| Hover | `border-color: #FFEA9E; background: rgba(255,234,158,0.1)` |
| Open | `border-color: #FFEA9E` |

---

### B.3 / B.3 KUDO Highlight Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13465` (PC) / `6885:9091` (SP) | — |
| width | ~340px (PC carousel item) | — |
| padding | `24px` | `padding: 24px` |
| background | `#00070C` | `background: var(--color-bg-card)` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| border-radius | 16px | `border-radius: 16px` |
| display | flex column | `display: flex; flex-direction: column; gap: 16px` |

**Sender/Receiver Info (B.3.2 / B.3.6):**
- Avatar: 40x40px, border-radius: 100px (circle), `border: 1px solid #FFEA9E`
- Name: 16px, 500 weight, `#FFEA9E`, hover → underline
- Sub-info (stars, title): 12px, 400, `rgba(219, 209, 193, 1)`

**Arrow Icon (B.3.4):**
- Non-interactive icon between sender and receiver
- Color: `#FFEA9E`

**Content Area (B.4.2):**
- font: 14px, 400, `#FFF`
- max lines: 3 (Highlight card), overflow: ellipsis

**Hashtags (B.4.3):**
- font: 12px, 400, `#FFEA9E`
- max 5 per row, overflow: "..."

**Timestamp (B.4.1):**
- font: 12px, 400, `rgba(219, 209, 193, 1)`
- format: `HH:mm - MM/DD/YYYY`

**Heart Action (B.4.4 / C.4.1):**
- Grey state: `rgba(153, 153, 153, 1)` icon + count
- Active/liked state: `rgba(212, 39, 29, 1)` icon + count
- font: 14px, 400

---

### B.5 Slide Indicator

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13471` (PC) / `6885:9098` (SP) | — |
| height | 40px | — |
| display | flex row | `display: flex; align-items: center; gap: 12px` |
| border-radius | 48px | `border-radius: 48px` |
| border | `0.5px solid #FFEA9E` | — |
| background | transparent | — |
| padding | `8px 16px` | — |

**Page text** ("2/5"):
- font: 16px, 400, `#FFEA9E`

**Arrow buttons:**
- Size: 24x24px
- Color: `#FFEA9E`
- Disabled state: `rgba(153, 153, 153, 1)`

---

### C.3 KUDO Post Card (All Kudos Feed)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `3127:21871` (PC) / `6885:9263` (SP) | — |
| width | 100% (fluid) | — |
| padding | `24px` | `padding: 24px` |
| background | `#00070C` | `background: var(--color-bg-card)` |
| border | `1px solid #998C5F` | — |
| border-radius | 16px | — |
| display | flex column | `gap: 12px` |

**Sender/Receiver Info (C.3.1 / C.3.3):**
- Same as Highlight card; avatar 40x40px, name 16px 500 `#FFEA9E`

**Content (C.3.5):**
- font: 14px, 400, `#FFF`
- max lines: 5 (All Kudos card), overflow: ellipsis

**Attached Images (C.3.6):**
- Thumbnails: square ~80x80px, `border-radius: 8px`
- Display: horizontal row, max 5 visible, gap: 8px
- Click → full image view

**Hashtags (C.3.7):**
- Same as Highlight card hashtags

**Time (C.3.4):**
- Same as Highlight card timestamp

**Action Bar (C.4):**
- display: flex row, align-items: center, justify-content: space-between

**Heart Button (C.4.1):**
- Icon: 20x20px heart
- Inactive: `rgba(153, 153, 153, 1)`
- Active (liked): `rgba(212, 39, 29, 1)`
- Count text: 14px, 400, same color

**States:**
| State | Changes |
|-------|---------|
| Hover (card) | `border-color: rgba(255,234,158,0.4)` |
| Heart inactive → click | Icon color: red, count +1 |
| Heart active → click | Icon color: grey, count -1 |

---

### D.1 Personal Statistics Block (Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13489` (PC) / `6885:9223` (SP) | — |
| padding | `24px` | `padding: 24px` |
| background | `#00070C` | `background: var(--color-bg-card)` |
| border | `1px solid #998C5F` | — |
| border-radius | 16px | — |
| display | flex column | `gap: 12px` |

**Stat rows (D.1.2–D.1.7):**
- display: flex row, justify-content: space-between
- label: 14px, 400, `rgba(219, 209, 193, 1)`
- value: 14px, 700, `#FFEA9E`

**Divider (D.1.5):**
- width: 100%, height: 1px, background: `#2E3940`

**x2 Fire Bonus Badge:**
- Background: `rgba(255, 243, 198, 1)` or gradient
- Icon: flame icon 16x16px
- Text: "x2", font: 12px, 700, `#00101A`
- border-radius: 12px
- padding: `2px 8px`

---

### D.1.8 Open Gift Button (Mở quà)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13497` | — |
| width | 100% | `width: 100%` |
| height | 48px | `height: 48px` |
| border-radius | 48px | `border-radius: 48px` (pill) |
| background | `#FFEA9E` | `background: var(--color-primary)` |
| color | `#00101A` | `color: var(--color-bg-page)` |
| font-size | 16px | — |
| font-weight | 700 | — |

**States:**
| State | Changes |
|-------|---------|
| Hover | `background: #FFF8E1` |
| Active | `background: rgba(255,234,158,0.8)` |
| Disabled | `background: rgba(255,234,158,0.3); cursor: not-allowed` |

---

### D.3 Top 10 Gift Recipients Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13510` (PC) / `6885:9255` (SP) | — |
| padding | `24px` | — |
| background | `#00070C` | — |
| border | `1px solid #998C5F` | — |
| border-radius | 16px | — |
| display | flex column | `gap: 12px` |

**Title (D.3.1):**
- font: Montserrat, 14px, 700, `#FFEA9E`
- text: "10 SUNNER NHẬN QUÀ MỚI NHẤT"

**Recipient Row (D.3.2–D.3.6):**
- Avatar: 32x32px circle
- Name: 14px, 500, `#FFF`, hover → underline + cursor pointer
- Gift description: 12px, 400, `rgba(219, 209, 193, 1)`
- gap: 8px between avatar and text

---

### B.7 Spotlight Board

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:14174` (PC) / `6885:9101` (SP) | — |
| width | 1157px (PC) | `width: 100%` |
| height | 548px | `height: 548px` |
| background | `#00070C` | — |
| border | `1px solid #998C5F` | — |
| border-radius | 16px | — |
| overflow | hidden | — |

**Total Kudos Count (B.7.1):**
- font: Montserrat, ~140px, 700, `rgba(255,234,158,0.1)` (very faint, background watermark style)

**Search Input (B.7.3):**
- height: 40px, border-radius: 100px (pill)
- border: `1px solid #998C5F`
- background: transparent
- color: `#FFEA9E`, placeholder: `rgba(219,209,193,1)`
- prefix: search icon, 16x16px `rgba(219,209,193,1)`

**Pan/Zoom Toggle (B.7.2):**
- Size: 40x40px, border-radius: 8px
- border: `1px solid #998C5F`
- background: transparent
- Icon: 20x20px, `#FFEA9E`
- Hover tooltip: "Pan/Zoom"

---

## Component Hierarchy with Styles

```
Page (bg: #00101A)
├── Header (sticky, h: 80px, bg: rgba(16,20,23,0.8), px: 144px)
│   ├── LogoGroup (flex row, gap: 64px)
│   │   ├── Logo (52x48px)
│   │   └── NavLinks (flex row, gap: 24px, font: 16px Montserrat)
│   └── ActionGroup (flex row, gap: 16px)
│       ├── LanguageSelector
│       ├── NotificationIcon (40x40px)
│       └── UserButton (40x40px)
│
├── Section A: Hero (1440x512, KV image)
│   ├── Cover gradient overlay
│   ├── HeroTitle (57px SVN-Gotham, #FFEA9E)
│   ├── HeroLogo (SAA 2025 KUDOS image)
│   └── A.1 SendKudosInput (pill, 100px radius, border: 1px #FFEA9E)
│
├── Section B: Highlight (flex col, gap: 40px, bg: #00101A)
│   ├── B.1 HighlightHeader (px: 144px, flex row space-between)
│   │   ├── Title stack (subtitle 14px + title 36px #FFEA9E)
│   │   └── Filters (Hashtag + Department dropdowns)
│   ├── B.2 Carousel (overflow: hidden, position: relative)
│   │   ├── GradientLeft (fade overlay)
│   │   ├── CarouselTrack (flex row, gap: 16px, transition: transform)
│   │   │   └── [x5] KudoHighlightCard (340px, bg: #00070C, r: 16px)
│   │   └── GradientRight (fade overlay)
│   ├── B.5 SlideIndicator (flex row, gap: 12px, pill border)
│   ├── B.6 SpotlightHeader (px: 144px)
│   └── B.7 SpotlightBoard (1157x548, bg: #00070C, r: 16px)
│       ├── B.7.1 KudosCount (140px text, faint #FFEA9E)
│       ├── B.7.3 SearchInput (pill, 40px h)
│       ├── B.7.2 PanZoomButton (40x40px)
│       └── NetworkChart (SVG/Canvas interactive)
│
└── Section C+D: AllKudos (flex row, px: 144px, gap: 80px)
    ├── C.1 AllKudosHeader (flex col, gap: 16px)
    ├── C.2 KudosFeed (flex col, gap: 24px)
    │   └── [n] KudoPostCard (bg: #00070C, r: 16px, p: 24px)
    │       ├── SenderInfo (avatar 40px circle + name 16px + sub 12px)
    │       ├── ArrowIcon
    │       ├── ReceiverInfo (same as sender)
    │       ├── Timestamp (12px, muted)
    │       ├── Content (14px, max 5 lines)
    │       ├── ImagesGallery (flex row, gap: 8px, max 5)
    │       ├── Hashtags (12px #FFEA9E)
    │       └── ActionBar (flex row space-between)
    │           ├── HeartButton (icon 20px + count 14px)
    │           └── CopyLinkButton
    └── D. Sidebar (flex col, gap: 24px, min-width: ~320px)
        ├── D.1 PersonalStats (bg: #00070C, r: 16px, p: 24px)
        │   ├── StatRow x5 (label + value, flex space-between)
        │   ├── Divider (1px #2E3940)
        │   ├── SecretBoxStats
        │   └── D.1.8 OpenGiftButton (full-width pill, bg: #FFEA9E)
        └── D.3 TopGiftRecipients (bg: #00070C, r: 16px, p: 24px)
            ├── SectionTitle (14px 700 #FFEA9E)
            └── [x10] RecipientRow (avatar 32px + name + gift desc)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width | Design Width |
|------|-----------|-----------|--------------|
| Mobile (SP) | 320px | 767px | 390px (iOS) |
| Tablet | 768px | 1023px | 768px |
| Desktop (PC) | 1024px | ∞ | 1440px |

### Responsive Changes

#### Mobile / SP (< 768px) — Screen ID: `fO0Kt19sZZ`

| Component | Changes |
|-----------|---------|
| Page padding-x | `16px` |
| Navigation header | Condensed: logo + hamburger menu |
| Hero section | Full-width, reduced height (~280px) |
| Send Kudos input | Full-width pill |
| Highlight Header | Filters stacked or horizontal scroll |
| Carousel | Swipeable, single card visible at a time |
| Slide indicator | Bottom dots or "1/5" text |
| Spotlight Board | Condensed view or horizontal scroll |
| All Kudos + Sidebar | Single column — stats block appears above or below feed |
| Sidebar stats | Inline block above kudos feed |
| KUDO cards | Full width, reduced padding (16px) |

#### Tablet (768px – 1023px)

| Component | Changes |
|-----------|---------|
| Page padding-x | `40px` |
| Carousel | 2–3 cards visible |
| All Kudos layout | Feed takes ~60% width, sidebar ~40% |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Page padding-x | `144px` |
| Carousel | 3–5 cards visible |
| All Kudos layout | 2-column (feed + sidebar, gap: 80px) |
| Spotlight Board | Full 1157x548px |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| pencil / edit | 20x20 | `#FFEA9E` | Send Kudos input prefix |
| search / magnifier | 16x16 | `rgba(219,209,193,1)` | Spotlight search input prefix |
| chevron-left | 24x24 | `#FFEA9E` (disabled: `#999`) | Carousel back button |
| chevron-right | 24x24 | `#FFEA9E` (disabled: `#999`) | Carousel next button |
| arrow-right | 20x20 | `#FFEA9E` | Sender → Receiver direction icon in kudos card |
| heart (outline) | 20x20 | `#999` | Heart icon - not liked |
| heart (filled) | 20x20 | `rgba(212,39,29,1)` | Heart icon - liked |
| link / copy | 16x16 | `rgba(219,209,193,1)` | Copy link button icon |
| flame / fire | 16x16 | `#FF6B35` | x2 bonus multiplier badge |
| pan / zoom | 20x20 | `#FFEA9E` | Spotlight pan/zoom toggle |
| bell / notification | 20x20 | `#FFEA9E` | Header notification |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel | `transform: translateX` | 300ms | `ease-in-out` | Button click / swipe |
| Heart button | `color`, `transform: scale` | 150ms | `ease-out` | Click (1.2x scale bounce) |
| Send Kudos input | `background-color`, `border-color` | 150ms | `ease-in-out` | Hover/Focus |
| Dropdown | `opacity`, `transform: translateY(-4px→0)` | 150ms | `ease-out` | Toggle |
| Toast notification | `opacity`, `transform: translateY` | 200ms | `ease-out` | Trigger/auto-dismiss |
| Spotlight node | `opacity`, `scale` | 200ms | `ease-in-out` | Search match highlight |
| Card hover | `border-color` | 150ms | `ease` | Mouse enter |

---

## Implementation Mapping

| Design Element | Figma Node ID (PC) | Figma Node ID (SP) | Tailwind / CSS Class | React Component |
|----------------|--------------------|--------------------|---------------------|-----------------|
| Page Background | `2940:13431` | `6885:9059` | `bg-[#00101A] min-h-screen` | `<KudosPage>` |
| Sticky Header | `2940:13433` | — | `sticky top-0 z-50 bg-[rgba(16,20,23,0.8)] backdrop-blur` | `<KudosHeader>` |
| Hero Section | `2940:13437` | `6885:9066` | `relative w-full h-[512px]` | `<KudosHero>` |
| Send Kudos Input | `2940:13449` | `6885:9083` | `w-full h-14 rounded-full border border-[#FFEA9E] bg-[rgba(255,234,158,0.1)]` | `<SendKudosInput>` |
| Highlight Section | `2940:13451` | `6885:9084` | `flex flex-col gap-10` | `<HighlightSection>` |
| Filter Dropdown | `2940:13459` | — | `h-10 rounded border border-[#998C5F] bg-transparent` | `<FilterDropdown>` |
| Kudos Carousel | `2940:13461` | `6885:9090` | `overflow-hidden relative` | `<KudosCarousel>` |
| KUDO Highlight Card | `2940:13465` | `6885:9091` | `bg-[#00070C] border border-[#998C5F] rounded-2xl p-6` | `<KudoHighlightCard>` |
| Slide Indicator | `2940:13471` | `6885:9098` | `flex items-center gap-3 rounded-full border-[0.5px] border-[#FFEA9E] px-4 py-2` | `<SlideIndicator>` |
| Spotlight Board | `2940:14174` | `6885:9101` | `w-full h-[548px] bg-[#00070C] rounded-2xl` | `<SpotlightBoard>` |
| All Kudos Section | `2940:13475` | `6885:9220` | `flex flex-col gap-10` | `<AllKudosSection>` |
| KUDO Post Card | `3127:21871` | `6885:9263` | `bg-[#00070C] border border-[#998C5F] rounded-2xl p-6 flex flex-col gap-3` | `<KudoPostCard>` |
| Heart Button | `I3127:21871;256:5175` | — | `flex items-center gap-1 cursor-pointer` | `<HeartButton>` |
| Copy Link Button | `I3127:21871;256:5216` | — | `flex items-center gap-1 text-sm cursor-pointer` | `<CopyLinkButton>` |
| Personal Stats Block | `2940:13489` | `6885:9223` | `bg-[#00070C] border border-[#998C5F] rounded-2xl p-6` | `<PersonalStatsBlock>` |
| Open Gift Button | `2940:13497` | — | `w-full h-12 rounded-full bg-[#FFEA9E] text-[#00101A] font-bold` | `<OpenGiftButton>` |
| Top 10 Recipients | `2940:13510` | `6885:9255` | `bg-[#00070C] border border-[#998C5F] rounded-2xl p-6` | `<TopGiftRecipients>` |

---

## Notes

- All colors MUST use CSS variables defined in `globals.css` (see Tailwind config for custom colors).
- The dark navy palette (`#00101A`, `#00070C`) is the SAA 2025 brand theme — do not deviate.
- `#FFEA9E` (gold/cream) is the primary accent color used for headings, borders, and primary CTAs.
- Font `SVN-Gotham` is used only for the hero title. All other text uses `Montserrat`.
- The Spotlight Board is a complex interactive visualization. Consider D3.js or `react-force-graph` for implementation, ensuring it degrades gracefully on mobile.
- The x2 Fire Bonus badge is conditional — driven by a backend feature flag.
- Ensure `color-contrast` for `rgba(219, 209, 193, 1)` on `#00070C` meets WCAG 2.1 AA (4.5:1 for normal text).
- All icons MUST be in Icon Component (not svg files or img tags).
