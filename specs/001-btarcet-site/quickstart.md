# Quickstart — BTARCET Site (Next.js Static)

## Prerequisites
- Node.js 18+ (Node 20+ recommended)
- pnpm 8+ (recommended) or npm

## Setup
```bash
# Clone the repository
git clone https://github.com/Andy-Wall/btarcetsite.git
cd btarcetsite

# Install dependencies
pnpm install
# Or with npm:
# npm install
```

## Development
```bash
pnpm dev
# Or with npm:
# npm run dev
```
- Open http://localhost:3000
- Pages: Home (/), Sessions (/sessions), About (/about), FAQ (/faq)

## Build & Export
```bash
pnpm build
# Or with npm:
# npm run build
```
- Static site output to `out/` directory
- The build command automatically generates the static export

## Deploy (GitHub Pages)
- Automatic deployment via GitHub Actions when pushing to `001-btarcet-site` branch
- Uses pnpm for CI/CD workflows
- Or publish `out/` directory manually if needed

## Content
- Add session JSON files under `src/content/sessions/`
- Validate against `specs/001-btarcet-site/contracts/session.schema.json`
- Run validation: `pnpm validate:sessions` (or `npm run validate:sessions`)

## Notes
- `images.unoptimized: true` is required for static hosting in `next.config.ts`
- CSP (Content Security Policy) is configured in `src/app/layout.tsx`
- Skip link implemented for accessibility (hidden until focused)
- Project uses pnpm in CI/CD; both pnpm and npm work locally
