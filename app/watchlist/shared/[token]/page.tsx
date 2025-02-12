"use client";

import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import WatchlistCard from "@/components/watchlist/watchlist-item-card";
import { Watchlist } from "@/components/watchlist/watchlist-items-main";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Loader, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/lib/tmdb";
import { formatDate, formatRating } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WatchlistToggleButton from "@/components/watchlists/watchlist-toggle-button";
import Link from "next/link";

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

  console.log(watchlist?.items.length);
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
            >
              <button
                disabled={isAdding}
                onClick={() => saveSharedWatchlist(params.token)}
                className="w-56  justify-center items-center flex gap-2 p-4 rounded-md border border-gray-300 hover:border-gray-400 cursor-pointer"
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
              watchlist.items.map((watchlistItem: any) => (
                <>
                  <Card className="group relative overflow-hidden h-[300px] sm:h-[400px] bg-card">
                    <div
                      className={`md:transform max-w-42 z-10 absolute md:group-hover:translate-x-[0%] md:-translate-x-[120%] top-2 mx-2 transition-transform duration-500 `}
                    >
                      <WatchlistToggleButton
                        movieId={watchlistItem.movieId}
                        name={watchlistItem.name}
                        releaseDate={watchlistItem.releaseDate}
                        imageUrl={watchlistItem.imageUrl}
                        moviebackdrop_path={watchlistItem.moviebackdrop_path}
                      />
                    </div>
                    <div className="absolute inset-0">
                      {watchlistItem.imageUrl ? (
                        <Image
                          src={getImageUrl(watchlistItem.imageUrl, "w500")}
                          alt={watchlistItem.title || "movie poster"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={false}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 transition-transform duration-500 group-hover:scale-110 text-center">
                          No Image Available
                        </div>
                      )}

                      {/* Gradient overlays */}
                      <div className="absolute bottom-0 top-1/4 left-0 right-0 bg-gradient-to-t from-black to-transparent translate-y-[0%] group-hover:translate-y-0 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <Link
                      href={`/movies/${watchlistItem.movieId}`}
                      className="relative h-full flex flex-col justify-end p-3 md:p-5 text-white"
                    >
                      {/* Main content - slides up on hover */}
                      <div className="transform translate-y-[40%] group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="md:text-2xl font-bold mb-2 text-white/90 line-clam text-xl">
                          {watchlistItem.name}
                        </h3>

                        <div className="flex items-center text-sm text-white/70 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(watchlistItem.releaseDate || "")}
                        </div>
                        <div className="text-xs md:text-sm text-white/80 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Added:{" "}
                          {new Date(watchlistItem.addedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  </Card>
                </>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
