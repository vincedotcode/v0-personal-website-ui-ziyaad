
// app/podcasts/[slug]/page.tsx
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
  if (!post) return { title: "Podcast | Zi" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "A podcast episode by Zi.",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PodcastHeader({ post }: { post: StrapiPost }) {
  const mediaUrl = getMediaUrl(post.featuredImage);
  const duration = post.durationSeconds ? Math.round(parseInt(post.durationSeconds) / 60) : 0;

  return (
    <header className="space-y-10 mb-16">
      <Link href="/podcasts" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to All Episodes
      </Link>

      <div className="grid lg:grid-cols-[1.3fr,1fr] gap-12 items-start">
        {/* Album Art with Player */}
        {mediaUrl && (
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-br from-violet-600/30 via-pink-600/30 to-violet-600/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl group-hover:border-white/20 transition-all">
              <Image
                src={mediaUrl}
                alt={post.featuredImage?.alternativeText || post.title}
                width={600}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Large Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episode Details */}
        <div className="space-y-8 flex flex-col justify-between h-full">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30">
                <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-semibold text-violet-300">Episode</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                {post.title}
              </h1>

              {post.subtitle && (
                <p className="text-lg text-white/60 font-light">
                  {post.subtitle}
                </p>
              )}
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-2">Published</p>
                <p className="text-sm font-semibold text-white">{formatDate(post.publishedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-2">Duration</p>
                <p className="text-sm font-semibold text-white">{duration}m</p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-2">Format</p>
                <p className="text-sm font-semibold text-white capitalize">{post.format || "Audio"}</p>
              </div>
            </div>

            {/* Episode Summary */}
            {post.excerpt && (
              <div className="bg-gradient-to-br from-violet-500/15 to-pink-500/15 border border-violet-500/40 rounded-2xl p-6 space-y-3">
                <p className="text-xs font-black text-violet-300 uppercase tracking-widest">Episode Summary</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:scale-105 group">
              <svg className="w-6 h-6 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Episode
            </button>
            <button className="w-full py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-lg prose-headings:font-black prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-violet-300 prose-h2:to-pink-300 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-p:text-base prose-p:leading-8 prose-p:text-white/80 prose-p:my-6 prose-li:text-white/80 prose-li:my-2 prose-li:marker:text-violet-400 prose-strong:text-white prose-strong:font-bold prose-blockquote:border-l-4 prose-blockquote:border-violet-500/50 prose-blockquote:bg-violet-500/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:text-white/70 prose-blockquote:my-8 prose-code:bg-white/10 prose-code:text-violet-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:overflow-x-auto prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg prose-img:my-8 prose-a:text-violet-400 prose-a:no-underline prose-a:font-semibold hover:prose-a:text-pink-400 prose-a:transition-colors">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ children }) => <h2 className="text-3xl font-black mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-8 text-white/80 my-6">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 my-6 text-white/80">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 my-6 text-white/80">{children}</ol>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-violet-500/50 bg-violet-500/10 px-6 py-4 rounded-r-2xl my-8 text-white/70">{children}</blockquote>,
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

function TranscriptSection() {
  return (
    <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-bold text-white">Full Transcript</h3>
      </div>
      <p className="text-sm text-white/70">
        Read the complete transcript of this episode. Perfect for searching specific topics or revisiting key points.
      </p>
      <button className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 text-white font-medium transition-all text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4" />
        </svg>
        View Transcript
      </button>
    </div>
  );
}

function GuestCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-xs text-white/60">{role}</p>
      </div>
    </div>
  );
}

async function RelatedEpisodes({ currentPostId }: { currentPostId: number }) {
  const res = await getPostsByTag("podcasts", 1, 4);
  const episodes = res.data.filter((p) => p.id !== currentPostId);
  if (!episodes.length) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-black">
          More Episodes
        </p>
        <h2 className="text-3xl font-black text-white">Keep Listening</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {episodes.map((episode) => {
          const episodeMediaUrl = getMediaUrl(episode.featuredImage);
          const episodeDuration = episode.durationSeconds ? Math.round(parseInt(episode.durationSeconds) / 60) : 0;

          return (
            <Link
              key={episode.id}
              href={`/podcasts/${episode.slug}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl hover:border-violet-500/30 transition-all hover:-translate-y-1"
            >
              <div className="flex gap-4 p-4">
                {episodeMediaUrl && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={episodeMediaUrl}
                      alt={episode.featuredImage?.alternativeText || episode.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all line-clamp-2">
                    {episode.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    {episodeDuration > 0 && (
                      <>
                        <span>{episodeDuration}m</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{formatDate(episode.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SubscribeBox() {
  return (
    <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-pink-500/10 p-8 backdrop-blur-xl space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white">Never Miss an Episode</h3>
        <p className="text-white/70">Subscribe to get notified when new episodes drop.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/15 transition-all"
        />
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-semibold transition-all whitespace-nowrap">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-white/50">We'll never spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default async function PodcastPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-12">
        <div className="bg-gradient-to-b from-white/5 via-white/2 to-transparent border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-lg shadow-2xl">
          <PodcastHeader post={post} />

          {post.content && (
            <article className="mt-16 space-y-8">
              <div className="space-y-4 pb-8 border-b border-white/10">
                <h2 className="text-3xl font-black text-white">About This Episode</h2>
              </div>
              <PostContent content={post.content} />
              <TranscriptSection />
            </article>
          )}

          {/* Guest Section - You can customize this with actual guest data */}
          <div className="mt-16 space-y-6 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-black text-white">Guest</h3>
            <GuestCard name="Guest Name" role="Your Guest's Title/Role" />
          </div>

          <SubscribeBox />
        </div>

        <RelatedEpisodes currentPostId={post.id} />
      </div>
    </section>
  );
}