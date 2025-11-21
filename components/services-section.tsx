"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type EnquiryParam = "critique" | "building" | "gtm" | "coaching"

type Service = {
  id: EnquiryParam
  label: string
  headline: string
  problemStatement: string
  whatYouGetLabel: string
  whatYouGet: string[]
  outcome: string
  bestFor: string[]
  investment?: string
  timeline?: string
  ctaLabel: string
  testimonial?: {
    quote: string
    attribution: string
  }
}

const SERVICES: Service[] = [
  {
    id: "critique",
    label: "Product Critique",
    headline: "Get brutal honesty before launch, not after.",
    problemStatement:
      "Most products fail because nobody asked the hard questions early enough. You’re too close to see the gaps, your team is too polite to tell you, and investors only want to see progress – not problems.",
    whatYouGetLabel: "What you get",
    whatYouGet: [
      "A senior product leader's objective review of your product – UX, value prop and risk profile.",
      "A clear view of whether you’re solving a real problem that’s painful enough right now.",
      "A sanity check on differentiation: are you actually different or just saying the same thing louder.",
      "Identification of UX friction, onboarding issues and confusing flows.",
      "Visibility on risks that will bite you 3–6 months after launch (not just week one).",
      "A first-pass view on security/privacy gaps that will slow you down later.",
    ],
    outcome:
      "You walk away with sharp, prioritized recommendations – not vague feedback. A concrete list of actions you can implement tomorrow before shipping.",
    bestFor: [
      "Founders 2–3 months from launch.",
      "Product teams preparing a major release.",
      "VPs and leaders wanting external validation before committing roadmap and budget.",
    ],
    investment: "One-time engagement, scoped to your product and timelines.",
    timeline: "Typical turnaround: 3–5 days.",
    ctaLabel: "Request a critique",
    testimonial: {
      quote:
        "Zi identified three critical UX issues we’d completely missed. His feedback saved us at least 2 months of post-launch firefighting.",
      attribution: "Product Lead, B2B SaaS (Series B)",
    },
  },
  {
    id: "building",
    label: "Product Building",
    headline: "Ship the right thing, the right way, at the right time.",
    problemStatement:
      "You know what you want to build, but getting from idea to shipped product feels like pushing water uphill. Requirements change weekly, stakeholders contradict each other, and your talented team is stuck in feature-factory mode.",
    whatYouGetLabel: "What I do",
    whatYouGet: [
      "Define the real problem – what customers actually struggle with, not what a slide deck says.",
      "Set up continuous discovery – weekly conversations with customers and internal teams.",
      "Shape solutions with design, engineering and leadership so everyone is aligned.",
      "Turn fuzzy requirements into actionable epics and stories your team can actually build.",
      "Establish a calm, predictable delivery rhythm so you can ship without chaos.",
      "Bake in security, privacy and compliance from day zero instead of patching later.",
      "Guide you from MVP to v1 to v2 with clear learning loops, not random bets.",
    ],
    outcome:
      "Your team builds the muscle to keep shipping long after I’m gone. This isn’t consulting theatre – it’s capability building and a product culture reset.",
    bestFor: [
      "Early-stage startups finding or tightening product–market fit.",
      "Teams transitioning from ‘build all the features’ to product-led development.",
      "Scale-ups that need structure around discovery, prioritisation and delivery.",
    ],
    investment: "Embedded engagement, scoped by phase and team size.",
    timeline: "Typically 4–12 weeks depending on scope.",
    ctaLabel: "Let’s talk about your product",
    testimonial: {
      quote:
        "We went from ‘build everything’ chaos to a focused roadmap in 6 weeks. Zi taught us how to say no without pissing people off.",
      attribution: "Co-Founder, FinTech Startup",
    },
  },
  {
    id: "gtm",
    label: "GTM Strategy",
    headline: "Build it and they’ll come? No. Build it, position it right, and they’ll buy.",
    problemStatement:
      "You’ve built something excellent, but customers aren’t lining up. Your messaging sounds like every competitor, sales can’t explain the value, and marketing doesn’t know what makes you meaningfully different.",
    whatYouGetLabel: "What we define together",
    whatYouGet: [
      "Sharp positioning and messaging – why you, why now, and why not the alternative.",
      "A concrete ideal customer profile – exactly who feels this pain the most.",
      "A differentiation strategy that competitors can’t just copy in a week.",
      "A pricing foundation that reflects value, not random benchmarking.",
      "A launch narrative that makes people care instead of glazing over.",
      "Adoption loops – how customers find value and tell others about it.",
      "Success metrics that actually matter, not vanity dashboards.",
      "Sales enablement assets so teams know exactly how to talk about the product.",
    ],
    outcome:
      "You leave with a GTM playbook that turns your product from ‘interesting’ to ‘must-have’ – for a specific audience, with a clear story and path to revenue.",
    bestFor: [
      "Teams preparing for launch or relaunch.",
      "Companies with strong tech but weak positioning or conversion.",
      "Companies entering new markets or segments.",
    ],
    investment: "Project-based engagement aligned to launch milestones.",
    timeline: "Typically 3–6 weeks.",
    ctaLabel: "Get GTM clarity",
    testimonial: {
      quote:
        "Our demo-to-close rate tripled after working with Zi on positioning. He helped us articulate value we didn’t even realize we had.",
      attribution: "VP Product, Enterprise Software",
    },
  },
  {
    id: "coaching",
    label: "Product Coaching",
    headline: "Build product leaders, not just products.",
    problemStatement:
      "Your PMs are smart but inexperienced. They’re task-driven, not outcome-focused. They struggle with stakeholders, avoid hard conversations, and don’t have a strong discovery or decision-making toolkit.",
    whatYouGetLabel: "What I teach & coach",
    whatYouGet: [
      "Discovery skills – how to talk to customers and actually learn something.",
      "Outcomes over output – focusing on impact, not ticket throughput.",
      "Planning and prioritisation – saying yes to the right things and no to the rest.",
      "Running product conversations that lead to clear decisions, not vague notes.",
      "Building psychological safety so teams can do their best work.",
      "Measuring impact and communicating it clearly to leadership.",
      "Security awareness – thinking like an attacker and building defensively.",
    ],
    outcome:
      "Your PMs grow from executors to strategic operators. They make better decisions, influence stakeholders effectively, and ship products that actually move the needle.",
    bestFor: [
      "Growing product teams (2–10 PMs).",
      "First-time product leaders and leads.",
      "Organisations investing in product culture, not just headcount.",
    ],
    investment: "Ongoing coaching & workshops, configurable to your team size.",
    timeline: "Usually 8–16 weeks with a mix of sessions and async support.",
    ctaLabel: "Invest in your team",
    testimonial: {
      quote:
        "Zi turned our junior PM into a strategic thinker in 4 months. Stakeholders now come to her for advice instead of bypassing her.",
      attribution: "Director of Product, E-commerce Platform",
    },
  },
]

export function ServicesSection() {
  const [activeId, setActiveId] = useState<EnquiryParam>("critique")
  const router = useRouter()

  const activeService = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0]

  const handleCta = () => {
    router.push(`/touchbase?enquiry=${activeService.id}`)
  }

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container max-w-6xl mx-auto space-y-10">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <Badge
              variant="outline"
              className="rounded-full border-primary/40 bg-primary/5 text-xs tracking-[0.2em] uppercase"
            >
              How we can work together
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Four ways we can work together.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Pick the mode that matches where you are: sanity check before launch, building the
              product itself, sharpening your GTM, or levelling up your product team.
            </p>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
            Each service is outcome-driven and designed to be brutally honest, practical and easy to
            plug into your existing team and stack.
          </p>
        </div>

        {/* Tabs / service selector */}
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setActiveId(service.id)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs md:text-sm font-medium transition-all",
                activeId === service.id
                  ? "border-primary bg-primary/15 text-primary shadow-sm"
                  : "border-border bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Active service detail */}
        <Card className="border-border/70 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
          <CardHeader className="space-y-2 md:space-y-3">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              {activeService.headline}
            </CardTitle>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {activeService.problemStatement}
            </p>
          </CardHeader>

          <CardContent className="space-y-8 md:space-y-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              {/* What you get / do */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                  {activeService.whatYouGetLabel}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {activeService.whatYouGet.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome / best for */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Outcome
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeService.outcome}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Best for
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {activeService.bestFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-foreground/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {(activeService.investment || activeService.timeline) && (
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {activeService.investment && (
                      <span className="rounded-full border border-border bg-background/80 px-3 py-1">
                        Investment: {activeService.investment}
                      </span>
                    )}
                    {activeService.timeline && (
                      <span className="rounded-full border border-border bg-background/80 px-3 py-1">
                        Typical timeline: {activeService.timeline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTA + testimonial */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center justify-center rounded-xl border border-primary/60 bg-primary/15 px-5 py-2.5 text-sm font-medium text-primary shadow-[0_0_0_1px_rgba(60,132,124,0.45)] transition-colors hover:bg-primary/25"
              >
                {activeService.ctaLabel}
                <span className="ml-2 text-base">→</span>
              </button>

              {activeService.testimonial && (
                <div className="max-w-xl text-xs md:text-sm text-muted-foreground md:text-right">
                  <p className="italic leading-relaxed">
                    “{activeService.testimonial.quote}”
                  </p>
                  <p className="mt-1 font-medium text-foreground/80">
                    — {activeService.testimonial.attribution}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
