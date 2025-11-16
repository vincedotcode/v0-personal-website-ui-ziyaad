import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { requireAuth } from '@/lib/auth'

// GET all blog posts
export async function GET() {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// CREATE new blog post
export async function POST(request: Request) {
  try {
    await requireAuth()
    
    const data = await request.json()
    const { title, slug, excerpt, content, cover_image, author, published, category, tags } = data

    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, published, category, tags)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${cover_image}, ${author}, ${published}, ${category}, ${tags})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
