import { tmdb } from './client';
import type { CreditsResponse, CastMember, CrewMember } from './types';

/**
 * Get movie cast and crew
 * @param movieId - Movie ID
 * @param language - Language code (default: en-US)
 */
export async function getMovieCredits(
  movieId: number,
  language: string = 'en-US'
): Promise<{ cast: CastMember[]; crew: CrewMember[] }> {
  try {
    const data = await tmdb.get<CreditsResponse>(
      `/movie/${movieId}/credits`,
      { language },
      { revalidate: 3600, tags: ['movie-credits', `movie-${movieId}`] }
    );
    
    return {
      cast: data?.cast || [],
      crew: data?.crew || [],
    };
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
}

/**
 * Get movie cast only
 * @param movieId - Movie ID
 * @param limit - Maximum number of cast members to return (default: 12)
 */
export async function getMovieCast(
  movieId: number,
  limit: number = 12
): Promise<CastMember[]> {
  try {
    const { cast } = await getMovieCredits(movieId);
    return cast.slice(0, limit);
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
}

/**
 * Get movie crew only
 * @param movieId - Movie ID
 * @param department - Filter by department (optional)
 */
export async function getMovieCrew(
  movieId: number,
  department?: string
): Promise<CrewMember[]> {
  try {
    const { crew } = await getMovieCredits(movieId);
    return department ? crew.filter(member => member.department === department) : crew;
  } catch (error) {
    console.error('Error fetching movie crew:', error);
    throw error;
  }
}
