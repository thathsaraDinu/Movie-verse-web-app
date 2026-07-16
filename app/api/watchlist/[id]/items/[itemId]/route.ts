import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";
import mongoose from "mongoose";


// Update item by id
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; itemId: string }>;
  }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }


    const { id, itemId } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error: "Invalid watchlist id",
        },
        {
          status: 400,
        }
      );
    }


    const {
      name,
      movieId,
      releaseDate,
      imageUrl,
    } = await req.json();


    if (!name || !movieId) {
      return NextResponse.json(
        {
          error: "Name and movieId are required",
        },
        {
          status: 400,
        }
      );
    }


    await connectDB();


    const watchlist = await Watchlist.findOneAndUpdate(
      {
        _id: id,
        user: session.user.id,
        "items.movieId": itemId,
      },
      {
        $set: {
          "items.$": {
            name,
            movieId,
            releaseDate,
            imageUrl,
          },
        },
      },
      {
        new: true,
      }
    );


    if (!watchlist) {
      return NextResponse.json(
        {
          error: "Watchlist or item not found",
        },
        {
          status: 404,
        }
      );
    }


    return NextResponse.json(watchlist);


  } catch (error) {

    console.error(
      "Update watchlist item error:",
      error
    );


    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status:500,
      }
    );
  }
}





// Remove item from watchlist
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; itemId: string }>;
  }
) {

  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );
    }


    const { id, itemId } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error:"Invalid watchlist id",
        },
        {
          status:400,
        }
      );
    }


    await connectDB();


    const watchlist =
      await Watchlist.findOneAndUpdate(
        {
          _id:id,
          user:session.user.id,
        },
        {
          $pull:{
            items:{
              movieId:itemId,
            },
          },
        },
        {
          new:true,
        }
      );


    if (!watchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found",
        },
        {
          status:404,
        }
      );
    }


    return NextResponse.json(watchlist);


  } catch(error) {

    console.error(
      "Delete watchlist item error:",
      error
    );


    return NextResponse.json(
      {
        error:"Server error",
      },
      {
        status:500,
      }
    );
  }
}