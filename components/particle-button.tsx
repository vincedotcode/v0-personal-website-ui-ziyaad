"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export function ParticleButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        opacity: 1;
      `

      document.body.appendChild(particle)

      const angle = Math.random() * Math.PI * 2
      const velocity = 2 + Math.random() * 2
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      let posX = x
      let posY = y
      let opacity = 1

      const animate = () => {
        posX += vx
        posY += vy
        opacity -= 0.02

        particle.style.left = posX + "px"
        particle.style.top = posY + "px"
        particle.style.opacity = opacity.toString()

        if (opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          particle.remove()
        }
      }

      animate()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        createParticle(e.clientX, e.clientY)
      }
    }

    button.addEventListener("mousemove", handleMouseMove)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <Button ref={buttonRef} {...props}>
      {children}
    </Button>
  )
}
