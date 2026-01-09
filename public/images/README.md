# Images Directory

This directory is for static images used throughout the site.

## Image Optimization Guidelines

Before adding images to this directory:

1. **Format Selection**:
   - Use WebP for photos and complex images (best compression)
   - Use SVG for logos, icons, and simple graphics (scalable)
   - Use PNG for images requiring transparency
   - Avoid JPEG unless WebP is not supported

2. **Size Optimization**:
   - Resize images to the maximum display size needed
   - Compress images using tools like ImageOptim, Squoosh, or TinyPNG
   - Target < 100KB per image for fast loading

3. **Responsive Images**:
   - Provide multiple sizes for different screen resolutions
   - Use Next.js Image component for automatic optimization
   - Consider 1x, 2x, and 3x versions for high-DPI displays

4. **Naming Convention**:
   - Use descriptive, lowercase names with hyphens
   - Example: `team-photo-2026.webp`, `logo-dark.svg`

5. **Alt Text**:
   - Always provide meaningful alt text in the Image component
   - Describe the content and purpose of the image
   - Use empty alt="" for purely decorative images
