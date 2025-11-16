import { SquaresBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award } from 'lucide-react'

export const metadata = {
  title: "Resume - Zi's Portfolio",
  description: "View my professional resume, work experience, and education.",
}

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and establishing best practices.",
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built and maintained multiple client-facing applications. Implemented CI/CD pipelines and improved application performance by 40%.",
  },
  {
    title: "Frontend Developer",
    company: "WebAgency",
    period: "2019 - 2020",
    description: "Developed responsive web applications and landing pages. Collaborated with designers to create pixel-perfect implementations.",
  },
]

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of California",
    period: "2015 - 2019",
    description: "Graduated with honors. Focused on web development and software engineering.",
  },
]

const certifications = [
  "AWS Certified Developer - Associate",
  "Google Cloud Professional Developer",
  "Meta Frontend Developer Certificate",
]

export default function ResumePage() {
  return (
    <div className="relative">
      <SquaresBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Resume</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Professional Experience
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive overview of my career journey and qualifications.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription className="mt-1">{exp.company}</CardDescription>
                      </div>
                      <Badge variant="secondary">{exp.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{edu.degree}</CardTitle>
                        <CardDescription className="mt-1">{edu.school}</CardDescription>
                      </div>
                      <Badge variant="secondary">{edu.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Certifications</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
