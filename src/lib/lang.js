/**
 * The directory is English-first; the rest of the site stays Spanish.
 * @param {string} pathWithQuery
 */
export function langFor(pathWithQuery) {
  const path = pathWithQuery.split('?')[0];
  if (path.startsWith('/es/')) return 'es';
  if (path === '/directory' || path.startsWith('/en') || path === '/guide')
    return 'en';
  return 'es';
}
