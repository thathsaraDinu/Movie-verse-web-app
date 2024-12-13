import { Movie } from "@/lib/tmdb"
import { MovieGrid } from "@/components/movie-grid"

interface MovieSectionProps {
  title: string
  movies: {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
  }
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">{title}</h2>
        <MovieGrid movies={movies} />
      </div>
    </section>
  )
}