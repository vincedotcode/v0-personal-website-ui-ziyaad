"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat, Clock, Users } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Cook - Zi's Portfolio",
  description: "Recipes and cooking adventures.",
}

export const revalidate = 60

export default async function CookPage() {
  const recipes = await sql`
    SELECT * FROM posts 
    WHERE section = 'cook'::post_section
      AND status = 'published'
    ORDER BY COALESCE(published_at, created_at) DESC
  `

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Cook</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Cook"
                words={["Delicious Meals", "Tasty Treats", "Culinary Magic", "Food Adventures"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover my favorite recipes, cooking tips, and culinary adventures from around the world.
            </p>
          </div>

          {/* Recipes Grid */}
          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => {
                const prepTime = recipe.meta?.prep_time
                const servings = recipe.meta?.servings
                const difficulty = recipe.meta?.difficulty
                
                return (
                  <Link key={recipe.id} href={`/cook/${recipe.slug}`}>
                    <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{recipe.category || 'Recipe'}</Badge>
                          {difficulty && (
                            <Badge variant="outline">{difficulty}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-balance">{recipe.title}</CardTitle>
                        <CardDescription className="leading-relaxed">
                          {recipe.excerpt || recipe.content.substring(0, 100) + '...'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {prepTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {prepTime}
                            </div>
                          )}
                          {servings && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {servings} servings
                            </div>
                          )}
                        </div>
                        <Button className="w-full">
                          <ChefHat className="mr-2 h-4 w-4" />
                          View Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
