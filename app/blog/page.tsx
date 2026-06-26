import { Section } from "@/components/sections/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getPosts } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical, no-fluff guides on WordPress security, website speed, maintenance, and getting more from your site, written for business owners.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]}
          />
          <div className="mt-8 max-w-2xl">
            <SectionHeading
              as="h1"
              eyebrow="Blog"
              title="Practical guides for website owners"
              description="Clear, useful advice on keeping a website fast, secure, and working, written to be understood by business owners, not just developers."
            />
          </div>
        </div>
      </section>

      <Section>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-foreground">
              Articles are being prepared.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Published WordPress posts from wp.theappsense.com will appear here.
            </p>
          </div>
        )}
      </Section>

      <CtaSection />
    </>
  );
}
