import { NextResponse } from "next/server";
import {  getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { WatchList } from "@/lib/models/watchlist";

// Get item by id
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string; itemId: string } }
// ) {
//   try {
//     const session = await getAuthSession();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();
//     const watchlist = await WatchList.findOne({
//       _id: params.id,
//       userId: session.user.id,
//     });

//     if (!watchlist) {
//       return NextResponse.json(
//         { error: "Watchlist not found" },
//         { status: 404 }
//       );
//     }

//     const item = watchlist.items.find(
//       (item) => item.movieId === params.itemId
//     );

//     if (!item) {
//       return NextResponse.json({ error: "Item not found" }, { status: 404 });
//     }

//     return NextResponse.json(item);
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// Update item by id
export async function PUT(
  req: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, movieId, releaseDate, imageUrl } = await req.json();

    await connectDB();
    const watchlist = await WatchList.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id,
        "items.movieId": params.itemId,
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
      { new: true }
    );

    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist or item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(watchlist);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Remove item from watchlist
export async function DELETE(
  req: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const watchlist = await WatchList.findOneAndUpdate(
      { _id: params.id, userId: session.user.id },
      {
        $pull: {
          items: { movieId: params.itemId },
        },
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
