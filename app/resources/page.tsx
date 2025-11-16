import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Book, Video, FileText, Code } from 'lucide-react'

export const metadata = {
  title: "Resources - Zi's Portfolio",
  description: "Useful tools, links, and resources for web developers.",
}

const resourceCategories = [
  {
    icon: Book,
    title: "Learning Resources",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Comprehensive web development documentation" },
      { name: "React Documentation", url: "https://react.dev", description: "Official React documentation and guides" },
      { name: "TypeScript Handbook", url: "https://www.typescriptlang.org", description: "Learn TypeScript from basics to advanced" },
    ],
  },
  {
    icon: Video,
    title: "Video Tutorials",
    resources: [
      { name: "Web Dev Simplified", url: "#", description: "Clear, concise web development tutorials" },
      { name: "Fireship", url: "#", description: "Fast-paced coding tutorials and tech news" },
      { name: "Traversy Media", url: "#", description: "In-depth web development courses" },
    ],
  },
  {
    icon: Code,
    title: "Developer Tools",
    resources: [
      { name: "VS Code", url: "https://code.visualstudio.com", description: "Popular code editor with great extensions" },
      { name: "Figma", url: "https://figma.com", description: "Collaborative design and prototyping tool" },
      { name: "Postman", url: "https://postman.com", description: "API development and testing platform" },
    ],
  },
  {
    icon: FileText,
    title: "Design Resources",
    resources: [
      { name: "Tailwind UI", url: "https://tailwindui.com", description: "Beautiful UI components for Tailwind CSS" },
      { name: "Heroicons", url: "https://heroicons.com", description: "Beautiful hand-crafted SVG icons" },
      { name: "Unsplash", url: "https://unsplash.com", description: "Free high-quality stock photos" },
    ],
  },
]

export default function ResourcesPage() {
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
          <div className="grid gap-8 md:grid-cols-2">
            {resourceCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <category.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <a
                        key={resourceIndex}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg border border-border transition-all hover:border-primary/20 hover:bg-accent"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="font-medium">{resource.name}</div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
