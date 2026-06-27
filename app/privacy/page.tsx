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

const LAST_UPDATED = "June 26, 2026";

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
            This policy explains what information {company.name}, a service of{" "}
            {company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), collects when
            you use this website, chat with us, or become a hosting or services
            client, and how we handle it. We keep it deliberately short and plain.
          </p>

          <h2>Information we collect</h2>
          <p>
            <strong>Information you give us.</strong> When you submit our contact
            form or start a live chat, we receive what you provide, such as your
            name, email address, phone number, your message or chat, and details
            about your website. We use this to reply and, if you become a client,
            to deliver the service you&apos;ve asked for.
          </p>
          <p>
            <strong>Information collected automatically.</strong> Like most
            websites, we collect basic technical data through cookies and analytics,
            such as your approximate location, device and browser, pages viewed, and
            how you reached us. This helps us understand traffic and improve the
            site.
          </p>
          <p>
            <strong>Hosting client data.</strong> When we host or maintain your
            WordPress site, we process the data on that site on your behalf, as your
            service provider. You remain responsible for your site&apos;s own privacy
            practices and for what your visitors submit to it.
          </p>

          <h2>Cookies &amp; analytics</h2>
          <p>
            We use <strong>Google Analytics</strong> and{" "}
            <strong>Google Tag Manager</strong> to understand how the site is used,
            and <strong>Google Search Console</strong> to monitor how the site
            performs in search. These set cookies and may collect a truncated IP
            address, device information, and usage data. We use{" "}
            <strong>Tawk.to</strong> for live chat, which sets cookies and stores
            your chat messages so we can respond and keep a record of the
            conversation.
          </p>
          <p>
            You can block or delete cookies through your browser settings, and opt
            out of Google Analytics with Google&apos;s browser add-on. Blocking some
            cookies may affect how parts of the site work.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and provide the services you ask for.</li>
            <li>To host, secure, back up, and support your website.</li>
            <li>To understand site usage and improve our service.</li>
            <li>To take payment and meet our legal and accounting obligations.</li>
          </ul>
          <p>
            We do not sell your information, and we do not send marketing you
            didn&apos;t ask for.
          </p>

          <h2>Who we share it with</h2>
          <p>
            We share information only with the providers we rely on to run the
            service, and only as needed. These include:
          </p>
          <ul>
            <li>
              <strong>Google</strong> (Analytics, Tag Manager, Search Console) for
              analytics and search performance.
            </li>
            <li>
              <strong>Tawk.to</strong> for live chat.
            </li>
            <li>
              <strong>Cloudflare</strong> for content delivery, security, and DDoS
              protection.
            </li>
            <li>
              <strong>Amazon Web Services (S3)</strong> for off-site backups of the
              sites we host.
            </li>
            <li>Our payment and accounting providers, to process payments.</li>
          </ul>
          <p>
            We may also disclose information if required by law. We do not otherwise
            share your information.
          </p>

          <h2>International transfers</h2>
          <p>
            Some of these providers (for example Google, Tawk.to, Cloudflare, and
            AWS) process data on servers outside Canada, including in the United
            States. Where that happens, we rely on those providers&apos; safeguards
            for handling international data.
          </p>

          <h2>Keeping your information safe</h2>
          <p>
            We take reasonable technical and organisational measures to protect the
            information you share with us, and we keep it only as long as needed for
            the purposes above or to meet our legal obligations.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you, request a correction,
            or ask us to delete it. To do any of these, reach us through our{" "}
            <a href="/contact">contact page</a>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we&apos;ll
            change the &ldquo;last updated&rdquo; date above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach us through our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
