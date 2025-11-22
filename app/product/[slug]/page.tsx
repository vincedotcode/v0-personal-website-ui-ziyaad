// app/product/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostsByTag, StrapiPost } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

export const dynamic = "force-dynamic";

type ProductPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: ProductPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Product | Zi",
      description: "Product content by Zi.",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description:
      post.seoDescription ||
      post.excerpt ||
      "Product strategy, discovery and delivery content by Zi.",
  };
}

function PostMeta({ post }: { post: StrapiPost }) {
  const tags = post.tags ?? [];
  const primaryTag = tags[0]?.name ?? "Product";

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
        {primaryTag}
      </span>
      {tags.slice(1).map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1"
        >
          {tag.name}
        </span>
      ))}
      <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1">
        Published {formatDate(post.publishedAt)}
      </span>
      <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1">
        Updated {formatDate(post.updatedAt)}
      </span>
      {post.readingTimeMinutes && (
        <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1">
          {post.readingTimeMinutes} min read
        </span>
      )}
      {post.format && (
        <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 capitalize">
          {post.format}
        </span>
      )}
    </div>
  );
}

function PostHeader({ post }: { post: StrapiPost }) {
  return (
    <header className="space-y-4">
      <Link
        href="/product"
        className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary"
      >
        ← Back to Product
      </Link>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Product operating system
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-base text-muted-foreground max-w-2xl">
            {post.subtitle}
          </p>
        )}
      </div>
      <PostMeta post={post} />
    </header>
  );
}

/**
 * Renders Strapi "content" as either:
 * - Markdown (using react-markdown + GFM) – good for your example payload
 * - Or raw HTML if the string already looks like HTML
 *
 * Images (`![]()` or `<img>`) are rendered in a full-width, nice layout.
 */
function PostContent({ content }: { content: string }) {
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  if (looksLikeHtml) {
    // Strapi richtext → HTML path (handles <p>, <h2>, <ul>, <img>, etc.)
    return (
      <div
        className="prose prose-neutral max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-sm prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Markdown path – matches the JSON you pasted (###, *, --- etc.)
  return (
    <div className="prose prose-neutral max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-sm prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-semibold tracking-tight" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
          ),
          p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 space-y-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 space-y-1" {...props} />
          ),
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="font-medium text-primary underline-offset-2 hover:underline"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <figure className="my-8">
              {/* For now, render plain <img>; if your URLs are relative from Strapi,
                 make them absolute at content level or wrap here. */}
              <img
                {...props}
                className="mx-auto max-h-[480px] w-auto rounded-2xl border border-border/60 shadow-sm"
              />
              {props.alt && (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  {props.alt}
                </figcaption>
              )}
            </figure>
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-border/60" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/40 bg-primary/5 px-4 py-3 text-sm italic text-muted-foreground"
              {...props}
            />
          ),
          code: ({ node, className, ...props }: React.ComponentPropsWithoutRef<"code"> & { node?: any }) => {
            const isInline = !className || !className.includes("language-");
            return isInline ? (
              <code className="rounded bg-muted px-1 py-0.5 text-xs" {...props} />
            ) : (
              <code
                className="block overflow-x-auto rounded-lg bg-muted/70 p-3 text-xs"
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function PostBody({ post }: { post: StrapiPost }) {
  if (!post.content) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        This post doesn&apos;t have content yet.
      </p>
    );
  }

  return (
    <article className="mt-8 rounded-3xl border border-border/70 bg-background/80 p-6 sm:p-8">
      <PostContent content={post.content} />
    </article>
  );
}

function RelatedCard({ post }: { post: StrapiPost }) {
  const primaryTag = post.tags?.[0]?.name ?? "Product";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-background via-background/80 to-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.08),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            {primaryTag}
          </span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="text-sm font-semibold tracking-tight">
          <Link
            href={`/product/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {post.excerpt}
          </p>
        )}
        {post.readingTimeMinutes && (
          <span className="mt-1 text-[11px] text-muted-foreground">
            {post.readingTimeMinutes} min read
          </span>
        )}
      </div>
    </article>
  );
}

async function RelatedPosts({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("product", 1, 6);
  const posts = res.data.filter((p) => p.id !== currentPostId);

  if (!posts.length) return null;

  return (
    <section className="mt-12 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            More from product
          </p>
          <h2 className="text-lg font-semibold tracking-tight">
            Keep sharpening the craft
          </h2>
        </div>
        <Link
          href="/product"
          className="text-xs font-medium text-muted-foreground hover:text-primary"
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RelatedCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default async function ProductPostPage({ params }: ProductPostPageProps) {
  const { slug } = await params;

  if (!slug || slug === "undefined" || slug === "null") {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container mx-auto max-w-4xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-background p-6 sm:p-8 shadow-lg">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.15),transparent_35%)]" />
        <div className="relative">
          <PostHeader post={post} />
          <PostBody post={post} />
        </div>
      </div>

      {/* Related posts from /product tagged content */}
      <RelatedPosts currentPostId={post.id} />
    </section>
  );
}
