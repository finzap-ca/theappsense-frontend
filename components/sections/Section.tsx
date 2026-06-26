import { type ReactNode, type ElementType } from "react";

import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "ink" | "accent";

const toneClasses: Record<Tone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  ink: "bg-ink text-ink-foreground",
  accent: "bg-accent text-accent-foreground",
};

/**
 * Consistent vertical section rhythm + width. Every page composes these so
 * spacing and container width stay uniform across the site.
 */
export function Section({
  children,
  tone = "default",
  className,
  containerClassName,
  as: As = "section",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <As id={id} className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </As>
  );
}
