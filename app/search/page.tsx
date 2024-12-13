import { searchMovies } from "@/lib/tmdb"
import { MovieSection } from "@/components/movie-section"
import { ErrorMessage } from "@/components/ui/error-message"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

async function SearchResults({ query }: { query: string }) {
  try {
    const movies = await searchMovies(query)
    return (
      <MovieSection
        title={`Search Results for "${query}"`}
        movies={movies}
      />
    )
  } catch (error) {
    return (
      <ErrorMessage 
        title="Search failed" 
        message="Unable to fetch search results. Please try again."
      />
    )
  }
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  if (!searchParams.q) {
    return (
      <div className="container py-8">
        <ErrorMessage 
          title="No search query" 
          message="Please enter a search term to find movies."
        />
      </div>
    )
  }

  return (
    <div className="pb-8">
      <Suspense fallback={<LoadingSpinner />}>
        <SearchResults query={searchParams.q} />
      </Suspense>
    </div>
  )
}