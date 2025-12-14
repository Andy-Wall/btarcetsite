# Quickstart — BTARCET Site (Next.js Static)

## Prerequisites
- Node.js 18+
- pnpm or npm

## Setup
```bash
pnpm create next-app btarcet-site --ts --src-dir --app --eslint --tailwind
cd btarcet-site
# Configure static export
# next.config.ts: export default { output: 'export', images: { unoptimized: true } }
```

## Development
```bash
pnpm dev
```
- Open http://localhost:3000
- Pages: Home (/), Sessions (/sessions), About (/about), FAQ (/faq)

## Build & Export
```bash
pnpm build
pnpm export  # outputs to out/
```

## Deploy (GitHub Pages)
- Commit `out/` to deployment branch via GitHub Actions (recommended)
- Or publish manually if needed

## Content
- Add session JSON files under `src/content/sessions/`
- Validate against `specs/001-btarcet-site/contracts/session.schema.json`

## Notes
- `images.unoptimized: true` is required for static hosting
- Basic CSP should be added to `<head>` to align with the constitution
