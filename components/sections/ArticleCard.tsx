import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { type Post } from "@/data/posts";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <Badge variant="secondary">{post.category}</Badge>
        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Read article
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
