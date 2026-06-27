"use client";

import { MessageCircle } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Opens the Tawk.to live chat. Used as the primary "talk to us now" action
 * across the site (in place of the phone number, which now lives only on the
 * contact page). Green by default to signal "online / available".
 *
 * If the chat widget hasn't loaded yet (or is blocked), it falls back to the
 * contact page so the action never dead-ends.
 */

interface TawkApi {
  maximize?: () => void;
  toggle?: () => void;
  setAttributes?: (attributes: Record<string, string>, callback?: (error?: unknown) => void) => void;
  addEvent?: (eventName: string, metadata?: Record<string, string>, callback?: (error?: unknown) => void) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

export function openChat() {
  if (typeof window === "undefined") return;
  const api = window.Tawk_API;
  if (api && typeof api.maximize === "function") {
    try {
      api.maximize();
      return;
    } catch {
      /* fall through to the contact page */
    }
  }
  window.location.href = "/contact";
}

export function ChatButton({
  label = "Chat with us",
  size = "lg",
  variant = "success",
  className,
  showDot = true,
}: {
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  /** Show the pulsing chat indicator icon. */
  showDot?: boolean;
}) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={openChat}
    >
      {showDot ? (
        <span className="relative inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
          <MessageCircle className="absolute h-4 w-4 animate-ping opacity-45" />
          <MessageCircle className="relative h-4 w-4" />
        </span>
      ) : (
        <MessageCircle className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
