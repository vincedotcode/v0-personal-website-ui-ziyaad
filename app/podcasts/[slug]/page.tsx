import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Mic, Clock, User } from 'lucide-react'
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

export default async function PodcastDetailPage({ params }: { params: { slug: string } }) {
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${params.slug} AND section = 'podcasts' AND status = 'published'
    LIMIT 1
  `
  
  const podcast = result[0]

  if (!podcast) {
    notFound()
  }

  const meta = podcast.meta || {}

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

          {podcast.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={podcast.image || "/placeholder.svg"}
                alt={podcast.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <Badge>{podcast.category}</Badge>
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
                {new Date(podcast.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: podcast.content }} />
            </CardContent>
          </Card>

          {meta.audioUrl && (
            <Card>
              <CardContent className="pt-6">
                <audio controls className="w-full">
                  <source src={meta.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
          )}
        </div>
      </article>
    </div>
  )
}
