"use client";

import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import WatchlistCard from "@/components/watchlist/watchlist-item-card";
import { Watchlist } from "@/components/watchlist/watchlist-items-main";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader, Plus } from "lucide-react";

export default function SharedWatchlist({
  params,
}: {
  params: { token: string };
}) {
  const [watchlist = { name: "", items: [] }, setWatchlist] =
    useState<Watchlist>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  async function getWatchlist() {
    try {
      setLoading(true);
      const res = await fetch(`/api/watchlist/shared/${params.token}`);
      const watchlist = await res.json();

      if (!res.ok) {
        setError(watchlist.error || "Failed to load watchlist");
        return;
      }

      setWatchlist(watchlist);
    } catch (error) {
      setError("Failed to load watchlist");
      console.error("Error fetching watchlist:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWatchlist();
  }, []);

  const saveSharedWatchlist = async (shareToken: string) => {
    try {
      setIsAdding(true);
      // Extract shareToken from the URL

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
        toast.success(data.message);
        window.location.href = `/watchlist`;
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to save watchlist");
      console.error("Error saving watchlist:", error);
    }
    setIsAdding(false);
  };
  return (
    <section className="pagesection">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage title="Failed to load watchlist" message={error} />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-5 justify-between">
            <h1 className="text-3xl font-bold">{watchlist.name} (Shared)</h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2 justify-center items-center p-4 rounded-md border border-gray-300 hover:border-gray-400 cursor-pointer"
            >
              <button
                disabled={isAdding}
                onClick={() => saveSharedWatchlist(params.token)}
                className="w-48 flex justify-center items-center "
              >         
                {isAdding ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <div className="flex gap-2 items-center">
                    <Plus />
                    Add To My Watchlist
                  </div>
                )}
              </button>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 mx-auto">
            {watchlist &&
              watchlist.items.map((watchlist: any) => (
                <WatchlistCard
                  key={watchlist._id}
                  watchlistItem={watchlist}
                  refetch={getWatchlist}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
