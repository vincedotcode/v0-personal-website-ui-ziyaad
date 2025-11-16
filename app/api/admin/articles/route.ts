import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const articles = await sql`
      SELECT * FROM articles 
      ORDER BY created_at DESC
    `
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth()
    
    const data = await request.json()
    const { title, slug, excerpt, content, cover_image, author, published, category, tags } = data

    const result = await sql`
      INSERT INTO articles (title, slug, excerpt, content, cover_image, author, published, category, tags)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${cover_image}, ${author}, ${published}, ${category}, ${tags})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
