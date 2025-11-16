"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Search } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    review: "A must-read for any software developer. Teaches fundamental principles for writing maintainable code.",
    category: "Programming",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    rating: 5,
    review: "Timeless advice and practical tips that every programmer should know.",
    category: "Software Engineering",
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    rating: 4,
    review: "Essential reference for understanding software design patterns and when to apply them.",
    category: "Software Design",
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 5,
    review: "Brilliant insights on web usability and user experience design.",
    category: "UX/UI",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    review: "Transformative book on building good habits and breaking bad ones.",
    category: "Personal Development",
  },
  {
    title: "The DevOps Handbook",
    author: "Gene Kim et al.",
    rating: 4,
    review: "Comprehensive guide to DevOps principles and practices.",
    category: "DevOps",
  },
]

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Books</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Books that"
                words={["Inspire", "Teach", "Transform", "Challenge"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              My curated collection of books that have shaped my thinking about software, design, and life.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book, index) => (
              <Link key={index} href={`/books/${book.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{book.category}</Badge>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: book.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-balance">{book.title}</CardTitle>
                    <CardDescription>by {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {book.review}
                    </p>
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
