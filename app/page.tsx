import { getTrendingMovies, getUpcomingMovies } from "@/lib/tmdb";
import { MovieSection } from "@/components/movies/movie-section";
import { ErrorMessage } from "@/components/ui/error-message";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { HeroSection } from "@/components/hero-section";
import { getAuthSession } from "@/lib/auth";

async function MovieData() {
  try {
    const [trendingMovies, upcomingMovies] = await Promise.all([
      getTrendingMovies(),
      getUpcomingMovies(),
    ]);

    return (
      <div className="container mx-auto flex flex-col gap-10">
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto">
        <ErrorMessage
          title="Failed to load movies"
          message="Please check again later"
        />
      </div>
    );
  }
}

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div>
      <HeroSection userName={session?.user.name || null} />
      <section className="pagesection">
        <Suspense fallback={<LoadingSpinner />}>
          <MovieData />
        </Suspense>
      </section>
    </div>
  );
}
