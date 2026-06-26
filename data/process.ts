import {
  MessagesSquare,
  PencilRuler,
  Hammer,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

/**
 * How an engagement works, shown on the homepage and about page.
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
    title: "Talk it through",
    description:
      "Tell us what you need. We listen, ask the right questions, and come back with honest, specific next steps, not a generic pitch.",
    icon: MessagesSquare,
  },
  {
    number: "02",
    title: "Plan & quote",
    description:
      "We scope the work clearly and give you a realistic timeline and a fixed quote, so you know exactly what you're getting before we start.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Build & review",
    description:
      "We do the work in reviewable stages, keep you updated in plain language, and test thoroughly across devices before anything goes live.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Launch & look after",
    description:
      "We launch carefully and stay available. With a care plan, we keep the site fast, updated, and secure long after go-live.",
    icon: LifeBuoy,
  },
];
