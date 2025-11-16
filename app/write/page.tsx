import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Tag } from 'lucide-react'
import Link from "next/link"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import sql from "@/lib/db"

export const metadata = {
  title: "Write - Zi's Portfolio",
  description: "Writing about code, design, and technology.",
}

export const revalidate = 60

export default async function WritePage() {
  const posts = await sql`
    SELECT * FROM posts 
    WHERE section = 'write'::post_section
      AND status = 'published'
    ORDER BY COALESCE(published_at, created_at) DESC
  `

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

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const readTime = post.meta?.read_time
                
                return (
                  <Link key={post.id} href={`/write/${post.slug}`}>
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {readTime && (
                            <>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              {readTime}
                            </>
                          )}
                        </div>
                        <CardTitle className="text-balance">{post.title}</CardTitle>
                        <CardDescription className="leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                <Tag className="mr-1 h-3 w-3" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
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
