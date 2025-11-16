import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Mic, Clock, User, Play } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM posts WHERE section = 'podcasts' AND status = 'published'`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PodcastDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND section = 'podcasts' AND status = 'published'
    LIMIT 1
  `
  
  const podcast = result[0]

  if (!podcast) {
    notFound()
  }

  const meta = podcast.meta || {}

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  const youtubeEmbedUrl = meta.youtubeUrl ? getYouTubeEmbedUrl(meta.youtubeUrl) : null

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/podcasts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Podcasts
            </Link>
          </Button>

          {youtubeEmbedUrl && (
            <Card className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={podcast.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mic className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">{podcast.category}</Badge>
                  {meta.season && <Badge variant="secondary">Season {meta.season}</Badge>}
                  {meta.episode && <Badge variant="outline">Episode {meta.episode}</Badge>}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                  {podcast.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {podcast.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {podcast.author}
                    </div>
                  )}
                  {meta.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {meta.duration}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(podcast.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Episode Description */}
            <Card>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
                <div dangerouslySetInnerHTML={{ __html: podcast.content }} />
              </CardContent>
            </Card>

            {meta.audioUrl && (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Play className="h-4 w-4" />
                    Audio Version
                  </div>
                  <audio controls className="w-full">
                    <source src={meta.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </CardContent>
              </Card>
            )}

            {/* Show Notes */}
            {meta.showNotes && (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <h3 className="text-lg font-semibold">Show Notes</h3>
                  <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: meta.showNotes }} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
