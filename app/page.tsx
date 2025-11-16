import Link from "next/link"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { ParticleButton } from "@/components/particle-button"
import { ColorfulText } from "@/components/colorful-text"
import { RippleGridBackground } from "@/components/reactbits-background"
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Orb from "@/components/ui/orb"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"

const testimonials = [
  {
    quote:
      "Working with Zi was an absolute pleasure. Their attention to detail and ability to bring creative visions to life is unmatched.",
    name: "Sarah Chen",
    title: "CEO at TechStart",
  },
  {
    quote:
      "Zi delivered our project ahead of schedule with exceptional quality. Their technical expertise and communication skills are outstanding.",
    name: "Michael Rodriguez",
    title: "Product Manager at InnovateCo",
  },
  {
    quote:
      "The level of professionalism and creativity Zi brings to every project is remarkable. Highly recommended!",
    name: "Emily Johnson",
    title: "Creative Director at DesignHub",
  },
  {
    quote:
      "Zi's ability to understand complex requirements and translate them into beautiful, functional designs is impressive.",
    name: "David Park",
    title: "CTO at StartupXYZ",
  },
  {
    quote:
      "I've worked with many developers, but Zi stands out for their innovative approach and dedication to excellence.",
    name: "Lisa Thompson",
    title: "Founder at WebWorks",
  },
]

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices.",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful, user-friendly interfaces with attention to every detail.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Delivering high-quality projects on time without compromising on quality.",
  },
]

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={180}
            forceHoverState={false}
          />
        </div>
        <RippleGridBackground />
        <div className="container relative z-10 py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <Badge className="mb-4" variant="secondary">
              Available for freelance work
            </Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Hi, I'm Zi
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <LayoutTextFlip
                  text="I build"
                  words={["Web Apps", "User Experiences", "Digital Products", "Creative Solutions"]}
                  duration={3000}
                />
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed md:text-2xl text-balance px-4">
              A passionate web developer & designer crafting beautiful digital experiences
              with modern technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <ParticleButton size="lg" asChild>
                <Link href="/portfolio">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ParticleButton>
              <ParticleButton size="lg" variant="outline" asChild>
                <Link href="/contact">Get In Touch</Link>
              </ParticleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              What I Bring to the Table
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combining technical expertise with creative problem-solving
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Technologies I Work With
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Always learning and expanding my toolkit
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Feedback from clients and collaborators
            </p>
          </div>
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center pb-4 px-6 pt-12">
              <CardTitle className="text-3xl sm:text-4xl mb-4 text-balance">
                Let's Build Something Amazing
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                I'm always excited to work on new projects and collaborate with great people.
                Let's turn your ideas into reality.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-4 pb-12">
              <ParticleButton size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ParticleButton>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
