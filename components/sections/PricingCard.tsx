import Link from "next/link";
import { Check } from "lucide-react";

import { type PricingPlan } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PricingCard({
  plan,
  billing = "annual",
  bundle = false,
}: {
  plan: PricingPlan;
  billing?: "monthly" | "annual";
  /** Apply the "hosted with us" bundle discount where available. */
  bundle?: boolean;
}) {
  const hasToggle = Boolean(plan.annualPrice);
  const useBundle = bundle && Boolean(plan.monthlyBundlePrice);
  const price =
    billing === "annual"
      ? useBundle
        ? plan.annualBundlePrice!
        : hasToggle
          ? plan.annualPrice!
          : plan.monthlyPrice
      : useBundle
        ? plan.monthlyBundlePrice!
        : plan.monthlyPrice;
  const subNote = hasToggle
    ? `${billing === "annual" ? "billed annually" : "billed monthly"}${
        useBundle ? ", with our hosting" : ""
      }`
    : plan.note;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm sm:p-8",
        plan.highlighted ? "border-primary ring-1 ring-primary" : "border-border",
      )}
    >
      {plan.badge && (
        <Badge className="absolute -top-3 left-6 border-transparent bg-primary text-primary-foreground shadow-sm">
          {plan.badge}
        </Badge>
      )}
      <h3 className="font-display text-lg font-semibold text-foreground">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold tracking-tight text-foreground">
          {price}
        </span>
        {plan.period && (
          <span className="text-sm font-medium text-muted-foreground">
            {plan.period}
          </span>
        )}
      </div>
      {subNote && (
        <p className="mt-1 text-xs text-muted-foreground">{subNote}</p>
      )}

      <Button
        asChild
        className="mt-6"
        variant={plan.highlighted ? "default" : "outline"}
      >
        <Link href={plan.cta.href}>{plan.cta.label}</Link>
      </Button>

      <ul className="mt-6 space-y-3 border-t border-border pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-foreground/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
