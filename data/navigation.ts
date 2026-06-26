import { services } from "@/data/services";

/**
 * Site navigation.
 *
 * Hosting is the primary product, so it sits at the top level. The remaining
 * WordPress work is grouped under a categorised "WordPress Services" menu.
 * Built from the service catalogue so the menu and pages never drift apart.
 * CMS-managed later (WordPress menus).
 */

export interface NavChild {
  label: string;
  href: string;
  /** Short hint shown in the desktop dropdown. */
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Categorised groups for a mega-style dropdown. */
  groups?: NavGroup[];
}

const bySlug = (slug: string): NavChild => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service slug in navigation: ${slug}`);
  return { label: s.navLabel, href: `/services/${s.slug}`, description: s.tagline };
};

export const HOSTING_HREF = "/services/managed-wordpress-hosting";

/** Grouped WordPress services (everything except hosting itself). */
export const wordpressServiceGroups: NavGroup[] = [
  {
    title: "Care & Security",
    links: [
      bySlug("wordpress-support"),
      bySlug("website-maintenance"),
      bySlug("malware-removal"),
      bySlug("speed-optimization"),
    ],
  },
  {
    title: "Design & Development",
    links: [
      bySlug("wordpress-development"),
      bySlug("web-development"),
      bySlug("ecommerce"),
    ],
  },
];

export const primaryNav: NavItem[] = [
  { label: "Managed Hosting", href: HOSTING_HREF },
  { label: "Services", href: "/services", groups: wordpressServiceGroups },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns. Kept lean and categorised, not a sitemap dump. */
export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Hosting",
    links: [
      { label: "Managed WordPress Hosting", href: HOSTING_HREF },
      { label: "Hosting plans", href: `${HOSTING_HREF}#pricing` },
      { label: "Free migration", href: HOSTING_HREF },
    ],
  },
  {
    title: "WordPress Services",
    links: [
      bySlug("website-maintenance"),
      bySlug("malware-removal"),
      bySlug("speed-optimization"),
      bySlug("wordpress-development"),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our work", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "See hosting plans", href: `${HOSTING_HREF}#pricing` },
      { label: "Get help with my site", href: "/get-started" },
      { label: "Fix a hacked site", href: "/get-started?intent=malware" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
];

/** Primary CTA in the header: funnels to the hosting product. */
export const primaryCta = { label: "See hosting plans", href: `${HOSTING_HREF}#pricing` };

/** Contextual conversion CTA used on service pages and closing CTA bands. */
export const contactCta = { label: "Request a quote", href: "/contact" };
