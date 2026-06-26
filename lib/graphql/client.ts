import {
  HAS_WORDPRESS,
  WORDPRESS_GRAPHQL_ENDPOINT,
  WORDPRESS_GRAPHQL_HOST_HEADER,
} from "@/lib/env";

/**
 * Minimal, dependency-free GraphQL client for headless WordPress (WPGraphQL).
 *
 * This is the *only* place the app talks to WordPress over the network. It is
 * intentionally not used yet, all visible content is hard-coded in `data/`
 * and served through `lib/content`. When the CMS is connected, the content
 * repository functions in `lib/content` will call `fetchGraphQL` instead of
 * returning local data, and nothing in the page components needs to change.
 */
export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  /** Next.js cache revalidation window, in seconds. */
  revalidate = 60,
): Promise<T> {
  if (!HAS_WORDPRESS) {
    throw new Error(
      "WORDPRESS_GRAPHQL_ENDPOINT is not configured. The site currently " +
        "serves hard-coded content from `data/` via `lib/content`.",
    );
  }

  const res = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(WORDPRESS_GRAPHQL_HOST_HEADER
        ? { Host: WORDPRESS_GRAPHQL_HOST_HEADER }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`WPGraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) {
    throw new Error("WPGraphQL returned no data.");
  }
  return json.data;
}
