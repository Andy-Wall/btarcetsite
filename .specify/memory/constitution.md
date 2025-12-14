<!--
Sync Impact Report
- Version change: 0.0.0 → 0.1.0 (MINOR)
- Modified principles: n/a (all newly defined)
- Added sections: Core Principles, Constraints, Workflow, Governance
- Removed sections: none
- Templates requiring updates:
	✅ .specify/templates/plan-template.md (Constitution Check references this file generically)
	✅ .specify/templates/spec-template.md (no conflicting references)
	✅ .specify/templates/tasks-template.md (path conventions align with static app)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): original adoption date unknown; set when known
-->

# btarcetsite Constitution

## Core Principles

### I. Static-First Simplicity (NON-NEGOTIABLE)
The site is a static web app: HTML/CSS/JS only. No server-side
code, databases, or runtime backends. Client-side enhancements
must be progressive and optional.

### II. Minimal Structure & Build
Source lives in `src/` with `src/index.html` and `src/404.html`.
Optional `public/` for assets copied verbatim. A build produces
`dist/` via `npm run build`, minifying CSS/JS and optimizing images.

Framework allowance:
- Framework-generated `index.html` at build time is acceptable (e.g., Next.js pre-render).
- When a framework outputs a static export directory named `out/`, treat it as equivalent to `dist/` for deployment and CI.

### III. Accessibility & Performance Baseline
Pages MUST use semantic headings, alt text for images, and labels
for inputs. Production builds MUST minify assets and serve optimized
images. Last-two evergreen browsers MUST be supported.

### IV. Routing & Deployment
Root routing serves `index.html`. If SPA routing is used, requests
MUST gracefully fall back to `index.html`. A `404.html` MUST be
present. Deploy `dist/` to a static host with caching headers.

Framework allowance:
- If a framework produces `index.html` during build, a physical `src/index.html` is not required.
- Static export artifacts (e.g., `out/`) MAY be deployed directly when recognized as the build output.

### V. CI/CD & Reviews
`npm run build` MUST succeed on PRs. A basic GitHub Actions workflow
MUST build on pushes and PRs. Changes to `src/` and build scripts
MUST receive at least one review before merge.

## Constraints & Security Requirements

- HTTPS-only resources; no mixed content.
- No secrets in source; no inline credentials.
- Include a basic Content Security Policy in `index.html`.
- Use `.editorconfig` for consistent whitespace and `.gitignore` to
	exclude `node_modules/` and `dist/`.

## Development Workflow & Quality Gates

- Default branch: `main`.
- Required gates on PRs: lint passes (if configured), build succeeds,
	accessibility checklist satisfied (headings, alt text, form labels).
- `README.md` MUST document quick start, build, and deploy steps.

## Governance

- This constitution supersedes other practices for the static site.
- Amendments require documentation in PR description and reviewer
	approval. Material additions trigger MINOR version bump; removals or
	redefinitions trigger MAJOR.
- Compliance checks: reviewers verify principles and gates on each PR.
- Versioning policy: Semantic Versioning for the constitution text.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2025-12-14
