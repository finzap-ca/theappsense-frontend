import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ClientCard } from "@/components/sections/ClientCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getClients } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Our Clients",
  description:
    "The businesses TheAppSense hosts, supports, and looks after, across e-commerce, real estate, and more. Long-term relationships, not one-off projects.",
  path: "/clients",
});

export default function ClientsPage() {
  const clients = getClients();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Clients", path: "/clients" },
            ]}
          />
          <div className="mt-8 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Our clients"
              title="Businesses that trust us with their site"
              description="We're not a project shop, most of our work is long-term. Here are some of the businesses we host, secure, and look after day to day."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.slug} client={client} />
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
          Want to speak with one of our clients before you commit?{" "}
          <a
            href="/contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Get in touch
          </a>{" "}
          and we&apos;ll connect you.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="In their words"
          title="What clients say"
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
