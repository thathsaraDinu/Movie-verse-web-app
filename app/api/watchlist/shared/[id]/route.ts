import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { WatchList } from "@/lib/models/watchlist";


// Get watchlist id by share token
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const watchlist = await WatchList.findOne({
      shareToken: params.id as string,
      isSnapshot: true,
    });
    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist not found or expired" },
        { status: 404 }
      );
    }
    return NextResponse.json(watchlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
