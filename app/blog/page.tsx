import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Blog - Zi's Portfolio",
  description: "Articles, tutorials, and thoughts on web development.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const blogPosts = await sql`
    SELECT * FROM blog_posts 
    WHERE published = true 
    ORDER BY created_at DESC
  `

  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <Badge>Blog</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Articles & Insights
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sharing knowledge, tutorials, and thoughts on web development, design, and technology.
            </p>
          </div>

          {/* Blog Posts Grid */}
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {post.category}
                      </Badge>
                      <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            By {post.author}
                          </div>
                        )}
                      </div>
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
