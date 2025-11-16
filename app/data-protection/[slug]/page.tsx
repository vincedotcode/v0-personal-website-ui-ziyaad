import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Shield, Lock, Eye, Database, FileText, Mail } from 'lucide-react'
import Link from "next/link"

const articles = {
  "data-security-best-practices": {
    title: "Data Security Best Practices",
    date: "January 10, 2025",
    icon: Shield,
    content: `
      <h2>Introduction to Data Security</h2>
      <p>Data security is the foundation of trust in digital applications. We implement industry-leading security measures to protect your data at every level.</p>
      
      <h2>Encryption Standards</h2>
      <p>All data is encrypted both at rest and in transit using AES-256 encryption and TLS 1.3 protocols. This ensures that even if data is intercepted, it cannot be read without proper authorization.</p>
      
      <h3>Key Security Measures</h3>
      <ul>
        <li>End-to-end encryption for all sensitive data</li>
        <li>Regular security audits and penetration testing</li>
        <li>Multi-factor authentication for all accounts</li>
        <li>Automated threat detection and response systems</li>
      </ul>
      
      <h2>Security Monitoring</h2>
      <p>Our security team monitors systems 24/7 to detect and respond to potential threats in real-time.</p>
      
      <h2>Conclusion</h2>
      <p>Your data security is our top priority. We continuously update our security practices to stay ahead of emerging threats.</p>
    `,
  },
  // Add more articles as needed
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }))
}

export default function DataProtectionArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link href="/data-protection">
            <Button className="mt-4">Back to Data Protection</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = article.icon

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <article className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Back Button */}
          <Link href="/data-protection">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Data Protection
            </Button>
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconComponent className="h-8 w-8" />
            </div>
            <Badge>Data Protection</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>
          </div>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
