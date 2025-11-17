// src/components/process-section.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type ProcessStep = {
  phase: string
  title: string
  content: string
}

const processSteps: ProcessStep[] = [
  {
    phase: "01",
    title: "Start with clarity",
    content: `
      <p><strong>Document everything. Establish sustainable processes. Ask the right questions.</strong></p>
      <p>
        I start by making the work legible for everyone: clear notes, shared docs, and a simple operating cadence.
        We align on constraints, context and goals so nobody is guessing why we’re doing this in the first place.
      </p>
      <ul>
        <li>Document decisions, risks, assumptions and open questions.</li>
        <li>Set up lightweight rituals and ownership so work doesn’t rely on heroics.</li>
        <li>Collect the “dumb questions” early so they don’t become expensive later.</li>
      </ul>
    `,
  },
  {
    phase: "02",
    title: "Frame the problem",
    content: `
      <p><strong>Make everyone in the team feel heard. Frame the problem. Define desired outcomes.</strong></p>
      <p>
        Before talking solutions, I translate noise into a sharp problem statement that the whole team can get behind.
        We focus on outcomes, not outputs.
      </p>
      <ul>
        <li>Map stakeholders, their pains and what “good” looks like for each.</li>
        <li>Turn vague asks into crisp problem and opportunity statements.</li>
        <li>Write outcome-driven success criteria instead of feature checklists.</li>
      </ul>
    `,
  },
  {
    phase: "03",
    title: "Continuous discovery",
    content: `
      <p><strong>Build a continuous discovery ecosystem. Interview users. Do market research.</strong></p>
      <p>
        Discovery is not a workshop; it’s a system. I plug user interviews, analytics, support tickets and market intel
        into a single learning loop.
      </p>
      <ul>
        <li>Run structured interviews and usability tests on a regular cadence.</li>
        <li>Analyse competitive and market signals to avoid reinventing mediocre wheels.</li>
        <li>Feed insights into a living opportunity backlog, not a static doc.</li>
      </ul>
    `,
  },
  {
    phase: "04",
    title: "Validate the problem",
    content: `
      <p><strong>Validate that the problem is real, painful and worth solving now.</strong></p>
      <p>
        Not every complaint is a problem and not every problem is worth solving. I stress-test demand before we invest.
      </p>
      <ul>
        <li>Quantify impact: size of population, frequency, and business value.</li>
        <li>Look for behavioural proof (what people actually do, not what they say).</li>
        <li>Kill or deprioritise work that doesn’t pass the value / urgency bar.</li>
      </ul>
    `,
  },
  {
    phase: "05",
    title: "Shape the solution",
    content: `
      <p><strong>Define potential solutions with the team. Define measures of success. Define security measures.</strong></p>
      <p>
        I co-design with engineering, design and data, shaping solution slices that are technically sound, secure and measurable.
      </p>
      <ul>
        <li>Co-create solution options and map trade-offs openly.</li>
        <li>Define leading and lagging metrics for success before a line of code is written.</li>
        <li>Bake in security, privacy and compliance requirements from day zero.</li>
      </ul>
    `,
  },
  {
    phase: "06",
    title: "Test with users",
    content: `
      <p><strong>Validate the solution with users before committing fully.</strong></p>
      <p>
        I prefer small, sharp bets: prototypes, beta programmes and dark launches instead of big-bang releases.
      </p>
      <ul>
        <li>Prototype flows and concepts with just enough fidelity to get honest feedback.</li>
        <li>Run A/B tests or limited rollouts where the data matters.</li>
        <li>Fold learnings back into the scope before we lock the roadmap.</li>
      </ul>
    `,
  },
  {
    phase: "07",
    title: "Ship, learn, repeat",
    content: `
      <p><strong>Epics, stories, tasks & jobs. Define release, marketing & sales pitch. Educate everyone.</strong></p>
      <p>
        Shipping is a team sport. I translate the vision into epics and stories, and make sure GTM and internal teams are
        ready to land the value.
      </p>
      <ul>
        <li>Break work into sequenced epics and stories tied to outcomes, not tickets for the sake of tickets.</li>
        <li>Craft the narrative: why this matters, for whom, and how we’ll talk about it.</li>
        <li>Enable support, sales, success and ops so the product change actually sticks.</li>
      </ul>
      <p>
        Then we loop back into discovery, because the best products are never “done”.
      </p>
    `,
  },
]

export function ProcessSection() {
  return (
    <section className="bg-background py-24 px-4 md:px-6 lg:px-8">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            How I Build Products
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            A repeatable, outcome-driven process from fuzzy idea to shipped, secure, and adopted product.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4 hidden md:block"
          />
          {processSteps.map((step, index) => (
            <div key={step.phase} className="relative mb-10 pl-8 md:pl-10">
              {/* timeline dot */}
              <div className="bg-primary absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                <h4 className="rounded-xl py-2 text-xl font-semibold tracking-tight">
                  {step.title}
                </h4>
                <span className="text-sm font-medium text-muted-foreground">
                  {step.phase}
                </span>
              </div>

              <Card className="my-4 border-border/60 bg-background/60 backdrop-blur-sm">
                <CardContent className="px-4 py-4 md:px-6 md:py-5">
                  <div
                    className="prose dark:prose-invert max-w-none text-foreground prose-p:leading-relaxed prose-ul:mt-2 prose-ul:space-y-1"
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
