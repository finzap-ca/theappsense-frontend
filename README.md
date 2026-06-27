# TheAppSense

Marketing website for **TheAppSense** — WordPress and web development, managed
hosting, security, malware removal, speed optimization, and website care plans
for small and growing businesses across Canada and the U.S.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** with CSS-variable design tokens
- **shadcn/ui-style** components + **lucide-react** icons
- Server Components by default; client boundaries kept narrow
- Built to become **headless WordPress (WPGraphQL)** with minimal refactoring

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

Copy `.env.example` to `.env.local` to override the canonical site URL,
connect WordPress GraphQL, enable Tawk.to, or set `NEXT_PUBLIC_GTM_ID` for
Google Tag Manager.

## Architecture

```
app/                Routes (App Router). Server Components by default.
  services/[slug]/   Dynamic service pages (statically generated)
  blog/[slug]/       Dynamic article pages (statically generated)
  sitemap.ts         Generated sitemap · robots.ts robots rules
components/
  ui/                shadcn/ui-style primitives (button, card, input, …)
  layout/            Header, Footer, Logo
  sections/          Composable page sections (Hero bits, ServiceCard, FAQ, …)
  ContactForm.tsx    Client form with validation (no backend yet — see below)
data/                Typed, hard-coded content (the future CMS collections)
lib/
  content.ts         Content repository — the single seam to swap in WordPress
  graphql/           WPGraphQL client + query documents (inert until connected)
  seo.ts             Metadata + JSON-LD helpers
  env.ts             Validated env / URL helpers
```

### Content is CMS-ready, not CMS-dependent

All visible copy is hard-coded in `data/` and served through `lib/content`.
Each repository function is the one place to later fetch from WordPress via
`lib/graphql` and map into the same typed shapes — **no page component changes
required**. Likely future CMS collections: services, case studies, posts, FAQs,
testimonials, pricing, team, global contact info, reusable CTAs.

## Tracking and lead handoff

Google Tag Manager is optional and controlled by `NEXT_PUBLIC_GTM_ID`. When set,
the app loads GTM globally and exposes `window.dataLayer` for conversion events.

The malware landing page form pushes a GA4-style `generate_lead` payload and
passes the same validated lead context into Tawk.to before opening chat. Phone is
optional and uses browser-locale country detection with a manual selector.

## Known remaining integrations

- **Contact form delivery.** `components/ContactForm.tsx` validates and shows an
  honest received state but does **not** send anything yet. Wire it to a route
  handler that forwards to email + CRM, and add a server-side spam check. Search
  for `TODO (integration)`.
- **Project screenshots.** `components/BrowserFrame.tsx` and `WorkCard` render
  labelled placeholders; drop in real images when available.
- **Headless WordPress.** Set `WORDPRESS_GRAPHQL_ENDPOINT` and implement the
  fetch path in `lib/content`.

## Legacy URL preservation

Old WordPress URLs are redirected to the new IA in `next.config.mjs`.
```


## Production wiring

The deployed frontend runs as `theappsense-frontend` and is registered with the
EasyEngine global proxy for `theappsense.com` and `www.theappsense.com`.

Blog content is read from the existing WordPress site through WPGraphQL only:

```bash
WORDPRESS_GRAPHQL_ENDPOINT=http://theappsense-wp/graphql
```

WordPress itself remains in `/opt/easyengine/sites/theappsense.com` and should be
served as `wp.theappsense.com`. Do not delete or rewrite WordPress pages as part
of frontend wiring; publish normal WordPress `post` records for `/blog`.
