import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { getPostBySlug, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post)
    return buildMetadata({ title: "Article not found", description: "", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const related = (await getPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            path,
            datePublished: post.datePublished,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
        ]}
      />

      <article>
        <header className="border-b border-border bg-muted/40">
          <div className="container py-12 sm:py-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: post.title, path },
              ]}
            />
            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary">{post.category}</Badge>
                <time dateTime={post.datePublished}>
                  {formatDate(post.datePublished)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h1 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </div>
          </div>
        </header>

        <Section className="py-12 sm:py-16">
          <div
            className="prose-appsense mx-auto max-w-3xl"
            // Trusted HTML from WordPress post content.
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </Section>
      </article>

      {related.length > 0 && (
        <Section tone="muted" className="py-12 sm:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <Badge variant="secondary">{p.category}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
