import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "Projects - Zi's Portfolio",
  description: "Featured projects and case studies showcasing my work.",
}

const projects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    link: "/projects/ecommerce-platform",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "/projects/task-management",
  },
  {
    title: "Portfolio Template",
    description: "Modern, customizable portfolio template for developers and designers.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "/projects/portfolio-template",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with forecast data and interactive visualizations.",
    tags: ["React", "TypeScript", "Weather API", "Charts"],
    link: "/projects/weather-dashboard",
  },
  {
    title: "Social Media Analytics",
    description: "Analytics platform for social media metrics with data visualization and reporting.",
    tags: ["Next.js", "Python", "PostgreSQL", "D3.js"],
    link: "/projects/social-analytics",
  },
  {
    title: "Recipe Sharing Platform",
    description: "Community-driven recipe sharing platform with search, filters, and user ratings.",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    link: "/projects/recipe-platform",
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Projects</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Featured Work
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A selection of projects that showcase my skills and experience in web development.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Link key={index} href={project.link}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="line-clamp-1 text-balance">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
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
