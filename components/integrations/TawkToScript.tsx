import Script from "next/script";

import { HAS_TAWK, TAWK_PROPERTY_ID, TAWK_WIDGET_ID } from "@/lib/env";

export function TawkToScript() {
  if (!HAS_TAWK) return null;

  return (
    <Script
      id="tawk-to-widget"
      strategy="afterInteractive"
      src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
      crossOrigin="anonymous"
    />
  );
}
