"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import WatchlistsSelect from "./watchlists-select";
import { motion } from "framer-motion";

interface WatchlistToggleButtonProps {
  movieId: Number;
  name: String;
  releaseDate: String;
  imageUrl: String | null;
  moviebackdrop_path: String | null;
}

interface AddItemToWatchlistParams {
  watchlistId: string;
  movieId: Number;
  name: String;
  releaseDate: String;
  imageUrl: String | null;
  moviebackdrop_path: String | null;
}

export default function WatchlistToggleButton({
  movieId,
  name,
  releaseDate,
  imageUrl,
  moviebackdrop_path,
}: WatchlistToggleButtonProps) {
  const [open, setOpen] = useState(false);

  async function addItemToWatchlist(watchlistId: string) {
    try {
      const response = await fetch(`/api/watchlist/${watchlistId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          name,
          releaseDate,
          imageUrl,
          moviebackdrop_path,
        } as AddItemToWatchlistParams),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
      } else {
        toast.success("Item added to watchlist");
      }
    } catch (error) {
      toast.error("Failed to add item to watchlist");

      // Handle error
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Heart className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[60vw] h-[80vh] overflow-y-auto flex flex-col">
            <DialogHeader>
              <DialogTitle>Select Watchlist</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <WatchlistsSelect addItemToWatchlist={addItemToWatchlist} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
