import { Check } from "lucide-react";

import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { IntakeForm } from "@/components/IntakeForm";
import { GetStartedButton } from "@/components/GetStartedButton";
import { buildMetadata } from "@/lib/seo";
import { type IntakeIntent } from "@/data/intake";

export const metadata = buildMetadata({
  title: "Get Started",
  description:
    "Tell us what's happening with your WordPress site and an expert will help fast. A few quick questions about your site, hosting, and the issue, then we get to work.",
  path: "/get-started",
});

interface IntentCopy {
  eyebrow: string;
  title: string;
  subhead: string;
  reassurance: string[];
}

const COPY: Record<IntakeIntent, IntentCopy> = {
  malware: {
    eyebrow: "Malware removal",
    title: "Let's clean up your hacked site",
    subhead:
      "Answer a few quick questions and a malware specialist will get on it. The more you can tell us, the faster we clean and secure your site.",
    reassurance: [
      "Flat $99 one-time fix, no upsells",
      "Most sites cleaned the same day",
      "Files and database fully cleaned, then hardened",
      "A real specialist, not a chatbot",
    ],
  },
  errors: {
    eyebrow: "WordPress support",
    title: "Let's get your site working again",
    subhead:
      "Tell us what's broken and a WordPress expert will help. A minute of questions now saves a lot of back-and-forth later.",
    reassurance: [
      "Free diagnosis, flat fix price up front",
      "Most issues resolved the same day",
      "We back up before we touch anything",
      "A real specialist, not a chatbot",
    ],
  },
};

const NEXT_STEPS = [
  "You send us the details below.",
  "A specialist reviews it and replies, usually the same day.",
  "We diagnose, quote, and get your site working.",
];

export default function GetStartedPage({
  searchParams,
}: {
  searchParams: { intent?: string };
}) {
  const intent: IntakeIntent =
    searchParams.intent === "malware" ? "malware" : "errors";
  const copy = COPY[intent];

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="container py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Get started", path: "/get-started" },
            ]}
          />
          <div className="mt-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {copy.subhead}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Reassurance panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-lg font-semibold text-foreground">
              What happens next
            </h2>
            <ol className="mt-4 space-y-4">
              {NEXT_STEPS.map((stepText, i) => (
                <li key={stepText} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {stepText}
                  </span>
                </li>
              ))}
            </ol>

            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {copy.reassurance.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                Rather not wait?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the live chat in the corner to talk to a specialist now, or
                start a conversation with our team.
              </p>
              <GetStartedButton
                label="Talk to us"
                size="default"
                className="mt-4 w-full"
              />
            </div>
          </aside>

          {/* The form */}
          <IntakeForm intent={intent} />
        </div>
      </Section>
    </>
  );
}
