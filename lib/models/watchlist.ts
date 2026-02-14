// lib/models/watchlist.ts
import mongoose from 'mongoose';

interface IWatchlistItem {
  movieId: number;
  title: string;
  posterPath?: string;
  addedAt: Date;
  notes?: string;
}

interface IWatchlist {
  user: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  isPublic: boolean;
  items: IWatchlistItem[];
  collaborators: mongoose.Types.ObjectId[];
}

// Define the items sub-schema separately to reduce type complexity
const watchlistItemSchema = new mongoose.Schema<IWatchlistItem>({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  posterPath: String,
  addedAt: {
    type: Date,
    default: Date.now
  },
  notes: String
}, { _id: false }); // Don't create _id for sub-documents

// Define main schema with explicit typing
const watchlistSchema = new mongoose.Schema<IWatchlist>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  items: [watchlistItemSchema], // Use the pre-defined sub-schema
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Create and export the model
const Watchlist = mongoose.models.Watchlist || mongoose.model<IWatchlist>('Watchlist', watchlistSchema);

// Export as both default and named export for flexibility
export default Watchlist;
export { Watchlist };