import { WatchList } from "@/lib/models/watchlist";
import connectDB from "@/lib/db";

export async function getUserWatchlist(userId: string) {
  await connectDB();
  const watchlist = await WatchList.findOne({ userId });
  return watchlist?.items || [];
}

export async function addWatchlistItem(userId: string, item: any) {
  await connectDB();
  let watchlist = await WatchList.findOne({ userId });

  if (!watchlist) {
    watchlist = new WatchList({
      userId,
      items: [item],
    });
  } else {
    const itemExists = watchlist.items.find(
      (i: any) => i.movieId.toString() === item.movieId.toString()
    );

    if (itemExists) {
      return watchlist.items;
    }
    watchlist.items.push(item);
  }
  await watchlist.save();
  return watchlist.items;
}

export async function removeWatchlistItem(userId: string, itemId: string) {
  await connectDB();
  const watchList = await WatchList.findOne({ userId });

  if (!watchList) {
    throw new Error("watchList not found");
  }

  watchList.items = watchList.items.filter(
    (item: any) => item._id.toString() !== itemId
  );

  await watchList.save();
  return watchList.items;
}

export async function isItemInWatchlist(userId: string, itemId: string) {
  await connectDB();
  const watchList = await WatchList.findOne({ userId });
  if (!watchList) {
    return false;
  }
  const itemExists = watchList.items.find(
    (i: any) => i.movieId.toString() === itemId.toString()
  );
  if (itemExists) {
    return true;
  }else{
    return false;
  }
}
//   if (!itemId) {
//     return NextResponse.json({ error: "Item not found" }, { status: 400 });
//   }
//
