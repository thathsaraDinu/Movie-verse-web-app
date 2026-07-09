import { tmdb } from './client';
import type { Genre } from './types';

/**
 * Get all movie genres
 */
export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await tmdb.get<{ genres: Genre[] }>(
      '/genre/movie/list',
      {},
      { revalidate: 86400, tags: ['genres'] } // Cache for 24 hours
    );
    return data?.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

/**
 * Get genre by ID
 * @param genreId - Genre ID
 */
export async function getGenreById(genreId: number): Promise<Genre | null> {
  try {
    const genres = await getGenres();
    return genres.find(g => g.id === genreId) || null;
  } catch (error) {
    console.error('Error fetching genre by ID:', error);
    throw error;
  }
}
