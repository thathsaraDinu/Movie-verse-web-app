import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";


// Get watchlist by share token
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {

    const { id } = await params;


    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          error: "Invalid share token",
        },
        {
          status: 400,
        }
      );
    }


    await connectDB();


    const watchlist =
      await Watchlist.findOne({
        shareToken: id,
        isSnapshot: true,
      }).lean();



    if (!watchlist) {
      return NextResponse.json(
        {
          error: "Watchlist not found or expired",
        },
        {
          status:404,
        }
      );
    }



    return NextResponse.json(
      watchlist,
      {
        headers:{
          "Cache-Control":"no-store",
        },
      }
    );


  } catch(error) {

    console.error(
      "Get shared watchlist error:",
      error
    );


    return NextResponse.json(
      {
        error:"Internal server error",
      },
      {
        status:500,
      }
    );
  }
}