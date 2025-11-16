import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Link from "next/link"
import sql from "@/lib/db"

export const metadata = {
  title: "Books - Zi's Portfolio",
  description: "My curated collection of recommended books.",
}

export const revalidate = 60

export default async function BooksPage() {
  const books = await sql`
    SELECT * FROM posts 
    WHERE section = 'books'::post_section
      AND status = 'published'
    ORDER BY COALESCE(published_at, created_at) DESC
  `

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Badge>Books</Badge>
            <div className="flex flex-col items-center justify-center gap-4">
              <LayoutTextFlip
                text="Books that"
                words={["Inspire", "Teach", "Transform", "Challenge"]}
                duration={3000}
              />
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              My curated collection of books that have shaped my thinking about software, design, and life.
            </p>
          </div>

          {/* Books Grid */}
          {books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books found. Add content via the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => {
                const bookAuthor = book.meta?.book_author || book.author_name
                const rating = book.meta?.rating ? parseInt(book.meta.rating) : 5
                const review = book.meta?.review || book.excerpt
                
                return (
                  <Link key={book.id} href={`/books/${book.slug}`}>
                    <Card className="transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{book.category || 'Book'}</Badge>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        <CardTitle className="text-balance">{book.title}</CardTitle>
                        {bookAuthor && (
                          <CardDescription>by {bookAuthor}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
