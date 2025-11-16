import { NextResponse } from 'next/server'
import sql from '@/lib/db'
import { createSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find admin user
    const admins = await sql`
      SELECT * FROM admins WHERE email = ${email} LIMIT 1
    `

    if (admins.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const admin = admins[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, admin.password_hash)

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    await createSession(admin.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
