/**
 * Content repository, the seam between page components and the content source.
 *
 * Non-blog content remains hard-coded in `data/`. Blog routes are wired to
 * the existing WordPress install through WPGraphQL only.
 */
import { services, type Service } from "@/data/services";
import { clients, type Client } from "@/data/clients";
import { generalFaqs, type Faq } from "@/data/faqs";
import { type Post } from "@/data/posts";
import {
  getWordPressPostBySlug,
  getWordPressPosts,
} from "@/lib/wordpress-posts";

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getClients(): Client[] {
  return clients;
}

export async function getPosts(): Promise<Post[]> {
  return (await getWordPressPosts()).sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getWordPressPostBySlug(slug);
}

export function getGeneralFaqs(): Faq[] {
  return generalFaqs;
}
