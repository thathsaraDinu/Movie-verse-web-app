"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate, formatRating, formatRuntime } from "@/lib/utils/format";
import type { MovieDetails } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MovieInfoProps {
  movie: MovieDetails;
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-5 justify-between lg:items-center mb-4">
          <h1 className="text-4xl font-bold">{movie.title || ""}</h1>{" "}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">
            {formatDate(movie.release_date || "")}
          </Badge>
          {movie.runtime && movie.runtime > 0 && (
            <Badge variant="secondary">
              {formatRuntime(movie.runtime || 0)}
            </Badge>
          )}
          <Badge variant="secondary">
            ★ {formatRating(movie.vote_average || 0)}
          </Badge>
        </div>
      </motion.div>
    </>
  );
}
