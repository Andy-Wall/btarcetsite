import type { NextConfig } from 'next';

/**
 * Next.js Configuration for BTARCET Static Site
 * 
 * This configuration enables static HTML export for deployment to static hosting
 * platforms like GitHub Pages. The site will be pre-rendered at build time with
 * no server-side runtime required.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
const nextConfig: NextConfig = {
  /**
   * Output Mode: Static Export
   * 
   * Generates a fully static site with HTML/CSS/JS files that can be served
   * from any static hosting provider. All pages are pre-rendered at build time.
   * 
   * Note: This disables features that require a Node.js server:
   * - Image Optimization API
   * - Incremental Static Regeneration
   * - Server-side rendering
   * - API routes
   */
  output: 'export',

  /**
   * Image Optimization: Disabled
   * 
   * The Next.js Image Optimization API requires a server runtime, which is not
   * available in static export mode. Setting this to true allows the use of
   * next/image components while serving unoptimized images.
   * 
   * Images will be served as-is without automatic optimization, resizing, or
   * format conversion. Consider pre-optimizing images before adding them to
   * the project.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
