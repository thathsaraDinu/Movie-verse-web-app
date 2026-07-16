// TMDB API Library - Main Entry Point

// Export client and utilities
export { TMDBClient, getTMDBClient } from './client';
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
export {
  getGenres,
  getGenreById,
} from './genres';

// Export actor functions
export {
  getActorDetails,
  getActorMovieCredits,
  getPopularActors,
  searchActors,
} from './actors';

// Export video functions
export {
  getMovieTrailers,
  getMovieVideos,
} from './videos';

// Export credits functions
export {
  getMovieCredits,
  getMovieCast,
  getMovieCrew,
} from './credits';


/**
 * Backward compatible image helper
 */
export function getImageUrl(
  path: string | null,
  size: string = 'w500'
): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
}


/**
 * TMDB CDN image sizes
 *
 * Using TMDB resized images avoids requesting unnecessarily
 * large original files and reduces bandwidth usage.
 */
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


type ImageType = keyof typeof TMDB_IMAGE_SIZES;


type PosterSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'original';


/**
 * Get optimized TMDB image URL
 */
export function getOptimizedImageUrl(
  path: string | null,
  type: ImageType = 'poster',
  size: keyof typeof TMDB_IMAGE_SIZES[ImageType] = 'large'
): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }

  const imageSize = TMDB_IMAGE_SIZES[type][size];

  return `https://image.tmdb.org/t/p/${imageSize}${path}`;
}


/**
 * Specialized helper for movie posters
 */
export function getPosterImageUrl(
  path: string | null,
  size: PosterSize = 'xlarge'
): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }

  if (size === 'xlarge') {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  return getOptimizedImageUrl(path, 'poster', size);
}