import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, BookOpen, User } from 'lucide-react'
import Link from "next/link"
import sql from "@/lib/db"
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await sql`SELECT slug FROM posts WHERE section = 'books' AND status = 'published'`
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND section = 'books' AND status = 'published'
    LIMIT 1
  `
  
  const book = result[0]

  if (!book) {
    notFound()
  }

  const meta = book.meta || {}

  return (
    <div className="relative min-h-screen">
      <RippleGridBackground />
      
      <article className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-[200px,1fr]">
            {book.image && (
              <div className="relative aspect-[2/3] w-full max-w-[200px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <Badge>{book.category}</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {book.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {book.author}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(book.created_at).toLocaleDateString()}
                </div>
              </div>
              {meta.isbn && (
                <p className="text-sm text-muted-foreground">ISBN: {meta.isbn}</p>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: book.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
