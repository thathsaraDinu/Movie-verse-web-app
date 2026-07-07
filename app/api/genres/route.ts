import { getGenres } from "@/lib/tmdb";
import { Genre } from "@/lib/tmdb";

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

// Export the GET handler as a named export for Next.js App Router
export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const genres: Genre[] = await getGenres(); // Fetch genres from the getGenres function
    return new Response(JSON.stringify(genres), { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour, serve stale for 24 hours
      }
    }); // Return genres as JSON with a 200 OK status
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
