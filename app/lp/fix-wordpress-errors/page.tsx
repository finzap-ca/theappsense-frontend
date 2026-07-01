import Link from "next/link";
import {
  Wrench,
  Search,
  RotateCcw,
  Check,
  Star,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  Frown,
  ArrowRight,
  BadgeCheck,
  KeyRound,
  Copy,
  UploadCloud,
  ShieldCheck,
  MessageCircle,
  Clock,
  ServerCrash,
} from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { ChatButton } from "@/components/ChatButton";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { LpLeadForm, type LpLeadFormConfig } from "@/components/lp/LpLeadForm";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/content";
import { issueOptions } from "@/data/intake";
import { company } from "@/data/site";

const leadFormConfig: LpLeadFormConfig = {
  service: "error_fix",
  leadSource: "fix_wordpress_errors_lp",
  pagePath: "/lp/fix-wordpress-errors",
  issues: issueOptions.errors,
  heading: "Get a free diagnosis",
  subheading: "Tell us what broke. We'll diagnose it and reply with a fixed price.",
  issuePlaceholder: "What's happening?",
  submitLabel: "Get my free diagnosis",
  footnote: "Free diagnosis · No obligation · Fixes from $99, agreed up front",
  success: {
    heading: "Got it — we're on it",
    body: "A WordPress engineer will look at what's happening and reply fast with the fix and a flat price. Site down right now?",
    ctaLabel: "Talk to an engineer now",
  },
};

export const metadata = buildMetadata({
  title: "Fix WordPress Errors | Emergency WordPress Support & Live Chat",
  description:
    "WordPress site down or throwing errors? A real WordPress engineer fixes it fast — white screen, 500 error, database connection, locked out. Free diagnosis, flat price, and real engineers on live chat.",
  path: "/lp/fix-wordpress-errors",
  // PPC landing page: keep it out of the index so it doesn't compete with the
  // organic /services/wordpress-support page.
  noIndex: true,
});

const trustBar = [
  "Real engineers, not bots",
  "Live chat with real people",
  "Free diagnosis first",
  "Flat price from $99, no hourly billing",
];

const costOfWaiting = [
  {
    icon: ShoppingCart,
    title: "Every minute down is lost revenue",
    description:
      "A broken checkout or a dead homepage means customers leave and don't come back. Downtime is money you can't recover.",
  },
  {
    icon: TrendingDown,
    title: "Google notices sites that stay broken",
    description:
      "Repeated errors and downtime hurt crawling and rankings. The longer it's broken, the more organic traffic you bleed.",
  },
  {
    icon: Frown,
    title: "Your brand takes the hit",
    description:
      "A “critical error” page or a white screen tells every visitor something's wrong. Trust is hard to win back.",
  },
  {
    icon: AlertTriangle,
    title: "DIY fixes often make it worse",
    description:
      "Editing files, rolling back the wrong plugin, or restoring a bad backup can turn a small error into a lost site.",
  },
];

const included = [
  "Root-cause diagnosis, not guesswork",
  "Plugin & theme conflict resolution",
  "PHP / memory / server error fixes",
  "Database connection & corruption repair",
  "wp-admin lockout & login recovery",
  "Post-update breakage rolled back safely",
];

// The specific-error grid — this is what maps to the tight PPC ad groups.
const commonErrors = [
  { icon: ServerCrash, title: "White screen of death", note: "Blank page, no error shown" },
  { icon: ServerCrash, title: "HTTP 500 internal server error", note: "Site throws a 500" },
  { icon: ServerCrash, title: "“Critical error on this website”", note: "WordPress fatal error" },
  { icon: ServerCrash, title: "Error establishing a database connection", note: "DB down or misconfigured" },
  { icon: KeyRound, title: "Locked out of wp-admin", note: "Can't log in to your dashboard" },
  { icon: Clock, title: "Stuck in maintenance mode", note: "“Briefly unavailable” won't clear" },
  { icon: AlertTriangle, title: "Broke after an update", note: "Plugin, theme, or core update" },
  { icon: ServerCrash, title: "502 / 503 / 504 gateway errors", note: "Timeouts and bad gateways" },
];

const steps = [
  {
    icon: Search,
    title: "Tell us what broke",
    description:
      "Use the form or live chat. We look at your site free and pinpoint exactly what's causing the error.",
  },
  {
    icon: Wrench,
    title: "We fix it safely",
    description:
      "We fix the root cause on a safe copy — no gambling with your live site — then test everything.",
  },
  {
    icon: RotateCcw,
    title: "Back online, fast",
    description:
      "Your site is restored and working, usually same day, and we tell you how to stop it happening again.",
  },
];

// The detailed, "show your working" process. Reassures owners we never gamble
// with their live site.
const fixProcess = [
  {
    icon: KeyRound,
    title: "You give us secure access",
    description:
      "We request temporary access to your hosting (SFTP, SSH, or cPanel), or work directly with your host. You can revoke it the moment we're done.",
  },
  {
    icon: Copy,
    title: "We back up before we touch anything",
    description:
      "We take a full backup of your files and database first, so there's always a clean restore point no matter what the error turns out to be.",
  },
  {
    icon: Search,
    title: "We find the real cause",
    description:
      "We reproduce the error, read the logs, and isolate whether it's a plugin, theme, PHP, memory, or server issue — instead of guessing and hoping.",
  },
  {
    icon: Wrench,
    title: "We fix and test",
    description:
      "We apply the fix, confirm the site loads and works end to end, and make sure nothing else broke in the process.",
  },
  {
    icon: UploadCloud,
    title: "We put it live and prevent a repeat",
    description:
      "We deploy the working site and tell you what caused it and how to stop it recurring — updates, hosting, or a care plan that watches for you.",
  },
];

// LP-specific FAQs appended to the shared support FAQs. These answer the
// objections that come up specifically on a paid "fix my error" click.
const lpFaqs = [
  {
    question: "Can I actually talk to a person?",
    answer:
      "Yes — that's the whole point. Open live chat and you're talking to a real WordPress engineer — no tickets that vanish, no bots, no waiting days for a reply.",
  },
  {
    question: "How fast can you fix it?",
    answer:
      "Most common errors are fixed the same day, often within a couple of hours of getting access. After the free diagnosis we'll tell you the realistic turnaround before you pay anything.",
  },
  {
    question: "What does it cost?",
    answer:
      "We diagnose for free and then quote a flat price for the fix, agreed before we start. No hourly billing and no surprise upsells. If a site needs more than a standard fix, we'll say so clearly first.",
  },
  {
    question: "Do you need my hosting login?",
    answer:
      "Usually yes — temporary SFTP/SSH or a cPanel login so we can read the logs and fix the cause. You can revoke access the moment we're finished, and we recommend changing passwords afterwards as a precaution.",
  },
  {
    question: "Will my site go down while you work?",
    answer:
      "We work carefully and back up first, and where the fix is risky we work on a copy so your live site stays up. We only put changes live once they're tested.",
  },
  {
    question: "What if you can't fix it?",
    answer:
      "If we can't fix the error you came to us with, you don't pay for the fix. The free diagnosis tells us both whether it's something we can solve before any money changes hands.",
  },
];

export default function FixWordPressErrorsLandingPage() {
  const support = getServiceBySlug("wordpress-support");
  const faqs = [...(support?.faqs ?? []), ...lpFaqs];

  return (
    <div className="bg-background" id="top">
      {/* Slim campaign bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <ChatButton label="Chat now" size="sm" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative grid items-start gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
              Emergency WordPress support
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              WordPress site down or throwing errors? We&apos;ll fix it.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              White screen, 500 error, database connection, locked out of
              wp-admin — a{" "}
              <strong className="text-foreground">real WordPress engineer</strong>{" "}
              finds the cause and fixes it, usually the same day. Free diagnosis,
              flat price agreed up front, and you can{" "}
              <strong className="text-foreground">actually talk to a real person</strong>{" "}
              on live chat.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {trustBar.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ChatButton label="Talk to an engineer now" />
              <span className="flex items-center text-sm text-muted-foreground">
                or fill in the 30-second form →
              </span>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <LpLeadForm config={leadFormConfig} />
          </div>
        </div>
      </section>

      {/* Cost of doing nothing */}
      <section className="bg-ink text-ink-foreground">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              The clock is ticking
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Every hour it&apos;s broken, it&apos;s costing you
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {costOfWaiting.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex justify-center">
            <ChatButton label="Fix my site now" />
          </div>
        </div>
      </section>

      {/* Common errors we fix — the specific-query grid */}
      <section className="border-b border-border">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Sound familiar?
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The WordPress errors we fix every day
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              If you&apos;re seeing any of these, we&apos;ve fixed it before.
              Pick the closest match on the form, or just tell us in chat.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {commonErrors.map((err) => {
              const Icon = err.icon;
              return (
                <li
                  key={err.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {err.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{err.note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Seeing something else? We fix the long tail too — memory limits,
            permalink and 404 issues, SSL and mixed-content, email not sending,
            and more.
          </p>
        </div>
      </section>

      {/* Offer / what's included */}
      <section className="border-b border-border bg-muted/40">
        <div className="container grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              The offer
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Free diagnosis first. Fixes from $99, flat. No hourly billing.
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Most agencies bill by the hour with no idea how long it&apos;ll
              take. We diagnose free, tell you exactly what&apos;s wrong, then
              fix it for one flat fee you agree before we start. Can&apos;t fix
              it? You don&apos;t pay for the fix.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ChatButton label="Start my free diagnosis" />
            </div>
          </div>
          <ul className="grid gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <p className="font-display text-sm font-semibold text-foreground">
              What we fix
            </p>
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background">
        <div className="container py-14 sm:py-16">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Fixed in three steps
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-display text-sm font-bold text-primary">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* How we actually do it (detailed, builds trust) */}
      <section className="border-b border-t border-border bg-muted/40">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              How we do it
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              We find the real cause — we don&apos;t just guess
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              No trial-and-error on your live site. Here&apos;s exactly what
              happens once you say go.
            </p>
          </div>
          <ol className="mx-auto mt-12 max-w-3xl space-y-4">
            {fixProcess.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:gap-5 sm:p-6"
                >
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-border">
        <div className="container py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Proof
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Sites rescued, owners relieved
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </span>
              5-star reviews on Trustpilot
            </div>
          </div>
          <div className="mt-10">
            <Testimonials limit={3} />
          </div>
        </div>
      </section>

      {/* Guarantee: no-fix, no-fee */}
      <section className="border-b border-border">
        <div className="container py-8">
          <div className="mx-auto flex max-w-2xl items-start gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p>
              No fix, no fee: if we can&apos;t solve the error you came to us
              with, you don&apos;t pay for the fix. The free diagnosis tells us
              both up front.
            </p>
          </div>
        </div>
      </section>

      {/* Stop it happening again -> care plan / hosting funnel */}
      <section className="border-b border-border bg-muted/40">
        <div className="container grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Stay online
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Don&apos;t want to be back here next month?
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
              Most WordPress errors come from unmanaged updates, tired hosting,
              and no backups. On a care plan or our managed hosting we keep it
              updated, backed up, and monitored — and when something does break,{" "}
              <strong className="text-foreground">
                you have a real engineer on live chat
              </strong>
              , included.
            </p>
            <div className="mt-5 rounded-xl border border-success/30 bg-success/10 p-4">
              <p className="flex items-start gap-2 text-sm text-foreground">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span>
                  <strong className="font-semibold">Move to our managed hosting</strong>{" "}
                  and we&apos;ll migrate your site for free and fix this error at
                  no extra charge as part of onboarding.
                </span>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/services/website-maintenance"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                See care plans
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/managed-wordpress-hosting#pricing"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                See managed hosting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
            {[
              "Managed core, plugin & theme updates",
              "Daily off-site backups to Amazon S3",
              "Uptime & error monitoring",
              "Real engineers on live chat",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section>
          <div className="container py-14 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Questions, answered
              </h2>
              <Faq items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="container py-14 text-center sm:py-16">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Get your site working again today
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-lg text-ink-muted">
            Free diagnosis, flat-price fix, usually same day — and a real person
            ready on live chat.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ChatButton label="Talk to an engineer now" />
            <a
              href="#top"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-7 text-base font-medium text-ink-foreground hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Get my free diagnosis
            </a>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-ink text-ink-muted">
        <div className="container flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. A service of{" "}
            {company.legalName}.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ink-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
