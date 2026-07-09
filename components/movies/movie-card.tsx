"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getImageUrl } from "@/lib/tmdb";
import { formatDate, formatRating } from "@/lib/utils/format";
import type { Movie } from "@/lib/tmdb";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, Film } from "lucide-react";
import { useState } from "react";

export function MovieCard({ movie }: { movie: Movie }) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/movies/${movie.id}`} className="block h-full">
        <Card className="group relative overflow-hidden h-[300px] sm:h-[400px] bg-card">
          <div className="absolute inset-0">
            {movie.poster_path && !imageError ? (
              <Image
                src={getOptimizedImageUrl(movie.poster_path, 'poster', 'xlarge')}
                alt={movie.title || "movie poster"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 transition-transform duration-500 group-hover:scale-110 text-center p-4">
                <Film className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm font-medium">No Image</span>
              </div>
            )}

            {/* Gradient overlays */}
            <div className="absolute bottom-0 top-1/4 left-0 right-0 bg-gradient-to-t from-black to-transparent translate-y-[0%] group-hover:translate-y-0 transition-all duration-500" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-3 md:p-5 text-white">
            {/* Rating badge - always visible */}
            <div className="absolute top-4 right-4">
              <Badge
                variant="secondary"
                className="bg-white/80 dark:bg-black/50  backdrop-blur-sm border-none"
              >
                <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                {formatRating(movie.vote_average || 0)}
              </Badge>
            </div>

            {/* Main content - slides up on hover */}
            <div className="transform translate-y-[50%] group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="md:text-2xl font-bold mb-2 text-white/90 line-clamp-2 text-xl">
                {movie.title}
              </h3>

              <div className="flex items-center text-sm text-white/70 mb-3">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(movie.release_date || "")}
              </div>

              <p className="text-sm text-clamp-3 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
