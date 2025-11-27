// app/books/[slug]/page.tsx

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
  if (!post) return { title: "Book Review | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "A book review by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BookHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <header className="space-y-8 mb-12">
      <Link href="/books" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Books
      </Link>

      <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 items-start">
        {/* Book Cover */}
        {mediaUrl && (
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-indigo-600/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group-hover:border-indigo-500/30 transition-all">
              <Image
                src={mediaUrl}
                alt={post.featuredImage?.alternativeText || post.title}
                width={400}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Book Info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-semibold">
                Book Review
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1]">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-lg text-white/60 font-light">
                {post.subtitle}
              </p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Published</p>
              <p className="text-sm font-semibold text-white">{formatDate(post.publishedAt)}</p>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Reading Time</p>
              <p className="text-sm font-semibold text-white">{post.readingTimeMinutes} minutes</p>
            </div>
          </div>

          {/* Key Takeaways Preview */}
          {post.excerpt && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 space-y-2">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Overview</p>
              <p className="text-sm text-white/80 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-indigo-300 prose-h2:to-purple-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-indigo-400 prose-strong:text-white prose-strong:font-semibold prose-em:text-white/90 prose-em:italic prose-blockquote:border-l-4 prose-blockquote:border-indigo-500/50 prose-blockquote:bg-indigo-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-indigo-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-indigo-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-purple-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500/50 bg-indigo-500/10 px-6 py-4 rounded-r-lg my-8 text-white/70">{children}</blockquote>,
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

async function RelatedBooks({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("books", 1, 3);
  const books = res.data.filter((p) => p.id !== currentPostId);
  if (!books.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold">
          Explore More
        </p>
        <h2 className="text-2xl font-bold text-white">More Book Reviews</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article key={book.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-6 hover:border-indigo-500/30 transition-all hover:-translate-y-1">
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all line-clamp-2 mb-2">
              <Link href={`/books/${book.slug}`}>{book.title}</Link>
            </h3>
            {book.excerpt && <p className="text-sm text-white/60 line-clamp-2">{book.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function BookPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-10">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <BookHeader post={post} />
          {post.content && (
            <article className="mt-12">
              <PostContent content={post.content} />
            </article>
          )}
        </div>
        <RelatedBooks currentPostId={post.id} />
      </div>
    </section>
  );
}
