/**
 * WPGraphQL query documents, the future shape of the headless CMS layer.
 *
 * These are intentionally inert today: the content repository (`lib/content`)
 * serves hard-coded data from `data/`. When WordPress is connected, the
 * repository functions will run these documents through `fetchGraphQL` and map
 * the responses into the existing typed shapes (`Service`, `Post`, `CaseStudy`…),
 * so no page component needs to change.
 *
 * They live here, behind the data-access layer, so GraphQL never leaks into
 * page or component code.
 */

export const POSTS_QUERY = /* GraphQL */ `
  query Posts($first: Int = 12) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
        title
        excerpt
        date
        content
        author { node { name } }
        categories { nodes { name } }
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      excerpt
      date
      content
      categories { nodes { name } }
    }
  }
`;

export const SERVICES_QUERY = /* GraphQL */ `
  query Services($first: Int = 20) {
    services(first: $first) {
      nodes {
        slug
        title
        serviceFields {
          tagline
          summary
        }
      }
    }
  }
`;
