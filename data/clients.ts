/**
 * Clients we host and look after.
 *
 * Social proof framed as relationships (who we host & support), not a build
 * portfolio. Real businesses from TheAppSense's history; described
 * qualitatively, no invented statistics. CMS-managed later (WordPress "Client"
 * post type).
 */

export interface Client {
  slug: string;
  name: string;
  /** Industry / what they do. */
  category: string;
  /** One line on what we do for them (the relationship, not a build brief). */
  summary: string;
  /** Service tags shown as chips. */
  services: string[];
}

export const clients: Client[] = [
  {
    slug: "jt-pickfords",
    name: "JT Pickfords",
    category: "E-commerce · Bathroomware",
    summary:
      "We host and look after JT Pickfords' WooCommerce store, keeping it fast, secure, and online so the team can focus on selling.",
    services: ["Managed Hosting", "E-commerce & WooCommerce"],
  },
  {
    slug: "jameson-knight",
    name: "Jameson Knight",
    category: "Real estate · Property platform",
    summary:
      "We built Jameson Knight's property platform and keep it updated, backed up, and secure as the business grows.",
    services: ["WordPress Development", "Website Care & Maintenance"],
  },
  {
    slug: "fashom",
    name: "Fashom",
    category: "Fashion · Online platform",
    summary:
      "We support Fashom's online platform with reliable hosting and ongoing care, so it stays available when shoppers arrive.",
    services: ["Managed Hosting", "E-commerce & WooCommerce"],
  },
  {
    slug: "orocrm",
    name: "OroCRM",
    category: "Business systems · CRM",
    summary:
      "We tailored and continue to maintain a CRM that fits how the team actually works, rather than forcing them around the tool.",
    services: ["Custom Web Development", "Website Care & Maintenance"],
  },
  {
    slug: "nicole-azzopardi",
    name: "Nicole Azzopardi",
    category: "Personal site · Musician",
    summary:
      "We host and maintain a fast, distinctive single-page site, keeping it quick to load and trouble-free.",
    services: ["Managed Hosting", "WordPress Development"],
  },
  {
    slug: "clockwork-pie",
    name: "Clockwork Pie",
    category: "Marketing site · Startup",
    summary:
      "We built and host Clockwork Pie's marketing site, handling the updates and security so the founders don't have to.",
    services: ["WordPress Development", "Managed Hosting"],
  },
];
