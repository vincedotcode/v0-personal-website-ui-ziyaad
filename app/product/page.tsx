// app/product/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";


type SearchParams = {
  page?: string;
  tag?: string;
  format?: string;
  sort?: string;
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
  if (merged.tag) params.set("tag", merged.tag);
  if (merged.format) params.set("format", merged.format);
  if (merged.sort) params.set("sort", merged.sort);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function ProductHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 p-8 sm:p-12 backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative grid gap-8 lg:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
            Product Operating System
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Ship sharper product outcomes, faster.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed font-light">
            Playbooks, research, experiments, and delivery tactics from real launches. Learn how to validate bets, align teams, and measure what matters.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-white/70">Discovery → Delivery</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span className="text-sm text-white/70">Experiments & metrics</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-pink-400" />
              <span className="text-sm text-white/70">Modern craft</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl shadow-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/50">Featured playbook</p>
            <p className="text-xl font-bold text-white">Build a metrics stack that cuts through vanity.</p>
            <p className="text-sm text-white/60 leading-relaxed">Define signals that prove traction, set leading indicators, and connect experiments to real impact.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-1 text-xs font-medium text-purple-300">
                North Star
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60">
                Decision cadence
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spotlight({ post }: { post: StrapiPost }) {
  const firstTag = post.tags?.[0]?.name ?? "Product";
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative grid md:grid-cols-[2fr,1.5fr] gap-6 p-8">
        <div className="space-y-5 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300 uppercase tracking-wider">
              {firstTag}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60">
              ⭐ Featured
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.2]">
            <Link
              href={`/product/${post.slug}`}
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all"
            >
              {post.title}
            </Link>
          </h2>
          {post.subtitle && (
            <p className="text-base text-white/60 leading-relaxed max-w-2xl">
              {post.subtitle}
            </p>
          )}
          {post.excerpt && (
            <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-3 pt-4">
            {post.readingTimeMinutes && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {post.readingTimeMinutes} min read
              </span>
            )}
            {post.format && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60 capitalize">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                {post.format}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60">
              Updated {formatDate(post.updatedAt)}
            </span>
          </div>
        </div>
        {mediaUrl && (
          <div className="relative rounded-xl overflow-hidden border border-white/10 group/image">
            <Image
              src={mediaUrl}
              alt={post.featuredImage?.alternativeText || post.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}
      </div>
    </article>
  );
}

function FilterBar({
  tags,
  selectedTag,
  selectedFormat,
  selectedSort,
  currentParams,
}: {
  tags: string[];
  selectedTag?: string;
  selectedFormat?: string;
  selectedSort?: string;
  currentParams: SearchParams;
}) {
  const formats = ["all", "article", "video", "podcast"];
  const sorts = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
        {(selectedTag || selectedFormat || selectedSort !== "newest") && (
          <Link
            href="/product"
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            Reset
          </Link>
        )}
      </div>

      <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
        {/* Tag Filter */}
        <div className="space-y-3">
          <p className="text-xs text-white/50 uppercase tracking-wider">Tags</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildQuery({ page: "1", tag: undefined }, currentParams)}
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition-all ${
                !selectedTag
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
              }`}
            >
              All Tags
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={buildQuery({ page: "1", tag }, currentParams)}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition-all capitalize ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-wider">Format</p>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <Link
                key={format}
                href={buildQuery(
                  { page: "1", format: format === "all" ? undefined : format },
                  currentParams,
                )}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs capitalize transition-all ${
                  (format === "all" && !selectedFormat) ||
                  selectedFormat === format
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                }`}
              >
                {format}
              </Link>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-wider">Sort</p>
          <div className="flex flex-wrap gap-2">
            {sorts.map((sort) => (
              <Link
                key={sort.value}
                href={buildQuery(
                  { page: "1", sort: sort.value },
                  currentParams,
                )}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition-all ${
                  (selectedSort || "newest") === sort.value
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                }`}
              >
                {sort.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ post }: { post: StrapiPost }) {
  const firstTag = post.tags?.[0]?.name ?? "Product";
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Section */}
      {mediaUrl && (
        <div className="relative h-48 overflow-hidden bg-black/40 group-hover/image:scale-110 transition-transform duration-500">
          <Image
            src={mediaUrl}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Content Section */}
      <div className="relative p-5 flex flex-col gap-4 flex-1">
        {/* Tags and Date */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300 uppercase">
            {firstTag}
          </span>
          <span className="text-white/40">{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title */}
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all line-clamp-2">
            <Link href={`/product/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-xs text-white/50 line-clamp-1">{post.subtitle}</p>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-white/10">
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-1 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {post.readingTimeMinutes} min
            </span>
          )}
          {post.format && (
            <span className="inline-flex items-center gap-1 text-white/60 capitalize">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all"
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
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-2.5 text-sm font-medium text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
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

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;

  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
    tag: Array.isArray(raw.tag) ? raw.tag[0] : raw.tag,
    format: Array.isArray(raw.format) ? raw.format[0] : raw.format,
    sort: Array.isArray(raw.sort) ? raw.sort[0] : raw.sort || "newest",
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 12;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("product", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch product posts:", err);
    return (
      <section className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <ProductHero />
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
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-16 space-y-8">
          <ProductHero />
          <EmptyState message="No product content yet. Check back soon." />
        </div>
      </section>
    );
  }

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags?.map((tag) => tag.name) ?? [])),
  ).sort();

  const selectedTag = resolvedSearchParams.tag;
  const selectedFormat = resolvedSearchParams.format;
  const selectedSort = resolvedSearchParams.sort || "newest";

  let filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag
      ? post.tags?.some((tag) => tag.name === selectedTag)
      : true;
    const matchesFormat = selectedFormat
      ? post.format === selectedFormat
      : true;
    return matchesTag && matchesFormat;
  });

  // Apply sorting
  if (selectedSort === "oldest") {
    filteredPosts = filteredPosts.sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() -
        new Date(b.publishedAt).getTime()
    );
  }

  const spotlight =
    filteredPosts.find((post) => post.isFeatured) ?? filteredPosts[0];

  const gridPosts = spotlight
    ? filteredPosts.filter((post) => post.id !== spotlight.id)
    : filteredPosts;

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 space-y-12">
        <ProductHero />

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                Featured
              </p>
              <h2 className="text-3xl font-bold text-white">Spotlight</h2>
            </div>
            <p className="text-sm text-white/50 text-right">
              Curated experiments & breakdowns
            </p>
          </div>
          {spotlight ? (
            <Spotlight post={spotlight} />
          ) : (
            <EmptyState message="No featured posts yet." />
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
          {/* Main Grid */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  Explore
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold text-white">Latest Drops</h3>
            </div>

            {filteredPosts.length === 0 ? (
              <EmptyState message="No posts match those filters." />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
          </div>

          {/* Sidebar Filters */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <FilterBar
              tags={allTags}
              selectedTag={selectedTag}
              selectedFormat={selectedFormat}
              selectedSort={selectedSort}
              currentParams={resolvedSearchParams}
            />
          </div>
        </div>
      </div>
    </section>
  );
}