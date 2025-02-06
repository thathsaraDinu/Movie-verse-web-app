"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MovieDetails } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MovieMetadataProps {
  movie: MovieDetails;
}

export function MovieMetadata({ movie }: MovieMetadataProps) {
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {movie.tagline && (
          <p className="text-lg italic text-muted-foreground mb-4">
            {movie.tagline || ""}
          </p>
        )}
      </motion.div>
      <div className="space-y-6">
        <>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{movie.overview || ""}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Separator />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name || ""}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Separator />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {movie.production_companies.length > 0 && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Production Companies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies?.map((company) => (
                      <Badge key={company.id} variant="outline">
                        {company.name || ""}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      </div>
    </>
  );
}
