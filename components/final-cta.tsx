"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ParticleButton } from "@/components/particle-button"
import { trackEvent } from "@/lib/analytics"

export function FinalCtaSection() {
  const logCta = (label: string) =>
    trackEvent("final_cta_click", {
      event_category: "engagement",
      event_label: label,
    })

  return (
    <section
      className="relative overflow-hidden py-24 px-4 md:px-6 lg:px-8
                 bg-gradient-to-br from-background via-primary/8 to-primary/20
                 dark:bg-gradient-to-br dark:from-[#0A0D12] dark:via-[#0F1419] dark:to-[#141920]
                 dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.52_0.08_180/0.3)_0%,transparent_70%)]"
    >
     
      {/* Content */}
      <div className="relative z-10">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-primary/80">
            Every story can be epic
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Let&apos;s make yours too.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            If you&apos;re ready to ship thoughtful products, tell better stories, or just bring a
            little more good into the world, I&apos;d love to hear what you&apos;re working on.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ParticleButton size="lg" asChild>
              <Link
                href="/touchbase"
                onClick={() => logCta("touchbase_footer")}
              >
                Touch Base
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </ParticleButton>

            <ParticleButton size="lg" variant="outline" asChild>
              <Link
                href="/assets/ziyaad-ben-eydatoula-cv.pdf"
                target="_blank"
                onClick={() => logCta("cv_download_footer")}
              >
                Download C.V.
              </Link>
            </ParticleButton>
          </div>
        </div>
      </div>
    </section>
  )
}
