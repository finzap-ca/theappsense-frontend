import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Primary "Get started" CTA used across the main site (links to the contact
 * page). Live chat is reserved for the malware landing page; the floating Tawk
 * widget remains available site-wide.
 */
export function GetStartedButton({
  label = "Get started",
  href = "/contact",
  size = "lg",
  variant = "success",
  className,
}: {
  label?: string;
  href?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}
