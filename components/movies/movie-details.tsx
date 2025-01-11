import { MoviePoster } from "./movie-poster";
import { MovieInfo } from "./movie-info";
import { MovieMetadata } from "./movie-metadata";
import type { MovieDetails as MovieDetailsType } from "@/lib/tmdb";
import WatchlistToggleButton from "../watchlist/watchlist-toggle-button";
import { getAuthSession } from "@/lib/auth";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export async function MovieDetails({ movie }: MovieDetailsProps) {
  const session = await getAuthSession();
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div className="flex flex-col gap-4 items-stretch">
        <MoviePoster path={movie.poster_path} title={movie.title} />
        {session && session.user ? (
          <WatchlistToggleButton
            imageUrl={movie.poster_path}
            name={movie.title}
            releaseDate={movie.release_date}
            movieId={movie.id}
          />
        ) : (
          <div className="w-full p-2 text-center text-sm text-muted-foreground">
            Sign in to create your own watchlist
          </div>
        )}
      </div>
      <div>
        <div className="flex flex-col lg:flex-row gap-5 justify-between lg:items-center mb-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>{" "}
        </div>
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
