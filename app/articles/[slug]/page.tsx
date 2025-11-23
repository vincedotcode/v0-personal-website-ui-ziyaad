// app/articles/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "An article by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ArticleHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <header className="space-y-8 mb-12">
      <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Articles
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 font-semibold">
              {formatDate(post.publishedAt)}
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed font-light">
              {post.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/30 px-4 py-2 text-sm text-teal-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTimeMinutes} min read
            </span>
          )}
          {post.format && (
            <span className="inline-flex items-center rounded-full bg-teal-500/10 border border-teal-500/30 px-4 py-2 text-sm text-teal-300 capitalize">
              {post.format}
            </span>
          )}
        </div>
      </div>

      {mediaUrl && (
        <div className="mt-10 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 via-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl group-hover:border-white/20 transition-all duration-300">
            <Image
              src={mediaUrl}
              alt={post.featuredImage?.alternativeText || post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      )}
    </header>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-teal-300 prose-h2:to-emerald-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-teal-400 prose-strong:text-white prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-teal-500/50 prose-blockquote:bg-teal-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-teal-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-teal-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-emerald-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-teal-500/50 bg-teal-500/10 px-6 py-4 rounded-r-lg my-8 text-white/70">{children}</blockquote>,
        img: ({ ...props }) => (
          <figure className="my-8">
            <img {...props} className="w-full rounded-2xl border border-white/10 shadow-lg" />
            {props.alt && <figcaption className="mt-3 text-center text-sm text-white/50">{props.alt}</figcaption>}
          </figure>
        ),
      }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

async function RelatedArticles({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("articles", 1, 3);
  const articles = res.data.filter((p) => p.id !== currentPostId);
  if (!articles.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-semibold">
          Keep Reading
        </p>
        <h2 className="text-2xl font-bold text-white">More Articles</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-6 hover:border-teal-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
              <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-300 group-hover:to-emerald-300 transition-all line-clamp-2">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
            </div>
            {article.excerpt && <p className="text-sm text-white/60 line-clamp-2 ml-5">{article.excerpt}</p>}
            <div className="mt-4 ml-5 text-xs text-white/40">{formatDate(article.publishedAt)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-10">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <ArticleHeader post={post} />
          {post.content && (
            <article className="mt-12">
              <PostContent content={post.content} />
            </article>
          )}
        </div>
        <RelatedArticles currentPostId={post.id} />
      </div>
    </section>
  );
}