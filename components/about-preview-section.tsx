"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ParticleButton } from "@/components/particle-button"

export function AboutPreviewSection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/10 border-y border-border/40">
      <div className="container max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* LEFT SIDE — TEXT */}
        <div className="space-y-6">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            About Me
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Who I am <span className="text-primary">& why it matters.</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            I’m Zi — a product lead with a security-first mindset.
            My work sits at the collision of product, privacy, data,
            and practical engineering. For the last 12+ years, I’ve been
            helping organisations across gaming, retail, martech and B2B SaaS
            ship the things customers actually want — not what internal politics demand.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            I simplify complexity. Whether it’s designing authentication
            systems, reducing release risks, mapping customer journeys,
            or advising founders on product direction — my work is built
            on clear thinking, deep listening, and decisive execution.
          </p>

          <div className="pt-4">
            <ParticleButton size="lg" asChild>
              <Link href="/preach">
                Read my full story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </ParticleButton>
          </div>
        </div>

        {/* RIGHT SIDE — VISUAL CARD */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl opacity-40" />

          <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-background/60 backdrop-blur-md shadow-xl">
            <img
              src="/hero-image.jpg"
              alt="Zi portrait"
              className="w-full h-[420px] object-cover object-center scale-[1.02]"
            />

            <div className="p-6 space-y-2 bg-background/80 border-t border-border/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold tracking-tight">
                Ziyaad Ben Eydatoula
              </h3>
              <p className="text-sm text-muted-foreground">
                Product & Security-First Consultant
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
