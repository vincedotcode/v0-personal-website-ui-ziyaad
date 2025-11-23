// app/portfolio/page.tsx

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

function PortfolioHero() {
  return (
    <div className="relative overflow-hidden space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-950/30 via-black to-fuchsia-950/30 p-8 sm:p-12 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
              <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-fuchsia-300 font-semibold">
              🎨 Work & Case Studies
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1]">
            Featured Work.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Selected case studies and projects showcasing product strategy, design, and delivery. Real challenges. Real solutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-rose-500/30 transition-all">
          <div className="text-4xl font-bold text-rose-400 mb-2">10+</div>
          <p className="text-sm text-white/60">Projects Delivered</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-rose-500/30 transition-all">
          <div className="text-4xl font-bold text-fuchsia-400 mb-2">50M+</div>
          <p className="text-sm text-white/60">Users Impacted</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-rose-500/30 transition-all">
          <div className="text-4xl font-bold text-rose-400 mb-2">5+ yrs</div>
          <p className="text-sm text-white/60">Product Experience</p>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-rose-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-transparent to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {mediaUrl && (
        <div className="relative h-72 overflow-hidden bg-black/60">
          <Image
            src={mediaUrl}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      <div className="relative p-8 flex flex-col gap-5 flex-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-300 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Case Study
          </div>

          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-300 group-hover:to-fuchsia-300 transition-all line-clamp-2">
            <Link href={`/portfolio/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </div>

        {post.excerpt && (
          <p className="text-sm text-white/70 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <span className="text-xs text-white/50">{formatDate(post.publishedAt)}</span>
          <span className="text-xs font-semibold text-rose-400">View Case →</span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-rose-500/50 hover:bg-gradient-to-r hover:from-rose-500/20 hover:to-fuchsia-500/20 transition-all"
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
          className="inline-flex items-center gap-2 rounded-full border border-rose-500/50 bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-rose-500/30 hover:to-fuchsia-500/30 transition-all"
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

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 6;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("portfolio", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch portfolio:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <PortfolioHero />
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
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <PortfolioHero />
          <div className="mt-12">
            <EmptyState message="No case studies yet. Check back soon." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <PortfolioHero />

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-400 font-semibold">
                Showcase
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
            <h2 className="text-3xl font-bold text-white">All Case Studies</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <CaseStudyCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}

