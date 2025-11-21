// app/product/page.tsx
import Link from "next/link";
import { getPostsByTag } from "@/lib/strapi";

export const dynamic = "force-dynamic"; // or use revalidate if you want caching

export default async function ProductPage() {
  let postsRes;

  try {
    postsRes = await getPostsByTag("product", 1, 10);
  } catch (err) {
    console.error("Failed to fetch product posts:", err);
    return (
      <section className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Product</h1>
        <p className="text-destructive">
          Something went wrong while loading product content. Please try again later.
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
    <section className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Product</h1>
      <p className="text-muted-foreground mb-8">
        Product-related articles and content.
      </p>

      <div className="space-y-6">
        {posts.map((post) => {
          const attrs = post.attributes;
          const firstTag = attrs.tags?.data?.[0]?.attributes?.name;

          return (
            <article
              key={post.id}
              className="border border-border/60 rounded-xl p-5 hover:border-primary/60 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h2 className="text-xl font-semibold">
                  {/* later you can make /product/[slug] */}
                  {attrs.slug ? (
                    <Link
                      href={`/articles/${attrs.slug}`}
                      className="hover:underline"
                    >
                      {attrs.title}
                    </Link>
                  ) : (
                    attrs.title
                  )}
                </h2>
                {firstTag && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {firstTag}
                  </span>
                )}
              </div>
              {attrs.excerpt && (
                <p className="text-sm text-muted-foreground mb-3">
                  {attrs.excerpt}
                </p>
              )}
              {/* Optional: show format info */}
              {attrs.format === "video" && attrs.youtubeUrl && (
                <p className="text-xs text-primary">
                  Video / Podcast – will link to YouTube later
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
