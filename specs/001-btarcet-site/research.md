# Phase 0 Research — BTARCET Site

**Goal**: Resolve all NEEDS CLARIFICATION items and document key decisions.
**Date**: 2025-12-14

## Decisions

### Styling System
- **Decision**: Tailwind CSS
- **Rationale**: Rapid iteration for a sleek, modern look; utility-first classes reduce bespoke CSS; good a11y patterns and responsive grid.
- **Alternatives considered**: CSS Modules (lower dependency, slower to reach polished look), Styled Components (runtime overhead), Vanilla CSS (more manual work for design system).

### Hosting Platform
- **Decision**: GitHub Pages (via static export)
- **Rationale**: Simple, low-cost, integrated with repo; works with `next export` output.
- **Alternatives considered**: Vercel (excellent Next.js support but dynamic features unused), Netlify (similar; overkill for simple static export).

### Next.js Version & Router
- **Decision**: Next.js 14+ App Router with `output: 'export'`
- **Rationale**: Modern file-based routing, layouts, static pre-rendering; stable for static sites.
- **Alternatives considered**: Pages Router (legacy), plain Vite/React (would re-create routing and structure), vanilla HTML (too manual for complex session detail pages).

### Image Optimization
- **Decision**: Use `next/image` with `images.unoptimized: true` for static export
- **Rationale**: Keeps Next.js image component patterns while disabling server transforms; pair with manual asset optimization.
- **Alternatives considered**: Plain `<img>` tags (simpler; acceptable), external optimization services (unnecessary for static site).

### Mock Data Format & Location
- **Decision**: JSON files under `src/content/sessions/`
- **Rationale**: Simple structure; supports static generation and JSON Schema validation.
- **Alternatives considered**: MDX (rich content but heavier and less structured for lists), YAML (human-friendly but less strict), CSV (not ideal for nested fields).

### Tests
- **Decision**: Optional Playwright smoke tests for critical flows (Home next session visible, Sessions ordering, Detail navigation)
- **Rationale**: Lightweight end-to-end validation; no unit tests required for static content.
- **Alternatives considered**: No tests (manual only), Jest unit tests (less value for static render).

## Open Items (Resolved)
- Styling: Tailwind chosen.
- Hosting: GitHub Pages chosen.
- Testing: Optional Playwright smoke tests.

## Implementation Notes
- Configure `next.config.ts` with `output: 'export'` and `images.unoptimized: true`.
- Place session JSON file(s) under `src/content/sessions/` and validate against contracts JSON Schema.
- Generate static paths for detail pages from mock data at build time.
