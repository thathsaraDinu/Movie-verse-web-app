import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getImageUrl } from "@/lib/tmdb"
import { formatDate, formatRating } from "@/lib/utils/format"
import type { Movie } from "@/lib/tmdb"
import Link from "next/link"

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <div className="aspect-[2/3] relative">
          <Image
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(movie.release_date)}
          </p>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm">
                {formatRating(movie.vote_average)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}