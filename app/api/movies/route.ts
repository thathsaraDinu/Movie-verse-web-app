import { NextResponse } from "next/server";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  searchMovies,
  Movie,
} from "@/lib/tmdb";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const query = searchParams.get("query");

  try {
    let data: Movie[] | undefined;

    switch (action) {
      case "trending":
        if (id || query) {
          return NextResponse.json(
            { error: "Unexpected parameters for this action" },
            { status: 400 }
          );
        }
        data = await getTrendingMovies();
        break;

      case "upcoming":
        if (id || query) {
          return NextResponse.json(
            { error: "Unexpected parameters for this action" },
            { status: 400 }
          );
        }
        data = await getUpcomingMovies();
        break;

      case "byGenre":
        if (!id || isNaN(Number(id))) {
          return NextResponse.json(
            { error: "Invalid or missing genre ID" },
            { status: 400 }
          );
        }
        data = await getMoviesByGenre(id);
        break;

      case "search":
        if (!query || query.length < 3) {
          return NextResponse.json(
            {
              error:
                "Invalid or missing search query. Query must be at least 3 characters long.",
            },
            { status: 400 }
          );
        }
        data = await searchMovies(query);
        break;

      default:
        return NextResponse.json(
          { error: `Invalid action parameter: ${action}` },
          { status: 400 }
        );
    }

    if (data && data.length > 0) {
      return NextResponse.json(
        { data },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600', // Cache for 30 min, serve stale for 1 hour
          }
        }
      );
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
