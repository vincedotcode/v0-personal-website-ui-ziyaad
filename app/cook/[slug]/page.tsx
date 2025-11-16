import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, ChefHat, Clock, Users } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM posts WHERE section = 'cook' AND status = 'published'`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${params.slug} AND section = 'cook' AND status = 'published'
    LIMIT 1
  `
  
  const recipe = result[0]

  if (!recipe) {
    notFound()
  }

  const meta = recipe.meta || {}

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cook">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Link>
          </Button>

          {recipe.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <Badge>{recipe.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {meta.prepTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {meta.prepTime}
                </div>
              )}
              {meta.servings && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {meta.servings} servings
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(recipe.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: recipe.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
