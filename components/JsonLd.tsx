/**
 * Renders a JSON-LD structured-data block. Server-safe; the object comes from
 * the typed helpers in `lib/seo`.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema is built from trusted, typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
