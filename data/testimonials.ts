/**
 * Customer testimonials.
 *
 * These are real testimonials published on TheAppSense's own site, carried over
 * verbatim. CMS-managed later (WordPress "Testimonial" post type). Do not add
 * fabricated entries here, only genuine, attributable quotes.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** 1 to 5 star rating shown with the quote. */
  rating: number;
}

/** Public Trustpilot profile for additional, verifiable social proof. */
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/theappsense.com";

export const testimonials: Testimonial[] = [
  {
    quote:
      "I was really impressed with the malware removal service. My site was up and running within an hour after it was hacked.",
    name: "John D.",
    role: "Owner, Tech Innovators",
    rating: 5,
  },
  {
    quote:
      "Switching to their managed hosting was one of the best decisions I've made for my business website. The support team is quick to respond and very knowledgeable.",
    name: "Lisa M.",
    role: "Founder, Creative Minds",
    rating: 5,
  },
  {
    quote:
      "The malware removal service was fantastic, they cleaned my site completely, and it's been secure ever since. The support on call and chat was excellent.",
    name: "Michael B.",
    role: "CEO, Digital Solutions",
    rating: 5,
  },
  {
    quote:
      "I had a major malware issue on my WordPress site, and their team handled it quickly and efficiently. Their technical understanding and communication were top-notch.",
    name: "Aarav S.",
    role: "Marketing Director, Fresh Start Media",
    rating: 5,
  },
  {
    quote:
      "Their malware removal service was a lifesaver when my blog was compromised. They got rid of the malware fast and provided valuable tips to prevent future attacks.",
    name: "David R.",
    role: "Blogger, Miami Insights",
    rating: 5,
  },
  {
    quote:
      "My e-commerce site was infected with malware, and I needed a quick solution. Their team did a fantastic job, and my site was back up and running in no time.",
    name: "Tom W.",
    role: "Owner, Aussie E-Commerce",
    rating: 5,
  },
];
