// app/portfolio/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";
import { MarkdownImage } from "@/components/markdown-image";


type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Case Study | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "A case study by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CaseStudyHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <header className="space-y-10 mb-12">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Portfolio
      </Link>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/30">
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-fuchsia-300 font-semibold">
              Case Study
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

        <div className="flex flex-wrap items-center gap-4 pt-4 pb-6 border-b border-white/10">
          <span className="text-sm text-white/60">{formatDate(post.publishedAt)}</span>
          {post.readingTimeMinutes && (
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs text-rose-300">
              {post.readingTimeMinutes} min read
            </span>
          )}
        </div>
      </div>

      {mediaUrl && (
        <div className="mt-10 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/20 via-fuchsia-600/20 to-rose-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-rose-300 prose-h2:to-fuchsia-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-rose-400 prose-strong:text-white prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-rose-500/50 prose-blockquote:bg-rose-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-rose-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-rose-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-fuchsia-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-fuchsia-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-rose-500/50 bg-rose-500/10 px-6 py-4 rounded-r-lg my-8 text-white/70">{children}</blockquote>,
        img: ({ ...props }) => (
          <MarkdownImage {...props} />
        ),
      }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

async function RelatedCaseStudies({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("portfolio", 1, 3);
  const studies = res.data.filter((p) => p.id !== currentPostId);
  if (!studies.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-400 font-semibold">
          More Work
        </p>
        <h2 className="text-2xl font-bold text-white">Other Case Studies</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <article key={study.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-6 hover:border-rose-500/30 transition-all hover:-translate-y-1">
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-300 group-hover:to-fuchsia-300 transition-all line-clamp-2 mb-2">
              <Link href={`/portfolio/${study.slug}`}>{study.title}</Link>
            </h3>
            {study.excerpt && <p className="text-sm text-white/60 line-clamp-2">{study.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-10">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <CaseStudyHeader post={post} />
          {post.content && (
            <article className="mt-12">
              <PostContent content={post.content} />
            </article>
          )}
        </div>
        <RelatedCaseStudies currentPostId={post.id} />
      </div>
    </section>
  );
}
