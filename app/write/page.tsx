// app/write/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

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

function WriteHero() {
  return (
    <div className="relative space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/30 via-black to-blue-900/20 p-8 sm:p-12 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative space-y-6 max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 font-semibold">
            ✍️ Essays & Insights
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.2]">
            Thoughts on strategy, craft, and the business of building.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Long-form essays exploring product thinking, team dynamics, and what it takes to ship with intention. No fluff. Just substance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-blue-300">50+</div>
          <p className="text-xs text-white/50 mt-2">Essays published</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cyan-300">5-15</div>
          <p className="text-xs text-white/50 mt-2">Minute reads</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-blue-300">Weekly</div>
          <p className="text-xs text-white/50 mt-2">Fresh insights</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-cyan-300">Archive</div>
          <p className="text-xs text-white/50 mt-2">Full access</p>
        </div>
      </div>
    </div>
  );
}

function EssayCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-8 flex flex-col gap-5 flex-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Essay
          </div>

          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all line-clamp-3">
            <Link href={`/product/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </div>

        {post.excerpt && (
          <p className="text-base text-white/60 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        )}

        {mediaUrl && (
          <div className="relative h-48 rounded-lg overflow-hidden border border-white/10 -mx-8 -mb-8">
            <Image
              src={mediaUrl}
              alt={post.featuredImage?.alternativeText || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-white/50 pt-4">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTimeMinutes && (
            <span>{post.readingTimeMinutes} min read</span>
          )}
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all"
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
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
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

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 8;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("write", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch write posts:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <WriteHero />
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
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <WriteHero />
          <div className="mt-12">
            <EmptyState message="No essays yet. Check back soon." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <WriteHero />

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
              Collection
            </p>
            <h2 className="text-3xl font-bold text-white">Latest Essays</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <EssayCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}