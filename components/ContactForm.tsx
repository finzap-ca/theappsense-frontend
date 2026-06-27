"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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

/**
 * Lead / quote form.
 *
 * Client-side validation with accessible labels and inline error messages.
 *
 * IMPORTANT: there is no backend wired up yet. On submit the form validates and
 * shows an honest "received" state, but nothing is delivered anywhere.
 *
 * TODO (integration): POST to a real endpoint, e.g. a Next.js route handler
 * that forwards to email + the CRM/leads pipeline. Add a spam check (honeypot
 * is already present below + a CAPTCHA or rate limit). Do not claim successful
 * delivery until this is connected.
 */

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const interests = [
  { value: "hosting", label: "Managed WordPress hosting" },
  { value: "support", label: "WordPress support / fix errors" },
  { value: "malware", label: "Hacked site / malware removal" },
  { value: "maintenance", label: "Care plan / maintenance" },
  { value: "speed", label: "Speed optimization" },
  { value: "development", label: "WordPress / web development" },
  { value: "ecommerce", label: "Online store / WooCommerce" },
  { value: "other", label: "Something else" },
];

function validate(data: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (data.message.trim().length < 10)
    errors.message = "A sentence or two about your project helps us reply well.";
  return errors;
}

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-success/30 bg-success/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          Thanks, we&apos;ve got your message
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          We reply to every enquiry within one business day. If it&apos;s urgent, like a hacked site, call us and we&apos;ll get on it right away.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real users never fill this hidden field.
    if ((fd.get("company_website") as string)?.length) return;

    const data = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("submitting");
    // No backend yet, simulate the request without claiming real delivery.
    // TODO: replace with a real fetch() to the lead endpoint.
    window.setTimeout(() => setStatus("success"), 600);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest">What can we help with?</Label>
          <Select name="interest" defaultValue={defaultInterest ?? "hosting"}>
            <SelectTrigger id="interest">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {interests.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Your message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a little about your website, your goal, and any deadline."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="flex items-center gap-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field, visually hidden, ignored by humans. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        We&apos;ll only use your details to reply to your enquiry. No spam, ever.
      </p>
    </form>
  );
}
