/**
 * Team members.
 *
 * Real people, supplied by TheAppSense. CMS-managed later (WordPress "Team"
 * post type). Avatars are initials placeholders until real photos are added, * drop a headshot path into `image` and the card will use it.
 *
 * LinkedIn URLs are the public profiles for each team member.
 */

export interface TeamMember {
  name: string;
  title: string;
  /** Short detail revealed on hover/focus. */
  bio: string;
  /** Public LinkedIn profile URL. */
  linkedin: string;
  /** Optional real headshot in /public/team; falls back to initials. */
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: "Mohit Tripathi",
    title: "Platform Lead",
    bio: "Leads TheAppSense and builds the platform and hosting infrastructure the whole team runs on.",
    linkedin: "https://www.linkedin.com/in/mohit-tripathi-canada/",
    image: "/team/mohit-tripathi.jpg",
  },
  {
    name: "Nate Gallaudet",
    title: "Pre-Sales & Client Support",
    bio: "Your first point of contact, helps you scope the right solution and stays close after launch.",
    linkedin: "https://www.linkedin.com/in/nate-gallaudet",
    image: "/team/nate-gallaudet.jpg",
  },
  {
    name: "Priyanka Jain",
    title: "Content Specialist",
    bio: "Crafts clear, useful website and marketing content that reads well and is built to rank.",
    linkedin: "https://www.linkedin.com/in/priyanka-jain-0350022ba/",
    image: "/team/priyanka-jain.jpg",
  },
  {
    name: "Stephanie Alvia",
    title: "SEO & Marketing Specialist",
    bio: "Helps clients get found, technical SEO, on-page optimization, and marketing that drives leads.",
    linkedin: "https://www.linkedin.com/in/stephaniealvia",
    image: "/team/stephanie-alvia.jpg",
  },
  {
    name: "Kshitiz Saxena",
    title: "Technical Support Lead",
    bio: "Keeps client sites healthy, handling fixes, updates, and day-to-day technical support.",
    linkedin: "https://www.linkedin.com/in/kshitiz-saxena-22372026a/",
    image: "/team/kshitiz-saxena.jpg",
  },
];

/** Initials for the placeholder avatar (e.g. "Mohit Tripathi" -> "MT"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
