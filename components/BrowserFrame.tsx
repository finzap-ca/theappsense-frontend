import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A lightweight browser-window frame used to present project previews and
 * interface visuals without stock photography.
 *
 * TODO (assets): drop a real project screenshot in as the child <img> to
 * replace the CSS placeholder content. Keep the same frame for consistency.
 */
export function BrowserFrame({
  url = "yoursite.com",
  children,
  className,
  tone = "light",
}: {
  url?: string;
  children?: ReactNode;
  className?: string;
  tone?: "light" | "ink";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-lg",
        tone === "ink" ? "border-white/10 bg-ink" : "border-border bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-4 py-2.5",
          tone === "ink" ? "border-white/10" : "border-border bg-muted/60",
        )}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </span>
        <span
          className={cn(
            "ml-2 truncate rounded px-2 py-0.5 text-xs",
            tone === "ink"
              ? "bg-white/5 text-ink-muted"
              : "bg-background text-muted-foreground",
          )}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
