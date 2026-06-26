import { type ProcessStep } from "@/data/process";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <li
            key={step.number}
            className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold text-border">
                {step.number}
              </span>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
