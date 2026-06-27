import { TriangleAlert, ShieldCheck, Lock } from "lucide-react";

/**
 * The red Google "Deceptive site ahead" warning, rendered as a browser mockup,
 * with a small green "after cleanup" chip to tell the red -> clean story.
 * No stock imagery; pure markup so it stays crisp and on-palette.
 */
export function BrowserWarning() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5 truncate rounded bg-white/5 px-2 py-1 font-mono text-xs text-red-300">
            <TriangleAlert className="h-3 w-3" />
            Not secure · yoursite.com
          </span>
        </div>

        {/* Red warning page */}
        <div className="bg-destructive px-6 py-10 text-center text-destructive-foreground sm:px-10 sm:py-14">
          <TriangleAlert className="mx-auto h-12 w-12" />
          <h3 className="mt-4 font-display text-xl font-bold">
            Deceptive site ahead
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/90">
            Attackers on yoursite.com may trick you into doing something
            dangerous like installing software or revealing your personal
            information.
          </p>
          <span className="mt-5 inline-flex rounded-md bg-white/15 px-4 py-2 text-sm font-medium">
            Back to safety
          </span>
        </div>
      </div>

      {/* "After cleanup" chip */}
      <div className="absolute -bottom-4 -right-3 hidden items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-lg sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
          <ShieldCheck className="h-5 w-5 text-success" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold text-foreground">After cleanup</p>
          <p className="flex items-center gap-1 text-xs font-medium text-success">
            <Lock className="h-3 w-3" />
            Clean &amp; secure
          </p>
        </div>
      </div>
    </div>
  );
}
