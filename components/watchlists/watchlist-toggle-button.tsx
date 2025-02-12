"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import WatchlistsSelect from "./watchlists-select";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
        {status === "loading" ? (
          <div className="w-full flex items-center justify-center">
            <Loader2 />
          </div>
        ) : (
          <Button
            onClick={() => {
              if (!session) {
                toast.error("You need to be logged in to add to watchlist");
                router.push("/auth/signin");
              } else {
                setOpen(true);
              }
            }}
            className="w-full px-3 py-2"
          >
            <Heart className="hidden md:block w-5 h-5 mr-2" />
            Add to Watchlist
          </Button>
        )}

        {session && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:max-w-[60vw] h-[80vh] overflow-y-auto flex flex-col">
              <DialogHeader>
                <DialogTitle>Select Watchlist</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <WatchlistsSelect addItemToWatchlist={addItemToWatchlist} />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </motion.div>
  );
}
