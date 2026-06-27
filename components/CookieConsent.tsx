"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Lightweight cookie-consent banner.
 *
 * Stores the visitor's choice and signals it to Google Consent Mode. It's a
 * no-op until Google Tag Manager / Analytics is added: once GTM is wired with a
 * default consent state of "denied", these update calls grant or keep analytics
 * cookies based on the visitor's choice. Tawk.to live chat is treated as a
 * functional cookie and disclosed in the Privacy Policy.
 */

const STORAGE_KEY = "appsense-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const state = granted ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state,
      ad_storage: "denied",
    });
  }
  window.dataLayer.push({ event: "cookie_consent_update", consent: state });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked; show the banner */
    }
    if (stored === "granted" || stored === "denied") {
      applyConsent(stored === "granted");
    } else {
      setVisible(true);
    }
  }, []);

  function choose(granted: boolean) {
    try {
      window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    applyConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[60] rounded-xl border border-border bg-card p-4 shadow-lg sm:right-auto sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use cookies to run live chat and to understand how the site is used
        (Google Analytics). See our{" "}
        <Link
          href="/privacy"
          className="font-medium text-primary underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => choose(true)}>
          Accept
        </Button>
        <Button size="sm" variant="outline" onClick={() => choose(false)}>
          Decline
        </Button>
      </div>
    </div>
  );
}
