import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getServiceBySlug } from "@/lib/content";
import { getServiceSlugs } from "@/data/services";

interface Params {
  params: { slug: string };
}

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params) {
  const service = getServiceBySlug(params.slug);
  if (!service) return buildMetadata({ title: "Service not found", description: "", noIndex: true });
  return buildMetadata({
    title: service.meta.title,
    description: service.meta.description,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: Params) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.meta.description,
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
          // FAQ schema is safe here, the same questions render on the page.
          faqSchema(service.faqs),
        ]}
      />
      <ServiceDetail service={service} />
      <CtaSection />
    </>
  );
}
