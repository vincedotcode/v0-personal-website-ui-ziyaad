// Strapi API configuration and helper functions

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiItem {
  id: number
  attributes: Record<string, any>
}

// Generic fetch function for Strapi
async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  const response = await fetch(`${STRAPI_URL}/api${path}`, mergedOptions)

  if (!response.ok) {
    console.error(`Strapi API error: ${response.status} ${response.statusText}`)
    throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`)
  }

  return response.json()
}

// Blog Posts
export async function getBlogPosts() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/blog-posts?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

// Articles
export async function getArticles() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/articles?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticle(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/articles?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error)
    return null
  }
}

// Data Protection
export async function getDataProtectionArticles() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/data-protection-articles?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching data protection articles:', error)
    return []
  }
}

export async function getDataProtectionArticle(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/data-protection-articles?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching data protection article ${slug}:`, error)
    return null
  }
}

// Books
export async function getBooks() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/books?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

export async function getBook(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/books?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching book ${slug}:`, error)
    return null
  }
}

// Podcasts
export async function getPodcasts() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/podcasts?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching podcasts:', error)
    return []
  }
}

export async function getPodcast(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/podcasts?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching podcast ${slug}:`, error)
    return null
  }
}

// Tutorials
export async function getTutorials() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/tutorials?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching tutorials:', error)
    return []
  }
}

export async function getTutorial(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/tutorials?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching tutorial ${slug}:`, error)
    return null
  }
}

// Resources
export async function getResources() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/resources?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching resources:', error)
    return []
  }
}

export async function getResource(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/resources?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching resource ${slug}:`, error)
    return null
  }
}

// Recipes (for Cook page)
export async function getRecipes() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/recipes?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getRecipe(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/recipes?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching recipe ${slug}:`, error)
    return null
  }
}

// Writing (for Write page)
export async function getWritings() {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      '/writings?populate=*&sort=publishedAt:desc'
    )
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))
  } catch (error) {
    console.error('Error fetching writings:', error)
    return []
  }
}

export async function getWriting(slug: string) {
  try {
    const response: StrapiResponse<StrapiItem[]> = await fetchAPI(
      `/writings?filters[slug][$eq]=${slug}&populate=*`
    )
    if (response.data.length === 0) return null
    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    }
  } catch (error) {
    console.error(`Error fetching writing ${slug}:`, error)
    return null
  }
}
