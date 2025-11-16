"use client"

import { useState, useEffect } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight, Search } from 'lucide-react'
import Link from "next/link"
import Orb from "@/components/ui/orb"
import { getArticles } from "@/lib/strapi"
import type { Article } from "@/types/strapi"

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      const data = await getArticles() as Article[]
      setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Orb
          hoverIntensity={0.3}
          rotateOnHover={true}
          hue={200}
          forceHoverState={false}
        />
      </div>
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <Badge>Articles</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              In-Depth Articles
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Detailed articles and tutorials about web development, design, and technology.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found. Connect your Strapi CMS to display content.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer bg-background/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-balance">{article.title}</CardTitle>
                      <CardDescription className="leading-relaxed">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
