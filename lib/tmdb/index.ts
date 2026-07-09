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

export function getImageUrl(
  path: string | null,
  size: string = 'w500'
): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }
  return tmdbClient.getImageUrl(path, size);
}

// Optimized image sizes for TMDB CDN (no Vercel optimization needed)
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: 'w92',
    medium: 'w185',
    large: 'w342',
    xlarge: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

export type TMDBImageSize = typeof TMDB_IMAGE_SIZES;

// Helper function to get optimized image URL based on usage
export function getOptimizedImageUrl(
  path: string | null,
  type: 'poster' | 'backdrop' | 'profile' = 'poster',
  size: 'small' | 'medium' | 'large' | 'original' = 'large'
): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }
  const imageSize = TMDB_IMAGE_SIZES[type][size];
  return tmdbClient.getImageUrl(path, imageSize);
}
