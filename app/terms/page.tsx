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

const LAST_UPDATED = "June 26, 2026";

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
            These terms apply to your use of the {company.name} website and to the
            hosting, care, and related services we provide. {company.name} is a
            service of {company.legalName}. For project or development work, the
            separate proposal or agreement we sign with you takes precedence over
            anything here.
          </p>

          <h2>Using this website</h2>
          <p>
            The content on this site is provided for general information. We work to
            keep it accurate and current, but we make no guarantee that it is
            complete or error-free, and it does not constitute a binding offer.
          </p>

          <h2>Hosting plans &amp; subscriptions</h2>
          <p>
            Our managed hosting and care plans are subscriptions, billed in advance
            either monthly or annually as you choose.
          </p>
          <ul>
            <li>
              <strong>Renewals.</strong> Plans renew automatically at the end of
              each term at the then-current price, until you cancel.
            </li>
            <li>
              <strong>Cancellation.</strong> You can cancel at any time through our{" "}
              <a href="/contact">contact page</a> or live chat. Cancellation takes
              effect at the end of your current billing term, and your service
              continues until then.
            </li>
            <li>
              <strong>Refunds.</strong> Fees already paid are non-refundable except
              where required by law. We don&apos;t charge cancellation or setup fees.
            </li>
            <li>
              <strong>Price changes.</strong> We may change plan prices; any change
              applies from your next renewal, and prices shown on the site may be
              updated at any time.
            </li>
            <li>
              <strong>Taxes.</strong> Prices are exclusive of any applicable taxes.
            </li>
          </ul>
          <p>
            The flat $99 malware-removal fix applies to sites hosted elsewhere; for
            sites we host, malware removal is included under the fair-use terms
            below.
          </p>

          <h2>Fair use, backups &amp; availability</h2>
          <ul>
            <li>
              <strong>Free malware removal</strong> is included with hosting under
              fair use. We&apos;ll clean and restore a hacked site, but chronic
              reinfection caused by outdated, abandoned, or pirated (&ldquo;nulled&rdquo;)
              plugins and themes isn&apos;t covered indefinitely.
            </li>
            <li>
              <strong>Backups.</strong> We keep automated off-site backups of the
              sites we host, but you remain responsible for keeping your own copies.
              We don&apos;t guarantee against all data loss.
            </li>
            <li>
              <strong>Availability.</strong> We aim for high availability but
              don&apos;t guarantee uninterrupted or error-free service, and we
              aren&apos;t responsible for downtime outside our reasonable control.
            </li>
          </ul>

          <h2>Acceptable use</h2>
          <p>
            You agree not to use our hosting for anything illegal, for content you
            don&apos;t have the rights to, for pirated or nulled software, or for
            anything that harms our platform, other customers, or third parties. We
            may suspend or terminate service for serious or repeated breaches.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The branding, text, and design of this website belong to {company.name}.
            Development work we deliver is governed by the project agreement; in
            general, you own the website and code we build for you on full payment.
            You keep ownership of your own content and data on the sites we host.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, we are not liable for indirect or
            consequential losses, including lost profits or lost data, arising from
            use of this website or our services. Nothing in these terms limits
            liability that cannot be limited by law.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Province of Ontario, Canada.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. When we do, we&apos;ll
            change the &ldquo;last updated&rdquo; date above; continued use of the
            service means you accept the updated terms.
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
