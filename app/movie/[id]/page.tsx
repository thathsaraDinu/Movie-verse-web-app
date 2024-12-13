import { getMovieDetails, getTrendingMovies } from "@/lib/tmdb"
import { MovieDetails } from "@/components/movie/movie-details"
import { ErrorMessage } from "@/components/ui/error-message"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { notFound } from "next/navigation"

async function MovieContent({ id }: { id: string }) {
  try {
    const movie = await getMovieDetails(id)
    
    if (!movie) {
      notFound()
    }

    return <MovieDetails movie={movie} />
  } catch (error) {
    return (
      <ErrorMessage 
        title="Failed to load movie" 
        message="Unable to fetch movie details. Please try again later."
      />
    )
  }
}

export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <div className="pb-8 px-6 max-w-7xl container mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <MovieContent id={params.id} />
      </Suspense>
    </div>
  );
}