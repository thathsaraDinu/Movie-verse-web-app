import { MovieSection } from "@/components/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getMoviesByGenre } from "@/lib/tmdb";
import { Suspense } from "react";

async function GenreMovies({ id, name }: { id: string; name: string }) {
  try {
    const movies = await getMoviesByGenre(id);

    if (!movies || movies.length === 0) {
      return (
        <ErrorMessage
          title="No Movies Found"
          message={`No movies found for the genre: ${name}. Please try again later.`}
        />
      );
    }

    return <MovieSection title={`Genre: ${name}`} movies={movies} />;
  } catch (error) {
    console.log(error);
    return (
      <ErrorMessage
        title="Failed to load movies"
        message="Unable to fetch movies. Please try again later."
      />
    );
  }
}

export default function GenrePage({
  params,
  searchParams,
}: {
  params: { genre?: string };
  searchParams: { id: string };
}) {
  const decodedGenre = params.genre ? decodeURIComponent(params.genre) : ""; // Decode spaces
  const decodedId = searchParams.id ? decodeURIComponent(searchParams.id) : ""; // Decode spaces if needed

  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <GenreMovies id={decodedId} name={decodedGenre} />
      </Suspense>
    </section>
  );
}