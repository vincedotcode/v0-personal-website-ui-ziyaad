// app/search/page.tsx
import { getAllTags, type StrapiTag } from "@/lib/strapi";
import SearchShell from "@/components/search-shell";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const tagsRes = await getAllTags();
  // Only keep tags that correspond to your top-level sections
  const tags: StrapiTag[] = tagsRes.data;

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container max-w-4xl mx-auto">
        <SearchShell tags={tags} />
      </div>
    </section>
  );
}
