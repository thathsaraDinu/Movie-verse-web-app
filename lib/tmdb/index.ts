// TMDB API Library - Main Entry Point

// Export client and utilities
export { TMDBClient, getTMDBClient, tmdb } from './client';
export type { TMDBClientConfig, TMDBRequestOptions } from './client';
export {
  TMDBError,
  TMDBRateLimitError,
  TMDBNotFoundError,
  TMDBConfigError,
} from './client';

// Export types
export type {
  Movie,
  MovieDetails,
  MovieResponse,
  Genre,
  Actor,
  ActorMovieCredits,
  Video,
  VideoResponse,
  CastMember,
  CrewMember,
  CreditsResponse,
  SearchParams,
  DiscoverParams,
} from './types';

// Export movie functions
export {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  searchMovies,
  getMovieDetails,
  getSimilarMovies,
  getMovieRecommendations,
  getRecentTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from './movies';

// Export genre functions
export { getGenres, getGenreById } from './genres';

// Export actor functions
export {
  getActorDetails,
  getActorMovieCredits,
  getPopularActors,
  searchActors,
} from './actors';

// Export video functions
export { getMovieTrailers, getMovieVideos } from './videos';

// Export credits functions
export { getMovieCredits, getMovieCast, getMovieCrew } from './credits';

// Re-export getImageUrl for backward compatibility
import { tmdb as tmdbClient } from './client';

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  return tmdbClient.getImageUrl(path, size);
}
