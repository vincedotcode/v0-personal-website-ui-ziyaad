// app/media/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";


type SearchParams = {
  page?: string;
  filter?: string;
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
  if (merged.filter) params.set("filter", merged.filter);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function MediaHero() {
  return (
    <div className="relative overflow-hidden space-y-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-amber-950/40 via-black to-orange-950/40 p-8 sm:p-16 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Floating shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-amber-500/20 rounded-3xl rotate-45 animate-pulse" />
          <div className="absolute bottom-32 left-20 w-24 h-24 border border-orange-500/20 rounded-2xl -rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative space-y-8 max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 w-fit">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-amber-300">Visual Stories</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              Moments
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400">
                Captured.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed font-light">
              High-quality visual content from events, conferences, product launches, and behind-the-scenes moments. Explore our complete media collection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border border-black" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border border-black" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-amber-400 border border-black" />
              </div>
              <span className="text-sm text-white/70">500+ media assets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Browse by category</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={buildQuery({ filter: undefined, page: "1" }, {})}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-semibold hover:from-amber-500/30 hover:to-orange-500/30 transition-all text-sm"
          >
            All Media
          </Link>
          {["Photography", "Videography", "Events", "Presentations"].map((category) => (
            <Link
              key={category}
              href={buildQuery({ filter: category.toLowerCase(), page: "1" }, {})}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-amber-500/30 hover:bg-amber-500/10 font-semibold transition-all text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {mediaUrl && (
        <div className="relative h-80 overflow-hidden bg-black/60">
          <Image
            src={mediaUrl}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>

          {/* Format Badge */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {post.format === "video" ? "Video" : "Photo"}
          </div>
        </div>
      )}

      <div className="relative p-6 flex flex-col gap-3 flex-1">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-300 transition-all line-clamp-2">
            <Link href={`/media/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </div>

        {post.excerpt && (
          <p className="text-sm text-white/60 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-white/50 pt-3 border-t border-white/10 mt-auto">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-amber-400 font-semibold">View →</span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-amber-500/50 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 transition-all"
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
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-amber-500/30 hover:to-orange-500/30 transition-all"
        >
          Next →
        </Link>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">
      <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-white/50 text-lg">{message}</p>
    </div>
  );
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
    filter: Array.isArray(raw.filter) ? raw.filter[0] : raw.filter,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 16;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("media", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch media:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <MediaHero />
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
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <MediaHero />
          <div className="mt-12">
            <EmptyState message="No media found. Check back soon." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-16">
        <MediaHero />

        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-black">
                Gallery
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
            <h2 className="text-4xl font-black text-white">All Media</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <MediaCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}
