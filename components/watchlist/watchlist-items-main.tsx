"use client";

import { useEffect, useState } from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import WatchlistCard from "@/components/watchlist/watchlist-item-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getImageUrl } from "@/lib/tmdb";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface WatchlistItem {
  _id: string;
  name: string;
  movieId: string;
  releaseDate: string;
  imageUrl?: string;
}

interface Watchlist {
  _id: string;
  name: string;
  items: WatchlistItem[];
}

function WatchlistPageContent({ watchlistId }: { watchlistId: string }) {
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [watchlistName, setWatchlistName] = useState("");
  const [watchlistImage, setWatchlistImage] = useState("");

  async function getWishlistItemsById() {
    try {
      const response = await fetch(`/api/watchlist/${watchlistId}`, {
        method: "Get",
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data.items);
        setWatchlistName(data.name);
        setWatchlistImage(data.imageUrl);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getWishlistItemsById();
  });

  async function updateWatchlistImage(imageUrl: string) {
    try {
      const response = await fetch(`/api/watchlist/${watchlistId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlistImage(imageUrl);
      }
    } catch (error) {
      throw Error("Failed to update watchlist image");
    }
  }

  return (
    <div className="overflow-clip">
      {loading ? (
        <></>
      ) : watchlistImage == "" ? (
        <></>
      ) : (
        <div className="absolute top-0 w-full -z-50 h-screen bg-cover object-cover">
          <Image
            src={getImageUrl(watchlistImage, "original")}
            alt="movie poster"
            layout="fill"
            objectFit="cover"
            className={`bg-cover object-cover bg-center h-full w-full -z-50`}
          />

          {/* Gradient Overlay */}
          <div className="h-full w-full bg-gradient-to-b from-background/20 to-background -z-40" />
        </div>
      )}
      <section className="flex flex-col gap-6 pagesection">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">{watchlistName}</h1>
        </motion.div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage title="Error" message="Please try again later" />
        ) : !watchlist?.length ? (
          <div className="flex justify-center items-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
              }}
            >
              <Link
                href={"/genres/Adventure?id=12"}
                className="flex gap-3 w-full h-full flex-col p-20 justify-center hover:shadow-[0_0_15px_theme(colors.foreground/50)] items-center border-foreground border rounded-lg transition-colors duration-300 ease-in-out"
              >
                <Plus className="w-8 h-8" />
                Add a movie
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 mx-auto">
            {watchlist &&
              watchlist.map((item: any, index: number) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="col-span-1 ">
                    <WatchlistCard
                      watchlistId={watchlistId}
                      updateWatchlistImage={updateWatchlistImage}
                      watchlistItem={item}
                      refetch={getWishlistItemsById}
                    />
                  </div>
                </motion.div>
              ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: watchlist ? 0.1 * watchlist.length : 0, // Delays after last item
              }}
            >
              <Link
                href={"/genres/Adventure?id=12"}
                className="flex gap-3 flex-col p-5 w-full h-full justify-center hover:shadow-[0_0_15px_theme(colors.foreground/50)] items-center border-foreground border rounded-lg transition-colors duration-300 ease-in-out"
              >
                <Plus className="w-8 h-8" />
                Add another
              </Link>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}

export default WatchlistPageContent;
