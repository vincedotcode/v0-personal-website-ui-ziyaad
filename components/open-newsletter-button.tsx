"use client"

import * as React from "react"

type OpenNewsletterButtonProps = {
  className?: string
  children: React.ReactNode
}

/**
 * Lightweight client-only button that dispatches the global event
 * listened to by NewsletterPopup.
 */
export function OpenNewsletterButton({
  className,
  children,
}: OpenNewsletterButtonProps) {
  const handleClick = () => {
    const event = new CustomEvent("open-newsletter-popup", {
      detail: { source: "podcasts_hero" },
    })
    window.dispatchEvent(event)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}
