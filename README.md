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

This site follows WCAG 2.1 Level AA accessibility guidelines to ensure an inclusive experience for all users.

### Semantic HTML Headings

All pages use a logical heading hierarchy:
- **One `<h1>` per page**: The main page title (e.g., "BTARCET Architecture Team Site")
- **Headings follow sequential order**: Never skip levels (h1 → h2 → h3, not h1 → h3)
- **Descriptive heading text**: Clearly identifies the content section
- **Navigation landmark**: Use `<nav>` with appropriate labels for screen readers

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
- [ ] All interactive elements (links, buttons, form controls) are keyboard focusable
- [ ] Tab order follows logical reading order (left-to-right, top-to-bottom)
- [ ] Focus indicators are clearly visible (outline or custom styling)
- [ ] Skip link is provided to bypass navigation ("Skip to main content")
- [ ] No keyboard traps (users can tab away from all elements)

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
- [ ] Run automated accessibility checks (Lighthouse, axe DevTools)
- [ ] Verify color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Browser Support

- Last 2 versions of evergreen browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested on mobile, tablet, and desktop viewports
- Graceful degradation for older browsers

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `npm run build` succeeds
4. Ensure `npm run lint` passes
5. Ensure `npm run validate:sessions` passes if you modified session data
6. Submit a pull request

## License

Private project for BTARCET Architecture Team.
