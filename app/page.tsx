import Link from "next/link"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { ParticleButton } from "@/components/particle-button"
import { RippleGridBackground } from "@/components/reactbits-background"
import { ArrowRight, Code, Palette, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Orb from "@/components/ui/orb"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import { FinalCtaSection } from "@/components/final-cta"
import { ProductExperienceSection } from "@/components/product-experience"
import { CompaniesHelpedSection } from "@/components/companies-helped"
import { MySkillsetSection } from "@/components/my-skillset-section"
import { ProcessSection } from "@/components/process-section"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "From day one, Zi was the voice of the user—curious, collaborative, and comfortable diving into both big-picture conversations and tiny technical details.",
    name: "Amit Ganguly",
    title: "Senior Product Designer • AI Learning Experiences",
  },
  {
    quote:
      "Zi is one of the most professional and sharp people I’ve worked with, always turning customer needs into smart, realistic product decisions.",
    name: "Paloma Sánchez",
    title: "Lead Product Manager",
  },
  {
    quote:
      "Mr. Product himself—Zi pulls teams and knowledge together, keeps the roadmap on track, and ships updates on time, all with great humour.",
    name: "Anthony Mitchell",
    title: "Email Deliverability & Inbox Placement Specialist",
  },
  {
    quote:
      "Zi listens carefully to customer and prospect requests, then challenges them to fit product vision and best practices. He’s a real asset to any team.",
    name: "Ben Ivers",
    title: "Chief Product Officer & Co-Founder, Tenon",
  },
  {
    quote:
      "Zi always knew what needed doing and who should do it. His strong technical understanding and communication make him an excellent product manager.",
    name: "Igor Caviroski",
    title: "Freelance Senior Developer",
  },
  {
    quote:
      "Conscientious, dedicated, positive and realistic—Zi is a great example of how strong interpersonal skills across teams create real business value.",
    name: "Xavier Cebeira",
    title: "Technology Partnerships Lead",
  },
  {
    quote:
      "Knowledgeable, enthusiastic and always available for advice, Zi has been a constant source of insight and recommendations. A real business asset.",
    name: "Ian Crawshaw",
    title: "Co-Founder, Stratiko",
  },
  {
    quote:
      "Zi was a fountain of information on releases, competition and product usage, often supporting beyond his formal remit. Talented and hard-working.",
    name: "Francesco Barzanò",
    title: "Lead Solution Engineer, Salesforce",
  },
  {
    quote:
      "Zi adapts quickly to new technical challenges and doesn’t hesitate to go beyond his core skillset to serve customers in the best possible way.",
    name: "Steve A.",
    title: "COO • Operations, Recruitment & Scale",
  },
  {
    quote:
      "Smart, reliable and highly technical, Zi combines deep product knowledge with a friendly, sociable attitude. If you want a fast learner, he’s it.",
    name: "Julien Mattei",
    title: "DevOps Engineer",
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
  <div
    style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
  >
    <Orb hoverIntensity={0.5} rotateOnHover={true} hue={180} forceHoverState={false} />
  </div>
  <RippleGridBackground />

  <div className="container relative z-10 py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Text side */}
      <div className="flex-1 text-center lg:text-left space-y-6">
        <Badge className="mb-2" variant="secondary">
          Experienced product leader from Mauritius
        </Badge>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Hi, I&apos;m Zi
          </h1>
          <div className="flex flex-col sm:flex-column items-center lg:items-start justify-center lg:justify-start gap-2 text-center lg:text-left">
          <LayoutTextFlip
              text="I work at the intersection of"
              words={["Product Management", "Data Protection", "Content & Creativity", "Helping Others"]}
              duration={3000}
            />
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed md:text-2xl text-balance">
          I am an experienced product leader from Mauritius with an interest in data protection who
          enjoys consuming quality content, cooking, writing, singing, board games and most of all,
          helping others. I believe in the good the world and its people have to offer.
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
          <ParticleButton size="lg" asChild>
            <Link href="/portfolio">
              Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </ParticleButton>
          <ParticleButton size="lg" variant="outline" asChild>
            <Link href="/assets/ziyaad-ben-eydatoula-cv.pdf" target="_blank">
              Download C.V.
            </Link>
          </ParticleButton>
        </div>

        <div className="pt-4 border-l-0 lg:border-l lg:pl-4 border-muted flex flex-col gap-1 items-center lg:items-start">
          <p className="italic text-sm md:text-base text-muted-foreground">
            “Be, do and think good!”
          </p>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            — Zi
          </span>
        </div>
      </div>

      {/* Image side */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-xl opacity-70" />
          <div className="relative rounded-3xl border border-border/60 bg-background/80 shadow-xl overflow-hidden">
            <Image
              src="/images/ziyaad-portrait.jpg" // adjust path to actual image
              alt="Portrait of Zi"
              width={400}
              height={400}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      

      {/* My Skillset (flip cards) */}
      <MySkillsetSection />

      {/* Technologies Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Technologies I Work With
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Always learning and expanding my toolkit.
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

      {/* Process Section */}
      <ProcessSection />

      {/* Product Experience Section */}
      <ProductExperienceSection />

      {/* Companies I’ve Helped Logos */}
      <CompaniesHelpedSection />

      {/* Testimonials Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Feedback from clients and collaborators.
            </p>
          </div>
          <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
        </div>
      </section>

      {/* Final CTA Section */}
      <FinalCtaSection />
    </div>
  )
}
