import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    let query = 'SELECT * FROM posts'
    const params: any[] = []

    if (section) {
      query += ' WHERE section = $1'
      params.push(section)
    }

    query += ' ORDER BY created_at DESC'

    const result = await sql(query, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('GET /api/admin/posts error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, cover_image, section, status, meta } = body

    const result = await sql(
      `INSERT INTO posts (title, slug, excerpt, content, cover_image, section, status, meta, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [title, slug, excerpt, content, cover_image || null, section, status, JSON.stringify(meta || {})]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('POST /api/admin/posts error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
