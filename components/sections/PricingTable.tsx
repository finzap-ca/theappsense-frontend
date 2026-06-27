"use client";

import { useState } from "react";

import { type PricingPlan } from "@/data/services";
import { PricingCard } from "./PricingCard";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

/**
 * Pricing grid with a monthly/annual billing toggle (annual default) and an
 * optional "hosted with us" bundle-discount switch, shown only when a plan
 * actually offers a bundle price.
 */
export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  const [billing, setBilling] = useState<Billing>("annual");
  const [bundle, setBundle] = useState(false);
  const hasBundle = plans.some((p) => p.monthlyBundlePrice);

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1"
        >
          {(["monthly", "annual"] as const).map((option) => {
            const active = billing === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBilling(option)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option === "monthly" ? "Monthly" : "Annual"}
                {option === "annual" && (
                  <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-xs font-semibold text-success">
                    Save 20%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {hasBundle && (
          <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
            <input
              type="checkbox"
              checked={bundle}
              onChange={(e) => setBundle(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="font-medium text-foreground">
              Host with us
            </span>
            <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-xs font-semibold text-success">
              Save $20/mo
            </span>
          </label>
        )}
      </div>

      <div
        className={cn(
          "mt-10 grid gap-6 sm:grid-cols-2",
          plans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            billing={billing}
            bundle={bundle}
          />
        ))}
      </div>
    </div>
  );
}
