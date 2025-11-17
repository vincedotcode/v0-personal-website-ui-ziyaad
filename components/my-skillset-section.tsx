// src/components/my-skillset-section.tsx
"use client"

import CardFlip from "@/components/ui/card-flip"

const skillCards = [
  {
    title: "Product Management",
    subtitle: "From idea to impact",
    description:
      "Owning the full product lifecycle: discovery, strategy, delivery and iteration across complex B2B platforms.",
    features: [
      "Outcome-driven roadmapping",
      "Stakeholder alignment",
      "Data-informed decisions",
      "Value vs. effort trade-offs",
    ],
  },
  {
    title: "Growing People",
    subtitle: "Teams over heroes",
    description:
      "Creating environments where designers, engineers and PMs do their best work and grow in the process.",
    features: [
      "Coaching & mentoring",
      "Clear expectations & feedback",
      "Psychological safety",
      "Shared ownership of wins",
    ],
  },
  {
    title: "Information Security",
    subtitle: "Shipping safely",
    description:
      "Balancing pace with protection: building secure, compliant experiences without killing usability.",
    features: [
      "Risk-based thinking",
      "Privacy by design",
      "Secure defaults & guardrails",
      "Working with legal & compliance",
    ],
  },
  {
    title: "Play, Creativity & Empathy",
    subtitle: "Humans first, always",
    description:
      "Keeping products grounded in real human life through play, humour and genuine curiosity about people.",
    features: [
      "Poetry & writing",
      "Testing dishes on friends",
      "Karaoke & board games",
      "Loving floofy cats & dogs",
    ],
  },
]

export function MySkillsetSection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            My Skillset
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            The mix of product, security and very human hobbies that shapes how I work with teams.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 place-items-center">
          {skillCards.map((card) => (
            <CardFlip
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              features={card.features}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
