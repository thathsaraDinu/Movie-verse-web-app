import { getTrendingMovies, getUpcomingMovies } from "@/lib/tmdb"
import { MovieSection } from "@/components/movie-section"
import { ErrorMessage } from "@/components/ui/error-message"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { HeroSection } from "@/components/hero-section"

async function MovieData() {
  try {
    const [trendingMovies, upcomingMovies] = await Promise.all([
      getTrendingMovies(),
      getUpcomingMovies(),
    ])
    console.log('trendingMovies', trendingMovies)
    console.log('upcomingMovies', upcomingMovies)

    return (
      <>
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
      </>
    )
  } catch (error) {
    return (
      <div className="container py-8 px-6 max-w-7xl mx-auto">
        <ErrorMessage title="Failed to load movies" message="Internal Error." />
      </div>
    );
  }
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="pb-8 px-6 max-w-7xl container mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <MovieData />
        </Suspense>
      </div>
    </div>
  );
}