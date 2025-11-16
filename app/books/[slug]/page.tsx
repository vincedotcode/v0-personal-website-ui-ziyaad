import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

          <div className="grid gap-8 md:grid-cols-[250px,1fr]">
            {book.image && (
              <div className="space-y-4">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {meta.amazonUrl && (
                  <Button asChild className="w-full">
                    <Link href={meta.amazonUrl} target="_blank" rel="noopener noreferrer">
                      Buy on Amazon
                    </Link>
                  </Button>
                )}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="default">{book.category}</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                  {book.title}
                </h1>
                {book.author && (
                  <p className="text-xl text-muted-foreground">by {book.author}</p>
                )}
                
                <div className="grid gap-3 text-sm">
                  {meta.publisher && (
                    <div className="flex gap-2">
                      <span className="font-medium">Publisher:</span>
                      <span className="text-muted-foreground">{meta.publisher}</span>
                    </div>
                  )}
                  {meta.publishDate && (
                    <div className="flex gap-2">
                      <span className="font-medium">Published:</span>
                      <span className="text-muted-foreground">{meta.publishDate}</span>
                    </div>
                  )}
                  {meta.isbn && (
                    <div className="flex gap-2">
                      <span className="font-medium">ISBN:</span>
                      <span className="text-muted-foreground font-mono">{meta.isbn}</span>
                    </div>
                  )}
                  {meta.pages && (
                    <div className="flex gap-2">
                      <span className="font-medium">Pages:</span>
                      <span className="text-muted-foreground">{meta.pages}</span>
                    </div>
                  )}
                  {meta.rating && (
                    <div className="flex gap-2">
                      <span className="font-medium">Rating:</span>
                      <span className="text-muted-foreground">{'⭐'.repeat(Math.round(meta.rating))} ({meta.rating}/5)</span>
                    </div>
                  )}
                </div>
              </div>

              <Card>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
                  <h3>About This Book</h3>
                  <div dangerouslySetInnerHTML={{ __html: book.content }} />
                </CardContent>
              </Card>

              {meta.keyTakeaways && Array.isArray(meta.keyTakeaways) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Takeaways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {meta.keyTakeaways.map((takeaway: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <BookOpen className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <span className="leading-relaxed">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
