import { NextResponse } from "next/server";

import {
  WORDPRESS_GRAPHQL_HOST_HEADER,
  WORDPRESS_LEAD_CAPTURE_ENDPOINT,
  WORDPRESS_LEAD_CAPTURE_SECRET,
} from "@/lib/env";

/**
 * Campaign-agnostic lead capture endpoint.
 *
 * The malware LP has its own dedicated route (/api/malware-scan-requests) that
 * predates this one. Every *new* PPC landing page posts here instead, passing
 * its own `service` and `lead_source` so leads stay attributable per campaign
 * while sharing one WordPress capture pipeline.
 */

interface LeadRequestPayload {
  website_url?: string;
  email?: string;
  issue?: string;
  name?: string;
  phone?: string;
  phone_country?: string;
  service?: string;
  lead_source?: string;
  page_path?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  if (!WORDPRESS_LEAD_CAPTURE_SECRET) {
    return jsonError("Lead capture is not configured.", 503);
  }

  let body: LeadRequestPayload;
  try {
    body = (await request.json()) as LeadRequestPayload;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const leadSource = clean(body.lead_source);
  if (!leadSource) {
    return jsonError("Missing lead source.", 400);
  }

  const payload = {
    website_url: clean(body.website_url),
    email: clean(body.email),
    issue: clean(body.issue) || "unsure",
    name: clean(body.name),
    phone: clean(body.phone),
    phone_country: clean(body.phone_country),
    service: clean(body.service) || "general",
    lead_source: leadSource,
    page_path: clean(body.page_path) || "/",
    // Ad attribution — forwarded so WordPress/CRM can later import the sale
    // back into Google Ads as an offline conversion keyed on gclid.
    gclid: clean(body.gclid),
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
    utm_term: clean(body.utm_term),
    utm_content: clean(body.utm_content),
  };

  if (!/^[^\s.]+\.[^\s]+/.test(payload.website_url.replace(/^https?:\/\//, ""))) {
    return jsonError("Enter a valid website URL.", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return jsonError("Enter a valid email address.", 400);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-TheAppSense-Lead-Secret": WORDPRESS_LEAD_CAPTURE_SECRET,
  };

  if (WORDPRESS_GRAPHQL_HOST_HEADER) {
    headers.Host = WORDPRESS_GRAPHQL_HOST_HEADER;
  }

  try {
    const response = await fetch(WORDPRESS_LEAD_CAPTURE_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "WordPress lead capture failed.", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true, id: data.id ?? null });
  } catch {
    return jsonError("Could not reach WordPress lead capture.", 502);
  }
}
