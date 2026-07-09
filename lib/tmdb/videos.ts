import { getTMDBClient } from './client';
import type { Video, VideoResponse } from './types';

/**
 * Get movie trailers
 * @param movieId - Movie ID
 * @param language - Language code (default: en-US)
 */
export async function getMovieTrailers(
  movieId: number,
  language: string = 'en-US'
): Promise<Video[]> {
  try {
    const tmdb = getTMDBClient();
    const data = await tmdb.get<VideoResponse>(
      `/movie/${movieId}/videos`,
      { language },
      { revalidate: 3600, tags: ['movie-videos', `movie-${movieId}`] }
    );
    return data?.results.filter((video: Video) => video.type === 'Trailer') || [];
  } catch (error) {
    console.error('Error fetching movie trailers:', error);
    throw error;
  }
}

/**
 * Get all movie videos (not just trailers)
 * @param movieId - Movie ID
 * @param language - Language code (default: en-US)
 */
export async function getMovieVideos(
  movieId: number,
  language: string = 'en-US'
): Promise<Video[]> {
  try {
    const tmdb = getTMDBClient();
    const data = await tmdb.get<VideoResponse>(
      `/movie/${movieId}/videos`,
      { language },
      { revalidate: 3600, tags: ['movie-videos', `movie-${movieId}`] }
    );
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
}
