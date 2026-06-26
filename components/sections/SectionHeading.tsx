import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reusable section header: optional eyebrow, a heading, and a lead paragraph.
 * `as` controls the heading level so pages keep a logical h1 → h2 → h3 order.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance font-display font-bold tracking-tight text-foreground",
          Heading === "h1"
            ? "text-4xl sm:text-5xl"
            : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
