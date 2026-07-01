"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/GetStartedButton";
import { Logo } from "./Logo";
import { primaryNav, primaryCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.groups ? (
              <div
                key={item.href}
                ref={menuRef}
                className="relative"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground",
                  )}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      menuOpen && "rotate-180",
                    )}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-[34rem] rounded-xl border border-border bg-popover p-3 shadow-lg">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              {group.title}
                            </p>
                            <ul>
                              {group.links.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block rounded-lg px-3 py-2 hover:bg-accent"
                                  >
                                    <span className="text-sm font-medium text-foreground">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="mt-0.5 block text-xs text-muted-foreground">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        className="mt-2 flex items-center justify-between rounded-lg border-t border-border px-3 pt-3 text-sm font-semibold text-primary"
                      >
                        View all services
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <GetStartedButton label="Get started" size="sm" />
          <Button asChild size="sm">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </div>

        {/* Mobile toggle: three bars that morph into an X. */}
        <button
          type="button"
          className="group inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out",
                mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ease-out",
                mobileOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out",
                mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-menu-in border-t border-border bg-background lg:hidden">
          <nav
            className="container flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-4"
            aria-label="Mobile"
          >
            {primaryNav.map((item) =>
              item.groups ? (
                <div key={item.href} className="py-1">
                  {item.groups.map((group) => (
                    <div key={group.title} className="mb-2">
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.title}
                      </p>
                      <ul className="ml-3 border-l border-border pl-3">
                        {group.links.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
                    isActive(pathname, item.href)
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <GetStartedButton label="Get started" size="default" className="w-full" />
              <Button asChild variant="outline">
                <Link href="/get-started">
                  <LifeBuoy className="h-4 w-4" />
                  Get help with my site
                </Link>
              </Button>
              <Button asChild>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
