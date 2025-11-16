import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: "Experience - Zi's Portfolio",
  description: "Work history, achievements, and professional milestones.",
}

const timeline = [
  {
    year: "2023",
    title: "Led Major Platform Migration",
    company: "TechCorp Inc.",
    achievements: [
      "Successfully migrated legacy monolith to microservices architecture",
      "Reduced page load times by 60% through optimization",
      "Mentored team of 5 junior developers",
    ],
  },
  {
    year: "2022",
    title: "Promoted to Senior Developer",
    company: "TechCorp Inc.",
    achievements: [
      "Established coding standards and best practices",
      "Implemented automated testing increasing coverage to 90%",
      "Led code review process for team",
    ],
  },
  {
    year: "2021",
    title: "Built E-commerce Platform",
    company: "StartupXYZ",
    achievements: [
      "Developed full-stack e-commerce solution from scratch",
      "Integrated payment processing with Stripe",
      "Achieved 99.9% uptime in production",
    ],
  },
  {
    year: "2020",
    title: "Joined Tech Startup",
    company: "StartupXYZ",
    achievements: [
      "Contributed to rapid product development",
      "Implemented CI/CD pipeline reducing deployment time by 70%",
      "Collaborated with cross-functional teams",
    ],
  },
  {
    year: "2019",
    title: "Started Professional Career",
    company: "WebAgency",
    achievements: [
      "Built responsive websites for 20+ clients",
      "Learned modern frontend frameworks and tools",
      "Received excellent client feedback",
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Professional Experience</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Career Timeline
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Key milestones and achievements throughout my professional journey.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Year badge */}
                <div className="absolute left-8 -translate-x-1/2 md:left-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground font-bold">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
