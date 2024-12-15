import { getTrendingMovies, getUpcomingMovies } from "@/lib/tmdb"
import { MovieSection } from "@/components/movie-section"
import { ErrorMessage } from "@/components/ui/error-message"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { HeroSection } from "@/components/hero-section"
import MovieCarousel from "@/components/movie-carousel"

async function MovieData() {
  try {
    
    const [trendingMovies, upcomingMovies] = await Promise.all([
      getTrendingMovies(),
      getUpcomingMovies(),
    ])

    return (
      <div className="flex flex-col gap-10">
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
      </div>
    )
  } catch (error) {
    return (
      <div>
        <ErrorMessage title="Failed to load movies" message="Please check again later" />
      </div>
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