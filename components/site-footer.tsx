import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 – About & Brand */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Ship Products That Matter</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              I help product teams cut through the noise, ship faster, and build things
              customers genuinely want. No fluff. No theory. Just proven frameworks that work.
            </p>
            <p className="text-sm text-muted-foreground">
              📍Based in London, U.K. 🌍 Available globally
            </p>
          </div>

          {/* Column 2 – Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/touchbase"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Touch Base
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 – Connect */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline-offset-2 hover:underline"
              >
                zi@ziyaadbeneydatoula.com
              </a>
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.linkedin.com/in/ziyaadbeneydatoula/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/The_Zi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground md:flex md items-center md:justify-between md:text-left">
  <p className="mb-3 md:mb-0">
    © {year} Ziyaad Ben Eydatoula. All rights reserved.
  </p>

  <div className="flex flex-wrap items-center justify-center gap-4">
    <Link
      href="/privacy"
      className="transition-colors hover:text-foreground"
    >
      Privacy Policy
    </Link>

    <Link
      href="/cookies"
      className="transition-colors hover:text-foreground"
    >
      Cookie Policy
    </Link>

    <Link
      href="/terms"
      className="transition-colors hover:text-foreground"
    >
      Terms of Use
    </Link>
  </div>
</div>

      </div>
    </footer>
  )
}
