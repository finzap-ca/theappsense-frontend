import Link from "next/link";
import { Mail, Phone, Clock, MapPin, LifeBuoy, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Faq } from "@/components/sections/Faq";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getGeneralFaqs } from "@/lib/content";
import { company } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with TheAppSense for a quote, a hacked-site fix, or help with your WordPress website. We reply to every enquiry within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const faqs = getGeneralFaqs();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />
          <div className="mt-8 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="Tell us what you need"
              description="Whether it's a new website, a redesign, a hacked site, or ongoing care, send us a few details and we'll reply with honest next steps within one business day."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fields marked <span className="text-destructive">*</span> are
              required.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Direct contact details */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-base font-semibold text-foreground">
                Prefer to reach us directly?
              </h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a
                      href={`tel:${company.phoneHref}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {company.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Hours</p>
                    <p className="text-muted-foreground">{company.hours}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Where we are</p>
                    <p className="text-muted-foreground">
                      Greater Toronto Area, serving clients across Canada and the
                      U.S.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-warning/30 bg-warning/5 p-6">
              <p className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                <LifeBuoy className="h-4 w-4 text-warning" />
                Site hacked or down right now?
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Skip the general form. Our guided emergency intake gets your
                details to a specialist fast, or call us for the quickest
                response.
              </p>
              <Button asChild className="mt-4" size="sm">
                <Link href="/get-started">
                  Get emergency help
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before you ask" title="Common questions" />
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
