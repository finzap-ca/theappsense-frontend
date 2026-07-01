"use client";

import { usePathname } from "next/navigation";

/**
 * Gives each route a gentle fade-and-rise as it opens. Keying off the pathname
 * remounts the content on navigation, which re-triggers the CSS animation.
 * Motion is disabled automatically for users who prefer reduced motion
 * (see globals.css).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
