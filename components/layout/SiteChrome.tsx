"use client";

import { usePathname } from "next/navigation";

import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Hides the global header/footer on campaign landing pages (/lp/*), which use
 * their own distraction-free chrome for paid-traffic conversion.
 */
function isCampaign(pathname: string): boolean {
  return pathname.startsWith("/lp");
}

export function SiteHeader() {
  const pathname = usePathname();
  if (isCampaign(pathname)) return null;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isCampaign(pathname)) return null;
  return <Footer />;
}
