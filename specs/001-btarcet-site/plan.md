# Implementation Plan: BTARCET Architecture Team Site

**Branch**: `001-btarcet-site` | **Date**: 2025-12-14 | **Spec**: specs/001-btarcet-site/spec.md
**Input**: Feature specification from `/specs/001-btarcet-site/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a sleek, responsive static site for BTARCET with pages for Home (next upcoming board session), Sessions (Upcoming + History with per-session detail pages), About, FAQ, and 404. Use Next.js + TypeScript in static export mode with embedded mock data (12 sessions/year). Styling with Tailwind CSS will prioritize clean, modern visuals with fast load times and accessibility. Performance goals will be measured with Lighthouse (LCP/FCP) on the static export.

## Technical Context

**Language/Version**: TypeScript (Next.js 14+, Node 18+)  
**Primary Dependencies**: Next.js (App Router), React, Tailwind CSS  
**Storage**: N/A (mock data embedded in repo as JSON/MDX)  
**Testing**: Optional Playwright smoke tests; Lighthouse/axe automated a11y checks; manual acceptance  
**Target Platform**: Static export, hosted on GitHub Pages  
**Project Type**: web (static site)  
**Performance Goals**: Fast FCP/LCP (<2.0s on 4G), minimal JS payload (<150KB gz)  
**Constraints**: No runtime servers/backends; a11y baseline; evergreen browsers; responsive design  
**Scale/Scope**: ~5 top-level pages + 12 detail pages/year; single repo; single deployment

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on `btarcetsite/.specify/memory/constitution.md`:

- Static-only: PASS — Next.js static export (`output: 'export'`) produces pure HTML/CSS/JS.
- Build output exists: PASS — Next.js outputs `out/` (treated as `dist/`).
- Source structure: MINOR VARIANCE — `src/app` (Next.js) generates `index.html` at build; no physical `src/index.html`. Justified by framework pre-rendering.
- Accessibility baseline: PASS — enforce semantic headings, alt text, labels; manual checks.
- Routing: PASS — Home, Sessions, About, FAQ, and 404 pages; SPA routing gracefully falls back via static export.
- CI build: PASS — `npm run build && next export` required on PRs.
- Security: PASS — HTTPS-only resources; no secrets; basic CSP in `<head>`.
- Docs: PASS — `README.md` will include quick start, build, deploy.

Conclusion: Gates PASS with noted variance (documented in Complexity Tracking).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Home (next upcoming)
│   ├── sessions/
│   │   ├── page.tsx          # Sessions (Upcoming + History)
│   │   └── [id]/page.tsx     # Session Detail (static paths)
│   ├── about/page.tsx        # About
│   ├── faq/page.tsx          # FAQ
│   └── not-found.tsx         # 404
├── components/               # UI components (cards, layouts)
├── content/sessions/         # Mock data (JSON) for 12 sessions/year
├── styles/                   # Global styles & theme
public/                       # Static assets (logos, images)

tests/ (optional)
└── e2e/                      # Playwright smoke tests (if configured)

out/                          # Static export output (deployment artifact)
```

**Structure Decision**: Single static web app using Next.js App Router under `src/app`. Content embedded as JSON in `src/content/sessions`. Static export produces `out/` (treated as deployment `dist`). Optional Playwright tests in `tests/e2e`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Constitution: Physical `src/index.html` | Next.js pre-renders `index.html` at build | Using a raw `src/index.html` would forgo app routing and layouts |
| Constitution: `dist/` output naming | Next.js uses `out/` for `next export` | Renaming would break conventions; treat `out/` as `dist` |
