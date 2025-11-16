# Strapi CMS Integration Guide

This project uses Strapi as a headless CMS for managing dynamic content. Follow these steps to set up Strapi and connect it to your Next.js application.

## Environment Variables

Add these environment variables to your project:

\`\`\`env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
\`\`\`

For production, replace `http://localhost:1337` with your Strapi production URL.

## Strapi Content Types

Create the following content types in your Strapi admin panel:

### 1. Blog Post (blog-posts)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- category (Text)
- readTime (Text)
- author (Text)
- publishedAt (DateTime)
- coverImage (Media)

### 2. Article (articles)
- title (Text, required)
- excerpt (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- category (Text)
- readTime (Text)
- author (Text)
- publishedAt (DateTime)
- coverImage (Media)

### 3. Data Protection Article (data-protection-articles)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- icon (Enumeration: shield, lock, eye, database, fileText, mail)
- publishedAt (DateTime)

### 4. Book (books)
- title (Text, required)
- author (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text)
- isbn (Text)
- publishedYear (Number)
- rating (Decimal)
- publishedAt (DateTime)
- coverImage (Media)

### 5. Podcast (podcasts)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- episodeNumber (Number)
- duration (Text)
- audioUrl (Text)
- publishedAt (DateTime)
- coverImage (Media)

### 6. Tutorial (tutorials)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- category (Text)
- difficulty (Enumeration: Beginner, Intermediate, Advanced)
- duration (Text)
- publishedAt (DateTime)
- coverImage (Media)

### 7. Resource (resources)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text)
- category (Text)
- resourceType (Text)
- url (Text)
- publishedAt (DateTime)

### 8. Recipe (recipes)
- title (Text, required)
- description (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- prepTime (Text)
- cookTime (Text)
- servings (Number)
- difficulty (Text)
- publishedAt (DateTime)
- coverImage (Media)

### 9. Writing (writings)
- title (Text, required)
- excerpt (Text, required)
- slug (UID, required, based on title)
- content (Rich Text, required)
- category (Text)
- publishedAt (DateTime)

## API Permissions

In Strapi Admin Panel:
1. Go to Settings → Roles → Public
2. Enable `find` and `findOne` permissions for all content types listed above

## Getting Started

1. Install Strapi (if not already installed):
\`\`\`bash
npx create-strapi-app@latest strapi-cms --quickstart
\`\`\`

2. Create the content types as described above
3. Add some test content
4. Generate an API token (Settings → API Tokens → Create new API Token)
5. Add the environment variables to your Next.js project
6. Restart your Next.js development server

## Testing

Visit the following pages to see your Strapi content:
- `/blog` - Blog posts
- `/articles` - Articles
- `/data-protection` - Data protection articles
- `/books` - Books
- `/podcasts` - Podcasts
- `/tutorials` - Tutorials
- `/resources` - Resources
- `/cook` - Recipes
- `/write` - Writings

If no content is displayed, check:
1. Strapi is running
2. Environment variables are correct
3. API permissions are set correctly
4. Content is published in Strapi
