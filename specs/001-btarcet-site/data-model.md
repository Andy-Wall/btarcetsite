# Phase 1 — Data Model

**Feature**: BTARCET Architecture Team Site
**Date**: 2025-12-14

## Entities

### Session
- `id`: string (slug or UUID)
- `title`: string
- `startDateTime`: string (ISO 8601)
- `durationMinutes`: number (optional)
- `summary`: string (optional)
- `description`: string (optional)
- `speakers`: Speaker[]
- `resources`: SessionResource[]
- `tags`: string[] (optional)
- Derived: `status` (upcoming/past based on current date at build time, and client confirmation)

### Speaker
- `name`: string
- `roleOrTitle`: string (optional)
- `organization`: string (optional)

### SessionResource
- `label`: string
- `url`: string

## Relationships
- A `Session` has many `Speaker`s and many `SessionResource`s.
- All content is embedded and versioned within the repository.

## Validation Rules
- `title` required; non-empty
- `startDateTime` must be valid ISO 8601; includes timezone or assumes CET with explicit label
- `resources.url` must be absolute HTTPS URLs
- `speakers.name` required; non-empty

## State Transitions
- `upcoming` → `past` when `startDateTime` is earlier than now
- Partition for listing occurs at runtime in client and at build for static pages
