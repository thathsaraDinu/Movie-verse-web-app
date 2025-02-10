"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { motion } from "framer-motion";
import { Loader, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const AddWatchlistByLink = ({ refetch }: { refetch: any }) => {
  const [watchlistLink, setWatchlistLink] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const saveSharedWatchlist = async (shareUrl: string) => {
    try {
      setIsLoading(true);
      // Extract shareToken from the URL
      const url = new URL(shareUrl);
      const shareToken = url.pathname.split("/").pop(); // Assumes token is at the end of the URL

      if (!shareToken) {
        alert("Invalid share link!");
        return;
      }

      const response = await fetch("/api/watchlist/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareToken }),
      });

      const data = await response.json();
      if (response.ok) {
        await refetch();
        setIsDialogOpen(false);
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to save watchlist");
      console.error("Error saving watchlist:", error);
    }
    setWatchlistLink("");
    setIsLoading(false);
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2 justify-center items-center p-4 rounded-md border border-gray-300 hover:border-gray-400 cursor-pointer"
          >
            <Plus />
            Add By Link
          </motion.div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Watchlist by shared link</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveSharedWatchlist(watchlistLink);
              }}
              className="space-y-4 flex flex-col justify-end items-end"
            >
              <input
                type="text"
                value={watchlistLink}
                required
                onChange={(e) => setWatchlistLink(e.target.value)}
                placeholder="Enter watchlist shared link or token"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <div className="flex gap-4 justify-end items-center">
                <Button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Watchlist"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
};
