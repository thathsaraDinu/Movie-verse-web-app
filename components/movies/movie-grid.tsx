"use client";

import { Movie } from "@/lib/tmdb";
import { MovieCard } from "@/components/movies/movie-card";
import { motion } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
  title: string;
}

export function MovieGrid({ movies, title }: MovieGridProps) {
  if (!movies.length) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 tracking-tight">{title}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-muted-foreground py-8">
            No movies found.
          </p>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 tracking-tight">{title}</h2>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie : Movie, index: number) => (
          <>
            <motion.div
              key={movie.id}  
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <MovieCard key={movie.id} movie={movie} />
            </motion.div>
          </>
        ))}
      </div>
    </>
  );
}
