import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company } from "@/data/site";
import { contactCta } from "@/data/navigation";

/**
 * The site's recurring final call to action. Reused on most pages so the
 * primary action and tone stay consistent. CMS-managed later (reusable CTA).
 */
export function CtaSection({
  title = "Let's talk about your website",
  description = "Tell us what you need, a new build, a fix, faster pages, or someone reliable to look after the site you have. We'll reply with honest next steps.",
}: {
  title?: string;
  description?: string;
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
                <Link href={contactCta.href}>
                  {contactCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
              >
                <a href={`tel:${company.phoneHref}`}>
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
