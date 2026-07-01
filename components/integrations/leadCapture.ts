import { openChat } from "@/components/ChatButton";

/**
 * Campaign-agnostic lead capture helpers for PPC landing pages.
 *
 * The malware LP still uses its dedicated tawkLead + /api/malware-scan-requests
 * pair. Every new LP (error fixing, migrations, ADA, …) should use these
 * generic helpers so we get one consistent flow:
 *   validate → POST /api/lead-requests → GTM generate_lead → Tawk → open chat.
 */

export interface LeadPayload {
  /** Machine service tag, e.g. "error_fix", "wp_migration". */
  service: string;
  /** Campaign attribution, e.g. "fix_wordpress_errors_lp". */
  lead_source: string;
  /** The LP path the lead came from. */
  page_path: string;
  website_url: string;
  email: string;
  /** What's happening — value from the LP's issue options. */
  issue: string;
  name?: string;
  phone?: string;
  phone_country?: string;
  /**
   * Ad attribution captured from the landing URL. `gclid` is the Google click
   * ID — storing it with the lead is what later lets us import the eventual
   * sale (and recurring value) back into Google Ads as an offline conversion,
   * so we optimise to revenue instead of to raw form-fills.
   */
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const ATTRIBUTION_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const ATTRIBUTION_STORAGE_KEY = "tas_lead_attribution";

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

/**
 * Read ad-attribution params from the current URL and persist them for the
 * session. Persisting matters because the visitor may land with `?gclid=…`,
 * click around, and only submit later — we don't want to lose the click ID.
 */
export function collectAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Attribution) : {};
  } catch {
    return fromUrl;
  }
}

interface TawkApi {
  maximize?: () => void;
  toggle?: () => void;
  setAttributes?: (
    attributes: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
  addEvent?: (
    eventName: string,
    metadata?: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    dataLayer?: unknown[];
  }
}

/** POST the lead to the shared WordPress capture pipeline. */
export async function submitLead(payload: LeadPayload): Promise<Response> {
  return fetch("/api/lead-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/** Push a `generate_lead` event to GTM for conversion tracking. */
export function pushLeadEvent(payload: LeadPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...payload,
    event: "generate_lead",
  });
}

function compactAttributes(payload: LeadPayload): Record<string, string> {
  return Object.fromEntries(
    Object.entries({
      // `name` and `email` are Tawk's recognised visitor keys, so the agent
      // sees who they're talking to the moment the chat opens.
      name: payload.name,
      email: payload.email,
      website_url: payload.website_url,
      issue: payload.issue,
      service: payload.service,
      lead_source: payload.lead_source,
      page_path: payload.page_path,
      phone: payload.phone,
      phone_country: payload.phone_country,
    }).filter(([, value]) => typeof value === "string" && value.length > 0),
  ) as Record<string, string>;
}

/**
 * Sync the captured details into Tawk and open the chat, so the form hands the
 * visitor straight to a live agent (or phone, via the chat) with full context.
 */
export function pushLeadToTawk(payload: LeadPayload) {
  if (typeof window === "undefined") return;

  const api = window.Tawk_API;
  const attributes = compactAttributes(payload);

  if (api?.setAttributes) {
    try {
      api.setAttributes(attributes);
    } catch {
      /* Chat should still open if attribute sync fails. */
    }
  }

  if (api?.addEvent) {
    try {
      api.addEvent(`${payload.service}_form_submit`, attributes);
    } catch {
      /* Tawk event support can vary by account/widget state. */
    }
  }

  openChat();
}
