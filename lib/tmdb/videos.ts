import { getTMDBClient } from './client';
import type { Video, VideoResponse } from './types';


export async function getMovieTrailers(
  movieId: number
): Promise<Video[]> {

  try {

    const tmdb = getTMDBClient();

    const data = await tmdb.get<VideoResponse>(
      `/movie/${movieId}/videos`,
      {},
      {
        revalidate: 3600,
        tags: ['movie-videos', `movie-${movieId}`],
      }
    );

    return (
      data?.results.filter(
        video => video.type === "Trailer"
      ) || []
    );

  } catch (error) {

    console.error("Error fetching movie trailers:", error);
    throw error;

  }
}


export async function getMovieVideos(
  movieId: number
): Promise<Video[]> {

  try {

    const tmdb = getTMDBClient();

    const data = await tmdb.get<VideoResponse>(
      `/movie/${movieId}/videos`,
      {},
      {
        revalidate: 3600,
        tags: ['movie-videos', `movie-${movieId}`],
      }
    );

    return data?.results || [];

  } catch (error) {

    console.error("Error fetching movie videos:", error);
    throw error;

  }
}