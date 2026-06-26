import { type ServiceFeature } from "@/data/services";

export function FeatureGrid({ features }: { features: ServiceFeature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
