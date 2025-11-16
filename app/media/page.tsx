import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Play } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import sql from "@/lib/db"

export const metadata = {
  title: "Media - Zi's Portfolio",
  description: "Video tutorials and technical content.",
}

export const revalidate = 60

export default async function MediaPage() {
  const videos = await sql`
    SELECT * FROM posts 
    WHERE section = 'media'::post_section
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

          {/* Videos Grid */}
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => {
                const duration = video.meta?.duration
                const views = video.meta?.views
                
                return (
                  <Card key={video.id} className="transition-all hover:shadow-lg hover:border-primary/20">
                    <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                      {video.cover_image && (
                        <img src={video.cover_image || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                          <Play className="h-8 w-8 ml-1" />
                        </div>
                      </div>
                      {duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                          {duration}
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{video.category || 'Video'}</Badge>
                        {views && (
                          <span className="text-xs text-muted-foreground">{views} views</span>
                        )}
                      </div>
                      <CardTitle className="text-balance line-clamp-2">{video.title}</CardTitle>
                      <CardDescription className="line-clamp-2 leading-relaxed">
                        {video.excerpt || video.content.substring(0, 100) + '...'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Watch Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
