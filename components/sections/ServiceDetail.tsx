import Link from "next/link";
import { ArrowRight, Check, Phone, AlertTriangle } from "lucide-react";

import { type Service } from "@/data/services";
import { company } from "@/data/site";
import { contactCta } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { Breadcrumbs } from "./Breadcrumbs";
import { FeatureGrid } from "./FeatureGrid";
import { PricingCard } from "./PricingCard";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { RelatedServices } from "./RelatedServices";

/** Full, consistent layout for a single service page. */
export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  // Whether an extra band (pricing or testimonials) sits before the FAQ, so
  // the FAQ + Related section tones keep alternating cleanly.
  const hasExtraBand =
    Boolean(service.plans && service.plans.length > 0) ||
    Boolean(service.showTestimonials);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/50">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="container relative py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-primary">
                <Icon className="h-4 w-4" />
                {service.hero.eyebrow}
              </div>
              <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.hero.headline}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {service.hero.subhead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {service.intake ? (
                  <Button asChild size="lg">
                    <Link href={`/get-started?intent=${service.intake.intent}`}>
                      {service.intake.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg">
                    <Link href={contactCta.href}>
                      {contactCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${company.phoneHref}`}>
                    <Phone className="h-4 w-4" />
                    {company.phone}
                  </a>
                </Button>
              </div>
            </div>

            {/* Outcomes / offer panel */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {service.offer && (
                <div className="mb-6 flex items-end justify-between gap-4 rounded-xl bg-ink p-5 text-ink-foreground">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                      {service.offer.label}
                    </p>
                    <p className="font-display text-4xl font-bold">
                      {service.offer.value}
                    </p>
                  </div>
                  <p className="max-w-[12rem] text-xs leading-relaxed text-ink-muted">
                    {service.offer.note}
                  </p>
                </div>
              )}
              <p className="font-display text-sm font-semibold text-foreground">
                What you get
              </p>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            as="h2"
            eyebrow="The problem"
            title={service.problem.heading}
          />
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {service.problem.body}
          </p>
        </div>
      </Section>

      {/* Common issues we fix (e.g. WordPress support page) */}
      {service.commonIssues && service.commonIssues.length > 0 && (
        <Section tone="ink">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Common errors
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {service.commonIssuesIntro?.heading ?? "Errors we fix"}
            </h2>
            {service.commonIssuesIntro?.body && (
              <p className="mt-4 text-pretty text-lg text-ink-muted">
                {service.commonIssuesIntro.body}
              </p>
            )}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.commonIssues.map((issue) => (
              <li
                key={issue.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-2">
                  {issue.code && (
                    <span className="rounded bg-ink-foreground/10 px-1.5 py-0.5 font-mono text-xs font-medium text-ink-foreground">
                      {issue.code}
                    </span>
                  )}
                  {issue.emergency && (
                    <span className="inline-flex items-center gap-1 rounded bg-warning/20 px-1.5 py-0.5 text-xs font-medium text-warning">
                      <AlertTriangle className="h-3 w-3" />
                      Site down
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-ink-foreground">
                  {issue.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {issue.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {service.intake ? (
              <Button asChild size="lg" variant="inverted">
                <Link href={`/get-started?intent=${service.intake.intent}`}>
                  {service.intake.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="inverted">
                <Link href={contactCta.href}>
                  {contactCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
            >
              <a href={`tel:${company.phoneHref}`}>
                <Phone className="h-4 w-4" />
                Call now
              </a>
            </Button>
          </div>
        </Section>
      )}

      {/* What's included */}
      <Section tone="muted">
        <SectionHeading
          as="h2"
          eyebrow="What's included"
          title={`How our ${service.title.toLowerCase()} works`}
        />
        <div className="mt-10">
          <FeatureGrid features={service.features} />
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          as="h2"
          eyebrow="The process"
          title="A clear, predictable path"
          description="No mystery and no jargon, you always know what's happening and what's next."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="font-display text-sm font-bold text-primary">
                Step {i + 1}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Testimonials (opt-in per service) */}
      {service.showTestimonials && (
        <Section tone="muted">
          <SectionHeading
            as="h2"
            eyebrow="What clients say"
            title="Trusted to put things right"
            description="Many of these reviews come from owners whose sites we recovered after a hack."
          />
          <div className="mt-12">
            <Testimonials limit={3} />
          </div>
        </Section>
      )}

      {/* Pricing (only when the service defines plans) */}
      {service.plans && service.plans.length > 0 && (
        <Section tone="muted" id="pricing">
          <SectionHeading
            as="h2"
            eyebrow="Plans & pricing"
            title="Simple, transparent pricing"
            description={service.plansNote}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section tone={hasExtraBand ? "default" : "muted"}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            as="h2"
            eyebrow="FAQ"
            title="Questions, answered"
          />
          <Faq items={service.faqs} />
        </div>
      </Section>

      {/* Related */}
      <Section tone={hasExtraBand ? "muted" : "default"}>
        <RelatedServices slugs={service.relatedSlugs} />
      </Section>
    </>
  );
}
