// app/books/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";


type SearchParams = {
  page?: string;
};

type PostsResponse = Awaited<ReturnType<typeof getPostsByTag>>;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildQuery(next: Partial<SearchParams>, current: SearchParams) {
  const params = new URLSearchParams();
  const merged: SearchParams = { ...current, ...next };
  if (merged.page) params.set("page", merged.page);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function BooksHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-black to-purple-950/30 p-8 sm:p-12 backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>
      <div className="relative space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-semibold">
            📚 Book Reviews & Summaries
          </p>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1]">
          Books Worth Your Time.
        </h1>
        <p className="text-lg text-white/70 max-w-2xl">
          In-depth reviews and key takeaways from the best books on product, business, psychology, and strategy. Distilled insights you can apply immediately.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-indigo-500/30 transition-all group cursor-pointer">
          <div className="text-indigo-400 text-2xl font-bold group-hover:scale-110 transition-transform">⭐</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">Ratings</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-indigo-500/30 transition-all group cursor-pointer">
          <div className="text-indigo-400 text-2xl font-bold group-hover:scale-110 transition-transform">💡</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">Insights</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-indigo-500/30 transition-all group cursor-pointer">
          <div className="text-indigo-400 text-2xl font-bold group-hover:scale-110 transition-transform">📖</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">Summaries</p>
        </div>
      </div>
    </div>
  );
}

function BookCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Book Cover Image */}
      {mediaUrl && (
        <div className="relative h-80 overflow-hidden bg-black/40">
          <Image
            src={mediaUrl}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-4 right-4 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 text-xs text-indigo-200 font-semibold backdrop-blur-sm">
            Book
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative p-6 flex flex-col gap-4 flex-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-semibold text-indigo-300 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Book Review
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all line-clamp-2">
            <Link href={`/books/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </div>

        {post.excerpt && (
          <p className="text-sm text-white/60 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs pt-3 border-t border-white/10 mt-auto">
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-1 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {post.readingTimeMinutes} min
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}

function Pagination({
  pagination,
  currentParams,
}: {
  pagination?: PostsResponse["meta"]["pagination"];
  currentParams: SearchParams;
}) {
  if (!pagination) return null;
  const { page, pageCount } = pagination;
  const hasNext = page < pageCount;
  const hasPrev = page > 1;

  return (
    <div className="flex items-center justify-center gap-4 pt-12">
      {hasPrev && (
        <Link
          href={buildQuery({ page: String(page - 1) }, currentParams)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-indigo-500/50 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 transition-all"
        >
          ← Previous
        </Link>
      )}

      <div className="flex items-center gap-2 text-sm text-white/50">
        <span>Page</span>
        <span className="font-semibold text-white">{page}</span>
        <span>of</span>
        <span className="font-semibold text-white">{pageCount}</span>
      </div>

      {hasNext && (
        <Link
          href={buildQuery({ page: String(page + 1) }, currentParams)}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-indigo-500/30 hover:to-purple-500/30 transition-all"
        >
          Next →
        </Link>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
      <p className="text-white/50 text-lg">{message}</p>
    </div>
  );
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 12;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("books", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch books:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <BooksHero />
          <div className="mt-12">
            <EmptyState message="Something went wrong. Please try again later." />
          </div>
        </div>
      </section>
    );
  }

  const posts = (postsRes?.data ?? []).filter((post) => !!post.slug);
  const pagination = postsRes?.meta.pagination;

  if (!posts.length) {
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <BooksHero />
          <div className="mt-12">
            <EmptyState message="No books yet. Check back soon." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <BooksHero />

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold">
                Library
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
            <h2 className="text-3xl font-bold text-white">Recommended Books</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BookCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}
