import { SECTION_TAG_MAP } from "@/lib/sections"
import { getPostsByTag } from "@/lib/strapi"
import Link from "next/link"

type Props = {
  params: { section: string }
  searchParams: { page?: string }
}

export default async function SectionListingPage({ params, searchParams }: Props) {
  const { section } = params
  const page = Number(searchParams.page ?? 1)

  // handle /portfolio separately via its own route
  if (section === "portfolio") {
    // Let /portfolio have its own page.tsx
    // This dynamic route will not be matched if you have app/portfolio/page.tsx
    return null
  }

  const tag = SECTION_TAG_MAP[section]

  if (!tag) {
    // you can redirect to /error or 404
    return <div className="container py-16">Section not found.</div>
  }

  const res = await getPostsByTag(tag, page, 10)
  const posts = res.data
  const pagination = res.meta.pagination

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{section}</h1>

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts yet. Check back soon.</p>
      )}

      <div className="space-y-6">
        {posts.map((post) => {
          const attrs = post.attributes
          const url = `/${section}/${attrs.slug}`

          return (
            <article key={post.id} className="border border-border/50 rounded-xl p-4 hover:border-primary/60 transition">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={url} className="hover:underline">
                  {attrs.title}
                </Link>
              </h2>
              {attrs.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {attrs.excerpt}
                </p>
              )}
              <div className="mt-3 text-xs text-muted-foreground">
                {new Date(attrs.publishedAt).toLocaleDateString("en-GB")}
              </div>
            </article>
          )
        })}
      </div>

      {pagination && pagination.pageCount > 1 && (
        <div className="flex items-center justify-between mt-8 text-sm">
          <button
            disabled={pagination.page <= 1}
            className="disabled:opacity-50"
          >
            {pagination.page > 1 && (
              <Link href={`/${section}?page=${pagination.page - 1}`}>← Previous</Link>
            )}
          </button>
          <span>
            Page {pagination.page} of {pagination.pageCount}
          </span>
          <button
            disabled={pagination.page >= pagination.pageCount}
            className="disabled:opacity-50"
          >
            {pagination.page < pagination.pageCount && (
              <Link href={`/${section}?page=${pagination.page + 1}`}>Next →</Link>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
