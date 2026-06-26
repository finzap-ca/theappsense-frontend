import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import { Logo } from "./Logo";
import { footerNav } from "@/data/navigation";
import { company } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand + contact */}
        <div className="space-y-4 lg:col-span-2">
          <Logo variant="inverted" />
          <p className="max-w-xs text-sm text-ink-muted">
            WordPress and web development, managed hosting, security, and care
            plans for small and growing businesses across Canada and the U.S.
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink-foreground"
              >
                <Mail className="h-4 w-4" />
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink-foreground"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-ink-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Greater Toronto Area · Serving Canada &amp; the U.S.</span>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-3 text-sm font-semibold text-ink-foreground">
              {col.title}
            </h2>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. A service of{" "}
            {company.legalName}.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ink-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-ink-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
