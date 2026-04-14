# Tasks: Viết Kudo Modal

**Frame**: `ihQ26W78P2-viet-kudo`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅

---

## Phase 0: Implementation (completed)

- [x] T001 [P1] Implement `useWriteKudo` hook — form state, validation, debounced search, hashtag fetch, submit | `src/hooks/useWriteKudo.ts`
- [x] T002 [P1] Implement `WriteKudoModal` component — full modal layout matching Figma design | `src/components/kudos/WriteKudoModal.tsx`
- [x] T003 [P1] `POST /api/upload` route — validate MIME/size, upload to Supabase Storage `kudos-images` | `src/app/api/upload/route.ts`
- [x] T004 [P1] Update `POST /api/kudos` to accept `title`, `isAnonymous`, `campaignId` | `src/app/api/kudos/route.ts`
- [x] T005 [P1] Wire `WriteKudoModal` into `KudosPage` (replace `SendKudosDialog`) | `src/components/kudos/KudosPage.tsx`

---

## Phase 1: Bug Fixes

- [x] T006 [P2] Fix Send button icon — replace Unicode `▷` with inline SVG (paper-plane, `currentColor`) | `src/components/kudos/WriteKudoModal.tsx`
- [x] T007 [P2] Fix Cancel button icon — replace Unicode `×` with inline SVG close icon (`currentColor`) | `src/components/kudos/WriteKudoModal.tsx`
- [x] T008 [P2] Fix toolbar icons — replace Unicode chars (B/I/S/≡/🔗/❝) with proper Material-style SVG icons for Bold, Italic, Strikethrough, Ordered List, Link, Quote | `src/components/kudos/WriteKudoModal.tsx`
