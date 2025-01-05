import { WatchList } from "@/lib/models/watchlist";
import connectDB from "@/lib/db";

export async function getUserWatchlist(userId: string) {
  await connectDB();
  const watchlist = await WatchList.findOne({ userId });
  return watchlist?.items || [];
}

export async function addWatchlistItem(userId: string, item: any) {
  await connectDB();

  const updateResult = await WatchList.findOneAndUpdate(
    { userId }, // Match the document by `userId`
    {
      $setOnInsert: { userId }, // Create a new document if it doesn't exist
      $addToSet: { items: item }, // Add the item if it doesn't already exist
    },
    {
      upsert: true, // Insert the document if it doesn't exist
      new: true, // Return the updated document
    }
  );

  return updateResult.items;
}

export async function removeWatchlistItem(userId: string, itemId: string) {
  await connectDB();

  const result = await WatchList.findOneAndUpdate(
    { userId },
    { $pull: { items: { movieId: itemId } } },
    { new: true } // Return the updated document
  );

  if (!result) {
    throw new Error("Watchlist for the user not found");
  }

  return result.items;
}

export async function isItemInWatchlist(
  userId: string,
  itemId: string
): Promise<boolean> {
  await connectDB();

  const itemExists = await WatchList.exists({
    userId,
    "items.movieId": itemId,
  });

  return !!itemExists; // Returns true if itemExists is found, otherwise false
}
//   if (!itemId) {
//     return NextResponse.json({ error: "Item not found" }, { status: 400 });
//   }
//
