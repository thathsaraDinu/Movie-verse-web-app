"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSession } from "next-auth/react";

interface WatchlistToggleButtonProps {
  movieId: Number;
  name: String;
  releaseDate: String;
  imageUrl: String | null;
}

export default function WatchlistToggleButton({
  movieId,
  name,
  releaseDate,
  imageUrl,
}: WatchlistToggleButtonProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the item is already in the watchlist
    const checkWatchlist = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/isInWatchlist`, {
        method: "POST",
        body: JSON.stringify({ movieId }),
      });
      setIsLoading(false);
      const data = await response.json();
      setIsWatchlisted(data.isInWatchlist);
    };
    checkWatchlist();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Button disabled className="w-full">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary mr-2" />
          Please wait...
        </Button>
      ) : isWatchlisted ? (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div
                className={`w-full h-10 px-4 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-500/90`}
              >
                <Heart className="w-5 h-5 mr-2 fill-white" color="#FFFFFF"/>
                Remove from Watchlist
              </div>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="text-lg font-semibold leading-none tracking-tight">
                <DialogTitle className="text-grey-800 text-xl font-medium">
                  Remove from Watchlist ?
                </DialogTitle>{" "}
                <DialogDescription className="text-grey-600 text-sm">
                  Are you sure you want to remove{" "}
                  <span className="font-bold">{name}</span> movie from your
                  watchlist?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button onClick={() => setOpen(false)} variant={"secondary"}>
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      await fetch(`/api/watchlist?id=${movieId}`, {
                        method: "DELETE",
                      });
                      setIsLoading(false);
                      setIsWatchlisted(false); // Item removed from watchlist
                      setOpen(false); // Close dialog
                      toast.success("Removed from Watchlist");
                    } catch (error) {
                      toast.error(
                        "An error occurred while removing from watchlist"
                      );
                    }
                  }}
                >
                  Remove
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Button
          className="w-full"
          onClick={async () => {
            try {
              setIsLoading(true);
              await fetch(`/api/watchlist`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ movieId, name, releaseDate, imageUrl }),
              });
              setIsLoading(false);
              setIsWatchlisted(!isWatchlisted);
              toast.success("Added to Watchlist");
            } catch (error) {
              toast.error("An error occurred while adding to watchlist");
            }
          }}
        >
          <Heart className="w-5 h-5 mr-2" />
          Add to Watchlist
        </Button>
      )}
    </div>
  );
}
