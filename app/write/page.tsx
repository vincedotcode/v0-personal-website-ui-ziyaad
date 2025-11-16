"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Tag } from 'lucide-react'
import Link from "next/link"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"

const posts = [
  {
    title: "Building Scalable Web Applications",
    excerpt: "Learn the principles and practices for building web applications that can handle millions of users.",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Web Development", "Architecture", "Scalability"],
  },
  {
    title: "The Art of Clean Code",
    excerpt: "Discover techniques for writing maintainable, readable, and elegant code that your team will love.",
    date: "2025-01-10",
    readTime: "6 min read",
    tags: ["Best Practices", "Code Quality"],
  },
  {
    title: "Introduction to React Server Components",
    excerpt: "A deep dive into React Server Components and how they're changing the way we build React applications.",
    date: "2025-01-05",
    readTime: "10 min read",
    tags: ["React", "Next.js", "Performance"],
  },
  {
    title: "Designing for Accessibility",
    excerpt: "Essential guidelines for creating inclusive web experiences that work for everyone.",
    date: "2024-12-28",
    readTime: "7 min read",
    tags: ["Design", "Accessibility", "UX"],
  },
  {
    title: "Mastering TypeScript",
    excerpt: "Advanced TypeScript patterns and techniques to write type-safe and maintainable code.",
    date: "2024-12-20",
    readTime: "12 min read",
    tags: ["TypeScript", "Best Practices"],
  },
  {
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
    date: "2024-12-15",
    readTime: "9 min read",
    tags: ["Trends", "Future", "Web Development"],
  },
]

export default function WritePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Write</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Writing about"
                words={["Code", "Design", "Technology", "Innovation"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thoughts, tutorials, and insights about web development, design, and technology.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Link key={index} href={`/write/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <CardTitle className="text-balance">{post.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
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
