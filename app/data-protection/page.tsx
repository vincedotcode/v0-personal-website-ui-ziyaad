"use client"

import { useState, useEffect } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, FileText, Mail, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getDataProtectionArticles } from "@/lib/strapi"
import type { DataProtectionArticle } from "@/types/strapi"

const iconMap: Record<string, any> = {
  shield: Shield,
  lock: Lock,
  eye: Eye,
  database: Database,
  fileText: FileText,
  mail: Mail,
}

export default function DataProtectionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [articles, setArticles] = useState<DataProtectionArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      const data = await getDataProtectionArticles() as DataProtectionArticle[]
      setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            <Badge>Data Protection</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Your Privacy, Our Priority
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We take data protection seriously and are committed to keeping your information
              safe and secure.
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

          {/* Main Content */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found. Connect your Strapi CMS to display content.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => {
                const IconComponent = article.icon ? iconMap[article.icon] || Shield : Shield
                return (
                  <Link key={article.id} href={`/data-protection/${article.slug}`}>
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-balance">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="leading-relaxed">
                          {article.description}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-4">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
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
