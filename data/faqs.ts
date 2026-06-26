/**
 * General FAQs shown on the homepage and contact page.
 *
 * Service-specific FAQs live on each service in `data/services`. CMS-managed
 * later (WordPress "FAQ" post type). Only render FAQ schema where these exact
 * questions are visible on the page.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const generalFaqs: Faq[] = [
  {
    question: "What does TheAppSense actually do?",
    answer:
      "We design, build, host, secure, and maintain websites, mostly on WordPress, for small and growing businesses. That includes new builds, redesigns, e-commerce, malware cleanup, speed work, managed hosting, and ongoing care plans.",
  },
  {
    question: "Do you only work with WordPress?",
    answer:
      "WordPress is our core, because it's a great fit for most business sites and it keeps you in control of your own content. For custom applications we use modern frameworks where they serve you better. We recommend the right tool for the job, not the one that's easiest for us.",
  },
  {
    question: "Where are you based, and who do you work with?",
    answer:
      "We're based in the Greater Toronto Area and work with clients across Canada and the United States. Projects run remotely, with clear communication and predictable timelines.",
  },
  {
    question: "What if my site is already built, can you still help?",
    answer:
      "Absolutely. A lot of our work is improving sites others built: fixing speed and security issues, cleaning up after a hack, modernising the design, or taking over ongoing maintenance.",
  },
  {
    question: "How do projects usually start?",
    answer:
      "With a conversation. Tell us what you need through the contact form and we'll reply with honest next steps, whether that's a quote, a quick fix, or a recommendation. There's no obligation.",
  },
];
