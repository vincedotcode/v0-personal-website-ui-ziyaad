import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const articles = await sql`
      SELECT * FROM data_protection_articles 
      ORDER BY created_at DESC
    `
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching data protection articles:', error)
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
    const { title, slug, content, category, published } = data

    const result = await sql`
      INSERT INTO data_protection_articles (title, slug, content, category, published)
      VALUES (${title}, ${slug}, ${content}, ${category}, ${published})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error creating data protection article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
