import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply to using TheAppSense's website and engaging our services.",
  path: "/terms",
});

const LAST_UPDATED = "June 21, 2026";

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Terms & Conditions", path: "/terms" },
            ]}
          />
          <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-foreground">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="prose-appsense mx-auto max-w-3xl">
          <p>
            These terms apply to your use of the {company.name} website. The
            specific terms of any project or service we provide are set out in the
            separate proposal or agreement we sign with you, which takes precedence
            over anything here.
          </p>

          <h2>Using this website</h2>
          <p>
            The content on this site is provided for general information. We work to
            keep it accurate and current, but we make no guarantee that it is
            complete or error-free, and it does not constitute a binding offer.
          </p>

          <h2>Quotes &amp; pricing</h2>
          <p>
            Any prices shown on this site, including our flat $99 malware-removal
            fix, describe our standard offering and may change. The price and scope
            for your specific project are confirmed in writing before work begins.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The branding, text, and design of this website belong to {company.name}.
            Work we deliver to clients is governed by the project agreement; in
            general, you own the website and code we build for you on full payment.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for indirect or
            consequential losses arising from use of this website. Nothing in these
            terms limits liability that cannot be limited by law.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Province of Ontario, Canada.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Use our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
