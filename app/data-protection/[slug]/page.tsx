import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Shield } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM posts WHERE section = 'dataprotection' AND status = 'published'`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function DataProtectionArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND section = 'dataprotection' AND status = 'published'
    LIMIT 1
  `
  
  const article = result[0]

  if (!article) {
    notFound()
  }

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/data-protection">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Data Protection
            </Link>
          </Button>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <Badge>Data Protection</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(article.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
