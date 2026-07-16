import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";
import { getAuthSession } from "@/lib/auth";


export async function POST(req: Request) {
  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Please log in"
        },
        {
          status: 401
        }
      );
    }


    const { shareToken } = await req.json();


    if (!shareToken || typeof shareToken !== "string") {
      return NextResponse.json(
        {
          error: "Invalid share token"
        },
        {
          status: 400
        }
      );
    }


    await connectDB();


    const snapshot = await Watchlist.findOne({
      shareToken,
      isSnapshot: true
    });


    if (!snapshot) {
      return NextResponse.json(
        {
          error: "Shared watchlist not found or expired"
        },
        {
          status: 404
        }
      );
    }


    const existingWatchlist = await Watchlist.findOne({
      user: session.user.id,
      name: snapshot.name,
      items: snapshot.items,
      isSnapshot: false,
    });


    if (existingWatchlist) {
      return NextResponse.json(
        {
          error: "Watchlist already exists"
        },
        {
          status: 409
        }
      );
    }


    const newWatchlist = await Watchlist.create({
      name: snapshot.name,
      user: session.user.id,
      imageUrl: snapshot.imageUrl,
      items: snapshot.items,
      isShared: false,
      isSnapshot: false,
    });


    return NextResponse.json(
      {
        message: "Watchlist saved successfully!",
        watchlistId: newWatchlist._id,
      },
      {
        status: 201
      }
    );


  } catch (error) {

    console.error(
      "Save shared watchlist error:",
      error
    );


    return NextResponse.json(
      {
        error: "Internal server error"
      },
      {
        status:500
      }
    );
  }
}