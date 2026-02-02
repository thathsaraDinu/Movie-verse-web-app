import mongoose from "mongoose";

// 1. Create a simple watchlist item schema without complex options
const watchlistItemSchema = new mongoose.Schema({
  name: String,
  movieId: String,
  releaseDate: Date,
  imageUrl: String,
  moviebackdrop_path: String,
  addedAt: { type: Date, default: Date.now }
});

// 2. Create the main schema with minimal configuration
const schemaDefinition = {
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // Remove the complex required function for now
  },
  imageUrl: { type: String, default: "" },
  items: [watchlistItemSchema],
  isShared: { type: Boolean, default: false },
  isSnapshot: { type: Boolean, default: false },
  shareToken: { type: String },
  expiresAt: { type: Date }
};

// 3. Create the schema
const watchlistSchema = new mongoose.Schema(schemaDefinition, {
  timestamps: true
});

// 4. Add custom validation AFTER schema creation
watchlistSchema.path('userId').validate(function(this: any) {
  return !this.isSnapshot;
}, 'User ID is required for non-snapshot watchlists');

// 5. Add unique index separately if needed
watchlistSchema.index({ shareToken: 1 }, { unique: true, sparse: true });

export const WatchList =
  mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);