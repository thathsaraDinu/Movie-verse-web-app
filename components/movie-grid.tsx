import { Movie } from "@/lib/tmdb"
import { MovieCard } from "@/components/movie-card"

interface MovieGridProps {
  movies: {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
  }
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies.results.length) {
    return (
      <p className="text-center text-muted-foreground py-8">No movies found.</p>
    )
  }

  return (
    <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}