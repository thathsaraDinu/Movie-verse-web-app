"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import WatchlistRemoveButton from "./watchlist-remove-button";
import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/lib/tmdb";
import { Calendar } from "lucide-react";

interface WatchlistCardProps {
  watchlistItem: {
    movieId: string;
    imageUrl: string;
    name: string;
    releaseDate: string;
    addedAt: string;
  };
  refetch: () => void;
}

export function WatchlistCard({ watchlistItem, refetch }: WatchlistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card>
        <div className="group relative overflow-hidden h-[300px] md:h-[400px] bg-card">
          {/* Image */}

          <div className="absolute inset-0 rounded-t-md md:rounded-md overflow-clip">
            <Image
              src={getImageUrl(watchlistItem.imageUrl, "w500")}
              alt={watchlistItem.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 top-1/4 left-0 right-0 bg-gradient-to-t from-black to-transparent translate-y-[0%] group-hover:translate-y-0 transition-all duration-500" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-3 md:p-6 text-white">
            {/* Main content */}
            <div className="md:transform md:translate-y-[50%] md:group-hover:translate-y-0 transition-transform duration-500">
              <Link href={`/movies/${watchlistItem.movieId}`} passHref>
                <h3 className="md:text-2xl font-bold mb-2 text-white/90 line-clamp-2 text-xl">
                  {watchlistItem.name}
                </h3>

                <div className="flex items-center text-xs md:text-sm text-white/70 md:mb-3">
                  <Calendar className="w-4 h-4 mr-1 hidden md:block" />
                  Release:{" "}
                  {new Date(watchlistItem.releaseDate).toLocaleDateString()}
                </div>
              </Link>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 hidden md:block">
                <div className="text-xs md:text-sm text-white/80 mb-3">
                  Added: {new Date(watchlistItem.addedAt).toLocaleDateString()}
                </div>{" "}
                <div className="flex justify-center">
                  <WatchlistRemoveButton
                    name={watchlistItem.name}
                    id={watchlistItem.movieId}
                    refetch={refetch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-3 md:hidden">
          <div className="text-xs mb-3">
            Added: {new Date(watchlistItem.addedAt).toLocaleDateString()}
          </div>{" "}
          <div className="flex justify-center">
            <WatchlistRemoveButton
              name={watchlistItem.name}
              id={watchlistItem.movieId}
              refetch={refetch}
            />
          </div>
        </div>
      </Card>

      {/* Remove Button */}
    </motion.div>
  );
}

export default WatchlistCard;
