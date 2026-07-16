// lib/models/watchlist.ts

import mongoose from "mongoose";


export interface IWatchlistItem {

  movieId: number;

  name: string;

  releaseDate?: string;

  imageUrl?: string;

  moviebackdrop_path?: string;

}


export interface IWatchlist {

  user?: mongoose.Types.ObjectId | null;

  name: string;

  items: IWatchlistItem[];

  imageUrl?: string;

  shareToken?: string;

  isShared: boolean;

  isSnapshot: boolean;

  expiresAt?: Date;

}


// Item schema
const watchlistItemSchema =
  new mongoose.Schema<IWatchlistItem>(
    {

      movieId: {
        type: Number,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      releaseDate: {
        type: String,
      },

      imageUrl: {
        type: String,
      },

      moviebackdrop_path: {
        type: String,
      },

    },
    {
      _id:false,
    }
  );



// Main schema
const watchlistSchema =
  new mongoose.Schema<IWatchlist>(
    {

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
        index:true,
      },


      name:{
        type:String,
        required:true,
        trim:true,
      },


      items:[
        watchlistItemSchema
      ],


      imageUrl:{
        type:String,
      },


      shareToken:{
        type:String,
        unique:true,
        sparse:true,
      },


      isShared:{
        type:Boolean,
        default:false,
      },


      isSnapshot:{
        type:Boolean,
        default:false,
      },


      expiresAt:{
        type:Date,
      },

    },
    {
      timestamps:true,
    }
  );



const Watchlist =
  mongoose.models.Watchlist ||
  mongoose.model<IWatchlist>(
    "Watchlist",
    watchlistSchema
  );


export default Watchlist;
export { Watchlist };