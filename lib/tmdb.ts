const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  tagline: string;
  production_companies: Array<{ id: number; name: string }>;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
  
  if (!res.ok) {
    if (res.status === 404) {
      return null as T;
    }
    throw new Error(`TMDB API error: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>('/trending/movie/week');
  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>('/movie/upcoming');
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  return fetchFromTMDB<MovieDetails | null>(`/movie/${id}`);
}

export function getImageUrl(path: string | null, size: string = 'original'): string {
  if (!path) {
    return '/placeholder-movie.jpg';
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
}