"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Choice } from "@/data/intake";
import { ChatButton } from "@/components/ChatButton";
import {
  collectAttribution,
  pushLeadEvent,
  pushLeadToTawk,
  submitLead,
  type LeadPayload,
} from "@/components/integrations/leadCapture";

/**
 * Config-driven lead form shared by every PPC landing page. Captures just
 * enough to diagnose and route the visitor straight into live chat / a call,
 * while carrying full context into GTM and Tawk for per-campaign attribution.
 *
 * Each LP passes an `LpLeadFormConfig`; the UI, validation, and submit flow are
 * identical so we only maintain one form. (The malware LP predates this and
 * keeps its own MalwareLeadForm.)
 */

export interface LpLeadFormConfig {
  /** Machine service tag, e.g. "error_fix", "wp_support". */
  service: string;
  /** Campaign attribution, e.g. "wordpress_help_support_lp". */
  leadSource: string;
  /** The LP path this form lives on. */
  pagePath: string;
  /** Options for the "what's happening?" dropdown. */
  issues: Choice[];
  heading: string;
  subheading: string;
  issuePlaceholder: string;
  submitLabel: string;
  /** Small reassurance line under the submit button. */
  footnote: string;
  success: {
    heading: string;
    body: string;
    ctaLabel: string;
  };
}

interface Errors {
  url?: string;
  email?: string;
  issue?: string;
  form?: string;
}

interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
];

const DEFAULT_COUNTRY = COUNTRIES[0];

function countryFromLocale(locale?: string): CountryOption {
  const countryCode = locale?.split("-").pop()?.toUpperCase();
  return COUNTRIES.find((country) => country.code === countryCode) ?? DEFAULT_COUNTRY;
}

function normalizePhone(phone: string, country: CountryOption): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("+") ? trimmed : `${country.dialCode} ${trimmed}`;
}

export function LpLeadForm({ config }: { config: LpLeadFormConfig }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY.code);
  const [issue, setIssue] = useState("");
  const submittingRef = useRef(false);
  const attributionRef = useRef<ReturnType<typeof collectAttribution>>({});

  useEffect(() => {
    const detected = countryFromLocale(window.navigator.language);
    setCountryCode(detected.code);
    // Capture gclid / UTMs on mount so the click ID is never lost.
    attributionRef.current = collectAttribution();
  }, []);

  const selectedCountry =
    COUNTRIES.find((country) => country.code === countryCode) ?? DEFAULT_COUNTRY;

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
          {config.success.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
          {config.success.body}
        </p>
        <ChatButton label={config.success.ctaLabel} className="mt-4" />
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("company_website") as string)?.length) return; // honeypot

    const name = ((fd.get("name") as string) ?? "").trim();
    const url = ((fd.get("url") as string) ?? "").trim();
    const email = ((fd.get("email") as string) ?? "").trim();
    const selectedIssue = issue.trim();
    const phoneInput = ((fd.get("phone") as string) ?? "").trim();
    const phone = normalizePhone(phoneInput, selectedCountry);

    const found: Errors = {};
    if (!/^[^\s.]+\.[^\s]+/.test(url.replace(/^https?:\/\//, "")))
      found.url = "Enter your site's address (e.g. yoursite.com).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      found.email = "Enter a valid email.";
    if (!selectedIssue) found.issue = "Choose what's happening.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const payload: LeadPayload = {
      service: config.service,
      lead_source: config.leadSource,
      page_path: config.pagePath,
      website_url: url,
      email,
      issue: selectedIssue,
      ...attributionRef.current,
      ...(name ? { name } : {}),
      ...(phone
        ? {
            phone,
            phone_country: `${selectedCountry.code} ${selectedCountry.flag}`,
          }
        : {}),
    };

    submittingRef.current = true;
    setStatus("submitting");
    try {
      const response = await submitLead(payload);
      if (!response.ok) {
        submittingRef.current = false;
        setErrors({ form: "We couldn't save the request. Please try again or open chat." });
        setStatus("idle");
        return;
      }

      pushLeadEvent(payload);
      pushLeadToTawk(payload);
      setStatus("success");
    } catch {
      submittingRef.current = false;
      setErrors({ form: "We couldn't save the request. Please try again or open chat." });
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-7"
    >
      <p className="font-display text-lg font-semibold text-foreground">
        {config.heading}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{config.subheading}</p>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lp-name" className="sr-only">Your name</Label>
          <Input id="lp-name" name="name" autoComplete="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-url" className="sr-only">Website address</Label>
          <Input
            id="lp-url"
            name="url"
            placeholder="Website address"
            aria-invalid={Boolean(errors.url)}
          />
          {errors.url && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errors.url}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-email" className="sr-only">Email</Label>
          <Input
            id="lp-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-phone" className="sr-only">Phone / WhatsApp (optional)</Label>
          <div className="grid grid-cols-[6.75rem_1fr] gap-2">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger id="lp-phone-country" aria-label="Phone country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.dialCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="lp-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Phone number"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lp-issue" className="sr-only">What&apos;s happening?</Label>
          <Select name="issue" value={issue} onValueChange={setIssue}>
            <SelectTrigger id="lp-issue" aria-invalid={Boolean(errors.issue)}>
              <SelectValue placeholder={config.issuePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {config.issues.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.issue && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errors.issue}
            </p>
          )}
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {errors.form && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.form}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {config.submitLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">{config.footnote}</p>
    </form>
  );
}
