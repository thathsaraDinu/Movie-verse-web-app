import { getGenres } from "@/lib/tmdb";
import { Genre } from "@/lib/tmdb";

// Export the GET handler as a named export for Next.js App Router
export async function GET() {
  try {
    const genres: Genre[] = await getGenres(); // Fetch genres from the getGenres function
    return new Response(JSON.stringify(genres), { status: 200 }); // Return genres as JSON with a 200 OK status
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
}
