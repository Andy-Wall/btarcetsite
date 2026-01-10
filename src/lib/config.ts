/**
 * Application Configuration
 * 
 * Centralized configuration for the application including GitHub Pages basePath.
 */

/**
 * Base path for GitHub Pages deployment
 * This must match the repository name for project sites
 */
export const BASE_PATH = '/btarcetsite';

/**
 * Helper function to prefix paths with basePath
 * Use this for all Link href values to ensure correct routing
 */
export function withBasePath(path: string): string {
  // Don't add basePath if it's already there
  if (path.startsWith(BASE_PATH)) {
    return path;
  }
  
  // Ensure the path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${BASE_PATH}${normalizedPath}`;
}
