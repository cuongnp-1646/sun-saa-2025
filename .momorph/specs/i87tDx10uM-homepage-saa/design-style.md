# Design Style: Homepage SAA

**Frame ID**: `2167:9026`
**Screen ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**Figma File**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-07

---

## Design Tokens

### Colors

| Token Name | Hex / Value | Opacity | Usage |
|------------|-------------|---------|-------|
| `--color-bg-page` | `#00101A` | 100% | Page background |
| `--color-header-bg` | `rgba(16, 20, 23, 0.8)` | 80% | Header background (blur overlay) |
| `--color-text-primary-gold` | `#FFEA9E` | 100% | Selected nav, CTA primary text, card borders |
| `--color-text-primary` | `#FFFFFF` | 100% | General body text, headings on dark bg |
| `--color-text-secondary` | `rgba(255, 255, 255, 0.7)` | 70% | Subtitles, secondary text, event info values |
| `--color-border` | `#998C5F` | 100% | Avatar border, secondary button border |
| `--color-divider` | `#2E3940` | 100% | Section dividers (rgba(46, 57, 64, 1)) |
| `--color-btn-primary-bg` | `#FFEA9E` | 100% | ABOUT AWARDS button background |
| `--color-btn-primary-text` | `#00101A` | 100% | ABOUT AWARDS button text color |
| `--color-btn-secondary-bg` | `transparent` | — | ABOUT KUDOS button background |
| `--color-award-card-bg` | `rgba(26, 33, 38, 1)` | 100% | Award card background |
| `--color-widget-bg` | `#FFEA9E` | 100% | Floating widget button background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-section-title` | Montserrat | 57px | 700 | 64px | -0.25px | Section headings ("Hệ thống giải thưởng", "Sun* Kudos") |
| `--text-heading-lg` | Montserrat | 24px | 700 | 32px | 0 | Coming soon, event info labels, section sub-labels |
| `--text-cta` | Montserrat | 22px | 700 | 28px | 0 | CTA button text (ABOUT AWARDS, ABOUT KUDOS) |
| `--text-card-title` | Montserrat | 24px | 400 | 32px | 0 | Award card titles |
| `--text-body` | Montserrat | 16px | 400 | 24px | 0 | Award card descriptions, body paragraphs |
| `--text-body-bold` | Montserrat | 16px | 700 | 24px | 0 | Event info values, streaming note |
| `--text-detail-btn` | Montserrat | 16px | 500 | 24px | 0 | "Chi tiết" button text |
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0 | Header navigation links |
| `--text-digit` | Digital Numbers | 49.15px | 400 | — | 0 | Countdown digit cards (from Figma: 49.152px) |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |
| `--spacing-content-px` | 144px | Main content horizontal padding (at 1512px) |
| `--spacing-section-gap` | 80px | Gap between award cards in a row |
| `--spacing-card-gap` | 24px | Gap inside award card (image → text area) |
| `--spacing-nav-gap` | 24px | Gap between nav link items |
| `--spacing-header-group-gap` | 64px | Gap between logo and nav links group |
| `--spacing-header-controls-gap` | 238px | Gap between left group and right controls |
| `--spacing-cta-gap` | 40px | Gap between ABOUT AWARDS and ABOUT KUDOS |
| `--spacing-hero-section-gap` | 16px | Gap within countdown (B1) section |
| `--spacing-event-info-gap` | 8px | Gap within event info (B2) section |
| `--spacing-awards-section-gap` | 80px | Gap between header and card list in awards section |
| `--spacing-root-further-px` | 104px | Horizontal padding for Root Further block |
| `--spacing-root-further-py` | 120px | Vertical padding for Root Further block |
| `--spacing-sunkudos-gap` | 10px | Gap within D1 Kudos block |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-nav-btn` | 4px | Nav link hover/selected state |
| `--radius-cta-btn` | 8px | ABOUT AWARDS, ABOUT KUDOS buttons |
| `--radius-widget` | 100px | Floating pill button (full round) |
| `--radius-award-card-img` | 8px | Award card image border-radius |
| `--border-award-card` | `0.955px solid #FFEA9E` | Award card image border |
| `--border-btn-secondary` | `1px solid #998C5F` | ABOUT KUDOS, Avatar border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-btn-hover` | `0 4px 12px rgba(255,234,158,0.35)` | CTA button hover (gold glow) |
| `--shadow-card-hover` | `0 8px 24px rgba(255,234,158,0.15)` | Award card hover lift |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Figma design canvas width |
| height | 4480px | Full scroll height |
| background | `#00101A` | Page background |
| max-width | 1512px | No content exceeds this |
| horizontal padding | 144px | Applied to content areas (not full-bleed sections) |

### Grid/Flex Layout — Awards

| Property | Value | Notes |
|----------|-------|-------|
| columns (desktop) | 3 | gap: 80px between cards |
| columns (tablet) | 2 | — |
| columns (mobile) | 1 or 2 | — |
| card width | 336px | At 1512px viewport |
| row gap | 80px | Between rows |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header (1512×80px, bg: rgba(16,20,23,0.8), px: 144px, sticky)      │
│  ┌──────────────────┐ ←gap:238px→ ┌──────────────────────────────┐  │
│  │ LOGO (52×48px)   │             │ Nav (gap:24px) | Bell | VN | 👤│  │
│  │ gap:64px → Nav   │             └──────────────────────────────┘  │
│  └──────────────────┘                                                │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Hero / Keyvisual (1512×1392px)                                      │
│  ┌──────── BG Image (full bleed, object-cover) ─────────────────┐   │
│  │  ┌─── Gradient Overlay (linear 12deg) ──────────────────┐    │   │
│  │  │                                                       │    │   │
│  │  │  Content (1224px wide, px:144px)                      │    │   │
│  │  │  ┌─────────────────────────────────────────────────┐  │    │   │
│  │  │  │ B1: Coming soon (24px 700)                       │  │    │   │
│  │  │  │ B1: Countdown [DD][DD] [HH][HH] [MM][MM]        │  │    │   │
│  │  │  │      DAYS    HOURS    MINUTES                    │  │    │   │
│  │  │  ├─────────────────────────────────────────────────┤  │    │   │
│  │  │  │ B2: Thời gian: 18h30 | Địa điểm: Nhà hát...    │  │    │   │
│  │  │  │     Tường thuật trực tiếp...                     │  │    │   │
│  │  │  ├─────────────────────────────────────────────────┤  │    │   │
│  │  │  │ B3: [ABOUT AWARDS ↗] [ABOUT KUDOS ↗]            │  │    │   │
│  │  │  └─────────────────────────────────────────────────┘  │    │   │
│  │  └───────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Root Further Block (1152px, px:104px py:120px, br:8px)              │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  [ROOT FURTHER images — text-root.png + text-further.png]     │  │
│  │  B4: Body paragraphs (Montserrat 24px 700, color: #FFF)       │  │
│  │  B4: Quote line (italic, centered)                             │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Awards Section (px:144px)                                           │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  C1: "Sun* annual awards 2025" (24px 700)                      │  │
│  │  ─── divider (#2E3940) ────────────────────────────────────    │  │
│  │  C1: "Hệ thống giải thưởng" (57px 700, letter: -0.25px)       │  │
│  └────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Row 1: [Card 336px] ←80px→ [Card 336px] ←80px→ [Card 336px] │    │
│  │  Row 2: [Card 336px] ←80px→ [Card 336px] ←80px→ [Card 336px] │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  D1: Sun* Kudos (1224px, bg: kudos image)                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  "Phong trào ghi nhận" (24px 700)                           │    │
│  │  "Sun* Kudos" (57px 700, ls: -0.25px)                       │    │
│  │  Description paragraph                                       │    │
│  │  [Chi tiết ↗]                                               │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Footer (logo | About SAA | Awards Info | Sun* Kudos | copyright)   │
└──────────────────────────────────────────────────────────────────────┘

                                              ┌────────────────┐
                                              │ 🖊 / SAA Logo  │  ← Fixed bottom-right
                                              │ (106×64px pill)│
                                              └────────────────┘
```

---

## Component Style Details

### Header (A1) — `2167:9091`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9091` | — |
| width | 1512px | `w-full` |
| height | 80px | `h-20` |
| background | `rgba(16, 20, 23, 0.8)` | `bg-[rgba(16,20,23,0.8)]` |
| padding | `12px 144px` | `py-3 px-36` |
| display | flex row | `flex flex-row items-center justify-between` |
| gap (logo↔nav) | 64px | `gap-16` (within left group) |
| gap (left↔right) | 238px | `gap-[238px]` |
| position | sticky top-0 | `sticky top-0 z-50` |

**Nav Link — Selected State** (`I2167:9091;186:1579`):

| State | Property | Value |
|-------|----------|-------|
| Selected | color | `#FFEA9E` |
| Selected | text-decoration | underline |
| Selected | padding | `16px` |
| Font | family / size / weight | Montserrat 14px 700 |

**Nav Link — Hover State** (`I2167:9091;186:1587`):

| Property | Value |
|----------|-------|
| width | 173px |
| height | 52px |
| padding | 16px |
| border-radius | 4px |
| background | `rgba(255, 255, 255, 0.08)` |
| Font | Montserrat 14px 700 |

**Nav Link — Normal State** (`I2167:9091;186:1593`):

| Property | Value |
|----------|-------|
| width | 117px |
| height | 52px |
| padding | 16px |
| border-radius | 4px |
| color | `#FFFFFF` |
| Font | Montserrat 14px 700 |

**Avatar Button** (`I2167:9091;186:1597`):

| Property | Value |
|----------|-------|
| width / height | 40×40px |
| border | `1px solid #998C5F` |
| border-radius | 4px |
| padding | 10px |

**States (Nav Links)**:
| State | Changes |
|-------|---------|
| Normal | `color: #FFF`, no background |
| Hover | background highlight, border-radius 4px |
| Selected/Active | `color: #FFEA9E`, underline |
| Focus | `outline: 2px solid #FFEA9E` |

---

### CTA Buttons (B3) — `2167:9062`

**ABOUT AWARDS — Primary** (`2167:9063`):

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9063` | — |
| width | 276px | `w-[276px]` |
| height | 60px | `h-[60px]` |
| padding | `16px 24px` | `py-4 px-6` |
| background | `#FFEA9E` | `bg-[var(--color-btn-primary-bg)]` |
| border-radius | 8px | `rounded-[8px]` |
| font | Montserrat 22px 700, 28px line-height | — |
| color | `#00101A` | `text-[var(--color-bg-page)]` |
| gap | 8px | `gap-2` |
| icon | 24×24px arrow icon | — |

**ABOUT KUDOS — Secondary** (`2167:9064`):

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9064` | — |
| border | `1px solid #998C5F` | `border border-[var(--color-border)]` |
| background | transparent (secondary) | `bg-transparent` |
| padding | `16px 24px` | `py-4 px-6` |
| font | Montserrat 22px 700, 28px line-height | — |
| color | `#FFFFFF` | `text-white` |
| gap | 8px | `gap-2` |
| icon | 24×24px arrow icon | — |

**States (both buttons)**:
| State | Changes |
|-------|---------|
| Default | as above |
| Hover (primary) | `box-shadow: 0 4px 12px rgba(255,234,158,0.35)`, slight translate up |
| Hover (secondary) | background adds semi-transparent gold tint |
| Focus | `outline: 2px solid #FFEA9E, outline-offset: 2px` |
| Active | slight press (scale 0.98) |

---

### Award Card (C2.x) — e.g., `2167:9075`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9075` (Top Talent) | — |
| width | 336px | `w-[336px]` |
| height | 504–536px | varies by content length (504px for 1-line title, 536px for 2-line title like MVP) |
| display | flex column | `flex flex-col` |
| gap | 24px | `gap-6` |
| background | `rgba(26, 33, 38, 1)` | — |
| border-radius | 8px | `rounded-lg` |

**Card Image** (`I2167:9075;214:1019`):

| Property | Value |
|----------|-------|
| width / height | 336×336px |
| border | `0.955px solid #FFEA9E` |
| border-radius | 8px |
| object-fit | cover |
| padding (inner) | `149.864px 53.455px` (for awards-name overlay) |

**Card Title** (C2.1.2):

| Property | Value |
|----------|-------|
| font | Montserrat 24px 400, line-height 32px |
| color | `#FFFFFF` |
| width | 336px |

**Card Description** (C2.1.3):

| Property | Value |
|----------|-------|
| font | Montserrat 16px 400, line-height 24px |
| color | `#FFFFFF` (or secondary) |
| max-lines | 2 (line-clamp: 2) |
| width | 336px |

**"Chi tiết" Button** (C2.1.4):

| Property | Value |
|----------|-------|
| width | 88px |
| height | 56px |
| padding | `16px 0` |
| font | Montserrat 16px 500, line-height 24px |
| color | `#FFEA9E` |
| gap | 4px |
| icon | 24×24px arrow icon |

**Card Hover States**:
| State | Changes |
|-------|---------|
| Hover | `transform: translateY(-4px)`, `box-shadow: 0 8px 24px rgba(255,234,158,0.15)`, border glow |
| Focus (card) | `outline: 2px solid #FFEA9E` |

---

### Root Further Block (B4 + Frame 486) — `5001:14827`

| Property | Value | Notes |
|----------|-------|-------|
| **Node ID** | `5001:14827` (group) / `Frame 486` (container) | — |
| width | 1152px | — |
| padding | `120px 104px` | py:120px px:104px |
| border-radius | 8px | `rounded-lg` |
| gap | 32px | Between title images and text block |
| display | flex column | — |

**Root/Further Title Images**:

| Element | Asset | Size |
|---------|-------|------|
| "ROOT" graphic | `text-root.png` | 189×67px |
| "FURTHER" graphic | `text-further.png` | 290×67px |

**B4 Content Text**:

| Element | Font | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Body paragraphs | Montserrat 24px | 700 | `#FFFFFF` | Multi-paragraph, line-height 32px |
| Quote line `"A tree with deep roots fears no storm"` | Montserrat 24px | 700 italic | `#FFFFFF` | Centered, quotes from design |
| Quote attribution `(Cây sâu bền rễ…)` | Montserrat 24px | 700 | `rgba(255,255,255,0.7)` | Below quote, centered |

---

### Countdown Section (B1) — `2167:9035`

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9035` |
| width | 1224px |
| height | 176px |
| display | flex column |
| gap | 16px |
| align-items | flex-start |

**Coming Soon Label** (`2167:9036`):

| Property | Value |
|----------|-------|
| font | Montserrat 24px 700, line-height 32px |
| color | `#FFFFFF` |
| visibility | Hidden when event starts (countdown = 0) |

**Digit Cards** (reused from countdown page):

| Property | Value |
|----------|-------|
| digit font | Digital Numbers 49.15px 400 |
| digit card size | 40×63px each |
| label font | Montserrat 24px 700, line-height 32px |
| labels | DAYS, HOURS, MINUTES |

> Countdown display reuses the existing `DigitCard`, `TimeUnit`, `CountdownTimer` components from `src/components/countdown/`.

---

### Event Info (B2) — `2167:9053`

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9053` |
| width | 637px |
| height | 64px |
| display | flex column |
| gap | 8px |

**Row layout (time/venue line)**:

| Element | Font | Color | Size |
|---------|------|-------|------|
| Label ("Thời gian:", "Địa điểm:") | Montserrat 24px 700 | `#FFFFFF` | w:132px h:32px |
| Value ("18h30", "Nhà hát...") | Montserrat 16px 700 | `#FFFFFF` | w:84px h:24px |
| Streaming note | Montserrat 16px 700 | `#FFFFFF` | w:637px h:24px |

---

### Awards Section Header (C1) — `2167:9069`

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9069` |
| width | 1224px |
| height | 129px |
| display | flex column |
| gap | 16px |

| Element | Font | Color |
|---------|------|-------|
| Caption "Sun* annual awards 2025" | Montserrat 24px 700 | `#FFFFFF` |
| Divider | 1px solid `#2E3940` | — |
| Title "Hệ thống giải thưởng" | Montserrat 57px 700, line-height 64px, ls: -0.25px | `#FFFFFF` |

---

### Sun* Kudos Block (D1) — `3390:10349`

| Property | Value |
|----------|-------|
| **Node ID** | `3390:10349` |
| width | 1224px |
| height | 500px |
| display | flex column, items-center, justify-center |
| gap | 10px |

**Inner container** (`SunKudos`, `1120×500px`):
- Background: Kudos illustration image (right-side positioned)
- Content area (D2): 457×408px, gap 32px, flex col

| Element | Font | Color |
|---------|------|-------|
| Label "Phong trào ghi nhận" | Montserrat 24px 700, line-height 32px | `#FFFFFF` |
| Title "Sun* Kudos" | Montserrat 57px 700, line-height 64px, ls: -0.25px | `#FFFFFF` |
| Description text | Montserrat 16px 400, line-height 24px | `#FFFFFF` |
| "Chi tiết" button | same as award card Chi tiết button | `#FFEA9E` |

---

### Floating Widget Button (6) — `5022:15169`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5022:15169` | — |
| width | 106px | `w-[106px]` |
| height | 64px | `h-16` |
| padding | 16px | `p-4` |
| background | `#FFEA9E` | `bg-[var(--color-widget-bg)]` |
| border-radius | 100px | `rounded-full` |
| display | flex row | `flex flex-row items-center` |
| gap | 8px | `gap-2` |
| position | fixed, bottom-right | `fixed bottom-6 right-6 z-50` |

**Contents**:
- Pen icon: 24×24px
- Separator text "/": Montserrat 24px 700, line-height 32px, color: `#00101A`
- SAA logo icon: 24×24px (Kudos Logo)

**States**:
| State | Changes |
|-------|---------|
| Hover | `box-shadow: 0 4px 12px rgba(255,234,158,0.35)`, scale 1.05 |
| Active | scale 0.97 |
| Focus | `outline: 2px solid #FFEA9E` |

---

### Footer (7) — `5001:14800`

| Property | Value |
|----------|-------|
| **Node ID** | `5001:14800` |
| display | flex row, justify-between, items-center |
| border-top | `1px solid #2E3940` |
| padding | `40px 90px` | py: 40px, px: 90px (from existing `--spacing-footer-py/px` tokens) |

**Contents**:
- Left: Logo (69×64px)
- Center: Nav links (About SAA 2025, Awards Information, Sun* Kudos, Tiêu chuẩn chung) — Montserrat 14px 700, color: `#FFFFFF`, hover: `#FFEA9E`
- Right: Copyright "Bản quyền thuộc về Sun* © 2025" — Montserrat 14px 400, color: `rgba(255,255,255,0.7)`

> **Note**: Footer has 4 nav links including "Tiêu chuẩn chung" (Community Standards) which is not in the header — this link goes to the community standards page (`Dpn7C89--r`).

---

## Component Hierarchy with Styles

```
Page (bg: #00101A)
├── Header (h:80px, sticky, bg: rgba(16,20,23,0.8), px:144px)
│   ├── LeftGroup (flex row, gap:64px)
│   │   ├── Logo (52×48px, img)
│   │   └── NavLinks (flex row, gap:24px)
│   │       ├── NavLink-Selected ("About SAA 2025", color:#FFEA9E, underline)
│   │       ├── NavLink-Hover ("Awards Information", bg-highlight, br:4px)
│   │       └── NavLink-Normal ("Sun* Kudos", color:#FFF)
│   └── RightGroup (flex row, gap:16px)
│       ├── BellButton (40×40px)
│       ├── LanguageButton ("VN", 108×56px, br:4px)
│       └── AvatarButton (40×40px, border:1px solid #998C5F)
│
├── Hero Section (1512×1392px, relative)
│   ├── BG Image (absolute, inset-0, object-cover)
│   ├── Gradient Overlay (absolute, inset-0, linear-gradient(12deg, #00101A 23.7%,...))
│   └── Content (relative, z-10, px:144px, flex col)
│       ├── B1 Countdown (1224px, flex col, gap:16px)
│       │   ├── "Coming soon" (Montserrat 24px 700)
│       │   └── CountdownTimer (DAYS|HOURS|MINUTES digit pairs)
│       ├── B2 EventInfo (637px, flex col, gap:8px)
│       │   ├── Row: "Thời gian: 18h30"
│       │   ├── Row: "Địa điểm: Nhà hát nghệ thuật quân đội"
│       │   └── "Tường thuật trực tiếp tại Group Facebook Sun* Family"
│       └── B3 CTA (flex row, gap:40px)
│           ├── BtnAboutAwards (276×60px, bg:#FFEA9E, br:8px, Montserrat 22px 700)
│           └── BtnAboutKudos (border:#998C5F, br:8px, Montserrat 22px 700)
│
├── RootFurtherBlock (1152px, px:104px, py:120px, br:8px, flex col, gap:32px)
│   ├── RootFurtherTitle (image assets)
│   └── B4 ContentText (Montserrat 24px 700, multiline)
│
├── AwardsSection (px:144px, flex col, gap:80px)
│   ├── C1 Header (1224px, flex col, gap:16px)
│   │   ├── Caption "Sun* annual awards 2025" (24px 700)
│   │   ├── Divider (1px, #2E3940)
│   │   └── Title "Hệ thống giải thưởng" (57px 700, ls:-0.25px)
│   └── C2 AwardGrid (1224px, grid 3-col desktop / 2-col tablet)
│       └── AwardCard × 6 (336px wide, flex col, gap:24px)
│           ├── CardImage (336×336px, border:0.955px solid #FFEA9E)
│           │   └── AwardNameOverlay (positioned image)
│           └── CardBody (flex col, gap:4px)
│               ├── CardTitle (Montserrat 24px 400)
│               ├── CardDesc (Montserrat 16px 400, line-clamp:2)
│               └── ChiTietBtn (88×56px, Montserrat 16px 500, color:#FFEA9E)
│
├── SunKudosSection (1224px, flex col, items-center)
│   └── KudosContainer (1120×500px, bg: kudos illustration)
│       └── D2 Content (457×408px, flex col, gap:32px)
│           ├── Label "Phong trào ghi nhận" (24px 700)
│           ├── Title "Sun* Kudos" (57px 700, ls:-0.25px)
│           ├── Description text (16px 400)
│           └── ChiTietBtn (same as award card)
│
├── Footer (flex row, justify-between, px:90px, py:40px, border-top:#2E3940)
│   ├── Logo (69×64px)
│   ├── NavLinks (flex row, gap:24px)
│   └── Copyright (text, Montserrat)
│
└── FloatingWidgetBtn (fixed, bottom-right, 106×64px, bg:#FFEA9E, br:100px)
    ├── PenIcon (24×24px)
    ├── Separator "/" (Montserrat 24px 700, color:#00101A)
    └── SAALogoIcon (24×24px)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Tailwind prefix |
|------|-----------|-----------------|
| Mobile | 0 | default |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide | 1280px+ | `xl:` |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | Nav links hidden (hamburger/mobile drawer), px: 16px |
| Hero px | 16px horizontal padding |
| CTA Buttons | Stack vertically, full-width |
| Award Grid | 1 column (or 2-col at 480px+) |
| Section titles | Font size reduces (57px → 32px on mobile) |
| Widget button | Stays fixed bottom-right |

#### Tablet (768px – 1023px)

| Component | Changes |
|-----------|---------|
| Header | px: 32px, nav links may abbreviate |
| Award Grid | 2 columns |
| Hero px | 32–64px |
| Section titles | 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Header | px: 144px, full nav visible |
| Award Grid | 3 columns, gap: 80px |
| Content | max-width: 1512px, centered |

---

## Icon Specifications

| Icon | Size | Color | Source | Usage |
|------|------|-------|--------|-------|
| MM_MEDIA_Up (arrow) | 24×24px | `#FFEA9E` / `#FFFFFF` | Figma media | CTA buttons, "Chi tiết" |
| MM_MEDIA_Pen | 24×24px | `#00101A` | Figma media | Widget button |
| MM_MEDIA_Kudos Logo | 20×18px | — | Figma media | Widget button SAA logo |
| Bell icon | 24×24px | `#FFFFFF` | Figma media | Notification button |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav link | background-color | 150ms | ease-in-out | Hover |
| CTA button (primary) | box-shadow | 150ms | ease-out | Hover |
| CTA button | transform (translateY) | 150ms | ease-out | Hover |
| Award card | transform (translateY -4px) | 200ms | ease-out | Hover |
| Award card | box-shadow | 200ms | ease-out | Hover |
| Widget button | transform (scale) | 150ms | ease-out | Hover |
| Countdown digits | — | — | — | Auto-update per minute |

---

## Assets Mapping

| Asset | Figma Node ID | Target Path | Notes |
|-------|---------------|-------------|-------|
| Keyvisual BG image | `2167:9028` | `public/assets/home/images/bg-keyvisual.png` | Full-bleed hero background |
| ROOT FURTHER title (Root) | `MM_MEDIA_Root Text` | `public/assets/home/images/text-root.png` | Text as image |
| ROOT FURTHER title (Further) | `MM_MEDIA_Further Text` | `public/assets/home/images/text-further.png` | Text as image |
| Top Talent award image | `MM_MEDIA_Award BG` (C2.1) | `public/assets/home/images/award-top-talent.png` | Award card thumbnail |
| Top Project award image | `MM_MEDIA_Award BG` (C2.2) | `public/assets/home/images/award-top-project.png` | |
| Top Project Leader image | `MM_MEDIA_Award BG` (C2.3) | `public/assets/home/images/award-top-project-leader.png` | |
| Best Manager image | `MM_MEDIA_Award BG` (C2.4) | `public/assets/home/images/award-best-manager.png` | |
| Signature 2025 Creator image | `MM_MEDIA_Award BG` (C2.5) | `public/assets/home/images/award-signature-creator.png` | |
| MVP image | `MM_MEDIA_Award BG` (C2.6) | `public/assets/home/images/award-mvp.png` | |
| Top Talent name overlay | `MM_MEDIA_Top Talent` | `public/assets/home/images/award-name-top-talent.png` | Text/logo inside card |
| Top Project name overlay | `MM_MEDIA_Top Project` | `public/assets/home/images/award-name-top-project.png` | |
| Top Project Leader name | `MM_MEDIA_Top Project Leader` | `public/assets/home/images/award-name-top-project-leader.png` | |
| Best Manager name | `MM_MEDIA_Best Manager` | `public/assets/home/images/award-name-best-manager.png` | |
| Signature 2025 Creator name | `MM_MEDIA_Signature 2025 Creator` | `public/assets/home/images/award-name-signature-creator.png` | |
| MVP name | `MM_MEDIA_MVP` | `public/assets/home/images/award-name-mvp.png` | |
| Kudos background | `MM_MEDIA_Kudos Background` | `public/assets/home/images/bg-kudos.png` | D1 section background |
| Kudos Logo (widget) | `MM_MEDIA_Kudos Logo` | `public/assets/home/icons/kudos-logo.svg` | Widget button |
| Pen icon (widget) | `MM_MEDIA_Pen` | `public/assets/home/icons/pen.svg` | Widget button |
| SAA Logo | `MM_MEDIA_Logo` | `public/assets/home/logos/saa-logo.svg` | Header logo |
| Arrow/Up icon | `MM_MEDIA_Up` | `public/assets/home/icons/arrow-up.svg` | CTA + Chi tiết buttons |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Page background | `2167:9026` | `bg-[#00101A] min-h-screen` | `<HomePage>` |
| Header | `2167:9091` | `fixed top-0 w-full ... bg-[rgba(16,20,23,0.8)]` | `<Header>` |
| Logo | `I2167:9091;178:1033` | `w-[52px] h-[48px]` | `<Logo>` |
| Nav link selected | `I2167:9091;186:1579` | `text-[#FFEA9E] underline p-4` | `<NavLink active>` |
| Nav link hover | `I2167:9091;186:1587` | `hover:bg-white/10 rounded px-4 py-4` | `<NavLink>` |
| Bell button | `I2167:9091;186:2101` | `w-10 h-10 p-[10px]` | `<NotificationButton>` |
| Language toggle | `I2167:9091;186:1696` | `w-[108px] h-14 rounded px-4` | `<LanguageToggle>` |
| Avatar button | `I2167:9091;186:1597` | `w-10 h-10 border border-[#998C5F]` | `<AvatarButton>` |
| Hero section | `2167:9027` | `relative w-full h-[1392px]` | `<HeroSection>` |
| Countdown timer | `2167:9037` | reuse countdown components | `<CountdownTimer>` |
| Coming soon label | `2167:9036` | `text-[24px] font-bold text-white` | `<ComingSoon>` |
| Event info | `2167:9053` | `flex flex-col gap-2` | `<EventInfo>` |
| CTA primary btn | `2167:9063` | `bg-[#FFEA9E] text-[#00101A] rounded-lg px-6 py-4` | `<Button variant="primary">` |
| CTA secondary btn | `2167:9064` | `border border-[#998C5F] text-white rounded-lg px-6 py-4` | `<Button variant="secondary">` |
| Root Further block | `5001:14827` | `rounded-lg px-[104px] py-[120px]` | `<RootFurtherSection>` |
| Awards section hdr | `2167:9069` | `flex flex-col gap-4` | `<AwardsSectionHeader>` |
| Section divider | `2167:9069 Rectangle 26` | `h-px bg-[#2E3940] w-full` | `<hr>` / CSS |
| Section title | `2167:9069 title` | `text-[57px] font-bold leading-16 tracking-[-0.25px]` | `<h2>` |
| Award card | `2167:9075` | `flex flex-col gap-6 w-[336px]` | `<AwardCard>` |
| Award card image | `I2167:9075;214:1019` | `w-[336px] h-[336px] border border-[#FFEA9E] rounded-lg` | `<AwardCardImage>` |
| Chi tiết button | `I2167:9075;214:1023` | `flex gap-1 py-4 text-[#FFEA9E] text-base font-medium` | `<ChiTietButton>` |
| Kudos section | `3390:10349` | `w-[1224px] flex flex-col items-center` | `<KudosSection>` |
| Floating widget | `5022:15169` | `fixed bottom-6 right-6 w-[106px] h-16 bg-[#FFEA9E] rounded-full` | `<FloatingWidget>` |
| Footer | `5001:14800` | `flex justify-between items-center px-[90px] py-10 border-t border-[#2E3940]` | `<Footer>` |

---

## Notes

- All colors MUST use CSS variables — no hard-coded hex values in components.
- "ROOT FURTHER" title rendered as image assets, not HTML text (special font/treatment).
- Award card thumbnails include both a background image (`Award BG`) and an overlay award-name image — both are separate assets.
- Countdown timer reuses existing `CountdownTimer`, `TimeUnit`, and `DigitCard` components (from `src/components/countdown/`).
- The floating widget button MUST be fixed position, rendered outside the page scroll container.
- The hero gradient overlay angle is **12deg** (differs from the 18deg on the countdown prelaunch page).
- Font Montserrat is already loaded globally via `layout.tsx`.
