import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb"

interface MoviePosterProps {
  path: string | null
  title: string
}

export function MoviePoster({ path, title }: MoviePosterProps) {
  return (
    <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-card">
      {path ? (
        <Image
          src={getImageUrl(path, "w500")}
          alt={title || "movie poster"}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No Image Available
        </div>
      )}
    </div>
  );
}