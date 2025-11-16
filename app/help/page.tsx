import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Book, Video, Mail, FileQuestion, Lightbulb } from 'lucide-react'
import Link from "next/link"
import Orb from "@/components/ui/orb"

export const metadata = {
  title: "Help - Zi's Portfolio",
  description: "Get help and support for your projects and questions.",
}

const helpSections = [
  {
    icon: Book,
    title: "Documentation",
    description: "Browse comprehensive guides and documentation for all our products and services.",
    link: "#",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch step-by-step video tutorials to learn how to use our tools effectively.",
    link: "#",
  },
  {
    icon: FileQuestion,
    title: "FAQs",
    description: "Find answers to frequently asked questions about our services.",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Join our community to ask questions, share ideas, and connect with others.",
    link: "#",
  },
  {
    icon: Lightbulb,
    title: "Tips & Tricks",
    description: "Discover helpful tips and best practices to get the most out of our tools.",
    link: "#",
  },
  {
    icon: Mail,
    title: "Contact Support",
    description: "Can't find what you're looking for? Reach out to our support team directly.",
    link: "/contact",
  },
]

export default function HelpPage() {
  return (
    <div className="relative">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Orb
          hoverIntensity={0.4}
          rotateOnHover={true}
          hue={280}
          forceHoverState={false}
        />
      </div>
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <Badge>Help Center</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              How Can We Help You?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find answers, get support, and learn how to make the most of our services.
            </p>
          </div>

          {/* Help Sections Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {helpSections.map((section, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/20 bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-balance">{section.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={section.link}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
