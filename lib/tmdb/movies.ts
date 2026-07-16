import { getTMDBClient } from './client';
import type {
  Movie,
  MovieDetails,
  MovieResponse,
  DiscoverParams,
  SearchParams,
} from './types';

/**
 * Get trending movies
 */
export async function getTrendingMovies(
  page: number = 1,
  timeWindow: 'day' | 'week' = 'week'
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      `/trending/movie/${timeWindow}`,
      { page },
      { revalidate: 21600, tags: ['trending-movies'] }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}


/**
 * Get popular movies
 */
export async function getPopularMovies(
  page: number = 1,
  language: string = 'en-US'
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/movie/popular',
      { page, language },
      { revalidate: 86400, tags: ['popular-movies'] }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}


/**
 * Get upcoming movies
 */
export async function getUpcomingMovies(
  page: number = 1,
  region: string = 'US'
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const dateRange = tmdb.getDateRange(1, 30);

    const data = await tmdb.get<MovieResponse>(
      '/discover/movie',
      {
        page,
        region,
        'release_date.gte': dateRange.start,
        'release_date.lte': dateRange.end,
        with_release_type: '2|3',
        sort_by: 'release_date.asc',
      },
      { revalidate: 43200, tags: ['upcoming-movies'] }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}


/**
 * Get movies by genre
 */
export async function getMoviesByGenre(
  genreId: string,
  page: number = 1,
  params?: Partial<DiscoverParams>
): Promise<Movie[]> {
  try {
    if (!genreId) {
      return [];
    }

    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/discover/movie',
      {
        with_genres: genreId,
        page,
        ...params,
      },
      {
        revalidate: 86400,
        tags: ['genre-movies', `genre-${genreId}`],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
}


/**
 * Search movies
 */
export async function searchMovies(
  query: string,
  params?: SearchParams
): Promise<Movie[]> {
  try {
    if (!query || query.length < 3) {
      return [];
    }

    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/search/movie',
      {
        query,
        page: 1,
        ...params,
      },
      {
        revalidate: 600,
        tags: ['search-movies', `search-${query}`],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}


/**
 * Get movie details
 */
export async function getMovieDetails(
  movieId: string,
  appendToResponse: string = 'credits,videos,similar'
): Promise<MovieDetails | null> {
  try {
    const tmdb = getTMDBClient();

    return await tmdb.get<MovieDetails>(
      `/movie/${movieId}`,
      {
        append_to_response: appendToResponse,
      },
      {
        revalidate: 604800,
        tags: ['movie-details', `movie-${movieId}`],
      }
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}


/**
 * Get similar movies
 */
export async function getSimilarMovies(
  movieId: number,
  page: number = 1
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      `/movie/${movieId}/similar`,
      { page },
      {
        revalidate: 604800,
        tags: ['similar-movies', `movie-${movieId}`],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
}


/**
 * Get movie recommendations
 */
export async function getMovieRecommendations(
  movieId: number,
  page: number = 1
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      `/movie/${movieId}/recommendations`,
      { page },
      {
        revalidate: 604800,
        tags: ['movie-recommendations', `movie-${movieId}`],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw error;
  }
}


/**
 * Get recent trending movies
 */
export async function getRecentTrendingMovies(
  page: number = 1
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/discover/movie',
      {
        page,
        'release_date.gte': tmdb.getDateYearsAgo(1),
        'release_date.lte': tmdb.getDateRange(0).start,
        sort_by: 'popularity.desc',
      },
      {
        revalidate: 43200,
        tags: ['recent-trending'],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching recent trending movies:', error);
    throw error;
  }
}


/**
 * Get top rated movies
 */
export async function getTopRatedMovies(
  page: number = 1
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/movie/top_rated',
      { page },
      {
        revalidate: 604800,
        tags: ['top-rated'],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}


/**
 * Get now playing movies
 */
export async function getNowPlayingMovies(
  page: number = 1,
  region: string = 'US'
): Promise<Movie[]> {
  try {
    const tmdb = getTMDBClient();

    const data = await tmdb.get<MovieResponse>(
      '/movie/now_playing',
      { page, region },
      {
        revalidate: 21600,
        tags: ['now-playing'],
      }
    );

    return data?.results || [];
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}