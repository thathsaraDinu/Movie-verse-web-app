import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader, Share, Share2 } from "lucide-react";

export default function WatchlistShareUrl({
  watchlistId,
}: {
  watchlistId: string;
}) {
  const [watchlistLink, setWatchlistLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const shareWatchlist = async (watchlistId: string) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/watchlist/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchlistId }),
      });

      const data = await response.json();
      if (response.ok) {
        const { shareUrl } = data;
        console.log(shareUrl);
        setWatchlistLink(shareUrl);
        toast.success("Watchlist link generated successfully");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error sharing watchlist:", error);
      toast.error("Failed to generate share link.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="absolute cursor-pointer top-6 right-6 flex space-x-2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4 flex flex-col">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <input
                  type="text"
                  disabled
                  value={watchlistLink}
                  placeholder="Watchlist shared link"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              )}
              <Button
                onClick={async () => await shareWatchlist(watchlistId)}
                disabled={isLoading}
              >
                {isLoading ? "Generating Link..." : "Generate Link"}
              </Button>
              <div className="space-y-2">
                <p>
                  Share this link with your friends to give them access to this
                  watchlist.
                </p>
                <p>
                  <strong>Note:</strong> Anyone with this link can view the
                  watchlist.
                </p>
                <p className="text-sm text-red-500">
                  This link contains a snapshot of the watchlist when the link
                  is generated. The link will be expired in 7 days.
                </p>
              </div>

              <div className="flex gap-4 justify-end items-center">
                <Button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 text-gray-800"
                >
                  {isCopying ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Cancel</span>
                  )}
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={isLoading || isCopying || watchlistLink === ""}
                  onClick={async () => {
                    try {
                      setIsCopying(true);
                      if (watchlistLink !== "")
                        await navigator.clipboard.writeText(watchlistLink);
                      toast.success("Link copied to clipboard");
                    } catch (error) {
                      toast.error("Failed to copy link");
                    }
                    setIsCopying(false);
                  }}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
