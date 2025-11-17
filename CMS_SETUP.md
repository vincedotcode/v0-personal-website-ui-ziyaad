# Custom CMS Setup Guide

This project includes a custom-built CMS (Content Management System) using Neon PostgreSQL database and Vercel Blob storage for images.

## Setup Steps

### 1. Database Setup

The database schema needs to be created in your Neon database. Run the SQL script:

1. Go to the **Scripts** section in 
2. Find `scripts/001-create-cms-schema.sql`
3. Click **Run** to execute the script against your Neon database

This will create:
- Admin user table
- Content tables for: Blog Posts, Articles, Data Protection, Books, Podcasts, Tutorials, Resources, Recipes, Writing, Media
- Necessary indexes for performance

### 2. Admin Access

After running the database script, you can access the admin panel at:

**URL:** `/admin`

**Default Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default password immediately after first login!

### 3. Environment Variables

The following environment variables are already configured:
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token for image uploads
- `JWT_SECRET` - Used for admin authentication sessions

### 4. Using the CMS

#### Admin Dashboard (`/admin`)
- View statistics for all content types
- Quick navigation to manage each content section

#### Managing Content
Each content type has its own admin page:
- `/admin/blog` - Blog posts
- `/admin/articles` - Articles
- `/admin/data-protection` - Data protection content
- More admin pages can be added for other content types

#### Content Features
- Create, Read, Update, Delete (CRUD) operations
- Image upload via Vercel Blob
- Rich text content
- Slug generation (URL-friendly)
- Published/Draft status
- Search and filtering

### 5. Content Types

#### Blog Posts
- Title, slug, excerpt, content
- Featured image
- Category and tags
- Published status

#### Articles
- Similar structure to blog posts
- Separate section for longer-form content

#### Data Protection
- Privacy policies, terms, legal documents
- Category organization

#### Other Content Types
The schema includes tables for:
- Books (with ratings, cover images)
- Podcasts (with audio URLs, duration)
- Tutorials (with difficulty levels)
- Resources (external links, downloads)
- Recipes (ingredients, cooking time)
- Writing (creative writing, stories)
- Media (videos, galleries)

### 6. API Routes

All CMS operations use these API endpoints:
- `GET /api/admin/[content-type]` - List all items
- `POST /api/admin/[content-type]` - Create new item
- `PUT /api/admin/[content-type]/[id]` - Update item
- `DELETE /api/admin/[content-type]/[id]` - Delete item
- `POST /api/upload` - Upload images to Vercel Blob

### 7. Security

- JWT-based authentication
- Protected admin routes
- Password hashing with bcryptjs
- Secure database queries using parameterized statements

### 8. Frontend Integration

Pages automatically fetch from the database:
- `/blog` - Displays all published blog posts
- `/blog/[slug]` - Individual blog post
- `/articles` - Displays all published articles
- `/articles/[slug]` - Individual article
- `/data-protection` - Lists data protection documents
- And more...

## Need Help?

If you encounter any issues:
1. Check that the SQL script was executed successfully
2. Verify environment variables are set correctly
3. Check browser console for any errors
4. Ensure you're logged in to access admin pages
