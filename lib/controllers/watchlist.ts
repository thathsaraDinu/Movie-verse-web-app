// import { WatchList } from "@/lib/models/watchlist";
// import connectDB from "@/lib/db";

// export async function getUserWatchlistItems(userId: string, watchlistId: string) {
//   await connectDB();
//   const watchlist = await WatchList.findOne({ userId});
//   return watchlist?.items.items || [];
// }

// export async function getUserWatchlists(userId: string) {
//   await connectDB();
//   const watchlist = await WatchList.findOne({ userId });
//   return watchlist?.items || [];
// }

// export async function addWatchlistItem(userId: string, watchlistId: string, item: any) {
//   await connectDB();

//   const watchlists = await WatchList.findOneAndUpdate(
//     { userId } // Match the document by `userId`
//   );

//   const updatedResult = await watchlists.filter((item: any)=>{item._id === _id})

//   return updateResult.items;
// }

// export async function removeWatchlistItem(userId: string, itemId: string) {
//   await connectDB();

//   const result = await WatchList.findOneAndUpdate(
//     { userId },
//     { $pull: { items: { movieId: itemId } } },
//     { new: true } // Return the updated document
//   );

//   if (!result) {
//     throw new Error("Watchlist for the user not found");
//   }

//   return result.items;
// }

// export async function isItemInWatchlist(
//   userId: string,
//   itemId: string
// ): Promise<boolean> {
//   await connectDB();

//   const itemExists = await WatchList.exists({
//     userId,
//     "items.movieId": itemId,
//   });

//   return !!itemExists; // Returns true if itemExists is found, otherwise false
// }
// //   if (!itemId) {
// //     return NextResponse.json({ error: "Item not found" }, { status: 400 });
// //   }
// //
