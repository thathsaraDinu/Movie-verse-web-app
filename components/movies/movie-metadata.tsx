import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { MovieDetails } from "@/lib/tmdb"

interface MovieMetadataProps {
  movie: MovieDetails
}

export function MovieMetadata({ movie }: MovieMetadataProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-muted-foreground">{movie.overview || ""}</p>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-2">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {movie.genres?.map((genre) => (
            <Badge key={genre.id} variant="outline">
              {genre.name || ""}
            </Badge>
          ))}
        </div>
      </div>

      {movie.production_companies.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Production Companies
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.production_companies?.map((company) => (
                <Badge key={company.id} variant="outline">
                  {company.name || ""}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}