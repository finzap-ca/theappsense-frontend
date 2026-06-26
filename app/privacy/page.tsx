import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How TheAppSense collects, uses, and protects the information you share with us.",
  path: "/privacy",
});

const LAST_UPDATED = "June 21, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ]}
          />
          <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="prose-appsense mx-auto max-w-3xl">
          <p>
            This policy explains what information {company.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;) collects when you use this website or contact us, and
            how we handle it. We keep this deliberately short and plain.
          </p>

          <h2>Information we collect</h2>
          <p>
            We only collect information you choose to give us. When you submit our
            contact form or email us, we receive the details you provide, such as
            your name, email address, phone number, and your message. We use this
            solely to respond to your enquiry and, if you become a client, to
            deliver the work you&apos;ve asked for.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and discuss your project.</li>
            <li>To provide and support the services you engage us for.</li>
            <li>To meet our legal and accounting obligations.</li>
          </ul>
          <p>
            We do not sell your information, and we do not send marketing emails
            you didn&apos;t ask for.
          </p>

          <h2>Analytics &amp; cookies</h2>
          <p>
            If analytics are enabled on this site, they are used only to understand
            general traffic patterns in aggregate, not to identify you personally.
            You can control cookies through your browser settings at any time.
          </p>

          <h2>Sharing</h2>
          <p>
            We share your information only with the service providers we rely on to
            run our business (for example, email or hosting providers), and only as
            needed to serve you. We may disclose information if required by law.
          </p>

          <h2>Keeping your information safe</h2>
          <p>
            We take reasonable technical and organisational measures to protect the
            information you share with us, and we keep it only as long as needed for
            the purposes above.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you, request a correction,
            or ask us to delete it. To do any of these, email us at{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach us at{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a> or{" "}
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
