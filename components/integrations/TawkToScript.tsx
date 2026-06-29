import Script from "next/script";

import { HAS_TAWK, TAWK_PROPERTY_ID, TAWK_WIDGET_ID } from "@/lib/env";

export function TawkToScript() {
  if (!HAS_TAWK) return null;

  return (
    <>
      <Script id="tawk-chat-started-tracking" strategy="beforeInteractive">
        {`
          window.Tawk_API = window.Tawk_API || {};

          var existingOnChatStarted = window.Tawk_API.onChatStarted;

          window.Tawk_API.onChatStarted = function (event) {
            if (typeof existingOnChatStarted === 'function') {
              try {
                existingOnChatStarted.apply(this, arguments);
              } catch (error) {
                console.error('[Tracking] Existing Tawk onChatStarted callback failed', error);
              }
            }

            if (window.__tawkChatStartedTracked) {
              return;
            }

            window.__tawkChatStartedTracked = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'tawk_chat_started',
              chat_provider: 'tawk_to',
              page_path: window.location.pathname,
              chat_id: event && event.chatId ? event.chatId : undefined
            });
          };
        `}
      </Script>
      <Script
        id="tawk-to-widget"
        strategy="afterInteractive"
        src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
