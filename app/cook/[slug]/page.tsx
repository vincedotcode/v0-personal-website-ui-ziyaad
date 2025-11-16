import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, ChefHat, Clock, Users, Utensils } from 'lucide-react'
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

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND section = 'cook' AND status = 'published'
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

          <div className="space-y-6">
            {recipe.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                <Badge variant="default">{recipe.category}</Badge>
                {meta.difficulty && <Badge variant="secondary">{meta.difficulty}</Badge>}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                {recipe.title}
              </h1>
              
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {meta.prepTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{meta.prepTime}</div>
                      <div className="text-muted-foreground">Prep</div>
                    </div>
                  </div>
                )}
                {meta.cookTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{meta.cookTime}</div>
                      <div className="text-muted-foreground">Cook</div>
                    </div>
                  </div>
                )}
                {meta.servings && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{meta.servings}</div>
                      <div className="text-muted-foreground">Servings</div>
                    </div>
                  </div>
                )}
                {meta.calories && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="font-medium">{meta.calories} cal</div>
                    <div className="text-muted-foreground">Per serving</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {meta.ingredients && Array.isArray(meta.ingredients) && meta.ingredients.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meta.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: recipe.content }} />
            </CardContent>
          </Card>

          {meta.tips && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Chef's Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{meta.tips}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </article>
    </div>
  )
}
