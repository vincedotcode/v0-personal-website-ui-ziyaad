import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  search?: string;
};

type PostsResponse = Awaited<ReturnType<typeof getPostsByTag>>;

function buildQuery(next: Partial<SearchParams>, current: SearchParams) {
  const params = new URLSearchParams();
  const merged: SearchParams = { ...current, ...next };
  if (merged.page) params.set("page", merged.page);
  if (merged.search) params.set("search", merged.search);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function HelpHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 via-black to-blue-950/30 p-8 sm:p-12 backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>
      <div className="relative space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 font-semibold">
            ❓ Help & Support
          </p>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1]">
          How Can We Help?
        </h1>
        <p className="text-lg text-white/70 max-w-2xl">
          Find answers to common questions, guides, and documentation. Get support with guides, troubleshooting, and FAQs.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-cyan-500/30 transition-all group cursor-pointer">
          <div className="text-cyan-400 text-2xl font-bold group-hover:scale-110 transition-transform">📚</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">Guides</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-cyan-500/30 transition-all group cursor-pointer">
          <div className="text-cyan-400 text-2xl font-bold group-hover:scale-110 transition-transform">⚙️</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">Troubleshooting</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:border-cyan-500/30 transition-all group cursor-pointer">
          <div className="text-cyan-400 text-2xl font-bold group-hover:scale-110 transition-transform">❓</div>
          <p className="text-xs text-white/50 mt-3 uppercase tracking-wider">FAQs</p>
        </div>
      </div>
    </div>
  );
}

function HelpCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {mediaUrl && (
        <div className="relative h-48 overflow-hidden bg-black/40">
          <Image
            src={mediaUrl}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 text-xs text-cyan-200 font-semibold backdrop-blur-sm">
            Guide
          </div>
        </div>
      )}

      <div className="relative p-6 flex flex-col gap-4 flex-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Help Article
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all line-clamp-2">
            <Link href={`/help/${post.slug}`}>
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
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {post.readingTimeMinutes} min read
            </span>
          )}
          {post.format && (
            <span className="inline-flex items-center gap-1 text-white/60 capitalize">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {post.format}
            </span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all"
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
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-cyan-500/30 hover:to-blue-500/30 transition-all"
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

export default async function HelpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
    search: Array.isArray(raw.search) ? raw.search[0] : raw.search,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 12;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("help", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch help articles:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <HelpHero />
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
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <HelpHero />
          <div className="mt-12">
            <EmptyState message="No help articles yet. Check back soon." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <HelpHero />

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
                Resources
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
            <h2 className="text-3xl font-bold text-white">Help Articles</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <HelpCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}
