// TypeScript types for Strapi content

export interface StrapiImage {
  url: string
  alternativeText?: string
  width?: number
  height?: number
}

export interface BlogPost {
  id: number
  title: string
  description: string
  slug: string
  content: string
  category: string
  readTime: string
  publishedAt: string
  author?: string
  coverImage?: StrapiImage
}

export interface Article {
  id: number
  title: string
  excerpt: string
  slug: string
  content: string
  category: string
  readTime: string
  publishedAt: string
  author?: string
  coverImage?: StrapiImage
}

export interface DataProtectionArticle {
  id: number
  title: string
  description: string
  slug: string
  content: string
  icon?: string
  publishedAt: string
}

export interface Book {
  id: number
  title: string
  author: string
  description: string
  slug: string
  content?: string
  isbn?: string
  publishedYear?: number
  coverImage?: StrapiImage
  rating?: number
  publishedAt: string
}

export interface Podcast {
  id: number
  title: string
  description: string
  slug: string
  episodeNumber?: number
  duration: string
  publishedAt: string
  audioUrl?: string
  coverImage?: StrapiImage
}

export interface Tutorial {
  id: number
  title: string
  description: string
  slug: string
  content: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  publishedAt: string
  coverImage?: StrapiImage
}

export interface Resource {
  id: number
  title: string
  description: string
  slug: string
  content?: string
  category: string
  resourceType: string
  url?: string
  publishedAt: string
}

export interface Recipe {
  id: number
  title: string
  description: string
  slug: string
  content: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: string
  publishedAt: string
  coverImage?: StrapiImage
}

export interface Writing {
  id: number
  title: string
  excerpt: string
  slug: string
  content: string
  category: string
  publishedAt: string
}
