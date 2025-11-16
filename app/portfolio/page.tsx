"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search } from 'lucide-react'
import Image from "next/image"

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with payment processing, inventory management, and admin dashboard built with Next.js and Stripe.",
    image: "/modern-ecommerce-interface.png",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team features, and project tracking capabilities.",
    image: "/task-management-dashboard.png",
    category: "Web App",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Template",
    description: "Modern, customizable portfolio template for developers and designers with dark mode and animations.",
    image: "/portfolio-website-design.png",
    category: "Design",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with forecast data, interactive maps, and beautiful data visualizations.",
    image: "/weather-dashboard-interface.png",
    category: "Web App",
    tags: ["React", "TypeScript", "Weather API", "Charts"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Analytics platform for social media metrics with comprehensive data visualization and automated reporting.",
    image: "/analytics-dashboard.png",
    category: "Data Visualization",
    tags: ["Next.js", "Python", "PostgreSQL", "D3.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Recipe Sharing Platform",
    description: "Community-driven recipe sharing platform with advanced search, filters, user ratings, and meal planning features.",
    image: "/recipe-website-interface.jpg",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "Fitness Tracker",
    description: "Comprehensive fitness tracking application with workout logging, progress charts, and personalized recommendations.",
    image: "/fitness-app-interface.png",
    category: "Mobile App",
    tags: ["React Native", "Firebase", "Redux"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "Blog Platform",
    description: "Feature-rich blogging platform with markdown support, SEO optimization, and content management system.",
    image: "/blog-website-design.png",
    category: "Web Development",
    tags: ["Next.js", "MDX", "Contentful", "Vercel"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 9,
    title: "Real Estate Listing",
    description: "Modern real estate listing platform with property search, virtual tours, and agent management features.",
    image: "/real-estate-website-hero.png",
    category: "Web Development",
    tags: ["Next.js", "Maps API", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
  },
]

const categories = ["All", "Web Development", "Web App", "Design", "Data Visualization", "Mobile App"]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Portfolio</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              My Work
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A showcase of projects I've built, from web applications to design work.
              Each project demonstrates my skills and passion for creating quality software.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
          </div>

          {/* Portfolio Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="line-clamp-1 text-balance">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" asChild className="flex-1">
                        <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
