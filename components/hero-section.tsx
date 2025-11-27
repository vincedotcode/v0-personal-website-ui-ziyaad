"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { ParticleButton } from "@/components/particle-button"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import { RippleGridBackground } from "@/components/reactbits-background"
import Orb from "@/components/ui/orb"
import ProfileCard from "@/components/profile-card"
import { trackEvent } from "@/lib/analytics"

export function HeroSection() {
    const router = useRouter()
    const [resumeHref, setResumeHref] = useState("/assets/ziyaad-ben-eydatoula-cv.pdf")

    useEffect(() => {
        let isMounted = true
        fetch("/api/resume")
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (!isMounted) return
                const url = data?.resource?.url as string | undefined
                if (url) setResumeHref(url)
            })
            .catch(() => {
                // ignore and fall back to bundled asset
            })
        return () => {
            isMounted = false
        }
    }, [])

    const logCta = (action: string) =>
        trackEvent("hero_cta_click", {
            event_category: "engagement",
            event_label: action,
        })

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0">
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover
                    hue={180}
                    forceHoverState={false}
                />
            </div>
            <RippleGridBackground />

            <div className="container relative z-10 py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
                    {/* Text side */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-1 text-xs tracking-[0.2em] uppercase">
                            <span>Product Management Consultant</span>
                            <span className="h-1 w-1 rounded-full bg-primary/70" />
                            <span>Security-First Mindset</span>
                        </div>

                        <div className="space-y-4">
                            {/* Main headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] lg:text-[2.9rem] font-semibold tracking-tight leading-tight text-balance">
                                <span className="block">Ship Products That Actually Matter</span>
                                <span className="block">— Without the Usual Chaos</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance max-w-xl">
                                Hi, I&apos;m Zi. I help product teams cut through the noise, ship faster, and build
                                things customers genuinely want. No fluff. No theory. Just proven frameworks that work.
                            </p>

                            {/* Social proof snippet */}
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Trusted by{" "}
                                <span className="font-medium">
                                    SEGA, Teradata, Mapp Digital, Tesco
                                </span>{" "}
                                and ambitious startups worldwide.
                            </p>
                        </div>

                        {/* Trust indicators row */}
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs md:text-sm text-muted-foreground max-w-md">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                    ✓
                                </span>
                                <span>12+ Years in Product</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                    ✓
                                </span>
                                <span>50+ Products Launched</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                    ✓
                                </span>
                                <span>50M+ Users Reached</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                    ✓
                                </span>
                                <span>Security-First Approach</span>
                            </div>
                        </div>

                        {/* Intersection line */}

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-4">
                            <ParticleButton size="lg" asChild>
                                <Link
                                    href="/touchbase"
                                    onClick={() => logCta("touchbase_primary")}
                                >
                                    Book a conversation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </ParticleButton>

                            <ParticleButton size="lg" variant="outline" asChild>
                                <Link
                                    href={resumeHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    prefetch={false}
                                    onClick={() => logCta("cv_download_hero")}
                                >
                                    Download C.V.
                                </Link>
                            </ParticleButton>

                            <Link
                                href="/portfolio"
                                onClick={() => logCta("portfolio_link")}
                                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                            >
                                View portfolio
                            </Link>
                        </div>

                        {/* Quote */}
                        <div className="pt-4 border-l-0 lg:border-l lg:pl-4 border-muted flex flex-col gap-1">
                            <p className="italic text-xs md:text-sm text-muted-foreground">
                                “Be, do and think good!”
                            </p>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                — Zi
                            </span>
                        </div>
                    </div>

                    {/* ProfileCard side */}
                    <div className="w-full max-w-sm mx-auto lg:mx-0">
                        <ProfileCard
                            name="Ziyaad Ben Eydatoula"
                            title="Product & Security-First Consultant"
                            handle="@The_Zi"
                            status="Available for product challenges"
                            contactText="Book a conversation"
                            avatarUrl="/hero-image.jpg"
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => {
                                logCta("profile_contact_button")
                                router.push("/touchbase")
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
