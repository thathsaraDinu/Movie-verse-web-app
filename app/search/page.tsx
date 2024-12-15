import { searchMovies } from "@/lib/tmdb";
import { MovieSection } from "@/components/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SearchBar } from "@/components/search-bar";

async function SearchResults({ query }: { query: string }) {
  try {
    const movies = await searchMovies(query);
    return (
      <div className="flex flex-col gap-10">
        <SearchBar />
        <MovieSection title={`Search Results for "${query}"`} movies={movies} />
      </div>
    );
  } catch (error) {
    return (
      <ErrorMessage
        title="Search failed"
        message="Unable to fetch search results. Please try again."
      />
    );
  }
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  if (!searchParams.q) {
    return (
      <section>
        <ErrorMessage
          title="No search query"
          message="Please enter a search term to find movies."
        />
      </section>
    );
  }

  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchResults query={searchParams.q} />
      </Suspense>
    </section>
  );
}
