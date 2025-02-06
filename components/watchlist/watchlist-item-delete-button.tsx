"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function WatchlistItemDeleteButton({
  id,
  refetch,
  name,
  watchlistId,
}: any) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const remove = async (id: number) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/watchlist/${watchlistId}/items/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Removed successfully");
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to remove from Watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="btn btn-primary font-bold text-xs cursor-pointer text-center border-1 py-2 px-5 rounded bg-red-600 hover:bg-red-600/90 text-white  transition-all ease-in-out duration-300">
            Remove
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="leading-none tracking-tight">
            <DialogTitle>Remove from Watchlist ?</DialogTitle>{" "}
            <DialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold">{name}</span> movie from your
              watchlist?
            </DialogDescription>
          </DialogHeader>{" "}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant={"secondary"} onClick={() => setOpen(false)}>
              No
            </Button>{" "}
            <Button
              className={`
              ${isLoading ? "opacity-50" : ""}
              `}
              variant={"destructive"}
              onClick={() => remove(id)}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <span>Yes</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
