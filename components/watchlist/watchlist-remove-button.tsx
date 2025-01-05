"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
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
        <DialogTrigger>
          <Button className="btn btn-primary font-bold text-xs">
            Remove
            <span className="hidden md:inline-block ml-1"> from Watchlist</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-lg font-semibold leading-none tracking-tight">
            Remove from Watchlist ?
          </DialogHeader>{" "}
          <p>
            Are you sure you want to remove{" "}
            <span className="font-bold">{name}</span> from your watchlist?
          </p>
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
