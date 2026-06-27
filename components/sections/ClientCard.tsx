import { type Client } from "@/data/clients";
import { Badge } from "@/components/ui/badge";

/** Initials monogram used as a light visual anchor (no logo assets needed). */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ClientCard({ client }: { client: Client }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-primary ring-1 ring-inset ring-primary/15"
        >
          {monogram(client.name)}
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            {client.name}
          </h3>
          <p className="text-xs text-muted-foreground">{client.category}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {client.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {client.services.map((s) => (
          <Badge key={s} variant="muted">
            {s}
          </Badge>
        ))}
      </div>
    </article>
  );
}
