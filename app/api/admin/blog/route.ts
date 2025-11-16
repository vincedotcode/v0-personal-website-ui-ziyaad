import { NextResponse } from "next/server"
import sql from "@/lib/db"
import { requireAuth } from "@/lib/auth"

// GET all blog posts (mapped to section = 'articles')
export async function GET() {
  try {
    const posts = await sql/*sql*/`
      SELECT
        id,
        title,
        slug,
        section,
        excerpt,
        cover_image,
        author_name,
        category,
        tags,
        status,
        published_at,
        created_at,
        updated_at,
        meta
      FROM posts
      WHERE section = 'articles'::post_section
      ORDER BY COALESCE(published_at, created_at) DESC
    `

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    )
  }
}

// CREATE new blog post (into posts.section = 'articles')
export async function POST(request: Request) {
  try {
    await requireAuth()

    const data = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      author,
      category,
      tags,
    } = data

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "title, slug and content are required" },
        { status: 400 },
      )
    }

    const result = await sql/*sql*/`
      INSERT INTO posts (
        title,
        slug,
        section,
        excerpt,
        content,
        cover_image,
        author_name,
        category,
        tags,
        status,
        published_at,
        meta
      )
      VALUES (
        ${title},
        ${slug},
        'articles'::post_section,       -- blog = articles section
        ${excerpt},
        ${content},
        ${cover_image},
        ${author || "Zi"},
        ${category},
        ${tags || []},
        'published'::post_status,
        NOW(),
        ${JSON.stringify({ source: "admin-blog", category, tags })}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error: any) {
    console.error("Error creating blog post:", error)

    // Optional: handle unique constraint on slug more nicely
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      )
    }

    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    )
  }
}
