/* Prefixes an internal path with Astro's configured base path (import.meta.env.BASE_URL),
   so links and asset references keep working whether the site is deployed at the
   domain root or under a subpath (e.g. GitHub Pages at /ctechwebsite).
   BASE_URL's trailing slash isn't guaranteed (it mirrors whatever `base` is set to
   in astro.config.mjs, trailing slash or not), so this normalizes both sides itself
   rather than assuming one. */
export function withBase(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
