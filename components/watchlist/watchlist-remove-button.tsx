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

export default function WatchlistRemoveButton({ id, refetch, name }: any) {
  const [open, setOpen] = useState(false);

  const remove = async (id: number) => {
    await fetch(`/api/watchlist?id=${id}`, {
      method: "DELETE",
    });
    toast.success("Removed from Watchlist");
    refetch();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="btn btn-primary font-bold text-xs cursor-pointer border-1 p-2 rounded hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300">
            Remove
            <span className="hidden md:inline-block ml-1"> from Watchlist</span>
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
          </DialogHeader>{" "}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant={"secondary"} onClick={() => setOpen(false)}>
              No
            </Button>{" "}
            <Button variant={"destructive"} onClick={() => remove(id)}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
