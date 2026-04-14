# Design Style: Viết Kudo

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết KUDO`
**Figma Link**: https://www.figma.com/file/9ypp4enmFmdK3YAFJLIu6C?node-id=ihQ26W78P2
**Extracted At**: 2026-04-13

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-page | #00101A | 100% | Page background (dark navy) |
| --color-bg-overlay | rgba(16,20,23,0.80) | 80% | Header / modal overlay |
| --color-bg-modal | #FFF8E1 | 100% | Modal background (cream yellow) |
| --color-accent-primary | #FFEA9E | 100% | Send button background (golden yellow) |
| --color-text-primary | #00101A | 100% | Headings, labels, body text |
| --color-text-placeholder | #999999 | 100% | Placeholder / hint text |
| --color-border | #998C5F | 100% | All input/button borders (warm gold) |
| --color-required | #CF1322 | 100% | Required asterisk (*) |
| --color-delete | #D4271D | 100% | Image remove button background |
| --color-delete-light | #E46060 | 100% | Toolbar display text accent (e.g. anonymous sender name placeholder) |
| --color-text-secondary | #999999 | 100% | Secondary / disabled text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0px |
| --text-section-label | Montserrat | 22px | 700 | 28px | 0px |
| --text-body | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-body-sm | Montserrat | 14px | 700 | 20px | 0.10px |
| --text-required | Noto Sans JP | 16px | 700 | 20px | 0px |
| --text-nav | Montserrat | 16px | 700 | 24px | 0.5px |

> **Note**: All text in this screen uses `font-weight: 700` (Bold). Font families used: `Montserrat` (primary), `Noto Sans JP` (required asterisk only).

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-xs | 2px | Label gap (text + asterisk) |
| --spacing-sm | 4px | Icon + text gap in buttons |
| --spacing-md | 8px | Toolbar button gap, image remove gap |
| --spacing-lg | 16px | Section row gap, input padding vertical |
| --spacing-xl | 24px | Input padding horizontal, footer gap |
| --spacing-2xl | 32px | Modal section gap |
| --spacing-3xl | 40px | Modal padding, cancel button padding-x |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 24px | Modal container |
| --radius-send-btn | 8px | Send button |
| --radius-remove-btn | 71px | Image remove circle button |
| --border-default | 1px solid #998C5F | All inputs, toolbar buttons, image frames |
| --border-checkbox | 1px solid #999999 | Anonymous checkbox |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-modal | 0 20px 40px rgba(0,0,0,0.30) | Modal elevation over dark overlay |

---

## Layout Specifications

### Modal Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 752px | Fixed |
| min-height | 1012px | Scroll if content exceeds |
| padding | 40px | All sides |
| gap | 32px | Between sections |
| border-radius | 24px | |
| background | #FFF8E1 | |
| display | flex | |
| flex-direction | column | |
| align-items | flex-start | |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│  Modal (752px × auto, bg: #FFF8E1, radius: 24px, p: 40px)   │
│  gap: 32px between each section                              │
│  ─────────────────────────────────────────────────────────── │
│  [A] Title (672px × 80px)                                    │
│      "Gửi lời cám ơn và ghi nhận đến đồng đội"              │
│      Montserrat 32px/700, color: #00101A                     │
│  ─────────────────────────────────────────────────────────── │
│  [B] Recipient Row (672px × 56px, flex row, gap: 16px)       │
│      ┌─────────────────────────────┐  ┌──────────────────┐   │
│      │ B.1 Label "Người nhận *"    │  │ B.2 Search Input │   │
│      │ 146×28, Montserrat 22px/700 │  │ border #998C5F   │   │
│      └─────────────────────────────┘  │ p: 16px 24px     │   │
│                                       └──────────────────┘   │
│  ─────────────────────────────────────────────────────────── │
│  [Frame 552] Recipient Display (672px × 104px)               │
│      ┌───────────────────────────────┐  ┌────────────────┐   │
│      │ Title "Nơi nhận *" (139×28)   │                    │   │
│      └───────────────────────────────┘                    │   │
│      ┌───────────────────────────────────────────────────┐│   │
│      │ Selected Input (514×56, border #998C5F)           ││   │
│      └───────────────────────────────────────────────────┘│   │
│  ─────────────────────────────────────────────────────────── │
│  [Content] Section (672px × 444px, flex col, gap: 24px)      │
│      ┌──────────────────────────────────────────────────┐ │   │
│      │ Nhập kudo (672px × 268px, flex col, gap: 4px)    │ │   │
│      │  ┌─────────────────────────────────────────────┐ │ │   │
│      │  │ Toolbar C (flex row): B I S # link quote ... │ │ │   │
│      │  │ Each toolbar btn: h=40px, border #998C5F     │ │ │   │
│      │  │ padding: 10px 16px                           │ │ │   │
│      │  └─────────────────────────────────────────────┘ │ │   │
│      │  ┌─────────────────────────────────────────────┐ │ │   │
│      │  │ D Textarea (h=200px, border #998C5F)        │ │ │   │
│      │  │ padding: 16px 24px                          │ │ │   │
│      │  └─────────────────────────────────────────────┘ │ │   │
│      └──────────────────────────────────────────────────┘ │   │
│      ┌──────────────────────────────────────────────────┐ │   │
│      │ D.1 Hint text (672×24, flex row, space-between)  │ │   │
│      └──────────────────────────────────────────────────┘ │   │
│      ┌──────────────────────────────────────────────────┐ │   │
│      │ E Hashtag row (672×48, flex row, gap: 16px)      │ │   │
│      │ Label 108×28 | Tag chips + "+ Hashtag" btn       │ │   │
│      └──────────────────────────────────────────────────┘ │   │
│      ┌──────────────────────────────────────────────────┐ │   │
│      │ F Image row (672×80, flex row, gap: 16px)        │ │   │
│      │ [80×80 thumb][80×80 thumb]... [+ Image btn]      │ │   │
│      │ F.1 "Image" label (74×28)                        │ │   │
│      └──────────────────────────────────────────────────┘ │   │
│  ─────────────────────────────────────────────────────────── │
│  [G] Anonymous Toggle (672px × 28px, flex row, gap: 16px)    │
│      ┌───────┐  "Gửi lời cám ơn và ghi nhận ẩn danh"        │
│      │ 24×24 │  Montserrat 22px/700                          │
│      └───────┘                                               │
│  ─────────────────────────────────────────────────────────── │
│  [H] Action Row (672px × 60px, flex row, gap: 24px)          │
│      ┌────────────────────┐  ┌───────────────────────────┐   │
│      │ H.1 Hủy btn        │  │ H.2 Gửi btn (502×60)      │   │
│      │ border #998C5F     │  │ bg: #FFEA9E, radius: 8px  │   │
│      │ p: 16px 40px       │  │ Montserrat 22px/700       │   │
│      └────────────────────┘  └───────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### [A] Modal Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9870` | - |
| width | 672px | `width: 672px` |
| height | 80px | `height: 80px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| color | #00101A | `color: var(--color-text-primary)` |

---

### [B] Recipient Section

#### B.1 Label "Người nhận *"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9872` | - |
| width | 146px | `width: 146px` |
| height | 28px | `height: 28px` |
| display | flex | `display: flex` |
| gap | 2px | `gap: 2px` |
| align-items | center | `align-items: center` |
| font (label) | Montserrat 22px/700/28px, #00101A | |
| font (asterisk) | Noto Sans JP 16px/700/20px, #CF1322 | |

#### B.2 Search Input

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9873` | - |
| width | fill | `flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| font-family | Montserrat | |
| font-size | 16px | |
| font-weight | 700 | |
| placeholder color | #999999 | `color: var(--color-text-placeholder)` |

**States:**
| State | Changes |
|-------|---------|
| Placeholder | color: #999999 |
| Focus | border-color: #00101A, outline: none |
| Error | border-color: #CF1322 |

---

### [C] Toolbar Buttons (Bold, Italic, Strikethrough, Number, Link, Quote)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | C.1:`I520:11647;520:9881`, C.2:`I520:11647;662:11119`, C.3:`I520:11647;662:11213`, C.4:`I520:11647;662:10376`, C.5:`I520:11647;662:10507`, C.6:`I520:11647;662:10647` | - |
| height | 40px | `height: 40px` |
| padding | 10px 16px | `padding: 10px 16px` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| display | flex | `display: flex` |
| gap | 8px | `gap: 8px` |
| icon size | 24×24px | `width: 24px; height: 24px` |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: transparent |
| Active/Toggle ON | bg: #FFEA9E (golden highlight) |
| Hover | bg: rgba(255,234,158,0.3) |

---

### [D] Kudo Textarea

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9886` | - |
| width | 672px | `width: 672px` |
| height | 200px | `height: 200px` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| padding | 16px 24px | `padding: 16px 24px` |
| font-family | Montserrat | |
| font-size | 16px | |
| font-weight | 700 | |
| placeholder color | #999999 | |
| resize | none | |

**States:**
| State | Changes |
|-------|---------|
| Placeholder | color: #999999 |
| Focus | border-color: #00101A |
| Error | border-color: #CF1322 |

---

### [D.1] Hint Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9887` | - |
| width | 672px | `width: 672px` |
| height | 24px | `height: 24px` |
| display | flex | `display: flex` |
| justify-content | space-between | |
| font-family | Montserrat | |
| font-size | 16px | |
| font-weight | 700 | |
| color | #00101A | |
| hint text | `Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác` | |

---

### [E] Hashtag Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9890` | - |
| width | 672px | `width: 672px` |
| height | 48px (min) | `min-height: 48px` |
| display | flex | `display: flex` |
| flex-direction | row | |
| gap | 16px | `gap: 16px` |
| align-items | flex-start | |

#### E.1 Label "Hashtag *"

| Property | Value |
|----------|-------|
| width | 108px |
| height | 28px |
| font | Montserrat 22px/700/28px, #00101A |
| asterisk | Noto Sans JP 16px/700, #CF1322 |

#### E.2 Tag Group / "+ Hashtag" Button

| Property | Value |
|----------|-------|
| **Node ID** | `I520:11647;662:8595` |
| border | 1px solid #998C5F |
| padding | 4px 8px |
| height | 48px |
| font | Montserrat 16px/700, #999999 |
| icon | MM_MEDIA_Plus (24×24) |

---

### [F] Image Upload Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9896` | - |
| width | 672px | `width: 672px` |
| height | 80px | `height: 80px` |
| display | flex | |
| flex-direction | row | |
| gap | 16px | `gap: 16px` |
| align-items | center | |

#### F.1 Label "Image"

| Property | Value |
|----------|-------|
| width | 74px |
| height | 28px |
| font | Montserrat 22px/700/28px, #00101A |

#### F.2/F.3/F.4 Image Thumbnails

| Property | Value |
|----------|-------|
| **Node IDs** | `I520:11647;662:9197`, `I520:11647;662:9393`, `I520:11647;662:9439` |
| width | 80px |
| height | 80px |
| border | 1px solid #998C5F |
| remove button | 20×20px, radius: 71px, bg: #D4271D |
| remove icon | MM_MEDIA_Close Tiny (17×17) |

#### F.5 "+ Image" Button

| Property | Value |
|----------|-------|
| **Node ID** | `I520:11647;662:9132` |
| height | 48px |
| border | 1px solid #998C5F |
| padding | 4px 8px |
| font | Montserrat 16px/700, #999999 |
| icon | MM_MEDIA_Plus (24×24) |
| hide when | 5 images uploaded |

---

### [Frame 552] Campaign/Award Type Selector

> **Note**: This component's exact design spec is pending clarification (see Open Questions Q1 in spec.md). Documented based on structural analysis — it has the same input pattern as B.2.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | *(Frame 552 — exact ID TBD)* | - |
| width | 672px | `width: 672px` |
| height | 104px | `height: 104px` |
| display | flex | `display: flex` |
| flex-direction | column | |
| gap | 8px | |

#### Label

| Property | Value |
|----------|-------|
| font | Montserrat 22px/700/28px, #00101A |
| asterisk | Noto Sans JP 16px/700, #CF1322 |

#### Dropdown Input (514×56)

| Property | Value |
|----------|-------|
| width | 514px |
| height | 56px |
| border | 1px solid #998C5F |
| padding | 16px 24px |
| font | Montserrat 16px/700, #999999 (placeholder) |
| icon | MM_MEDIA_Down (24×24) right-aligned |

**States:**
| State | Changes |
|-------|---------|
| Placeholder | color: #999999 |
| Focused/Open | border-color: #00101A |
| Error | border-color: #CF1322 |
| Selected | color: #00101A |

---

### [E] Hashtag Chip

> Applied to each tag chip after selection.

| Property | Value | CSS |
|----------|-------|-----|
| height | 36px | `height: 36px` |
| padding | 6px 12px | `padding: 6px 12px` |
| background | #FFEA9E | `background-color: var(--color-accent-primary)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| border-radius | 999px | `border-radius: 9999px` |
| display | flex | `display: flex` |
| gap | 6px | `gap: 6px` |
| align-items | center | |
| font | Montserrat 14px/700/20px, #00101A | |
| remove icon | MM_MEDIA_Close Tiny (16×16), #00101A | |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover (remove) | remove icon opacity: 0.7 |

---

### [B.2 / Frame 552] Search / Select Dropdown

> Applied to the expanded dropdown list for both recipient search and campaign type selection.

| Property | Value | CSS |
|----------|-------|-----|
| background | #FFF8E1 | `background-color: var(--color-bg-modal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| border-radius | 8px | `border-radius: 8px` |
| box-shadow | 0 8px 16px rgba(0,0,0,0.15) | |
| max-height | 200px | `max-height: 200px` |
| overflow-y | auto | |

#### Dropdown Item

| Property | Value |
|----------|-------|
| height | 48px |
| padding | 12px 24px |
| font | Montserrat 16px/700/24px, #00101A |
| display | flex, align-items center, gap 12px |

**States:**
| State | Changes |
|-------|---------|
| Hover | bg: rgba(255,234,158,0.3) |
| Selected | bg: #FFEA9E |
| Empty state | text: "Không tìm thấy kết quả", color: #999999, centered |
| Loading | spinner icon, centered |

---

### Error Message Text

> Appears below a field with validation error.

| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 14px/700/20px | |
| color | #CF1322 | `color: var(--color-required)` |
| margin-top | 4px | `margin-top: 4px` |
| display | flex | |
| gap | 4px | |
| align-items | center | |

---

### [G] Anonymous Toggle

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:14099` | - |
| width | 672px | `width: 672px` |
| height | 28px | `height: 28px` |
| display | flex | |
| gap | 16px | `gap: 16px` |
| align-items | center | |

#### Checkbox

| Property | Value |
|----------|-------|
| width | 24px |
| height | 24px |
| border | 1px solid #999999 |

#### Label text

| Property | Value |
|----------|-------|
| font | Montserrat 22px/700/28px |
| color | #999999 (unchecked state) |

**States:**
| State | Property | Value |
|-------|----------|-------|
| Unchecked | checkbox border | 1px solid #999 |
| Checked | checkbox bg | #FFEA9E; checkbox border #998C5F |
| Checked | label color | #00101A |

---

### [H] Action Buttons

#### H.1 "Hủy" (Cancel) Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9906` | - |
| height | 60px | `height: 60px` |
| padding | 16px 40px | `padding: 16px 40px` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border)` |
| background | transparent | |
| font | Montserrat 16px/700/24px, #00101A | |
| icon | MM_MEDIA_Close (24×24) | |
| display | flex, gap 8px | |

**States:**
| State | Changes |
|-------|---------|
| Hover | bg: rgba(153,140,95,0.1) |
| Active | bg: rgba(153,140,95,0.2) |

#### H.2 "Gửi" (Send) Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I520:11647;520:9907` | - |
| width | 502px | `flex: 1` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: var(--color-accent-primary)` |
| border-radius | 8px | `border-radius: var(--radius-send-btn)` |
| font | Montserrat 22px/700/28px, #00101A | |
| icon | MM_MEDIA_Send (24×24) | |
| display | flex, gap 8px, align-items center, justify-content center | |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover | bg: #FFE07A |
| Active | bg: #FFD952 |
| Disabled | bg: #E5D99A, color: #999, cursor: not-allowed |
| Loading | show spinner, disable click |

---

## Component Hierarchy with Styles

```
Screen - Viết Kudo (1440×1024, bg: #00101A)
├── Cover (1440×512) — background image
├── Header (1440×80, flex row, gap: 238px, bg: rgba(16,20,23,0.8), p: 12px 144px)
│   ├── Logo + Nav Links (flex row, gap: 64px)
│   └── Language + Notification + Avatar (flex row, gap: 16px)
├── Mask overlay (dark semi-transparent)
└── Modal "Viết KUDO" (752×1012, bg: #FFF8E1, radius: 24px, p: 40px, gap: 32px)
    ├── [A] Title (672×80, Montserrat 32px/700, #00101A)
    ├── [B] Recipient Row (672×56, flex row, gap: 16px)
    │   ├── B.1 Label "Người nhận *" (146×28)
    │   └── B.2 Search Input (flex-1, h=56, border #998C5F)
    ├── Frame 552 — Recipient display area (672×104)
    │   ├── Title "Nơi nhận *"
    │   └── Selected Input (514×56, border #998C5F)
    ├── Content (672×444, flex col, gap: 24px)
    │   ├── Nhập kudo (672×268, flex col, gap: 4px)
    │   │   ├── [C] Toolbar (flex row, h=40, border buttons)
    │   │   │   ├── C.1 Bold
    │   │   │   ├── C.2 Italic
    │   │   │   ├── C.3 Strikethrough
    │   │   │   ├── C.4 Number List
    │   │   │   ├── C.5 Link
    │   │   │   └── C.6 Quote
    │   │   └── [D] Textarea (672×200, border #998C5F)
    │   ├── [D.1] Hint (672×24, "@mention" tip)
    │   ├── [E] Hashtag row (672×48, flex row, gap: 16px)
    │   │   ├── E.1 Label "Hashtag *"
    │   │   └── E.2 Tag chips + "+ Hashtag" button
    │   └── [F] Image row (672×80, flex row, gap: 16px)
    │       ├── F.1 Label "Image"
    │       ├── F.2–F.4 Thumbnails (80×80 each, removable)
    │       └── F.5 "+ Image" button (hidden when 5 images)
    ├── [G] Anonymous toggle (672×28, flex row, gap: 16px)
    │   ├── Checkbox (24×24, border #999)
    │   └── Label "Gửi lời cám ơn và ghi nhận ẩn danh" (22px/700)
    └── [H] Actions (672×60, flex row, gap: 24px)
        ├── H.1 "Hủy" (border #998C5F, p: 16px 40px)
        └── H.2 "Gửi" (502×60, bg: #FFEA9E, radius: 8px)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Modal | width: 100vw, border-radius: 24px 24px 0 0 (bottom sheet), padding: 24px |
| Title | font-size: 22px |
| Toolbar | scroll horizontally |
| H.2 Send btn | width: 100% |
| H action row | flex-direction: column-reverse |

#### Tablet (768px – 1023px)

| Component | Changes |
|-----------|---------|
| Modal | width: 90vw, max-width: 752px |
| Padding | 32px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Modal | width: 752px, centered |
| Padding | 40px (as designed) |

---

## Icon Specifications

| Icon Name | Figma Name | Size | Color | Usage |
|-----------|------------|------|-------|-------|
| Bold | MM_MEDIA_Bold | 24×24 | #00101A | Toolbar |
| Italic | MM_MEDIA_Italic | 24×24 | #00101A | Toolbar |
| Strikethrough | MM_MEDIA_Strikethrough | 24×24 | #00101A | Toolbar |
| Number List | MM_MEDIA_Number List | 24×24 | #00101A | Toolbar |
| Link | MM_MEDIA_Link | 24×24 | #00101A | Toolbar |
| Quote | MM_MEDIA_Quote | 24×24 | #00101A | Toolbar |
| Plus | MM_MEDIA_Plus | 24×24 | #999999 | Add hashtag/image |
| Close Tiny | MM_MEDIA_Close Tiny | 17×17 | #FFFFFF | Remove image |
| Close | MM_MEDIA_Close | 24×24 | #00101A | Cancel button |
| Send | MM_MEDIA_Send | 24×24 | #00101A | Send button |
| Down | MM_MEDIA_Down | 24×24 | #00101A | Dropdown arrow |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Modal | opacity, transform (scale) | 200ms | ease-out | Open/Close |
| Send button | background-color | 150ms | ease-in-out | Hover/Active |
| Cancel button | background-color | 150ms | ease-in-out | Hover/Active |
| Toolbar button | background-color | 100ms | ease-in-out | Toggle |
| Input/Textarea | border-color | 150ms | ease-in-out | Focus/Error |
| Image thumbnail | opacity | 150ms | ease | Remove |
| Dropdown | opacity, transform | 150ms | ease-out | Toggle |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Modal Container | `I520:11647` | `bg-[#FFF8E1] rounded-3xl p-10 flex flex-col gap-8` | `<WriteKudoModal />` |
| Modal Title | `I520:11647;520:9870` | `text-[32px] font-bold leading-10 text-[#00101A]` | `<h2>` |
| Recipient Label | `I520:11647;520:9872` | `text-[22px] font-bold leading-7 text-[#00101A]` | `<FieldLabel />` |
| Search Input | `I520:11647;520:9873` | `border border-[#998C5F] px-6 py-4 font-bold placeholder-[#999]` | `<RecipientSearch />` |
| Toolbar | `I520:11647;520:9877` | `flex flex-row` | `<EditorToolbar />` |
| Toolbar Button | `I520:11647;520:9881` | `h-10 px-4 py-[10px] border border-[#998C5F] flex gap-2` | `<ToolbarButton />` |
| Textarea | `I520:11647;520:9886` | `w-full h-[200px] border border-[#998C5F] px-6 py-4 font-bold` | `<KudoEditor />` |
| Hashtag Section | `I520:11647;520:9890` | `flex flex-row gap-4 items-start` | `<HashtagSection />` |
| Add Hashtag Btn | `I520:11647;662:8595` | `border border-[#998C5F] px-2 py-1 h-12 flex gap-2 items-center` | `<AddHashtagButton />` |
| Image Section | `I520:11647;520:9896` | `flex flex-row gap-4 items-center` | `<ImageUploadSection />` |
| Image Thumbnail | `I520:11647;662:9197` | `w-20 h-20 border border-[#998C5F] relative` | `<ImageThumbnail />` |
| Remove Img Btn | (nested in thumbnail) | `w-5 h-5 rounded-full bg-[#D4271D] absolute top-0 right-0` | `<RemoveImageButton />` |
| Anonymous Toggle | `I520:11647;520:14099` | `flex flex-row gap-4 items-center` | `<AnonymousToggle />` |
| Cancel Button | `I520:11647;520:9906` | `border border-[#998C5F] px-10 py-4 flex gap-2 items-center` | `<Button variant="outline">` |
| Send Button | `I520:11647;520:9907` | `flex-1 h-[60px] bg-[#FFEA9E] rounded-lg px-4 flex items-center justify-center gap-2` | `<Button variant="primary">` |
| Hashtag Chip | *(E.2 children)* | `h-9 px-3 py-1.5 bg-[#FFEA9E] border border-[#998C5F] rounded-full flex gap-1.5 items-center text-[14px] font-bold` | `<HashtagChip />` |
| Campaign Selector | *(Frame 552)* | `border border-[#998C5F] px-6 py-4 font-bold placeholder-[#999] flex justify-between items-center` | `<CampaignSelector />` |
| Search Dropdown | *(B.2 / Frame 552 expanded)* | `absolute bg-[#FFF8E1] border border-[#998C5F] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10` | `<SearchDropdown />` |
| Error Message | *(below required fields)* | `text-[14px] font-bold text-[#CF1322] mt-1 flex gap-1 items-center` | `<FieldError />` |

---

## Notes

- All colors use CSS variables mapped from `globals.css` design tokens (see constitution).
- Use Tailwind utility classes with `[]` for non-standard values not in the default Tailwind config.
- All icons MUST be rendered via the `<Icon />` component, not raw `<svg>` or `<img>` tags.
- Font `Montserrat` must be loaded via `next/font/google`. `Noto Sans JP` only needed for the asterisk — consider using a simple `*` in red instead.
- Ensure WCAG AA contrast: `#00101A` on `#FFF8E1` passes at all sizes.
