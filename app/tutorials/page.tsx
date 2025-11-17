import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Tutorials - Zi's Portfolio",
  description: "Step-by-step guides and tutorials for web development.",
}

export const revalidate = 60

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-500/10 text-green-700 dark:text-green-400"
    case "Intermediate":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    case "Advanced":
      return "bg-red-500/10 text-red-700 dark:text-red-400"
    default:
      return ""
  }
}

type Tutorial = {
  id: number
  title: string
  slug: string
  description: string | null
  content: string
  level: string | null
  duration: string | null
  lessons: number | null
}

export default async function TutorialsPage() {
  const tutorials = (await sql`
    SELECT id, title, slug, description, content, level, duration, lessons
    FROM tutorials
    WHERE published = true
    ORDER BY COALESCE(updated_at, created_at) DESC
  `) as Tutorial[]

  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Tutorials</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Learn by Doing
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Step-by-step tutorials to help you master web development concepts and build real projects.
            </p>
          </div>

          {/* Tutorials Grid */}
          {tutorials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tutorials found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tutorial) => {
                const level = tutorial.level || 'Intermediate'
                const duration = tutorial.duration
                const lessons = tutorial.lessons
                
                return (
                  <Link key={tutorial.id} href={`/tutorials/${tutorial.slug}`}>
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <Badge className={getLevelColor(level)} variant="secondary">
                          {level}
                        </Badge>
                        <CardTitle className="line-clamp-2 text-balance mt-2">{tutorial.title}</CardTitle>
                        <CardDescription className="line-clamp-2 leading-relaxed">
                          {tutorial.description || tutorial.content.substring(0, 100) + '...'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {duration}
                            </div>
                          )}
                          {lessons && (
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {lessons} lessons
                            </div>
                          )}
                        </div>
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
