import { getGenres } from "@/lib/tmdb";
import type { Genre } from "@/lib/tmdb";

export const revalidate = 2592000; // Cache for 30 days


export async function GET() {
  try {
    const genres: Genre[] = await getGenres();

    return Response.json(genres, {
      status: 200,
      headers: {
        "Cache-Control":
          "public, max-age=2592000, stale-while-revalidate=604800",
      },
    });

  } catch (error) {
    console.error("Failed to fetch genres:", error);

    return Response.json(
      {
        error: "An error occurred while processing your request",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}