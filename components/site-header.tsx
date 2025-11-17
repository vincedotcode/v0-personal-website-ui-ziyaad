"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_BW%20%281%29-J37En6ZBeRlVMWzYhEm162gPDSFXbO.png"
              alt="Zi Logo"
              width={40}
              height={40}
              className="dark:hidden"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Colored%20%281%29-KPLSkJX8X0Co5ddTIV8Y21xTxKSLV4.png"
              alt="Zi Logo"
              width={40}
              height={40}
              className="hidden dark:block"
            />
          </div>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Gotta Do */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Gotta Do</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem href="/product" title="Product">
                    Our flagship products and solutions
                  </ListItem>
                  <ListItem href="/data-protection" title="Data Protection">
                    Privacy policy and data handling
                  </ListItem>
                  <ListItem href="/portfolio" title="Portfolio">
                    View all my work and projects
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
                    Recipes and cooking guides
                  </ListItem>
                  <ListItem href="/write" title="Write">
                    Writing and blog posts
                  </ListItem>
                  <ListItem href="/help" title="Help">
                    Get support and resources
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
                    Book reviews and recommendations
                  </ListItem>
                  <ListItem href="/podcasts" title="Podcasts">
                    Podcast episodes and discussions
                  </ListItem>
                  <ListItem href="/articles" title="Articles">
                    Written content and insights
                  </ListItem>
                  <ListItem href="/media" title="Media">
                    Video and audio content
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Touch Base */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Touch Base
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
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

      {mobileMenuOpen && (
        <div className="border-t lg:hidden">
          <nav className="container grid gap-2 py-4 px-4 max-w-7xl mx-auto">
            <MobileNavSection title="Gotta Do">
              <MobileNavLink href="/product">Product</MobileNavLink>
              <MobileNavLink href="/data-protection">Data Protection</MobileNavLink>
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

            <MobileNavLink href="/contact">Touch Base</MobileNavLink>
          </nav>
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
            className
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
      <div className="px-3 text-sm font-medium text-muted-foreground">{title}</div>
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
