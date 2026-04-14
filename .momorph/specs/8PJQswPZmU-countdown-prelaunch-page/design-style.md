# Design Style: Countdown - Prelaunch page

**Frame ID**: `2268:35127`
**Screen ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: https://www.figma.com/file/9ypp4enmFmdK3YAFJLIu6C?node-id=2268:35127
**Extracted At**: 2026-04-07

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-page | #00101A | 100% | Page background (deep dark navy) |
| --color-text-primary | #FFFFFF | 100% | Title text, digit numbers, labels |
| --color-digit-border | #FFEA9E | 100% | Digit card border (gold) |
| --color-digit-bg-top | #FFFFFF | 100% | Digit card gradient top |
| --color-digit-bg-bottom | rgba(255,255,255,0.10) | 10% | Digit card gradient bottom |
| --color-overlay-start | #00101A | 100% | Gradient overlay bottom-left |
| --color-overlay-mid | rgba(0,18,29,0.46) | 46% | Gradient overlay mid |
| --color-overlay-end | rgba(0,19,32,0.00) | 0% | Gradient overlay top |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-countdown-title | Montserrat | 36px | 700 | 48px | 0px |
| --text-countdown-label | Montserrat | 36px | 700 | 48px | 0px |
| --text-countdown-digit | Digital Numbers | 73.73px | 400 | — | 0% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding-x | 144px | Horizontal padding of main container |
| --spacing-page-padding-y | 96px | Vertical padding of main container |
| --spacing-units-gap | 60px | Gap between time unit blocks (DAYS/HOURS/MINUTES) |
| --spacing-digits-gap | 21px | Gap between digit cards within a unit |
| --spacing-unit-inner-gap | 21px | Gap between digit row and label inside a unit |
| --spacing-title-to-timer | 24px | Gap between title text and timer row |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-card | 12px | Digit card border radius |
| --border-digit-card | 0.75px solid #FFEA9E | Digit card border (gold) |

### Shadows & Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --blur-digit-card | blur(24.96px) | Glass morphism blur on digit card (use as: `backdrop-filter: var(--blur-digit-card)`) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full-width desktop frame |
| height | 1077px | Full-height page |
| background | #00101A | Dark navy base |
| background-image | BG image + gradient overlay | Layered |

### Content Area (Bìa)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Full width |
| height | 456px | Content section height |
| position | absolute | Positioned over background layers |
| top | 218px | Vertical offset from page top (y=218 to y=673 in Figma) |
| display | flex | Column layout |
| flex-direction | column | Vertical stack |
| gap | 120px | Between sections |
| padding | 96px 144px | Top/bottom 96px, left/right 144px |
| align-items | center | Horizontally centered |
| justify-content | center | Vertically centered |
| z-index | 10 | Above BG image (z-0) and gradient (z-1) |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Page (1512px × 1077px, bg: #00101A)                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  BG Image Layer (1512×1077, absolute, z-index: 0)                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Cover Gradient Overlay (1512×1077, absolute, z-index: 1)             │  │
│  │  linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%,   │  │
│  │  rgba(0,19,32,0.00) 63.41%)                                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Content Area / "Bìa" (1512×456px, absolute, top: 218px, z-index:10) │  │
│  │  padding: 96px 144px, flex-col, gap: 120px, align-center             │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Countdown Section (1512px wide, flex-col, gap: 24px, center)   │  │  │
│  │  │                                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────────────────────┐   │  │  │
│  │  │  │  Title: "Sự kiện sẽ bắt đầu sau"                         │   │  │  │
│  │  │  │  (1512×48px, Montserrat 700 36px, #FFF, text-center)      │   │  │  │
│  │  │  └──────────────────────────────────────────────────────────┘   │  │  │
│  │  │                                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────────────────────┐   │  │  │
│  │  │  │  Timer Row (644×192px, flex-row, gap: 60px, center)       │   │  │  │
│  │  │  │                                                            │   │  │  │
│  │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │   │  │  │
│  │  │  │  │  1_Days  │  │ 2_Hours  │  │3_Minutes │               │   │  │  │
│  │  │  │  │ 175×192  │  │ 175×192  │  │ 175×192  │               │   │  │  │
│  │  │  │  │          │  │          │  │          │               │   │  │  │
│  │  │  │  │ [DD][DD] │  │ [HH][HH] │  │ [MM][MM] │               │   │  │  │
│  │  │  │  │  DAYS    │  │  HOURS   │  │ MINUTES  │               │   │  │  │
│  │  │  │  └──────────┘  └──────────┘  └──────────┘               │   │  │  │
│  │  │  └──────────────────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Page Background (BG Image Layer)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35129 | - |
| width | 1512px | `width: 100%` |
| height | 1077px | `height: 100vh` |
| position | absolute | `position: absolute` |
| background | lightgray image, -142px -789.75px / 109.39% 216.02% no-repeat | `background: url(...) no-repeat` |

---

### Cover Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35130 | - |
| width | 1512px | `width: 100%` |
| height | 1077px | `height: 100%` |
| position | absolute | `position: absolute` |
| background | linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0.00) 63.41%) | `background: linear-gradient(...)` |

---

### Title Text — "Sự kiện sẽ bắt đầu sau"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35137 | - |
| width | 1512px | `width: 100%` |
| height | 48px | `height: 48px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

### Time Unit Container (1_Days / 2_Hours / 3_Minutes)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2268:35139 / 2268:35144 / 2268:35149 | - |
| width | 175px | `width: 175px` |
| height | 192px | `height: 192px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 21px | `gap: 21px` |
| align-items | flex-start | `align-items: flex-start` |
| justify-content | center | `justify-content: center` |

---

### Digit Cards Row (Frame 485)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2268:35140 / 2268:35145 / 2268:35150 | - |
| width | 175px | `width: 175px` |
| height | 123px | `height: 123px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 21px | `gap: 21px` |
| align-items | center | `align-items: center` |

---

### Single Digit Card (Glass Card)

| Property | Value | CSS |
|----------|-------|-----|
| **Component ID** | 186:2619 | - |
| width | 77px | `width: 77px` |
| height | 123px | `height: 123px` |
| border-radius | 12px | `border-radius: 12px` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid #FFEA9E` |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | `background: linear-gradient(...)` |
| opacity | 0.5 | `opacity: 0.5` |
| backdrop-filter | blur(24.96px) | `backdrop-filter: blur(24.96px)` |

---

### Digit Number Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2268:35141;186:2617 (instance override) | - |
| width | 59px | `width: 59px` |
| height | 95px | `height: 95px` |
| font-family | Digital Numbers | `font-family: 'Digital Numbers'` |
| font-size | 73.73px | `font-size: 73.73px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |
| text-align | left | `text-align: left` |
| letter-spacing | 0% | `letter-spacing: 0` |

---

### Unit Label Text (DAYS / HOURS / MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2268:35143 / 2268:35148 / 2268:35153 | - |
| DAYS width | 103px | — |
| HOURS width | 138px | — |
| MINUTES width | 173px | — |
| height | 48px | `height: 48px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| letter-spacing | 0px | `letter-spacing: 0` |
| color | #FFFFFF | `color: white` |
| text-transform | uppercase | `text-transform: uppercase` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, 1512×1077px, relative)
├── BG Image Layer (absolute inset-0, z-0, bg-image bg-cover no-repeat)
├── Cover Gradient (absolute inset-0, z-1, gradient overlay)
└── Content "Bìa" (absolute, top-[218px], z-10, 1512×456px, flex-col, gap-[120px], p-[96px_144px], items-center)
    └── Countdown Section (flex-col, gap-24px, center)
        ├── Title (1512×48px, Montserrat 700 36px, #FFF, text-center)
        │   └── "Sự kiện sẽ bắt đầu sau"
        └── Timer Row (644×192px, flex-row, gap-60px, items-center)
            ├── 1_Days (175×192px, flex-col, gap-21px)
            │   ├── Digit Row (175×123px, flex-row, gap-21px)
            │   │   ├── Digit Card [tens] (77×123px, glass, border-radius 12px)
            │   │   │   └── Digit Text (59×95px, Digital Numbers 73.73px, #FFF)
            │   │   └── Digit Card [units] (77×123px, glass, border-radius 12px)
            │   │       └── Digit Text (59×95px, Digital Numbers 73.73px, #FFF)
            │   └── "DAYS" Label (103×48px, Montserrat 700 36px, #FFF)
            ├── 2_Hours (175×192px, flex-col, gap-21px)
            │   ├── Digit Row (175×123px, flex-row, gap-21px)
            │   │   ├── Digit Card [tens] (77×123px, glass)
            │   │   └── Digit Card [units] (77×123px, glass)
            │   └── "HOURS" Label (138×48px, Montserrat 700 36px, #FFF)
            └── 3_Minutes (175×192px, flex-col, gap-21px)
                ├── Digit Row (175×123px, flex-row, gap-21px)
                │   ├── Digit Card [tens] (77×123px, glass)
                │   └── Digit Card [units] (77×123px, glass)
                └── "MINUTES" Label (173×48px, Montserrat 700 36px, #FFF)
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
| Page padding | 24px 16px |
| Timer Row | flex-col, gap: 32px |
| Time Unit | width: 100%, align-items: center |
| Digit card | width: 60px, height: 96px |
| Digit font | font-size: 56px |
| Title | font-size: 24px, line-height: 32px |
| Label | font-size: 20px |

#### Tablet (768px – 1023px)

| Component | Changes |
|-----------|---------|
| Page padding | 64px 48px |
| Digit card | width: 70px, height: 112px |
| Digit font | font-size: 66px |
| Title | font-size: 30px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Page | max-width: 1512px (as designed) |
| All values | As per Figma specs above |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Digit Card | content (number update) | ~300ms | ease-in-out | Every second (countdown tick) |
| Digit Card | flip/roll animation | 300ms | ease-in-out | Number change |
| Digit Card (skeleton) | opacity: 0.3 → 1, placeholder "—" | 200ms | ease-in | SSR → client hydration (first render) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 2268:35127 | `relative w-full min-h-screen bg-[#00101A]` | `<CountdownPage />` |
| BG Image | 2268:35129 | `absolute inset-0 z-0 bg-cover bg-no-repeat` | `<BackgroundImage />` |
| Gradient Overlay | 2268:35130 | `absolute inset-0 z-[1]` (inline gradient style) | `<GradientOverlay />` |
| Content Area | 2268:35131 | `absolute top-[218px] z-10 w-full h-[456px] flex flex-col items-center justify-center gap-[120px] px-[144px] py-24` | `<ContentArea />` |
| Title Text | 2268:35137 | `text-center font-bold text-white text-[36px] leading-[48px] font-montserrat` | `<CountdownTitle />` |
| Timer Row | 2268:35138 | `flex flex-row gap-[60px] items-center` | `<TimerRow />` |
| Time Unit (Days) | 2268:35139 | `flex flex-col gap-[21px]` | `<TimeUnit unit="days" />` |
| Time Unit (Hours) | 2268:35144 | `flex flex-col gap-[21px]` | `<TimeUnit unit="hours" />` |
| Time Unit (Minutes) | 2268:35149 | `flex flex-col gap-[21px]` | `<TimeUnit unit="minutes" />` |
| Digit Cards Row | 2268:35140 | `flex flex-row gap-[21px] items-center` | `<DigitPair />` |
| Single Digit Card | 186:2619 | `w-[77px] h-[123px] rounded-xl border border-[#FFEA9E] opacity-50 backdrop-blur-[24.96px]` + gradient bg | `<DigitCard />` |
| Digit Number | I2268:35141;186:2617 | `font-["Digital_Numbers"] text-[73.73px] font-normal text-white` | `<DigitChar />` |
| Unit Label | 2268:35143 | `font-montserrat font-bold text-[36px] leading-[48px] text-white uppercase` | `<UnitLabel />` |

---

## Notes

- All colors MUST use CSS variables defined in `globals.css` (per constitution Principle II).
- **"Digital Numbers"** is a custom display font — it must be loaded locally or via a web font service. Place in `public/assets/fonts/`.
- **Montserrat** should be loaded via `next/font/google`.
- The glass morphism effect (`backdrop-filter: blur`) requires `backdrop-filter` CSS support — verify browser support and add `-webkit-backdrop-filter` for Safari.
- The digit card opacity (0.5) is applied on the whole card including border — this may need to be split into separate background/border opacity using `rgba` values if the text needs to be fully opaque.
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- Color contrast for digit numbers (#FFF on semi-transparent glass) should be verified to meet WCAG AA (4.5:1).
