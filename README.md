# BTARCET Architecture Team Site

A modern, accessible static website for the BTARCET Architecture Team. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Andy-Wall/btarcetsite.git
   cd btarcetsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production-ready static export:

```bash
npm run build
```

This generates an optimized static site in the `out/` directory, ready for deployment.

## Deploy

The site is a static export that can be deployed to any static hosting service:

### GitHub Pages

1. Build the static site:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `out/` directory to your hosting provider.

### Other Static Hosts

The `out/` directory can be deployed to:
- Vercel
- Netlify
- AWS S3
- Any static file hosting service

Simply upload or sync the contents of the `out/` directory to your chosen platform.

## Project Structure

```
src/app/              # Next.js App Router pages
src/components/       # Reusable UI components
src/content/          # Mock data (JSON)
src/styles/           # Global styles and theme
public/               # Static assets
out/                  # Static export output (gitignored)
```

## Linting

Run the linter to check code quality:

```bash
npm run lint
```

## Validation

Validate session JSON files against the schema:

```bash
npm run validate:sessions
```

This validates all session files in `src/content/sessions/` against the JSON Schema defined in `specs/001-btarcet-site/contracts/session.schema.json`.

## Technology Stack

- **Framework**: Next.js 14+ (static export mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Target**: Static site (HTML/CSS/JS only)

## Accessibility

This site follows accessibility best practices:
- Semantic HTML headings
- Alt text for images
- Labels for form inputs
- Support for last two versions of evergreen browsers

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `npm run build` succeeds
4. Ensure `npm run lint` passes
5. Ensure `npm run validate:sessions` passes if you modified session data
6. Submit a pull request

## License

Private project for BTARCET Architecture Team.
