import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Package, Zap, Shield, Users } from 'lucide-react'
import Link from "next/link"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"

export const metadata = {
  title: "Product - Zi's Portfolio",
  description: "Discover our flagship products and solutions designed to solve real problems.",
}

const products = [
  {
    title: "TaskFlow Pro",
    description: "A powerful task management solution with real-time collaboration, automated workflows, and intelligent prioritization.",
    icon: Zap,
    features: ["Real-time collaboration", "Smart automation", "Advanced analytics", "Mobile apps"],
    link: "#",
  },
  {
    title: "SecureAuth Suite",
    description: "Enterprise-grade authentication and authorization platform with multi-factor authentication and SSO capabilities.",
    icon: Shield,
    features: ["Multi-factor auth", "Single sign-on", "Role-based access", "Audit logs"],
    link: "#",
  },
  {
    title: "TeamHub Connect",
    description: "All-in-one team communication and collaboration platform with video calls, messaging, and file sharing.",
    icon: Users,
    features: ["HD video calls", "Team messaging", "File sharing", "Screen sharing"],
    link: "#",
  },
]

export default function ProductPage() {
  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Products</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Products that"
                words={["Scale", "Innovate", "Transform", "Empower"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Innovative solutions designed to help teams work smarter, faster, and more securely.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <product.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-balance">{product.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href={product.link}>
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
