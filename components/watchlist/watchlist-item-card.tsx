"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import WatchlistItemDeleteButton from "./watchlist-item-delete-button";
import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/lib/tmdb";
import { Calendar, Loader } from "lucide-react";
import { watch } from "node:fs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WatchlistCardProps {
  watchlistItem: {
    movieId: string;
    imageUrl: string;
    name: string;
    releaseDate: string;
    moviebackdrop_path: string;
    addedAt: string;
  };
  refetch: () => void;
  watchlistId: string;
  updateWatchlistImage: (imageUrl: string) => Promise<void>;
}

export function WatchlistCard({
  watchlistItem,
  refetch,
  watchlistId,
  updateWatchlistImage,
}: WatchlistCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="relative group overflow-clip min-w-[150px] sm:min-w-[200px] md:min-w-[240px]">
        <Button
          onClick={async () => {
            try {
              setIsLoading(true);
              await updateWatchlistImage(watchlistItem.moviebackdrop_path);
              setIsLoading(false);
              toast.success("Watchlist image updated successfully ");
            } catch (error) {
              toast.error("Failed to update watchlist image");
            }
          }}
          className={`md:transform w-28 bg-blue-600 hover:bg-blue-700 text-white z-10 absolute md:group-hover:translate-x-[0%] md:-translate-x-[120%] top-2 mx-2 transition-transform duration-500  ${
            isLoading ? "bg-blue-400 hover:bg-blue-500" : ""
          }`}
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <span>Set as Cover</span>
          )}
        </Button>
        <Link href={`/movies/${watchlistItem.movieId}`}>
          <div className=" relative h-[300px] md:h-[400px] bg-card">
            {/* Image */}

            <div className="absolute inset-0 rounded-t-md md:rounded-md overflow-clip">
              {watchlistItem.imageUrl ? (
                <Image
                  src={getImageUrl(watchlistItem.imageUrl, "w500")}
                  alt={watchlistItem.name}
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

              {/* Gradient overlay */}
              <div className="absolute bottom-0 top-1/4 left-0 right-0 bg-gradient-to-t from-black to-transparent translate-y-[0%] group-hover:translate-y-0 transition-all duration-500" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-3 md:p-6 text-white">
              {/* Main content */}
              <div className="md:transform md:translate-y-[50%] md:group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <h3 className="md:text-2xl font-bold mb-2 text-white/90 line-clamp-2 text-xl">
                    {watchlistItem.name}
                  </h3>

                  <div className="flex items-center text-xs md:text-sm text-white/70 md:mb-3">
                    <Calendar className="w-4 h-4 mr-1 hidden md:block" />
                    Release:{" "}
                    {new Date(watchlistItem.releaseDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 hidden md:block">
                  <div className="text-xs md:text-sm text-white/80 mb-3">
                    Added:{" "}
                    {new Date(watchlistItem.addedAt).toLocaleDateString()}
                  </div>{" "}
                  <div className="h-7" />
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 md:hidden">
            <div className="text-xs mb-3">
              Added: {new Date(watchlistItem.addedAt).toLocaleDateString()}
            </div>
            <div className="h-9" />
          </div>
        </Link>
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 transition-all duration-700 ease-in-out md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <WatchlistItemDeleteButton
            name={watchlistItem.name}
            id={watchlistItem.movieId}
            refetch={refetch}
            watchlistId={watchlistId}
          />
        </div>
      </Card>

      {/* Remove Button */}
    </motion.div>
  );
}

export default WatchlistCard;
