// app/touchbase/page.tsx
import type { Metadata } from "next"
import { Suspense } from "react"
import { TouchBaseForm } from "./touchbase-form"

export const metadata: Metadata = {
  title: "Touch Base – Let’s Chat About Your Product Challenges",
  description:
    "Tell Zi what you're working on, where you're stuck, and optionally schedule a call to discuss your product challenges.",
  openGraph: {
    title: "Touch Base – Let’s Chat About Your Product Challenges",
    description:
      "Tell Zi what you're working on, where you're stuck, and optionally schedule a call to discuss your product challenges.",
    type: "website",
  },
}

export default function Page() {
  return (
    <div className="relative">
     
      {/* <RippleGridBackground /> */}

      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <Suspense fallback={null}>
          <TouchBaseForm />
        </Suspense>
      </div>
    </div>
  )
}
