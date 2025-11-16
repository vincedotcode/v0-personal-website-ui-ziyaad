"use client"

import { cn } from "@/lib/utils"

export function ColorfulText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-colorful-text"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
