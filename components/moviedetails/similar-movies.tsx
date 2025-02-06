import { getSimilarMovies } from "@/lib/tmdb";
import { MovieSection } from "../movies/movie-section";

export default async function SimilarMovies({ movieId }: { movieId: number }) {
  const similarmovies = await getSimilarMovies(movieId);
  return (
    <div className="flex flex-col gap-6">
      {similarmovies ? (
        <MovieSection title="You may also like" movies={similarmovies} />
      ) : null}
    </div>
  );
}
