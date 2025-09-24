import mongoose, { Schema, Document, Types } from "mongoose";

// Define interfaces for better type safety
interface IWatchlistItem {
  name: string;
  movieId: string;
  releaseDate: Date;
  imageUrl?: string;
  moviebackdrop_path?: string;
  addedAt: Date;
}

interface IWatchlist extends Document {
  name: string;
  userId?: Types.ObjectId;
  imageUrl: string;
  items: IWatchlistItem[];
  isShared: boolean;
  isSnapshot: boolean;
  shareToken?: string;
  expiresAt?: Date;
}

const watchlistItemSchema = new Schema<IWatchlistItem>({
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

const watchlistSchema = new Schema<IWatchlist>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // We'll handle this logic in pre-save middleware
    },
    imageUrl: {
      type: String,
      default: "",
    },
    items: [watchlistItemSchema],
    isShared: { type: Boolean, default: false }, // If the watchlist is shared
    isSnapshot: { type: Boolean, default: false }, // If it's a frozen snapshot
    shareToken: { type: String, unique: true, sparse: true }, // Token for sharing, only for snapshots
    expiresAt: { type: Date, default: null }, // New field for TTL
  },
  { timestamps: true }
);

// Add pre-save middleware to handle the conditional userId requirement
watchlistSchema.pre('save', function() {
  if (!this.isSnapshot && !this.userId) {
    throw new Error('userId is required for non-snapshot watchlists');
  }
});


export const WatchList =
  mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);
