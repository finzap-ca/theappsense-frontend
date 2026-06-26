# AGENTS.md

## Scope
Operational guide for the TheAppSense V2 frontend in `/opt/easyengine/sites/theappsense-frontend`.

## Purpose
- Runs the public Next.js frontend for `https://theappsense.com`.
- Reads only blog content from the existing WordPress install through WPGraphQL.
- Leaves non-blog marketing pages owned by the frontend code.

## Environment
- Frontend root: `/opt/easyengine/sites/theappsense-frontend`
- Frontend container: `theappsense-frontend`
- WordPress source: existing `/opt/easyengine/sites/theappsense.com`
- WordPress public/admin host: `https://wp.theappsense.com`
- Internal GraphQL endpoint used by the frontend: `http://theappsense-wp/graphql`

## Runbook
- Build/start frontend: `docker-compose up -d --build`
- Check frontend logs: `docker logs --tail=120 theappsense-frontend`
- Validate frontend locally: `curl -I -H 'Host: theappsense.com' http://127.0.0.1`
- Check WPGraphQL: `docker exec theappsensecom-php-1 bash -lc 'cd /var/www/htdocs && wp plugin status wp-graphql --allow-root'`

## Integrations
- Tawk.to live chat is loaded on the public frontend through `components/integrations/TawkToScript.tsx`.
- Current Tawk.to IDs: property `66a568b032dca6db2cb69ea2`, widget `1i3r21sll`.
- Override with `NEXT_PUBLIC_TAWK_PROPERTY_ID` and `NEXT_PUBLIC_TAWK_WIDGET_ID` in `.env.local`.

## GitHub Deploy Key
- Private key: `/opt/easyengine/sites/theappsense-frontend/.deploy_key` (mode `600`).
- Public key: `/opt/easyengine/sites/theappsense-frontend/.deploy_key.pub`.
- Add the public key in the target GitHub repository under **Settings > Deploy keys**; enable write access only when server-side pushes are required.

## Guardrails
- Do not delete, import over, or rewrite existing WordPress pages/posts while wiring the frontend.
- Keep WordPress content intact; the frontend only reads published `post` content for `/blog` routes.
- Keep `theappsense-frontend` connected to `ee-global-frontend-network` so it can reach `theappsense-wp` and the global proxy can reach the frontend.
- Keep `WORDPRESS_GRAPHQL_ENDPOINT` internal unless there is a clear reason to use public TLS from inside Docker.
- Keep `/about` available and linked from the footer, but do not include it in the primary navigation.

## Changelog
- 2026-06-26: Updated team LinkedIn profiles and moved the About link to footer-only navigation.
- 2026-06-26: Added Tawk.to live chat widget to the public frontend.
- 2026-06-26: Added TheAppSense V2 frontend deployment. Blog listing/detail and sitemap read published WordPress posts via WPGraphQL; non-blog pages remain code-owned.
