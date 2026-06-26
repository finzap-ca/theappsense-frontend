/**
 * Environment configuration.
 *
 * Validated and centralised so components never reach for `process.env`
 * directly or hard-code hostnames. Everything has a safe default so the site
 * builds and renders without any backend (headless WordPress) being present.
 */

/** Canonical, absolute site origin (no trailing slash). Used for metadata. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theappsense.com"
).replace(/\/$/, "");

/**
 * WPGraphQL endpoint. Optional today, content is hard-coded in `data/`.
 * When the headless WordPress backend is connected, set this in the
 * environment and the data-access layer in `lib/graphql` will use it.
 */
export const WORDPRESS_GRAPHQL_ENDPOINT =
  process.env.WORDPRESS_GRAPHQL_ENDPOINT ?? "http://theappsense-wp/graphql";

/** True once a WordPress GraphQL endpoint is configured. */
export const HAS_WORDPRESS = WORDPRESS_GRAPHQL_ENDPOINT.length > 0;

/** Optional Host header for internal proxy requests to WordPress. */
export const WORDPRESS_GRAPHQL_HOST_HEADER =
  process.env.WORDPRESS_GRAPHQL_HOST_HEADER ?? "wp.theappsense.com";


/** Build an absolute URL for a given path on the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Tawk.to live chat widget identifiers. */
export const TAWK_PROPERTY_ID =
  process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "66a568b032dca6db2cb69ea2";
export const TAWK_WIDGET_ID =
  process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "1i3r21sll";
export const HAS_TAWK = TAWK_PROPERTY_ID.length > 0 && TAWK_WIDGET_ID.length > 0;
