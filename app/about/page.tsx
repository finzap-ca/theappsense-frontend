import Link from "next/link";
import { ArrowRight, Check, Heart, MessageSquare, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { engagementProcess } from "@/data/process";
import { company } from "@/data/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "TheAppSense is a managed WordPress hosting and support company in the Greater Toronto Area, keeping small and growing businesses' sites fast, secure, and online.",
  path: "/about",
});

const values = [
  {
    icon: MessageSquare,
    title: "Plain language, always",
    description:
      "We explain what we're doing and why, without jargon or scare tactics. You'll always understand what you're paying for.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last, not to lock you in",
    description:
      "Clean code, no proprietary traps, and full ownership handed to you. Any competent developer can pick up where we left off.",
  },
  {
    icon: Heart,
    title: "Around after launch",
    description:
      "Most of our relationships are long-term. We're the team you call months later when something needs changing, and we remember your site.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <SectionHeading
              as="h1"
              eyebrow="About TheAppSense"
              title="The team behind your WordPress hosting and support"
              description="TheAppSense is a managed WordPress hosting and support company. We keep small and growing businesses fast, secure, backed up, and online, and handle the WordPress work around them."
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="prose-appsense max-w-none">
            <h2>Why we exist</h2>
            <p>
              Most hosting companies hand you a server and disappear. Most
              agencies build a site and move on. Either way, you&apos;re left to
              keep WordPress updated, backed up, and secure yourself, until
              something breaks and there&apos;s no one to call.
            </p>
            <p>
              We work differently. {company.name} runs your WordPress site for
              you: fast, secure hosting with updates, backups, monitoring, and
              malware protection handled, plus a real person on support. Our team
              has been hosting and maintaining WordPress sites for over a decade,
              and that experience shows up in how few surprises our clients run
              into.
            </p>
            <h2>Who we work with</h2>
            <p>
              Small and growing businesses around the world, the kind that
              depend on their website but don&apos;t have an in-house developer
              to keep it running. We become that team, without the cost of
              hiring one.
            </p>
          </div>

          <ul className="space-y-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <li
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Credibility */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="How we operate"
          title="What working with us is actually like"
        />
        <div className="mt-10">
          <TrustStrip />
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            "Predictable pricing and free migration, no surprises",
            "You own the code, content, and hosting account outright",
            "Updates in plain language, not developer jargon",
            "A real person on support, plus 24/7 live chat",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="Our process" title="What working with us looks like" />
        <div className="mt-12">
          <ProcessSteps steps={engagementProcess} />
        </div>
        <div className="mt-10">
          <Button asChild>
            <Link href="/contact">
              Work with us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Team */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The team"
          title="The team keeping your site online"
          description="A small, focused team. When you need help, you reach the same people who run your hosting and know your site, not a rotating support queue."
        />
        <div className="mt-12">
          <TeamGrid />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
