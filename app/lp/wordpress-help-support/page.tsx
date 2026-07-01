import Link from "next/link";
import {
  LifeBuoy,
  MessageCircle,
  UserX,
  Wrench,
  Pencil,
  Gauge,
  ShieldCheck,
  KeyRound,
  ArrowRightLeft,
  Settings,
  HelpCircle,
  Users,
  Clock,
  Check,
  Star,
  BadgeCheck,
  ArrowRight,
  UserCheck,
} from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { ChatButton } from "@/components/ChatButton";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { LpLeadForm, type LpLeadFormConfig } from "@/components/lp/LpLeadForm";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/content";
import { supportIssueOptions } from "@/data/intake";
import { company } from "@/data/site";

export const metadata = buildMetadata({
  title: "WordPress Help & Support | Talk to a Real Person on Live Chat",
  description:
    "Need help with your WordPress site? Talk to a real WordPress expert on live chat — not a ticket that disappears. Fixes, edits, speed, security, and someone to manage it for you. Free first look.",
  path: "/lp/wordpress-help-support",
  // PPC landing page: keep it out of the index so it doesn't compete with the
  // organic /services/wordpress-support page.
  noIndex: true,
});

const leadFormConfig: LpLeadFormConfig = {
  service: "wp_support",
  leadSource: "wordpress_help_support_lp",
  pagePath: "/lp/wordpress-help-support",
  issues: supportIssueOptions,
  heading: "Tell us what you need",
  subheading: "Describe what's going on with your site. A real person replies fast.",
  issuePlaceholder: "What do you need help with?",
  submitLabel: "Get help now",
  footnote: "Free first look · No obligation · Real people, not bots",
  success: {
    heading: "Got it — help is on the way",
    body: "A WordPress specialist will reply shortly. Want to talk it through right now?",
    ctaLabel: "Talk to a real person now",
  },
};

const trustBar = [
  "Real WordPress experts, not bots",
  "Live chat — actual humans",
  "Free first look at your site",
  "One-off fixes from $99, no lock-in",
];

// The wedge: the frustrated-owner pain that WordPress.com and cheap hosts leave
// wide open. This is what the winning "help / customer support" keywords want.
const painPoints = [
  {
    icon: MessageCircle,
    title: "Tickets that vanish into the void",
    description:
      "You send a support request and wait days for a canned reply that doesn't fix anything. No way to just talk to someone.",
  },
  {
    icon: UserX,
    title: "No one to actually talk to",
    description:
      "WordPress.com and most cheap hosts hide behind a contact form. When your site matters, there's no way to reach a real person in real time.",
  },
  {
    icon: HelpCircle,
    title: "Answers you can't act on",
    description:
      "“It's a plugin conflict” isn't a fix. You want someone to actually do it, not hand you a forum link and wish you luck.",
  },
  {
    icon: Clock,
    title: "Your to-do list keeps growing",
    description:
      "Updates, edits, that broken form, the slow homepage — it piles up because there's no one whose job it is to just handle it.",
  },
];

// Maps to the supportIssueOptions on the form — shows the breadth of "help".
const helpWith = [
  { icon: Wrench, title: "Fix what's broken", note: "Errors, downtime, things that stopped working" },
  { icon: Pencil, title: "Edits & changes", note: "Content, layout, new pages, tweaks" },
  { icon: Gauge, title: "Speed it up", note: "Slow site, poor Core Web Vitals" },
  { icon: ShieldCheck, title: "Security & malware", note: "Hacked, flagged, or just worried" },
  { icon: KeyRound, title: "Recover access", note: "Locked out of wp-admin or hosting" },
  { icon: ArrowRightLeft, title: "Move / migrate", note: "New host, or off WordPress.com" },
  { icon: Settings, title: "Manage it for you", note: "Ongoing updates, backups, monitoring" },
  { icon: HelpCircle, title: "Just explain it", note: "Tell me what to do, in plain English" },
];

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us what you need",
    description:
      "Use the form or start a live chat. You're talking to a real WordPress expert, not a bot or a queue.",
  },
  {
    icon: UserCheck,
    title: "We take a free look",
    description:
      "We check your site, tell you exactly what's going on, and quote a flat price before any work starts.",
  },
  {
    icon: Check,
    title: "We handle it",
    description:
      "We do the work, keep you posted in plain English, and you can reach us on live chat any time you want.",
  },
];

const whyUs = [
  {
    icon: Users,
    title: "Real people, every time",
    description:
      "Talk to an actual WordPress engineer on live chat — the same person who does the work, not a call-centre script.",
  },
  {
    icon: BadgeCheck,
    title: "Flat pricing, agreed up front",
    description:
      "No hourly meters, no surprise invoices. One-off fixes from $99, and we agree the price before we start.",
  },
  {
    icon: LifeBuoy,
    title: "One team for everything",
    description:
      "Fixes, edits, speed, security, hosting — one number to call for anything WordPress, instead of chasing five vendors.",
  },
];

const lpFaqs = [
  {
    question: "Can I actually talk to a real person?",
    answer:
      "Yes — that's the whole point. Open live chat and you're talking to a real WordPress expert — no tickets that disappear, no bots, no waiting days for a canned reply.",
  },
  {
    question: "What kinds of things can you help with?",
    answer:
      "Anything WordPress: fixing errors and downtime, making edits and changes, speeding up a slow site, security and malware, recovering access, moving hosts, or simply managing the whole thing for you so you never have to think about it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We take a free first look and then quote a flat price for the work, agreed before we start — no hourly billing and no surprise upsells. For ongoing help, our care plans start from a simple flat monthly fee.",
  },
  {
    question: "I'm on WordPress.com — can you still help?",
    answer:
      "Yes. WordPress.com limits what you can do and offers no real-time support. We can help you within its limits, or move you to a proper self-hosted WordPress setup on our managed hosting — we handle the migration for you.",
  },
  {
    question: "Do you offer ongoing support, not just one-off fixes?",
    answer:
      "Absolutely — that's what most clients want. A care plan gives you managed updates, backups, monitoring, and a real person on live chat whenever you need one, for a flat monthly fee.",
  },
];

export default function WordPressHelpSupportLandingPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm font-medium text-success">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              WordPress help &amp; support — real humans online
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Stuck with your WordPress site? Talk to a real person.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Not a ticket that disappears — an{" "}
              <strong className="text-foreground">actual WordPress expert</strong>{" "}
              on live chat who fixes it, changes it, speeds it up, or
              just manages the whole thing for you. Free first look, flat pricing,
              and someone who actually replies.
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
              <ChatButton label="Talk to a real person now" />
              <span className="flex items-center text-sm text-muted-foreground">
                or fill in the quick form →
              </span>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <LpLeadForm config={leadFormConfig} />
          </div>
        </div>
      </section>

      {/* The wedge: the support pain everyone else leaves open */}
      <section className="bg-ink text-ink-foreground">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              Sound familiar?
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              You don&apos;t want “support.” You want someone to just help.
            </h2>
            <p className="mt-4 text-pretty text-lg text-ink-muted">
              WordPress.com and most hosts hand you a contact form and hope you go
              away. Here&apos;s what that feels like — and what we do instead.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-ink-foreground">
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
            <ChatButton label="Get a real person on it" />
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="border-b border-border">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              However we can help
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Whatever your WordPress site needs
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              One team for all of it. Pick the closest match on the form, or just
              tell us in chat.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {helpWith.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40">
        <div className="container py-14 sm:py-16">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Help in three steps
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

      {/* Why us */}
      <section className="border-b border-t border-border">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Why owners choose us
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Support that actually feels like support
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-border bg-muted/40">
        <div className="container py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Proof
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Owners who finally got a straight answer
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

      {/* Ongoing help -> care plan / retainer funnel */}
      <section className="border-b border-border">
        <div className="container grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Never deal with this alone again
            </p>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Want a WordPress team on call, for a flat monthly fee?
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
              Most owners don&apos;t want to hunt for help every time something
              breaks. A care plan gives you managed updates, backups, monitoring,
              and{" "}
              <strong className="text-foreground">
                a real person on live chat
              </strong>{" "}
              whenever you need one — so your site is simply handled.
            </p>
            <div className="mt-5 rounded-xl border border-success/30 bg-success/10 p-4">
              <p className="flex items-start gap-2 text-sm text-foreground">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span>
                  <strong className="font-semibold">On our managed hosting</strong>{" "}
                  we migrate your site free and support is built in — your host and
                  your support team become one.
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
              "Uptime & security monitoring",
              "Real experts on live chat",
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
            Get real WordPress help today
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-lg text-ink-muted">
            Free first look, flat pricing, and a real person ready on live chat.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ChatButton label="Talk to a real person now" />
            <a
              href="#top"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-7 text-base font-medium text-ink-foreground hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Get help now
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
