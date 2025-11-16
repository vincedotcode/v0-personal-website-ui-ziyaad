import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Book, Video, FileText, Code } from 'lucide-react'
import sql from "@/lib/db"

export const metadata = {
  title: "Resources - Zi's Portfolio",
  description: "Useful tools, links, and resources for web developers.",
}

export const revalidate = 60

const iconMap: Record<string, any> = {
  book: Book,
  video: Video,
  fileText: FileText,
  code: Code,
}

export default async function ResourcesPage() {
  const resources = await sql`
    SELECT * FROM posts 
    WHERE section = 'resources'::post_section
      AND status = 'published'
    ORDER BY category, COALESCE(published_at, created_at) DESC
  `

  // Group resources by category
  const groupedResources = resources.reduce((acc: Record<string, any[]>, resource: any) => {
    const category = resource.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(resource)
    return acc
  }, {})

  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Resources</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Useful Resources
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A curated collection of tools, tutorials, and resources that I find valuable
              for web development.
            </p>
          </div>

          {/* Resources Grid */}
          {Object.keys(groupedResources).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {Object.entries(groupedResources).map(([category, items]) => {
                const iconName = items[0]?.meta?.icon || 'book'
                const IconComponent = iconMap[iconName] || Book
                
                return (
                  <Card key={category}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <CardTitle>{category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {items.map((resource) => {
                          const url = resource.meta?.url || '#'
                          
                          return (
                            <a
                              key={resource.id}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 rounded-lg border border-border transition-all hover:border-primary/20 hover:bg-accent"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="font-medium">{resource.title}</div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {resource.excerpt || resource.content.substring(0, 80) + '...'}
                                  </p>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              </div>
                            </a>
                          )
                        })}
                      </div>
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
