// app/dataprotection/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostsByTag, StrapiPost, getMediaUrl } from "@/lib/strapi";


type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Data Protection | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "Data protection & privacy guide by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DocumentMeta({ post }: { post: StrapiPost }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-wider">Published</p>
        <p className="text-sm font-semibold text-white">{formatDate(post.publishedAt)}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-wider">Last Updated</p>
        <p className="text-sm font-semibold text-white">{formatDate(post.updatedAt)}</p>
      </div>
      {post.readingTimeMinutes && (
        <div className="space-y-2">
          <p className="text-xs text-white/50 uppercase tracking-wider">Reading Time</p>
          <p className="text-sm font-semibold text-white">{post.readingTimeMinutes} minutes</p>
        </div>
      )}
    </div>
  );
}

function PostHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);
  return (
    <header className="space-y-8 mb-12">
      <Link href="/dataprotection" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Data Protection
      </Link>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-slate-300 font-semibold">
            Data Protection Document
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

      <DocumentMeta post={post} />

      {mediaUrl && (
        <div className="mt-10 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-slate-600/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

function TableOfContents({ content }: { content: string }) {
  // Extract H2 and H3 headings from markdown
  const headings = content.match(/^#{2,3}\s+.+$/gm) || [];
  
  if (headings.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm mb-8">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Table of Contents
      </h3>
      <div className="space-y-2">
        {headings.map((heading, i) => {
          const level = heading.match(/#/g)?.length || 2;
          const text = heading.replace(/#/g, "").trim();
          return (
            <div key={i} style={{ paddingLeft: `${(level - 2) * 16}px` }} className="text-sm">
              <a href={`#${text.toLowerCase().replace(/\s+/g, "-")}`} className="text-white/70 hover:text-red-300 transition-colors">
                {text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-red-300 prose-h2:to-slate-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-red-400 prose-strong:text-white prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-red-500/50 prose-blockquote:bg-red-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-red-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:overflow-x-auto prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-red-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-slate-300 prose-a:transition-colors prose-table:border prose-table:border-white/10 prose-td:px-4 prose-td:py-3 prose-th:bg-white/5 prose-th:px-4 prose-th:py-3">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => {
          const id = String(children).toLowerCase().replace(/\s+/g, "-");
          return <h2 id={id} className="text-3xl font-bold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-slate-300 scroll-mt-8">{children}</h2>;
        },
        h3: ({ children }) => {
          const id = String(children).toLowerCase().replace(/\s+/g, "-");
          return <h3 id={id} className="text-2xl font-bold mt-8 mb-4 text-white scroll-mt-8">{children}</h3>;
        },
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-red-500/50 bg-red-500/10 px-6 py-4 rounded-r-lg my-8 text-white/70">{children}</blockquote>,
        table: ({ children }) => <table className="w-full border-collapse border border-white/10 my-6">{children}</table>,
        thead: ({ children }) => <thead className="bg-white/5 border-b border-white/10">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-3 text-left text-white font-semibold border border-white/10">{children}</th>,
        td: ({ children }) => <td className="px-4 py-3 text-white/80 border border-white/10">{children}</td>,
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

function ComplianceNote() {
  return (
    <div className="mt-12 rounded-xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-2">Legal Disclaimer</h4>
          <p className="text-sm text-white/70">
            This document is for informational purposes only and does not constitute legal advice. For specific compliance requirements, consult with a legal professional familiar with your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}

async function RelatedDocuments({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("dataprotection", 1, 3);
  const documents = res.data.filter((p) => p.id !== currentPostId);
  if (!documents.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-slate-400 font-semibold">
          Related
        </p>
        <h2 className="text-2xl font-bold text-white">More Guidelines</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <article key={doc.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-300 group-hover:to-slate-300 transition-all line-clamp-2">
                <Link href={`/dataprotection/${doc.slug}`}>{doc.title}</Link>
              </h3>
            </div>
            {doc.excerpt && <p className="text-sm text-white/60 line-clamp-2">{doc.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function DataProtectionPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto max-w-4xl px-4 py-16 space-y-10">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <PostHeader post={post} />
          
          {post.content && (
            <article className="mt-12">
              <TableOfContents content={post.content} />
              <PostContent content={post.content} />
            </article>
          )}
        </div>
        
        <RelatedDocuments currentPostId={post.id} />
      </div>
    </section>
  );
}