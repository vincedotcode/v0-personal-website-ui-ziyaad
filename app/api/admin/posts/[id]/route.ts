import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, excerpt, content, cover_image, section, status, meta } = body

    const result = await sql(
      `UPDATE posts 
       SET title = $1, slug = $2, excerpt = $3, content = $4, cover_image = $5,
           section = $6, status = $7, meta = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [title, slug, excerpt, content, cover_image || null, section, status, JSON.stringify(meta || {}), parseInt(id)]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('PUT /api/admin/posts/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await sql('DELETE FROM posts WHERE id = $1', [parseInt(id)])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/posts/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
