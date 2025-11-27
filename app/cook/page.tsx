// app/cook/page.tsx

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

function CookHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-900/30 via-black to-orange-900/20 p-8 sm:p-12 backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative space-y-6">
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300 font-semibold">
          🍳 Hands-On Recipes
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1]">
          Cook. Build. Iterate.
        </h1>
        <p className="text-lg text-white/70 max-w-3xl">
          Step-by-step recipes and practical guides. Tactical plays, templates, and frameworks you can use immediately in your work.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
            <span>⏱️</span>
            <span className="text-sm text-white/70">Quick wins</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
            <span>🛠️</span>
            <span className="text-sm text-white/70">Practical tactics</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
            <span>📋</span>
            <span className="text-sm text-white/70">Templates included</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {mediaUrl && (
  <div className="relative h-48 overflow-hidden bg-black/40">
    <Image
      src={mediaUrl}
      alt={post.featuredImage?.alternativeText || post.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute top-4 right-4 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs text-amber-200 font-semibold">
      Recipe
    </div>
  </div>
)}

      <div className="relative p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-300 transition-all line-clamp-2 flex-1">
            <Link href={`/cook/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
        </div>

        {post.excerpt && (
          <p className="text-sm text-white/60 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs pt-3 border-t border-white/10 mt-auto">
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-1 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {post.readingTimeMinutes} min
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
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
    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
      <p className="text-white/50 text-lg">{message}</p>
    </div>
  );
}

export default async function CookPage({
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
    postsRes = await getPostsByTag("cook", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch cook posts:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <CookHero />
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
          <CookHero />
          <div className="mt-12">
            <EmptyState message="No recipes yet. Check back soon." />
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

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <CookHero />

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-semibold">
                Browse
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            </div>
            <h2 className="text-3xl font-bold text-white">All Recipes</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RecipeCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
      </div>
    </section>
  );
}