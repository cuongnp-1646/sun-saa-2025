# Screen Spec: Viết Kudo

## Screen Info

| Field       | Value                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| Screen Name | Viết Kudo                                                                                                |
| Screen ID   | ihQ26W78P2                                                                                               |
| Figma Link  | https://www.figma.com/file/9ypp4enmFmdK3YAFJLIu6C?node-id=ihQ26W78P2                                   |
| Frame ID    | 520:11602                                                                                                |
| Image       | https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/520:11602/2a59143b0305d622e49b962fdf2cb2c7.png    |
| Status      | discovered                                                                                               |

---

## Description

The **Viết Kudo** screen is a modal/overlay form that allows Sun* employees to compose and send a Kudo (recognition/thank-you message) to a colleague. It appears as an overlay on top of the main application background (Homepage SAA or Kudos feed). The form collects the recipient, a rich-text message body, hashtags, optional images, and an optional anonymous sender flag, then submits the Kudo to the platform.

---

## Navigation Analysis

### Incoming Navigation

| From Screen           | Screen ID    | Trigger                              | Confidence |
| --------------------- | ------------ | ------------------------------------ | ---------- |
| Homepage SAA          | i87tDx10uM   | Floating Widget Button (quick action) | High       |
| Homepage SAA          | i87tDx10uM   | "Write Kudo" / compose action         | High       |
| Sun* Kudos - Live board | MaZUn5xHXZ | Write Kudo action                    | Medium     |

### Outgoing Navigation

| Element          | ID                        | Trigger           | Destination                            | Confidence | Notes                                              |
| ---------------- | ------------------------- | ----------------- | -------------------------------------- | ---------- | -------------------------------------------------- |
| H.1_Button (Hủy) | I520:11647;520:9906       | on_click          | Close modal → previous screen          | High       | Closes modal, discards all changes, no submission  |
| H.2_Button (Gửi) | I520:11647;520:9907       | on_click (valid)  | View Kudo (`onDIohs2bS`) / Homepage SAA (`i87tDx10uM`) | High | Validates form, submits Kudo, closes modal on success |
| H.2_Button (Gửi) | I520:11647;520:9907       | on_click (invalid)| Viết KUDO - Lỗi (`5c7PkAibyD`)        | High       | If required fields are empty, shows validation error state |

---

## Component Schema

### Layout

The screen is a full-page overlay with:
- **Background**: Key visual (decorative background image) + mask/overlay
- **Top**: Header navigation bar (shared instance)
- **Center**: Modal form panel ("Viết KUDO" instance) containing the form
- **Background card** (Bìa): Displays the sender's profile info behind/alongside the modal

### Component Hierarchy

```
Viết Kudo (FRAME 520:11602)
├── Cover (RECTANGLE) — background cover layer
├── Header (INSTANCE) — shared top navigation bar
│   ├── Logo
│   ├── Nav links (About SAA 2025, Awards Information, Sun* Kudos)
│   ├── Language selector (VN flag + label)
│   ├── Notification bell (with badge/dot)
│   └── Profile avatar button
├── Mask (RECTANGLE) — overlay mask for modal background dimming
├── Viết KUDO (INSTANCE 520:11647) — main form modal
│   ├── A_Title — Modal header title text
│   ├── B_Chọn người nhận — Recipient field (search dropdown)
│   │   ├── B.1_Title — Label "Người nhận *"
│   │   └── B.2_Search — Autocomplete search input
│   ├── Frame 552 — (Campaign / award type selector field)
│   │   ├── Button — dropdown trigger
│   │   ├── Title — label with required marker
│   │   └── Note text
│   ├── Content — Content area
│   │   ├── Nhập kudo — Kudo text entry section
│   │   │   ├── Nhập nội dung — Text content input area
│   │   │   │   ├── C_Chức năng — Rich-text toolbar
│   │   │   │   │   ├── C.1_bold (B toggle)
│   │   │   │   │   ├── C.2_italic (I toggle)
│   │   │   │   │   ├── C.3_Stroke (S toggle)
│   │   │   │   │   ├── C.4_number (numbered list)
│   │   │   │   │   ├── C.5_link (insert link)
│   │   │   │   │   └── C.6_quote (blockquote)
│   │   │   │   └── D_text filed — Textarea for kudo body
│   │   │   └── D.1_Gợi ý — Hint text + character guidance
│   │   └── E_Frame 536 — Hashtag field
│   │       ├── E.1_Title — Label "Hashtag *"
│   │       └── E.2_Tag Group — Chip input (max 5 tags)
│   ├── F_Frame 537 — Image upload section
│   │   ├── F.1_Title — Label "Image"
│   │   ├── F.2_Image … F.4_Image — Image thumbnails (with × remove button)
│   │   ├── Image (×2 more thumbnail slots)
│   │   └── F.5_Frame 542 — "+ Image" add button (hidden when 5 images)
│   ├── G_Gửi ẩn danh — Anonymous send checkbox
│   └── H_Frame 538 — Action footer
│       ├── H.1_Button — "Hủy" (Cancel) button
│       └── H.2_Button — "Gửi" (Send) button (primary, yellow)
└── Bìa (FRAME 520:11607) — Sender profile card (background)
    ├── Frame 532 — Profile info block
    │   ├── Infor — Avatar + name + badge
    │   │   ├── MM_MEDIA_Avatar
    │   │   ├── Name: "Huỳnh Dương Xuân Nhật"
    │   │   ├── Badge: "CEVC3", "Mầm non", star count
    │   │   └── Danh hiệu — Badge/title chips row
    │   └── Frame 531 — Action button on profile card
    └── Frame 530 — Award/header section
        └── Header Giải thưởng — "Sun* annual awards 2025" + KUDOS label
```

### Main Components

| ID               | Name              | Type       | Level      | Description                                              |
| ---------------- | ----------------- | ---------- | ---------- | -------------------------------------------------------- |
| I520:11647;520:9870 | A_Title          | TEXT       | Atom       | Modal title "Gửi lời cám ơn và ghi nhận đến đồng đội"  |
| I520:11647;520:9871 | B_Chọn người nhận | FRAME     | Molecule   | Recipient search/dropdown field (required)               |
| I520:11647;520:9873 | B.2_Search       | INSTANCE   | Atom       | Autocomplete search input for recipient                  |
| I520:11647;1688:10448 | Frame 552     | FRAME      | Molecule   | Campaign/award type selector (required)                  |
| I520:11647;520:9877 | C_Chức năng      | FRAME      | Organism   | Rich-text formatting toolbar (Bold, Italic, Stroke, Number, Link, Quote) |
| I520:11647;520:9886 | D_text filed     | INSTANCE   | Molecule   | Textarea for kudo body with placeholder                  |
| I520:11647;520:9887 | D.1_Gợi ý        | FRAME      | Atom       | Hint text below textarea ("@ + tên" tip)                |
| I520:11647;520:9890 | E_Frame 536      | FRAME      | Molecule   | Hashtag chip input (required, max 5)                    |
| I520:11647;520:9896 | F_Frame 537      | FRAME      | Organism   | Image upload area (optional, max 5 images)              |
| I520:11647;520:14099 | G_Gửi ẩn danh  | INSTANCE   | Atom       | Anonymous send checkbox toggle                           |
| I520:11647;520:9905 | H_Frame 538      | FRAME      | Molecule   | Action footer with "Hủy" and "Gửi" buttons              |

---

## Form Fields

| Field ID | Label             | Type              | Required | Validation                                             | Default |
| -------- | ----------------- | ----------------- | -------- | ------------------------------------------------------ | ------- |
| B        | Người nhận        | Search/Autocomplete dropdown | Yes | Min 1 selection; must select from autocomplete list | Empty  |
| Frame 552 | (Campaign type)  | Dropdown select   | Yes      | Must select one campaign/type                          | Empty   |
| D        | Nội dung          | Rich-text textarea | Yes     | Required; supports Bold, Italic, Stroke, Numbered list, Link, Quote; `@name` mention | Empty, placeholder: "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!" |
| E        | Hashtag           | Chip input        | Yes      | Required; min 1 tag; max 5 tags                        | Empty   |
| F        | Image             | File upload       | No       | Optional; max 5 images                                 | Empty   |
| G        | Gửi ẩn danh       | Checkbox          | No       | Boolean; when enabled, sender appears anonymous; may reveal anonymous name text field | false |

---

## API Mapping

### On Load

| Method | Endpoint                      | Purpose                                         |
| ------ | ----------------------------- | ----------------------------------------------- |
| GET    | /api/users?search=            | Autocomplete for recipient search (B field)     |
| GET    | /api/hashtags                 | Fetch available hashtags for suggestions (E field) |
| GET    | /api/campaigns (or /api/kudos/types) | Fetch available campaign/award types for selector |

### On User Action

| Trigger              | Method | Endpoint            | Purpose                                                  |
| -------------------- | ------ | ------------------- | -------------------------------------------------------- |
| Type in B.2_Search   | GET    | /api/users?search={q} | Real-time autocomplete for recipient name              |
| Click H.2_Button (Gửi) | POST | /api/kudos          | Submit kudo: recipient, content, hashtags, images, anonymous flag |
| Click H.1_Button (Hủy) | —    | —                   | Client-side: close modal, discard form state             |
| Click F.5 "+ Image"  | POST   | /api/media/upload   | Upload image file, receive URL/ID for attachment         |

---

## State Management

### Local State

| State Key        | Type      | Description                                             |
| ---------------- | --------- | ------------------------------------------------------- |
| recipient        | object    | Selected recipient user object                          |
| campaignType     | string    | Selected campaign/award type                            |
| content          | string    | Rich-text kudo body content (HTML or markdown)          |
| hashtags         | string[]  | Array of selected hashtag strings (max 5)               |
| images           | File[]    | Array of uploaded image files/URLs (max 5)              |
| isAnonymous      | boolean   | Whether to send anonymously                             |
| isSubmitting     | boolean   | Loading state during form submission                    |
| errors           | object    | Validation error messages per field                     |

### Global State

| State Key        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| currentUser      | Logged-in user info (shown in Bìa/profile card)         |
| notifications    | Notification badge count (in header)                    |

---

## UI States

### Loading

- **Recipient search**: Spinner or skeleton in dropdown while fetching user suggestions
- **Submit (Gửi)**: "Gửi" button shows loading spinner; button disabled; form fields disabled

### Error / Validation

- **Missing required fields**: Red border on empty required fields; error message shown below each field
- **Navigation to**: Viết KUDO - Lỗi (`5c7PkAibyD`) — dedicated error state screen showing validation errors
- **API failure**: Toast or inline error message

### Success

- Modal closes after successful submission
- Navigation to View Kudo (`onDIohs2bS`) or back to Homepage SAA (`i87tDx10uM`)
- Success toast notification may appear

### Empty

- All fields empty on initial open
- "Gửi" button is disabled until all required fields are filled

---

## Analysis Metadata

| Field            | Value                                 |
| ---------------- | ------------------------------------- |
| Analyzed by      | MoMorph ScreenFlow Agent             |
| Date             | 2026-04-13                            |
| Confidence       | High                                  |
| Node tree source | get_frame_node_tree (ihQ26W78P2)      |
| Image reference  | get_frame_image (ihQ26W78P2)          |
| api-docs.yaml    | Not present — APIs are predicted      |
