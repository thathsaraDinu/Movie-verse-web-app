import { getTMDBClient } from './client';
import type { CreditsResponse, CastMember, CrewMember } from './types';

export async function getMovieCredits(
  movieId: number
): Promise<{ cast: CastMember[]; crew: CrewMember[] }> {

  try {

    const tmdb = getTMDBClient();

    const data = await tmdb.get<CreditsResponse>(
      `/movie/${movieId}/credits`,
      {},
      {
        revalidate: 3600,
        tags: ['movie-credits', `movie-${movieId}`],
      }
    );

    return {
      cast: data?.cast || [],
      crew: data?.crew || [],
    };

  } catch (error) {

    console.error("Error fetching movie credits:", error);
    throw error;

  }
}


export async function getMovieCast(
  movieId: number,
  limit: number = 12
): Promise<CastMember[]> {

  const { cast } = await getMovieCredits(movieId);

  return cast.slice(0, limit);
}


export async function getMovieCrew(
  movieId: number,
  department?: string
): Promise<CrewMember[]> {

  const { crew } = await getMovieCredits(movieId);

  return department
    ? crew.filter(member => member.department === department)
    : crew;
}