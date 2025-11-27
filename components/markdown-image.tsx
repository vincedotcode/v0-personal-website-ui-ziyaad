import Image, { type StaticImageData } from "next/image"
import type { ImgHTMLAttributes } from "react"

type MarkdownImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "loading"
> & {
  src?: string | Blob | StaticImageData
  width?: number | string
  height?: number | string
  title?: string
  loading?: "eager" | "lazy"
}

const passthroughLoader = ({ src }: { src: string }) => src

/**
 * Shared wrapper to safely render markdown <img> tags with next/image.
 * Falls back to sensible dimensions when width/height are missing.
 */
export function MarkdownImage({
  alt = "",
  src,
  width,
  height,
  title,
  loading = "lazy",
  ...rest
}: MarkdownImageProps) {
  const normalizedSrc =
    typeof src === "string"
      ? src
      : typeof Blob !== "undefined" && src instanceof Blob
        ? typeof URL !== "undefined"
          ? URL.createObjectURL(src)
          : null
        : src ?? null

  if (!normalizedSrc) return null

  const numericWidth = Number(width) || 1200
  const numericHeight = Number(height) || 675

  return (
    <figure className="my-8">
      <Image
        src={normalizedSrc}
        alt={alt}
        width={numericWidth}
        height={numericHeight}
        loading={loading}
        decoding="async"
        className="w-full h-auto rounded-2xl border border-white/10 shadow-lg"
        sizes="(min-width: 1024px) 900px, 100vw"
        title={title}
        unoptimized
        loader={typeof normalizedSrc === "string" ? passthroughLoader : undefined}
        {...rest}
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-white/50">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
