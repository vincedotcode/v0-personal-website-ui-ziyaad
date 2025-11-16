import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import Link from "next/link"
import { getArticle, getArticles } from "@/lib/strapi"
import type { Article } from "@/types/strapi"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const articles = await getArticles() as Article[]
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug) as Article | null

  if (!article) {
    notFound()
  }

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <article className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          <Link href="/articles">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>

          <div className="space-y-4">
            <Badge>{article.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </div>

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
