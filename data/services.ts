import {
  Code2,
  LayoutTemplate,
  ShoppingCart,
  Server,
  ShieldCheck,
  Bug,
  Gauge,
  Wrench,
  RefreshCw,
  Plug,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { type IntakeIntent } from "@/data/intake";

/**
 * Service catalogue, the spine of the site.
 *
 * Drives the services overview, every service detail page, related-service
 * links, and the homepage service grid. CMS-managed later (one WordPress
 * "Service" post type); the field names below map cleanly onto WPGraphQL.
 *
 * Content is rewritten from the existing TheAppSense offering. The only price
 * stated anywhere is the verified one-time $99 malware-removal fix.
 */

export interface ServiceFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceIssue {
  /** Optional status/error code shown as a chip, e.g. "HTTP 500". */
  code?: string;
  /** The error or symptom as a visitor would recognise it. */
  title: string;
  /** Plain-language cause / what it usually means. */
  description: string;
  /** Highlight as a site-down emergency. */
  emergency?: boolean;
}

export interface PricingPlan {
  name: string;
  /** For-this-audience one-liner. */
  tagline: string;
  /** Display price, e.g. "$24.99" or "Custom". */
  price: string;
  /** Billing cadence suffix, e.g. "/mo". Omit for custom plans. */
  period?: string;
  /** Secondary line, e.g. annual pricing or a note. */
  note?: string;
  features: string[];
  cta: { label: string; href: string };
  /** Visually emphasise this plan + show the badge text. */
  highlighted?: boolean;
  badge?: string;
}

export interface Service {
  slug: string;
  /** Short label for nav + cards. */
  navLabel: string;
  /** Full service name. */
  title: string;
  icon: LucideIcon;
  /** One-line positioning used on cards and the overview page. */
  tagline: string;
  /** 1 to 2 sentence plain-language summary. */
  summary: string;
  /** Who this is for / the search intent in one phrase. */
  audience: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subhead: string };
  /** The client problem this service solves. */
  problem: { heading: string; body: string };
  /** Outcome-focused benefit bullets. */
  outcomes: string[];
  /** What's included / how we deliver. */
  features: ServiceFeature[];
  /** How the engagement runs. */
  process: ServiceProcessStep[];
  /** Optional headline offer (e.g. the $99 malware fix). */
  offer?: { label: string; value: string; note: string };
  /** Optional pricing tiers (e.g. managed hosting plans). */
  plans?: PricingPlan[];
  /** Optional note shown above the pricing grid. */
  plansNote?: string;
  /** Show the customer-testimonials band on this service page. */
  showTestimonials?: boolean;
  /** Optional "errors we fix" grid (e.g. the WordPress support page). */
  commonIssues?: ServiceIssue[];
  /** Optional heading/intro shown above the common-issues grid. */
  commonIssuesIntro?: { heading: string; body: string };
  /**
   * Emergency intake wizard. When set, the page's primary CTA opens the
   * multi-step "Get Started" form instead of linking to the contact page.
   */
  intake?: { intent: IntakeIntent; ctaLabel: string };
  faqs: ServiceFaq[];
  relatedSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "wordpress-development",
    navLabel: "WordPress Development",
    title: "WordPress Development",
    icon: Code2,
    tagline: "Custom WordPress sites that are easy to edit and built to last.",
    summary:
      "Cleanly built WordPress websites you can actually manage, no bloated page builders, no plugin sprawl, no surprises after launch.",
    audience: "For businesses that want a professional WordPress site they own and control.",
    meta: {
      title: "WordPress Development Services",
      description:
        "Custom WordPress websites built clean and maintainable, fast, secure, and easy to edit. No page-builder bloat. Built for businesses across Canada and the U.S.",
    },
    hero: {
      eyebrow: "WordPress Development",
      headline: "WordPress sites built to be edited, not fought with",
      subhead:
        "We build WordPress websites the right way: lightweight code, a tidy editing experience, and only the plugins you actually need. The result is a site your team can update confidently and that stays stable for years.",
    },
    problem: {
      heading: "Most WordPress sites get heavy and fragile over time",
      body: "Page builders, dozens of plugins, and quick fixes pile up until the site is slow, hard to edit, and easy to break. We start from a clean foundation and keep it that way, so adding a page or updating content never feels risky.",
    },
    outcomes: [
      "A site your team can edit without calling a developer",
      "Fewer plugins, which means fewer security and performance problems",
      "Clean, documented code that any developer can pick up later",
      "Built-in SEO structure so pages are ready to rank",
    ],
    features: [
      {
        title: "Custom themes, no page-builder bloat",
        description:
          "We build to your design with lightweight, standards-based code instead of stacking heavy page-builder plugins.",
        icon: Code2,
      },
      {
        title: "A clean editing experience",
        description:
          "Content is organised into clear, reusable blocks so your team can update pages safely without breaking the layout.",
        icon: LayoutTemplate,
      },
      {
        title: "Performance and SEO from the start",
        description:
          "Sensible markup, fast-loading assets, and proper metadata are part of the build, not an afterthought.",
        icon: Gauge,
      },
      {
        title: "Security built in",
        description:
          "Hardened configuration, trusted plugins only, and safe update practices keep the site stable after launch.",
        icon: ShieldCheck,
      },
    ],
    process: [
      {
        title: "Plan",
        description:
          "We map your pages, content, and goals so the build has a clear structure before any code is written.",
      },
      {
        title: "Build",
        description:
          "We develop the theme and templates, wire up the editor, and review progress with you along the way.",
      },
      {
        title: "Launch",
        description:
          "We test across devices, migrate content, and handle the go-live so nothing breaks during the switch.",
      },
      {
        title: "Support",
        description:
          "We hand over a documented site and can keep it updated and secure with an ongoing care plan.",
      },
    ],
    faqs: [
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. We build with clear, reusable content blocks and give you a short walkthrough so your team can update text, images, and pages confidently.",
      },
      {
        question: "Do you use Elementor or other page builders?",
        answer:
          "We avoid heavy page builders because they slow sites down and make them harder to maintain. We build with the native WordPress block editor and clean custom code instead.",
      },
      {
        question: "Do I own the website when it's done?",
        answer:
          "Completely. You own the code, the content, and the hosting account. There's no lock-in, and any competent WordPress developer can work on it later.",
      },
    ],
    relatedSlugs: ["web-development", "ecommerce", "website-maintenance"],
  },

  {
    slug: "web-development",
    navLabel: "Custom Web Development",
    title: "Custom Web Development & Redesign",
    icon: LayoutTemplate,
    tagline: "Custom websites, web apps, and redesigns when WordPress isn't enough.",
    summary:
      "From marketing sites to custom web applications and full redesigns, built with modern tooling and a focus on speed, accessibility, and conversion.",
    audience: "For businesses that need a custom build or a redesign of an existing site.",
    meta: {
      title: "Custom Web Development & Website Redesign",
      description:
        "Custom websites, web applications, and redesigns built with modern, maintainable code. Fast, accessible, and conversion-focused.",
    },
    hero: {
      eyebrow: "Custom Web Development",
      headline: "Custom websites and web apps, built to perform",
      subhead:
        "When a template won't cut it, we design and build custom sites and web applications with modern tooling, focused on speed, accessibility, and turning visitors into enquiries.",
    },
    problem: {
      heading: "Your website should do more than look good",
      body: "An outdated or generic site quietly costs you leads: it loads slowly, looks dated on mobile, and buries the next step. We rebuild around how your customers actually move through the page, so the site earns its keep.",
    },
    outcomes: [
      "A site that loads fast and feels modern on every device",
      "Clear paths to contact, quote, or buy on every page",
      "Accessible, standards-based code that holds up over time",
      "A measurable lift in enquiries from the same traffic",
    ],
    features: [
      {
        title: "Custom design and build",
        description:
          "We design to your brand and build it with clean, maintainable code, not a recycled template.",
        icon: LayoutTemplate,
      },
      {
        title: "Web applications",
        description:
          "Customer portals, booking flows, dashboards, and internal tools built to fit how your business works.",
        icon: Code2,
      },
      {
        title: "Website redesign",
        description:
          "We modernise an existing site's look, speed, and structure while preserving your content and search rankings.",
        icon: Gauge,
      },
      {
        title: "Conversion-focused structure",
        description:
          "Clear messaging and obvious next steps, so more of your existing visitors actually get in touch.",
        icon: ShieldCheck,
      },
    ],
    process: [
      {
        title: "Discover",
        description:
          "We learn your goals, audience, and the actions you want visitors to take, then agree on scope.",
      },
      {
        title: "Design",
        description:
          "We design the key pages and flows so you can see and shape the direction before we build.",
      },
      {
        title: "Build & test",
        description:
          "We develop in reviewable stages and test across devices, browsers, and accessibility basics.",
      },
      {
        title: "Launch & measure",
        description:
          "We launch carefully and set you up to track what's working so the site keeps improving.",
      },
    ],
    faqs: [
      {
        question: "Can you redesign my site without losing my Google rankings?",
        answer:
          "Yes. We preserve your URLs where possible and add redirects where they change, so your existing search equity carries over to the new site.",
      },
      {
        question: "Do you only build on WordPress?",
        answer:
          "No. We recommend the right tool for the job. Many sites are a great fit for WordPress, but for custom applications we use modern frameworks where they serve you better.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "A focused marketing site is usually a few weeks; larger custom builds take longer. We give you a realistic timeline after the discovery step, not before.",
      },
    ],
    relatedSlugs: ["wordpress-development", "ecommerce", "speed-optimization"],
  },

  {
    slug: "ecommerce",
    navLabel: "E-commerce & WooCommerce",
    title: "E-commerce & WooCommerce Development",
    icon: ShoppingCart,
    tagline: "Online stores that are easy to run and built to convert.",
    summary:
      "WooCommerce stores set up to sell, clean product pages, a smooth checkout, and the integrations you need to actually run the business.",
    audience: "For businesses selling products or services online with WooCommerce.",
    meta: {
      title: "WooCommerce & E-commerce Development",
      description:
        "WooCommerce online stores built to convert and easy to manage, clean product pages, smooth checkout, and the integrations you need to run the business.",
    },
    hero: {
      eyebrow: "E-commerce & WooCommerce",
      headline: "Online stores that are easy to run and built to sell",
      subhead:
        "We build and improve WooCommerce stores with clear product pages, a checkout that doesn't lose customers, and the payment, shipping, and inventory connections you need behind the scenes.",
    },
    problem: {
      heading: "A clunky store costs you sales every day",
      body: "Slow product pages, a confusing checkout, and manual back-office work quietly eat into revenue and your time. We tighten the path from product to purchase and connect the tools that keep orders flowing.",
    },
    outcomes: [
      "A checkout customers can complete without friction",
      "Product pages that load fast and answer buyer questions",
      "Payments, shipping, and tax wired up correctly",
      "Less manual admin thanks to the right integrations",
    ],
    features: [
      {
        title: "Store setup & migration",
        description:
          "New WooCommerce builds or careful migrations from another platform, with products and orders intact.",
        icon: ShoppingCart,
      },
      {
        title: "Conversion-ready product pages",
        description:
          "Clear layouts, fast images, and trust signals that help customers make a decision.",
        icon: LayoutTemplate,
      },
      {
        title: "Payments & integrations",
        description:
          "Stripe, PayPal, shipping rates, tax, and inventory or CRM connections set up and tested.",
        icon: Code2,
      },
      {
        title: "Secure & maintained",
        description:
          "Stores are a target, we harden security and can keep yours updated with a care plan.",
        icon: ShieldCheck,
      },
    ],
    process: [
      {
        title: "Scope",
        description:
          "We map your products, payment and shipping rules, and the tools your store needs to connect to.",
      },
      {
        title: "Build",
        description:
          "We set up the store, design the product and checkout experience, and wire up integrations.",
      },
      {
        title: "Test",
        description:
          "We place real test orders across devices to confirm payments, tax, and shipping all behave.",
      },
      {
        title: "Launch & support",
        description:
          "We go live and stay available for the busy first weeks, then keep the store healthy over time.",
      },
    ],
    faqs: [
      {
        question: "Can you move my store from Shopify or another platform?",
        answer:
          "Yes. We migrate products, customers, and orders to WooCommerce and set up redirects so your existing links and rankings carry over.",
      },
      {
        question: "Which payment providers do you support?",
        answer:
          "All the common ones, Stripe, PayPal, and most regional gateways. We'll recommend the best fit for your fees and customers.",
      },
      {
        question: "Will the store be hard to manage day to day?",
        answer:
          "No. We set up a clean order and product workflow and show your team how to run it, so adding products and fulfilling orders stays simple.",
      },
    ],
    relatedSlugs: ["wordpress-development", "managed-wordpress-hosting", "website-maintenance"],
  },

  {
    slug: "managed-wordpress-hosting",
    navLabel: "Managed WordPress Hosting",
    title: "Managed WordPress Hosting",
    icon: Server,
    tagline: "Fast, secure hosting with the maintenance handled for you.",
    summary:
      "Hosting tuned specifically for WordPress, with security, backups, and updates included, and real people to call when something needs attention.",
    audience: "For businesses that want their WordPress site fast and looked after, not just parked on a server.",
    meta: {
      title: "Managed WordPress Hosting",
      description:
        "Fast, secure managed WordPress hosting with backups, monitoring, malware protection, and free migration included. Real support, not just a server.",
    },
    hero: {
      eyebrow: "Managed WordPress Hosting",
      headline: "Hosting built for WordPress, managed by people",
      subhead:
        "Your site runs on infrastructure tuned for WordPress, with security, daily backups, and updates handled for you. Migration is free, and support is a real person who knows your site, not a ticket queue.",
    },
    problem: {
      heading: "Cheap hosting gets expensive when your site goes down",
      body: "Generic shared hosting is slow, easy to compromise, and leaves updates and backups up to you. When something breaks, you're on your own. Managed hosting means the boring-but-critical work is already covered.",
    },
    outcomes: [
      "Faster load times on hosting tuned for WordPress",
      "Daily backups you can restore from in minutes",
      "Security monitoring and malware protection included",
      "A free, hands-off migration from your current host",
    ],
    features: [
      {
        title: "Performance-tuned stack",
        description:
          "Server-level caching and a WordPress-specific configuration for fast, consistent load times.",
        icon: Gauge,
      },
      {
        title: "Backups & monitoring",
        description:
          "Automated daily backups and uptime monitoring so problems are caught and reversible.",
        icon: Server,
      },
      {
        title: "Security included",
        description:
          "Hardening, a firewall, and malware scanning come standard, not as a paid add-on.",
        icon: ShieldCheck,
      },
      {
        title: "Free migration & real support",
        description:
          "We move your site over for free and you talk to people who actually know WordPress.",
        icon: Code2,
      },
    ],
    process: [
      {
        title: "Migrate",
        description:
          "We copy your site to our hosting, test it on a staging URL, and confirm everything works before switching.",
      },
      {
        title: "Harden",
        description:
          "We apply security hardening, enable backups and monitoring, and tune caching for your site.",
      },
      {
        title: "Go live",
        description:
          "We point your domain over with no downtime, and your visitors notice nothing but a faster site.",
      },
      {
        title: "Maintain",
        description:
          "We keep the platform patched and watched, and you reach a real person whenever you need one.",
      },
    ],
    plansNote:
      "Every plan runs on our Docker + Nginx stack behind the Cloudflare CDN, with free SSL, free malware removal, and free migration. Save up to four months with annual billing.",
    plans: [
      {
        name: "Starter",
        tagline: "For a single small business site.",
        price: "$24.99",
        period: "/mo",
        note: "or $19.99/mo billed annually",
        features: [
          "1 WordPress site",
          "10 GB SSD storage",
          "50 GB monthly bandwidth",
          "Free SSL & free malware removal",
          "Automated backups",
          "Email support",
          "SFTP, phpMyAdmin & WP-CLI",
        ],
        cta: { label: "Get started", href: "/contact" },
      },
      {
        name: "Business",
        tagline: "For growing sites that need more headroom.",
        price: "$49.99",
        period: "/mo",
        note: "or $39.99/mo billed annually",
        highlighted: true,
        badge: "Most popular",
        features: [
          "3 WordPress sites",
          "30 GB SSD storage",
          "200 GB monthly bandwidth",
          "Free SSL & free malware removal",
          "Active malware monitoring",
          "Daily backups",
          "Priority chat support",
          "SFTP, phpMyAdmin & WP-CLI",
        ],
        cta: { label: "Get started", href: "/contact" },
      },
      {
        name: "Agency",
        tagline: "For multiple sites or client portfolios.",
        price: "Custom",
        note: "Tailored to your sites and traffic",
        features: [
          "Multiple WordPress sites",
          "200 GB SSD storage",
          "Unmetered bandwidth",
          "Free SSL & free malware removal",
          "Active malware monitoring",
          "Daily backups",
          "Priority support",
          "SFTP, phpMyAdmin & WP-CLI",
        ],
        cta: { label: "Get in touch", href: "/contact" },
      },
    ],
    faqs: [
      {
        question: "Is migrating my site really free?",
        answer:
          "Yes. Our migration team handles the entire move at no cost, give us your current hosting details and we'll transfer your site with near-zero downtime, test it, and only switch your domain over once everything checks out.",
      },
      {
        question: "What infrastructure do you run on?",
        answer:
          "Sites run on a performance-tuned Docker and Nginx stack, served through the Cloudflare CDN's global network (260+ locations) so content loads quickly from a server near each visitor.",
      },
      {
        question: "What happens if my site gets hacked while you host it?",
        answer:
          "Free malware removal and active monitoring are part of managed hosting. If something gets through, we clean it up and restore from backup, you're not left to deal with it alone. We do ask that you keep plugins and themes updated to prevent recurring infections.",
      },
      {
        question: "How often are backups taken?",
        answer:
          "It depends on your plan, we offer automated daily, weekly, or monthly backups, all restorable on request, so your data is always recoverable.",
      },
    ],
    relatedSlugs: ["website-maintenance", "malware-removal", "speed-optimization"],
  },

  {
    slug: "website-maintenance",
    navLabel: "Website Care & Maintenance",
    title: "Website Care & Maintenance Plans",
    icon: ShieldCheck,
    tagline: "Ongoing updates, backups, security, and a developer on call.",
    summary:
      "A monthly care plan that keeps your WordPress site updated, backed up, secure, and supported, so small problems get fixed before they become outages.",
    audience: "For business owners who don't want to think about WordPress upkeep.",
    meta: {
      title: "WordPress Website Care & Maintenance Plans",
      description:
        "Monthly WordPress care plans: updates, backups, security monitoring, performance checks, and a developer on call for fixes and small changes.",
    },
    hero: {
      eyebrow: "Website Care & Maintenance",
      headline: "Your website, kept healthy every month",
      subhead:
        "Updates, backups, security monitoring, and a developer on call, handled on a predictable monthly plan. You focus on the business; we keep the site fast, current, and protected.",
    },
    problem: {
      heading: "Websites don't stay healthy on their own",
      body: "Plugins fall out of date, backups quietly stop running, and a missed update becomes the hole an attacker walks through. A care plan turns that risk into a routine, and gives you someone to call when you need a change made.",
    },
    outcomes: [
      "Core, plugin, and theme updates applied safely and tested",
      "Off-site backups you can actually restore from",
      "Security monitoring that catches problems early",
      "A developer on call for fixes and small content changes",
    ],
    features: [
      {
        title: "Safe, tested updates",
        description:
          "We apply WordPress, plugin, and theme updates on a schedule and check the site afterwards so nothing breaks silently.",
        icon: ShieldCheck,
      },
      {
        title: "Backups & recovery",
        description:
          "Regular off-site backups with a tested restore process, so a bad day is an inconvenience, not a disaster.",
        icon: Server,
      },
      {
        title: "Security & uptime monitoring",
        description:
          "We watch for malware, downtime, and suspicious activity and act before it becomes your problem.",
        icon: Bug,
      },
      {
        title: "Support hours included",
        description:
          "Each plan includes time for small changes and fixes, a real developer, not a chatbot.",
        icon: Code2,
      },
    ],
    process: [
      {
        title: "Onboard",
        description:
          "We audit your current site, set up backups and monitoring, and clear any urgent issues first.",
      },
      {
        title: "Maintain",
        description:
          "Each month we apply tested updates, run security and performance checks, and confirm backups are healthy.",
      },
      {
        title: "Support",
        description:
          "Send us small changes and fixes during the month and we handle them within your plan's hours.",
      },
      {
        title: "Report",
        description:
          "You get a plain-language summary of what we did, so you always know your site is being looked after.",
      },
    ],
    faqs: [
      {
        question: "What's included in a care plan?",
        answer:
          "Every plan covers updates, backups, security and uptime monitoring, and a set number of support hours for fixes and small changes each month. We'll recommend a tier based on your site.",
      },
      {
        question: "How much do care plans cost?",
        answer:
          "Plans are billed monthly and priced by your site's size and how much support you want. Get in touch for a quote, there's no long-term lock-in.",
      },
      {
        question: "What if I need a bigger change, like a new page?",
        answer:
          "Larger work beyond your monthly hours is quoted separately and billed at a clear rate, so there are no surprises.",
      },
    ],
    relatedSlugs: ["managed-wordpress-hosting", "malware-removal", "speed-optimization"],
  },

  {
    slug: "malware-removal",
    navLabel: "WordPress Malware Removal",
    title: "WordPress Malware Removal",
    icon: Bug,
    tagline: "Hacked site cleaned and secured, a flat $99 one-time fix.",
    summary:
      "If your WordPress site has been hacked, we remove the malware, restore normal function, and lock it down, for a flat one-time fee of $99.",
    audience: "For anyone whose WordPress site has been hacked, defaced, or flagged.",
    meta: {
      title: "WordPress Malware Removal, $99 One-Time Fix",
      description:
        "Hacked WordPress site? We remove malware, clean infected files and database, restore normal function, and harden security, a flat one-time fee of $99.",
    },
    hero: {
      eyebrow: "WordPress Malware Removal",
      headline: "Hacked WordPress site? We'll clean it up, fast",
      subhead:
        "Malicious redirects, pharma spam, defacement, or hidden backdoors, we remove the infection, restore your site to normal, and harden it so it doesn't happen again. One flat fee, no upsells.",
    },
    problem: {
      heading: "A hacked site damages trust by the hour",
      body: "Search engines flag it, browsers warn visitors away, and customers lose confidence fast. The longer an infection sits, the deeper it spreads. We clean it thoroughly, not just the obvious symptoms, and close the door behind it.",
    },
    outcomes: [
      "Malware and backdoors removed from files and database",
      "Blacklist and browser warnings cleared",
      "Your site restored to normal, working order",
      "Security hardened so the same hole can't be reused",
    ],
    features: [
      {
        title: "Full infection cleanup",
        description:
          "We scan the codebase against known-good source, then manually inspect common infection points and the database.",
        icon: Bug,
      },
      {
        title: "Restore & verify",
        description:
          "We get the site working again and confirm the malicious behaviour, redirects, spam, warnings, is gone.",
        icon: ShieldCheck,
      },
      {
        title: "Security hardening",
        description:
          "We close the entry point, update vulnerable components, and tighten configuration to prevent reinfection.",
        icon: Server,
      },
      {
        title: "Reindex request",
        description:
          "Once clean, we request a fresh review so search engines and browsers stop flagging your site.",
        icon: Gauge,
      },
    ],
    process: [
      {
        title: "Scan",
        description:
          "We compare your files against the original source to find everything that's been altered or injected.",
      },
      {
        title: "Clean",
        description:
          "We manually remove malware from files and the database, including hidden backdoors left for re-entry.",
      },
      {
        title: "Harden",
        description:
          "We patch the vulnerability that let the attacker in and tighten the site's security configuration.",
      },
      {
        title: "Restore",
        description:
          "We confirm the site is clean and working, then request a reindex so warnings are removed.",
      },
    ],
    offer: {
      label: "One-time fix",
      value: "$99",
      note: "Flat fee per site. Includes full cleanup, hardening, and a reindex request, no upsells.",
    },
    intake: { intent: "malware", ctaLabel: "Clean my site now" },
    showTestimonials: true,
    faqs: [
      {
        question: "How much does malware removal cost?",
        answer:
          "It's a flat one-time fee of $99 USD per site. That covers the full cleanup, security hardening, and a reindex request. There are no hidden upsells.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most sites are cleaned the same day. Timing depends on how deep the infection has spread, but we start as soon as you reach out.",
      },
      {
        question: "Will the malware come back?",
        answer:
          "We don't just delete symptoms, we find and close the entry point that let the attacker in. For ongoing protection, a care plan or managed hosting keeps the site monitored.",
      },
    ],
    relatedSlugs: ["wordpress-support", "website-maintenance", "managed-wordpress-hosting"],
  },

  {
    slug: "wordpress-support",
    navLabel: "Fix WordPress Errors",
    title: "WordPress Support & Error Fixing",
    icon: Wrench,
    tagline: "Site down or throwing an error? We diagnose and fix it, fast.",
    summary:
      "From the white screen of death to database errors and HTTP 500s, we find what broke your WordPress site and fix it properly, with a free diagnosis first.",
    audience: "For anyone whose WordPress site is broken, erroring, or down.",
    meta: {
      title: "Fix WordPress Errors & Fast WordPress Support",
      description:
        "WordPress site down or showing an error? We fix the white screen of death, HTTP 500 errors, database connection errors, the critical error message, and more. Free diagnosis, flat-rate fix.",
    },
    hero: {
      eyebrow: "WordPress Support",
      headline: "WordPress site down or throwing errors? We'll fix it",
      subhead:
        "White screen, HTTP 500, database connection failed, stuck in maintenance mode, locked out of wp-admin, whatever broke, we find the real cause and get your site working again, often the same day.",
    },
    problem: {
      heading: "A broken site is lost trust and lost business",
      body: "Every minute your site shows an error, visitors leave and sales stop. Worse, the obvious fix often isn't the real one. We read the actual error, find what caused it, and fix it at the source, instead of guessing and hoping.",
    },
    outcomes: [
      "Your site back online and working properly",
      "The real cause found and fixed, not patched over",
      "A plain-language explanation of what went wrong",
      "Practical steps to stop it happening again",
    ],
    features: [
      {
        title: "Fast, accurate diagnosis",
        description:
          "We pinpoint the real cause, a plugin conflict, a theme bug, a server limit, or a corrupted file, instead of trial and error.",
        icon: Wrench,
      },
      {
        title: "Plugin & theme conflicts",
        description:
          "Most errors trace back to an update or a conflict. We isolate the culprit and resolve it cleanly.",
        icon: Plug,
      },
      {
        title: "Safe fixes, nothing lost",
        description:
          "We back up first and work on a copy where there's any risk, so fixing one thing never breaks another.",
        icon: RefreshCw,
      },
      {
        title: "Emergency turnaround",
        description:
          "Site completely down? We treat it as urgent and start right away over live chat or phone.",
        icon: LifeBuoy,
      },
    ],
    process: [
      {
        title: "Diagnose",
        description:
          "Send us the error or a screenshot. We read the logs and reproduce the problem to find the true cause.",
      },
      {
        title: "Fix",
        description:
          "We back up, then fix the issue at the source, whether that's code, a plugin, the database, or server config.",
      },
      {
        title: "Test",
        description:
          "We check the whole site across devices to confirm the error is gone and nothing else broke.",
      },
      {
        title: "Prevent",
        description:
          "We tell you what caused it and how to avoid a repeat, and can keep it stable with a care plan or hosting.",
      },
    ],
    offer: {
      label: "Diagnosis",
      value: "Free",
      note: "We find the cause at no cost and quote a flat fix price up front, before any work starts.",
    },
    intake: { intent: "errors", ctaLabel: "Fix my site now" },
    commonIssuesIntro: {
      heading: "Errors we fix every day",
      body: "Recognise any of these? You're in the right place. Send us the exact message you're seeing and we'll take it from there, you don't need to know what it means.",
    },
    commonIssues: [
      {
        code: "HTTP 500",
        title: "Internal Server Error",
        description:
          "The site won't load at all. Usually a corrupted .htaccess, a plugin or theme conflict, or a PHP limit.",
        emergency: true,
      },
      {
        title: "White Screen of Death",
        description:
          "A blank white page with no message, often a PHP error or memory limit hiding the real cause.",
        emergency: true,
      },
      {
        title: "Error establishing a database connection",
        description:
          "WordPress can't reach its database, wrong credentials, a crashed database, or a host problem.",
        emergency: true,
      },
      {
        title: "There has been a critical error on this website",
        description:
          "WordPress's catch-all fatal error. The real detail is in a log we know how to read.",
        emergency: true,
      },
      {
        code: "502 / 504",
        title: "Bad Gateway / Gateway Timeout",
        description:
          "The server took too long or returned a bad response, often resource limits or a heavy plugin.",
      },
      {
        code: "HTTP 503",
        title: "Service Unavailable",
        description:
          "The server is overloaded or a process crashed, and the site flickers in and out.",
      },
      {
        title: "Stuck in maintenance mode",
        description:
          "“Briefly unavailable for scheduled maintenance” that never clears after an update.",
      },
      {
        code: "HTTP 403",
        title: "Forbidden / Access Denied",
        description:
          "File permissions, a security rule, or a firewall blocking access to pages or wp-admin.",
      },
      {
        title: "Locked out of wp-admin",
        description:
          "Login loops, “you are not allowed to access this page,” or a redirect you can't escape.",
      },
      {
        title: "Allowed memory size exhausted",
        description:
          "The site outgrew its PHP memory limit and stops rendering. We raise it and find what's eating it.",
      },
      {
        title: "Broken after a plugin or theme update",
        description:
          "An update took the site down. We roll it back safely and fix the underlying conflict.",
      },
      {
        title: "404s on every page but the home page",
        description:
          "Permalinks or rewrite rules broke, so internal links all return not found.",
      },
    ],
    faqs: [
      {
        question: "How fast can you fix my site?",
        answer:
          "Most issues are resolved the same day. If your site is completely down, we treat it as an emergency and start as soon as you reach us by live chat or phone.",
      },
      {
        question: "How much does it cost?",
        answer:
          "We diagnose the problem for free, then quote a flat fix price before doing any work, so there are no surprises. Most common fixes are quick and inexpensive.",
      },
      {
        question: "I don't know what the error means. Can you still help?",
        answer:
          "Yes. Just send us the exact message or a screenshot. Reading cryptic WordPress errors is our job, you don't need to understand it.",
      },
      {
        question: "Will I lose any content or data?",
        answer:
          "No. We back up before touching anything and work on a copy where there's any risk, so your content and data stay safe.",
      },
      {
        question: "Can you stop it happening again?",
        answer:
          "Often, yes. Many errors come from outdated or conflicting plugins. We'll tell you the root cause, and a care plan or managed hosting keeps it from recurring.",
      },
    ],
    relatedSlugs: ["malware-removal", "website-maintenance", "managed-wordpress-hosting"],
  },

  {
    slug: "speed-optimization",
    navLabel: "Speed Optimization",
    title: "Website Speed Optimization",
    icon: Gauge,
    tagline: "Faster load times, better Core Web Vitals, lower bounce.",
    summary:
      "We diagnose what's slowing your WordPress site down and fix it, from bloated plugins to unoptimised images, so pages load fast and pass Core Web Vitals.",
    audience: "For site owners whose pages load slowly or fail Core Web Vitals.",
    meta: {
      title: "WordPress Speed Optimization Services",
      description:
        "Make your WordPress site load fast. We fix slow pages, improve Core Web Vitals (LCP, CLS, INP), and reduce bloat so visitors stay and convert.",
    },
    hero: {
      eyebrow: "Speed Optimization",
      headline: "Make your WordPress site load fast, and stay fast",
      subhead:
        "Slow sites lose visitors and rankings. We find what's dragging your pages down, heavy plugins, large images, render-blocking code, and fix it, then prove the improvement with real metrics.",
    },
    problem: {
      heading: "Every extra second costs you visitors",
      body: "WordPress makes it easy to add plugins and media until the site crawls. Slow pages raise bounce rates and hurt your Google rankings through Core Web Vitals. We trim the weight and tune what's left so the site feels instant.",
    },
    outcomes: [
      "Noticeably faster load times on mobile and desktop",
      "Passing Core Web Vitals (LCP, CLS, and INP)",
      "Lower bounce rates and better search visibility",
      "A clear before-and-after, measured on real tools",
    ],
    features: [
      {
        title: "Performance audit",
        description:
          "We profile your site to find exactly what's slow, plugins, images, scripts, hosting, or all four.",
        icon: Gauge,
      },
      {
        title: "Core Web Vitals fixes",
        description:
          "We target the metrics Google measures, LCP, CLS, and INP, not just a vanity score.",
        icon: Code2,
      },
      {
        title: "Image & asset optimisation",
        description:
          "We compress and properly size images and defer non-critical code so pages render sooner.",
        icon: LayoutTemplate,
      },
      {
        title: "Caching & cleanup",
        description:
          "We set up sensible caching and remove plugin bloat that's quietly weighing the site down.",
        icon: Server,
      },
    ],
    process: [
      {
        title: "Measure",
        description:
          "We benchmark your current speed and Core Web Vitals so we know exactly where you're starting from.",
      },
      {
        title: "Diagnose",
        description:
          "We identify the specific causes of slowness rather than applying generic fixes and hoping.",
      },
      {
        title: "Optimise",
        description:
          "We fix the real bottlenecks, assets, code, caching, and configuration, and retest as we go.",
      },
      {
        title: "Verify",
        description:
          "We hand you a clear before-and-after on the same tools, so the improvement is measurable.",
      },
    ],
    faqs: [
      {
        question: "Can you guarantee a perfect 100 score?",
        answer:
          "We focus on real-world speed and passing Core Web Vitals, which is what affects your visitors and rankings. We'll show you a genuine before-and-after rather than chasing a single vanity number.",
      },
      {
        question: "Will speeding up my site break anything?",
        answer:
          "No. We test as we go and make changes carefully on a copy first where needed, so your site stays fully functional throughout.",
      },
      {
        question: "Do I need to change hosting?",
        answer:
          "Not always, many gains come from the site itself. If hosting is genuinely the bottleneck, we'll tell you honestly and can move you to faster managed hosting.",
      },
    ],
    relatedSlugs: ["managed-wordpress-hosting", "website-maintenance", "wordpress-development"],
  },
];

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/**
 * Service groups for the overview page, a simple Build / Protect / Optimize
 * structure. Each group has an illustrative icon (in /public/services).
 */
export interface ServiceGroup {
  key: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  slugs: string[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    key: "build",
    title: "Build",
    description:
      "Design and build the site itself, custom WordPress, web apps, redesigns, and online stores.",
    image: "/services/build.png",
    imageAlt: "Build, a browser window with code and a package",
    slugs: ["wordpress-development", "web-development", "ecommerce"],
  },
  {
    key: "protect",
    title: "Protect & Fix",
    description:
      "Keep it safe and running, ongoing care plans, error fixes, and emergency hacked-site recovery.",
    image: "/services/protect.png",
    imageAlt: "Protect, a shield and padlock over a browser window",
    slugs: ["website-maintenance", "wordpress-support", "malware-removal"],
  },
  {
    key: "optimize",
    title: "Optimize",
    description:
      "Make it faster and better hosted, managed WordPress hosting and speed optimization.",
    image: "/services/optimize.png",
    imageAlt: "Optimize, a speedometer with an upward trend and a server",
    slugs: ["managed-wordpress-hosting", "speed-optimization"],
  },
];
