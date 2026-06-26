import { Clock, MessageSquare, ShieldCheck, Wrench } from "lucide-react";

/**
 * Honest credibility strip. Every item is a verifiable fact about how we work,
 * no invented stats, awards, or client counts.
 */
const signals = [
  {
    icon: Wrench,
    title: "A decade of WordPress",
    description: "Built and maintained on WordPress for over ten years.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first",
    description: "Hardening, backups, and monitoring on every site we run.",
  },
  {
    icon: MessageSquare,
    title: "24/7 live chat",
    description: "Chat with a real person any time, day or night.",
  },
  {
    icon: Clock,
    title: "Real support hours",
    description: "Phone and email support, 7 AM to 9 PM ET.",
  },
];

export function TrustStrip() {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {signals.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="flex flex-col gap-2 bg-card p-6">
            <Icon className="h-5 w-5 text-primary" />
            <p className="font-display text-sm font-semibold text-foreground">
              {s.title}
            </p>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
