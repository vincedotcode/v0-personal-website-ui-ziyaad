import Link from "next/link"
import { SquaresBackground } from "@/components/reactbits-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <SquaresBackground />
      
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-5xl font-bold">404</span>
              </div>
              <CardTitle className="text-3xl sm:text-4xl">Page Not Found</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Sorry, we couldn't find the page you're looking for. It might have been moved,
                deleted, or perhaps never existed.
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
              
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  If you believe this is a mistake, please{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact me
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link
              href="/about"
              className="group rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                About Me
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn more about my background
              </p>
            </Link>
            
            <Link
              href="/blog"
              className="group rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                Blog
              </h3>
              <p className="text-sm text-muted-foreground">
                Read my latest articles
              </p>
            </Link>
            
            <Link
              href="/contact"
              className="group rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                Contact
              </h3>
              <p className="text-sm text-muted-foreground">
                Get in touch with me
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
