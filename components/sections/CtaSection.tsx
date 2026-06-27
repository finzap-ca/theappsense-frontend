import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatButton } from "@/components/ChatButton";
import { primaryCta } from "@/data/navigation";

/**
 * The site's recurring closing call to action. Hosting-led by default (the
 * product), with live chat as the "talk to us now" action. Pages can override
 * the copy or the primary action where a different intent fits (e.g. the
 * portfolio page). CMS-managed later (reusable CTA block).
 */
export function CtaSection({
  title = "Hand your WordPress site to people who'll keep it running",
  description = "Move to fully managed hosting and we'll handle speed, security, backups, and updates for you, with free migration and no lock-in. A faster, safer site, and a real person a click away.",
  primaryAction = primaryCta,
}: {
  title?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
}) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-ink to-ink p-8 sm:p-12">
          <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-lg text-ink-muted">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverted">
                <Link href={primaryAction.href}>
                  {primaryAction.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <ChatButton label="Chat with us" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              We&apos;re online and usually reply in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
