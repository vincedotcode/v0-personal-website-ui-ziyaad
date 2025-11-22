// app/product/page.tsx

import Link from "next/link";
import { getPostsByTag, StrapiPost } from "@/lib/strapi";

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  tag?: string;
  format?: string;
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

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function ProductHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-background p-8 sm:p-10 shadow-lg">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_35%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Product operating system
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Ship sharper product outcomes, faster.
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            Playbooks, research, experiments, and delivery tactics from real
            launches. Learn how to validate bets, align teams, and measure what
            matters without the fluff.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Discovery → Delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Experiments &amp; metrics
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-pink-400" />
              Modern product craft
            </span>
          </div>
        </div>
        <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-pink-500/10 blur-2xl" />
          <div className="relative space-y-3">
            <p className="text-sm text-muted-foreground">Featured playbook</p>
            <p className="text-xl font-semibold">
              Build a metrics stack that cuts through vanity noise.
            </p>
            <p className="text-sm text-muted-foreground">
              Define the signals that prove traction, set leading indicators,
              and connect experiments to impact.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                North Star metrics
              </span>
              <span className="rounded-full bg-background/80 border border-border px-3 py-1">
                Dashboards that drive action
              </span>
              <span className="rounded-full bg-background/80 border border-border px-3 py-1">
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

  return (
    <article className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-background p-6 sm:p-8 shadow-xl">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.16),transparent_30%)]" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              {firstTag}
            </span>
            <span className="rounded-full bg-background/80 px-3 py-1 border border-border/60">
              Featured
            </span>
            <span className="rounded-full bg-background/80 px-3 py-1 border border-border/60">
              Updated {formatDate(post.updatedAt)}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            <Link
              href={`/product/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          {post.subtitle && (
            <p className="text-base text-muted-foreground max-w-3xl">
              {post.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {post.readingTimeMinutes && (
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-border/60 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {post.readingTimeMinutes} min read
              </span>
            )}
            {post.format && (
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-border/60 px-3 py-1 capitalize">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {post.format}
              </span>
            )}
          </div>
        </div>
        {post.excerpt && (
          <div className="md:max-w-sm">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
              {post.excerpt}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function FilterPills({
  tags,
  selectedTag,
  selectedFormat,
  currentParams,
}: {
  tags: string[];
  selectedTag?: string;
  selectedFormat?: string;
  currentParams: SearchParams;
}) {
  const formats = ["all", "article", "video", "podcast"];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-muted-foreground">Filter by tag:</span>
        <Link
          href={buildQuery({ page: "1", tag: undefined }, currentParams)}
          className={`inline-flex items-center rounded-full border px-3 py-1 transition-colors ${
            !selectedTag
              ? "border-primary/60 bg-primary/10 text-primary"
              : "border-border/60 hover:border-primary/50"
          }`}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={buildQuery({ page: "1", tag }, currentParams)}
            className={`inline-flex items-center rounded-full border px-3 py-1 transition-colors ${
              selectedTag === tag
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border/60 hover:border-primary/50"
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-muted-foreground">Format:</span>
        {formats.map((format) => (
          <Link
            key={format}
            href={buildQuery(
              { page: "1", format: format === "all" ? undefined : format },
              currentParams,
            )}
            className={`inline-flex items-center rounded-full border px-3 py-1 capitalize transition-colors ${
              (format === "all" && !selectedFormat) ||
              selectedFormat === format
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border/60 hover:border-primary/50"
            }`}
          >
            {format}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ post }: { post: StrapiPost }) {
  const firstTag = post.tags?.[0]?.name ?? "Product";
  const secondaryTag = post.tags?.[1]?.name;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-background via-background/80 to-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.08),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              {firstTag}
            </span>
            {secondaryTag && (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1">
                {secondaryTag}
              </span>
            )}
          </div>
          <span>{formatDate(post.updatedAt)}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            <Link
              href={`/product/${post.slug}`}
              className="transition-colors hover:text-primary"
            >
              {post.title}
            </Link>
          </h3>
          {post.subtitle && (
            <p className="text-sm text-muted-foreground">{post.subtitle}</p>
          )}
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {post.readingTimeMinutes} min read
            </span>
          )}
          {post.format && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 capitalize">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {post.format}
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            Updated {formatDate(post.updatedAt)}
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
    <div className="flex items-center justify-center gap-4 pt-6">
      {hasPrev && (
        <Link
          href={buildQuery({ page: String(page - 1) }, currentParams)}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-primary/60 hover:text-primary"
        >
          ← Newer
        </Link>
      )}
      {hasNext && (
        <Link
          href={buildQuery({ page: String(page + 1) }, currentParams)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/20"
        >
          Load more
        </Link>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-background/60 p-8 text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // ✅ Unwrap dynamic searchParams Promise once
  const raw = await searchParams;

  const resolvedSearchParams: SearchParams = {
    page: Array.isArray(raw.page) ? raw.page[0] : raw.page,
    tag: Array.isArray(raw.tag) ? raw.tag[0] : raw.tag,
    format: Array.isArray(raw.format) ? raw.format[0] : raw.format,
  };

  const page = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const pageSize = 9;

  let postsRes: PostsResponse | undefined;

  try {
    postsRes = await getPostsByTag("product", page, pageSize);
  } catch (err) {
    console.error("Failed to fetch product posts:", err);
    return (
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <ProductHero />
        <div className="mt-8">
          <EmptyState message="Something went wrong while loading product content. Please try again later." />
        </div>
      </section>
    );
  }

  // ✅ Filter out posts without a slug to avoid /product/undefined
  const posts = (postsRes?.data ?? []).filter((post) => !!post.slug);
  const pagination = postsRes?.meta.pagination;

  if (!posts.length) {
    return (
      <section className="container mx-auto max-w-6xl px-4 py-16 space-y-8">
        <ProductHero />
        <EmptyState message="No product content yet. Check back soon for new playbooks and breakdowns." />
      </section>
    );
  }

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags?.map((tag) => tag.name) ?? [])),
  );

  const selectedTag = resolvedSearchParams.tag;
  const selectedFormat = resolvedSearchParams.format;

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag
      ? post.tags?.some((tag) => tag.name === selectedTag)
      : true;
    const matchesFormat = selectedFormat
      ? post.format === selectedFormat
      : true;
    return matchesTag && matchesFormat;
  });

  const spotlight =
    filteredPosts.find((post) => post.isFeatured) ?? filteredPosts[0];

  const gridPosts = spotlight
    ? filteredPosts.filter((post) => post.id !== spotlight.id)
    : filteredPosts;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-16 space-y-10">
      <ProductHero />

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Product hub
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured spotlight
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Curated experiments and breakdowns
          </div>
        </div>
        {spotlight ? (
          <Spotlight post={spotlight} />
        ) : (
          <EmptyState message="No featured stories yet. Explore the latest posts below." />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Explore
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 via-border to-transparent" />
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Latest product drops
            </h2>
            <p className="text-sm text-muted-foreground">
              Stay ahead with battle-tested patterns
            </p>
          </div>
        </div>
        <FilterPills
          tags={allTags}
          selectedTag={selectedTag}
          selectedFormat={selectedFormat}
          currentParams={resolvedSearchParams}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState message="No posts match those filters yet. Try another tag or format." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <ProductCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination pagination={pagination} currentParams={resolvedSearchParams} />
    </section>
  );
}
