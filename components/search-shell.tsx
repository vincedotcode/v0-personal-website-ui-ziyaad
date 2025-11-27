// app/search/search-shell.tsx
"use client";

import { useCallback,useEffect, useState } from "react";
import Link from "next/link";
import type { StrapiPost, StrapiTag } from "@/lib/strapi";
import { getPrimarySectionTagSlug } from "@/lib/strapi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  tags: StrapiTag[];
};

type SearchResponse = {
  data: StrapiPost[];
};

function buildPostHref(post: StrapiPost): string {
  const tagSlug = getPrimarySectionTagSlug(post);
  if (tagSlug) return `/${tagSlug}/${post.slug}`;
  return `/product/${post.slug}`;
}

export default function SearchShell({ tags }: Props) {
  const [allPosts, setAllPosts] = useState<StrapiPost[] | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [results, setResults] = useState<StrapiPost[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filtersEnabled = hasSearched && Boolean(results);

  // Hydrate all posts once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/search-posts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: SearchResponse = await res.json();
        if (mounted) {
          setAllPosts(data.data);
        }
      } catch (err) {
        console.error("[SearchShell] initial load error", err);
        if (mounted) {
          setError("Unable to load search index. Please try again.");
        }
      } finally {
        if (mounted) setInitialLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const runSearch = useCallback(
    async (overrideTag?: string | null) => {
      const q = query.trim().toLowerCase();
      const tagToUse = overrideTag ?? selectedTag;
      if (!allPosts || initialLoading) {
        setError("Still loading posts. Please try again in a moment.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const filtered = allPosts.filter((post) => {
          const matchesTag =
            !tagToUse ||
            post.tags?.some((t) => t.slug === tagToUse);

          const searchTarget = [
            post.title,
            post.excerpt,
            post.content,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesQuery = q ? searchTarget.includes(q) : true;
          return matchesTag && matchesQuery;
        });

        setResults(filtered);
        setHasSearched(true);
      } catch (err) {
        console.error("[SearchShell] search error", err);
        setError("Something went wrong while searching. Please try again.");
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    },
    [query, selectedTag, allPosts, initialLoading],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runSearch(1);
  };

  const handleTagClick = async (slug: string | null) => {
    if (!filtersEnabled) return;
    setSelectedTag(slug);
    // keep current query, re-run with explicit tag to avoid stale state
    await runSearch(slug);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
          Search
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Find the thing that’s nagging at you.
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Search across articles, books, product notes, media, and more. Filter
          by topic to narrow the signal.
        </p>
      </header>

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Input
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, topic, or idea..."
          className="flex-1"
          disabled={initialLoading}
        />
        <Button
          type="submit"
          className="sm:w-auto w-full"
          disabled={loading || initialLoading}
        >
          {initialLoading
            ? "Loading posts..."
            : loading
            ? "Searching..."
            : "Search"}
        </Button>
      </form>

      {/* Tag filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Filters
          </p>
          {!filtersEnabled && (
            <span className="text-[11px] text-muted-foreground">
              Run a search to unlock filters.
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleTagClick(null)}
            disabled={!filtersEnabled}
            className={[
              "px-3 py-1 rounded-full border text-xs font-medium transition-colors",
              !selectedTag
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground hover:border-primary/60",
              !filtersEnabled ? "opacity-60 cursor-not-allowed" : "",
            ].join(" ")}
          >
            All topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagClick(tag.slug)}
              disabled={!filtersEnabled}
              className={[
                "px-3 py-1 rounded-full border text-xs font-medium transition-colors",
                selectedTag === tag.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:border-primary/60",
                !filtersEnabled ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results / loader / empty states */}
      <div className="space-y-4 min-h-[120px]">
        {(loading || initialLoading) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
            <span>
              {initialLoading
                ? "Loading the library…"
                : "Pulling results from the archive…"}
            </span>
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive">
            {error}
          </p>
        )}

        {!loading && !initialLoading && hasSearched && results && (
          <>
            <p className="text-xs text-muted-foreground">
              Showing {results.length} result
              {results.length === 1 ? "" : "s"}
              {query.trim() && (
                <>
                  {" "}
                  for <span className="font-semibold">&quot;{query}&quot;</span>
                </>
              )}
              {selectedTag && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold">
                    {tags.find((t) => t.slug === selectedTag)?.name ??
                      selectedTag}
                  </span>
                </>
              )}
            </p>

            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing matched that query. Try a different word or broaden the
                filters.
              </p>
            ) : (
              <ul className="space-y-4">
                {results.map((post) => {
                  const href = buildPostHref(post);
                  const primaryTag = post.tags?.[0];

                  return (
                    <li key={post.id}>
                      <Link
                        href={href}
                        className="group block rounded-xl border border-border/60 bg-background/60 px-4 py-3 hover:border-primary/60 hover:bg-background/90 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {primaryTag && (
                              <span className="uppercase tracking-[0.18em] font-semibold">
                                {primaryTag.name}
                              </span>
                            )}
                            <span className="text-[10px] text-muted-foreground/80">
                              {new Date(
                                post.publishedAt,
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <h2 className="text-base md:text-lg font-semibold tracking-tight group-hover:text-primary">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

          </>
        )}

        {!loading && !initialLoading && !hasSearched && (
          <p className="text-xs text-muted-foreground">
            Start typing a query or pick a topic to see everything that lives
            here.
          </p>
        )}
      </div>
    </div>
  );
}
