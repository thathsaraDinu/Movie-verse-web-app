import { NextResponse } from "next/server";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  searchMovies,
} from "@/lib/tmdb";

// Handle GET requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const query = searchParams.get("query");

  try {
    let data;

    switch (action) {
      case "trending":
        data = await getTrendingMovies();
        break;
      case "upcoming":
        data = await getUpcomingMovies();
        break;
      case "byGenre":
        if (!id || typeof id !== "string") {
          return NextResponse.json(
            { error: "Invalid or missing genre ID" },
            { status: 400 }
          );
        }
        data = await getMoviesByGenre(id);
        break;
      case "search":
        if (!query || typeof query !== "string") {
          return NextResponse.json(
            { error: "Invalid or missing search query" },
            { status: 400 }
          );
        }
        data = await searchMovies(query);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action parameter" },
          { status: 400 }
        );
    }

    if (data) {
      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
