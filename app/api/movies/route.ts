import { NextResponse } from "next/server";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  searchMovies,
  type Movie,
} from "@/lib/tmdb";


// Default route cache
export const revalidate = 3600;


export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const query = searchParams.get("query");


  try {

    let data: Movie[] | undefined;
    let cacheTime = 3600;


    switch (action) {

      case "trending":

        if (id || query) {
          return NextResponse.json(
            {
              error:
                "Unexpected parameters for this action"
            },
            {
              status: 400
            }
          );
        }

        data = await getTrendingMovies();

        // Trending changes frequently
        cacheTime = 3600;

        break;



      case "upcoming":

        if (id || query) {
          return NextResponse.json(
            {
              error:
                "Unexpected parameters for this action"
            },
            {
              status: 400
            }
          );
        }

        data = await getUpcomingMovies();

        // Upcoming movies rarely change
        cacheTime = 43200; // 12 hours

        break;



      case "byGenre":

        if (!id || isNaN(Number(id))) {
          return NextResponse.json(
            {
              error:
                "Invalid or missing genre ID"
            },
            {
              status:400
            }
          );
        }

        data = await getMoviesByGenre(id);

        // Genre lists rarely change
        cacheTime = 604800; // 7 days

        break;



      case "search":

        if (!query || query.length < 3) {
          return NextResponse.json(
            {
              error:
                "Invalid or missing search query. Query must be at least 3 characters long."
            },
            {
              status:400
            }
          );
        }

        data = await searchMovies(query);

        // Search results can be cached
        cacheTime = 86400; // 24 hours

        break;



      default:

        return NextResponse.json(
          {
            error:
              `Invalid action parameter: ${action}`
          },
          {
            status:400
          }
        );
    }



    if (!data || data.length === 0) {

      return NextResponse.json(
        {
          error:"Data not found"
        },
        {
          status:404
        }
      );

    }



    return NextResponse.json(
      {
        data
      },
      {
        headers:{
          "Cache-Control":
            `public, s-maxage=${cacheTime}, stale-while-revalidate=${cacheTime * 2}`
        }
      }
    );


  } catch(error) {


    console.error(
      "Error in API handler:",
      error
    );


    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request",

        details:
          error instanceof Error
          ? error.message
          : String(error)
      },
      {
        status:500
      }
    );
  }
}