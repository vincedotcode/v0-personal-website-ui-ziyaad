import { getPostBySlug } from "@/lib/strapi"
import { SECTION_TAG_MAP } from "@/lib/sections"
import { notFound } from "next/navigation"

type Props = {
  params: { section: string; slug: string }
}

export default async function PostDetailPage({ params }: Props) {
  const { section, slug } = params

  // ensure section is a valid one
  if (!SECTION_TAG_MAP[section] && section !== "portfolio") {
    notFound()
  }

  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const attrs = post.attributes
  const format = attrs.format as "article" | "podcast" | "video"

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">{attrs.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {new Date(attrs.publishedAt).toLocaleDateString("en-GB")}
      </p>

      {/* Render podcast/video if needed */}
      {format !== "article" && attrs.youtubeUrl && (
        <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={getYoutubeEmbedUrl(attrs.youtubeUrl)}
            title={attrs.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Simple rich text render – you can swap for your MDX/RichText renderer */}
      <div className="prose prose-invert max-w-none">
        {/* Strapi rich text comes as HTML or blocks depending on field type; adjust accordingly */}
        <div dangerouslySetInnerHTML={{ __html: attrs.content }} />
      </div>
    </div>
  )
}

function getYoutubeEmbedUrl(raw: string): string {
  try {
    const url = new URL(raw)
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1)
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v")
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    return raw
  } catch {
    return raw
  }
}
