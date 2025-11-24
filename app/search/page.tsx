import Link from "next/link"
import { searchPosts, getPrimarySectionTagSlug } from "@/lib/strapi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { StrapiPost } from "@/lib/strapi"

type SearchParams = {
  q?: string
  page?: string
}

function buildPostHref(post: StrapiPost): string {
  const tagSlug = getPrimarySectionTagSlug(post)
  if (tagSlug) return `/${tagSlug}/${post.slug}`
  return `/product/${post.slug}`
}

export const dynamic = "force-dynamic"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const q = typeof params.q === "string" ? params.q : ""
  const page = params.page ? Number(params.page) || 1 : 1

  const hasQuery = q.trim().length > 0
  const results = hasQuery ? await searchPosts(q, page, 20) : null

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container max-w-4xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            Search
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Find the thing that’s nagging at you.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Search across articles, podcasts, media, and everything else.
          </p>
        </header>

        <form
          action="/search"
          method="get"
          className="flex flex-col sm:flex-row gap-3"
        >
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search by title, topic, or idea..."
            className="flex-1"
          />
          <Button type="submit" className="sm:w-auto w-full">
            Search
          </Button>
        </form>

        {hasQuery && results && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Showing {results.data.length} result
              {results.data.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold">&quot;{q}&quot;</span>
            </p>

            {results.data.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing matched that query. Try a different word or fewer terms.
              </p>
            ) : (
              <ul className="space-y-4">
                {results.data.map((post) => {
                  const href = buildPostHref(post)
                  const primaryTag = post.tags?.[0]

                  return (
                    <li key={post.id}>
                      <Link
                        href={href}
                        className="group block rounded-xl border border-border/60 bg-background/60 px-4 py-3 hover:border-primary/60 hover:bg-background/90 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {primaryTag && (
                              <span className="uppercase tracking-[0.18em] font-semibold">
                                {primaryTag.name}
                              </span>
                            )}
                            <span className="text-[10px] text-muted-foreground/80">
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <h2 className="text-base md:text-lg font-semibold tracking-tight group-hover:text-primary">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
