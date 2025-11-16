import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Video, User, Clock } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM posts WHERE section = 'media' AND status = 'published'`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function MediaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND section = 'media' AND status = 'published'
    LIMIT 1
  `
  
  const media = result[0]

  if (!media) {
    notFound()
  }

  const meta = media.meta || {}
  
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  const embedUrl = meta.videoUrl ? getYouTubeEmbedUrl(meta.videoUrl) : null

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/media">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Media
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-primary" />
                <Badge variant="default">{media.category}</Badge>
                {meta.type && <Badge variant="secondary">{meta.type}</Badge>}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                {media.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {media.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {media.author}
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
                  {new Date(media.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {embedUrl && (
              <Card className="overflow-hidden border-2 border-primary/20">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={embedUrl}
                      title={media.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fallback Image if no video */}
            {!embedUrl && media.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={media.image || "/placeholder.svg"}
                  alt={media.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
                <div dangerouslySetInnerHTML={{ __html: media.content }} />
              </CardContent>
            </Card>

            {(meta.tags || meta.relatedLinks) && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {meta.tags && Array.isArray(meta.tags) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {meta.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {meta.relatedLinks && Array.isArray(meta.relatedLinks) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Related Links</h3>
                      <ul className="space-y-1">
                        {meta.relatedLinks.map((link: { title: string; url: string }, index: number) => (
                          <li key={index}>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
