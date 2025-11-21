import { searchPosts } from "@/lib/strapi"
import Link from "next/link"

type Props = {
  searchParams: { q?: string; page?: string }
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q ?? "").trim()
  const page = Number(searchParams.page ?? 1)

  let posts: any[] = []
  let pagination: any = null

  if (q) {
    const res = await searchPosts(q, page, 10)
    posts = res.data
    pagination = res.meta.pagination
  }

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      {/* You can turn this into a client component to handle form submit without reload */}
      <form className="mb-8" method="GET">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search posts..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
      </form>

      {!q && <p className="text-muted-foreground">Type something to search.</p>}

      {q && posts.length === 0 && (
        <p className="text-muted-foreground">No results for “{q}”.</p>
      )}

      <div className="space-y-6">
        {posts.map((post) => {
          const attrs = post.attributes
          // get first tag slug to build URL; you can be smarter here
          const tagSlug = attrs.tags?.data?.[0]?.attributes?.slug ?? "articles"
          const section = mapTagToSection(tagSlug)
          const url = `/${section}/${attrs.slug}`

          return (
            <article key={post.id}>
              <h2 className="text-xl font-semibold">
                <Link href={url} className="hover:underline">
                  {attrs.title}
                </Link>
              </h2>
              {attrs.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {attrs.excerpt}
                </p>
              )}
            </article>
          )
        })}
      </div>

      {/* reuse the pagination pattern if needed */}
    </div>
  )
}

function mapTagToSection(tag: string): string {
  // You can keep this simple 1:1 for now
  return tag
}
