"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const productExperienceItems = [
  {
    title: "Authentication & Authorization",
    blurb: "Designing secure sign-in flows, roles and permissions that feel invisible to the user.",
  },
  {
    title: "APIs",
    blurb: "Defining clear, versioned APIs that are easy for other teams and partners to build on.",
  },
  {
    title: "Segmentation",
    blurb: "Turning raw profiles and events into meaningful segments that power smarter messaging.",
  },
  {
    title: "Email & SMS Marketing",
    blurb: "Owning the orchestration of timely, relevant messages across inbox and phone.",
  },
  {
    title: "Omnichannel Journey Builder",
    blurb: "Mapping end-to-end customer journeys and connecting multiple touchpoints into one story.",
  },
  {
    title: "Legacy Monolith → Novel Cloud",
    blurb: "Helping teams break apart monoliths into scalable, observable, cloud-native services.",
  },
  {
    title: "ETLs",
    blurb: "Designing data pipelines that keep operational systems and analytics in sync and reliable.",
  },
  {
    title: "Connectors",
    blurb: "Integrating third-party tools so data actually flows instead of getting stuck in silos.",
  },
  {
    title: "360° Customer View",
    blurb: "Consolidating events, profiles, and transactions into a single, trustworthy source of truth.",
  },
  {
    title: "Dashboards",
    blurb: "Building decision-ready dashboards that answer real questions, not just show charts.",
  },
  {
    title: "Product Recommendations",
    blurb: "Shaping recommendation systems that balance business goals with user value.",
  },
  {
    title: "Payment & Transactions",
    blurb: "Designing safe, compliant flows for checkout, billing and financial events.",
  },
]



export function ProductExperienceSection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto space-y-10">
        <div className="max-w-2xl space-y-4">
          <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/5 text-xs tracking-[0.2em] uppercase">
            Product Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Shipping products that connect all the dots.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From auth flows to payments and journeys, I&apos;ve worked across the full stack of
            customer experience. These are the areas where I tend to leave fingerprints.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productExperienceItems.map((item) => (
            <Card
              key={item.title}
              className="border-border/60 bg-gradient-to-br from-background/60 to-background/20 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {item.blurb}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


