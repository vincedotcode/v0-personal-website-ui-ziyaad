import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Database, Cloud, Wrench, Users } from 'lucide-react'

export const metadata = {
  title: "Skills - Zi's Portfolio",
  description: "Technical skills, tools, and technologies I work with.",
}

const skillCategories = [
  {
    icon: Code,
    title: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Vue.js"],
  },
  {
    icon: Database,
    title: "Backend Development",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express", "GraphQL"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: ["AWS", "Vercel", "Docker", "CI/CD", "GitHub Actions", "Terraform"],
  },
  {
    icon: Palette,
    title: "Design & UX",
    skills: ["Figma", "Adobe XD", "UI/UX Design", "Responsive Design", "Accessibility"],
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    skills: ["Git", "VS Code", "Linear", "Notion", "Jira", "Slack"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    skills: ["Team Leadership", "Communication", "Problem Solving", "Time Management", "Mentoring"],
  },
]

export default function SkillsPage() {
  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Skills & Expertise</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Technologies I Work With
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A comprehensive overview of my technical skills, tools, and areas of expertise
              built through years of hands-on experience.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle>Always Learning</CardTitle>
              <CardDescription className="leading-relaxed">
                Technology evolves rapidly, and I'm committed to continuous learning. I regularly
                explore new frameworks, tools, and best practices to stay at the forefront of
                web development.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
