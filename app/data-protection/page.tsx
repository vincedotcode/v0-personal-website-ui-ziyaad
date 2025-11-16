"use client"

import { useState, useEffect } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, FileText, Mail } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Data Protection - Zi's Portfolio",
  description: "Privacy and data protection information.",
}

export const revalidate = 60

const iconMap: Record<string, any> = {
  shield: Shield,
  lock: Lock,
  eye: Eye,
  database: Database,
  fileText: FileText,
  mail: Mail,
}

export default async function DataProtectionPage() {
  const articles = await sql`
    SELECT * FROM data_protection_articles 
    WHERE published = true 
    ORDER BY created_at DESC
  `

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

          {/* Main Content */}
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const IconComponent = Shield
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
                        <CardDescription className="leading-relaxed line-clamp-3">
                          {article.content.substring(0, 150)}...
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-4">
                          {new Date(article.created_at).toLocaleDateString()}
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
