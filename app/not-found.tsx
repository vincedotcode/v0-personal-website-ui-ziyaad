import Link from "next/link"
import { SquaresBackground } from "@/components/reactbits-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <SquaresBackground />

      <div className="container flex justify-center">
        <div className="w-full max-w-2xl">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-5xl font-bold">404</span>
              </div>
              <CardTitle className="text-3xl sm:text-4xl">Page Not Found</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
                moved, deleted, or perhaps never existed.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>

                <Button asChild variant="outline" className="flex-1">
                  <Link href="/portfolio">
                    <Search className="mr-2 h-4 w-4" />
                    View Portfolio
                  </Link>
                </Button>
              </div>

              <Button asChild variant="ghost" className="w-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  If you believe this is a mistake, please{" "}
                  <Link href="/touchbase" className="text-primary hover:underline">
                    contact me
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

        
        </div>
      </div>
    </div>
  )
}
