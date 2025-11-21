"use client"

import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop"

const companiesHelpedLogos: LogoItem[] = [
  {
    src: "/images/sega-icon.png",
    alt: "SEGA Europe",
    href: "https://www.sega.com",
    title: "SEGA Europe",
  },
  {
    src: "/images/teradata-icon.png",
    alt: "Teradata",
    href: "https://www.teradata.com",
    title: "Teradata",
  },
  {
    src: "/images/mapp-icon.jpg",
    alt: "Mapp Digital",
    href: "https://mapp.com",
    title: "Mapp Digital",
  },
  {
    src: "/images/stratiko-icon.png",
    alt: "Stratiko",
    href: "https://stratiko.com",
    title: "Stratiko",
  },
  {
    src: "/images/mulyticlabs-icon.png",
    alt: "Mulytic Labs",
    href: "https://mulytic.com",
    title: "Mulytic Labs",
  },
  {
    src: "/images/Tesco-icon.png", // keep the exact filename casing
    alt: "Tesco",
    href: "https://www.tesco.com",
    title: "Tesco",
  },
  {
    src: "/images/Testroniclabs-icon.png",
    alt: "Testronic Labs",
    href: "https://www.testroniclabs.com",
    title: "Testronic Labs",
  },
]

export function CompaniesHelpedSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/10 border-y border-border/40">
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
              Companies I&apos;ve helped
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              From gaming to retail to data platforms.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              I&apos;ve supported teams at consumer brands and B2B platforms, helping them ship
              resilient, privacy-aware experiences at scale.
            </p>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground">
            Logos are representative of past collaborations and projects.
          </p>
        </div>

        <div className="relative">
          <LogoLoop
            logos={companiesHelpedLogos}
            speed={90}
            direction="left"
            logoHeight={60}
            gap={48}
            hoverSpeed={1}
            scaleOnHover
            fadeOut
            fadeOutColor="#0E0E0E"
            ariaLabel="Logos of companies Zi has helped"
          />
        </div>
      </div>
    </section>
  )
}
