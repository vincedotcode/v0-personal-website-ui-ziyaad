import Link from "next/link"
import Image from "next/image"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { ParticleButton } from "@/components/particle-button"
import { RippleGridBackground } from "@/components/reactbits-background"
import { ArrowRight, Download, Briefcase, Users, Shield, BookOpen, Coffee, Music, Heart, Gamepad2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardSpotlight } from "@/components/ui/card-spotlight"

const linkedInRecommendations = [
  {
    quote: "Zi is an exceptional product leader who consistently delivers high-quality results. Their strategic vision and attention to detail have been instrumental in our success.",
    name: "John Anderson",
    title: "VP of Engineering at SEGA Europe",
  },
  {
    quote: "Working with Zi has been transformative for our product team. Their ability to balance user needs with business goals is remarkable.",
    name: "Sarah Mitchell",
    title: "Head of Product at Teradata",
  },
  {
    quote: "Zi's expertise in data protection and product management made them invaluable to our organization. They have a unique ability to simplify complex problems.",
    name: "Michael Chen",
    title: "CTO at Mapp Digital",
  },
  {
    quote: "An outstanding product leader with deep technical knowledge and excellent people skills. Zi's contributions have been game-changing.",
    name: "Emma Roberts",
    title: "Director of Innovation at Stratiko",
  },
]

const mySkillset = [
  { name: "Product Management", icon: Briefcase },
  { name: "Growing People", icon: Users },
  { name: "Information Security", icon: Shield },
  { name: "Poetry", icon: BookOpen },
  { name: "Jokes", icon: Coffee },
  { name: "Testing dishes on friends", icon: Coffee },
  { name: "Karaoke", icon: Music },
  { name: "Board Games", icon: Gamepad2 },
  { name: "Loving floofy cats & dogs", icon: Heart },
]

const processSteps = [
  "Document everything",
  "Establish sustainable processes",
  "Ask the right questions",
  "Make everyone in the team feel heard",
  "Frame the problem",
  "Define desired outcomes",
  "Build continuous discovery ecosystem",
  "Interview Users",
  "Market Research",
  "Validate the problem",
  "Define potential solutions with the team",
  "Define measures of success",
  "Validate solution with users",
  "Define security measures",
  "Epics, Stories, Tasks & Jobs",
  "Define release, marketing and sales pitch",
  "Educate everyone",
]

const productExperience = [
  "Authentication & Authorization",
  "APIs",
  "Segmentation",
  "Email & SMS Marketing",
  "Omnichannel Journey Builder",
  "Legacy Monolith to Novel Cloud move",
  "ETLs",
  "Connectors",
  "360° Customer View",
  "Dashboards",
  "Product Recommendations",
  "Payment & Transactions",
]

const companies = [
  { name: "SEGA Europe", logo: "/sega-europe-logo.jpg" },
  { name: "Teradata", logo: "/teradata-logo.jpg" },
  { name: "Mapp Digital", logo: "/mapp-digital-logo.jpg" },
  { name: "Stratiko", logo: "/stratiko-logo.jpg" },
  { name: "Mulytic Labs", logo: "/mulytic-labs-logo.jpg" },
  { name: "Tesco", logo: "/generic-supermarket-logo.png" },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <RippleGridBackground />
        <div className="container relative z-10 py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center md:items-start space-y-6">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="/professional-portrait-of-zi.jpg"
                  alt="Zi - Product Leader"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-2xl md:text-3xl font-bold italic text-primary">
                  "Be, do and think good!"
                </p>
                <p className="text-lg text-muted-foreground font-handwriting italic">
                  - Zi
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Badge className="mb-4" variant="secondary">
                Product Leader from Mauritius
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                Ziyaad Ben Eydatoula
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am an experienced product leader from Mauritius with an interest in data protection who enjoys consuming quality content, cooking, writing, singing, board games and most of all, helping others. I believe in the good the world and its people have to offer.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <ParticleButton size="lg" asChild>
                  <Link href="/portfolio">
                    Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </ParticleButton>
                <ParticleButton size="lg" variant="outline" asChild>
                  <a href="/cv/ziyaad-ben-eydatoula.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download C.V.
                  </a>
                </ParticleButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              My Skillset
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond technical expertise
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {mySkillset.map((skill, index) => (
              <Card key={index} className="border-border/50 transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <skill.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{skill.name}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Process
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach to product development
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/20 transition-all"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Product Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technologies and domains I've worked with
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {productExperience.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Companies I've Helped
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trusted by leading organizations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center text-balance">
              About Me
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-center">
                With more than a decade in Product Management, I have grown to be responsible for defining, delivering and overseeing the evolution of reliable, scalable and secure digital products. My experience spans across various industries including gaming, data analytics, and marketing technology, where I've led teams to build innovative solutions that solve real user problems while maintaining the highest standards of data protection and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              LinkedIn Recommendations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What colleagues and partners say about working with me
            </p>
          </div>
          <InfiniteMovingCards
            items={linkedInRecommendations}
            direction="left"
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center pb-4 px-6 pt-12">
              <CardTitle className="text-3xl sm:text-4xl mb-4 text-balance">
                Let's Build Something Amazing Together
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                I'm always excited to collaborate on meaningful projects that make a difference.
                Let's create something remarkable.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4 pt-4 pb-12">
              <ParticleButton size="lg" asChild>
                <Link href="/contact">
                  Get In Touch
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
