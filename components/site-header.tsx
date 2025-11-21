"use client"

import Link from "next/link"
import Image from "next/image"
import { FormEvent, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    setSubscribeMessage(null)
    setSubscribeError(null)

    const trimmed = subscribeEmail.trim()
    if (!isValidEmail(trimmed)) {
      setSubscribeError("Please enter a valid email address.")
      return
    }

    try {
      setSubscribeLoading(true)

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setSubscribeError(
          data?.error ?? "Something went wrong. Please try again.",
        )
      } else {
        setSubscribeMessage("Subscribed successfully.")
        setSubscribeEmail("")
      }
    } catch {
      setSubscribeError("Network error. Please try again.")
    } finally {
      setSubscribeLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            {/* Light mode logo */}
            <Image
              src="/images/Logo_BW.png"
              alt="Zi Logo"
              width={60}
              height={60}
              className="block dark:hidden"
            />
            {/* Dark mode logo (if you have a variant, swap the src) */}
            <Image
              src="/images/Logo_BW.png"
              alt="Zi Logo"
              width={60}
              height={60}
              className="hidden dark:block"
            />
          </div>
        </Link>

        {/* Desktop nav + subscribe + search */}
        <div className="hidden w-full items-center justify-end gap-4 lg:flex">
          <NavigationMenu viewport={false} className="flex">
            <NavigationMenuList>
              {/* Gotta Do */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Gotta Do</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <ListItem href="/product" title="Product">
                      Product-related articles and content.
                    </ListItem>
                    <ListItem href="/dataprotection" title="Data Protection">
                      Data protection, privacy, and security content.
                    </ListItem>
                    <ListItem href="/portfolio" title="Portfolio">
                      Selected projects and case studies.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Wanna Do */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Wanna Do</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <ListItem href="/cook" title="Cook">
                      Cooking content and recipes.
                    </ListItem>
                    <ListItem href="/write" title="Write">
                      Writing, essays, and posts.
                    </ListItem>
                    <ListItem href="/help" title="Help">
                      Ways I help others and resources.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Preach */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Preach</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <ListItem href="/books" title="Books">
                      Book recommendations and notes.
                    </ListItem>
                    <ListItem href="/podcasts" title="Podcasts">
                      Podcasts I recommend or appear on.
                    </ListItem>
                    <ListItem href="/articles" title="Articles">
                      Articles and long-form content.
                    </ListItem>
                    <ListItem href="/media" title="Media">
                      Media appearances and other content.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Touch Base */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/touchbase"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Touch Base
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Subscribe field (desktop) */}
          <form
            onSubmit={handleSubscribe}
            className="hidden items-center gap-2 md:flex"
          >
            <Input
              type="email"
              inputMode="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="Enter your email"
              maxLength={256}
              className="h-9 w-56 text-sm"
              aria-label="Subscribe for updates"
            />
            <Button
              type="submit"
              size="sm"
              disabled={subscribeLoading || !isValidEmail(subscribeEmail)}
            >
              {subscribeLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {/* Search button (desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/search" aria-label="Open search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Right side (mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href="/search" aria-label="Open search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t lg:hidden">
          <nav className="container grid gap-4 py-4 px-4 max-w-7xl mx-auto">
            {/* Mobile subscribe */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Subscribe for updates
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  inputMode="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email"
                  maxLength={256}
                  className="h-9 text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={subscribeLoading || !isValidEmail(subscribeEmail)}
                >
                  {subscribeLoading ? "..." : "Go"}
                </Button>
              </div>
            </form>

            <MobileNavSection title="Gotta Do">
              <MobileNavLink href="/product">Product</MobileNavLink>
              <MobileNavLink href="/dataprotection">Data Protection</MobileNavLink>
              <MobileNavLink href="/portfolio">Portfolio</MobileNavLink>
            </MobileNavSection>

            <MobileNavSection title="Wanna Do">
              <MobileNavLink href="/cook">Cook</MobileNavLink>
              <MobileNavLink href="/write">Write</MobileNavLink>
              <MobileNavLink href="/help">Help</MobileNavLink>
            </MobileNavSection>

            <MobileNavSection title="Preach">
              <MobileNavLink href="/books">Books</MobileNavLink>
              <MobileNavLink href="/podcasts">Podcasts</MobileNavLink>
              <MobileNavLink href="/articles">Articles</MobileNavLink>
              <MobileNavLink href="/media">Media</MobileNavLink>
            </MobileNavSection>

            <MobileNavLink href="/touchbase">Touch Base</MobileNavLink>
          </nav>
        </div>
      )}

      {/* Compact subscribe feedback bar */}
      {(subscribeMessage || subscribeError) && (
        <div
          className={cn(
            "border-t px-4 py-2 text-center text-xs",
            subscribeError
              ? "bg-red-50 text-red-700"
              : "bg-emerald-50 text-emerald-700",
          )}
        >
          {subscribeError ?? subscribeMessage}
        </div>
      )}
    </header>
  )
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

const MobileNavSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="space-y-2">
      <div className="px-3 text-sm font-medium text-muted-foreground">
        {title}
      </div>
      <div className="space-y-1 pl-3">{children}</div>
    </div>
  )
}

const MobileNavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </Link>
  )
}
