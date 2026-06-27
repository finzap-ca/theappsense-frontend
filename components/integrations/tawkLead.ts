import { openChat } from "@/components/ChatButton";

export interface MalwareLeadPayload {
  event: "generate_lead";
  service: "malware_removal";
  lead_source: "wordpress_malware_removal_lp";
  page_path: "/lp/wordpress-malware-removal";
  website_url: string;
  email: string;
  issue: string;
  phone?: string;
  phone_country?: string;
}

interface TawkApi {
  maximize?: () => void;
  toggle?: () => void;
  setAttributes?: (attributes: Record<string, string>, callback?: (error?: unknown) => void) => void;
  addEvent?: (eventName: string, metadata?: Record<string, string>, callback?: (error?: unknown) => void) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

function compactAttributes(payload: MalwareLeadPayload): Record<string, string> {
  return Object.fromEntries(
    Object.entries({
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

export function pushMalwareLeadToTawk(payload: MalwareLeadPayload) {
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
      api.addEvent("malware_scan_form_submit", attributes);
    } catch {
      /* Tawk event support can vary by account/widget state. */
    }
  }

  openChat();
}
