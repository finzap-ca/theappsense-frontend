"use client";

import { useState } from "react";

import { type PricingPlan } from "@/data/services";
import { PricingCard } from "./PricingCard";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

/**
 * Pricing grid with a monthly/annual billing toggle. Annual is the default
 * (it's the better-value option and what we want to anchor on).
 */
export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <div>
      <div className="flex justify-center">
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
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                      active
                        ? "bg-success/15 text-success"
                        : "bg-success/10 text-success",
                    )}
                  >
                    Save 20%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}
