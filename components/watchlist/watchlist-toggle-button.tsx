"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
            <DialogTrigger className="w-full">
              <Button
                onClick={() => setOpen(true)} // Trigger dialog open
                className="w-full"
              >
                {" "}
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Remove from Watchlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-lg font-semibold leading-none tracking-tight">
                Remove from Watchlist ?
              </DialogHeader>

              <p>
                Are you sure you want to remove{" "}
                <span className="font-bold">{name}</span> movie from your
                watchlist?
              </p>
              <div className="flex gap-5 justify-end"></div>
              <DialogFooter>
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
