import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WorkCard } from "@/components/sections/WorkCard";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getCaseStudies } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "A selection of websites and web applications TheAppSense has designed, built, and supported, across e-commerce, real estate, and business systems.",
  path: "/work",
});

export default function WorkPage() {
  const studies = getCaseStudies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]}
          />
          <div className="mt-8">
            <SectionHeading
              as="h1"
              eyebrow="Our work"
              title="Projects we've built and look after"
              description="A few examples of the websites and systems we've delivered. We let the work speak for itself, no inflated numbers, just what we built and why."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {studies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
          Want to talk to a past client or see examples closer to your project?{" "}
          <a href="/contact" className="font-medium text-primary underline underline-offset-4">
            Get in touch
          </a>{" "}
          and we&apos;ll share what fits.
        </p>
      </Section>

      <CtaSection title="Have a project in mind?" />
    </>
  );
}
