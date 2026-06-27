import type { Metadata } from "next";

import { absoluteUrl, SITE_URL } from "@/lib/env";
import { company } from "@/data/site";

const DEFAULT_OG_IMAGE = "/og-image.png";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path on the canonical origin, e.g. "/services/malware-removal". */
  path?: string;
  /** Override the social share image (defaults to the brand OG image). */
  image?: string;
  /** Mark a page as not indexable (e.g. utility pages). */
  noIndex?: boolean;
}

/**
 * Single source of truth for per-page metadata: titles, descriptions,
 * canonical URLs, Open Graph and Twitter cards. Every route calls this so the
 * tags stay consistent and DRY.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    path === "/" ? title : `${title} | ${company.name}`;

  return {
    // Absolute title bypasses the root layout's title template, so the
    // "| TheAppSense" suffix is never applied twice.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: company.name,
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** JSON-LD Organization schema, built from verified company facts only. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    telephone: company.phone,
    description: company.shortDescription,
    areaServed: company.areaServed,
    sameAs: company.social.map((s) => s.href),
  } as const;
}

/** JSON-LD WebSite schema. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: SITE_URL,
  } as const;
}

/** JSON-LD Service schema for an individual service page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
    },
    areaServed: company.areaServed,
  } as const;
}

/** JSON-LD BreadcrumbList from an ordered list of crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  } as const;
}

/**
 * JSON-LD FAQPage. Only call this when the same questions are rendered
 * visibly on the page, required by search guidelines.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } as const;
}

/** JSON-LD Article schema for a blog post. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author: { "@type": "Organization", name: input.author },
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  } as const;
}
