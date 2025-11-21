// app/product/page.tsx

import Link from "next/link";
import { getPostsByTag, StrapiPost } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  let postsRes: { data: StrapiPost[] } | undefined;

  try {
    postsRes = await getPostsByTag("product", 1, 20);
  } catch (err) {
    console.error("Failed to fetch product posts:", err);
    return (
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Product</h1>
        <p className="text-destructive">
          Something went wrong while loading product content. Please try again
          later.
        </p>
      </section>
    );
  }

  const posts = postsRes?.data ?? [];

  if (!posts.length) {
    return (
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Product</h1>
        <p className="text-muted-foreground">
          No product posts yet. Check back soon.
        </p>
      </section>
    );
  }

  return (
    <section className="container max-w-5xl mx-auto px-4 py-16">
      <header className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Gotta Do
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Product
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Deep dives on product strategy, discovery, delivery and everything in
          between. No fluff – just hard-won lessons from real shipped work.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          // ✅ tags is now a plain array
          const firstTag = post.tags?.[0]?.name ?? "Product";

          return (
            <article
              key={post.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background/70 to-background hover:border-primary/60 transition-colors"
            >
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {firstTag}
                  </span>
                  {post.readingTimeMinutes && (
                    <span className="text-xs text-muted-foreground">
                      {post.readingTimeMinutes} min read
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                  <Link
                    href={`/articles/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>

                {post.subtitle && (
                  <p className="text-sm text-muted-foreground">
                    {post.subtitle}
                  </p>
                )}

                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {post.format === "video" && <span>· Video / Podcast</span>}
                  {post.isFeatured && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-500">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
