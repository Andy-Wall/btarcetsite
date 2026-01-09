# BTARCET Architecture Team Site

A modern, accessible static website for the BTARCET Architecture Team. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- pnpm 8+ (recommended) or npm

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Andy-Wall/btarcetsite.git
   cd btarcetsite
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # Or with npm:
   # npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # Or with npm:
   # npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production-ready static export:

```bash
pnpm build
# Or with npm:
# npm run build
```

This generates an optimized static site in the `out/` directory, ready for deployment.

## Deploy

The site is a static export that can be deployed to any static hosting service:

### GitHub Pages

The site automatically deploys to GitHub Pages when changes are pushed to the `001-btarcet-site` branch.

**Automatic Deployment:**
- Push to `001-btarcet-site` branch triggers the deployment workflow
- The workflow builds the static site and deploys the `out/` directory to GitHub Pages
- View the live site at your GitHub Pages URL

**Manual Deployment:**
- Navigate to the Actions tab in your repository
- Select the "Deploy to GitHub Pages" workflow
- Click "Run workflow" to manually trigger a deployment

**Local Build and Deploy:**
1. Build the static site:
   ```bash
   pnpm build
   # Or with npm:
   # npm run build
   ```

2. The `out/` directory contains the static site ready for deployment

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
pnpm lint
# Or with npm:
# npm run lint
```

## Validation

Validate session JSON files against the schema:

```bash
pnpm validate:sessions
# Or with npm:
# npm run validate:sessions
```

This validates all session files in `src/content/sessions/` against the JSON Schema defined in `specs/001-btarcet-site/contracts/session.schema.json`.

## Accessibility Testing

Run automated accessibility checks on all pages:

```bash
pnpm check:a11y
# Or with npm:
# npm run check:a11y
```

This runs axe-core accessibility checks on the following pages:
- Home (`/`)
- Sessions (`/sessions`)
- Session Detail (`/sessions/[id]`)
- About (`/about`)
- FAQ (`/faq`)

The checks verify WCAG 2.1 Level AA compliance. The dev server must be running (`pnpm dev` or `npm run dev`) before running the accessibility checks.


## Technology Stack

- **Framework**: Next.js 14+ (static export mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Target**: Static site (HTML/CSS/JS only)

## Accessibility

This site follows WCAG 2.1 Level AA accessibility guidelines to ensure an inclusive experience for all users.

### Semantic HTML Headings

All pages use a logical heading hierarchy:
- **One `<h1>` per page**: The main page title (e.g., "BTARCET Architecture Team Site")
- **Headings follow sequential order**: Never skip levels (h1 → h2 → h3, not h1 → h3)
- **Descriptive heading text**: Clearly identifies the content section
- **Navigation landmark**: Use `<nav>` with `aria-label` for screen readers (e.g., `<nav aria-label="Main navigation">`)

Example heading structure:
```
h1: Page Title
  h2: Main Section
    h3: Subsection
    h3: Subsection
  h2: Another Section
```

### Alt Text for Images

All images must include meaningful alternative text:
- **Decorative images**: Use empty alt attribute (`alt=""`) so screen readers skip them
- **Informative images**: Describe the content/function (e.g., `alt="System architecture diagram"`)
- **Functional images**: Describe the action (e.g., `alt="Download session slides"`)
- **Complex images**: Provide detailed description in surrounding text or with `aria-describedby`
- **Avoid redundancy**: Don't include "image of" or "picture of" in alt text

### Labels for Form Inputs

All form controls must have associated labels:
- **Use `<label>` elements**: Associate with `for` attribute or wrap the input
- **Required fields**: Indicate with `aria-required="true"` and visible indicator (*)
- **Error messages**: Use `aria-invalid` and `aria-describedby` for validation errors
- **Placeholder text**: Never use as a replacement for labels
- **Button text**: Use descriptive text (e.g., "Submit feedback" not just "Submit")

### Keyboard Navigation Checklist

All interactive elements must be keyboard accessible:

#### Focus Management
- [x] All interactive elements (links, buttons, form controls) are keyboard focusable
- [x] Tab order follows logical reading order (left-to-right, top-to-bottom)
- [x] Focus indicators are clearly visible (outline or custom styling)
- [x] Skip link is the first focusable element, hidden until focused, to bypass navigation ("Skip to main content")
- [x] No keyboard traps (users can tab away from all elements)

#### Keyboard Shortcuts
- [ ] **Tab**: Move focus forward through interactive elements
- [ ] **Shift+Tab**: Move focus backward
- [ ] **Enter**: Activate buttons and links
- [ ] **Space**: Activate buttons and toggle checkboxes
- [ ] **Arrow keys**: Navigate within custom components (menus, tabs, etc.)
- [ ] **Escape**: Close modals, dropdowns, and overlays

#### Interactive Components
- [ ] Modals/dialogs trap focus until closed
- [ ] Dropdown menus are navigable with arrow keys
- [ ] Custom components use appropriate ARIA roles and states
- [ ] Form validation messages are announced to screen readers

#### Testing
- [ ] Test all pages with keyboard only (unplug mouse)
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [x] Run automated accessibility checks (Lighthouse, axe DevTools) - use `pnpm check:a11y`
- [ ] Verify color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Browser Support

- Last 2 versions of evergreen browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested on mobile, tablet, and desktop viewports
- Graceful degradation for older browsers

## Performance

This site is optimized for fast loading and excellent user experience. We follow performance best practices and continuously monitor Core Web Vitals.

### Performance Goals

Our target metrics align with Google's Core Web Vitals and industry best practices for static sites:

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP (Largest Contentful Paint)** | < 2.5s | Main content visible quickly |
| **FID (First Input Delay)** | < 100ms | Interactive immediately |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Stable visual layout |
| **FCP (First Contentful Paint)** | < 1.8s | Initial content renders fast |
| **TTI (Time to Interactive)** | < 3.5s | Fully interactive quickly |
| **Total Bundle Size** | < 200KB (gzipped) | Fast downloads on slow networks |
| **Page Load Time** | < 3s (3G) | Works on mobile networks |

### Current Performance Metrics

Based on the latest production build:

- **Total Build Size**: ~1.4 MB (uncompressed)
  - HTML: ~294 KB across all pages
  - JavaScript: ~684 KB (includes React, Next.js framework)
  - CSS: ~15 KB (Tailwind CSS, purged)
- **First Load JS**: ~87.4 KB (shared across pages)
- **Largest Page**: `/sessions` at 96.2 KB First Load JS

### Performance Optimization Strategies

#### 1. Code Splitting
- Next.js automatically code-splits by route
- Each page loads only the JavaScript it needs
- Shared chunks are cached across page navigations

#### 2. Static Generation
- All pages pre-rendered at build time (`output: 'export'`)
- Zero server-side processing overhead
- Can be served from CDN for global performance

#### 3. CSS Optimization
- Tailwind CSS with production purge enabled
- Unused styles removed automatically
- Critical CSS inlined for faster FCP

#### 4. Image Optimization

**Current Status**: No images in the project yet.

**When adding images**, follow these guidelines:

- **Use Next.js Image Component**: Even with `unoptimized: true`, it provides layout stability and lazy loading
- **Pre-optimize Images**: Since static export mode disables automatic optimization, manually optimize images before adding them:
  - Compress with tools like Squoosh, ImageOptim, or TinyPNG
  - Use WebP format for photos (best compression)
  - Use SVG for logos and icons (scalable, small file size)
  - Target < 100KB per image
- **Responsive Images**: Provide appropriate sizes for different screen resolutions
- **Lazy Loading**: Images below the fold load only when needed
- **Alt Text**: Always include meaningful alt text for accessibility

Example usage:
```tsx
import Image from 'next/image';

<Image
  src="/images/team-photo.webp"
  alt="BTARCET Architecture Team at annual conference"
  width={800}
  height={600}
  loading="lazy"
/>
```

See `public/images/README.md` for detailed image optimization guidelines.

#### 5. Font Optimization
- System fonts used by default (no web font loading)
- Future web fonts should use `next/font` for automatic optimization

#### 6. Asset Caching
- Static assets include content hashes in filenames
- Enables aggressive caching (immutable, long max-age)
- Changes result in new filenames, automatic cache busting

### Performance Testing

Run performance audits regularly using these tools:

#### Lighthouse CI
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit on built site
pnpm build
# Or: npm run build
npx lhci autorun --collect.staticDistDir=./out
```

#### WebPageTest
Test from multiple locations and connection speeds:
1. Build the site: `pnpm build` (or `npm run build`)
2. Deploy to staging/production
3. Run test at https://www.webpagetest.org/

#### Chrome DevTools
1. Build and serve locally: `pnpm build && npx serve out` (or with npm)
2. Open Chrome DevTools → Lighthouse tab
3. Run audit with "Desktop" and "Mobile" profiles

### Performance Budget

We enforce the following performance budget to prevent regression:

- **JavaScript Budget**: 200 KB (gzipped) per page
- **CSS Budget**: 50 KB (gzipped) total
- **Image Budget**: 500 KB (compressed) per page
- **Total Page Weight**: 1 MB (uncompressed) per page

Monitor bundle size on every build:
```bash
pnpm build
# Or: npm run build
# Check "Route (app)" output for First Load JS per page
```

### Performance Monitoring

For production deployments, consider implementing:

- **Real User Monitoring (RUM)**: Track actual user experience metrics
- **Synthetic Monitoring**: Automated performance tests from multiple locations
- **Core Web Vitals Tracking**: Monitor LCP, FID, CLS in production

### Troubleshooting Slow Performance

If performance degrades:

1. **Check Bundle Size**: Run `pnpm build` (or `npm run build`) and review the route table
2. **Analyze Dependencies**: Use `@next/bundle-analyzer` to identify large dependencies
3. **Audit Images**: Ensure all images are optimized and appropriately sized
4. **Review Code Splitting**: Verify dynamic imports for large components
5. **Test Network Conditions**: Simulate 3G/4G speeds in Chrome DevTools

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `pnpm build` succeeds (or `npm run build`)
4. Ensure `pnpm lint` passes (or `npm run lint`)
5. Ensure `pnpm validate:sessions` passes if you modified session data (or `npm run validate:sessions`)
6. Submit a pull request

## License

Private project for BTARCET Architecture Team.


