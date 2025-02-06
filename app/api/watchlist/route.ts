import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { WatchList } from "@/lib/models/watchlist";
import { getAuthSession } from "@/lib/auth";

// Create a new watchlist
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await connectDB();
    const watchlist = await WatchList.create({
      name,
      userId: session.user.id,
      items: [],
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get all watchlists for the user
export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const watchlists = await WatchList.find({ userId: session.user.id });
    return NextResponse.json(watchlists);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
