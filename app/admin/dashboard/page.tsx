import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, Newspaper, Shield, Mic, GraduationCap, LinkIcon, ChefHat, PenTool } from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  const sections = [
    { title: 'Blog Posts', href: '/admin/blog', icon: FileText, description: 'Manage blog posts' },
    { title: 'Articles', href: '/admin/articles', icon: Newspaper, description: 'Manage articles' },
    { title: 'Data Protection', href: '/admin/data-protection', icon: Shield, description: 'Manage data protection content' },
    { title: 'Books', href: '/admin/books', icon: BookOpen, description: 'Manage book reviews' },
    { title: 'Podcasts', href: '/admin/podcasts', icon: Mic, description: 'Manage podcast episodes' },
    { title: 'Tutorials', href: '/admin/tutorials', icon: GraduationCap, description: 'Manage tutorials' },
    { title: 'Resources', href: '/admin/resources', icon: LinkIcon, description: 'Manage resources' },
    { title: 'Cook Recipes', href: '/admin/cook', icon: ChefHat, description: 'Manage recipes' },
    { title: 'Write Posts', href: '/admin/write', icon: PenTool, description: 'Manage writing posts' },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your CMS content</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <Button type="submit" variant="outline">Logout</Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
