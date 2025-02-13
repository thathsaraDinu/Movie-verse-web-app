import { getMovieDetails } from "@/lib/tmdb";
import { MovieDetails } from "@/components/moviedetails/movie-details";
import { ErrorMessage } from "@/components/ui/error-message";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notFound } from "next/navigation";

async function MovieContent({ id }: { id: string }) {
  try {
    const movie = await getMovieDetails(id);

    if (!movie) {
      notFound();
    }

    return (
      <div>
        <MovieDetails movie={movie} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Failed to load movie"
          message="Unable to fetch movie details. Please try again later."
        />
      </div>
    );
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="">
      <Suspense fallback={<LoadingSpinner />}>
        <MovieContent id={id} />
      </Suspense>
    </section>
  );
}
