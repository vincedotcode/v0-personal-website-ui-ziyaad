"use client"

import { useEffect } from "react"
import Link from "next/link"
import { SquaresBackground } from "@/components/reactbits-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-[80vh] flex items-center">
      <SquaresBackground />
      
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2 border-destructive/20">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-10 w-10" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl">Something Went Wrong</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                An unexpected error occurred while processing your request. Don't worry, it's
                not your fault!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === "development" && error.message && (
                <div className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto">
                  <p className="text-destructive">{error.message}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => reset()} className="flex-1">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  If this problem persists, please{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact me
                  </Link>{" "}
                  and I'll look into it.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
