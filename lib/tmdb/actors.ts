import { getTMDBClient } from './client';
import type { Actor, ActorMovieCredits, CreditsResponse } from './types';

/**
 * Get actor details by ID
 * @param actorId - Actor ID
 */
export async function getActorDetails(actorId: number): Promise<Actor | null> {
  try {
    const tmdb = getTMDBClient();
    return await tmdb.get<Actor>(
      `/person/${actorId}`,
      {},
      { revalidate: 3600, tags: ['actor-details', `actor-${actorId}`] }
    );
  } catch (error) {
    console.error('Error fetching actor details:', error);
    throw error;
  }
}

/**
 * Get actor movie credits
 * @param actorId - Actor ID
 */
export async function getActorMovieCredits(actorId: number): Promise<ActorMovieCredits> {
  try {
    const tmdb = getTMDBClient();
    const data = await tmdb.get<CreditsResponse>(
      `/person/${actorId}/movie_credits`,
      {},
      { revalidate: 3600, tags: ['actor-credits', `actor-${actorId}`] }
    );
    
    return {
      id: actorId,
      cast: data?.cast || [],
      crew: data?.crew || [],
    };
  } catch (error) {
    console.error('Error fetching actor movie credits:', error);
    throw error;
  }
}

/**
 * Get popular actors
 * @param page - Page number (default: 1)
 */
export async function getPopularActors(page: number = 1): Promise<Actor[]> {
  try {
    const tmdb = getTMDBClient();
    const data = await tmdb.get<{ results: Actor[] }>(
      '/person/popular',
      { page },
      { revalidate: 3600, tags: ['popular-actors'] }
    );
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching popular actors:', error);
    throw error;
  }
}

/**
 * Search for actors
 * @param query - Search query
 * @param page - Page number (default: 1)
 */
export async function searchActors(query: string, page: number = 1): Promise<Actor[]> {
  try {
    if (!query || query.length < 3) {
      return [];
    }
    
    const tmdb = getTMDBClient();
    const data = await tmdb.get<{ results: Actor[] }>(
      '/search/person',
      { query, page },
      { revalidate: 300, tags: ['search-actors', `search-${query}`] }
    );
    return data?.results || [];
  } catch (error) {
    console.error('Error searching actors:', error);
    throw error;
  }
}
