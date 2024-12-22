import mongoose from "mongoose";

const watchlistItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  imageUrl: String,
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [watchlistItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

watchlistSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const WatchList =
  mongoose.models.WatchList || mongoose.model("WatchList", watchlistSchema);
