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

// Define schema with explicit typing
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
  items: [{
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
  }],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});