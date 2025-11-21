
"use client";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import {  Code, Palette, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FinalCtaSection } from "@/components/final-cta"
import { ProductExperienceSection } from "@/components/product-experience"
import { CompaniesHelpedSection } from "@/components/companies-helped"
import { MySkillsetSection } from "@/components/my-skillset-section"
import { ProcessSection } from "@/components/process-section"
import HeroSection from "@/components/hero-section";

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
      <HeroSection />


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
