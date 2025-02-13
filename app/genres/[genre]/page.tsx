import { MovieSection } from "@/components/movies/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getMoviesByGenre } from "@/lib/tmdb";
import { Suspense } from "react";

async function GenreMovies({ id, name }: { id: string; name: string }) {
  try {
    const movies = await getMoviesByGenre(id);

    if (movies?.length === 0) {
      return (
        <div className="container mx-auto">
          <ErrorMessage
            title="No Movies Found"
            message={`No movies found for the genre: ${name}. Please try again later.`}
          />
        </div>
      );
    } else {
      return (
        <div className="container mx-auto">
          <MovieSection title={`Genre: ${name}`} movies={movies} />
        </div>
      );
    }
  } catch (error) {
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Failed to load movies"
          message="Unable to fetch movies. Please try again later."
        />
      </div>
    );
  }
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ genre: string }>;
  searchParams: Promise<{ name: string }>;
}) {
  const { genre } =  await params;
  const { name } =  await searchParams;

  const decodedName = name ? decodeURIComponent(name) : ""; // Decode spaces if needed

  return (
    <section className="pagesection">
      <Suspense fallback={<LoadingSpinner />}>
        <GenreMovies id={genre} name={decodedName} />
      </Suspense>
    </section>
  );
}
