"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShow(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="p-4 shadow-lg">
        <h3 className="mb-2 text-sm font-semibold">Cookie Notice</h3>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          We use cookies to enhance your browsing experience and analyze site traffic. By
          clicking "Accept", you consent to our use of cookies.
        </p>
        <div className="flex gap-2">
          <Button onClick={acceptCookies} size="sm" className="flex-1">
            Accept
          </Button>
          <Button onClick={declineCookies} variant="outline" size="sm" className="flex-1">
            Decline
          </Button>
        </div>
      </Card>
    </div>
  )
}
