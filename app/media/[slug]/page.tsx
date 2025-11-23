// app/media/[slug]/page.tsx

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
  if (!post) return { title: "Media | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "Media by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MediaHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);

  return (
    <header className="space-y-8 mb-16">
      <Link href="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Gallery
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-300">{post.format ? post.format.charAt(0).toUpperCase() + post.format.slice(1) : "Media"}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl leading-relaxed font-light">
              {post.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-4 pb-6 border-b border-white/10">
          <span className="text-sm text-white/60">{formatDate(post.publishedAt)}</span>
          {post.format === "video" && (
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs text-amber-300 font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Video
            </span>
          )}
        </div>
      </div>

      {mediaUrl && (
        <div className="mt-10 group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black/40">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-3xl group-hover:border-white/20 transition-all duration-300">
            <Image
              src={mediaUrl}
              alt={post.featuredImage?.alternativeText || post.title}
              width={1400}
              height={800}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Download Button Overlay */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold flex items-center gap-2 shadow-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-black prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-amber-300 prose-h2:to-orange-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-amber-400 prose-strong:text-white prose-strong:font-bold prose-blockquote:border-l-4 prose-blockquote:border-amber-500/50 prose-blockquote:bg-amber-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-amber-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:overflow-x-auto prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-amber-400 prose-a:no-underline prose-a:font-semibold hover:prose-a:text-orange-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-black mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-amber-500/50 bg-amber-500/10 px-6 py-4 rounded-r-2xl my-8 text-white/70">{children}</blockquote>,
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

function MetadataSection({ post }: { post: StrapiPost }) {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Date</p>
        <p className="text-sm font-semibold text-white">{formatDate(post.publishedAt)}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Type</p>
        <p className="text-sm font-semibold text-white capitalize">{post.format || "Media"}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Format</p>
        <p className="text-sm font-semibold text-white">{post.format === "video" ? "4K Video" : "High Res Photo"}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Resolution</p>
        <p className="text-sm font-semibold text-white">{post.featuredImage?.width}x{post.featuredImage?.height}</p>
      </div>
    </div>
  );
}

function ShareBox() {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 backdrop-blur-xl space-y-6">
      <h3 className="text-xl font-black text-white">Share This Media</h3>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: "f", label: "Facebook" },
          { icon: "𝕏", label: "Twitter" },
          { icon: "in", label: "LinkedIn" },
          { icon: "📋", label: "Copy Link" },
        ].map((social) => (
          <button
            key={social.label}
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 hover:border-amber-500/40 text-white font-medium transition-all text-sm"
          >
            {social.label}
          </button>
        ))}
      </div>
    </div>
  );
}

async function RelatedMedia({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("media", 1, 8);
  const media = res.data.filter((p) => p.id !== currentPostId).slice(0, 4);
  if (!media.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-black">
          Explore More
        </p>
        <h2 className="text-3xl font-black text-white">More from Gallery</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {media.map((item) => {
          const itemMediaUrl = getMediaUrl(item.featuredImage);
          return (
            <Link
              key={item.id}
              href={`/media/${item.slug}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-amber-500/30 transition-all hover:-translate-y-1"
            >
              {itemMediaUrl && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={itemMediaUrl}
                    alt={item.featuredImage?.alternativeText || item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-300 transition-all line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white/50">{formatDate(item.publishedAt)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function LightboxInfo() {
  return (
    <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-bold text-white">About This Image</h3>
      </div>
      <ul className="space-y-2 text-sm text-white/70">
        <li className="flex items-start gap-3">
          <span className="text-amber-400 mt-1">•</span>
          <span>High-resolution media available for download</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-amber-400 mt-1">•</span>
          <span>Perfect for presentations, articles, and publications</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-amber-400 mt-1">•</span>
          <span>All media is available for non-commercial use</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-amber-400 mt-1">•</span>
          <span>Credit attribution appreciated but not required</span>
        </li>
      </ul>
    </div>
  );
}

export default async function MediaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 space-y-12">
        <div className="bg-gradient-to-b from-white/5 via-white/2 to-transparent border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <MediaHeader post={post} />

          <MetadataSection post={post} />

          {post.content && (
            <article className="mt-16 space-y-8">
              <div className="space-y-4 pb-8 border-b border-white/10">
                <h2 className="text-3xl font-black text-white">Details</h2>
              </div>
              <PostContent content={post.content} />
            </article>
          )}

          <LightboxInfo />
          <ShareBox />
        </div>

        <RelatedMedia currentPostId={post.id} />
      </div>
    </section>
  );
}