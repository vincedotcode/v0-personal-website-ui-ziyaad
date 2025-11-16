import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Zi's Portfolio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building beautiful and functional web experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
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
                  href="/portfolio"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tutorials"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zi's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
