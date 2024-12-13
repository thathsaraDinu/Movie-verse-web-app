import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb"

interface MoviePosterProps {
  path: string | null
  title: string
}

export function MoviePoster({ path, title }: MoviePosterProps) {
  return (
    <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
      <Image
        src={getImageUrl(path, "w500")}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}