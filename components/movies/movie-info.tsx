import { Badge } from "@/components/ui/badge";
import { formatDate, formatRating, formatRuntime } from "@/lib/utils/format";
import type { MovieDetails } from "@/lib/tmdb";

interface MovieInfoProps {
  movie: MovieDetails;
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Badge variant="secondary">{formatDate(movie.release_date || "")}</Badge>
      {movie.runtime && movie.runtime > 0 && (
        <Badge variant="secondary">{formatRuntime(movie.runtime || 0)}</Badge>
      )}
      <Badge variant="secondary">
        ★ {formatRating(movie.vote_average || 0)}
      </Badge>
    </div>
  );
}
