# BTARCET Architecture Team Site

A modern, accessible static website for the BTARCET Architecture Team. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌐 Live Site

The BTARCET site is deployed and accessible at:

**[https://silver-adventure-qm6273j.pages.github.io](https://silver-adventure-qm6273j.pages.github.io)**

Visit the live site to explore:
- Upcoming and past architecture sessions
- Team information and mission
- Frequently asked questions
- Session details and speaker information

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

The site is automatically deployed to GitHub Pages and is accessible at:

**Live URL:** [https://silver-adventure-qm6273j.pages.github.io](https://silver-adventure-qm6273j.pages.github.io)

> **Note**: This is GitHub's deployment URL for this repository. The site should be accessible after a successful deployment. If you encounter a "page not available" message, please check the [Actions tab](https://github.com/Andy-Wall/btarcetsite/actions) to verify the latest deployment was successful.

**Automatic Deployment:**
- Push to `001-btarcet-site` branch triggers the deployment workflow
- The workflow builds the static site and deploys the `out/` directory to GitHub Pages
- After deployment completes (usually 1-2 minutes), changes are live at the URL above
- End-to-end tests automatically run after deployment to verify the site is working correctly

**Manual Deployment:**
- Navigate to the [Actions tab](https://github.com/Andy-Wall/btarcetsite/actions) in the repository
- Select the "Deploy to GitHub Pages" workflow
- Click "Run workflow" to manually trigger a deployment
- Monitor the workflow progress and check the live site once complete

**Viewing Deployment Status:**
- Go to the [Actions tab](https://github.com/Andy-Wall/btarcetsite/actions) to see deployment history
- Green checkmarks indicate successful deployments
- Red X marks indicate failed deployments (check logs for details)
- The "E2E Tests on GitHub Pages" workflow runs after each deployment to verify functionality

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

## Smoke Tests

Run Playwright smoke tests to verify core functionality:

```bash
pnpm test
# Or with npm:
# npm run test
```

The smoke tests verify:
- **Home page next session**: Displays the next upcoming session or appropriate message
- **Sessions page partition**: Correctly separates upcoming and history sessions
- **Sessions page sorting**: Upcoming sessions sorted earliest first, history sessions sorted most recent first
- **Detail navigation**: Session cards navigate to detail pages correctly
- **Detail page content**: Session detail pages display complete information

The Playwright tests automatically start the dev server, run the tests, and shut down the server. For debugging:

```bash
# Run tests with UI mode
pnpm test:ui
# Or with npm:
# npm run test:ui

# Run tests in debug mode
pnpm test:debug
# Or with npm:
# npm run test:debug
```

## End-to-End Tests

Run Playwright end-to-end tests against the deployed GitHub Pages site:

```bash
pnpm test:e2e
# Or with npm:
# npm run test:e2e
```

The end-to-end tests verify the production deployment at [https://silver-adventure-qm6273j.pages.github.io](https://silver-adventure-qm6273j.pages.github.io) is working correctly:

- **Deployment verification**: All pages load successfully (home, sessions, about, FAQ, 404)
- **Navigation**: Links work correctly between pages and to session details
- **Static assets**: CSS and JavaScript load and function properly
- **Performance**: Pages load in reasonable time with proper caching
- **Accessibility**: Proper document structure, skip links, and keyboard navigation
- **Cross-browser**: Tests run on Chromium, Firefox, and WebKit

These tests run automatically after each deployment via GitHub Actions and can also be triggered manually. For debugging:

```bash
# Run e2e tests with UI mode
pnpm test:e2e:ui
# Or with npm:
# npm run test:e2e:ui

# Run e2e tests in debug mode
pnpm test:e2e:debug
# Or with npm:
# npm run test:e2e:debug
```

**Testing against a different URL:**

You can test against a different deployed URL by setting the `DEPLOYED_URL` environment variable:

```bash
DEPLOYED_URL=https://your-custom-domain.com pnpm test:e2e
```


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

#### Build Size

Based on the latest production build:

- **Total Build Size**: ~1.4 MB (uncompressed)
  - HTML: ~294 KB across all pages
  - JavaScript: ~684 KB (includes React, Next.js framework)
  - CSS: ~15 KB (Tailwind CSS, purged)
- **First Load JS**: ~87.4 KB (shared across pages)
- **Largest Page**: `/sessions` at 96.2 KB First Load JS

#### Lighthouse CI Results

Measured on static export (`out/` directory) using Lighthouse CI:

**Desktop Performance** (3 runs per page, averaged):
- **Performance Score**: 100/100 ✅
- **LCP (Largest Contentful Paint)**: 0.44s ✅ (Target: < 2.5s)
- **FCP (First Contentful Paint)**: 0.21s ✅ (Target: < 2.0s)
- **TTI (Time to Interactive)**: 0.44s ✅ (Target: < 3.5s)

**Mobile Performance** (3 runs per page, averaged):
- **Performance Score**: 100/100 ✅
- **LCP (Largest Contentful Paint)**: 1.71s ✅ (Target: < 2.5s)
- **FCP (First Contentful Paint)**: 0.76s ✅ (Target: < 2.0s)
- **TTI (Time to Interactive)**: 1.72s ✅ (Target: < 3.5s)

All pages tested: Home (`/`), Sessions (`/sessions`), About (`/about`), FAQ (`/faq`), 404

**Status**: ✅ All performance goals exceeded. The site delivers excellent Core Web Vitals on both desktop and mobile.

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

# Run audit on built site (uses lighthouserc.js config)
pnpm build
# Or: npm run build
npx lhci autorun

# Or run manually with options
npx lhci autorun --collect.staticDistDir=./out --collect.numberOfRuns=3
```

The repository includes a `lighthouserc.js` configuration file with performance budgets:
- Performance Score: ≥ 90/100
- FCP (First Contentful Paint): < 2.0s
- LCP (Largest Contentful Paint): < 2.5s
- TTI (Time to Interactive): < 3.5s
- CLS (Cumulative Layout Shift): < 0.1

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
6. Ensure `pnpm test` passes (or `npm run test`)
7. Submit a pull request

## License

Private project for BTARCET Architecture Team.


