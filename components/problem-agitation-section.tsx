"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProblemCard = {
  id: string
  title: string
  teaser: string
  body: string
  enquiryParam: "critique" | "building" | "gtm" | "coaching"
}

const problemCards: ProblemCard[] = [
  {
    id: "pre-launch-blindness",
    title: "Pre-Launch Blindness",
    teaser: "You’re weeks from launch, but something feels off.",
    body: `
You're weeks from launch but something feels off. Your team is too close to see the gaps.
You need an honest second opinion, but everyone around you is either too invested
or too polite to tell you the truth.
    `,
    enquiryParam: "critique",
  },
  {
    id: "discovery-delivery-chaos",
    title: "Discovery & Delivery Chaos",
    teaser: "Features ship, but nobody’s sure why.",
    body: `
Your team keeps building features nobody asked for. Releases keep slipping.
Design and engineering aren't aligned. Your backlog is a graveyard of half-finished ideas.
Nobody knows what “done” actually means or which problems are worth solving.
    `,
    enquiryParam: "building",
  },
  {
    id: "gtm-confusion",
    title: "GTM Confusion",
    teaser: "You built something great. Customers shrug.",
    body: `
You've built something great, but nobody's buying. Your positioning is fuzzy.
Sales doesn't know how to sell it. Marketing can't explain the value.
Every competitor sounds exactly like you. Customers say “interesting” but never convert.
    `,
    enquiryParam: "gtm",
  },
  {
    id: "team-capability-gap",
    title: "Team Capability Gap",
    teaser: "Smart PMs, but the same problems keep repeating.",
    body: `
Your PMs are smart but inexperienced. They're task-driven, not outcome-focused.
They can't facilitate tough conversations. They don't know how to run discovery.
They're afraid to push back on stakeholders. You keep hiring, but the problems persist.
    `,
    enquiryParam: "coaching",
  },
]

export function ProblemAgitationSection() {
  const router = useRouter()

  const handleClick = (enquiryParam: ProblemCard["enquiryParam"]) => {
    router.push(`/touchbase?enquiry=${enquiryParam}`)
  }

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/10 border-y border-border/40">
      <div className="container max-w-6xl mx-auto space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            Sound familiar?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            The patterns I see again and again.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            If any of these feel a bit too close to home, that&apos;s usually a sign it&apos;s time
            to bring in an external brain and a fresh pair of eyes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {problemCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleClick(card.enquiryParam)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
            >
              <Card className="h-full border-border/60 bg-gradient-to-br from-background/70 via-background/60 to-background/30 transition-all group-hover:border-primary/50 group-hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg font-semibold">
                    {card.title}
                  </CardTitle>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
                    Click to talk about this
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {card.teaser}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-none md:line-clamp-5 group-hover:line-clamp-none transition-[line-clamp] duration-200">
                    {card.body}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-medium text-primary group-hover:underline">
                    This is the problem I have →
                  </span>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
