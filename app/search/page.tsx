import { searchMovies } from "@/lib/tmdb";
import { MovieSection } from "@/components/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SearchBar } from "@/components/search-bar";
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


async function SearchResults({ query }: { query: string }) {
  try {
    // This is the original code that was replaced by the fetch call below since this didn't work
    // const movies = await searchMovies(query);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
   
    const data = await response.json();
    const movieList = data.results || [];
    return (
      <div >
        <SearchBar />
        <MovieSection
          title={`Search Results for "${query}"`}
          movies={movieList}
        />
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
