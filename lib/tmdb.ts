const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";


const today = new Date();

// Get the first day of the current month
const start_date = new Date(today.getFullYear(), today.getMonth(), 1)
  .toISOString()
  .split("T")[0];

// Get the last day of the current month
const end_date = new Date(today.getFullYear(), today.getMonth() + 2, 0)
  .toISOString()
  .split("T")[0];

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

export interface Genre {
  id: number;
  name: string;
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key is not configured");
  }

  // Ensure the URL is correctly formed
  const url = `${BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${TMDB_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      return null as T;
    }
    throw new Error(`TMDB API error: ${res.status}`);
  }

  return res.json();
}

export async function getGenres(): Promise<Genre[]> {
  const data = await fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>(
    "/discover/movie?language=en-US&page=1&sort_by=popularity.desc"
  );
  return data.results;
}
export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>(
    `/discover/movie?language=en-US&region=US&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${start_date}&release_date.lte=${end_date}`
  );
  return data.results;
}

export async function getMoviesByGenre(id: string): Promise<Movie[]> { 
  if(!id) {
    return [];
  }
    const data = await fetchFromTMDB<MovieResponse>(
      `/discover/movie?with_genres=${id}`
    );
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<MovieResponse>(
    `/search/movie?query=${query}&sort_by=popularity.desc`
  );
  return data.results;
}

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | null> {
  return fetchFromTMDB<MovieDetails | null>(`/movie/${id}`);
}

export function getImageUrl(
  path: string | null,
  size: string = "original"
): string {
  if (!path) {
    return "/placeholder-movie.jpg";
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
