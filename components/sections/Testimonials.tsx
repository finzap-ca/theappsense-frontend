import { Star } from "lucide-react";

import { testimonials, TRUSTPILOT_URL } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-warning text-warning"
              : "h-4 w-4 text-border"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Real, attributable customer testimonials + a link to the Trustpilot profile. */
export function Testimonials({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <Stars rating={t.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <span className="block text-sm font-semibold text-foreground">
                {t.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        More reviews on{" "}
        <a
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4"
        >
          Trustpilot
        </a>
        .
      </p>
    </div>
  );
}
