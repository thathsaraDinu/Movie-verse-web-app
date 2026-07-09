// TMDB API Types

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  tagline: string;
  production_companies: Array<{ id: number; name: string; logo_path?: string | null; origin_country?: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
  budget: number;
  revenue: number;
  status: string;
  imdb_id?: string;
  homepage?: string;
}

export interface MovieResponse {
  page: number;
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
  known_for_department?: string;
  also_known_as?: string[];
  gender?: number;
  popularity: number;
  imdb_id?: string;
  homepage?: string;
}

export interface ActorMovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  order: number;
  known_for_department?: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

export interface DiscoverParams {
  with_genres?: string;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  with_companies?: string;
  with_keywords?: string;
  language?: string;
  region?: string;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  primary_release_year?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  with_release_type?: string;
  certification?: string;
  certification_country?: string;
}
