import { searchMovies } from "@/lib/tmdb";
import { MovieSection } from "@/components/movies/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SearchBar } from "@/components/search-bar";

async function SearchResults({ query }: { query: string }) {
  try {
    const movies = await searchMovies(query);
    return (
      <>
        <MovieSection title={`Search Results for "${query}"`} movies={movies} />
      </>
    );
  } catch (error) {
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Search failed"
          message="Unable to fetch search results. Please try again."
        />
      </div>
    );
  }
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <section className="pagesection flex flex-col justify-start gap-10">
      <SearchBar />
      {!searchParams.q ? (
        <ErrorMessage
          title="No search query"
          message="Please enter a search term to find movies."
        />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults query={searchParams.q ?? ""} />
        </Suspense>
      )}
    </section>
  );
}
