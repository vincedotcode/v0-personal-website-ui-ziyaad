import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM blog_posts WHERE published = true`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await sql`
    SELECT * FROM blog_posts 
    WHERE slug = ${params.slug} AND published = true 
    LIMIT 1
  `
  
  const post = result[0]

  if (!post) {
    notFound()
  }

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <article className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <Badge>{post.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
