import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getAuthSession } from "@/lib/auth";
import { Watchlist, type IWatchlist } from "@/lib/models/watchlist";


export async function POST(req: Request) {

  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status:401
        }
      );
    }


    const { watchlistId } = await req.json();


    if (!watchlistId) {
      return NextResponse.json(
        {
          error:"Watchlist ID is required"
        },
        {
          status:400
        }
      );
    }


    await connectDB();


    // Only allow owner to share their watchlist
    const originalWatchlist =
      await Watchlist.findOne({
      _id: watchlistId,
      user: session.user.id,
      isSnapshot:false,
    }).lean<IWatchlist>();



    if (!originalWatchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found"
        },
        {
          status:404
        }
      );
    }



    const expiresAt =
      new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      );



    // Create a new snapshot
    const snapshotWatchlist =
      await Watchlist.create({

        name:
          originalWatchlist.name,

        user: null,

        items:
          originalWatchlist.items,

        shareToken:
          uuidv4(),

        imageUrl:
          originalWatchlist.imageUrl,

        isShared:true,

        isSnapshot:true,

        expiresAt,

      });



    return NextResponse.json(
      {
        message:
          "Watchlist shared successfully!",

        shareUrl:
          `${process.env.NEXT_PUBLIC_SERVER_URL}/watchlist/shared/${snapshotWatchlist.shareToken}`,
      },
      {
        status:201
      }
    );



  } catch(error) {


    console.error(
      "Share watchlist error:",
      error
    );


    return NextResponse.json(
      {
        error:"Internal server error"
      },
      {
        status:500
      }
    );

  }
}