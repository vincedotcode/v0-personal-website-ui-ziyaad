"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Clock, Play } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Podcasts - Zi's Portfolio",
  description: "Listen to tech talks and conversations.",
}

export const revalidate = 60

export default async function PodcastsPage() {
  const podcasts = await sql`
    SELECT * FROM posts 
    WHERE section = 'podcasts'::post_section
      AND status = 'published'
    ORDER BY COALESCE(published_at, created_at) DESC
  `

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Podcasts</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Listen to"
                words={["Tech Talks", "Dev Stories", "Design Insights", "Innovations"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conversations about technology, development, design, and the future of the web.
            </p>
          </div>

          {/* Podcasts Grid */}
          {podcasts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No podcasts found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {podcasts.map((podcast) => {
                const episode = podcast.meta?.episode
                const duration = podcast.meta?.duration
                
                return (
                  <Link key={podcast.id} href={`/podcasts/${podcast.slug}`}>
                    <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Mic className="h-4 w-4" />
                          {podcast.category || 'Podcast'}
                          {duration && (
                            <>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              {duration}
                            </>
                          )}
                        </div>
                        <CardTitle className="text-balance">{episode || podcast.title}</CardTitle>
                        <CardDescription className="leading-relaxed">
                          {podcast.excerpt || podcast.content.substring(0, 150) + '...'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(podcast.published_at || podcast.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Listen
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
