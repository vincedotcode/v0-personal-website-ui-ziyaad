"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChefHat, Clock, Users, Search } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"

const recipes = [
  {
    title: "Homemade Pasta Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    prepTime: "15 min",
    servings: 4,
    difficulty: "Medium",
    category: "Italian",
  },
  {
    title: "Thai Green Curry",
    description: "Aromatic and spicy curry with coconut milk and fresh vegetables",
    prepTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    category: "Thai",
  },
  {
    title: "Perfect Chocolate Chip Cookies",
    description: "Soft, chewy cookies with melted chocolate chips",
    prepTime: "20 min",
    servings: 24,
    difficulty: "Easy",
    category: "Dessert",
  },
  {
    title: "Grilled Salmon with Lemon",
    description: "Healthy and flavorful grilled salmon with herbs and citrus",
    prepTime: "25 min",
    servings: 2,
    difficulty: "Easy",
    category: "Seafood",
  },
  {
    title: "Vegetable Stir Fry",
    description: "Quick and colorful stir fry with mixed vegetables and soy sauce",
    prepTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    category: "Asian",
  },
  {
    title: "French Onion Soup",
    description: "Rich and comforting soup with caramelized onions and gruyere cheese",
    prepTime: "45 min",
    servings: 6,
    difficulty: "Hard",
    category: "French",
  },
]

export default function CookPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe, index) => (
              <Link key={index} href={`/cook/${recipe.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{recipe.category}</Badge>
                      <Badge variant="outline">{recipe.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-balance">{recipe.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {recipe.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {recipe.servings} servings
                      </div>
                    </div>
                    <Button className="w-full">
                      <ChefHat className="mr-2 h-4 w-4" />
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
