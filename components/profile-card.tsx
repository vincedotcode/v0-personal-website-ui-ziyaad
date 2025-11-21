"use client"

import React, { useRef, useState, MouseEvent } from "react"
import Image from "next/image"

type ProfileCardProps = {
  avatarUrl: string
  name: string
  title: string
  handle?: string
  status?: string
  contactText?: string
  showUserInfo?: boolean
  onContactClick?: () => void
  className?: string
  enableTilt?: boolean
  enableMobileTilt?: boolean
}

export default function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status,
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  className = "",
  enableTilt = true,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = useState<string>("rotateX(0deg) rotateY(0deg)")
  const [glowPos, setGlowPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const percentX = x / rect.width - 0.5
    const percentY = y / rect.height - 0.5

    const rotateY = percentX * 14
    const rotateX = -percentY * 14

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    if (!enableTilt) return
    setTransform("rotateX(0deg) rotateY(0deg)")
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div className={`relative mx-auto w-full max-w-sm perspective-1000 ${className}`}>
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] opacity-0 blur-3xl transition-opacity duration-300 md:opacity-60"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(34,197,94,0.4), transparent 60%)`,
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        className="group relative w-full rounded-[2rem] border border-white/10 bg-black/60 p-[1px] shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-150 ease-out will-change-transform"
      >
        <div className="rounded-[1.9rem] bg-gradient-to-b from-white/5 via-white/2 to-black/30 p-6 flex flex-col items-center text-center">
          
          {/* BIG Avatar */}
          <div className="relative h-40 w-40 rounded-3xl overflow-hidden border border-white/15 shadow-xl">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>

          {/* Name + Title */}
          <div className="mt-6 flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-zinc-300">{title}</p>
          </div>

          {/* Handle + Status */}
          {showUserInfo && (
            <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-300">
              {handle && (
                <p className="flex items-center justify-center gap-2">
                  <span className="inline-block h-5 w-5 rounded-full bg-emerald-500/20 text-[10px] flex items-center justify-center text-emerald-300">@</span>
                  {handle}
                </p>
              )}

              {status && (
                <p className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  {status}
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          <button
            type="button"
            onClick={onContactClick}
            className="mt-6 inline-flex items-center justify-center w-full rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-100 shadow-xl transition-colors hover:bg-emerald-500/30"
          >
            {contactText}
          </button>
        </div>
      </div>
    </div>
  )
}
