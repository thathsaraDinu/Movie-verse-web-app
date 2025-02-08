"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function WatchlistDeleteButton({ id, refetch, name }: any) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteWatchlist(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/watchlist/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Watchlist deleted successfully");
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to delete watchlist");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="leading-none tracking-tight">
          <DialogTitle>Delete Watchlist?</DialogTitle>{" "}
          <DialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-semibold">{name}</span> watchlist
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
            onClick={async () => await deleteWatchlist(id)}
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
  );
}
