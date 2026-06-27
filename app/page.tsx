import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatButton } from "@/components/ChatButton";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PricingTable } from "@/components/sections/PricingTable";
import { ClientCard } from "@/components/sections/ClientCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqSchema } from "@/lib/seo";
import {
  getServices,
  getServiceBySlug,
  getClients,
  getPosts,
  getGeneralFaqs,
} from "@/lib/content";
import { engagementProcess } from "@/data/process";
import { company } from "@/data/site";
import { primaryCta, HOSTING_HREF } from "@/data/navigation";

export const metadata = buildMetadata({
  title: "Managed WordPress Hosting, Care & Security | TheAppSense",
  description: company.shortDescription,
  path: "/",
});

const problems = [
  "Your hosting is slow, or your site goes down at the worst time.",
  "You were hacked, hit with malware, or flagged by Google.",
  "Updates, backups, and security are nobody's job right now.",
  "Something breaks and there's no one reliable to call.",
];

export default async function HomePage() {
  const services = getServices();
  const hosting = getServiceBySlug("managed-wordpress-hosting");
  const clients = getClients().slice(0, 3);
  const posts = (await getPosts()).slice(0, 3);
  const faqs = getGeneralFaqs();

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-success" />
              Managed WordPress Hosting · 24/7 live chat
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Managed WordPress hosting that keeps your site fast and secure
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              We host, monitor, back up, and protect your WordPress site on
              infrastructure tuned for speed, with malware removal, updates, and
              real support included. Free migration, no lock-in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <ChatButton label="Chat with us" />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                "Free migration",
                "Malware removal included",
                "Daily backups",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual: an isometric illustration of a cared-for website,
              with security, speed, and backup signals. */}
          <div className="relative">
            <Image
              src="/hero/home-hero.png"
              alt="An illustration of a website dashboard surrounded by security, speed, and backup icons"
              width={873}
              height={610}
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="mx-auto h-auto w-full max-w-[560px]"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <Section className="py-12 sm:py-12">
        <TrustStrip />
      </Section>

      {/* Hosting: the core product */}
      {hosting && (
        <Section tone="muted" id="hosting">
          <SectionHeading
            eyebrow="Managed WordPress Hosting"
            title="Hosting built for WordPress, managed by people"
            description="Most hosts hand you a server and walk away. We run the whole thing, performance, security, backups, and updates, so your site stays fast and online and you have a real person to call."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hosting.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {hosting.plans && (
            <div className="mt-12">
              <h3 className="text-center font-display text-2xl font-bold tracking-tight text-foreground">
                Simple, transparent plans
              </h3>
              {hosting.plansNote && (
                <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
                  {hosting.plansNote}
                </p>
              )}
              <div className="mt-10">
                <PricingTable plans={hosting.plans} />
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href={HOSTING_HREF}>
                    See everything included in hosting
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Services around WordPress */}
      <Section id="services">
        <SectionHeading
          eyebrow="More WordPress services"
          title="Everything around your WordPress site, handled"
          description="Hosting is the core, but we also fix, secure, speed up, and build WordPress sites. Hosting clients get care and security built in; everyone else can hire us for any of it on its own."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((service) => service.slug !== "managed-wordpress-hosting")
            .map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
        </div>
      </Section>

      {/* Problems we solve */}
      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sound familiar?"
              title="The WordPress headaches we take off your plate"
              description="Most businesses don't need another agency, they need someone dependable to handle the parts of a WordPress site that quietly go wrong."
            />
            <Button asChild className="mt-8" variant="outline">
              <Link href="/services">
                See all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-4">
            {problems.map((problem) => (
              <li
                key={problem}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-foreground/90 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="Easy to start, looked after for the long run"
          description="Free migration to get going, plain-language updates along the way, and a real person who's still there when you need a hand months later."
        />
        <div className="mt-12">
          <ProcessSteps steps={engagementProcess} />
        </div>
      </Section>

      {/* Our clients */}
      <Section tone="muted">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our clients"
            title="Businesses that trust us with their site"
          />
          <Button asChild variant="ghost">
            <Link href="/clients">
              Meet our clients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.slug} client={client} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading
          eyebrow="What clients say"
          title="Trusted when it matters most"
          description="Much of our work starts with an emergency, a hacked site, a site that's down. Here's what clients say after we've put things right."
        />
        <div className="mt-12">
          <Testimonials limit={6} />
        </div>
      </Section>

      {/* Malware $99 highlight */}
      <Section tone="ink">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Badge variant="warning" className="bg-warning/15">
              Emergency cleanup
            </Badge>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Hacked WordPress site? We&apos;ll clean it for a flat $99
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg text-ink-muted">
              Malicious redirects, spam, defacement, or hidden backdoors, removed, your site restored, and the hole closed so it doesn&apos;t
              happen again. One flat fee, no upsells.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverted">
                <Link href="/get-started?intent=malware">
                  Clean my site now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <ChatButton label="Chat with us now" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-sm text-ink-muted">One-time fix</p>
            <p className="font-display text-6xl font-bold">$99</p>
            <p className="mt-3 text-sm text-ink-muted">
              Full cleanup, security hardening, and a reindex request, per site.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="The questions we hear most"
          />
          <Faq items={faqs} />
        </div>
      </Section>

      {/* Blog */}
      {posts.length > 0 && (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="From the blog" title="Practical guides, no fluff" />
            <Button asChild variant="ghost">
              <Link href="/blog">
                All articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
