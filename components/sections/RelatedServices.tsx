import { getServiceBySlug } from "@/lib/content";
import { ServiceCard } from "./ServiceCard";
import { SectionHeading } from "./SectionHeading";

/** Renders a small grid of related services from a list of slugs. */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (related.length === 0) return null;

  return (
    <div>
      <SectionHeading as="h2" title="Related services" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
