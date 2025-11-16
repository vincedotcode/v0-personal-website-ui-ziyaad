"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Clock, Play, Search } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"

const podcasts = [
  {
    title: "Building the Future",
    episode: "The Rise of AI in Web Development",
    duration: "45 min",
    date: "2025-01-12",
    description: "Exploring how AI is transforming the way we build and design web applications.",
  },
  {
    title: "Developer Stories",
    episode: "From Bootcamp to Senior Engineer",
    duration: "38 min",
    date: "2025-01-08",
    description: "An inspiring journey of continuous learning and career growth in tech.",
  },
  {
    title: "Design Matters",
    episode: "Creating Inclusive User Experiences",
    duration: "42 min",
    date: "2025-01-05",
    description: "Best practices for designing accessible and inclusive digital products.",
  },
  {
    title: "Tech Talk Weekly",
    episode: "Next.js 16: What's New",
    duration: "30 min",
    date: "2024-12-30",
    description: "Deep dive into the latest features and improvements in Next.js 16.",
  },
  {
    title: "The Startup Show",
    episode: "Building a SaaS from Scratch",
    duration: "52 min",
    date: "2024-12-25",
    description: "Lessons learned from launching and growing a successful SaaS business.",
  },
  {
    title: "Code & Coffee",
    episode: "Modern CSS Techniques",
    duration: "35 min",
    date: "2024-12-20",
    description: "Exploring modern CSS features and how to use them effectively.",
  },
]

export default function PodcastsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.episode.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search podcasts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Podcasts Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPodcasts.map((podcast, index) => (
              <Link key={index} href={`/podcasts/${podcast.title.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`}>
                <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Mic className="h-4 w-4" />
                      {podcast.title}
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      {podcast.duration}
                    </div>
                    <CardTitle className="text-balance">{podcast.episode}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {podcast.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(podcast.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Listen
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
