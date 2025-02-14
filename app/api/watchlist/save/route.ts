import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { WatchList } from "@/lib/models/watchlist";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }
    await connectDB();
    const { shareToken } = await req.json();
    const snapshot = await WatchList.findOne({ shareToken, isSnapshot: true });
    if (!snapshot) {
      return NextResponse.json(
        { error: "Shared watchlist not found or expired" },
        { status: 404 }
      );
    }

    let existingWatchlist = await WatchList.findOne({
      name: snapshot.name,
      items: snapshot.items,
      isSnapshot: false,
    });

    if (existingWatchlist) {
      return NextResponse.json(
        {
          error: "Watchlist already exists!",
        },
        { status: 400 }
      );
    }

    // Create a new personal copy for the user
    const newWatchlist = new WatchList({
      name: snapshot.name,
      userId: session.user.id,
      imageUrl: snapshot.imageUrl,
      items: snapshot.items,
      isShared: false,
    });

    await newWatchlist.save();

    return NextResponse.json({ message: "WatchList saved successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
