import { MoviePoster } from "./movie-poster";
import { MovieInfo } from "./movie-info";
import { MovieMetadata } from "./movie-metadata";
import type { MovieDetails as MovieDetailsType } from "@/lib/tmdb";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <MoviePoster path={movie.poster_path} title={movie.title} />
      <div>
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <MovieInfo movie={movie} />
        {movie.tagline && (
          <p className="text-lg italic text-muted-foreground mb-4">
            {movie.tagline}
          </p>
        )}
        <MovieMetadata movie={movie} />
      </div>
    </div>
  );
}
