---

description: "Task list for BTARCET static site implementation"
---

# Tasks: BTARCET Architecture Team Site

**Input**: Design documents from `/specs/001-btarcet-site/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL. Include Playwright smoke tests only if we choose to add them.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js project with TypeScript and Tailwind in repo root
- [x] T002 Configure `next.config.ts` with `output: 'export'` and `images.unoptimized: true`
- [x] T003 [P] Add base files: `.editorconfig`, `.gitignore` (exclude `node_modules/`, `out/`), `README.md`
- [x] T004 [P] Set up global layout and theme in `src/app/(site)/layout.tsx` and `src/styles/globals.css`
- [x] T005 Configure GitHub Actions workflow to build and export static site (artifact from `out/`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create mock data folder `src/content/sessions/` and seed JSON for 12 sessions
- [x] T007 [P] Validate mock data against `specs/001-btarcet-site/contracts/session.schema.json`
- [x] T008 [P] Implement data loader utilities in `src/lib/sessions.ts` (read JSON, partition upcoming/history, sort)
- [x] T009 Add basic CSP meta tags in `src/app/(site)/head.tsx`
- [x] T010 Ensure a11y baseline (semantic headings, alt text, keyboard focus) documented in `README.md`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 — Discover the Next BTARCET Board Session (Priority: P1) 🎯 MVP

**Goal**: Show the next upcoming session prominently on the landing page

**Independent Test**: Open `/` and confirm closest future session is shown with title, date/time, summary

### Implementation for User Story 1

- [x] T011 [P] [US1] Create Home page `src/app/page.tsx` rendering next upcoming session
- [x] T012 [P] [US1] Build `SessionCard` component in `src/components/SessionCard.tsx`
- [x] T013 [US1] Wire data loader to Home; fallback message if no upcoming sessions
- [x] T014 [US1] Add responsive styles and a11y checks (headings, alt text)

**Checkpoint**: User Story 1 functional and testable independently

---

## Phase 4: User Story 2 — Browse BTARCET Sessions (Priority: P2)

**Goal**: Sessions page with Upcoming and History lists, each linking to details

**Independent Test**: Open `/sessions` and verify upcoming ascending and history descending order; click-through to details

### Implementation for User Story 2

- [x] T015 [P] [US2] Create Sessions page `src/app/sessions/page.tsx` with two sections
- [x] T016 [P] [US2] Build `SessionList` component in `src/components/SessionList.tsx`
- [x] T017 [US2] Implement static params generation for `/sessions/[id]/page.tsx`
- [x] T018 [US2] Create Session Detail page `src/app/sessions/[id]/page.tsx` with title, date/time, description, speakers, resources
- [x] T019 [US2] Ensure lists sort correctly and are accessible (section headings, list semantics)

**Checkpoint**: User Stories 1 AND 2 work independently

---

## Phase 5: User Story 3 — About & FAQ (Priority: P3)

**Goal**: Provide About and FAQ pages with accessible, responsive content

**Independent Test**: Navigate to `/about` and `/faq`; verify content renders properly and is accessible

### Implementation for User Story 3

- [x] T020 [P] [US3] Create About page at `src/app/about/page.tsx`
- [x] T021 [P] [US3] Create FAQ page at `src/app/faq/page.tsx`
- [x] T022 [US3] Add global navigation links to Home, Sessions, About, FAQ in `src/app/(site)/layout.tsx`

**Checkpoint**: All user stories now independently functional

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple stories

- [x] T023 [P] Add 404 page `src/app/not-found.tsx` with helpful links
- [x] T024 Optimize images and verify performance goals (LCP/FCP) documented in `README.md`
- [x] T025 [P] Add GitHub Actions deployment to GitHub Pages from `out/`
- [x] T026 Security hardening review (HTTPS-only links, no secrets) per constitution
- [x] T027 Documentation updates for quickstart and a11y checklist
- [x] T028 [P] A11y automated checks (axe/Lighthouse) for `/`, `/sessions`, `/sessions/[id]`, `/about`, `/faq`
- [x] T029 [P] Playwright smoke tests: Home next session visible; Sessions partition + sort; details navigation
- [x] T030 Measure performance (LCP/FCP) on static export via Lighthouse CI; capture results in `README.md`
- [x] T031 Perform end to end tests on the deployed GitHub Pages and add instructions how to navigate to the BTARCET Site in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion; proceed in priority order or parallel
- **Polish (Final Phase)**: Depends on targeted user stories being complete

### User Story Dependencies

- **US1 (P1)**: Independent after foundational
- **US2 (P2)**: Independent after foundational; links to detail pages generated from mock data
- **US3 (P3)**: Independent after foundational; depends only on global navigation

### Within Each User Story

- Models/content before pages
- Pages before navigation
- Core implementation before polish

### Parallel Opportunities

- [P] tasks across Setup and Foundational
- US1/US2/US3 can be developed in parallel once foundational is done
- Component work (cards, lists) can proceed in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate Home page with mock data; demo

### Incremental Delivery

1. Add User Story 2 → Test independently → Demo
2. Add User Story 3 → Test independently → Demo
3. Polish & deploy

