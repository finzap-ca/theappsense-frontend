"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/GetStartedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type IntakeIntent,
  type Choice,
  issueOptions,
  severityOptions,
  startedOptions,
  websiteTypeOptions,
  adImpactOptions,
  trafficOptions,
  hostingOptions,
  controlPanelOptions,
  accessOptions,
  backupOptions,
  contactPreferenceOptions,
} from "@/data/intake";
import { cn } from "@/lib/utils";

/**
 * Multi-step "Get Started" intake form for emergency services (malware
 * removal, error fixing). Lives on the /get-started page. Captures the issue,
 * the site, its environment, and contact details so an expert can act on the
 * first reply.
 *
 * IMPORTANT: no backend yet. Submit validates and shows an honest "received"
 * state; nothing is delivered.
 * TODO (integration): POST the payload to a route handler -> email + CRM, and
 * wire the "chat with an expert" button to the real live-chat widget.
 */

interface IntakeData {
  issue: string;
  severity: string;
  started: string;
  url: string;
  websiteType: string;
  ads: string;
  traffic: string;
  hosting: string;
  controlPanel: string;
  access: string;
  backup: string;
  name: string;
  email: string;
  phone: string;
  preferred: string;
  notes: string;
  consent: boolean;
}

const EMPTY: IntakeData = {
  issue: "",
  severity: "",
  started: "",
  url: "",
  websiteType: "",
  ads: "",
  traffic: "",
  hosting: "",
  controlPanel: "",
  access: "",
  backup: "",
  name: "",
  email: "",
  phone: "",
  preferred: "chat",
  notes: "",
  consent: false,
};

const STEPS = ["The problem", "Your site", "Your setup", "Contact"];

type Errors = Partial<Record<keyof IntakeData, string>>;

function validateStep(step: number, d: IntakeData): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!d.issue) e.issue = "Pick the closest match.";
    if (!d.severity) e.severity = "Let us know how bad it is.";
  }
  if (step === 1) {
    if (!/^[^\s.]+\.[^\s]+/.test(d.url.replace(/^https?:\/\//, "")))
      e.url = "Enter your site's address (e.g. yoursite.com).";
    if (!d.websiteType) e.websiteType = "Pick the closest type.";
  }
  if (step === 3) {
    if (d.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
      e.email = "Enter a valid email.";
    if (!d.consent) e.consent = "Please agree so we can contact you.";
  }
  return e;
}

/** Single-select option cards (native radios for full keyboard support). */
function OptionCards({
  name,
  options,
  value,
  onChange,
  cols = 1,
}: {
  name: string;
  options: Choice[];
  value: string;
  onChange: (v: string) => void;
  cols?: 1 | 2 | 3;
}) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "grid gap-2",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-3",
      )}
    >
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring",
              selected
                ? "border-primary bg-accent text-accent-foreground"
                : "border-input hover:bg-muted",
              cols === 3 && "sm:justify-center sm:text-center",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={selected}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                cols === 3 && "sm:hidden",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/40",
              )}
            >
              {selected && <Check className="h-3 w-3" />}
            </span>
            <span className={cn(cols === 3 && "font-medium")}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-destructive">
      <AlertTriangle className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}

export function IntakeForm({
  intent,
  className,
}: {
  intent: IntakeIntent;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const set = <K extends keyof IntakeData>(key: K, val: IntakeData[K]) =>
    setData((d) => ({ ...d, [key]: val }));

  const highPriority = data.severity === "down" && data.ads === "yes";

  function scrollTop() {
    if (typeof document !== "undefined") {
      document
        .getElementById("intake-card")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function next() {
    const found = validateStep(step, data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setStep((s) => Math.min(s + 1, 3));
      scrollTop();
    }
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  }

  function submit() {
    const found = validateStep(3, data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("submitting");
    // No backend yet — simulate without claiming delivery.
    window.setTimeout(() => setStatus("success"), 700);
  }

  if (status === "success") {
    return (
      <div
        id="intake-card"
        className={cn(
          "rounded-2xl border border-success/30 bg-success/5 p-8 text-center sm:p-12",
          className,
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
          Got it, help is on the way
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          A specialist will review your details and reach out by your preferred
          method. If it&apos;s urgent, talk to us right now.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <GetStartedButton label="Talk to us now" />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Demo only, your details were not sent anywhere yet.
        </p>
      </div>
    );
  }

  return (
    <div
      id="intake-card"
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </p>
        {highPriority && (
          <span className="inline-flex items-center gap-1 rounded bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">
            <AlertTriangle className="h-3 w-3" />
            High priority
          </span>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-6 space-y-6">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <Label>What are you seeing?</Label>
              <OptionCards
                name="issue"
                options={issueOptions[intent]}
                value={data.issue}
                onChange={(v) => set("issue", v)}
                cols={2}
              />
              <FieldError id="e-issue" msg={errors.issue} />
            </div>
            <div className="space-y-2">
              <Label>How is the site right now?</Label>
              <OptionCards
                name="severity"
                options={severityOptions}
                value={data.severity}
                onChange={(v) => set("severity", v)}
                cols={3}
              />
              <FieldError id="e-severity" msg={errors.severity} />
            </div>
            <div className="space-y-2">
              <Label>When did it start?</Label>
              <OptionCards
                name="started"
                options={startedOptions}
                value={data.started}
                onChange={(v) => set("started", v)}
                cols={3}
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="iw-url">Your website address</Label>
              <Input
                id="iw-url"
                placeholder="yoursite.com"
                value={data.url}
                onChange={(e) => set("url", e.target.value)}
                aria-invalid={Boolean(errors.url)}
              />
              <FieldError id="e-url" msg={errors.url} />
            </div>
            <div className="space-y-2">
              <Label>What kind of site is it?</Label>
              <OptionCards
                name="websiteType"
                options={websiteTypeOptions}
                value={data.websiteType}
                onChange={(v) => set("websiteType", v)}
                cols={2}
              />
              <FieldError id="e-type" msg={errors.websiteType} />
            </div>
            <div className="space-y-2">
              <Label>Is a paid ad campaign sending traffic to it?</Label>
              <OptionCards
                name="ads"
                options={adImpactOptions}
                value={data.ads}
                onChange={(v) => set("ads", v)}
                cols={3}
              />
              <p className="text-xs text-muted-foreground">
                Helps us prioritise, downtime during a campaign is money lost.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iw-traffic">
                Roughly how much traffic? (optional)
              </Label>
              <Select
                value={data.traffic}
                onValueChange={(v) => set("traffic", v)}
              >
                <SelectTrigger id="iw-traffic">
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {trafficOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-muted-foreground">
              These help us move faster. If you&apos;re not sure, just pick
              &ldquo;Not sure&rdquo;.
            </p>
            <div className="space-y-2">
              <Label htmlFor="iw-host">Who hosts your site?</Label>
              <Select value={data.hosting} onValueChange={(v) => set("hosting", v)}>
                <SelectTrigger id="iw-host">
                  <SelectValue placeholder="Select your host" />
                </SelectTrigger>
                <SelectContent>
                  {hostingOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iw-panel">Control panel / how you access it</Label>
              <Select
                value={data.controlPanel}
                onValueChange={(v) => set("controlPanel", v)}
              >
                <SelectTrigger id="iw-panel">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {controlPanelOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Can you log in to wp-admin?</Label>
                <OptionCards
                  name="access"
                  options={accessOptions}
                  value={data.access}
                  onChange={(v) => set("access", v)}
                />
              </div>
              <div className="space-y-2">
                <Label>Do you have a recent backup?</Label>
                <OptionCards
                  name="backup"
                  options={backupOptions}
                  value={data.backup}
                  onChange={(v) => set("backup", v)}
                />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="iw-name">Your name</Label>
                <Input
                  id="iw-name"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                <FieldError id="e-name" msg={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iw-email">Email</Label>
                <Input
                  id="iw-email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                <FieldError id="e-email" msg={errors.email} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iw-phone">Phone / WhatsApp (optional)</Label>
              <Input
                id="iw-phone"
                type="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>How should we reach you?</Label>
              <OptionCards
                name="preferred"
                options={contactPreferenceOptions}
                value={data.preferred}
                onChange={(v) => set("preferred", v)}
                cols={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iw-notes">Anything else? (optional)</Label>
              <Textarea
                id="iw-notes"
                rows={3}
                placeholder="Error messages, what you've already tried, deadlines…"
                value={data.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span>
                I agree to be contacted about this request. We&apos;ll only use
                your details to help with your site.
              </span>
            </label>
            <FieldError id="e-consent" msg={errors.consent} />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
        {step > 0 ? (
          <Button variant="ghost" onClick={back}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button size="lg" onClick={next}>
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="lg" onClick={submit} disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4" />
                Submit &amp; chat with an expert
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
