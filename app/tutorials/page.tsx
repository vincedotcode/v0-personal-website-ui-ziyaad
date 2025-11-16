import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock } from 'lucide-react'
import Link from "next/link"

export const metadata = {
  title: "Tutorials - Zi's Portfolio",
  description: "Step-by-step guides and tutorials for web development.",
}

const tutorials = [
  {
    title: "Building a REST API with Node.js",
    description: "Learn how to build a production-ready REST API from scratch using Node.js and Express.",
    level: "Intermediate",
    duration: "2 hours",
    lessons: 12,
    slug: "rest-api-nodejs",
  },
  {
    title: "React Hooks Deep Dive",
    description: "Master React Hooks with practical examples and best practices.",
    level: "Beginner",
    duration: "1.5 hours",
    lessons: 8,
    slug: "react-hooks-deep-dive",
  },
  {
    title: "TypeScript for JavaScript Developers",
    description: "Transition from JavaScript to TypeScript with this comprehensive guide.",
    level: "Beginner",
    duration: "3 hours",
    lessons: 15,
    slug: "typescript-for-js-devs",
  },
  {
    title: "Advanced Next.js Patterns",
    description: "Explore advanced patterns and optimizations in Next.js applications.",
    level: "Advanced",
    duration: "2.5 hours",
    lessons: 10,
    slug: "advanced-nextjs-patterns",
  },
  {
    title: "CSS Grid and Flexbox Mastery",
    description: "Master modern CSS layout techniques with practical examples.",
    level: "Intermediate",
    duration: "2 hours",
    lessons: 9,
    slug: "css-grid-flexbox-mastery",
  },
  {
    title: "Authentication with NextAuth.js",
    description: "Implement secure authentication in your Next.js applications.",
    level: "Intermediate",
    duration: "1.5 hours",
    lessons: 7,
    slug: "authentication-nextauth",
  },
]

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

export default function TutorialsPage() {
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => (
              <Link key={index} href={`/tutorials/${tutorial.slug}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                  <CardHeader>
                    <Badge className={getLevelColor(tutorial.level)} variant="secondary">
                      {tutorial.level}
                    </Badge>
                    <CardTitle className="line-clamp-2 text-balance mt-2">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {tutorial.lessons} lessons
                      </div>
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
