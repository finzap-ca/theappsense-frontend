/**
 * Case studies / portfolio.
 *
 * These reference real projects from TheAppSense's existing portfolio. Outcomes
 * are described qualitatively, no invented statistics. CMS-managed later
 * (WordPress "Case Study" post type). Screenshots are rendered as labelled
 * placeholders until real project images are supplied.
 */

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  /** One-line summary for cards. */
  summary: string;
  challenge: string;
  solution: string;
  /** Honest, qualitative outcome, never an invented metric. */
  outcome: string;
  /** Service tags shown as chips. */
  services: string[];
  /** Real project screenshot in /public/work (carried over from the portfolio). */
  image: string;
  imageAlt: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "jt-pickfords",
    name: "JT Pickfords",
    category: "E-commerce · Bathroomware",
    summary:
      "A premium bathroomware retailer needed an online store that did justice to the products and made buying effortless.",
    challenge:
      "A large, detailed product range was hard to browse, and the buying experience didn't reflect the quality of the brand.",
    solution:
      "We built an e-commerce site that showcases each product clearly, organises the range so customers can find the right fixture quickly, and keeps checkout to a few simple steps.",
    outcome:
      "An online store that presents the catalogue properly and lets customers pay and buy in a few clicks.",
    services: ["E-commerce & WooCommerce", "Custom Web Development"],
    image: "/work/jt-pickfords.png",
    imageAlt: "JT Pickfords premium bathroomware e-commerce website",
  },
  {
    slug: "jameson-knight",
    name: "Jameson Knight",
    category: "Real estate · Property platform",
    summary:
      "A real estate business wanted a site that stood out in a crowded market and let users buy, sell, or rent.",
    challenge:
      "Real estate sites tend to look the same and bury listings behind clunky search. This one needed a distinctive, easy-to-use interface.",
    solution:
      "We designed and built a property site with a clean, modern interface that makes browsing listings simple and supports buying, selling, and renting in one place.",
    outcome:
      "A polished property platform with an interface that genuinely stands apart from typical real estate sites.",
    services: ["Custom Web Development", "WordPress Development"],
    image: "/work/jameson-knight.png",
    imageAlt: "Jameson Knight real estate property platform website",
  },
  {
    slug: "fashom",
    name: "Fashom",
    category: "Fashion · Online platform",
    summary:
      "A personal-styling fashion brand needed a flexible platform to present products and connect with shoppers.",
    challenge:
      "The experience had to feel fashion-forward while handling a steady flow of products and customer interaction.",
    solution:
      "We delivered a custom front end and supporting integrations so the team could merchandise products and engage customers without fighting the tooling.",
    outcome:
      "A flexible, on-brand platform the team can run day to day.",
    services: ["Custom Web Development", "E-commerce & WooCommerce"],
    image: "/work/fashom.png",
    imageAlt: "Fashom personal-styling fashion brand",
  },
  {
    slug: "orocrm",
    name: "OroCRM Implementation",
    category: "Business systems · CRM",
    summary:
      "A growing business needed its CRM tailored and integrated to match how the team actually worked.",
    challenge:
      "Off-the-shelf CRM didn't fit the team's process, leaving gaps and manual workarounds.",
    solution:
      "We configured and extended OroCRM to mirror the real workflow and connected it to the tools the team relied on.",
    outcome:
      "A CRM that fits the business rather than forcing the business to fit the tool.",
    services: ["Custom Web Development"],
    image: "/work/orocrm.png",
    imageAlt: "OroCRM implementation and customisation",
  },
  {
    slug: "nicole-azzopardi",
    name: "Nicole Azzopardi",
    category: "Personal site · Musician",
    summary:
      "A recording artist needed a fast, striking personal site to promote her music and talent.",
    challenge:
      "The site had to feel as polished as the artist's work and load instantly, while showcasing her biography, songs, and photography in one place.",
    solution:
      "We built a lightning-fast single-page site with a fully custom interface and subtle parallax effects, presenting her biography, popular songs, and photo shoots in a crisp, elegant design.",
    outcome:
      "A fast, distinctive one-page site that lets her music and personality lead.",
    services: ["Custom Web Development", "WordPress Development"],
    image: "/work/nicole-azzopardi.png",
    imageAlt: "Nicole Azzopardi single-page musician portfolio website",
  },
  {
    slug: "clockwork-pie",
    name: "Clockwork Pie",
    category: "Marketing site · Startup",
    summary:
      "A startup needed an eye-catching site to tell its story and support a fundraising push.",
    challenge:
      "The site needed creative design and smooth animation that stayed fully responsive across devices, without sacrificing clarity of message.",
    solution:
      "We designed and built a polished, animated marketing site where every section is crafted to communicate the business and support its fundraising goals.",
    outcome:
      "A creative, responsive site built to strategise the business and help raise funds.",
    services: ["Custom Web Development"],
    image: "/work/clockwork-pie.png",
    imageAlt: "Clockwork Pie animated startup marketing website",
  },
];
