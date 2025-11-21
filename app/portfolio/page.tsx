import { getPortfolioPage } from "@/lib/strapi"

export default async function PortfolioPage() {
  const page = await getPortfolioPage()
  const attrs = page.attributes

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">{attrs.title ?? "Portfolio"}</h1>
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: attrs.content }} />
      </div>
    </div>
  )
}
