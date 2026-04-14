# Design Style: Hệ Thống Giải Thưởng (Awards System)

**Frame ID (MoMorph)**: `zFYDgyj_pD`
**Figma Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**Figma File**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-04-08

---

## Design Tokens

### Colors

| Token Name | Hex / Value | Opacity | Usage |
|------------|-------------|---------|-------|
| `--color-bg-page` | `#00101A` | 100% | Page background |
| `--color-header-bg` | `rgba(16, 20, 23, 0.8)` | 80% | Header background (blur) |
| `--color-text-gold` | `#FFEA9E` | 100% | Award names, meta labels, section heading, active nav |
| `--color-text-white` | `#FFFFFF` | 100% | General body text, award count/value numbers |
| `--color-divider` | `#2E3940` | 100% | Horizontal divider under "Sun* Annual Awards 2025" |
| `--color-border` | `#998C5F` | 100% | Avatar border; nav active underline accent |
| `--color-award-glow` | `#FAE287` | 100% | Award image glow: `0 0 6px 0 #FAE287` |
| `--color-text-shadow-gold` | `#FAE287` | 100% | Active nav text-shadow glow |

### Typography

All text uses **Montserrat** (loaded via `var(--font-montserrat)`).

| Token Name | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|------------|------|--------|-------------|----------------|-------|-------|
| `--text-section-title` | 57px | 700 | 64px | -0.25px | `#FFEA9E` | "Hệ thống giải thưởng SAA 2025" |
| `--text-section-sublabel` | 24px | 700 | 32px | 0 | `#FFFFFF` | "Sun* Annual Awards 2025" sub-label |
| `--text-award-name` | 24px | 700 | 32px | 0 | `#FFEA9E` | Award category name (e.g., "Top Talent") |
| `--text-award-meta-label` | 24px | 700 | 32px | 0 | `#FFEA9E` | "Số lượng giải thưởng:", "Giá trị giải thưởng:" |
| `--text-award-count` | 36px | 700 | 44px | 0 | `#FFFFFF` | Award count number (e.g., "10") |
| `--text-award-value` | 36px | 700 | 44px | 0 | `#FFFFFF` | Award value (e.g., "7.000.000 VNĐ") |
| `--text-award-unit` | 14px | 700 | 20px | 0 | `#FFFFFF` | Unit label (e.g., "Cá nhân", "Tập thể") |
| `--text-award-value-note` | 14px | 700 | 20px | 0 | `#FFFFFF` | Value note (e.g., "cho mỗi giải thưởng") |
| `--text-award-description` | 16px | 700 | 24px | 0.5px | `#FFFFFF` | Award body text (justified) |
| `--text-nav-item` | 16px | 700 | 24px | 0.15px | `#FFFFFF` | Sidebar/dropdown nav items (inactive) |
| `--text-nav-item-active` | 16px | 700 | 24px | 0.15px | `#FFEA9E` | Active sidebar nav item |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-page-px` | 144px | Page horizontal padding (PC) |
| `--spacing-header-h` | 80px | Header height |
| `--spacing-title-gap` | 16px | Gap between title sub-label, divider, and heading |
| `--spacing-awards-content-offset` | 121px | Sidebar X start (144px from edge) |
| `--spacing-awards-card-offset` | 443px | Award card content X start |
| `--spacing-sidebar-gap` | 16px | Gap between sidebar nav items |
| `--spacing-card-gap` | 80px | Gap between picture and content block within an award card |
| `--spacing-content-gap` | 32px | Internal gap within award content block |
| `--spacing-meta-gap` | 24px | Gap within award header row (icon + name) |
| `--spacing-award-between` | 80px | Gap between successive award sections (D.1 to D.2 etc.) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-nav-btn` | 4px | Nav item hover rounded corners |
| `--radius-content-block` | 16px | Award content block (backdrop blur card) |
| `--border-nav-active` | `1px solid #FFEA9E` | Active sidebar item underline |
| `--border-divider` | `1px solid #2E3940` | Horizontal divider in title section |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-award-image` | `0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287` | Award image glow effect |
| `--shadow-nav-active-text` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active nav text glow |

---

## Layout Specifications

### PC (Desktop ≥ 1024px) — Figma canvas 1440×6410px

| Property | Value | Notes |
|----------|-------|-------|
| Canvas width | 1440px | Figma design canvas |
| Content area | 1152px | `1440 - 2×144` horizontal padding |
| Page background | `#00101A` | Full page |
| Section padding-x | 144px | Applied from x=144 to x=1296 |

### SP (Mobile < 768px) — Figma canvas 390px

| Property | Value | Notes |
|----------|-------|-------|
| Canvas width | 390px | iOS 13 Pro standard |
| Content padding-x | 16px | Mobile side padding |
| Bottom nav bar height | 56px | Fixed bottom navigation |

---

## Layout Structure (ASCII)

### PC Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header (1440×80px, sticky, bg: rgba(16,20,23,0.8), px: 144px)      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Keyvisual / Hero (3_Keyvisual — 1440×627px, gradient overlay)       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  BG image (1440×871px cover) + gradient overlay                 │ │
│  │  (no interactive content — decorative banner)                   │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Section Title (A_Title — 1152px, px:144px, gap:16px, flex-col)     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  "Sun* Annual Awards 2025"  24px 700 white                   │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  ─── divider 1px #2E3940 ─────────────────────────────────── │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  "Hệ thống giải thưởng SAA 2025"  57px 700 #FFEA9E ls:-0.25  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Content Area (px:144px, flex-row)                                   │
│  ┌──────────┐   ┌───────────────────────────────────────────────┐   │
│  │  Sidebar │   │  Award Cards (gap:80px, flex-col, 856px wide)  │   │
│  │  C_Menu  │   │                                               │   │
│  │  (178px) │   │  ┌─────────────────────────────────────────┐  │   │
│  │  gap:16px│   │  │  D.x Award Card (856×~631px, gap:80px)  │  │   │
│  │          │   │  │  ┌────────────┐  ┌─────────────────────┐│  │   │
│  │  ● Top   │   │  │  │Picture-    │  │Content block        ││  │   │
│  │    Talent│   │  │  │Award       │  │(gap:32px flex-col   ││  │   │
│  │  ○ Top   │   │  │  │(336×336px) │  │border-radius:16px   ││  │   │
│  │    Project│  │  │  │glow shadow │  │backdrop-blur:32px)  ││  │   │
│  │  ○ TPL   │   │  │  └────────────┘  │  ┌───────────────┐  ││  │   │
│  │  ○ Best  │   │  │                  │  │ icon+title    │  ││  │   │
│  │    Mgr   │   │  │                  │  │ 24px gold     │  ││  │   │
│  │  ○ Sig   │   │  │                  │  ├───────────────┤  ││  │   │
│  │  ○ MVP   │   │  │                  │  │ description   │  ││  │   │
│  └──────────┘   │  │                  │  │ 16px white    │  ││  │   │
│  Sidebar pos:   │  │                  │  ├───────────────┤  ││  │   │
│  x:144, w:178px │  │                  │  │ Count block   │  ││  │   │
│  gap:16px       │  │                  │  ├───────────────┤  ││  │   │
│  (sticky)       │  │                  │  │ Value block   │  ││  │   │
│                 │  │                  │  └───────────────┘  ││  │   │
│                 │  │                  └─────────────────────┘│  │   │
│                 │  └─────────────────────────────────────────┘  │   │
│                 └───────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Sun* Kudos Block (D1_Sunkudos)                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  "Phong trào ghi nhận" (24px 700 white)                      │   │
│  │  "Sun* Kudos" (57px 700 #FFEA9E)                             │   │
│  │  Description + [Chi tiết ↗] button | Kudos logo              │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  Footer (shared)                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

### SP Layout (390px)

```
┌──────────────────────────────────────────┐
│  Top Header (logo | 🇻🇳 VN | 🔍 | 🔔)    │
├──────────────────────────────────────────┤
│  Keyvisual / Hero (with Kudos promo)     │
├──────────────────────────────────────────┤
│  Section Title                           │
│  "Sun* Annual Awards 2025" 24px white    │
│  "Hệ thống giải thưởng SAA 2025"         │
│  (36px 700 #FFEA9E — scaled)            │
├──────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐ │
│  │ [Top Talent ▼] (dropdown selector)  │ │
│  └─────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│  Award Image (full-width, ~328px sq)     │
│  (gold glow border + podium graphic)    │
├──────────────────────────────────────────┤
│  ── divider ────────────────────────── │
│  🎯 Top Talent  (24px 700 #FFEA9E)      │
│  Description (16px 700 white justified) │
│  ── divider ────────────────────────── │
│  💎 Số lượng giải thưởng               │
│  10  Cá nhân                            │
│  ── divider ────────────────────────── │
│  📍 Giá trị giải thưởng                │
│  7.000.000 VNĐ  cho mỗi giải thưởng    │
├──────────────────────────────────────────┤
│  "Phong trào ghi nhận"                   │
│  Sun* Kudos  (Kudos logo)               │
│  Description + [Chi tiết ↗]            │
├──────────────────────────────────────────┤
│  Bottom Nav: SAA 2025|Awards★|Kudos|Profile │
└──────────────────────────────────────────┘
```

---

## Component Style Details

### A. Section Title Block (Node `313:8453`)

| Property | Value |
|----------|-------|
| Node ID | `313:8453` |
| Width | 1152px (full content width) |
| Layout | `flex-col`, `gap: 16px`, `align-items: flex-start` |
| Sub-label "Sun* Annual Awards 2025" | `font-size: 24px`, `font-weight: 700`, `line-height: 32px`, `color: #FFFFFF` |
| Divider | `height: 1px`, `background: #2E3940`, `width: 100%` |
| Main heading | `font-size: 57px`, `font-weight: 700`, `line-height: 64px`, `letter-spacing: -0.25px`, `color: #FFEA9E` |

---

### B. Sidebar Navigation (Node `313:8459`) — PC only

| Property | Value |
|----------|-------|
| Node ID | `313:8459` |
| Width | 178px |
| Layout | `flex-col`, `gap: 16px` |
| Position | Sticky, left column, starting at y≈703px (content start) |

**Nav Item (inactive) — e.g., `313:8461`**:

| Property | Value |
|----------|-------|
| Padding | `16px` |
| Font | Montserrat 16px 700, line-height 24px, letter-spacing 0.15px |
| Color | `#FFFFFF` |
| Border-bottom | none |
| Hover | `background: rgba(255,255,255,0.05)`, `border-radius: 4px` |

**Nav Item (active) — e.g., `313:8460`**:

| Property | Value |
|----------|-------|
| Color | `#FFEA9E` |
| Border-bottom | `1px solid #FFEA9E` |
| Text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |

---

### C. Award Dropdown Selector — SP only

| Property | Value |
|----------|-------|
| Width | `calc(100% - 32px)` (16px side padding) |
| Height | ~44px |
| Background | `rgba(255,255,255,0.05)` or `#1A2129` |
| Border | `1px solid #2E3940` |
| Border-radius | `4px` |
| Font | Montserrat 16px 700, color `#FFEA9E` |
| Chevron | Right-aligned, `#FFEA9E`, rotates 180° when open |
| Dropdown panel | `background: #0B0F12`, `border: 1px solid #998C5F`, `border-radius: 8px` |

---

### D. Award Card (D.1–D.6) — PC

Each award card is a `flex-col` container with `gap: 80px`.

**D.x Award Card container:**

| Property | Value |
|----------|-------|
| Width | 856px |
| Layout | `flex-row`, `gap: 80px` (image left, content right) — actually per Figma it is `flex-col gap:80px` containing two sub-blocks: picture row (image + content side by side) and meta block |
| Note | D.1 pos: x=443–1299, y=703–1334 (631px tall) |

**Actually from Figma analysis:**
- Each D.x card has two children stacked with `gap: 80px` (flex-col):
  1. `Picture-Award` (336×336px) + `D.1.2_Content` side by side in a row
  2. These are at the same y level (not stacked), so the card is `flex-row`

**Picture-Award (`I313:8467;214:2525`):**

| Property | Value |
|----------|-------|
| Width | 336px |
| Height | 336px |
| Box-shadow | `0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287` |
| Mix-blend-mode | `screen` |
| Padding | `149.864px 53.455px` (centers circular graphic) |
| Content | Award image/graphic (circular podium + award name text) |

**Content block (`I313:8467;214:2526`):**

| Property | Value |
|----------|-------|
| Layout | `flex-col`, `gap: 32px` |
| Border-radius | `16px` |
| Backdrop-filter | `blur(32px)` |

Content block children:

1. **Header row** (icon 24×24px + award name):
   - Icon: `MM_MEDIA_Target` 24×24px
   - Award name: Montserrat 24px 700, `color: #FFEA9E`, line-height 32px
   - Row gap: 16px, `align-items: center`

2. **Description text**:
   - Width: 480px
   - Font: Montserrat 16px 700, line-height 24px, letter-spacing 0.5px
   - Color: `#FFFFFF`
   - Text-align: `justified`

3. **Count meta block** ("Số lượng giải thưởng:"):
   - Label: Montserrat 24px 700, `#FFEA9E`
   - Count number: Montserrat 36px 700, `#FFFFFF`, line-height 44px
   - Unit: Montserrat 14px 700, `#FFFFFF`, line-height 20px

4. **Value meta block** ("Giá trị giải thưởng:"):
   - Label: Montserrat 24px 700, `#FFEA9E`
   - Value number: Montserrat 36px 700, `#FFFFFF`, line-height 44px
   - Note: Montserrat 14px 700, `#FFFFFF`, line-height 20px

---

### D (SP). Award Card — Mobile

| Property | Value |
|----------|-------|
| Award image | Full-width (`100%`), approx 328px × 244px |
| Border | `1px solid rgba(255,234,158,0.3)` |
| Below image | Divider + `flex-col` content |
| Section dividers | `1px solid #2E3940` between name/description, count, value blocks |
| Count/value icons | 20×20px gold icons before label text |

---

### E. Sun* Kudos Block (Node `335:12023`) — shared with homepage

Same design as homepage Kudos section (see `i87tDx10uM` design-style.md).

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Behaviour |
|------|-----------|-----------|
| Mobile (SP) | 0 | Dropdown nav + stacked layout + bottom nav bar |
| Tablet | 768px | Same as SP but wider (no bottom nav bar) |
| Desktop (PC) | 1024px | Sidebar nav + side-by-side image/content |

### Responsive Changes

#### Mobile (< 768px)

| Component | Change |
|-----------|--------|
| Sidebar nav | Hidden; replaced by dropdown selector |
| Award card | `flex-col` (image on top, content below) |
| Award image | `width: 100%` |
| Content block | `padding: 0 16px` |
| Section heading | `font-size: 36px` (scaled from 57px) |
| Award count/value | `font-size: 28px` (scaled from 36px) |
| Bottom nav bar | Visible, fixed bottom, "Awards" tab active |

#### Desktop (≥ 1024px)

| Component | Change |
|-----------|--------|
| Award card | `flex-row` (image left 336px + content right 480px) |
| Section heading | `font-size: 57px` |
| Sidebar | Visible, sticky, 178px wide |
| Content max-width | 1152px centered with 144px horizontal padding |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| `MM_MEDIA_Target` | 24×24px | gold | Before award name in content block |
| `MM_MEDIA_Diamond` | 24×24px | gold | Before "Số lượng giải thưởng" (SP) |
| `MM_MEDIA_Pin` | 24×24px | gold | Before "Giá trị giải thưởng" (SP) |
| Chevron down | 16×16px | `#FFEA9E` | Dropdown trigger arrow |

---

## Animation & Transitions

| Element | Property | Duration | Trigger |
|---------|----------|----------|---------|
| Nav active state | color, border-bottom | instant | Click / scroll-spy |
| Award dropdown | opacity + translateY | 150ms ease | Open/close |
| Page scroll to anchor | scroll | smooth (CSS) | Click nav/dropdown |
| "Chi tiết" button | box-shadow | 150ms ease-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Section title block | `313:8453` | `flex flex-col gap-4` | `AwardsSectionTitle` |
| Sidebar nav | `313:8459` | `flex flex-col gap-4 w-[178px] sticky` | `AwardsSidebarNav` |
| Sidebar nav item (inactive) | `313:8461` | `px-4 py-4 text-white text-[16px] font-bold` | `AwardsNavItem` |
| Sidebar nav item (active) | `313:8460` | `text-[#FFEA9E] border-b border-[#FFEA9E]` | `AwardsNavItem[active]` |
| Award card container | `313:8467` | `flex gap-[80px] w-[856px]` | `AwardCard` |
| Award image | `I313:8467;214:2525` | `w-[336px] h-[336px]` + shadow | `AwardImage` |
| Award content block | `I313:8467;214:2526` | `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` | `AwardContent` |
| Award name | `I313:8467;214:2530` | `text-[24px] font-bold text-[#FFEA9E] leading-8` | `AwardName` |
| Award description | `I313:8467;214:2531` | `text-[16px] font-bold text-white leading-6 tracking-[0.5px] text-justify` | `AwardDescription` |
| Count number | — | `text-[36px] font-bold text-white leading-[44px]` | `AwardMetaValue` |
| Value number | — | `text-[36px] font-bold text-white leading-[44px]` | `AwardMetaValue` |
| Meta label (gold) | — | `text-[24px] font-bold text-[#FFEA9E] leading-8` | `AwardMetaLabel` |
| SP dropdown | — | Client Component | `AwardDropdown` |

---

## Asset References

Award images in `public/assets/home/images/`:

| Award | Image file |
|-------|------------|
| Top Talent | `award-name-top-talent.png` |
| Top Project | `award-name-top-project.png` |
| Top Project Leader | `award-name-top-project-leader.png` |
| Best Manager | `award-name-best-manager.png` |
| Signature 2025 – Creator | `award-name-signature-creator.png` |
| MVP | `award-name-mvp.png` |
| Award background (podium) | `award-bg.png` |

---

## Notes

- The sidebar should use `IntersectionObserver` (Client Component) to implement scroll-spy.
- The dropdown on SP should also use `IntersectionObserver` to update the selected category as
  the user scrolls.
- Award content block uses `backdrop-filter: blur(32px)` — ensure `WebkitBackdropFilter` is
  also set for Safari compatibility.
- The design uses Montserrat exclusively. Ensure `var(--font-montserrat)` is set on all
  Montserrat nodes.
- Letter-spacing values in Figma use `px` — convert to `em` for Tailwind:
  - 0.5px at 16px = `tracking-[0.5px]`
  - -0.25px at 57px = `tracking-[-0.25px]` / `lg:tracking-tight`
