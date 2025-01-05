import { getAuthSession } from "@/lib/auth";
import { isItemInWatchlist } from "@/lib/controllers/watchlist";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { movieId } = await req.json();

    const isInWatchlist = await isItemInWatchlist(session.user.id, movieId);

    return NextResponse.json({ isInWatchlist });
   
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
