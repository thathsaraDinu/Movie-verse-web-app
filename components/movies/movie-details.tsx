import { MoviePoster } from "./movie-poster";
import { MovieInfo } from "./movie-info";
import { MovieMetadata } from "./movie-metadata";
import { getImageUrl, type MovieDetails as MovieDetailsType } from "@/lib/tmdb";
import WatchlistToggleButton from "../watchlist/watchlist-toggle-button";
import { getAuthSession } from "@/lib/auth";
import MovieCast from "./movie-cast";
import { Suspense } from "react";
import MovieTrailers from "./movie-trailer";
import SimilarMovies from "./similar-movies";
import { LoadingSpinner } from "../ui/loading-spinner";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

export async function MovieDetails({ movie }: MovieDetailsProps) {
  const session = await getAuthSession();
  return (
    <div className="">
      <div className="relative overflow-clip">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt="movie poster"
          className={` bg-cover object-cover bg-center h-full w-full absolute top-0 -z-50`}
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 h-full w-full bg-gradient-to-b from-background/50 -z-50  to-background" />
        {/* Gradient Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 pagesection">
          <div className="flex flex-col gap-4 items-stretch">
            <MoviePoster path={movie.poster_path} title={movie.title} />
            {session && session.user ? (
              <WatchlistToggleButton
                imageUrl={movie.poster_path || ""}
                name={movie.title || ""}
                releaseDate={movie.release_date || ""}
                movieId={movie.id || 0}
              />
            ) : (
              <div className="w-full p-2 text-center text-sm text-muted-foreground">
                Sign in to create your own watchlist
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col lg:flex-row gap-5 justify-between lg:items-center mb-4">
              <h1 className="text-4xl font-bold">{movie.title || ""}</h1>{" "}
            </div>
            <MovieInfo movie={movie} />
            {movie.tagline && (
              <p className="text-lg italic text-muted-foreground mb-4">
                {movie.tagline || ""}
              </p>
            )}
            <MovieMetadata movie={movie} />
          </div>
        </div>
      </div>{" "}
      <div className="pagesection flex flex-col gap-12">
        <Suspense fallback={<LoadingSpinner />}>
          <MovieTrailers movieId={movie.id} movieTitle={movie.title} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <MovieCast movieId={movie.id} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <SimilarMovies movieId={movie.id} />
        </Suspense>
      </div>
    </div>
  );
}
