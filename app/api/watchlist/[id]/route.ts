import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";

// Add item to watchlist
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, movieId, releaseDate, imageUrl, moviebackdrop_path } =
      await req.json();

    const { id } = await params;

    const movie_id = new mongoose.Types.ObjectId(id);

    await connectDB();

    const existingWatchlist = await Watchlist.findOne({
      _id: movie_id,
      userId: session.user.id,
      "items.movieId": movieId,
    });

    if (existingWatchlist) {
      return NextResponse.json(
        { error: "Movie already exists in the watchlist" },
        { status: 400 }
      );
    }
    // Update the watchlist by adding the new movie and conditionally updating imageUrl
    const updatedWatchlist = await Watchlist.findOneAndUpdate(
      {
        _id: movie_id,
        userId: session.user.id,
        "items.movieId": { $ne: movieId },
      },
      {
        $set: {
          $cond: {
            if: { $eq: ["$imageUrl", ""] },
            then: imageUrl,
            else: "$imageUrl",
          },
        },
        $push: {
          items: { name, movieId, releaseDate, imageUrl, moviebackdrop_path },
        },
      },
      { new: true }
    );

    if (!updatedWatchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedWatchlist, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// update watchlist image
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageUrl } = await req.json();
    const { id } = await params;

    await connectDB();
    const watchlist = await Watchlist.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), userId: session.user.id },
      {
        imageUrl,
      },
      { new: true }
    );

    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(watchlist);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get all items in watchlist
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    const watchlist = await Watchlist.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId: session.user.id,
    });
    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(watchlist);
  } catch (error: any) {
    console.log(`Error type: ${error.constructor.name}`);
    if (error.name === "BSONError") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Delete watchlist
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectDB();
    const watchlist = await Watchlist.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: session.user.id,
    });

    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Watchlist deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
