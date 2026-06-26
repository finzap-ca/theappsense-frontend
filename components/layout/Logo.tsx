import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * TheAppSense wordmark. The mark is an inline SVG (no image request, scales
 * crisply, themable via currentColor) suggesting layered, well-built structure.
 */
export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  /** "inverted" for use on the dark ink surface (footer / CTA). */
  variant?: "default" | "inverted";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display",
        className,
      )}
      aria-label="TheAppSense, home"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect
            x="3"
            y="3"
            width="13"
            height="13"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect x="9" y="9" width="12" height="12" rx="3" fill="currentColor" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[1.15rem] font-bold tracking-tight",
          variant === "inverted" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        TheApp<span className="text-primary">Sense</span>
      </span>
    </Link>
  );
}
