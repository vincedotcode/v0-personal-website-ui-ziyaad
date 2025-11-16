"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export function RippleGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 40
    const ripples: { x: number; y: number; radius: number; maxRadius: number }[] = []

    const createRipple = (x: number, y: number) => {
      ripples.push({ x, y, radius: 0, maxRadius: 200 })
    }

    const getGridColor = () => {
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      return isDark ? "rgba(60, 132, 124, 0.15)" : "rgba(60, 132, 124, 0.1)"
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = getGridColor()

      // Draw grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          let offset = 0

          // Calculate offset based on ripples
          ripples.forEach((ripple) => {
            const dx = x - ripple.x
            const dy = y - ripple.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < ripple.radius && distance > ripple.radius - 50) {
              const wave = Math.sin((distance - ripple.radius) * 0.1) * 20
              offset += wave
            }
          })

          ctx.beginPath()
          ctx.arc(x, y + offset, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Update ripples
      ripples.forEach((ripple, index) => {
        ripple.radius += 2
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(index, 1)
        }
      })

      requestAnimationFrame(draw)
    }

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY)
    }

    canvas.addEventListener("click", handleClick)
    draw()

    const interval = setInterval(() => {
      createRipple(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    }, 3000)

    return () => {
      canvas.removeEventListener("click", handleClick)
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full"
    />
  )
}

export function OrbBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
    </div>
  )
}

export function SquaresBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-3xl" />
    </div>
  )
}
