import { searchMovies } from "@/lib/tmdb"
import { MovieSection } from "@/components/movie-section"
import { ErrorMessage } from "@/components/ui/error-message"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

async function SearchResults({ query }: { query: string }) {
  try {
    console.log('query', query)
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a4f29374da1af0a2599c225407f6b077&query=${query}`
    );
    const movies = await response.json();
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
      <div className="container py-8 px-6 max-w-7xl mx-auto">
        <ErrorMessage 
          title="No search query" 
          message="Please enter a search term to find movies."
        />
      </div>
    )
  }

  return (
    <div className="pb-8 px-6 max-w-7xl container mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <SearchResults query={searchParams.q} />
      </Suspense>
    </div>
  );
}