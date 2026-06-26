import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/content";
import { serviceGroups } from "@/data/services";
import { engagementProcess } from "@/data/process";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "WordPress development, custom web development, e-commerce, managed hosting, care plans, malware removal, and speed optimization, for small and growing businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
          <div className="mt-8">
            <SectionHeading
              as="h1"
              eyebrow="Services"
              title="Everything your website needs, under one roof"
              description="Whether you're starting fresh, recovering from a problem, or just want your site properly looked after, here's how we can help."
            />
          </div>
        </div>
      </section>

      <Section containerClassName="space-y-16">
        {serviceGroups.map((group) => {
          const groupServices = group.slugs
            .map((slug) => getServiceBySlug(slug))
            .filter((s): s is NonNullable<typeof s> => Boolean(s));
          return (
            <div key={group.key}>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 p-2">
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {group.title}
                  </h2>
                  <p className="mt-1 max-w-xl text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we work"
          title="The same clear process, whatever you need"
        />
        <div className="mt-12">
          <ProcessSteps steps={engagementProcess} />
        </div>
        <div className="mt-10">
          <Button asChild>
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
