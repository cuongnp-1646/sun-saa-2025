-- ─── Sun* Kudos — Add title (Danh hiệu) to kudos ────────────────────────────
-- "Danh hiệu" is a user-supplied award title shown as a badge on the kudo card.
-- Mapped to the `category` field in TypeScript types and KudoPostCard.
-- Depends on: 20260409000000_kudos_live_board.sql

alter table kudos
  add column if not exists title text;
