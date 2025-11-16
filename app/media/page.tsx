"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Play, Clock, Search } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"

const videos = [
  {
    title: "Building a Modern Dashboard with Next.js",
    description: "Step-by-step tutorial on creating a beautiful and functional dashboard application.",
    duration: "28:45",
    category: "Tutorial",
    views: "12.5K",
  },
  {
    title: "Mastering Tailwind CSS",
    description: "Learn advanced Tailwind CSS techniques and best practices for styling applications.",
    duration: "35:20",
    category: "Tutorial",
    views: "18.2K",
  },
  {
    title: "React Performance Optimization",
    description: "Techniques for optimizing React applications and improving rendering performance.",
    duration: "24:15",
    category: "Performance",
    views: "9.8K",
  },
  {
    title: "Introduction to Server Actions",
    description: "Understanding and implementing server actions in Next.js applications.",
    duration: "19:30",
    category: "Next.js",
    views: "15.6K",
  },
  {
    title: "Building Responsive Layouts",
    description: "Creating responsive designs that work seamlessly across all device sizes.",
    duration: "31:10",
    category: "CSS",
    views: "11.3K",
  },
  {
    title: "TypeScript Tips and Tricks",
    description: "Advanced TypeScript patterns and techniques for better type safety.",
    duration: "26:55",
    category: "TypeScript",
    views: "14.1K",
  },
]

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Media</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Watch"
                words={["Tutorials", "Walkthroughs", "Tech Reviews", "Live Coding"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Video tutorials, live coding sessions, and technical content to help you level up your skills.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <span className="text-xs text-muted-foreground">{video.views} views</span>
                  </div>
                  <CardTitle className="text-balance line-clamp-2">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-2 leading-relaxed">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
