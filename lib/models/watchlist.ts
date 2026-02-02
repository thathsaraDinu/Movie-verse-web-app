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
  return !this.isSnapshot;
};

// Use type assertion to bypass TypeScript's complex type inference
const watchlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: userIdRequired,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    items: [watchlistItemSchema],
    isShared: { type: Boolean, default: false },
    isSnapshot: { type: Boolean, default: false },
    shareToken: { type: String, unique: true, sparse: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
) as any; // ← ADD THIS TYPE ASSERTION

export const WatchList =
  mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);