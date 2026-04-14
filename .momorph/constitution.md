<!--
SYNC IMPACT REPORT
==================
Version change: (new) → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (5 principles)
  - Tech Stack & Tooling
  - Development Workflow
  - Governance
Removed sections: N/A (initial)
Templates updated:
  - .momorph/templates/plan-template.md ✅ — Constitution Compliance Check section already present; no changes needed
  - .momorph/templates/spec-template.md ✅ — References constitution.md dependency; no changes needed
  - .momorph/templates/tasks-template.md ✅ — TDD task ordering aligned with Principle III; no changes needed
Follow-up TODOs: None — all placeholders resolved
-->

# Agentic Coding Hands-on Constitution

## Core Principles

### I. Clean Code & Code Organization

All code MUST follow single-responsibility principles: one concern per file, one purpose per function.
File naming MUST use kebab-case for non-component modules (e.g., `user-service.ts`) and PascalCase
for React components and classes (e.g., `UserCard.tsx`). Indentation MUST be 2 spaces; lines SHOULD
stay within ~100 characters. Strings MUST use single quotes; template literals MUST be used for
interpolation. `const` and immutable patterns MUST be preferred for collections. Barrel (index) files
MUST NOT create circular imports; use them only for types or constants. Business logic MUST live in
service-layer classes and MUST NOT be placed in API route handlers or controllers.

### II. Technology Stack Compliance

All implementations MUST use only the approved stack. Introducing new runtime dependencies requires
explicit justification documented in the plan's Constitution Compliance Check section.

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | 4.x |
| Auth & Database | Supabase | `@supabase/supabase-js` ^2, `@supabase/ssr` ^0.8 |
| Deployment | Cloudflare Workers via OpenNext | `@opennextjs/cloudflare` ^1 |
| Package Manager | Yarn | 1.22.22 |

Design tokens (colors, spacing, radii, font sizes) MUST be defined as CSS variables in the global
CSS file and consumed via Tailwind utility classes. Hard-coded raw values (colors, spacing,
typography) in component files are FORBIDDEN.

### III. Test-First Development (NON-NEGOTIABLE)

TDD MUST be followed for all feature work. The mandatory cycle is:

1. Write failing tests that describe the expected behavior.
2. Get user/reviewer approval on the test cases.
3. Confirm tests fail (Red).
4. Implement the minimum code to make tests pass (Green).
5. Refactor while keeping tests green (Refactor).

Tests MUST be written and committed before the corresponding implementation code. No implementation
task may be marked complete until its tests pass. Integration tests MUST cover: new feature
contracts, contract changes, inter-service communication, and shared schemas. Mocking the database
is FORBIDDEN in integration tests; tests MUST hit real or real-equivalent data layers.

### IV. Security (OWASP)

All code MUST comply with OWASP Top 10 secure coding practices. Specifically:

- Input validation MUST occur at all system boundaries (user input, external APIs, environment
  variables). Internal code MAY trust validated data passed through the service layer.
- Sensitive fields (passwords, tokens, secrets) MUST be excluded from API responses using
  `@Exclude()` decorators or equivalent DTO mapping. They MUST NOT be logged.
- Secrets and credentials MUST be stored in environment variables (`.env`). Hard-coding them in
  source files is STRICTLY FORBIDDEN.
- SQL injection, XSS, and CSRF vectors MUST be eliminated. Use Supabase's parameterized queries;
  never concatenate user input into queries.
- Authentication MUST use Supabase Auth via the `@supabase/ssr` package with server-side session
  management. Custom auth implementations are FORBIDDEN.

### V. Responsive & Accessible Design

All screens MUST be fully functional and visually correct across three breakpoints:
mobile (≥320 px), tablet (≥768 px), and desktop (≥1024 px). A mobile-first approach MUST
be used when writing Tailwind utility classes (default classes target mobile; larger breakpoints
use `md:` / `lg:` prefixes).

Navigation URLs MUST be derived exclusively from `SCREENFLOW.md` (for user-triggered navigation)
and `group_specs/*.md` (for logic-driven navigation). Guessing or hard-coding URLs is
STRICTLY FORBIDDEN — see `.momorph/guidelines/frontend.md` for the full navigation implementation
workflow.

Accessibility MUST meet WCAG 2.1 AA as a minimum: all interactive elements MUST have accessible
labels, color contrast MUST meet 4.5:1 for normal text, and keyboard navigation MUST be functional
for all user flows.

## Tech Stack & Tooling

- **Linting**: ESLint with `eslint-config-next` — MUST pass with zero errors before any commit.
- **Type checking**: TypeScript strict mode — MUST pass with zero type errors.
- **Local dev**: `make up` (Supabase containers) + `make dev` (Next.js dev server via Turbopack).
- **Build & deploy**: `yarn deploy` (OpenNext Cloudflare build + deploy).
- **Environment**: Copy `.env.example` to `.env` and populate before running locally. Never commit
  `.env` files.
- **Assets**: MUST use kebab-case filenames (`google-icon.svg`) and placed under
  `public/assets/{group_name}/{icons|images|logos}/`.

## Development Workflow

1. Run `/momorph.constitution` once at project start to establish this document.
2. For each feature: `specify` → `reviewspecify` → `plan` → `reviewplan` → `tasks` → `implement`.
3. Every PR MUST include a Constitution Compliance Check (see `plan-template.md`) confirming no
   violations. Any approved violation MUST be documented with justification and rejected alternatives.
4. Commits MUST follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
5. Code review MUST verify compliance with all five principles before approval.
6. All navigation implementation MUST follow the three-step workflow in
   `.momorph/guidelines/frontend.md` (build Navigation Map → build Logic Map → cross-reference).

## Governance

This constitution supersedes all other conventions and team norms. In any conflict between this
document and an individual guideline file, this constitution takes precedence unless a specific
guideline is explicitly called out as an exception with justification.

**Amendment procedure**: Any amendment MUST be proposed as a PR with:
1. Updated constitution content with a version bump following semantic versioning rules.
2. A Sync Impact Report (HTML comment at top of file) listing all changes.
3. Updates to any affected template or guideline files.
4. Approval from at least one team lead before merging.

**Versioning policy**:
- MAJOR: Backward-incompatible governance/principle removals or redefinitions.
- MINOR: New principle or section added, or materially expanded guidance.
- PATCH: Clarifications, wording fixes, non-semantic refinements.

**Compliance review**: Every sprint retrospective SHOULD include a brief review of whether any
principle was found difficult to apply, and whether an amendment is warranted.

**Runtime guidance**: See `.momorph/guidelines/frontend.md` and `.momorph/guidelines/backend.md`
for detailed implementation guidance that extends (but does not override) this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-04-06 | **Last Amended**: 2026-04-06
