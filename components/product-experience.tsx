"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const CORE_PRODUCT_DOMAINS: string[] = [
  "Authentication & Authorization",
  "API Design & Management",
  "Customer Segmentation Engines",
  "Email & SMS Marketing Platforms",
  "Omnichannel Journey Builders",
  "Legacy Migration to Cloud",
]

const TECHNICAL_PRODUCT_CHALLENGES: string[] = [
  "ETL Pipelines & Data Integration",
  "Third-Party Connectors",
  "360° Customer View Systems",
  "Real-Time Dashboards",
  "Product Recommendation Engines",
  "Payment & Transaction Systems",
]

export function ProductExperienceSection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge
            variant="outline"
            className="rounded-full border-primary/40 bg-primary/5 text-xs tracking-[0.2em] uppercase"
          >
            Product Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            The products I&apos;ve built{" "}
            <span className="text-primary">
              (so you don&apos;t have to learn the hard way).
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Over a decade of battle-tested product experience across B2B SaaS, e-commerce, martech,
            gaming and fintech — joining the dots between product, data and security.
          </p>
        </div>

        {/* Two-column expertise grid */}
        <Card className="border-border/60 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
          <CardContent className="px-4 py-6 md:px-8 md:py-8">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Left column – Core Product Domains */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Core product domains
                </p>
                <ul className="space-y-3">
                  {CORE_PRODUCT_DOMAINS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-foreground/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column – Technical Product Challenges */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Technical product challenges
                </p>
                <ul className="space-y-3">
                  {TECHNICAL_PRODUCT_CHALLENGES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary/80" />
                      </span>
                      <span className="text-foreground/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Caption */}
            <p className="mt-8 text-xs md:text-sm text-muted-foreground leading-relaxed">
              This mix of domains means I&apos;m comfortable working across the full lifecycle:
              from auth and APIs, through data flows and journeys, all the way to payments and
              dashboards — without dropping the security ball.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
