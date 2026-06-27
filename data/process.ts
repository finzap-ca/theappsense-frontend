import {
  MessagesSquare,
  ArrowRightLeft,
  ShieldCheck,
  Coffee,
  type LucideIcon,
} from "lucide-react";

/**
 * How working with us works, shown on the homepage and about page.
 * CMS-managed later (reusable content block).
 */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const engagementProcess: ProcessStep[] = [
  {
    number: "01",
    title: "Tell us about your site",
    description:
      "Tell us what's going on, a slow site, a hack, or just no one looking after it. We listen and recommend the right fit, honestly, with no pressure.",
    icon: MessagesSquare,
  },
  {
    number: "02",
    title: "We move it over, free",
    description:
      "We migrate your site to our managed hosting at no cost, then set up backups, security, and monitoring, with near-zero downtime.",
    icon: ArrowRightLeft,
  },
  {
    number: "03",
    title: "We look after it",
    description:
      "Updates, security, backups, and speed are handled for you. When something needs attention, you reach a real person, fast.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "You focus on the business",
    description:
      "Your site stays fast, secure, and online, and you stop thinking about WordPress upkeep. That's the whole point.",
    icon: Coffee,
  },
];
