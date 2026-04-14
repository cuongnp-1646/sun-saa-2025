# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Figma Frame ID**: `662:14387`
**Frame Name**: `Login`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=662:14387
**Frame Image**: `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/662:14387/9b6a80531ed3a0744c2a0c2ed06a55af.png`
**Extracted At**: 2026-04-06

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-page` | #00101A | 100% | Page background, gradient stops |
| `--color-header-bg` | #0B0F12 | 80% | Header background (semi-transparent) |
| `--color-login-btn` | #FFEA9E | 100% | "LOGIN With Google" button background |
| `--color-login-btn-text` | #00101A | 100% | Button label and icon color |
| `--color-text-primary` | #FFFFFF | 100% | All text on dark background |
| `--color-divider` | #2E3940 | 100% | Footer top border |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| `--text-language` | Montserrat | 16px | 700 | 24px | 0.15px |
| `--text-hero-body` | Montserrat | 20px | 700 | 40px | 0.5px |
| `--text-login-btn` | Montserrat | 22px | 700 | 28px | 0px |
| `--text-footer` | Montserrat Alternates | 16px | 700 | 24px | 0% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |
| `--spacing-hero-px` | 144px | Hero section horizontal padding |
| `--spacing-hero-py` | 96px | Hero section vertical padding |
| `--spacing-footer-px` | 90px | Footer horizontal padding |
| `--spacing-footer-py` | 40px | Footer vertical padding |
| `--spacing-btn-px` | 24px | Login button horizontal padding |
| `--spacing-btn-py` | 16px | Login button vertical padding |
| `--spacing-lang-p` | 16px | Language button padding (all sides) |
| `--spacing-hero-gap` | 120px | Gap between key visual group and login group |
| `--spacing-login-group-gap` | 24px | Gap between hero text and login button |
| `--spacing-header-gap` | 238px | Gap between logo and language selector |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-btn` | 8px | Login button border-radius |
| `--radius-lang` | 4px | Language selector border-radius |
| `--border-footer` | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-btn-hover` | `0 4px 12px rgba(255, 234, 158, 0.35)` | Login button hover shadow (golden glow) |

### Gradients

| Token Name | Value | Usage |
|------------|-------|-------|
| `--gradient-left` | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)` | Left overlay to darken bg image |
| `--gradient-bottom` | `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)` | Bottom overlay to fade bg into page bg |

---

## Layout Specifications

### Frame (Root)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 1024px |
| Background | #00101A |
| Position model | Absolute stacking of layers |

### Header (A_Header)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 80px |
| Position | absolute, top: 0 |
| Background | rgba(11, 15, 18, 0.80) |
| Display | flex, row |
| Justify-content | space-between |
| Align-items | center |
| Padding | 12px 144px |
| Gap | 238px |
| Z-index | 1 |

### Hero Section (B_Bìa)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 845px |
| Position | absolute, top: 88px |
| Display | flex, column |
| Align-items | flex-start |
| Padding | 96px 144px |
| Gap | 120px |
| Z-index | 1 |

### Login Group (B.3_Login area within Frame 550)

| Property | Value |
|----------|-------|
| Width | 496px |
| Display | flex, column |
| Padding | 0 0 0 16px |
| Gap | 24px |

### Footer (D_Footer)

| Property | Value |
|----------|-------|
| Width | 1440px |
| Position | absolute, bottom: 0 (top: 933px) |
| Display | flex |
| Justify-content | space-between |
| Align-items | center |
| Padding | 40px 90px |
| Border-top | 1px solid #2E3940 |

---

## Layout Structure (ASCII)

```
┌────────────────────────────────────────────────── 1440px ──┐
│ C_Keyvisual (BACKGROUND LAYER, absolute, full-bleed image)  │
│ Rectangle 57 (gradient overlay, left→transparent)          │
│ Cover (gradient overlay, bottom→transparent)                │
│                                                             │
│ ┌── A_Header (1440×80, bg: #0B0F12 80%, z:1) ───────────┐  │
│ │  padding: 12px 144px                                   │  │
│ │  ┌───────────┐   [gap: 238px]   ┌───────────────────┐ │  │
│ │  │ A.1_Logo  │                  │  A.2_Language     │ │  │
│ │  │ (52×56px) │                  │  (108×56px)       │ │  │
│ │  │ [image]   │                  │  🇻🇳 VN ▾         │ │  │
│ │  └───────────┘                  └───────────────────┘ │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                             │
│ ┌── B_Bìa (1440×845, top:88, padding:96px 144px) ────────┐  │
│ │                                                        │  │
│ │  ┌── B.1_Key Visual (451×200) ──────────────────────┐  │  │
│ │  │  [ROOT FURTHER logo image]                       │  │  │
│ │  └──────────────────────────────────────────────────┘  │  │
│ │                                [gap: 120px]             │  │
│ │  ┌── Frame 550 (496×164, pl:16px, gap:24px) ────────┐  │  │
│ │  │  ┌── B.2_content (480×80) ─────────────────────┐  │  │
│ │  │  │  "Bắt đầu hành trình của bạn cùng SAA 2025." │  │  │
│ │  │  │  "Đăng nhập để khám phá!"                    │  │  │
│ │  │  │  font: Montserrat 20px/700, color: #FFF       │  │  │
│ │  │  └─────────────────────────────────────────────┘  │  │
│ │  │                         [gap: 24px]                │  │
│ │  │  ┌── B.3_Login (305×60, radius:8px) ────────────┐  │  │
│ │  │  │  bg: #FFEA9E   padding: 16px 24px             │  │  │
│ │  │  │  ┌────────────────────────────┐ ┌──────────┐  │  │
│ │  │  │  │ "LOGIN With Google"        │ │ 🔵 Google │  │  │
│ │  │  │  │ Montserrat 22px/700 #00101A│ │  24×24   │  │  │
│ │  │  │  └────────────────────────────┘ └──────────┘  │  │
│ │  │  └───────────────────────────────────────────────┘  │  │
│ │  └───────────────────────────────────────────────────┘  │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                             │
│ ┌── D_Footer (1440px, top:933, padding:40px 90px) ────────┐ │
│ │  border-top: 1px solid #2E3940                          │ │
│ │  "Bản quyền thuộc về Sun* © 2025"                       │ │
│ │  Montserrat Alternates 16px/700, color: #FFF            │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header — Navigation Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | — |
| width | 1440px | `w-full` |
| height | 80px | `h-20` |
| background | rgba(11,15,18,0.8) | `bg-[#0B0F12]/80` |
| display | flex, row | `flex flex-row` |
| justify-content | space-between | `justify-between` |
| align-items | center | `items-center` |
| padding | 12px 144px | `py-3 px-36` |
| position | absolute top-0 | `absolute top-0` |
| z-index | 1 | `z-10` |

---

### A.1_Logo — SAA 2025 Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:2166 | — |
| width | 52px | `w-[52px]` |
| height | 56px | `h-14` |
| type | Image (MM_MEDIA_Logo) | `<img>` or `<Image>` |
| interactive | No | — |

**States:** None (not interactive)

---

### A.2_Language — Language Selector Toggle

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | — |
| width | 108px | `w-[108px]` |
| height | 56px | `h-14` |
| display | flex, row | `flex flex-row items-center` |
| inner button radius | 4px | `rounded` |
| inner button padding | 16px | `p-4` |
| font | Montserrat, 16px, 700, 24px lh | `font-montserrat text-base font-bold leading-6` |
| color | #FFFFFF | `text-white` |
| letter-spacing | 0.15px | `tracking-[0.15px]` |
| elements | flag icon + "VN" text + chevron-down icon | — |

**States:**

| State | Changes |
|-------|---------|
| Default | transparent background |
| Hover | `bg-white/10`, cursor: pointer |
| Active (open) | `bg-white/10`, chevron rotates 180° |
| Focus (keyboard) | `outline: 2px solid rgba(255,255,255,0.6)`, outline-offset: 2px |

---

### B.2_content — Hero Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | — |
| width | 480px | `w-[480px]` |
| height | 80px | `h-20` |
| font-family | Montserrat | `font-montserrat` |
| font-size | 20px | `text-xl` |
| font-weight | 700 | `font-bold` |
| line-height | 40px | `leading-10` |
| letter-spacing | 0.5px | `tracking-[0.5px]` |
| color | #FFFFFF | `text-white` |
| text-align | left | `text-left` |
| content | Line 1: "Bắt đầu hành trình của bạn cùng SAA 2025." / Line 2: "Đăng nhập để khám phá!" | — |
| interactive | No | `aria-hidden` or `role="presentation"` not needed — it is readable content |

**States:** None

---

### B.3_Login — "LOGIN With Google" Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14425 | — |
| width | 305px | `w-[305px]` |
| height | 60px | `h-[60px]` |
| padding | 16px 24px | `py-4 px-6` |
| background | #FFEA9E | `bg-[#FFEA9E]` |
| border-radius | 8px | `rounded-lg` |
| display | flex, row | `flex flex-row items-center` |
| gap (text + icon) | ~32px (icon at right) | `justify-between` |
| font-family | Montserrat | `font-montserrat` |
| font-size | 22px | `text-[22px]` |
| font-weight | 700 | `font-bold` |
| line-height | 28px | `leading-7` |
| color | #00101A | `text-[#00101A]` |
| Google icon size | 24×24px | `w-6 h-6` |
| cursor | pointer | `cursor-pointer` |

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | #FFEA9E |
| Hover | box-shadow | `0 4px 12px rgba(255,234,158,0.35)` |
| Hover | transform | `translateY(-1px)` |
| Active | transform | `translateY(0)` |
| Loading | opacity | 0.7, cursor: not-allowed |
| Loading | content | disabled + spinner replacing text |
| Focus | outline | `2px solid #FFEA9E`, outline-offset: 2px |

---

### Error Message — Inline Auth Error

> This component is not explicitly in the Figma frame but is required by the spec (edge cases).
> **TODO(Q1)**: Confirm exact styling with design team.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | N/A (not in Figma) | — |
| position | Below B.3_Login, within Frame 550 | — |
| font-family | Montserrat | `font-montserrat` |
| font-size | 14px | `text-sm` |
| font-weight | 500 | `font-medium` |
| line-height | 20px | `leading-5` |
| color | #FF6B6B (assumed red-toned error) | `text-[#FF6B6B]` |
| margin-top | 8px | `mt-2` |

**States:**

| State | Condition |
|-------|-----------|
| Hidden (default) | No error |
| Visible | `?error=auth_failed` in URL or OAuth failure |

---

### D_Footer — Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | — |
| width | 1440px | `w-full` |
| position | absolute bottom (top: 933px) | `absolute bottom-0` |
| padding | 40px 90px | `py-10 px-[90px]` |
| border-top | 1px solid #2E3940 | `border-t border-[#2E3940]` |
| display | flex | `flex justify-between items-center` |
| font-family | Montserrat Alternates | `font-['Montserrat_Alternates']` |
| font-size | 16px | `text-base` |
| font-weight | 700 | `font-bold` |
| line-height | 24px | `leading-6` |
| color | #FFFFFF | `text-white` |
| content | "Bản quyền thuộc về Sun* © 2025" | — |
| interactive | No | — |

---

## Component Hierarchy with Styles

```
Login (bg: #00101A, 1440×1024)
│
├── C_Keyvisual [LAYER 0] (absolute, full-bleed bg image, aria-hidden)
│
├── Rectangle 57 [LAYER 1] (absolute, full-bleed, gradient: left #00101A→transparent)
│
├── A_Header [LAYER 2] (absolute top:0, 1440×80, bg: #0B0F12/80, flex row justify-between)
│   ├── A.1_Logo (52×56, image, no interaction)
│   └── A.2_Language (108×56, flex row, Montserrat 16px/700 white)
│       ├── [flag icon 24×24]
│       ├── "VN" (16px/700/white)
│       └── [chevron-down icon 24×24]
│
├── B_Bìa [LAYER 3] (absolute top:88, 1440×845, flex col, padding:96px 144px, gap:120px)
│   ├── B.1_Key Visual (451×200, image: ROOT FURTHER, aria-hidden)
│   └── Frame 550 (496×164, flex col, pl:16px, gap:24px)
│       ├── B.2_content (480×80, Montserrat 20px/700/white, lh:40px, ls:0.5px)
│       └── B.3_Login (305×60, bg:#FFEA9E, radius:8px, py:16px px:24px)
│           ├── "LOGIN With Google" (Montserrat 22px/700, color:#00101A)
│           └── [Google icon, 24×24, MM_MEDIA_Google]
│
├── Cover [LAYER 4] (absolute, full-bleed, gradient: bottom #00101A→transparent)
│
└── D_Footer [LAYER 5] (absolute bottom, full-width, border-top:#2E3940, padding:40px 90px)
    └── "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates 16px/700/white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header padding | `py-3 px-4` (16px horizontal) |
| Hero section padding | `py-12 px-4` (16px horizontal, 48px vertical) |
| Hero inner gap | `gap-[60px]` (reduced from 120px) |
| Login group padding-left | `pl-0` (remove 16px left indent) |
| Login group gap | `gap-4` (reduced from 24px) |
| B.1_Key Visual | `w-full max-w-[280px] h-auto` — scales proportionally, capped at 280px |
| B.2_content width | `w-full` (no fixed width) |
| B.3_Login width | `w-full max-w-[400px]` (full-width, centered) |
| Footer padding | `py-6 px-4` |
| Footer text | `text-sm` (14px on mobile) |
| Layout | Single column stack |

#### Tablet (768px–1023px)

| Component | Changes |
|-----------|---------|
| Header padding | `py-3 px-12` (48px horizontal) |
| Hero section padding | `py-16 px-12` (48px horizontal, 64px vertical) |
| Hero inner gap | `gap-[80px]` (reduced from 120px) |
| B.1_Key Visual | `w-[360px] h-auto` |
| B.2_content | `max-w-[480px] w-full` |
| B.3_Login | `w-[305px]` (unchanged) |
| Footer padding | `py-8 px-12` |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | Full design spec as documented above |
| Container | `max-w-[1440px] mx-auto` |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| MM_MEDIA_Logo | I662:14391;178:1033 | 52×48px | — | SAA logo in header |
| Vietnam flag | I662:14391;186:1709;178:1010 | 20×15px | — | Language selector flag |
| Chevron down | I662:14391;186:1696;186:1821;186:1441 | 24×24px | #FFFFFF | Language selector toggle |
| Google icon | I662:14426;186:1766 | 24×24px | — | Login button |
| ROOT FURTHER | 2939:9548 | 451×200px | — | Hero key visual image |

> All icons MUST be implemented as Icon Components (not `<img>` or raw SVG files inline). Media
> assets (logo, flag, Google icon) MUST be loaded via the MoMorph media system or placed under
> `public/assets/login/`.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| B.3_Login button | box-shadow, transform | 150ms | ease-in-out | Hover |
| B.3_Login button | opacity | 200ms | ease-out | Disabled state |
| A.2_Language chevron | transform (rotate 180°) | 150ms | ease-in-out | Dropdown open |
| A.2_Language | background | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Page root | 662:14387 | `relative min-h-screen bg-[#00101A] overflow-hidden` | `<LoginPage />` |
| Background image | 662:14388 | `absolute inset-0 w-full h-full object-cover` | `<Image aria-hidden />` |
| Left gradient | 662:14392 | `absolute inset-0 bg-gradient-to-r from-[#00101A] via-[#00101A]/[0.25] to-transparent` | `<div aria-hidden />` |
| Bottom gradient | 662:14390 | `absolute bottom-0 w-full h-[55%] bg-gradient-to-t from-[#00101A] to-transparent` | `<div aria-hidden />` |
| Header | 662:14391 | `absolute top-0 z-10 w-full flex justify-between items-center py-3 px-36 bg-[#0B0F12]/80` | `<LoginHeader />` |
| Logo | I662:14391;186:2166 | `w-[52px] h-14` | `<Logo />` |
| Language toggle | I662:14391;186:1601 | `flex items-center gap-1 p-4 rounded cursor-pointer hover:bg-white/10` | `<LanguageSelector />` |
| Hero section | 662:14393 | `absolute top-[88px] w-full flex flex-col px-36 py-24 gap-[120px]` | `<HeroSection />` |
| Key visual | 662:14395 | `w-[451px] h-[200px]` | `<KeyVisual />` |
| Hero text | 662:14753 | `font-montserrat text-xl font-bold leading-10 tracking-[0.5px] text-white` | `<p>` |
| Login button | 662:14425 | `flex items-center justify-between w-full max-w-[400px] md:w-[305px] md:max-w-none h-[60px] py-4 px-6 bg-[#FFEA9E] rounded-lg cursor-pointer hover:shadow-[0_4px_12px_rgba(255,234,158,0.35)] hover:-translate-y-px transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed` | `<LoginButton />` |
| Error message | N/A | `mt-2 text-sm font-medium leading-5 text-[#FF6B6B]` | `<p role="alert">` |
| Footer | 662:14447 | `absolute bottom-0 w-full flex justify-between items-center py-10 px-[90px] border-t border-[#2E3940]` | `<LoginFooter />` |

---

## Notes

- **Font loading**: Both `Montserrat` and `Montserrat Alternates` must be loaded via `next/font` or
  Google Fonts. Ensure these are added to the global CSS / layout.
- **Color mode**: This screen is dark-mode only — do not apply light-mode overrides.
- **Gradient overlays**: Two separate gradient divs are needed (left-to-right and bottom-to-top).
  They are decorative — use `aria-hidden="true"`.
- **Login button icon order**: Text first (left), Google icon second (right), matching Figma layout.
  This is the opposite of the conventional "icon left" pattern — verify with design if uncertain.
- **Accessibility**: The "LOGIN With Google" button MUST have `aria-label="Sign in with Google"`.
  The language selector MUST have `aria-haspopup="listbox"` and `aria-expanded`.
