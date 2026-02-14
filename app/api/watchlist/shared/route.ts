import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";
import { v4 as uuidv4 } from "uuid";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB(); // Connect to database
    const { watchlistId } = await req.json(); // Get watchlist ID from request

    const originalWatchlist = await Watchlist.findById(watchlistId);
    if (!originalWatchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }

    // Check if a snapshot already exists
    let existingSnapshot = await Watchlist.findOne({
      isSnapshot: true,
      shareToken: { $exists: true },
      name: originalWatchlist.name,
      items: originalWatchlist.items,
    });

    if (existingSnapshot) {
      await Watchlist.updateOne(
        { _id: existingSnapshot._id },
        {
          $set: {
            imageUrl: originalWatchlist.imageUrl,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        }
      );
      return NextResponse.json({
        message: "Watchlist already shared!",
        shareUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/watchlist/shared/${existingSnapshot.shareToken}`,
      });
    }

    // Create a new snapshot only if none exist
    const snapshotWatchlist = new Watchlist({
      name: originalWatchlist.name,
      userId: null, // No owner, making it a shared snapshot
      items: originalWatchlist.items,
      shareToken: uuidv4(), // Generate a unique token
      imageUrl: originalWatchlist.imageUrl,
      isShared: true,
      isSnapshot: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await snapshotWatchlist.save();

    return NextResponse.json({
      message: "Watchlist shared successfully!",
      shareUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/watchlist/shared/${snapshotWatchlist.shareToken}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
