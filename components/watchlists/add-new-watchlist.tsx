import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function AddNewWatchlist({
  refetch,
  numberOfItems,
}: {
  refetch: () => Promise<void>;
  numberOfItems: number;
}) {
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createWatchlist(event: React.FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newWatchlistName }),
      });

      if (response.ok) {
        setNewWatchlistName("");
        setIsDialogOpen(false);
        toast.success("Watchlist created successfully");
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to create watchlist");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * numberOfItems,
          }}
          className="flex gap-2 justify-center items-center p-4 rounded-md border border-gray-300 hover:border-gray-400 cursor-pointer"
        >
          <Plus />
          Create Watchlist
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Watchlist</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form
            onSubmit={createWatchlist}
            className="space-y-4 flex flex-col justify-end items-end"
          >
            <Input
              placeholder="Watchlist name"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              required
            />
            <Button
              className={`flex items-center gap-2 ${
                isLoading ? "opacity-50" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <span>Create Watchlist</span>
              )}
            </Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
