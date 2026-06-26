import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-28 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page may have moved or no longer exists. Try the homepage, or take a
        look at what we offer.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Browse services</Link>
        </Button>
      </div>
    </div>
  );
}
