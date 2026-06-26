/**
 * Global company information.
 *
 * CMS-managed later (WordPress "Site Settings"). Kept in one typed object so
 * contact details, hours, and addresses are never hard-coded inside components.
 * Every value here is factual, taken from the existing TheAppSense site.
 */

export interface CompanyLocation {
  label: string;
  lines: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Company {
  name: string;
  legalName: string;
  email: string;
  /** E.164-ish display phone. */
  phone: string;
  /** Digits-only for tel: links. */
  phoneHref: string;
  hours: string;
  timezone: string;
  /** Short, plain-language description used in schema + footer. */
  shortDescription: string;
  areaServed: string[];
  locations: CompanyLocation[];
  social: SocialLink[];
  /** Year the team has been working with WordPress (used for honest "since"). */
  foundingContext: string;
}

export const company: Company = {
  name: "TheAppSense",
  legalName: "Infinite Loop Corporation",
  email: "sales@theappsense.com",
  phone: "+1 (437) 888-4248",
  phoneHref: "+14378884248",
  hours: "7 AM to 9 PM ET, Monday to Friday",
  timezone: "Eastern Time",
  shortDescription:
    "TheAppSense provides fast, secure, fully managed WordPress hosting for small and growing businesses across Canada and the U.S., with care, security, malware removal, and support included.",
  areaServed: ["Canada", "United States"],
  locations: [
    {
      label: "Canada",
      lines: ["510 Curran Place", "Mississauga, ON L5B 0J8"],
    },
    {
      label: "United States",
      lines: ["1280 Lexington Ave", "New York, NY 10028"],
    },
  ],
  // No social profiles are linked until verified accounts are confirmed.
  social: [],
  foundingContext:
    "The team has been building and maintaining WordPress sites for over a decade.",
};
