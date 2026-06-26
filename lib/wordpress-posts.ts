import { type Post } from "@/data/posts";
import { fetchGraphQL } from "@/lib/graphql/client";
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/lib/graphql/queries";

interface GqlTextNode {
  name?: string | null;
}

interface GqlPost {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  content?: string | null;
  author?: { node?: GqlTextNode | null } | null;
  categories?: { nodes?: GqlTextNode[] | null } | null;
}

interface PostsResponse {
  posts?: { nodes?: GqlPost[] | null } | null;
}

interface PostResponse {
  post?: GqlPost | null;
}

function stripHtml(html = ""): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function estimateReadingMinutes(html = ""): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function mapPost(post: GqlPost): Post | undefined {
  if (!post.slug) return undefined;

  const category = post.categories?.nodes?.find((term) => term.name)?.name;
  const title = decodeEntities(stripHtml(post.title ?? "Untitled"));
  const content = post.content ?? "";

  return {
    slug: post.slug,
    title,
    description: decodeEntities(stripHtml(post.excerpt ?? "")),
    category: decodeEntities(category ?? "Blog"),
    datePublished: post.date ?? new Date().toISOString(),
    author: decodeEntities(post.author?.node?.name ?? "TheAppSense"),
    readingMinutes: estimateReadingMinutes(content),
    body: content,
  };
}

export async function getWordPressPosts(): Promise<Post[]> {
  const data = await fetchGraphQL<PostsResponse>(POSTS_QUERY, { first: 12 }, 300);
  return (data.posts?.nodes ?? [])
    .map(mapPost)
    .filter((post): post is Post => Boolean(post));
}

export async function getWordPressPostBySlug(
  slug: string,
): Promise<Post | undefined> {
  const data = await fetchGraphQL<PostResponse>(POST_BY_SLUG_QUERY, { slug }, 300);
  return data.post ? mapPost(data.post) : undefined;
}
