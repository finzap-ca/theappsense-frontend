import Image from "next/image";

import { type CaseStudy } from "@/data/work";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Badge } from "@/components/ui/badge";

export function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <BrowserFrame
        url={`${study.slug}.com`}
        className="rounded-none border-0 border-b shadow-none"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {study.category}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
          {study.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.services.map((s) => (
            <Badge key={s} variant="muted">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
