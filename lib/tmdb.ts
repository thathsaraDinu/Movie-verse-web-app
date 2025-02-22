const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Get today's date
const today = new Date();

// Adding 1 day for the start date (next day)
const start_date = new Date(today);
start_date.setDate(today.getDate() + 1);
const formatted_start_date = start_date.toISOString().split("T")[0];

// Adding 5 days for the end date (5 days after today)
const end_date = new Date(today);
end_date.setDate(today.getDate() + 5);
const formatted_end_date = end_date.toISOString().split("T")[0];

// last year for trending movies
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
const formatted_lastYear = lastYear.toISOString().split("T")[0];

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

export interface Actor {
  id: number;
  name: string;
  birthday?: string;
  deathday?: string | null;
  biography: string;
  profile_path?: string | null;
  place_of_birth?: string;
  known_for: string;
  popularity: number;
  profile_image: string;
}

export interface ActorMovieCredits {
  cast: {
    id: number;
    title: string;
    character: string;
    release_date: string;
    poster_path?: string | null;
  }[];
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  try {
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
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB");
  }
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list");
    return data?.genres;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB");
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB<MovieResponse>(
      `/discover/movie?include_adult=false?language=en-US&page=1&sort_by=popularity.desc&&release_date.gte=${formatted_lastYear}&release_date.lte=${start_date}`
    );
    return data?.results;
  } catch (error) {
    throw new Error("Failed to fetch trending movies");
  }
}
export async function getUpcomingMovies(): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB<MovieResponse>(
      `/discover/movie?include_adult=false&language=en-US&region=US&sort_by=release_date.asc&with_release_type=2|3&release_date.gte=${start_date}&release_date.lte=${end_date}`
    );
    return data?.results;
  } catch (error) {
    throw new Error("Failed to fetch upcoming movies");
  }
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB<MovieResponse>(
      `/movie/${id}/similar?language=en-US?include_adult=false&page=1&sort_by=popularity.desc`
    );
    return data?.results || []; // Ensure it returns an empty array if results are undefined
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw new Error("Failed to fetch similar movies");
  }
}

export async function getMoviesByGenre(id: string): Promise<Movie[]> {
  try {
    if (!id) {
      return [];
    }
    const data = await fetchFromTMDB<MovieResponse>(
      `/discover/movie?with_genres=${id}`
    );
    return data?.results;
  } catch (error) {
    throw new Error("Failed to fetch upcoming movies");
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB<MovieResponse>(
      `/search/movie?query=${query}&sort_by=popularity.desc`
    );
    return data?.results;
  } catch (error) {
    throw new Error("Failed to search movies");
  }
}

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | null> {
  try {
    return await fetchFromTMDB<MovieDetails>(`/movie/${id}`);
  } catch (error) {
    throw new Error("Failed to search movies");
  }
}
export async function getActorDetails(id: number): Promise<Actor> {
  try {
    return await fetchFromTMDB<Actor>(`/person/${id}`);
  } catch (error) {
    throw new Error("Failed to search movies");
  }
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

export const fetchMovieTrailers = async (movieId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie trailers");
    }
    const data = await response.json();
    return data.results.filter((video: any) => video.type === "Trailer");
  } catch (error) {
    console.error("Error in fetchMovieTrailers:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie cast");
    }
    const data = await response.json();
    return data.cast.slice(0, 12);
  } catch (error) {
    console.error("Error in fetchMovieCast:", error);
    throw error;
  }
};
