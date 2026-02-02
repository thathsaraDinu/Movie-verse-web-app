import mongoose from "mongoose";

const watchlistItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  imageUrl: String,
  moviebackdrop_path: String,
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the required function separately
const userIdRequired = function (this: any) {
  return !this.isSnapshot; // Only required if it's NOT a snapshot
};

const watchlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: userIdRequired, // Use the predefined function
    },
    imageUrl: {
      type: String,
      default: "",
    },
    items: [watchlistItemSchema],
    isShared: { type: Boolean, default: false }, // If the watchlist is shared
    isSnapshot: { type: Boolean, default: false }, // If it's a frozen snapshot
    shareToken: { type: String, unique: true, sparse: true }, // Token for sharing, only for snapshots
    expiresAt: { type: Date, default: null }, // ⬅️ New field for TTL
  },
  { timestamps: true }
);

export const WatchList =
  mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);