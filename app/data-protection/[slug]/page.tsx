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
  const articles = await sql`SELECT slug FROM data_protection_articles WHERE published = true`
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function DataProtectionArticlePage({ params }: { params: { slug: string } }) {
  const result = await sql`
    SELECT * FROM data_protection_articles 
    WHERE slug = ${params.slug} AND published = true 
    LIMIT 1
  `
  
  const article = result[0]

  if (!article) {
    notFound()
  }

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <article className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Back Button */}
          <Link href="/data-protection">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Data Protection
            </Button>
          </Link>

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
