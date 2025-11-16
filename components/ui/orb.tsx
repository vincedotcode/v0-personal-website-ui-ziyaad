"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface OrbProps {
  hoverIntensity?: number
  rotateOnHover?: boolean
  hue?: number
  forceHoverState?: boolean
  className?: string
}

export default function Orb({
  hoverIntensity = 0.5,
  rotateOnHover = true,
  hue = 0,
  forceHoverState = false,
  className,
}: OrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const orbX = useRef(0)
  const orbY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return
      const rect = orbRef.current.getBoundingClientRect()
      mouseX.current = (e.clientX - rect.left - rect.width / 2) / rect.width
      mouseY.current = (e.clientY - rect.top - rect.height / 2) / rect.height
    }

    const animate = () => {
      orbX.current += (mouseX.current - orbX.current) * 0.1
      orbY.current += (mouseY.current - orbY.current) * 0.1

      if (orbRef.current) {
        const intensity = forceHoverState ? hoverIntensity : hoverIntensity * 0.5
        const translateX = orbX.current * 50 * intensity
        const translateY = orbY.current * 50 * intensity
        const rotateX = rotateOnHover ? -orbY.current * 20 : 0
        const rotateY = rotateOnHover ? orbX.current * 20 : 0

        orbRef.current.style.transform = `
          translate(${translateX}px, ${translateY}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `
      }

      requestAnimationFrame(animate)
    }

    const parent = orbRef.current?.parentElement
    parent?.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      parent?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [hoverIntensity, rotateOnHover, forceHoverState])

  return (
    <div
      ref={orbRef}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "h-[500px] w-[500px] rounded-full opacity-40 blur-[100px] transition-all duration-300",
        className
      )}
      style={{
        background: `radial-gradient(circle, hsl(${hue}, 100%, 50%), transparent 70%)`,
      }}
    />
  )
}
