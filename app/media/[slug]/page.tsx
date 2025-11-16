import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Video, User } from 'lucide-react'
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

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/media">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Media
            </Link>
          </Button>

          {media.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={media.image || "/placeholder.svg"}
                alt={media.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <Badge>{media.category}</Badge>
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
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(media.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: media.content }} />
            </CardContent>
          </Card>

          {meta.videoUrl && (
            <Card>
              <CardContent className="aspect-video pt-6">
                <iframe
                  src={meta.videoUrl}
                  title={media.title}
                  className="h-full w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          )}
        </div>
      </article>
    </div>
  )
}
