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
  if (!post) return { title: "Help | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "Help article by Zi.",
  };
}

function HelpArticleHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <header className="space-y-8 mb-12">
      <Link href="/help" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Help
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 font-semibold">
              Help Article
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

        {post.readingTimeMinutes && (
          <div className="flex items-center gap-3 pt-4 pb-6 border-b border-white/10">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-sm text-cyan-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTimeMinutes} min read
            </span>
          </div>
        )}
      </div>

      {mediaUrl && (
        <div className="mt-10 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-cyan-300 prose-h2:to-blue-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-cyan-400 prose-strong:text-white prose-strong:font-semibold prose-code:bg-white/10 prose-code:text-cyan-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-cyan-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:my-8 prose-a:text-cyan-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-cyan-500/50 bg-cyan-500/10 px-6 py-4 rounded-r-lg my-8 text-white/70">{children}</blockquote>,
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

function QuickLinks() {
  return (
    <div className="mt-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-8 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Links
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/help" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/70 hover:text-white text-center">
          Back to Help
        </Link>
        <Link href="/product" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/70 hover:text-white text-center">
          Product Guides
        </Link>
        <Link href="/write" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/70 hover:text-white text-center">
          Essays
        </Link>
        <Link href="/" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-sm text-white/70 hover:text-white text-center">
          Home
        </Link>
      </div>
    </div>
  );
}

async function RelatedArticles({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("help", 1, 3);
  const articles = res.data.filter((p) => p.id !== currentPostId);
  if (!articles.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
          Related
        </p>
        <h2 className="text-2xl font-bold text-white">More Help Articles</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-3 mb-3">
              <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all line-clamp-2">
                <Link href={`/help/${article.slug}`}>{article.title}</Link>
              </h3>
            </div>
            {article.excerpt && <p className="text-sm text-white/60 line-clamp-2 ml-8">{article.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-10">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <HelpArticleHeader post={post} />
          {post.content && (
            <article className="mt-12">
              <PostContent content={post.content} />
              <QuickLinks />
            </article>
          )}
        </div>
        <RelatedArticles currentPostId={post.id} />
      </div>
    </section>
  );
}