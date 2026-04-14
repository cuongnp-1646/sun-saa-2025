# Feature Specification: Viết Kudo (Write Kudo)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết KUDO`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-13
**Status**: Draft

---

## Overview

The "Viết Kudo" (Write Kudo) feature is a modal dialog that allows Sun employees to send appreciation messages ("Kudos") to their teammates. Users compose a rich-text message, select a recipient, add hashtags to categorize the recognition, optionally attach images, and optionally send anonymously. This feature reinforces a culture of peer recognition within the Viet Kudos platform.

The modal is accessible from the Kudos live board screen and appears over a dark overlay on the homepage/main screen.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Send a Kudo to a teammate (Priority: P1)

A logged-in employee opens the Write Kudo modal, fills in the required fields (recipient, message, hashtag), and submits the form to send appreciation to a colleague.

**Why this priority**: This is the core action of the entire Kudos feature. Without it, nothing else has value.

**Independent Test**: Open the modal, fill in recipient, message, and hashtag, click "Gửi" → confirm a success notification appears and the kudo shows in the live board.

**Acceptance Scenarios**:

1. **Given** the user is on a page with the Write Kudo button, **When** they click the button, **Then** the "Viết KUDO" modal appears centered on screen with a dark overlay.
2. **Given** the modal is open, **When** the user types a name in the "Người nhận" search field, **Then** an autocomplete dropdown filters colleagues by the typed characters.
3. **Given** the user has selected a recipient, entered a message, and added at least one hashtag, **When** they click "Gửi", **Then** the form is submitted, the modal closes, and a success toast is shown.
4. **Given** the user has successfully submitted, **Then** the new kudo card appears on the Kudos live board.

---

### User Story 2 - Validate required fields before submission (Priority: P1)

A user tries to submit the form without filling in all required fields, and the system prevents submission with inline validation feedback.

**Why this priority**: Data integrity is critical; incomplete kudos must not be submitted.

**Independent Test**: Leave "Người nhận" empty and click "Gửi" → confirm the send button is disabled OR red error border appears on empty required field.

**Acceptance Scenarios**:

1. **Given** the "Người nhận" field is empty, **When** the user clicks "Gửi", **Then** the send button is disabled (greyed out) and the "Người nhận" field shows a red border.
2. **Given** the message textarea is empty, **When** the user clicks "Gửi", **Then** the textarea shows a red border.
3. **Given** no hashtag has been added, **When** the user clicks "Gửi", **Then** the Hashtag section shows a red border.
4. **Given** all required fields are filled, **Then** the "Gửi" button becomes active (bg: `#FFEA9E`).

---

### User Story 3 - Format kudo message with rich text tools (Priority: P2)

A user uses the toolbar to format their kudo message with bold, italic, strikethrough, numbered list, hyperlink, or quote formatting.

**Why this priority**: Enhances expression quality but is not a blocker to core submission flow.

**Independent Test**: Select text in the textarea, click "Bold" → confirm the selected text renders in bold.

**Acceptance Scenarios**:

1. **Given** text is typed in the textarea, **When** the user selects text and clicks the Bold (B) button, **Then** the selected text is rendered in bold.
2. **Given** text is selected, **When** the user clicks Italic (I), **Then** the selected text is italicized.
3. **Given** text is selected, **When** the user clicks Strikethrough (S), **Then** the text has a line through it.
4. **Given** the user clicks Number List, **Then** a numbered list is started in the textarea.
5. **Given** text is selected and the user clicks Link, **Then** a dialog opens to enter a URL, and the selected text becomes a hyperlink.
6. **Given** the user clicks Quote, **Then** the current line is formatted as a blockquote.

---

### User Story 4 - Attach images to kudo (Priority: P2)

A user attaches up to 5 images to their kudo message to visually enrich the appreciation.

**Why this priority**: Enriches kudos but is optional — does not affect core submission.

**Independent Test**: Click "+ Image", select a file → confirm a thumbnail appears. Add 5 images → confirm "+ Image" button is hidden.

**Acceptance Scenarios**:

1. **Given** the Image section is visible, **When** the user clicks "+ Image", **Then** the system file picker opens.
2. **Given** the user selects an image file, **Then** a thumbnail (80×80px) with a red "×" remove button appears.
3. **Given** the user clicks the "×" on a thumbnail, **Then** that image is removed from the list.
4. **Given** 5 images are already attached, **Then** the "+ Image" button is hidden.
5. **Given** fewer than 5 images are attached, **Then** the "+ Image" button remains visible.

---

### User Story 5 - Add and manage hashtags (Priority: P1)

A user adds between 1 and 5 hashtags to categorize their kudo.

**Why this priority**: Hashtags are required and enable filtering/categorization on the live board.

**Independent Test**: Click "+ Hashtag", select or type a tag → confirm chip appears. Add 5 chips → confirm button is disabled/hidden.

**Acceptance Scenarios**:

1. **Given** the hashtag section is visible, **When** the user clicks "+ Hashtag", **Then** a dropdown or input appears to add a hashtag.
2. **Given** the user selects/types a hashtag, **Then** a chip with the hashtag text and an "×" icon appears.
3. **Given** the user clicks "×" on a chip, **Then** the chip is removed.
4. **Given** 5 hashtags are added, **Then** the "+ Hashtag" button is hidden/disabled.
5. **Given** the form is submitted with 0 hashtags, **Then** validation error is shown on the Hashtag field.

---

### User Story 6 - Send kudo anonymously (Priority: P2)

A user enables the anonymous option so their name is hidden from the kudo recipient and the live board.

**Why this priority**: Privacy option is a secondary feature but explicitly designed in the UI.

**Independent Test**: Check the anonymous toggle, then submit → confirm sender name is not shown on the published kudo card.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user checks the "Gửi ẩn danh" checkbox, **Then** the checkbox becomes checked and the label text activates.
2. **Given** anonymous mode is enabled, **When** the form is submitted, **Then** the kudo is published without showing the sender's name.
3. **Given** anonymous mode is enabled, **Then** an anonymous sender name field or fixed "Ẩn danh" label is shown on the kudo card.

---

### User Story 7 - Mention colleagues in kudo message (Priority: P3)

A user types "@" followed by a name in the message textarea to mention and notify another colleague.

**Why this priority**: Nice-to-have interaction enhancement, not required for MVP.

**Independent Test**: Type "@" in textarea → confirm a dropdown appears with colleague suggestions.

**Acceptance Scenarios**:

1. **Given** the user types "@" in the textarea, **Then** an autocomplete dropdown appears with colleague names.
2. **Given** the user selects a colleague from the dropdown, **Then** the mention is inserted as `@name` in the message.

---

### User Story 8 - Cancel and discard kudo (Priority: P1)

A user closes the modal via the "Hủy" button without saving any changes.

**Why this priority**: Basic modal UX requirement.

**Independent Test**: Fill some fields, click "Hủy" → confirm modal closes and no data is saved.

**Acceptance Scenarios**:

1. **Given** the modal is open (with or without data), **When** the user clicks "Hủy", **Then** the modal closes immediately.
2. **Given** the user closes via "Hủy", **Then** no kudo is created and no data is persisted.
3. **Given** the user clicks the backdrop overlay, **Then** the modal also closes (same as "Hủy").

---

### Edge Cases

- What happens when a recipient is not found in the search? → Show "Không tìm thấy" empty state in dropdown.
- What happens when the message exceeds a character limit? → Show error (limit TBD; no max shown in design, but should be enforced server-side).
- What happens if image upload fails? → Show inline error on the image slot.
- What happens on API timeout when submitting? → Show error toast, keep modal open.
- What if the same person is mentioned multiple times in hashtags? → Deduplicate chips.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A - Modal Title | `I520:11647;520:9870` | "Gửi lời cám ơn và ghi nhận đến đồng đội" — 32px bold header | Display only |
| B - Recipient Row | `I520:11647;520:9871` | Label "Người nhận *" + search input with dropdown | Type to filter, click to select |
| B.1 - Recipient Label | `I520:11647;520:9872` | "Người nhận" label + red asterisk | Display only |
| B.2 - Search Input | `I520:11647;520:9873` | Autocomplete text field with dropdown icon | Keyboard input, click dropdown |
| Frame 552 - Campaign Selector | *(Node ID TBD)* | Label + dropdown to select campaign/award type (required) — see Notes | Click to select from dropdown |
| C - Toolbar | `I520:11647;520:9877` | Rich text formatting buttons: B, I, S, #, Link, Quote | Toggle each format |
| C.1 Bold | `I520:11647;520:9881` | Bold toggle button | Click to toggle |
| C.2 Italic | `I520:11647;662:11119` | Italic toggle button | Click to toggle |
| C.3 Stroke | `I520:11647;662:11213` | Strikethrough toggle button | Click to toggle |
| C.4 Number | `I520:11647;662:10376` | Numbered list toggle | Click to toggle |
| C.5 Link | `I520:11647;662:10507` | Insert hyperlink | Click to open URL dialog |
| C.6 Quote | `I520:11647;662:10647` | Blockquote toggle | Click to toggle |
| D - Textarea | `I520:11647;520:9886` | Main rich-text input area, height 200px | Type, @mention, paste |
| D.1 - Hint | `I520:11647;520:9887` | `Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác` | Display only |
| E - Hashtag | `I520:11647;520:9890` | Label "Hashtag *" + tag chips + "+ Hashtag" button | Add/remove chips, max 5 |
| F - Image Upload | `I520:11647;520:9896` | Label "Image" + thumbnails + "+ Image" button | Upload file, remove thumbnail |
| G - Anonymous | `I520:11647;520:14099` | Checkbox + "Gửi lời cám ơn và ghi nhận ẩn danh" | Toggle checkbox |
| H - Actions | `I520:11647;520:9905` | "Hủy" + "Gửi" buttons | Click to cancel/submit |
| H.1 - Cancel | `I520:11647;520:9906` | Outline button with close icon | Close modal |
| H.2 - Send | `I520:11647;520:9907` | Gold primary button with send icon | Submit form |

### Navigation Flow

- **From**: Kudos live board (`/kudos`) / Homepage SAA (`/`) — triggered by "Viết Kudo" floating button or CTA
- **To (cancel)**: Modal closes; user stays on current page
- **To (submit success)**: Navigate to View Kudo (`onDIohs2bS`) OR stay on current page with success toast — *see Open Questions Q3*
- **To (submit invalid)**: Viết KUDO - Lỗi validation state (`5c7PkAibyD`) — inline error display
- **Triggers**:
  - Open: Click "Viết Kudo" CTA button / floating action button
  - Close: Click "Hủy" button, click backdrop overlay, or successful submit

### Visual Requirements

- **Design reference**: See [design-style.md](./design-style.md) for all pixel values, colors, and typography.
- **Frame image**: `assets/frame.png` (URL: `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/520:11602/2a59143b0305d622e49b962fdf2cb2c7.png`)
- **Responsive breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Animations**: Modal fade-in/scale on open (200ms ease-out)
- **Accessibility**: WCAG 2.1 AA — all inputs have `aria-label`, required fields have `aria-required="true"`, modal has `role="dialog"` and focus trap

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a modal dialog with dark overlay when the user triggers "Viết Kudo".
- **FR-002**: System MUST provide an autocomplete search field to select a recipient from the employee list.
- **FR-003**: System MUST provide a rich-text editor with Bold, Italic, Strikethrough, Number List, Link, and Quote formatting.
- **FR-004**: Users MUST be able to add up to 5 hashtags and remove individual hashtags via chip interface.
- **FR-005**: Users MUST be able to attach up to 5 images; the "+ Image" button MUST be hidden when 5 images are attached.
- **FR-006**: System MUST support an anonymous send option that hides the sender's identity on the published kudo.
- **FR-007**: System MUST validate that "Người nhận", campaign/award type (Frame 552), message content, and at least 1 hashtag are filled before allowing submission.
- **FR-008**: The "Gửi" button MUST be disabled until all required fields are valid.
- **FR-009**: System MUST close the modal and show a success notification after successful submission.
- **FR-010**: System MUST close the modal without saving data when "Hủy" is clicked.
- **FR-011**: Users MUST be able to mention colleagues in the message using `@name` syntax with autocomplete.
- **FR-012**: System MUST show a loading indicator on the "Gửi" button and disable it while the submission API call is in progress.
- **FR-013**: On API error during submission, system MUST show an error toast and keep the modal open with all entered data preserved.
- **FR-014**: System MUST support selecting a Campaign/award type from a pre-loaded dropdown in Frame 552 (required field — *see Open Questions Q1*).

### Technical Requirements

- **TR-001**: Modal MUST trap keyboard focus (Tab/Shift+Tab cycles within modal, Escape closes modal).
- **TR-002**: Image uploads MUST be validated client-side for file type (jpg, png, gif, webp) and max size (5MB per image).
- **TR-003**: Recipient search MUST debounce API calls by at least 300ms to avoid excessive requests.
- **TR-004**: Form submission MUST be idempotent — double-clicking "Gửi" must not send duplicate kudos.
- **TR-005**: All user-generated content (message, hashtags) MUST be sanitized server-side to prevent XSS.

### Key Entities *(if feature involves data)*

- **Kudo**: Core entity — `{ id, senderId, recipientId, message (rich text HTML), hashtags[], imageUrls[], isAnonymous, createdAt }`
- **Employee**: Look-up entity for recipient search — `{ id, name, avatarUrl, department }`
- **Hashtag**: Tag entity — `{ id, label }` (pre-existing list or user-created)

---

## State Management

### Local Component State

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `recipient` | `Employee \| null` | `null` | Selected recipient from autocomplete |
| `campaignType` | `Campaign \| null` | `null` | Selected campaign/award type |
| `message` | `string` (rich HTML) | `""` | Rich text content of the kudo |
| `hashtags` | `string[]` | `[]` | List of selected hashtag chips (max 5) |
| `images` | `File[]` | `[]` | Attached image files (max 5) |
| `isAnonymous` | `boolean` | `false` | Anonymous send toggle |
| `recipientQuery` | `string` | `""` | Current text in recipient search field |
| `isSubmitting` | `boolean` | `false` | True while API call is in progress |
| `submitError` | `string \| null` | `null` | Error message from failed submission |
| `fieldErrors` | `Record<string, string>` | `{}` | Per-field validation error messages |

### Global / Server State

| State | Store/Query | Description |
|-------|-------------|-------------|
| Employee list | `GET /api/employees/search?q=` | Fetched on-demand as user types (debounced 300ms) |
| Hashtag list | `GET /api/hashtags` | Pre-fetched when modal opens |
| Campaign list | `GET /api/campaigns` | Pre-fetched when modal opens |

### Error States

| Scenario | UI Response |
|----------|-------------|
| Recipient field empty on submit | Red border on B.2; error text below: `"Vui lòng chọn người nhận"` |
| Campaign type not selected | Red border on Frame 552; error text: `"Vui lòng chọn loại giải thưởng"` |
| Message empty on submit | Red border on D textarea; error text: `"Vui lòng nhập nội dung lời cảm ơn"` |
| No hashtag on submit | Red border on E section; error text: `"Vui lòng thêm ít nhất 1 hashtag"` |
| Image upload fails | Error icon on failed thumbnail; error text: `"Tải ảnh thất bại"` |
| API submit fails | Error toast (top-right): `"Gửi thất bại, vui lòng thử lại"` — modal stays open |
| Recipient not found in search | Dropdown shows: `"Không tìm thấy kết quả"` empty state |

### Loading States

| Scenario | UI Response |
|----------|-------------|
| Modal opening (fetch hashtags/campaigns) | Skeleton loaders in hashtag/campaign dropdowns |
| Submit in progress | "Gửi" button: spinner + disabled, text stays "Gửi" |
| Recipient search | Dropdown shows loading spinner while debounced query runs |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/employees/search?q={query}` | GET | Search employees for recipient autocomplete | Predicted |
| `/api/hashtags` | GET | Load available hashtags for selection | Predicted |
| `/api/kudos` | POST | Submit the kudo form | Predicted |
| `/api/upload/images` | POST | Upload attached images, returns URL array | Predicted |
| `/api/campaigns` | GET | Load available campaign/award types for Frame 552 dropdown | Predicted |

> All endpoints marked **Predicted** — derived from UI analysis, actual endpoint paths TBD by backend spec.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A kudo can be composed and submitted in under 60 seconds for a standard case (recipient + message + hashtag).
- **SC-002**: Required field validation errors are visible within 200ms of clicking "Gửi" with incomplete fields.
- **SC-003**: Submitted kudo appears on the Kudos live board within 3 seconds of successful submission (real-time or near real-time).
- **SC-004**: Image upload succeeds for files ≤5MB; error message shown for files >5MB.
- **SC-005**: The modal is fully functional on mobile (320px+), tablet (768px+), and desktop (1024px+).

---

## Out of Scope

- Editing a submitted kudo (no edit functionality in this screen).
- Deleting a submitted kudo (not part of this modal).
- Kudo approval/moderation workflow.
- Scheduled/delayed kudo delivery.
- Emoji picker in the message editor.
- GIF attachment support (supported formats are: jpg, png, webp — GIF support TBD, *see Open Questions Q5*).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — predicted endpoints documented above
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Open Questions

### Business Logic

- **Q1**: What is Frame 552 exactly? The screenflow agent identified it as a "Campaign/award type selector" (required field). Is this correct? What is the label text? What are the options?
- **Q2**: Are hashtags pre-defined by admins (selectable from a list) or can users also create custom hashtags by typing? The design shows a dropdown but the spec is ambiguous.
- **Q3**: After successful kudo submission — does the modal close and stay on the current page (live board) with a success toast, or does it navigate to the View Kudo detail page (`onDIohs2bS`)?
- **Q4**: For anonymous mode — on the published kudo card, is the sender shown as a fixed "Ẩn danh" label, or can the user enter a custom pseudonym?

### Design / Visual

- **Q5**: Are GIF files supported for image upload? (Currently listed as both supported and out-of-scope — needs clarification.)
- **Q6**: What is the maximum character limit for the kudo message?

---

## Notes

- The design uses **Montserrat Bold (700)** for all text — there is no regular-weight text in this modal. Ensure the font is loaded.
- The "Nơi nhận" label in Frame 552 may be a second recipient-related field (e.g., "recipient department" or a display of the selected recipient). Clarify with design team.
- The toolbar "Gửi ẩn danh" toggle (G) references a text field for an anonymous name — verify UX with product: does "anonymous" show "Ẩn danh" or allow a custom pseudonym?
- Color `#998C5F` is described in Figma as `--Details-Border` — map to a CSS variable in `globals.css`.
- Color `#FFEA9E` is `--Details-Text-Primary-1` — the golden accent color used both in the send button and for navigation highlight.
