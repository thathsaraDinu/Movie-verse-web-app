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

    return (
      <>
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
      </>
    )
  } catch (error) {
    return (
      <section>
        <ErrorMessage title="Failed to load movies" message="Internal Error." />
      </section>
    );
  }
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section>
        <Suspense fallback={<LoadingSpinner />}>
          <MovieData />
        </Suspense>
      </section>
    </div>
  );
}